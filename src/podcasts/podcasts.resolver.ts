import { Body } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcasts.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcasts.dto';
import { Episode } from './entities/episodes.entity';
import { Podcast } from './entities/podcasts.entity';

@Resolver()
export class PodcastsResolver {
  private podcasts: Podcast[] = [
    {
      id: 1,
      title: 'day show',
      category: 'music',
      rating: 4.5,
      episodes: [
        { id: 1, title: 'morning', category: 'music', rating: 0 },
        { id: 2, title: 'afternoon', category: 'music', rating: 0 },
        { id: 3, title: 'evening', category: 'music', rating: 0 },
      ],
    },
    {
      id: 2,
      title: 'gag show',
      category: 'gag',
      rating: 4.5,
      episodes: [
        { id: 1, title: 'morning gag', category: 'music', rating: 0 },
        { id: 2, title: 'afternoon gag', category: 'music', rating: 0 },
        { id: 3, title: 'evening gag', category: 'music', rating: 0 },
      ],
    },
  ];

  @Query((returns) => [Podcast])
  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  @Query((returns) => [Episode])
  getEpisodes(@Args('id') id: number) {
    const podcast = this.getPodcast(id);
    return podcast[0].episodes;
  }

  @Query((returns) => [Podcast])
  getPodcast(@Args('id') id: number) {
    const podcast = this.podcasts.filter((podcast) => podcast.id === id);
    return podcast;
  }

  @Mutation((returns) => Boolean)
  deletePodcast(@Args('id') id: number) {
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== id);
    return true;
  }

  @Mutation((returns) => Boolean)
  deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ) {
    const podcast = this.getPodcast(podcastId);
    podcast[0].episodes = podcast[0].episodes.filter(
      (episode) => episode.id !== episodeId,
    );
    return true;
  }

  @Mutation((returns) => Number)
  createPodcast(@Args() { title, category }: CreatePodcastDto): number {
    const id = this.podcasts.length + 1;
    this.podcasts.push({
      id,
      title,
      category,
      rating: 0,
      episodes: [],
    });
    return id;
  }

  @Mutation((returns) => Number)
  createEpisode(
    @Args('id') podcastId: number,
    @Args() { title, category, rating }: CreateEpisodeDto,
  ) {
    const podcast = this.getPodcast(podcastId);
    const episodeId = podcast[0].episodes.length + 1;

    podcast[0].episodes.push({
      id: episodeId,
      title,
      category,
      rating,
    });

    return podcastId;
  }

  @Mutation((returns) => Boolean)
  updatePodcast(
    @Args('id') id: number,
    @Args() { title, category, rating }: UpdatePodcastDto,
  ): boolean {
    const podcast = this.getPodcast(id);
    this.deletePodcast(id);

    this.podcasts.push({
      id,
      title,
      category,
      rating,
      episodes: podcast[0].episodes,
    });
    console.log(this.podcasts);
    return true;
  }

  @Mutation((returns) => Boolean)
  updateEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
    @Args() { title, category, rating }: UpdateEpisodeDto,
  ) {
    const podcast = this.getPodcast(podcastId);
    this.deleteEpisode(podcastId, episodeId);
    podcast[0].episodes.push({
      id: episodeId,
      title,
      category,
      rating,
    });
    return true;
  }
}
