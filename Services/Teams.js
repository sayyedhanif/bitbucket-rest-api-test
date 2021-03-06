var request = require('request');

const config = require('../config')

class Teams {
  	static getUserTeams(headers, query) {
    return new Promise(async (resolve, reject) => {

			request({
				method: 'GET',
				url: `https://api.bitbucket.org/2.0/teams`,
				auth : {
					user: headers.username,
					pass: headers.password
				},
				qs: {
					role: query.role
				}
			}, function (error, response, body) {
				console.log(error, body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if (body && typeof body === 'string'){
					try {
						body = JSON.parse(body)
					} catch (err) {
						reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
					}
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					
					resolve({ success: true, message :'Get user team!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.error.message, data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}

}

module.exports = Teams;
