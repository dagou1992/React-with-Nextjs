import uuid from 'uuid';
import {postJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}

export function getSpuDetail(param) {
    return postJson('/item/getSpuDetail', {...baseParams, param})
}

export function getSkuList(param) {
    return postJson('/item/getSkuList', {...baseParams, param})
}

export function addShoppingCart(param) {
    return postJson('/cart/addCart', {...baseParams, param})
}