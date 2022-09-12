import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import path from 'path';


const pageData = {
  '/index.html': {
    isHome: true,
    title: 'Main Page',
  },
  '/list.html': {
    isHome: false,
    title: 'List Page',
  },
};






// HTMLの複数出力を自動化する
//./src配下のファイル一式を取得
import fs from 'fs';

//ファイル一覧のパスを取得する関数
//https://qiita.com/standard-software/items/e37bfd1db0f5ada192cf
const readSubDirSync = (folderPath) => {
  let result = [];
  const readTopDirSync = ((folderPath) => {
    let items = fs.readdirSync(folderPath);
    items = items.map((itemName) => {
      return path.join(folderPath, itemName);
    });
    items.forEach((itemPath) => {
      result.push(itemPath);
      if (fs.statSync(itemPath).isDirectory()) {
        readTopDirSync(itemPath);
        //再帰処理
      }
    });
  });
  readTopDirSync(folderPath);
  return result;
};

const fileNameList = readSubDirSync(resolve(__dirname, './src/'));

//htmlファイルのみ抽出
const htmlFileList = fileNameList.filter(file => /.html$/.test(file));

//build.rollupOptions.inputに渡すオブジェクトを生成
const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  //'src\'以降をぬきだす
  const file = htmlFileList[i].substr(htmlFileList[i].indexOf('src\\') + 4);;
  //componentsディレクトリ内のものはとばす
  if(file.startsWith('components\\')) {
    continue; 
  }
  inputFiles[file.slice(0,-5)] = resolve(__dirname, './src/' + file );
  /*
  この形を自動的に作る
  input:{
    index: resolve(__dirname, './src/index.html'),
    list: resolve(__dirname, './src/list.html')
  }
  */
}








export default defineConfig({
  server: {
    host: true, //IPアドレスを有効化
    open: true
  },
  base: './', //相対パスでビルドする
  root: './src/', //開発ディレクトリ設定
  build: {
    outDir: '../dist', //出力場所の指定
    rollupOptions: { //ファイル出力設定
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
	  //ビルド時のCSS名を明記してコントロールする
          if(extType === 'css') {
            return `assets/css/style.css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
      input: inputFiles,
    },
  },
  plugins: [
    handlebars({
      //コンポーネントの格納ディレクトリを指定
      partialDirectory: resolve(__dirname, './src/components'),
      //各ページ情報の読み込み
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
});