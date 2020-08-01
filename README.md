# rpi-remocon-slack-receiver

Raspberry Pi学習リモコンSlack bot用AWSリソース

## Requirement

* AWS CDK
    * TypeScript
* Node.js
* Ruby 2.7

## AWS Resource

```
(Slack Event API)
↓
- - - - -  AWS  - - - - -
↓
API Gateway
↓
Lambda
↓
SQS
↓
- - - - - Local - - - - -
↓
(rpi-remocon-container)
↓
(rpi-remocon-api)
```

## Deploy

```sh
yarn install
yarn run build
cdk deploy
```

デプロイ後、Slackの `Event Subscriptions` のURL verificationを実施
