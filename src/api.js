import http from 'http'
import { TeamService } from './service/teamService.js'

const routes = {
  '/team:get': async (request, response) => {

    //chama o service
    const pokemonTeams = new TeamService()
    const team = await pokemonTeams.getPokemonsTeam();

    response.end(JSON.stringify(team));
  },

  default: (request, response) => {
    response.write('O.k.')
    response.end()
  }
}

const handler = (request, response) => {
  const { url, method } = request;

  const route = `${url}:${method.toLowerCase()}`;
  const chosen = routes[route] || routes.default;

  response.writeHead(200, {
    'content-type': 'text/html',
  })
  return chosen(request, response);
}

const app = http.createServer(handler)
                .listen(3000, () => console.info('🚀 Your API Running right here!'))
