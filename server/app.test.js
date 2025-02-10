import supertest from 'supertest';
import { createApp } from '../app.js';

class UserModel {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  getAll = async () => {
    return this.users;
  };

  getById = async (id) => {
    const user = this.users.find((u) => u.id === parseInt(id));
    return user || null;
  };

  create = async (userData) => {
    const user = { id: this.nextId++, ...userData };
    this.users.push(user);
    return user;
  };

  update = async (userData) => {
    const index = this.users.findIndex((u) => u.id === parseInt(userData.id));
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  };

  delete = async ({ id }) => {
    const index = this.users.findIndex((u) => u.id === parseInt(id));
    if (index === -1) return null;
    const deletedUser = this.users.splice(index, 1);
    return deletedUser;
  };
}

const app = createApp({ userModel: new UserModel() });
const api = supertest(app);

describe('Root', () => {
  test('Should return 200', async () => {
    await api.get('/').expect(200);
  });

  test('Should return JSON content type', async () => {
    await api.get('/').expect('Content-Type', /application\/json/);
  });

  test('Should return welcome message', async () => {
    const response = await api.get('/');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Welcome to Scriptum API');
  });

  test('Should handle non-existent routes', async () => {
    await api
      .get('/nonexistent')
      .expect(404)
      .expect('Content-Type', /application\/json/);
  });
});
