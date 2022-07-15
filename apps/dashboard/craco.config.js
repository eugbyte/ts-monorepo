const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");
const pathToLibs = path.join(__dirname, "../../", "libs/**");

module.exports = {
  plugins: [],
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat[pathToLibs];
      }
      return webpackConfig;
    }
  }
};
