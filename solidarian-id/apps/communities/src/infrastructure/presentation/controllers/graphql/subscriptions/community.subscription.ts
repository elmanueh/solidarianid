import { PubSub } from 'graphql-subscriptions';

export const pubSub = new PubSub();

export const CAUSE_CREATED_TOPIC = 'causeCreated';
export const ACTION_CREATED_TOPIC = 'actionCreated';
export const REQUEST_STATUS_CHANGED_TOPIC = 'requestStatusChanged';
