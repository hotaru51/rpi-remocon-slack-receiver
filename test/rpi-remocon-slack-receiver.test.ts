import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RpiRemoconSlackReceiver from '../lib/rpi-remocon-slack-receiver-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RpiRemoconSlackReceiver.RpiRemoconSlackReceiverStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
