import React from 'react';
import PropTypes from 'prop-types';

const EnvPage = props => {
  return <pre>{JSON.stringify(props.env, null, 2)}</pre>;
};

EnvPage.propTypes = {
  env: PropTypes.object.isRequired
};

export async function getServerSideProps() {
  return { props: { env: process.env } };
}

export default EnvPage;
