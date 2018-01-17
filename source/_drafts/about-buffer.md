---
title: EventEmitterについて
date: 2017-12-15 22:23:59
tags:
- node.js
---

# node.js の byte について

node.js を使う業務でマーシャリングを行うライブラリを書いた。

その際に、node.js の Buffer オブジェクトをよく理解していなかったため、非効率なプログラミングをしていた。

その反省として Buffer オブジェクトの学習をしたのでその記録を残す。

## 要件

要件としては、特定の形式を持つ 16 進数表記の byte 列を、JSON オブジェクトと相互変換したい。というもの。

byte 列の内、特定の部分がその型を表しており、それによって変換の形式が異なるというものだった。

## 反省点

入出力される 16 進数表記の byte 列は文字列で扱われるのだけれど、内部でそれをそのまま文字列として扱ってしまった。

そのため、不必要に文字列の操作を行うコードが散在し、可読性の低いコードになってしまった。

本来であれば、内部的にはバイト操作のためのバイナリバッファなどを用いるべきだった。

具体的には、入力された文字列をバリデートしたのちに、バイナリバッファに変換する。

出力時には、バイナリバッファを文字列へ変換するといったことをするだけで、随分違ったはず。

## node.js におけるバイト列の操作

Node.js におけるバイナリデータは、Buffer クラスで扱うことができる。

Buffer クラスはグローバルなクラスのため、任意のモジュールで利用できる。

### Buffer オブジェクトの生成

Buffer(size)コンストラクタを使うことで、Buffer クラスのインスタンスを生成できる。

```javascript
const size = 32;
const buf = new Buffer(size); // 初期化はされていないので、内部になにが入ってるかわからない
console.log(buf); // <Buffer 88 e8 ...>
```

### Buffer オブジェクトの値埋め

Buffer#fill(value, [offset], [end])メソッドにより、Buffer を任意の値で埋めることが出来る。

```javascript
const size = 32;
const buf = new Buffer(size); // 初期化はされていないので、内部になにが入ってるかわからない
buf.fill(0); // バッファを0埋めすることで初期化する
console.log(buf); // <Buffer 00 ..>
```

### 特定の値で初期化した Buffer オブジェクトの生成

Buffer(array)コンストラクタを使うことで、格納する初期値を配列で与えることができる。

```javascript
const buf = new Buffer([0, 1, 2]);
console.log(buf); // <Buffer 00 01 02>
```

また、Buffer(str, [encoding])を用いることで、文字列からバッファを生成することもできる。

第 2 引数の encoding を省略した場合、`utf8`が使用される。

```javascript
const buf = new Buffer('string');
console.log(buf);<Buffer 73 74 72 69 6e 67>
```

第 2 引数の encoding に指定する値によって、格納されるデータは異なる。

```javascript
const asciiBuf = new Buffer("0123abcd", "ascii");
console.log(asciiBuf); // <Buffer 30 31 32 33 61 62 63 64>
const utf8Buf = new Buffer("0123abcd", "utf8");
console.log(utf8Buf); // <Buffer 30 31 32 33 61 62 63 64>
const hexBuf = new Buffer("0123abcd", "hex");
console.log(hexBuf); // <Buffer 01 23 ab cd>
```

#### 文字列とエンコーディング

Node.js では、以下の 7 つのエンコーディングが用意されている。

| ascii   | ASCII 文字列                                |
| ------- | ------------------------------------------- |
| utf8    | UTF-8 文字列                                |
| utf16le | リトルエンディアン UTF-16（UTF-16LE）文字列 |
| ucs2    | utf16lf と同じ                              |
| base64  | BASE64 でエンコードされた文字列             |
| binary  | バイナリデータ（利用は推奨されない）        |
| hex     | 16 進数で表記された文字列                   |

### String クラスと Buffer クラスの違い

どちらも複数バイトのデータを格納し、インデックス指定で部分的な抜き出しが可能な点は似通っている。しかし、String クラスは文字単位で、Buffer クラスはバイト単位でデータを管理する点が異なる。それにより、以下のような違いが生まれる。

#### length プロパティ

String クラスの場合の length プロパティは、文字数を表す。

Buffer クラスの場合の length プロパティは、バイト数を表す。

```javascript
const str = "あいうえお";
const buf = new Buffer("あいうえお");
console.log(str.length); // 5
console.log(buf.length); // 15
```

#### インデックス

String クラスから index 指定で値を取り出すとき、index の単位は 1 文字となる。

Buffer クラス index 指定で値を取り出すとき、index の単位は 1 バイトとなる。
Buffer クラスから index 指定で取り出された値は、整数となる。

なお、直観通り String も Byte も、その内容の最初の要素の index は 0 である。

```javascript
const str = "あいうえお";
const buf = new Buffer("あいうえお");
console.log(str[2]); // う
console.log(buf[2]); // 130
```

#### 不変性

String クラスは immutable だが、Buffer クラスは mutable である。そのため、Buffer クラスは[]演算子などでその値を直接変更できる。

