import { DataSource } from 'typeorm';
import { Message } from '../models/Message';
import { TypeORMUser } from '../models/TypeORMUser';
import { FeedPost } from '../models/FeedPost';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '2005',
  database: process.env.POSTGRES_DB || 'hook',
  synchronize: process.env.NODE_ENV !== 'production', // Auto-sync schema in development
  logging: process.env.NODE_ENV !== 'production',
  entities: [Message, TypeORMUser, FeedPost],
  migrations: [],
  subscribers: [],
  ssl: false,
  extra: {
    max: 20, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to wait before timing out when connecting a new client
  }
}); 