---
title: 個人の設定ファイルをdotfilesリポジトリで管理する
date: 2017-09-16 21:25:14
tags:
- dotfiles
- shellscript
- make
- github
---

アプリケーションの設定ファイルの多くは、.から始まります。
dotfilesとは、それをまとめたリポジトリであり、それは自分の設定をいつでもどこでも利用することを意図しています。

## makeによるdotfilesの管理のタスク化
開発者を煩わしさから解放してくれるという点で、自動化は良いものです。
例えばJSではnpmやGulpを使って依存性の管理やタスクを自動化します
JavaでもAntやMaven, Gradleなどが同様の役割を果たします。

dotfilesにおいても、タスクの自動化が行えると楽です。
タスクというのは例えば、新たな環境に対しての設定の反映がワンラインで行うといったものです。

### タスクランナーには何を使うべきか
dotfilesが実行される環境は多岐にわたります。
そのため、極力OSやツールに依存しない方法が求められます。
MakeはC言語などのコンパイルの自動化などに用いられてきましたが、特定の言語に依存しないタスクランナーです。
ほとんどのUNIXライクのシステムで動作します。枯れた技術のため、安定しています。

これによって、設定ファイルのみの反映や、アプリケーションのインストールを含めた完全な初期化までのそれぞれをタスク化します。

### Makefile

MakeのタスクはMakefileで定義を行います。

その構文はシンプルで直感的です。


以下は僕がdotfilesリポジトリに配置しているMakefileです。

ほんの少しのアレンジを加えていますが、そのほとんどは[b4b4r07さんのdotfilesのMakefile](https://github.com/b4b4r07/dotfiles/blob/master/Makefile)を参考にしています。

```
DOTPATH    := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
CANDIDATES := $(wildcard .??*) bin
EXCLUSIONS := .DS_Store .git .gitmodules
DOTFILES   := $(filter-out $(EXCLUSIONS), $(CANDIDATES))

.DEFAULT_GOAL := help

all:
	
help:
	@echo "init    => Initialize enviroment settings."
	@echo "deploy  => Create symlinks to home directory."
	@echo "update  => Fetch all changes from remote repo."
	@echo "install => Run update, deploy, init"
	@echo "clean   => remove the dotfiles"
	@echo "destroy => remove the dotfiles and this repo"

init:
	@DOTPAH=$(DOTPATH) bash $(DOTPATH)/etc/init/init.sh

deploy:
	@echo '==> Start to deploy dotfiles to home directory.'
	@echo ''
	@$(foreach val, $(DOTFILES), ln -sfnv $(abspath $(val)) $(HOME)/$(val);)

update:
	git pull origin master
	git submodule init
	git submodule update
	git submodule foreach git pull origin master

install: update deploy init

clean:
	@echo 'Remove dot files from your home directory.'
	@-$(foreach val, $(DOTFILES), rm -vrf $(HOME)/$(val);)

destroy: clean
	@echo 'Romove this repository.'
	-rm -rf $(DOTPATH)
```

## まとめ
[b4b4r07](https://github.com/b4b4r07)さんが[dotfiles](http://qiita.com/b4b4r07/items/b70178e021bef12cd4a2)の運用やその仕組みについて、とても良い資料を残しています。
最初は彼のdotfilesをインストールしたこともありますが、全く使いこなせなかったため自分自身のdotfilesを用意しました。
僕のdotfilesはほとんどの点において彼の模倣ですが、まずは自分自身で理解出来る範囲のみを模倣しています。

[b4b4r07さんのdotfiles](https://github.com/b4b4r07/dotfiles)を見てみると、もっと多くを学べるかもしれません。

## 参考文献
- [最強の dotfiles 駆動開発と GitHub で管理する運用方法](http://qiita.com/b4b4r07/items/b70178e021bef12cd4a2)
- [Makefile の書き方](http://www.ie.u-ryukyu.ac.jp/~e085739/c.makefile.tuts.html)
