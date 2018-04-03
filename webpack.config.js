var path = require("path")
var webpack = require("webpack")

module.exports = env => {
  console.log(env)
  const build = env && env.build && env.build === "build"
  return {
    //   entry: ["babel-polyfill", "./src/index.js"],
    entry: build ? "./src/index.js" : "./test/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: build ? "build.js" : "script.js",
      publicPath: "/",
      library: "",
      libraryTarget: "commonjs",
    },
    devServer: {
      contentBase: "./build",
      hot: true,
    },
    target: "node",
    node: {
      __dirname: true,
    },
    resolve: {
      alias: {
        network: path.resolve(__dirname, "src"),
      },
    },
    module: {
      loaders: [
        {
          test: /(\.csv)$/,
          loader: "csv-loader",
        },
        {
          test: /(\.js|\.jsx)$/,
          loader: "babel-loader",
          query: {
            presets: ["env", "react"],
            plugins: [
              "transform-object-rest-spread",
              "transform-decorators-legacy",
              "transform-class-properties",
              "transform-do-expressions",
            ],
          },
        },
      ],
    },
    stats: {
      colors: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        $dirname: "__dirname",
      }),
      build
        ? null &&
          new webpack.optimize.UglifyJsPlugin({
            minimize: true,
          })
        : null,
    ].filter(x => x),
  }
}
