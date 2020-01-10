const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env, config) {

config.plugins.push(new MiniCssExtractPlugin());

  config.module.rules.push({
    test: /\.(tsx?)$/,
    loader: "babel-loader",
    query: {
      presets: ["@babel/preset-typescript"]
    }
  });

  config.module.rules.push({
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-modules-typescript-loader",
        options: {
          mode: process.env.CI ? "verify" : "emit"
        }
      },
      {
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
          sourceMap: true
        }
      },
      {
        loader: "less-loader",
        options: {
          sourceMap: true
        }
      }
    ]
  });
  
  return config;
};
