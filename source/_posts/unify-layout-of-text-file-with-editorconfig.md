---
title: .editorconfigでテキストファイルの書きっぷりを統一する
date: 2017-12-19 21:23:01
tags:
- editorconfig
- editor
- config
---
.editorconfigはテキストファイルのレイアウトを統一するための設定ファイル。

テキストファイルの編集、保存時にインデントや改行コードを統一してくれる。

エディタ自体が対応しているものや、プラグインなどで対応しているものがある。

## 使い方
設定を適用したいフォルダに`.editorconfig`を配置する。

## .editorconfigの例

```
root = true // プロジェクトルートに配置しているか

[*] // ファイル形式の指定: [*.js]などのように指定できる。
charset = utf-8                  // 文字コードはutf-8
indent_style = space             // インデントはスペース
indent_size = 2                  // スペースの数は2つ
end_of_line = lf                 // 改行コードはlf

trim_trailing_whitespace = true  // 行末のスペースを削除するか
insert_final_newline = true      // ファイル末尾の開業をするか
```

## 参考資料
- [editorconfig.org](http://editorconfig.org/)
- [どんなエディタでもEditorConfigを使ってコードの統一性を高める](https://qiita.com/naru0504/items/82f09881abaf3f4dc171)