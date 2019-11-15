console.log('Building...');
var path = require('path');
var webpack = require('webpack');
var API_SETTINGS = {
  url: JSON.stringify('http://10.0.0.181:8089'),
  api_mode: JSON.stringify('cors'),
  credentials: JSON.stringify('omit'),
  env: JSON.stringify('development')
};

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/entry'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'API_SETTINGS': API_SETTINGS,
      'process.env': {'NODE_ENV': JSON.stringify('development')}
    })
  ],
  module: {
    rules: [
      // CSS
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'src'),
        use: ['style-loader','css-loader','stylus-loader']
      },
      // Fonts
      {
        test: /\.(ttf|otf|eot)$/i,
        include: path.join(__dirname, 'assets/fonts'),
        use: ['url-loader?limit=200000']
      },
      // Images
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        include: path.join(__dirname, 'assets/images'),
        use: ['url-loader?limit=200000']
      },
      // JS
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
