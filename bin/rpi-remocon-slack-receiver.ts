#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RpiRemoconSlackReceiverStack } from '../lib/rpi-remocon-slack-receiver-stack';

const app = new cdk.App();
new RpiRemoconSlackReceiverStack(app, 'RpiRemoconSlackReceiverStack');
