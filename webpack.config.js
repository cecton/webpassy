const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, opts) => ({
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.(png|jpg|gif|ttf|woff|eot|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            },
          },
        ],
      },
    ]
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: opts.prod ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/template.html",
    }),
  ],
});
