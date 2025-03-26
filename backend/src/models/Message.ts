import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TypeORMUser } from './TypeORMUser';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => TypeORMUser)
  @JoinColumn({ name: 'senderId' })
  sender: TypeORMUser;

  @Column()
  senderId: string;

  @ManyToOne(() => TypeORMUser)
  @JoinColumn({ name: 'receiverId' })
  receiver: TypeORMUser;

  @Column()
  receiverId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  read: boolean;
} 