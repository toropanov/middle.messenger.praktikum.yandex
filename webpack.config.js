const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: {
          loader: "ts-loader",
        },
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.hbs', '.scss'],
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js',
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist2')
  },
  plugins: [new HtmlWebpackPlugin()],
}
