const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js"],
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
  entry: "./js/react-surface.js",
  output: {
    filename: "react-surface.js",
    path: path.resolve(__dirname, "../priv"),
    library: "react-surface",
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
