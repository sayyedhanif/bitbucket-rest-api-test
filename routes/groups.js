const joi = require('joi');
const Groups = require('../Services/Groups')

const getGroupMembers = {
	path: '/api/v1/groups/{id}/members',
	method: 'GET',
	config: {
		description: 'Get Group Members',
		tags: ['api', 'members','group'],
		validate: {
			headers: joi.object({
				"private-token": joi.string().required(),
			}).unknown(),
			params: {
				id: joi.string().required(),
			},
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers['private-token']) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}	
			try {
				const data = await Groups.getGroupMembers(request.headers, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			}				
		},
	},
};


const addGroupMembers = {
	path: '/api/v1/groups/{id}/members',
	method: 'POST',
	config: {
		description: 'Add member to group',
		tags: ['api', 'member',  'group'],
		validate: {
			payload: {
				user_id: joi.number().required(),
				access_level: joi.number().required(),
				expires_at: joi.string().optional(),
			},
			params: {
				id: joi.string().required(),
			},
			headers: joi.object({
				"private-token": joi.string().required(),
			}).unknown(),
		},
		handler: async (request, h) => {
			if (request.headers && !request.headers['private-token']) {
				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
			}			
			try {
				const data = await Projects.addGroupMembers(request.headers,request.payload, request.params);
				return h.response(data).code(data.statusCode);
			} catch (error) {
				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
			} 
		},
	},
};

// const getUserTeams = {
// 	path: '/api/v1/user/teams',
// 	method: 'GET',
// 	config: {
// 		description: 'Get User Teams',
// 		tags: ['api', 'teams'],
// 		validate: {
// 			headers: joi.object({
// 				"token": joi.string().required(),
// 				"username": joi.string().required(),
// 				}).unknown(),
// 		},
// 		handler: async (request, h) => {
// 			if (request.headers && !request.headers.token) {
// 				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
// 			}	
// 			try {
// 				const data = await Teams.getUserTeams(request.headers, request.params);
// 				return h.response(data).code(data.statusCode);
// 			} catch (error) {
// 				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
// 			}				
// 		},
// 	},
// };

// const listTeamMembers = {
// 	path: '/api/v1/teams/{id}/members',
// 	method: 'GET',
// 	config: {
// 		description: 'Get Team Members',
// 		tags: ['api', 'team', 'members'],
// 		validate: {
// 			headers: joi.object({
// 				"token": joi.string().required(),
// 				"username": joi.string().required(),
// 				}).unknown(),
// 			params: {
// 				id: joi.string().required(),
// 			},
// 		},
// 		handler: async (request, h) => {
// 			if (request.headers && !request.headers.token) {
// 				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
// 			}	
// 			try {
// 				const data = await Teams.listTeamMembers(request.headers, request.params);
// 				return h.response(data).code(data.statusCode);
// 			} catch (error) {
// 				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
// 			}				
// 		},
// 	},
// };

// const addTeamMembers = {
// 	path: '/api/v1/teams/{id}/members/{user}',
// 	method: 'PUT',
// 	config: {
// 		description: 'Add Team Members',
// 		tags: ['api', 'team', 'members'],
// 		validate: {
// 			headers: joi.object({
// 				"token": joi.string().required(),
// 				"username": joi.string().required(),
// 				}).unknown(),
// 			params: {
// 				id: joi.string().required(),
// 				user: joi.string().required(),
// 			},
// 		},
// 		handler: async (request, h) => {
// 			if (request.headers && !request.headers.token) {
// 				return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
// 			}	
// 			try {
// 				const data = await Teams.addTeamMembers(request.headers, request.params);
// 				return h.response(data).code(data.statusCode);
// 			} catch (error) {
// 				return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
// 			}				
// 		},
// 	},
// };

module.exports = [
	// getGroupMembers,
	// addGroupMembers,
	// 	getUserTeams,
// 	listTeamMembers,
// 	addTeamMembers
]