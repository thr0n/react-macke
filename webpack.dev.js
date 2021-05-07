const { DefinePlugin } = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devServer: {
    port: 3000,
  },
  mode: "development",
  plugins: [
    new DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
  ],
});
