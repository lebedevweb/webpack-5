const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  // assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].script.js',
    clean: true,
  },
  module: {
    rules: [
      // Loading JS
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      // Loading SASS
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css/',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // Loading PUG
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader?pretty=true',
          },
        ],
      },
      // FONTS
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      // SVG
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      // IMAGES
      {
        test: /\.(jpe?g|png)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  devServer: {
    open: {
      app: {
        name: 'firefox',
      },
    },
    port: 9000,
    hot: false,
    liveReload: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    watchFiles: ['src/**/*.pug', 'src/**/*.js', 'src/**/*.s[ac]ss', 'src/**/*.jpe?g', 'src/**/*.png'],
    compress: true,
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images/', to: 'img/' },
      ],
    }),

    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75,
        },
      }],
      overrideExtension: true,
      detailedLogs: false,
      strict: true,
    }),

    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      inject: false,
    })),
  ],
};
