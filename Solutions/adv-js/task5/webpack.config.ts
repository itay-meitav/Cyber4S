import * as webpack from "webpack";
import * as path from "path";
import Minicss from "mini-css-extract-plugin";
import Htmlp from "html-webpack-plugin";
import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: "3000",
    client: {
      overlay: { errors: true, warnings: true },
    },

    hot: true,
    compress: true,
    historyApiFallback: true,
    open: true,
  },
  entry: {
    build: path.resolve(__dirname, "src/ts/index.ts"),
  },
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
        include: [path.resolve(__dirname, "src/ts")],
      },

      {
        test: /\.scss$/,
        use: [Minicss.loader, "css-loader", "sass-loader"],
        include: [path.resolve(__dirname, "src/css")],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  plugins: [
    new Minicss(),
    new Htmlp({
      template: "./src/index.html",
      title: "Ecommerce-app",
      filename: "index.html",
      favicon: "./src/favicon.ico",
    }),
  ],
};

export default config;
