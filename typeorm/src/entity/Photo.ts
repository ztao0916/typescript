import { Entity, Column,PrimaryGeneratedColumn } from 'typeorm'

//创建一个模型
// export class Photo {
//   id: number;
//   name: string;
//   description: string;
//   filename: string;
//   views: number;
// }

//创建一个实体
// @Entity()
// export default class Photo {
//   id: number;
//   name: string;
//   description: string;
//   filename: string;
//   views: number;
// }

//给数据库表添加列
@Entity()
export default class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
}


