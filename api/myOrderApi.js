import uuid from 'uuid';
import {postJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}

export function getMyOrder(param) {
    return postJson('/order/getMyOrder', {...baseParams, param})
}

export function getExpressRecord(param) {
    return postJson('/order/getExpressRecord', {...baseParams, param})
}
