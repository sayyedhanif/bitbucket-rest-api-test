
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
				if (body && typeof body === 'string'){
					try {
						body = JSON.parse(body)
					} catch (err) {
						reject({ success: false, message :'Internal server error!' , data: {}, code : response.statusCode});
					}
				}
				if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
					
					resolve({ success: true, message :'user repositories return successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.error.message, data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}

	static getReposPermissions(headers) {
    return new Promise(async (resolve, reject) => {
			console.log(headers)
			request({
				method: 'GET',
				url: `https://api.bitbucket.org/2.0/user/permissions/repositories`,
				auth: {
					user: headers.username,
					pass: headers.password,
				}
			}, function (error, response, body) {
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
					
					resolve({ success: true, message :'user repositories permissions return successfully!' , data: body, statusCode: 200});
				} else if(response.statusCode && response.statusCode == 401 || response.statusCode == 403){
					reject({ success: false, message :'Authenticaion error!' , data: {}, statusCode : response.statusCode} );
				} else {
					reject({ success: false, message :body.error.message, data: {}, statusCode: response.statusCode});
				}            
			})
		});
	}
	static createRepo(headers,payload, params) {
    return new Promise(async (resolve, reject) => {
			request({
				method: 'POST',
				url: `https://api.bitbucket.org/2.0/repositories/${params.username}/${params.repo_slug}`,
				auth: {
					"user": headers.username,
					"pass": headers.password,
				},
				json:true,
        json: payload,
				headers: {
					"Content-Type": 'application/json',
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
					resolve({ success: true, message :'SSH key added tp your account successfully!' , data: body, statusCode: 201});
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
