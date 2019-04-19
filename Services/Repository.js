
var request = require('request');

const config = require('../config')

class Repository {
  static getRepos(headers) {
    return new Promise(async (resolve, reject) => {
			console.log(headers)
			request({
				method: 'GET',
				url: `https://api.bitbucket.org/2.0/repositories/${headers.username}`,
				auth: {
					user: headers.username,
					pass: headers.password,
				}
			}, function (error, response, body) {
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'user repositories return successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}
	
	static createRepo(payload,token,username) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'POST',
				url: 'https://api.github.com/user/repos',
				auth : {
					user: username,
					pass: token
				},
				json:true,
        json: payload,
				headers: {
					"Accept" : "application/vnd.github.inertia-preview+json",
					"Content-Type": 'application/json',
					'user-agent': 'node.js'
				}	
			}, function (error, response, body) {
				console.log(error,  body)
				if (error) {
					console.log(' request failed:', error);
					reject({ success: false, message :error , data: {}, statusCode: 500});
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					if (body && typeof body === 'string'){
						try {
							body = JSON.parse(body)
						} catch (err) {
							reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
						}
					}
					resolve({ success: true, message :'user repositories created successfully!' , data: body, statusCode: 201});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :'Internal server error!' , data: {}, statusCode: response.statusCode});
				}            
			})
		});
  }
}

module.exports = Repository;
