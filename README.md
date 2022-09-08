# ここにサイト名を書く

## Version
- Node 16.17.0
- npm 8.19.1

## start
1.  **install**  

    クローンした後に実行してください。

    ```
    npm i
    ```

2.  **develop**

    ```
    npm run dev
    ```

3.  **deploy**

    ```
    npm run build
    ```

## supplement
- src直下のpublicディレクトリ内は、dist直下にそのまま吐き出されます。
- html内のcssやjs,imagesの読み込みは相対パスで書いてください
- cssの読み込みは **style.scss** のように、scssのままにしてください。
- componentsディレクトリはejsでいうincludeファイルになります。includeしたいときには **{{> header}}** のように書いてください。
- ejsでいうページ情報は、vite.config.jsのpageDataでページによって変数の値を変えることができるのでそこにいれてください。
- その他条件分岐などもできます。<br>参考：(https://zenn.dev/sakata_kazuma/articles/59a741489c8bbc#%E3%83%BB%E5%A4%89%E6%95%B0%E3%81%AE%E5%87%BA%E5%8A%9B%E3%80%81%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E8%AA%AD%E3%81%BF%E8%BE%BC%E3%81%BF)