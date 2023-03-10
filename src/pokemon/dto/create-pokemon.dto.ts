import { MinLength, IsString, IsPositive, IsInt } from 'class-validator';

export class CreatePokemonDto {
  @IsPositive()
  @IsInt()
  no: number;

  @MinLength(1)
  @IsString()
  name: string;
}
