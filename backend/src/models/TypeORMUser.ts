import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class TypeORMUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: 'Anonymous User' })
  name: string;

  @Column({ nullable: true })
  spotifyId?: string;

  @Column({ nullable: true })
  spotifyRefreshToken?: string;

  @Column({ nullable: true })
  spotifyTokenExpiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;
} 