import https from 'https'

const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2';

export class TeamRepository {
  async makeRequest(url){
    const chunks = [];
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on('data', data => {
          chunks.push(data);
        });
        response.on('error', reject);
        response.on('end', () => {
          const data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
        });
      });
    });
  }

  async getAllPokemons(){
    const data = await this.makeRequest(`${POKEMON_BASE_URL}/pokemon/`);
    return data.results;
  }

  async findPokemon(pokemonUrl){
    const data = await this.makeRequest(pokemonUrl);

    return {
      name: data.name,
      moves: data.moves.map(m => m.move.name),
    };
  }
}