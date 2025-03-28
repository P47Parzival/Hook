import axios from 'axios';
import { AppDataSource } from '../config/database';

const API_URL = 'http://localhost:3001/api';
let authToken: string;
let registeredEmail: string;
let testReceiverId: string;

describe('API Tests', () => {
  beforeAll(async () => {
    // Connect to database
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    // Close database connection
    await AppDataSource.destroy();
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      registeredEmail = `test${Date.now()}@example.com`;
      try {
        const response = await axios.post(`${API_URL}/auth/register`, {
          email: registeredEmail,
          password: 'testpassword123',
          name: `Test User ${Date.now()}`
        });
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty('token');
        expect(response.data).toHaveProperty('user');
        expect(response.data.user).toHaveProperty('id');
        expect(response.data.user.email).toBe(registeredEmail);
      } catch (error: any) {
        console.error('Registration error:', error.response?.data);
        throw error;
      }
    });

    it('should login with created user', async () => {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: registeredEmail,
        password: 'testpassword123'
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('token');
      authToken = response.data.token;
    });

    it('should create a test receiver user', async () => {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email: `receiver${Date.now()}@example.com`,
        password: 'testpassword123',
        name: 'Test Receiver'
      });

      expect(response.status).toBe(201);
      testReceiverId = response.data.user.id;
    });
  });

  describe('Spotify Integration', () => {
    it('should get Spotify authorization URL', async () => {
      try {
        const response = await axios.get(`${API_URL}/connect/spotify`, {
          headers: { Authorization: `Bearer ${authToken}` },
          maxRedirects: 0,
          validateStatus: (status) => status === 302
        });

        expect(response.status).toBe(302);
        expect(response.headers.location).toContain('accounts.spotify.com/authorize');
      } catch (error: any) {
        if (error.response) {
          console.error('Spotify auth error:', error.response.data);
        }
        throw error;
      }
    });
  });

  describe('Matching System', () => {
    it('should get user matches', async () => {
      const response = await axios.get(`${API_URL}/matches`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  describe('Messaging', () => {
    it('should send a message', async () => {
      const response = await axios.post(
        `${API_URL}/messages`,
        {
          receiverId: testReceiverId,
          content: 'Test message'
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.content).toBe('Test message');
    });

    it('should get messages', async () => {
      const response = await axios.get(`${API_URL}/messages?receiverId=${testReceiverId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  describe('Feed', () => {
    it('should create a feed post', async () => {
      const response = await axios.post(
        `${API_URL}/feed`,
        {
          songId: 'test-song-id',
          comment: 'Test comment'
        },
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.comment).toBe('Test comment');
    });

    it('should get user feed', async () => {
      const response = await axios.get(`${API_URL}/feed`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });
}); 