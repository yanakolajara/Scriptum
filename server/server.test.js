import supertest from 'supertest';
import { createApp } from './app.js';

class UserModel {
  constructor() {
    this.users = [];
  }
  getAll() {
    return this.users;
  }
  getById(id) {
    return this.users.find((user) => user.id === id);
  }
  create(user) {
    this.users.push(user);
    return user;
  }
}

const app = createApp({ userModel: new UserModel() });
const api = supertest(app);

const newUser = {
  email: 'email@test.com',
  password: 'Password123',
  first_name: 'Fname',
  middle_name: 'Mname',
  last_name: 'Lname',
  is_verified: true,
};

describe('Root', () => {
  test('Should return 200', async () => {
    await api.get('/').expect(200);
  });

  test('Should return JSON content type', async () => {
    await api
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200);
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

describe('Users route', () => {
  describe('Get all users', () => {
    test('Should return a 200 status', async () => {
      await api.get('/users').expect(200);
    });
    test('Should return JSON content type', async () => {
      await api
        .get('/users')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
    test('Should return an empty array', async () => {
      const response = await api.get('/users');
      expect(response.body).toEqual([]);
    });
  });
});
