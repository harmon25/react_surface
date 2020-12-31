const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js"],
    // alias: {
    //   react: path.resolve(__dirname, "./node_modules/react"),
    //   "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    // },
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
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
};
