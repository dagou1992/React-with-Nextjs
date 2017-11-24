import uuid from 'uuid';
import {postJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}

export function getCartList() {
    return postJson('/cart/getCartList', {...baseParams, param: ''})
}

export function editCart(param) {
    return postJson('/cart/editCart', {...baseParams, param})
}

export function deleteCart(param) {
    return postJson('/cart/deleteCart', {...baseParams, param})
}