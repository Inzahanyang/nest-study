import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Episode } from '../entities/episodes.entity';

@ArgsType()
export class UpdatePodcastDto {
  @Field((type) => String, { nullable: true })
  @IsString()
  title: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  category: string;

  @Field((type) => Number, { nullable: true })
  @IsNumber()
  rating: number;
}
