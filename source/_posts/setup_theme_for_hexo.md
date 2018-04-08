---
title: hexoにthemeを設定する
date: 2017-09-18 22:19:00
---

# hexo に theme を設定する。

hexo は任意のテーマを設定できます。自分で構築することもできますし、[hexo.io のテーマ一覧](https://hexo.io/themes/)から選択することもできます。このブログは[cacutus-dark](https://probberechts.github.io/cactus-dark/)というテーマを使っています。正直読みづらさは否めませんが、ターミナルみたいでかっこいいと思います。

## theme の設定方法

既存テーマを利用する方法について説明します。

ほとんどのテーマは設定項目が存在します。これは、hexo 自体とは別の管理を行う必要があるということです。

そのため、管理の意味で git の submodule を用いる方がメリットがあります。

そのため手順は以下のようになります。

* 既存のテーマをフォークする
* テーマのフォークを自身の hexo リポジトリにサブモジュールとして追加する
* hexo に使用するテーマの設定を行う
* テーマに対する設定を行う

### 任意のテーマをフォークする

[hexo.io のテーマ一覧](https://hexo.io/themes/)から好みのものを選びます。
github のリンクがあるはずなので任意のテーマをフォークします。

github にてフォークをすると、自身のフォークが作成されます。

### テーマのフォークを git のサブモジュールとして追加する

サブモジュール追加は hexo プロジェクトルートにて以下のコマンドで行います。
[]は任意の文字列に置き換えてください。

```
git submodule add [repo_url] themes/[theme_name]
```

すると、theme/[theme\_name]にフォークしたリポジトリが追加されます。

### hexo に使用するテーマの設定を行う

hexo のプロジェクトルートにある、\_config.yml に設定を行います。僕の場合は cactus-dark を利用するため、以下のように設定しました。

```
## Themes: https://hexo.io/themes/
theme: cactus-dark
```

### テーマに対する設定を行う。

それぞれ設定方法が違うと思うので、テーマのリポジトリの README.md を参照しつつ設定を行ってください。

参考までに、僕が cactos-dark にて行った設定をまとめます。

* graviator の設定
* nav の設定
* social_link の設定

### gravator の設定

[gravator](https://ja.gravatar.com/)は、グローバルに認識されるアバターです。一度写真を設定すれば、SNS などの icon を一括で設定できます。
cactos-dark はこれをサポートしていたため、favicon と avator を設定しました。

### nav の設定

以下のように Projects のリンクをクリックすると、github へ遷移するよう設定しました。

```
nav:
  Home: /
  About: /about/
  Writing: /archives/
  Projects: https://github.com/k4h4shi
```

### social_link の設定

個人の SNS アカウントのリンクを設定しました。

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
hexo も類にもれず設定を行うことができるため、ぜひ活用してください。

cactus-dark は Google Analytics なども設定できるため、今後はこちらについても設定します。
