import * as React from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';

const { useState, useEffect } = React;
const { publicRuntimeConfig } = getConfig();

const InitialPropsPage = props => {
  const [message, setMessage] = useState(props.message);

  useEffect(() => {
    const ctrl = new AbortController();
    async function fetchMessage(signal) {
      try {
        const response = await fetch('/api/message', { signal });
        const json = await response.json();
        setMessage(json.message);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessage(ctrl.signal);

    return () => ctrl.abort();
  });

  return (
    <table>
      <caption>Variable from</caption>
      <thead>
        <tr>
          <th>Runtime</th>
          <th>Initial Props</th>
          <th>Build</th>
          <th>Environment</th>
          <th>Backend</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{publicRuntimeConfig.runtimeValue}</td>
          <td>{props.message}</td>
          <td>{process.env.BUILD_VARIABLE}</td>
          <td>{process.env.NEXT_PUBLIC_VARIABLE}</td>
          <td>{message}</td>
        </tr>
      </tbody>
    </table>
  );
};

InitialPropsPage.propTypes = {
  message: PropTypes.string.isRequired
};
/**
 * @param {import('next').NextPageContext} context
 */
InitialPropsPage.getInitialProps = async context => {
  return {
    message: process.env.ENVIRONMENT_VARIABLE
  };
};

export default InitialPropsPage;
