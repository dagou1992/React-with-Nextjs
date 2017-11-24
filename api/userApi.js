import uuid from 'uuid';
import {postJson} from '../utils/xhrUtil';

const reqId = uuid.v4();
const timestamp = Date.now();
const baseParams = {
    reqId,
    timestamp,
}

export function getMyInfo() {
    return postJson('/user/myInfo', {...baseParams, param: ''})
}

export function logout() {
    return postJson('/appUser/logout', {...baseParams, param: null})
}
