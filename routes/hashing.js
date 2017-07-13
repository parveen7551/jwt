const {SHA256} = require('crypto-js');
var message = 'sample user test';
var hash = SHA256(message).toString();
console.log(`message: ${message}`);
console.log(`hash:${hash}`);
var data  = {
    id:4
}

var token = {
    data,
    hash:SHA256(JSON.stringify(data) + 'mysecretkey').toString()
}

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'mysecretkey').toString();
if(resultHash === token.hash) {
    console.log("Data part not changed.");
} else {
    console.log("Data part is changed. Do not trust the user.");
}
