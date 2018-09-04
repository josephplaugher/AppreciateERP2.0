const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          query: {compact: false} 
        }
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Util: path.resolve(__dirname, 'src/client/Util/'),
      css: path.resolve(__dirname, 'src/client/css/')
    }
  },
  watch: true,
  mode: 'development',
  devtool: 'source-map'
};
