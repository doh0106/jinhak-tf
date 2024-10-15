import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  create(createPostDto: CreatePostDto) {
    return this.postsRepository.create(createPostDto);
  }

  findAll() {
    return this.postsRepository.findAll();
  }

  findOne(id: string) {
    return this.postsRepository.findOne(id);
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(id, updatePostDto);
  }

  remove(id: string) {
    return this.postsRepository.remove(id);
  }
}
