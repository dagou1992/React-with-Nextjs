import CommonError from '../common/CommonError';

export default function(json) {
    if (json.code !== 0) {
        var err = new CommonError(json.code, json.message);
        throw err;
    }

    return json.result;
}