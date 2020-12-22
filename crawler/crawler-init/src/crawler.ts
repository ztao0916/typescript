import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'

//定义数据返回接口
interface movieItem {
  title: string,
  img: string,
  score: number,
  comments: string
}
//定义写入文件接口
interface writeData {
  time: number,
  data: movieItem[]
}
//读取的文件格式
interface Content {
  [propName: number]: movieItem[]
}

class Crawler {
  private numberArr: number[] = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225];
  private randomNum: number = Math.floor(Math.random() * (this.numberArr.length));
  private arrItem: number = this.numberArr[this.randomNum];
  private url = `https://movie.douban.com/top250?start=${this.arrItem}`
  //new实例就执行
  constructor() {
    this.init()
  }

  async init() {
    const html = await this.getHtml();
    const jsonData = this.getJson(html);
    this.writeFile(jsonData);
  }

  //发起请求
  async getHtml() {
    const res: superagent.Response = await superagent.get(this.url);
    return res.text;
  }
  //操作dom获取数据
  getJson(html:string) {
    const $ = cheerio.load(html);
    const items = $('.grid_view>li>.item');
    let movieItems: movieItem[] = [];
    items.map((index, item) => {
      const $item = $(item);
      let img: string = $item.find('.pic img').attr('src');
      let title: string = $item.find('.hd .title').eq(0).text();
      let score: number = parseFloat($item.find('.rating_num').text());
      let comments: string = $item.find('.inq').text();
      let obj: movieItem = {
        title,
        img,
        score,
        comments
      };
      movieItems.push(obj);
    })
    return {
      time: new Date().getTime(),
      data: movieItems
    };
  }
  //把数据写入文件
  writeFile(data:writeData) {
    const filePath = path.resolve(__dirname, '../data/movie.json');
    let fileContent:Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[data.time] = data.data;
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }
}

new Crawler()