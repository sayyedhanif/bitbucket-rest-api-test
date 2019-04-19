const joi = require('joi');
const Repository = require('../Services/Repository')

const getRepos = {
    path: '/api/v1/user/repositories',
    method: 'GET',
    config: {
      description: 'List your repositories',
      tags: ['api', 'user'],
      validate: {
				headers: joi.object({
					"username": joi.string().required(),
					"password": joi.string().required(),
				}).unknown(),
			},
      handler: async (request, h) => {
				if (request.headers && !request.headers.username) {
					return h.response({ message: 'Credentials are not privided!', result: {}, statusCode: 400 }).code(400);
				}	
        try {
					const data = await Repository.getRepos(request.headers);
					return h.response(data).code(data.statusCode);
				} catch (error) {
					return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
				} 
      },
    },
	};
	
	const createRepo = {
    path: '/api/v1/user/repositories',
    method: 'POST',
    config: {
      description: 'Create user repositories',
      tags: ['api', 'user'],
      validate: {
				payload: {
					name: joi.string().required(),
					description: joi.string().optional(),
					homepage: joi.string().optional(),
					private: joi.boolean().optional(),
					auto_init: joi.boolean().optional(),
				},
				headers: joi.object({
					"token": joi.string().required(),
					"username": joi.string().required(),
				}).unknown(),
			},
      handler: async (request, h) => {
				if (request.headers && !request.headers.token) {
					return h.response({ message: 'Token are not Privided!', result: {}, statusCode: 400 }).code(400);
				}			
        try {
					const data = await Repository.createRepo(request.payload,request.headers.token, request.headers.username);
					return h.response(data).code(data.statusCode);
				} catch (error) {
					return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
				} 
      },
    },
  };

  module.exports = [
		getRepos,
		// createRepo
  ]