```javascript
const str = "あいうえお";
const buf = new Buffer("あいうえお");
console.log(str); // あいうえお
console.log(buf); // <Buffer e3 81 82 e3 81 84 e3 81 86 e3 81 88 e3 81 8a>

str[0] = "か";
buf[0] = "か";

// strは書き換わらないが、bufは書き換わる
console.log(str); // あいうえお
console.log(buf); // <Buffer 00 81 82 e3 81 84 e3 81 86 e3 81 88 e3 81 8a>
```

#### メソッド

String クラスには、格納している内容を操作するメソッドが用意されている。

例えば、indexOf, match, search, replace, substring など。

しかし、Buffer クラスにはこのようなメソッドはない。ただし、指定した位置のデータを取り出すための slice メソッドは用意されている。

これは String クラスの slice メソッドと同じように利用できる。

```javascript
const str = "あいうえお";
const buf = new Buffer("あいうえお");
console.log(str.slice(2, 4)); // うえ
console.log(buf.slice(2, 4)); // <Buffer 82 e3 >
```

なお、slice メソッドで取り出した Buffer を変更するともとの Buffer も変更される。

### Buffer と String の相互変換

#### Buffer -> String の変換

Buffer#toString を用いることで、格納されたデータを文字列に変更できる。

```
Buffer#toString([encoding], [start], [end])
```

encoding が省略された場合、`utf8`が指定されたものとして扱われる。

start 引数には開始する位置を、end 引数には変換の開始位置と終了位置をバイト単位で指定する。

#### String -> Buffer の変換

文字列は Byte 列として扱いたい場合、Buffer のコンストラクタを使う。

また、既存の Buffer クラスに文字列を書き込みたい場合には、Buffer#write を使う。

```
Buffer#write(string, [offset], [length], [encoding])
```

string 引数には変換したい文字列、offset 引数と length 引数で変換後のデータの格納位置を指定する。

変換後の文字列は、格納されてるバイト列の最初から offset バイト目から、offset+length バイト目の位置に格納される。

offset のデフォルト値は 0, length の初期値は buffer.length - offset となる。

##### StringDecoder を使う場合

StringDecorder は Buffer オブジェクトは文字列に変換するためのオブジェクト。

```
new StringDecorder([encoding]);
```

なお、StringDecorder は明示的に require する必要がある。

Buffer から文字列への変換には、StringDecorder#write を使用する。

```javascript
const StringDecoder = require("string_decoder").StringDecoder;
const decoder = new StringDecoder();
const str = decoder.write(new Buffer("あ"));
console.log(str); // あ
```

### Buffer と Number の相互変換

JavaScript の数値はすべて Number 型として扱われる。しかし、入出力の際に数値の型を意識する必要がある場合がある。

Buffer クラスには、それらに対応したメソッドが用意されている。

これらは、指定した位置のバイナリデータを JavaScript の Number 型で読み出したり、Number 型のデータを指定した型で Buffer に格納する際に用いる。

これらのメソッドのインターフェースはどれも同じため、readUInt8 および writeUInt8 のみ使い方を示す。

#### Buffer -> Number への変換

バッファ内のデータを指定した形式で取り出す際には、以下の形式のメソッドを使う。

```
Buffer#readUInt8(offset, [noAssert]);
```

offset 引数には、取得すデータの位置を指定する。noAssert には、offset の値を検証するかどうかを bool 型で指定する。

noAssert はデフォルトでは false に設定されており、offset に Buffer の終端を超える値が指定された場合に RangeError を発生させる。

noAssert に true を設定した場合、offset に Buffer の終端を超える値が指定された場合、undefined を返す。

```javascript
const buf = new Buffer([0x00, 0x10, 0x20, 0x30]);
console.log(buf.readUInt8(0)); // 0
console.log(buf.readUInt8(1)); // 16
console.log(buf.readUInt8(2)); // 32
console.log(buf.readUInt8(3)); // 48
console.log(buf.readUInt8(4, true)); // undefined
console.log(buf.readUInt8(4)); // RangeError: Index out of range
```

#### Number -> Buffer への変換ｎ

Number 型のオブジェクトを指定した型で Buffer に格納するには、以下の形式のメソッドを使う。

```
Buffer#writeUInt8(value, offset, [noAssert]);
```

vallue には書き込みたいデータを、offset には書き込む位置を指定する。

noAssert は offset の値を検証するかを指定する。

```javascript
const buf = new Buffer([0x00, 0x10, 0x20, 0x30]);
console.log(buf); // <Buffer 00 10 20 30>
buf.writeUInt8(128, 0);
console.log(buf); // <Buffer 80 10 20 30>
buf.writeUInt8(255, 4, true); // noAssertがtrueの時、範囲を超えるoffsetを指定しすると無視される。
console.log(buf); // <Buffer 80 10 20 30>
buf.writeUInt8(255, 4); // RangeError
```

value に指定した型では扱えない範囲の値が指定された場合、例外が発生する

```
const buf = new Buffer([0x00, 0x10, 0x20, 0x30]);
buf.writeUInt8(256, 3); // TypeError: "value" argument is out of bounds
```

#### 数値との相互変換メソッドの一覧

