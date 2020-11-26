import * as React from 'react';
import getConfig from 'next/config';
import NextLink from 'next/link';

const { useState, useEffect } = React;
const { publicRuntimeConfig } = getConfig();

const IndexPage = () => {
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
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NextLink href="/initial-props">
                <a>Initial Props (SSR)</a>
              </NextLink>
            </li>
            <li>
              <NextLink href="/server-side-props">
                <a>Server Side Props (SSR)</a>
              </NextLink>
            </li>
            <li>
              <NextLink href="/static-props">
                <a>Static Props (SSG)</a>
              </NextLink>
            </li>
            <li>
              <NextLink href="/env">
                <a>Render process.env</a>
              </NextLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <table>
          <caption>Variable from</caption>
          <thead>
            <tr>
              <th>Runtime</th>
              <th>Build</th>
              <th>Environment</th>
              <th>Backend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{publicRuntimeConfig.runtimeValue}</td>
              <td>{process.env.BUILD_VARIABLE}</td>
              <td>{process.env.NEXT_PUBLIC_VARIABLE}</td>
              <td>{message}</td>
            </tr>
          </tbody>
        </table>
      </main>
      <style jsx>{`
        ul {
          display: flex;
          flex-direction: column;
          list-style: none;
        }

        li {
          padding: 0.25rem 0;
        }
      `}</style>
    </>
  );
};

export default IndexPage;
