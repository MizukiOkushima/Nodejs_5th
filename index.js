// サーバーに使用するポートの宣言
const PORT = 8000;

// expressの読み込み
const express = require("express");

// axiosの読み込み HTTPを使用するモジュール
const axios = require("axios");

// cheerioの読み込み スクレイピング用モジュール
const cheerio = require("cheerio");

const app = express();

// listen サーバーの起動
// 代一引数 ポートの指定
app.listen(PORT, () => console.log("running"));

// スクレイピング処理実装
// URLの指定
const URL = "https://search.rakuten.co.jp/search/mall/keyboard/";
const data = [];

// axios 指定したURLを取得
// 引数にURLを指定
// ※ 非同期処理のためthenで引き取ること 返ってきた値をresponseに入れる
axios(URL)
    .then((response) => {

        // 受け取ったデータの取得
        const htmlParser = response.data;
        console.log(htmlParser);

        // load 読み込み
        // $を使ってスクレイピングが可能になる
        const $ = cheerio.load(htmlParser);

        // 第一引数 読み込みたいdivタグの要素を指定
        // 代二引数 受け取ったデータ
        // each .searchresultitemは複数あるため一つずつ取り出す
        $(".searchresultitem", htmlParser).each(function () {
            const title = $(this).find(".title").text().trim();;
            const price = $(this).find(".important").text().trim();;
            data.push({ title, price });
            console.log(data);
          });

    })
    .catch((error) => console.log(error));