| buf.readUInt8(offset, [noAssert])            | 8 ビット符合無し整数                        |
| -------------------------------------------- | ------------------------------------------- |
| buf.writeUInt8(value, offset, [noAssert])    |                                             |
| buf.readUInt16LE(offset, [noAssert])         | 16 ビット符合無し整数（リトルエンディアン） |
| buf.writeUInt16LE(value, offset, [noAssert]) |                                             |
| buf.readUInt16BE(offset, [noAssert])         | 16 ビット符合無し整数（ビッグエンディアン） |
| buf.writeUInt16BE(value, offset, [noAssert]) |                                             |
| buf.readUInt32LE(offset, [noAssert])         | 32 ビット符合無し整数（リトルエンディアン） |
| buf.writeUInt32LE(value, offset, [noAssert]) |                                             |
| buf.readUInt32BE(offset, [noAssert])         | 16 ビット符合無し整数（ビッグエンディアン） |
| buf.writeUInt32BE(value, offset, [noAssert]) |                                             |
| buf.readInt8(offset, [noAssert])             | 8 ビット符合あり整数                        |
| buf.writeInt8(value, offset, [noAssert])     |                                             |
| buf.readInt16LE(offset, [noAssert])          | 16 ビット符合あり整数（リトルエンディアン） |
| buf.writeInt16LE(value, offset, [noAssert])  |                                             |
| buf.readInt16BE(offset, [noAssert])          | 16 ビット符合無し整数（ビッグエンディアン） |
| buf.writeInt16BE(value, offset, [noAssert])  |                                             |
| buf.readInt32LE(offset, [noAssert])          | 32 ビット符合あり整数（リトルエンディアン） |
| buf.writeInt32LE(value, offset, [noAssert])  |                                             |
| buf.readInt32BE(offset, [noAssert])          | 32 ビット符合あり整数（ビッグエンディアン） |
| buf.writeInt32BE(value, offset, [noAssert])  |                                             |
| buf.readFloatLE(offset, [noAssert])          | 単精度浮動小数点数（リトルエンディアン）    |
| buf.writeFloatLE(value, offset, [noAssert])  |                                             |
| buf.readFloatBE(offset, [noAssert])          | 単精度浮動小数点数（ビッグエンディアン）    |
| buf.writeFloatBE(value, offset, [noAssert])  |                                             |
| buf.readDoubleLE(offset, [noAssert])         | 倍精度浮動小数点数（リトルエンディアン）    |
| buf.writeDoubleLE(value, offset, [noAssert]) |                                             |
| buf.readDoubleBE(offset, [noAssert])         | 倍精度浮動小数点数（ビッグエンディアン）    |

### Buufer オブジェクトのコピー

Buffer オブジェクトに格納されているデータをコピーするには、Buffer#copy を使用する。

```
Buffer#copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])
```

targetBuffer には書き込み先 Buffer オブジェクトを指定する。

targetStart で書き込み先の位置を指定する。

書き込むデータの範囲は、sourceStart と sourceEnde で指定できる。

targetStart 及び sourceStrart のデフォルト値は 0, sourceEnd の default 値は length と同じになっている。

```javascript
const a = new Buffer("Hello world");
const b = new Buffer(128);
b.fill(0);

console.log(a); // <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(b); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >

a.copy(b, 10);
console.log(b); // <Buffer 00 00 00 00 00 00 00 00 00 00 48 65 6c 6c 6f 20 77 6f 72 6c 64 00 00 ... >
```

### Buffer のクラスメソッド

* Buffer.isBuffer
* Buffer.byteLength
* Buffer.concat

#### オブジェクトが Buffer かを判定する

渡したオブジェクトが Buffer の場合 true を、そうでない場合 false を返す。

```
Buffer.isBuffer(obj)
```

```javascript
const str = "hello";
const buf = new Buffer("hello");
console.log(Buffer.isBuffer(str)); // false
console.log(Buffer.isBuffer(buf)); // true
```

#### 文字列のバイト長を計算する

渡した文字列のバイト長を計算する。文字列の長さではなく、Buffer に変換した場合の長さを返す。

```
Buffer#byteLength(string, [encoding])
```

```javascript
const str = "hello";
const buf = new Buffer(str);
console.log(Buffer.byteLength(str)); // 5
console.log(buf.length); // 5
```

#### 複数の Buffer を結合する

複数の Buffer を結合する。

```
Buffer#concat(list, [totalLength])
```

```javascript
const hello = new Buffer("hello");
const world = new Buffer("world");
const helloWorld = Buffer.concat([hello, world]);
console.log(hello); // <Buffer 68 65 6c 6c 6f>
console.log(world); // <Buffer 77 6f 72 6c 64>
console.log(helloWorld); // <Buffer 68 65 6c 6c 6f 77 6f 72 6c 64>
```

list には結合する Buffer を格納した配列を、totalLength には結合結果の Buffer のサイズを指定する。

totalLength が指定されなかった場合、結果の Buffer は list で指定した各 Buffer の合計となる。

## 参考資料

* [はじめての Node.js：Node.js 内でバイナリデータを扱うための「Buffer」クラス](https://mag.osdn.jp/13/04/09/193000)
