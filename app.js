'use strict';

const Hapi = require('hapi');
const routes = require('hapi-auto-routes');
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');

const init = async () => {

	const server = Hapi.server({
		port: 3032,
		host: 'localhost',
		routes: {
			cors: true,
		},
	});

	const swaggerOptions = {
		info: {
			title: 'Bitbucket API Integration Documentation',
			version: '0.0.1',
		},
	};
	await server.register([
		inert,
		vision,
		{
			plugin: hapiSwagger,
			options: swaggerOptions,
		},
	]);
	routes.bind(server).register({
		pattern: `${__dirname}/routes/**/*.js`,
	});

	await server.start();
	console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
