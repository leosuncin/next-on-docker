import * as React from 'react';
import getConfig from 'next/config';

const { useState, useEffect } = React;
const { publicRuntimeConfig } = getConfig();

const StaticPropsPage = props => {
  const [message, setMessage] = useState();

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
          <th>Build</th>
          <th>Environment</th>
          <th>Static (props)</th>
          <th>Backend</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{publicRuntimeConfig.runtimeValue}</td>
          <td>{process.env.BUILD_VARIABLE}</td>
          <td>{process.env.NEXT_PUBLIC_VARIABLE}</td>
          <td>{props.message}</td>
          <td>{message}</td>
        </tr>
      </tbody>
    </table>
  );
};

/**
 * @param {import('next').GetStaticPropsContext} context
 */
export async function getStaticProps(context) {
  return {
    props: {
      message: process.env.BUILD_VARIABLE
    }
  };
}

export default StaticPropsPage;
