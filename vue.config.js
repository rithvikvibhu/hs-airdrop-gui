module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Handshake Airdrop GUI'
      return args
    })
  },
  pluginOptions: {
    electronBuilder: {
      app: 'org.handshake.hs-airdrop-gui',
      productName: 'Handshake Airdrop GUI',
      preload: 'src/preload.js',
    },
  },
}
