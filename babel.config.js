module.exports = function (api) {
  api.cache(true)

  let plugins = ['babel-plugin-jsx-remove-data-test-id']
  if (process.env.CYPRESS === 'true') {
    let removePlugins = ['babel-plugin-jsx-remove-data-test-id']
    console.log('Instrumenting for Cypress E2E')
    plugins.push('istanbul')

    plugins = plugins.filter(plugin => !removePlugins.includes(plugin))
  }

  return {
    presets: ['next/babel'],
    plugins: plugins
  }
}
