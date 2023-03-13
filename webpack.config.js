const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  devServer: {
    open: true,
    port: 3000,
    host: "localhost",
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.hbs$/i,
        use: {
          loader: "handlebars-loader",
        }
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js',
    },
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'App',
    inject: 'body',
    template: './src/index.html',
  })]
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
