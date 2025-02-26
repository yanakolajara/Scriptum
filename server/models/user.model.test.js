// server/models/postgresql/user.model.test.js

import supertest from 'supertest';
import { UserModel } from './user.model.js';

const model = supertest(new UserModel());
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  first_name: 'John',
  middle_name: '',
  last_name: 'Doe',
};

describe('User Model', () => {
  // describe('register', () => {
  //   it('should register a new user', async () => {
  //     const response = await model.register('/register', testUser);
  //     expect(response.status).toBe(201);
  //     expect(response.body.email).toBe(testUser.email);
  //     expect(response.body.first_name).toBe(testUser.first_name);
  //     expect(response.body.middle_name).toBe(testUser.middle_name);
  //     expect(response.body.last_name).toBe(testUser.last_name);
  //     expect(response.body.password).not.toBe(testUser.password);
  //   });
  //   it('should return error if email is already taken', async () => {
  //     await model.register('/register', testUser);
  //     const response = await model.register('/register', testUser);
  //     expect(response.status).toBe(400);
  //     expect(response.body.error).toBe('Email already exists');
  //   });
  // });
  // describe('getByEmail', () => {
  //   it('should get a user by email', async () => {
  //     const email = 'test@example.com';
  //     const response = await model.get(`/users/${email}`);
  //     expect(response.status).toBe(200);
  //     expect(response.body.email).toBe(email);
  //   });
  //   it('should return error if user not found', async () => {
  //     const email = 'nonexistent@example.com';
  //     const response = await model.get(`/users/${email}`);
  //     expect(response.status).toBe(404);
  //     expect(response.body.error).toBe('User not found');
  //   });
  // });
  // describe('login', () => {
  //   it('should login a user', async () => {
  //     const response = await model.login('/login', testUser);
  //     expect(response.status).toBe(200);
  //     expect(response.body.token).toBeDefined();
  //   });
  //   it('should return error if email or password is incorrect', async () => {
  //     const testUser = {
  //       email: 'test@example.com',
  //       password: 'wrongpassword',
  //     };
  //     const response = await model.login('/login', testUser);
  //     expect(response.status).toBe(401);
  //     expect(response.body.error).toBe('Invalid email or password');
  //   });
  // });
  // describe('update', () => {
  //   it('should update a user', async () => {
  //     const email = 'test@example.com';
  //     const testUser = {
  //       first_name: 'Jane',
  //       last_name: 'Doe',
  //     };
  //     const response = await model.put(`/users/${email}`, testUser);
  //     expect(response.status).toBe(200);
  //     expect(response.body.first_name).toBe(testUser.first_name);
  //     expect(response.body.last_name).toBe(testUser.last_name);
  //   });
  //   it('should return error if user not found', async () => {
  //     const email = 'nonexistent@example.com';
  //     const testUser = {
  //       first_name: 'Jane',
  //       last_name: 'Doe',
  //     };
  //     const response = await model.put(`/users/${email}`, testUser);
  //     expect(response.status).toBe(404);
  //     expect(response.body.error).toBe('User not found');
  //   });
  // });
  // describe('delete', () => {
  //   it('should delete a user', async () => {
  //     const email = 'test@example.com';
  //     const response = await model.delete(`/users/${email}`);
  //     expect(response.status).toBe(204);
  //   });
  //   it('should return error if user not found', async () => {
  //     const email = 'nonexistent@example.com';
  //     const response = await model.delete(`/users/${email}`);
  //     expect(response.status).toBe(404);
  //     expect(response.body.error).toBe('User not found');
  //   });
  // });
});
