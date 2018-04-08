---
title: ReactのPropTypes Validatorについて
date: 2017-12-18 21:28:06
tags:
- React
- PropTypes
- validation
- front-end
---

React の PropTypes Validator についてのメモ

## PropTypes Validator とは

React コンポーネントで型チェックをするためのもの。

コンポーネントがどんな属性を持っていて、どんな属性が必須で、どんなタイプの値を貰うべきかを定義するもの。

もともとは、React 本体に`React.PropTypes`として定義されていた。

現在では、`prop-types`として別パッケージとして切り出されている。

## prop-types を導入する

`prop-types`は以下のコマンドでインストールできる。

```
$ npm i --save prop-types
```

TypeScript や Flow も PropType Validator の代替として使える。

それらの静的型チェックの方法については、[公式](https://reactjs.org/docs/static-type-checking.html)を参照のこと。

## PropTypes Validator の記述方法

`PropTypes`を import した上で、コンポーネントの`propTypes`プロパティに、オブジェクトとして設定する。

### 型チェック

型チェックのための値は`PropTypes`のプロパティとして用意されている。

`PropTypes.object`と`PropTypes.array`は非推奨となっている。

そのために代わりに、`PropTypes.objectOf`または、`PropTypes.shape`、`PropTypes.arrayOf`を使う。
|型|説明|
|:-|:-|
|PropTypes.array| 配列であることをチェック。|
|PropTypes.bool| 真偽値であることをチェック。|
|PropTypes.func| 関数であることをチェック。|
|PropTypes.number| 数値であることをチェック。|
|PropTypes.object| オブジェクトであることをチェック。|
|PropTypes.string| 文字列であることをチェック。|
|PropTypes.symbol| シンボルであることをチェック。|
|PropTypes.objectOf| 引数に渡した型のオブジェクトであることをチェック。|
|PropTypes.shape| 引数に渡した型のオブジェクトであることをチェック。|
|PropTypes.arrayOf| 引数に渡した型の配列であることをチェック。|
|PropTypes.node| レンダリングできる値であるかチェック。|
|PropTypes.element| React element であるかチェック。|
|PropTypes.instanceOf| 引数に渡した型のインスタンスであるかチェック。|
|PropTypes.oneOf| 引数に渡した配列の値のどれかであるかチェック。|
|PropTypes.any.isRequired| 型はなんでも良いが必須チェック。|

### サンプル

以下は`id`と`name`, `age`というプロパティを持つ`Employee`というコンポーネントの例。

各プロパティの型と、`id`と`name`が必須であることを定義している。

```
import PropTypes from 'prop-types';

const Employee = (props) => {
  const {id, name, age} = props;
  return (
    <div>
      <span>{`id: ${id}`}</span>
      <span>{`name: ${name}`}</span>
      {
        age ? <span>`age: ${age}`</span> : ''
      }
    </div>
  )
};

Employee.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};
```

## 参考リンク

* [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
