const path = require("path");

module.exports = {
  entry: "./src/frontend/js/main.js", // entry 처리하고자 하는 파일
  mode: "development", // 가공된 js파일이 개발하기 편하게 정리 (원래 한줄 코드: production)
  output: {
    // entry 파일을 가공 작업 후 파일이 보내져 저장될 디렉토리
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
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
    ],
  },
};
