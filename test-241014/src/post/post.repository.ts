//post.repository.ts
import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { IPostRepository } from './post.repository.interface';

@Injectable()
export class PostRepository implements IPostRepository {
  private posts: Post[] = [];

  async create(post: Post): Promise<Post> {
    this.posts.push(post);
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async findById(id: string): Promise<Post | null> {
    return this.posts.find(post => post.id === id) || null;
  }

  async update(id: string, postData: Partial<Post>): Promise<Post | null> {
    const post = await this.findById(id);
    if (!post) return null;
    Object.assign(post, postData);
    return post;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return false;
    this.posts.splice(index, 1);
    return true;
  }
}