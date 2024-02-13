import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel('articles') private articleModel: Model<Article>) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(articleUrl: string): Promise<Article> {
    return this.articleModel.findOne({ url: articleUrl }).exec();
  }

  async findAllByIds(ids: number[]): Promise<Article[]> {
    return this.articleModel.find({ _id: { $in: ids } }).exec();
  }
}
