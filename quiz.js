import fernet from 'fernet'
// Assuming you have already done "npm install fernet"

let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcFahaQ0uysUaLqYGfM9AVUmeKOmdJ8odUJfsNDeMDEfFVPpiz3oSVjyp2w12QsGKGZKRtdIt5URsIXzK8aQB7OyjtOSK3mHCBbvko3isQ3eUNFkGuhsY8AJ9Nq4ssIr4NUbHHcEw-2NSZrrLBRoF8r6-5EwHw4Zo8eZHXIOo9xcMIuM4GnF-DRRSb0UKCUz2SGRTx'
let token = new fernet.Token({secret: secret, token: message, ttl:0})
//token.decode()
//let decoded = new fernet.decode(token)
let decoded = token.decode();
console.log(decoded)