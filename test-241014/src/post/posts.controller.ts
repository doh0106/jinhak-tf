import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.create(post);
  }

  // 기타 메서드 생략
}