// comment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column()
  author: string;

  // 문자열 참조를 사용해서 Node 엔티티와의 관계를 지정합니다.
  @ManyToOne('Node', (node: any) => node.comments, { onDelete: 'CASCADE' })
  node: any; // 나중에 타입을 정밀하게 지정하고 싶다면, 인터페이스 또는 타입으로 보완할 수 있습니다.

  @CreateDateColumn()
  createdAt: Date;
}
