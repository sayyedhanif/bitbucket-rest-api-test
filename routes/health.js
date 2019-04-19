const joi = require('joi');
const test = {
	path: '/api/v1/health',
	method: 'GET',
	config: {
		description: 'TEST Api',
		tags: ['api', 'test'],
		
		handler(request, h) {
				console.log('inside test api')
				return { success: true, message :'Server connected!' };
		},
	},
};

module.exports = [
	test
]