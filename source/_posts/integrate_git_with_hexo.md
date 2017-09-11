---
title: hexo-deplyer-gitで静的コンテンツをgitにデプロイする
---

# hexo-deplyer-gitで静的コンテンツをgitにデプロイする

[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)を使うことで、hexoのデプロイ時にgitにpushさせることができます。

## hexo-deployer-gitとは
`hexo deploy`コマンド実行時に、生成された静的コンテンツを任意のgitリポジトリの特定ブランチにpushできます。

### hexoプロジェクトのディレクトリ構成
hexoによるプロジェクトのディレクトリ構成は以下のようになっています。

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
ジェネレートされたファイルは、publicというディレクトリに展開されます。
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
 
これをwebサーバに配置すれば、ブログが配信できます。

### hexo-deployer-gitによるデプロイ

静的コンテンツを任意のgithubプロジェクトのorigin/masterにデプロイする。ということが可能です。

hexoプロジェクトの、\_config.ymlにて、設定を行います。

設定項目は以下です。
```
deploy:
  type: git
  repo: <repository url>
  branch: [branch]
  message: [message]
```

設定後は、`hexo deploy`時に.deploy\_gitというディレクトリが生成され、それがpushされます。
.deploy\_githexoはpublicディレクトリと同様の内容のため、gitに静的コンテンツがデプロイされます。

### まとめ
今回は、hexo-deployer-gitについて紹介しました。
これをgithub hookなどと併用することで、ローカルから静的コンテンツをwebサーバにデプロイすることなどができます。
それについても、次回以降の記事で書きます。
