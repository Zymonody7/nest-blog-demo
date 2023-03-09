import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { Article } from './entity/article.entity';
import { ListDTO } from './dto/list.dto';
import { IdDTO } from './dto/id.dto';
import { getPagination } from 'src/utils';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  async getMore(listDto: ListDTO) {
    const { page = 1, limit = 10 } = listDto;
    const getList = await this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();
    const [list, total] = getList;
    const pagination = getPagination(total, limit, page);
    return {
      list,
      pagination,
    };
  }
  async getOne(idDTO: IdDTO) {
    const { id } = idDTO;
    const articleDetial = await this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .where('article.id = :id', { id })
      .getOne();
    if (!articleDetial) {
      throw new NotFoundException('找不到文章');
    }

    const result = {
      info: articleDetial,
    };
    return result;
  }
  async create(articleCreateDTO: ArticleCreateDTO) {
    const article = new Article();
    article.title = articleCreateDTO.title;
    article.description = articleCreateDTO.description;
    article.content = articleCreateDTO.content;
    const res = await this.articleRepository.save(article);
    return {
      info: res,
    };
  }
  async update(articleEditDTO: ArticleEditDTO) {
    console.log(articleEditDTO);

    const { id } = articleEditDTO;
    const articleToUpdate = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id=:id', { id })
      .getOne();
    articleToUpdate.title = articleEditDTO.title;
    articleToUpdate.content = articleEditDTO.content;
    articleToUpdate.description = articleEditDTO.description;
    const res = await this.articleRepository.save(articleToUpdate);
    return {
      info: res,
    };
  }
  async delete(idDTO: IdDTO) {
    const { id } = idDTO;
    const articleToUpdate = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id=:id', { id })
      .getOne();
    articleToUpdate.isDelete = true;
    const res = await this.articleRepository.save(articleToUpdate);
    return {
      info: res,
    };
  }
}
