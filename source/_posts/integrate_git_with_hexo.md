---
title: hexo-deplyer-gitで静的コンテンツをgitにデプロイする
date: 2017-09-18 21:10:00
---

# hexo-deplyer-git で静的コンテンツを git にデプロイする

[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)を使うことで、hexo のデプロイ時に git に push させることができます。

## hexo-deployer-git とは

`hexo deploy`コマンド実行時に、生成された静的コンテンツを任意の git リポジトリの特定ブランチに push できます。

### hexo プロジェクトのディレクトリ構成

hexo によるプロジェクトのディレクトリ構成は以下のようになっています。

```
.
├── _config.yml
├── package.json
├── scaffolds
├── public
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### 静的コンテンツのディレクトリ構成

ジェネレートされたファイルは、public というディレクトリに展開されます。
public/は、以下のようなディレクトリ構成となっております。

```
.
├── 2017
│   └── 09
│       └── 10
│           ├── hello-world
│               └── index.html
├── archives
│   ├── 2017
│   │   ├── 09
│   │   │   └── index.html
│   │   └── index.html
│   └── index.html
├── css
│   ├── fonts
│   │   ├── FontAwesome.otf
│   │   ├── fontawesome-webfont.eot
│   │   ├── fontawesome-webfont.svg
│   │   ├── fontawesome-webfont.ttf
│   │   └── fontawesome-webfont.woff
│   ├── images
│   │   └── banner.jpg
│   └── style.css
├── fancybox
├── index.html
└── js
    └── script.js
```

これを web サーバに配置すれば、ブログが配信できます。

### hexo-deployer-git によるデプロイ

静的コンテンツを任意の github プロジェクトの origin/master にデプロイする。ということが可能です。

hexo プロジェクトの、\_config.yml にて、設定を行います。

設定項目は以下です。

```
deploy:
  type: git
  repo: <repository url>
  branch: [branch]
  message: [message]
```

設定後は、`hexo deploy`時に.deploy_git というディレクトリが生成され、それが push されます。
.deploy_githexo は public ディレクトリと同様の内容のため、git に静的コンテンツがデプロイされます。

### まとめ

今回は、hexo-deployer-git について紹介しました。これを github hook などと併用することで、ローカルから静的コンテンツを web サーバにデプロイすることなどができます。それについても、次回以降の記事で書きます。
