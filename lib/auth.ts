import * as jwt from 'jsonwebtoken';

declare var Promise: any;

function verifyJWTToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if(err || !decodedToken) {
				reject(err);
			} else {
				resolve(decodedToken);
			}
		});
	});
}

export default verifyJWTToken;