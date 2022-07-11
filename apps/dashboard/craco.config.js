const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const libsComponentPath = path.join(__dirname, "../../", "libs/components");
const libsUtilPath = path.join(__dirname, "../../", "libs/util");

module.exports = {
  webpack: {
    alias: {},
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
          match.loader.include = include.concat[libsComponentPath];
      }
      return webpackConfig;
    }
  }
};
