---
title: ReactとAWSを使ってServerlessアプリケーションをデプロイする[2]
date: 2017-11-25 23:29:27
tags:
---
## Noteを作成するAPIを追加する
前回までの設定で、AWA Lambdaの関数が作成できるようになったため、Noteを作成するAPIを追加する

### 関数を追加する
`create.js`という名前のファイルをプロジェクトルートに作成し、内容を以下にする。

```
import uuid from 'uuid';
import AWS from 'aws-sdk';

// AWS JS SDKにリージョンを設定
AWS.config.update({ region: 'us-east-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  // HTTPのリクエストボディはevent.boydにJSON文字列として渡される。
  const data = JSON.parse(event.body);

  const params = {
    // アイテムを作成するテーブルの名前
    TableName: "todone-notes",
    // Item属性は作成されるアイテムの属性を含む
    Item: {
      // Cognito Poolで認証されたユーザID
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      createdAt: new Date().getTime()
    }
  }

  // アイテムの作成はputメソッドで行う
  dynamoDb.put(params, (err, data) => {
    // CORSを有効化するためのレスポンスヘッダーを設定
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }

    // ステータスコード500で返却
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // ステータスコード200で作成されたアイテムを返却
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}
```

### APIエンドポイントの設定をする
関数のAPIエンドポイントの設定は、`serverless.yml`を利用して行うことができる。
差分だけを記載する
```
# iamRoleStatementsはLambda関数のパーミッションポリシーを定義する
# Lambda関数にDynamoDBにアクセスする権限を与える。
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:us-east-1:*:*"

# createというLambda関数についての設定
# frontendは別の別のドメインによって配信されるため、CORSを有効化している
functions:
  create:
    handler: create.main
    events:
      - http:
          path: notes
          method: post
          cors: true
          authrizer: aws_iam
```

### テストを行う
ここまででAPIのテストを行えるようになった。
テストを行うために、入力パラメータをモックする。

```
$ mkdir mocks
$ cd mocks
```

`mocks/create-event.json`を作成し、内容を以下にする
```
{
  "body": "{\"content\":\"hello world\"}",
  "requestContext": {
    "identity": {
      "cognitoIdentityId": "USER-SUB-1234"
    }
  }
}
```

以下のコマンドでローカルにて関数を実行
```
$ serverless invoke local --function create --path mocks/create-event.json
```

以下のようなレスポンスが返れば成功
```
{
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  body: '{"userId":"USER-SUB-1234","noteId":"578eb840-f70f-11e6-9d1a-1359b3b22944","content":"hello world","createdAt":1487800950620}'
}
```