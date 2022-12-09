const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/frontend/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    likeBtn: BASE_JS + "likeBtn",
    views: BASE_JS + "views",
    commentSection: BASE_JS + "commentSection",
    homeText: BASE_JS + "homeText",
  }, // entry 처리하고자 하는 파일
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  output: {
    // entry 파일을 가공 작업 후 파일이 보내져 저장될 디렉토리
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true, // clean: build 하기 전에 output folder를 clean 시켜줌
  },
  module: {
    rules: [
      // rules: 각각의 파일들을 종류에 따라 어떤 전환을 할 것인지 결정
      {
        test: /\.js$/,
        //exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
