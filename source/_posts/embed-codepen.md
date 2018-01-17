---
title: codepenやgistで作成したスニペットをhexoに埋め込む
date: 2017-12-09 20:38:03
tags:
- snippet
- gist
- hexo
- codepen
---

外部サービスで作成したスニペットをブログ記事に埋め込む方法。

## hexoに埋め込む
このブログはhexoを使って生成されている。
hexoは基本Markdownで記事を書いているために、htmlをそのまま埋め込める。
codepenやgistは埋め込み用のscriptタグを生成してくれるのでそいつを埋め込めばいい。
原理上、Markdownによる静的サイトジェネレータなら同じことができるのでは。

## gist
<script src="https://gist.github.com/k4h4shi/ef0e53489deb8f524be090ede8ccc23e.js"></script>

## codepen
<p data-height="265" data-theme-id="0" data-slug-hash="JOgOdg" data-default-tab="html,result" data-user="k4h4shi" data-embed-version="2" data-pen-title="sticky-footer-with-flex-box" class="codepen">See the Pen <a href="https://codepen.io/k4h4shi/pen/JOgOdg/">sticky-footer-with-flex-box</a> by kotaro takahashi (<a href="https://codepen.io/k4h4shi">@k4h4shi</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## まとめ
バックエンドはgist, フロントエンドはcodepenと使い分ければ捗るのでは。