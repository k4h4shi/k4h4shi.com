---
title: hexoにthemeを設定する
---

# hexoにthemeを設定する。
hexoは任意のテーマを設定できます。
自分で構築することもできますし、[hexo.ioのテーマ一覧](https://hexo.io/themes/)から選択することもできます。
このブログは[cacutus-dark](https://probberechts.github.io/cactus-dark/)というテーマを使っています。
正直読みづらさは否めませんが、ターミナルみたいでかっこいいと思います。

## themeの設定方法
既存テーマを利用する方法について説明します。

ほとんどのテーマは設定項目が存在します。
これは、hexo自体とは別の管理を行う必要があるということです。

そのため、管理の意味でgitのsubmoduleを用いる方がメリットがあります。

そのため手順は以下のようになります。

- 既存のテーマをフォークする
- テーマのフォークを自身のhexoリポジトリにサブモジュールとして追加する
- hexoに使用するテーマの設定を行う
- テーマに対する設定を行う

### 任意のテーマをフォークする
[hexo.ioのテーマ一覧](https://hexo.io/themes/)から好みのものを選びます。
githubのリンクがあるはずなので任意のテーマをフォークします。

githubにてフォークをすると、自身のフォークが作成されます。


### テーマのフォークをgitのサブモジュールとして追加する
サブモジュール追加はhexoプロジェクトルートにて以下のコマンドで行います。
[]は任意の文字列に置き換えてください。

```
git submodule add [repo_url] themes/[theme_name]
```

すると、theme/[theme\_name]にフォークしたリポジトリが追加されます。

### hexoに使用するテーマの設定を行う
hexoのプロジェクトルートにある、\_config.ymlに設定を行います。
僕の場合はcactus-darkを利用するため、以下のように設定しました。

```
## Themes: https://hexo.io/themes/
theme: cactus-dark
```

### テーマに対する設定を行う。
それぞれ設定方法が違うと思うので、テーマのリポジトリのREADME.mdを参照しつつ設定を行ってください。

参考までに、僕がcactos-darkにて行った設定をまとめます。

- graviatorの設定
- navの設定
- social\_linkの設定

### gravatorの設定
[gravator](https://ja.gravatar.com/)は、グローバルに認識されるアバターです。
一度写真を設定すれば、SNSなどのiconを一括で設定できます。
cactos-darkはこれをサポートしていたため、faviconとavatorを設定しました。

### navの設定
以下のようにProjectsのリンクをクリックすると、githubへ遷移するよう設定しました。

```
nav:
  Home: /
  About: /about/
  Writing: /archives/
  Projects: https://github.com/k4h4shi
```

### social\_linkの設定
個人のSNSアカウントのリンクを設定しました。

```
customize:
    social_links:
        github: https://github.com/k4h4shi
        facebook: https://facebook.com/k4h4shi
        twitter: https://twitter.com/k4h4shi
        instagram: https://instagram.com/k4h4shi

```

## まとめ
多くのブログフレームワークでは、ブログ本体とテーマが独立して設定できます。
hexoも類にもれず設定を行うことができるため、ぜひ活用してください。

cactus-darkはGoogle Analyticsなども設定できるため、今後はこちらについても設定します。
