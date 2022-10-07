import { TeamRepository } from '../repository/teamRepository.js';

const POKEMON_MAX_MOVES_SELECTED = 3

export class TeamService {
  constructor(teamRepository){
    this.repository = teamRepository || new TeamRepository();
  }

  async getPokemonsTeam(teamSize = 3) {
    const pokemons = await this.repository.getAllPokemons();

    const team = this.selectTeam(pokemons, teamSize);

    return Promise.all(
      team.map(async pokemon => {
        const { url } = pokemon;
        
        const pokemonDetails = await this.repository.findPokemon(url);

        return {
          name: pokemonDetails.name,
          moves: pokemonDetails.moves.splice(0, POKEMON_MAX_MOVES_SELECTED),
        }
      }),
    );
  }

  getRandomArrayItem(array){
    return array[Math.floor(Math.random() * array.length)];
  }

  selectTeam(pokemons, teamSize) {
    return Array(teamSize).fill(0).map(() => this.getRandomArrayItem(pokemons));
  }
}