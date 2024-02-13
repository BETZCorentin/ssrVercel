import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async findAllFavorite(@Request() request) {
    const user = await this.usersService.findOne(request.user.username);
    return this.articlesService.findAllByIds(user.favoriteArticleIds);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':articleUrl')
  async findOne(@Param('articleUrl') articleUrl: string) {
    const article = await this.articlesService.findOne(articleUrl);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':articleUrl/favorite')
  async favorite(@Param('articleUrl') articleUrl: string, @Request() request) {
    const article = await this.articlesService.findOne(articleUrl);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return this.usersService.addArticleToFavorite(
      request.user.username,
      article._id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':articleUrl/unfavorite')
  async unfavorite(
    @Param('articleUrl') articleUrl: string,
    @Request() request,
  ) {
    const article = await this.articlesService.findOne(articleUrl);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return this.usersService.removeArticleToFavorite(
      request.user.username,
      article._id,
    );
  }
}
