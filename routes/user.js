const joi = require('joi');
const User = require('../Services/User')

const me = {
    path: '/api/v1/user/me',
    method: 'GET',
    config: {
      description: 'Get authenticated user',
      tags: ['api', 'user'],
      validate: {
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
					const data = await User.getMe(request.headers);
					return h.response(data).code(data.statusCode);
				} catch (error) {
					return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
				}
          
      },
    },
  };

  const getSSHKey = {
    path: '/api/v1/user/ssh-keys',
    method: 'GET',
    config: {
      description: 'Get given users\' ssh-keys',
      tags: ['api', 'user', 'ssh-keys'],
      validate: {
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
					const data = await User.getSSHKey(request.headers);
					return h.response(data).code(data.statusCode);
				} catch (error) {
					return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
				}
          
      },
    },
  };

  const addSSHKey = {
    path: '/api/v1/user/ssh-keys',
    method: 'POST',
    config: {
      description: 'Add given users\' ssh-keys',
      tags: ['api', 'user', 'ssh-keys'],
      validate: {
        payload: {
          ssh_key: joi.string().required(),
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
					const data = await User.addSSHKey(request.headers, request.payload);
					return h.response(data).code(data.statusCode);
				} catch (error) {
					return h.response({ message: error.message, result: {}, statusCode: error.statusCode }).code(error.statusCode);
				}
          
      },
    },
  };

  module.exports = [
    me,
    getSSHKey,
    addSSHKey
  ]