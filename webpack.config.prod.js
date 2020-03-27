// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN),
  'process.env.SENTRY_DSN_FRONTEND': JSON.stringify(process.env.SENTRY_DSN_FRONTEND),
  'process.env.DEPLOYMENT_NAME': JSON.stringify(process.env.DEPLOYMENT_NAME),
  'process.env.FORCE_HTTPS': JSON.stringify(process.env.FORCE_HTTPS),
  'process.env.PLAID_PUBLIC_KEY': JSON.stringify(process.env.PLAID_PUBLIC_KEY),
  'process.env.PLAID_ENV': JSON.stringify(process.env.PLAID_ENV),
  'process.env.STRIPE_DASHBOARD_BASE_URL': JSON.stringify(process.env.STRIPE_DASHBOARD_BASE_URL),
  __DEV__: false
};

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  mode: 'production',
  devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'client/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: 'client/index.ejs',
      favicon: 'client/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      sentryConfigUrl: process.env.SENTRY_DSN_FRONTEND || '',
      deploymentName: process.env.DEPLOYMENT_NAME,
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
      googleAdsId: process.env.GOOGLE_ADS_ID,
      mixpanelId: process.env.MIXPANEL_ID
    }),

    // Minify JS
    new CopyWebpackPlugin([
      { from: 'package.json', to: '../package.json' },
      { from: '.sequelizerc', to: '..' },
      { from: 'sequelize', to: '../sequelize' },
      { from: '.npmrc', to: '..' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /(\.css|\.scss|\.sass|\.less)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            reloadAll: true
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')
            ],
            sourceMap: true
          }
        }, {
          loader: 'less-loader',
          options: {
            includePaths: [path.resolve(__dirname, 'src', 'less')],
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, 'src', 'scss')],
            sourceMap: true
          }
        }
        ]
      }
    ]
  }
};
