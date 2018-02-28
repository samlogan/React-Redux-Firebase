const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  /*
   * modules: boolean - Enable/Disable CSS Modules
   * importLoaders: number - Number of loaders applied before CSS loader
   *
   * Read more about css-loader options
   * https://webpack.js.org/loaders/css-loader/#options
   *
   * For server-side rendering we use css-loader/locals as we do not want to
   * embed CSS. However, we still require the mappings to insert as className in
   * our views.
   *
   * Referenced from: https://github.com/webpack-contrib/css-loader#css-scope
   *
   * For prerendering with extract-text-webpack-plugin you should use
   * css-loader/locals instead of style-loader!css-loader in the prerendering bundle.
   * It doesn't embed CSS but only exports the identifier mappings.
   */
  const localIdentName = 'localIdentName=[name]__[local]___[hash:base64:5]';

  var sassNeatPaths = require("node-neat").with([PATHS.app + "/sass"]).map(function(neatPath) {
      return "includePaths[]=" + neatPath;
  }).join("&");

  const createCssLoaders = embedCssInBundle => ([
    {
      loader: embedCssInBundle ? 'css-loader' : 'css-loader/locals',
      options: {
        localIdentName,
        sourceMap: true,
        modules: true,
        importLoaders: 1
      }
    },
    {
      loader: "sass-loader",
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          PATHS.app + '/sass/styles.scss',
          PATHS.app + '/sass/base/**/*.scss',
          PATHS.app + '/sass/helpers/**/*.scss',
        ]
     },
    }
  ]);

  const createBrowserLoaders = extractCssToFile => loaders => {
    if (extractCssToFile) {
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders
      });
    }
    return [{ loader: 'style-loader' }, ...loaders];
  };

  const serverLoaders = createCssLoaders(false);
  const browserLoaders = createBrowserLoaders(production)(createCssLoaders(true));

  return {
    test: /\.scss$/,
    use: browser ? browserLoaders : serverLoaders,
    include: PATHS.app
  };
};
