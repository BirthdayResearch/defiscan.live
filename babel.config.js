module.exports = function (api) {
  api.cache(true)

  const plugins = []
  if (process.env.ISTANBUL === 'true') {
    console.log('Instrumenting for Cypress E2E')
    plugins.push('istanbul')
  }

  return {
    presets: ['next/babel'],
    plugins: plugins
  }
}
