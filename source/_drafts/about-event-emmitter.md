---
title: EventEmitterについて
date: 2017-12-15 22:23:59
tags:
- node.js
---

## EvemtEmitter とは


Node.js のコアライブラリで、イベント駆動のパラダイムでのプログラミングをサポートするライブラリ。

EventEmitter 自体のインスタンスを生成して使ったり、任意のクラスで継承して使うことができる。

EventEmitter を継承することで、event に listener を登録する EventEmitter#on や、event を発火させる EventEmitter#emit が利用できるようになる。

イベント駆動が必要な多くのライブラリで用いられている。

## EventEmitter の API

* EventEmitter#defaultMaxListeners
* EventEmitter#on(eventName, listener)
* EventEmitter#once(eventName, listener)
* EventEmitter#emit(eventName, [...args])
* EventEmitter#eventNames()
* EventEmitter#getMaxListeners()
* EventEmitter#setMaxListeners(n)
* EventEmitter#listeners(eventName)
* EventEmitter#listenerCount(eventName)
* EventEmitter#prependListener(eventName, listener)
* EventEmitter#prependOnceListener(eventName, listener)
* EventEmitter#removeAllListener(eventName)
* EventEmitter#removeListener(eventName, listener)

### EventEmitter#on

listner を登録するために使われるメソッド。

第 1 引数の eventName に紐づけて、第 2 引数の listener を登録する。

* eventName
* listener

### EventEmitter#emit

event を発火させるために使われるメソッド。第 1 引数の eventName に紐づく event に登録されている全ての lisnter を、同期的に呼び出す。

その際には、第 2 引数以降の args を引数として渡し、返り値は無視する。

また、呼び出される順番は、単に登録された順番である。

* eventName
* [args]

### EventEmitter#once

一度だけ呼び出される listener を登録するために使われるメソッド。

EventEmitter#on と同様、第 1 引数の eventName に紐づけて、第 2 引数の listener を登録する。

このメソッドを使って登録された listener は、1 度実行されたら、2 回目以降の event の発火では無視される。

### EventEmitter#eventNames

listener が登録されているすべてのイベントの名前を要素にもつ配列を返す。要素の型は、文字列またはシンボル。

```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("foo", () => {});
emitter.on("bar", () => {});

console.log(emitter.eventNames()); // Prints: [ 'foo', 'bar' ]
```

### EventEmitter#listeners

第 1 引数の eventName に紐づくすべての listner を返す。

### EventEmitter#listenerCount

第 1 引数の eventName に紐づくすべての listner の数を返す。

### EventEmitter#prependListener

第 1 引数の eventName に登録されている listeners の内部リストの先頭に第 2 引数の listener を追加する。

### EventEmitter#removeAllListeners

第 1 引数の eventName に登録されている全ての listeners を取り除く。

### EventEmitter#removeListener

第 1 引数の eventName に登録されている、第 2 引数の listener を取り除く。

## 状況ごとのサンプルコード

### イベントの登録と発火

EventEmitter#on で登録した listner を EventEmitter#emit で呼び出す。

```javascript
const events = require("events"),
  emitter = new events.EventEmitter(),
  username = "kotaro",
  password = "pass";

emitter.on("userAdded", (username, password) => {
  console.log(`Added user: ${username}`);
});

emitter.emit("userAdded", username, password);
```

### this の扱い

EventEmitter#on で登録された listner の内部の`this`は、通常は付属の EventEmitter を指す。

ただし、Allow 関数を使うことで、`this`を束縛することができる。

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

emitter.on("event", function() {
  console.log("function listener:");
  console.log(this); // EventEmitter ...
});

emitter.on("event", () => {
  console.log("allow function listener:");
  console.log(this); // {}
});

emitter.emit("event");
```

### 同期実行と非同期実行

EventEmitter は、全ての listener を登録された順に同期的に呼び出す。

これは、イベントに順序付けを行うことで、競合またはロジックエラーを回避するため。

ただし、適切な場合に`setImmediate()`や`process.nextTick()`を呼び出すことで、listner を非同期に実行することもできる。

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

emitter.on("event", () => {
  setImmediate(() => {
    console.log("this happens asynchronously");
  });
});

emitter.emit("event");
```

### listner を一度だけ実行する

EventEmitter#on を使って登録された listner は、その event が発火されたタイミングで、何度でも実行される。

もしも、listner を一度だけ実行したい場合、EventEmitter#once を使って listener を登録する。

#### EventEmitter#on で登録した場合

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

let count = 0;
emitter.on("count", () => {
  console.log(++count);
});

emitter.emit("count"); // Prints: 1
emitter.emit("count"); // Prints: 2
```

#### EventEmitter#once で登録した場合

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

let count = 0;
emitter.once("count", () => {
  console.log(++count);
});

emitter.emit("count"); // Prints: 1
emitter.emit("count"); // Ignored
```

### Error イベント

EventEmitter のインスタンス内部でエラーが起きた場合、`error`イベントが発火される。

これは、Node.js に特殊なケースとして処理される。

#### error イベントに登録された listener が存在しない場合

error`イベントが発火されると、error が投げられ、スタックトレースが出力され、Node.js のプロセスが終了する。

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

emitter.emit("error", new Error("whoops!"));
// Throws and crashes Node.js
```

#### error イベントには listener を登録する

少なくとも 1 つの listener を、`error`イベントに登録しておくことが推奨される。

`error`イベントに登録された listner は、エラー発生時のオブジェクトを第 1 引数で受け取ることができる。

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

emitter.on("error", err => {
  console.error("whoops! there was an error");
});
emitter.emit("error", new Error("whoops!"));
// Prints: whoops! there was an error
```

### newListener イベント

EventerEmitter は、リスナーを追加する前に newListner イベントを発火する。この時、新たに登録される eventName と、listener が、newListener イベントに登録されている listener に渡される。

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

emitter.on("newListener", (event, listener) => {
  console.log(`${listener} will be added to ${event}`);
});
emitter.on("event", () => {
  console.log("one");
});
emitter.on("event", () => {
  console.log("two");
});

/*
() => {
  console.log('one');
} will be added to event
() => {
  console.log('two');
} will be added to event
*/
```

```javascript
const events = require("events"),
  emitter = new events.EventEmitter();

// 無限ループしないために一度のみ実行する。
emitter.once("newListener", (event, listener) => {
  if (event === "event") {
    // 新たなlistnerをイベントに登録
    // この処理はAよりも前に実行される。
    emitter.on("event", () => {
      console.log("B");
    });
  }
});
emitter.on("event", () => {
  console.log("A");
});
emitter.emit("event");
// Prints:
//   B
//   A
```

### removeListener イベント

EventerEmitter は、リスナーが除去された後に removeListner イベントを発火する。この時、直前に登録された eventName と、listener が、newListener イベントに登録されていた listener に渡される。

## 参考資料

* [Node.js v9.3.0 Documentation](https://nodejs.org/api/events.html)
* [Node.js Event Emitter](https://www.slideshare.net/EyalV/event-emitter)
