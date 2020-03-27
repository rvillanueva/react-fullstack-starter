import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  devServer: {
    hot: true
  },
  entry: [
    // must be first entry to properly set public path
    './client/webpack-public-path',
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    path.resolve(__dirname, 'client/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN),
      'process.env.DEPLOYMENT_NAME': JSON.stringify(process.env.DEPLOYMENT_NAME),
      'process.env.SENTRY_DSN_FRONTEND': JSON.stringify(process.env.SENTRY_DSN_FRONTEND),
      'process.env.GOOGLE_ADS_ID': JSON.stringify(process.env.GOOGLE_ADS_ID),
      'process.env.GOOGLE_ADS_SIGNUP_CONVERSION_ID': JSON.stringify(process.env.GOOGLE_ADS_SIGNUP_CONVERSION_ID),
      'process.env.PLAID_PUBLIC_KEY': JSON.stringify(process.env.PLAID_PUBLIC_KEY),
      'process.env.PLAID_ENV': JSON.stringify(process.env.PLAID_ENV),
      'process.env.STRIPE_DASHBOARD_BASE_URL': JSON.stringify(process.env.STRIPE_DASHBOARD_BASE_URL),
      __DEV__: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ // Create HTML file that includes references to bundled CSS and JS.
      template: 'client/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true,
      sentryConfigUrl: process.env.SENTRY_DSN_FRONTEND || '',
      deploymentName: 'development',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
      googleAdsId: process.env.GOOGLE_ADS_ID,
      mixpanelId: process.env.MIXPANEL_ID
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client'),
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel']
          }
        }]
      },
      {
        test: /\.jsx?$/,
        exclude: new RegExp(`/(${path.join(__dirname, 'client')}|node_modules)/`),
        use: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
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
              mimetype: 'application/octet-stream'
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
              mimetype: 'image/svg+xml'
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
        use: [
          'style-loader',
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
              sourceMap: true,
              lessOptions: {
                includePaths: [path.resolve(__dirname, 'client')],
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'client')],
              }
            }
          }
        ]
      }
    ]
  }
};
