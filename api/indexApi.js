import uuid from 'uuid';
import {postJson, postNoApiJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}

export function getBannerList() {
    return postJson('/banner/getBannerList', {...baseParams, param: ''})
}

export function getSpuList(param) {
    return postJson('/item/getSpuList', {...baseParams, param})
}

export function uploadClickData(param) {
    return postJson('/data/uploadClickData', {...baseParams, param})
}

export function statisticsPv(param) {
    return postNoApiJson('/pv?url='+param, {...baseParams, param:''})
}