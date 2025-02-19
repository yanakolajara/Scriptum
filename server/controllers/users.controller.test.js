import supertest from 'supertest';
import { createApp } from '../app.js';

class UserModel {
  constructor() {
    this.users = [];
  }

  // getAllUsers()
  // deleteAllUsers()
  // register({email,
  //   password,
  //   first_name,
  //   middle_name,
  //   last_name})
  // generateMfaCode({ id})
  // verifyCode({id, code})
  // deleteAllCodes({id})
  // getByEmail({email})
  // update({userData})
  // delete({ id })
  // getRefreshToken({ id})

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
