import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(post: Post): Promise<Post> {
    return this.postsRepository.save(post);
  }

  // 기타 메서드 생략
}