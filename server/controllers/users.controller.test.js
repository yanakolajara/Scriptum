import supertest from 'supertest';
import { createApp } from '../app.js';

class UserModelMock {
  constructor() {
    this.users = [];
    this.user_contexts = [];
    this.journal_entries = [];
    this.mfa_codes = [];
    this.refresh_tokens = [];
  }

  getByEmail = (email) => {
    return this.users.find((user) => user.email === email);
  };
  getRefreshToken = (id) => {
    return this.refresh_tokens.find((token) => token.user_id === id);
  };
  deleteAllUsers = () => {
    this.users = [];
  };
  register = (data) => {
    this.users.push(data);
    return data;
  };
  createCode = (email) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    this.mfa_codes.push({ email, code });
    return code;
  };
  verifyCode = (email, code) => {
    const record = this.mfa_codes.find(
      (c) => c.email === email && c.code === code
    );
    return !!record;
  };
  deleteAllCodes = (email) => {
    this.mfa_codes = this.mfa_codes.filter((c) => c.email !== email);
  };
  update = (id, userData) => {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex) {
      this.users[userIndex] = { ...this.users[user], ...userData };
      return this.users[userIndex];
    } else {
      return null;
    }
  };
  delete = (id) => {
    this.users = this.users.filter((u) => u.id !== id);
  };
}

const app = createApp({ userModel: new UserModelMock() });
const api = supertest(app);

const newUser = {
  email: 'email@test.com',
  password: 'Password123',
  first_name: 'Fname',
  middle_name: 'Mname',
  last_name: 'Lname',
  is_verified: true,
};

describe('Users route', () => {
  describe('GET /users', () => {
    test('Should return a 200 status and empty array initially', async () => {
      const response = await api.get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('Should return users after creation', async () => {
      await api.post('/users').send(newUser);
      const response = await api.get('/users');
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject(newUser);
    });
  });

  describe('GET /users/:id', () => {
    test('Should return 200 and user if exists', async () => {
      const createResponse = await api.post('/users').send(newUser);
      const userId = createResponse.body.data.id;
      const response = await api.get(`/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(newUser);
    });
  });

  describe('POST /users', () => {
    test('Should create new user and return 201', async () => {
      const response = await api.post('/users').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.result).toMatchObject(newUser);
    });
  });

  describe('PUT /users/:id', () => {
    test('Should update existing user', async () => {
      const createResponse = await api.post('/users').send(newUser);
      const userId = createResponse.body.data.result.id;
      const updateData = { first_name: 'UpdatedName' };

      const response = await api.put(`/users/${userId}`).send(updateData);
      expect(response.status).toBe(200);
      expect(response.body.first_name).toBe(updateData.first_name);
    });
  });

  describe('DELETE /users/:id', () => {
    test('Should delete existing user', async () => {
      const createResponse = await api.post('/users').send(newUser);
      const userId = createResponse.body.data.result.id;

      const response = await api.delete(`/users/${userId}`);
      expect(response.status).toBe(200);

      const getResponse = await api.get('/users');
      expect(getResponse.body).toHaveLength(0);
    });
  });
});
