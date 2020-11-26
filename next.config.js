module.exports = {
  publicRuntimeConfig: {
    // Use `next/config`
    runtimeValue: process.env.RUNTIME_VARIABLE
  },
  env: {
    // Allow to be used in components
    BUILD_VARIABLE: process.env.BUILD_VARIABLE
  }
};
