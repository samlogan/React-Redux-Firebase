var path = require('path');
var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = require('./common.config');
var assetsPath = commonConfig.output.assetsPath;
var publicPath = commonConfig.output.publicPath;

var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    query: {
      presets: ['react-hmre', 'es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy']
    },
    exclude: path.join( __dirname, '..', 'node_modules')
  },
  {
    test: /\.scss$/,
    loader: 'style!css!sass!import-glob',
    include: path.join( __dirname, '..', 'public/assets/sass')
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000&mimetype=application/font-woff"
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
  },
  {
    test: /\.(png|jpg|jpeg|gif)(\?.*$|$)/,
    loader: 'url',
    query: {
        name: '[hash].[ext]',
        limit: 10000,
    }
  }
];

module.exports = {
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: 'source-map',
    // The configuration for the client
    name: 'browser',
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    context: path.join(__dirname, '..', 'app'),
    // Multiple entry with hot loader
    // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
    entry: {
      app: ['babel-polyfill', './client', hotMiddlewareScript]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath
    },
    sassLoader: {
      includePaths: [ path.join( __dirname, '..', 'public/assets/sass') ]
    },
    module: {
      loaders: commonLoaders
      .concat({
          test: /\.css$/,
          loader: ['style', 'css']
        })
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
};
