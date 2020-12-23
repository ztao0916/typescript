import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  //select: false表示查询的时候不展示该字段
  @Column({ select: false })
  password: string;

  @Column()
  email: string;
}