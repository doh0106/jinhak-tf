import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsRepository {
  private posts: Post[] = [];

  async save(post: Post): Promise<Post> {
    this.posts.push(post);
    return post;
  }

  // 기타 메서드 생략
}