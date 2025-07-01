// // tests/gateway.test.js
// import request from 'supertest';
// import app from '../server.js'; // Asegúrate de que app sea exportado desde tu servidor Gateway

// // Puedes mockear o conectar directamente con los microservicios si están corriendo

// // Auth token de prueba (deberías reemplazarlo por uno real en los tests)
// const testToken = 'Bearer test.jwt.token';

// // Helper para auth headers
// const authHeader = {
//   Authorization: testToken,
// };

// describe('Gateway API Endpoints', () => {
//   // USERS ---------------------
//   describe('Users', () => {
//     test('POST /users/register - should create a new user', async () => {
//       const res = await request(app)
//         .post('/users/register')
//         .send({ email: 'test@email.com', password: '123456' });
//       expect(res.statusCode).toBe(201);
//     });

//     test('GET /users/:id - should return user by ID', async () => {
//       const res = await request(app).get('/users/1').set(authHeader);
//       expect(res.statusCode).toBe(200);
//     });

//     test('PUT /users/:id - should update user', async () => {
//       const res = await request(app)
//         .put('/users/1')
//         .set(authHeader)
//         .send({ name: 'Updated User' });
//       expect(res.statusCode).toBe(200);
//     });

//     test('DELETE /users/:id - should delete user', async () => {
//       const res = await request(app).delete('/users/1').set(authHeader);
//       expect(res.statusCode).toBe(204);
//     });
//   });

//   // AUTH ---------------------
//   describe('Auth', () => {
//     test('POST /auth/login - should return tokens', async () => {
//       const res = await request(app)
//         .post('/auth/login')
//         .send({ email: 'test@email.com', password: '123456' });
//       expect(res.statusCode).toBe(200);
//     });

//     test('POST /auth/logout - should logout user', async () => {
//       const res = await request(app).post('/auth/logout').set(authHeader);
//       expect(res.statusCode).toBe(204);
//     });
//   });

//   // ENTRIES ---------------------
//   describe('Entries', () => {
//     test('GET /entries - should return user entries', async () => {
//       const res = await request(app).get('/entries').set(authHeader);
//       expect(res.statusCode).toBe(200);
//     });

//     test('POST /entries - should create a new entry', async () => {
//       const res = await request(app)
//         .post('/entries')
//         .set(authHeader)
//         .send({ content: 'Today I learned tests are important.' });
//       expect(res.statusCode).toBe(201);
//     });

//     test('PUT /entries/:id - should update entry', async () => {
//       const res = await request(app)
//         .put('/entries/1')
//         .set(authHeader)
//         .send({ content: 'Updated content' });
//       expect(res.statusCode).toBe(200);
//     });

//     test('DELETE /entries/:id - should delete entry', async () => {
//       const res = await request(app).delete('/entries/1').set(authHeader);
//       expect(res.statusCode).toBe(204);
//     });
//   });

//   // CONTEXT ---------------------
//   describe('User Contexts', () => {
//     test('GET /user-context - should return user context', async () => {
//       const res = await request(app).get('/user-context').set(authHeader);
//       expect(res.statusCode).toBe(200);
//     });

//     test('POST /user-context - should create user context', async () => {
//       const res = await request(app)
//         .post('/user-context')
//         .set(authHeader)
//         .send({ context: 'New context here' });
//       expect(res.statusCode).toBe(201);
//     });

//     test('PATCH /user-context - should update user context', async () => {
//       const res = await request(app)
//         .patch('/user-context')
//         .set(authHeader)
//         .send({ context: 'Updated context' });
//       expect(res.statusCode).toBe(200);
//     });
//   });

//   // CHAT ---------------------
//   describe('Chat', () => {
//     test('POST /chat/generate-summary - should return summary', async () => {
//       const res = await request(app)
//         .post('/chat/generate-summary')
//         .set(authHeader)
//         .send({ chat: [{ role: 'user', parts: [{ text: 'Hi!' }] }] });
//       expect(res.statusCode).toBe(200);
//     });
//   });
// });
