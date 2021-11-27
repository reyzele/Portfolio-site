const webpack = require("webpack");
const path = require("path");
const config = require("./config/config");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/scripts/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    publicPath: "/public/",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: [
              "vue-style-loader",
              "css-loader",
              "sass-loader",
              {
                loader: "sass-resources-loader",
                options: {
                  resources: [
                    "./src/admin/styles/variables.scss",
                    "./src/admin/styles/mixins.scss",
                  ],
                },
              },
            ],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax",
            ],
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      adminStyles: path.resolve(__dirname, "src/admin/styles/components/"),
      adminImages: path.resolve(__dirname, "src/admin/img/"),
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devServer: {
    proxy: {
      "*": {
        target: config.server.path,
        secure: false,
      },
    },
    contentBase: path.join(__dirname, "public"),
    publicPath: "/scripts",
    historyApiFallback: true,
    noInfo: false,
    overlay: true,
  },
  performance: {
    hints: false,
  },
  devtool: "#eval-source-map",
};

if (process.env.NODE_ENV) {
  module.exports.entry = Object.assign(module.exports.entry, {
    admin: path.resolve(__dirname, "src/admin/main.js"),
  });
}

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
