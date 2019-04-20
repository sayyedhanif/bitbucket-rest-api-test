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

	const getReposPermissions= {
    path: '/api/v1/user/permissions/repositories',
    method: 'GET',
    config: {
      description: 'List your repositories permissions',
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
					const data = await Repository.getReposPermissions(request.headers);
					return h.response(data).code(data.statusCode);
				} catch (error) {
					return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
				} 
      },
    },
	};

	const createRepo = {
    path: '/api/v1/repositories/{username}/{repo_slug}',
    method: 'POST',
    config: {
      description: 'Add given users\' ssh-keys',
      tags: ['api', 'user', 'ssh-keys'],
      validate: {
        payload: {
					name: joi.string().required(),
					description: joi.string().optional(),
					scm: joi.string().optional(),
					language: joi.string().optional(),
					website: joi.string().optional(),
					is_private: joi.boolean().optional(),
				},
				params: {
					username: joi.string().required(),
					repo_slug: joi.string().required(),
				},
				headers: joi.object({					
          "username": joi.string().required(),
          "password": joi.string().required(),
				}).unknown(),
			},
      handler: async (request, h) => {
				if (request.headers && !request.headers['username']) {
					return h.response({ message: 'Credentials are not privided!', result: {}, statusCode: 400 }).code(400);
				}	
				try {
					const data = await Repository.createRepo(request.headers, request.payload, request.params);
					return h.response(data).code(data.statusCode);
				} catch (error) {
					return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
				}
          
      },
    },
  };
	

  module.exports = [
		getRepos,
		getReposPermissions,
		createRepo
  ]