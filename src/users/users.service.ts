import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  async findOne(username: string) {
    const result = await this.userModel.findOne({ username: username }).exec();
    return result.toObject();
  }

  async addArticleToFavorite(username: string, articleIdToAdd: number) {
    const user = await this.findOne(username);
    user.favoriteArticleIds.push(articleIdToAdd);
    user.favoriteArticleIds = [...new Set(user.favoriteArticleIds)];

    await this.userModel
      .updateOne(
        { username: username },
        { $set: { favoriteArticleIds: user.favoriteArticleIds } },
      )
      .exec();
    return user.favoriteArticleIds;
  }

  async removeArticleToFavorite(username: string, articleIdToRemove: number) {
    const user = await this.findOne(username);
    user.favoriteArticleIds = user.favoriteArticleIds.filter(
      (articleId) => articleId !== articleIdToRemove,
    );

    await this.userModel
      .updateOne(
        { username: username },
        { $set: { favoriteArticleIds: user.favoriteArticleIds } },
      )
      .exec();
    return user.favoriteArticleIds;
  }
}
