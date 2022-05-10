const crypto = require('crypto');

const encode = (str)=>{
     encoded_str = crypto.createHash('SHA256').update(str).digest('hex');
     return encoded_str;
}

module.exports = encode;