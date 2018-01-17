---
title: ReactとAWSを使ってServerlessアプリケーションをデプロイする[1]
date: 2017-11-25 23:29:27
tags:
---
## AWSの初期設定
## AWSアカウントを作る
## IAM(Identity and Access Management) userを作る
AWS CLIとServerless Frameworkから利用されるユーザを作る
```
Access key ID: AKIAJ4KS3MZ2SQVIJXEA
Secret access key: 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
```

## AWS CLIをインストールする
## AWSを利用したバックエンドの構築
### Dynamo DBでテーブルを作る
```
テーブル名: todone-notes
Primary key: userId
Sort key: noteId
```
### Cognitoでユーザープールを作る
```
ユーザープールを作る
Pool名: todone-user-pool
Pool Id: us-east-1_Trf85aUHa
Pool ARN: arn:aws:cognito-idp:us-east-1:505462054740:userpool/us-east-1_Trf85aUHa
```

### App Clientを作る
```
App client id: 4c4h0q24pmc8m10pkgsvdnidht
```
#### テストユーザーを作る
コマンドを実行
```
$ aws cognito-idp sign-up --region us-east-1 --client-id 4c4h0q24pmc8m10pkgsvdnidht --username todone_test@yahoo.co.jp --password Tod0ne_test
```
レスポンス
```
{
    "UserConfirmed": false,
    "UserSub": "c6d9776e-74c4-4e1d-a4c1-b1792b3a37a3",
    "CodeDeliveryDetails": {
        "AttributeName": "email",
        "Destination": "t***@y***.jp",
        "DeliveryMedium": "EMAIL"
    }
}
```
#### テストユーザを認証
```
$ aws cognito-idp admin-confirm-sign-up --region us-east-1 --user-pool-id us-east-1_Trf85aUHa --username todone_test@yahoo.co.jp
```

## Serverless Frameworkのセットアップ
### Serverlessをインストール
APIバックエンドのディレクトリを作成
```
$ mkdir todone-api
$ cd todone-api
```

Serverlessをグローバルにインストール
```
$ npm i serverless -g
```

APIバックエンドのプロジェクトルートでAWS Node.jsサービスを作成
```
$ serverless create --template aws-nodejs
```
handler.jsとserverless.ymlが作成されていれば成功
```
$ ls
handler.js    serverless.yml
```
- handler.js: AWS Lambdaにデプロイされる、実際のコードを含むファイル
- serverless.yml: Serverlessの設定ファイル

### AWSに関係する依存性を追加
npmモジュールとして初期化
```
$ npm init -y
```
```
$ npm i aws-sdk --save-dev
$ npm i uuid --save
```
- aws-sdk: AWSサービスのためのSDK
- uuid: ユニークなIDを生成する

## ES6/ES7をサポートする環境の構築
### BabelとWebpackをインストールする
プロジェクトルートにて、以下を実行する
```
$ npm install --save-dev \
    babel-core \
    babel-loader \
    babel-plugin-transform-runtime \
    babel-preset-es2015 \
    babel-preset-stage-3 \
    serverless-webpack \
    webpack \
    webpack-node-externals
$ npm install --save babel-runtime
```

`serverless-webpack`によって、Serverlessのコマンド実行時にWebpackのビルドを鳥がするように設定する
`webpack-node-externals`はWebpackと互換性のない`aws-sdk`のモジュールをbandleに含めないために必要。

### webpack.config.jsを追加
```
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  // 全てのnodeの依存モジュールを除外
  externals: [nodeExternals()],
  // /node_modules以下を除く、全ての.jsファイルをバンドルにする
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
```
上記の設定は`serverless-webpack`プラグインの一部である、`slsw.lib.entries`をエントリポイントとして利用している。
これは全てのhandler関数を集めて、パッケージ化する

### .babelrcを追加する
```
{
  "plugins": ["transform-runtime"],
  "presets": ["es2015", "stage-3"]
}
```
### serverless.ymlを編集
```
service: notes-app-api

# serverless-webpackプラグインを使ってES6/ES7へトランスパイルする
plugins:
  - serverless-webpack

# 外部モジュールのauto-packingを有効化
custom:
  webpackIncludeModules: true

provider:
  name: aws
  runtime: nodejs6.10
  stage: prod
  region: us-east-1
```

## APIを実装してデプロイする
Serverlessの出力
```
Service Information
service: todone-api
stage: prod
region: us-east-1
stack: todone-api-prod
api keys:
  None
endpoints:
  POST - https://keo3iqbde4.execute-api.us-east-1.amazonaws.com/prod/notes
  GET - https://keo3iqbde4.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
  GET - https://keo3iqbde4.execute-api.us-east-1.amazonaws.com/prod/notes
  PUT - https://keo3iqbde4.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
  DELETE - https://keo3iqbde4.execute-api.us-east-1.amazonaws.com/prod/notes/{id}
functions:
  create: todone-api-prod-create
  get: todone-api-prod-get
  list: todone-api-prod-list
  update: todone-api-prod-update
  delete: todone-api-prod-delete
```
## Federeted identityを設定する
### Cognito identity poolを作成する
```
Identity pool name: todone identity pool
User Pool ID: us-east-1_Trf85aUHa
App Client ID: 4c4h0q24pmc8m10pkgsvdnidht
```
### Policyを追加する
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "execute-api:Invoke"
      ],
      "Resource": [
        "arn:aws:execute-api:us-east-1:*:keo3iqbde4/*"
      ]
    }
  ]
}
```


```
identity pool ID: us-east-1:cce57c3a-0229-4cd2-95ef-222c9c5ac408
```

## APIをテストする
これでバックエンドAPIが完成したのでテストする。
```
$ npm install -g aws-api-gateway-cli-test
```
以下を実行する
```
$ apig-test --username='todone_test@yahoo.co.jp' --password='Tod0ne_test' --user-pool-id='us-east-1_Trf85aUHa' --app-client-id='4c4h0q24pmc8m10pkgsvdnidht' --cognito-region='us-east-1' --identity-pool-id='us-east-1:cce57c3a-0229-4cd2-95ef-222c9c5ac408' --invoke-url='https://keo3iqbde4.execute-api.us-east-1.amazonaws.com/prod' --api-gateway-region='us-east-1' --path-template='/notes/' --method='POST' --body='{"content": "API Test"}'
```

## 参考書籍
- [serverless-stack.com](https://serverless-stack.com/)
