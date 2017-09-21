---
title: Node.jsの環境構築[Gulp + Bable + EsLint]
date: 2017-09-18 14:19:00
tags:
- node.js
---

Node.jsのための環境構築を行いましたのでまとめます。
Node本体とnpmはインストール済みの前提です。

今回は以下の手順で行います。

- 開発ツールのインストール
  - npm init
  - gulp
  - babel
  - eslint

## プロジェクト作成
今回は、toolsという開発環境構築のサンプルプロジェクトを作成します。

```
$ mkdir tools
$ cd tools
$ npm init
```

## gulpのインストール
gulpはビルドツールです。
開発の過程で繰り返し行うタスクを自動化します。

まずは、以下のコマンドラインでgulpをグローバルにインストールします。
```
$ sudo npm install -g gulp
```

gulpをグローバルにインストールする必要があるのは一度のみです。
以降は、作成するプロジェクトごとにローカルインストールを行います。

その際は以下のコマンドラインを実行します。
```
$ npm install --save-dev gulp
```

以下のコマンドを実行します。
```
$ gulp
```
この時点では`No gulpfile found`と出力されれば成功です。

## babelのインストール
gulpがインストールできたため、次はbabelをインストールします。
babelはトランスパイラと呼ばれ、ES6などの構文で記述されたJSをブラウザで安定して稼動するES5のJSに変換するものです。

コマンドラインで利用出来るBabelをインストールするためには、以下のコマンドラインを実行します。
```
npm install --save-dev babel-cli babel-preset-latest
```

babelの設定は、.babelrcで行います。

以下のような.babelrcを作成しておきます。
```
{
  "presets": ["latest"]
}
```

### gulpを使ってbabelを実行する
ここまでで、タスクランナーとトランスパイラが用意できたので、連携させます。

#### ディレクトリ構成を整える
まずは、ディレクトリ構成を整えるために以下のコマンドラインを実行します。
```
$ mkdir -p dist es6 public/dist public/es6
```

以下のコマンドラインで確認してみます。
```
$ tree -I 'node_modules' 
```

ディレクトリ構成は以下のようになっているはずです
```
.
├── dist
├── es6
├── package-lock.json
├── package.json
└── public
    ├── dist
    └── es6

5 directories, 2 files
```

#### gulp-babelをインストールする
es6またはpublic/es6にあるコードをES5に変換して、それぞれをdistとpublic/distに配置します。
そのためにgulp-babelをインストールします。
```
$ npm install --save-dev gulp-babel
```

そして以下のようなgulpfile.jsを作成します。

```
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
  // Nodeのソース
  gulp.src("es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));

  // ブラウザのソース
  gulp.src("public/es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist"));
});
```

#### 動作確認をする
ここまでの設定で、ES6で記述されたJSのソースをトランスパイルするgulpタスクが実行できるようになっているはずです。

そのため、es6/test.jsと、public/es6/test.jsいうファイルを作成し、どちらも以下のような内容にします。

```
'use strict';
const sentences = [
  { subject: 'Javascript', verb: 'is', object: 'great' },
  { subject: 'Elephants', verb: 'are', object: 'large' }
];

function say({ subject, verb, object }) {
  console.log(`${subject} ${verb} ${object}`);
};

for(let s of sentences) {
  say(s);
}
```

この状態で`gulp`コマンドを実行すると、distとpublic/distにかなり異なる内容のファイルが生成されてます。

念のため、すべての実行結果が同じことを確認します。
```
$ node es6/test.js
$ node public/es6/test.js
$ node dist/test.js
$ node public/dist/test.js
```

distとpublic/distは.gitignoreに追加しておきます。

## ESLintのインストール
lintとは、コードの問題点を指摘するチェッカーです。
JSには幾つかlintプログラムがありますが、ESLintはその一つです。

以下のコマンドラインでESLintをグローバルインストールします。
```
$ npm install -g eslint
```

lintを行う前に、構成ファイルである.eslintrcをプロジェクトごとに作成する必要があります。
`eslint --init`を行うことで簡単に作成できます。

質問に答えると、.eslintrcが生成されます。

これでESLintを例えば以下のコマンドラインで実行できます。

```
eslint es6/test.js
```

ESLintをGulpfileに追加することもできます。

```
npm install --save-dev gulp-eslint
```

そして、gulpfile.jsを次のように変更します。

```
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', () => {
  gulp.src(['es6/**/*.js', 'public/es6/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
  // Nodeのソース
  gulp.src('es6/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));

  // ブラウザのソース
  gulp.src('public/es6/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/dist'));
});
```

これでgulpタスク実行時にEslintが走るようになります。
より細かな設定などは[ESLint.org](https://eslint.org.r/)を参照してください。

## まとめ
モダンなJavaScript開発に使われるツールのインストールと、簡単な使い方を紹介しました。
今回は以下の構成でしたが、選択肢はこれに限りません。

- タスクランナー: Gulp
- トランスパイラ: Babel
- リントプログラム: ESLint

## 参考文献
- [初めてのJavaScript](https://www.oreilly.co.jp/books/9784873117836/)
- [gulp.js](https://gulpjs.com/)
- [bablejs.io](https://babeljs.io/)
- [eslint.org](https://eslint.org/)
