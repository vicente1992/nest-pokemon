import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interfaces/pokemon-response';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemonInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segmenets = url.split('/');
      const no = +segmenets[segmenets.length - 2];
      pokemonInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonInsert);
    return 'Seed Executed';
  }
}
