var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

module.exports = api;

api.post('/email', (request) => {
    return request
});