import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigateway from '@aws-cdk/aws-apigateway'
import * as sqs from '@aws-cdk/aws-sqs'
import * as iam from '@aws-cdk/aws-iam'

export class RpiRemoconSlackReceiverStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        // SQS
        const receiverQueueProps: sqs.QueueProps = {
            queueName: 'RpiRemoconSlackReceiverQueue'
        }
        const receiverQueue = new sqs.Queue(this, 'receiverQueue', receiverQueueProps)

        // Lambda
        const receiverLambdaProps: lambda.FunctionProps = {
            functionName: 'RpiRemoconSlackReceiverFunction',
            runtime: lambda.Runtime.RUBY_2_7,
            code: lambda.AssetCode.fromAsset('lambda/event-receiver'),
            handler: 'app.handler',
            timeout: cdk.Duration.seconds(3),
            environment: {
                SQS_URL: receiverQueue.queueUrl
            }
        }
        const receiverLambda = new lambda.Function(this, 'receiverLambda', receiverLambdaProps)
        receiverLambda.addToRolePolicy(new iam.PolicyStatement({
            actions: ['sqs:SendMessage'],
            resources: [receiverQueue.queueArn]
        }))

        // API Gateway
        const receiverApiGatewayProps: apigateway.LambdaRestApiProps = {
            restApiName: 'RpiRemoconSlackReceiverApi',
            handler: receiverLambda
        }
        const receiverApiGateway = new apigateway.LambdaRestApi(this, 'receiverApiGateway', receiverApiGatewayProps)
    }
}
