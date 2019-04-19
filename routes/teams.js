const joi = require('joi');
const Teams = require('../Services/Teams')

const getUserTeams = {
	path: '/api/v1/user/teams',
	method: 'GET',
	config: {
		description: 'Get User Teams',
		tags: ['api', 'teams'],
		validate: {
			headers: joi.object({					
				"username": joi.string().required(),
				"password": joi.string().required(),
					  }).unknown(),
			query: {
				role: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers.username) {
				return h.response({ message: 'Credentials are not privided!', result: {}, statusCode: 400 }).code(400);
			}	
			try {
				const data = await Teams.getUserTeams(request.headers, request.query);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};

module.exports = [
	getUserTeams,
]