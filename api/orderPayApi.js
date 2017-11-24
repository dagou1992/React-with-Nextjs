import uuid from 'uuid';
import {postJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}

export function confirmPay(param) {
    return postJson('/pay/confirmPay', {...baseParams, param});
}
