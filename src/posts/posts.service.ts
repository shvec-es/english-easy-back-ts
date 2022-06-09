import { Injectable } from '@nestjs/common';
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FileService } from "../files/files.service";

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private fileService: FileService) {}

  async create(dto: CreatePostDto, image) {
    const fileName = await this.fileService.createFile(image)
    const post = await this.postRepository.create({...dto, image: fileName})
    return post;
  }
}
