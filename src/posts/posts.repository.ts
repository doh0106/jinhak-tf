import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsRepository {
  private posts: Post[] = [];

  create(createPostDto: CreatePostDto): Post {
    const newPost = { id: Date.now().toString(), ...createPostDto };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post {
    return this.posts.find(post => post.id === id);
  }

  update(id: string, updatePostDto: UpdatePostDto): Post {
    const index = this.posts.findIndex(post => post.id === id);
    if (index > -1) {
      this.posts[index] = { ...this.posts[index], ...updatePostDto };
      return this.posts[index];
    }
    return null;
  }

  remove(id: string): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index > -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}
