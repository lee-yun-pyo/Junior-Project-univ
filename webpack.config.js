const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/frontend/js/main.js", // entry 처리하고자 하는 파일
  mode: "development", // 가공된 js파일이 개발하기 편하게 정리 (원래 한줄 코드: production)
  watch: true, // 자동으로 webpack은 해석 된 파일의 변경 사항을 계속 감시
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  output: {
    // entry 파일을 가공 작업 후 파일이 보내져 저장될 디렉토리
    filename: "js/main.js",
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