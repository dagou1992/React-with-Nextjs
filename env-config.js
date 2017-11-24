const env = process.env.NODE_ENV;

let apiBaseUrl = 'http://127.0.0.1:3000/api';

switch (env) {
    case 'test':
        apiBaseUrl = 'http://tomshoph5-test.talkingtomandfriends.cn/api';
        break;

    case 'production':
        apiBaseUrl = 'https://tomshop.talkingtomandfriends.cn/api';
        break;

    default:
        apiBaseUrl = 'http://127.0.0.1:3000/api';
        break;
}

module.exports = {
  'process.env.API_BASE_URL': apiBaseUrl
}