import uuid from 'uuid';
import {postJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}


export function getViewOrder(param) {
    return postJson('/order/viewOrder', {...baseParams, param});
}


export function createOrder(param) {
    return postJson('/order/createOrder', {...baseParams, param});
}