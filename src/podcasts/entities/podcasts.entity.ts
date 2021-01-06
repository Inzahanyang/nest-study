import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Episode } from './episodes.entity';

@ObjectType()
export class Podcast {
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @Field((type) => String)
  @IsString()
  title: string;

  @Field((type) => String)
  @IsString()
  category: string;

  @Field((type) => String)
  @IsNumber()
  rating: number;

  @Field((type) => [Episode])
  episodes: Episode[];
}
