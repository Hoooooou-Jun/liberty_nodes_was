import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  // 예를 들어 웹페이지 URL을 해시한 값
  @Column()
  websiteKey: string;

  // 필요하다면 웹페이지 제목 등 추가 메타 정보를 저장
  @Column({ nullable: true })
  title: string;

  // 문자열 참조를 사용하여 순환 참조 문제 회피
  @OneToMany('Comment', (comment: any) => comment.node)
  comments: any; // 타입을 Node에서 발생하는 순환 문제를 피하려면 any 혹은 Comment[]로 처리

  @CreateDateColumn()
  createdAt: Date;
}
