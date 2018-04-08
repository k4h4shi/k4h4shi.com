---
title: ReactのHOCについて
date: 2018-03-01 00:47:58
tags:
---
HOCとは、higher-order componentの略です。

機能的に説明すると、コンポーネントを引数にとって、新たなコンポーネントを返す関数のことを指します。

これを使えば、既存のコンポーネントを変更せずに機能を追加できます。

## HOCの実装例
単純なHOCの実装例を紹介いたします。

エナジードリンクを人間に与えて元気づける。ということをモデルに説明します。

### withEnergyDrink関数
人間のコンポーネントを受け取って、エナジードリンクで活力を与え、再度人間を返す関数です。

内部では、渡されたコンポーネントのvitalizedプロパティをtrueにしたうえで返しています。
```
import React, { Component } from "react";

const withEnergyDrink = Person => class extends Component {
  render() {
    return <Person vitalized={true} {...this.props} />;
  }
}

export default withEnergyDrink;
```

### Personコンポーネント
人間は、活力が与えられないと元気がでないものです。

Personコンポーネントは、vitalizedプロパティがtrueの場合はVitalized!と、そうでない場合はNot vitalized...と出力します。

```
import React from "react";

const Person = ({vitalized}) => {
  return vitalized
    ? <span>I'm Vitalized!</span>
    : <span>I'm not vitalized...</span>;
}

export default Person;
```

### Appコンポーネント
withEnergyDrinkによってエナジードリンクを与えられた人間と、そうでない人間の違いを表示します。

1度withEnergyDrinkに渡したPersonWithEnergyDrinkコンポーネントは、元気いっぱいです。

そうでないPersonコンポーネントはあまり元気がありません。
```
import React, { Component } from 'react';

import Person from "./Person";
import withEnergyDrink from "./withEnergyDrink";

const PersonWithEnergyDrink = withEnergyDrink(Person);

class App extends Component {
  render() {
    return (
      <div>
        a person with energy drink: <PersonWithEnergyDrink />
        <br />
        a person without energy drink: <Person />
      </div>
    );
  }
}

export default App;
```

## まとめ
みなさんも、元気を出したい時には栄養ドリンクを摂取しましょう。

## 参考文献
- [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html)
