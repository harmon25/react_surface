const path = require("path");

module.exports = {
  entry: "./js/react_surface.js",
  output: {
    filename: "react_surface.js",
    path: path.resolve(__dirname, "../priv/static"),
    library: "react_surface",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [],
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
};
