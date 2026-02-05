export default [
	{
		input: 'http://127.0.0.1:8000/openapi.json',
		output: 'src/lib/api/public-client',
		plugins: ['@tanstack/svelte-query']
	},
	{
		input: 'http://127.0.0.1:8000/private/openapi.json',
		output: 'src/lib/api/private-client',
		plugins: ['@tanstack/svelte-query']
	}
];
