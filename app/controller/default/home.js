'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const result = await this.app.mysql.get('blog_content', {});
    console.log(result);
    this.ctx.body = result;
  }

  async getArticleList() {

    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'DATE_FORMAT(article.sub_time,"%Y-%m-%d") as subTime,' +
              'article.view_count as viewCount ,' +
              '.type.type_name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'article.article_content as articleContent,' +
    "DATE_FORMAT(article.sub_time,'%Y-%m-%d' ) as subTime," +
    'article.view_count as viewCount ,' +
    'type.type_name as typeName ,' +
    'type.id as typeId ' +
    'FROM article LEFT JOIN type ON article.type_id = type.id ' +
    'WHERE article.id=' + id;


    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };

  }

  // 得到类别名称。
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据id获取文章列表

  async getArticleListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'DATE_FORMAT(article.sub_time,"%Y-%m-%d") as subTime,' +
              'article.view_count as viewCount ,' +
              '.type.type_name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.type_id =' + id;

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }
}

module.exports = HomeController;
