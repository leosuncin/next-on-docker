import * as React from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const ServerSidePropsPage = props => {
  return (
    <table>
      <caption>Variable from</caption>
      <thead>
        <tr>
          <th>Runtime</th>
          <th>Build</th>
          <th>Environment</th>
          <th>Server Side</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{publicRuntimeConfig.runtimeValue}</td>
          <td>{process.env.BUILD_VARIABLE}</td>
          <td>{process.env.NEXT_PUBLIC_VARIABLE}</td>
          <td>{props.message}</td>
        </tr>
      </tbody>
    </table>
  );
};

/**
 * @param {import('next').GetServerSidePropsContext} context
 */
export async function getServerSideProps(context) {
  return {
    props: {
      message: process.env.BACKEND_VARIABLE
    }
  };
}

export default ServerSidePropsPage;
