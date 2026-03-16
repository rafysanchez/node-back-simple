const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
  describe('POST /auth/login', () => {
    test('should login with valid credentials (admin)', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'admin',
          senha: 'admin123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('usuario', 'admin');
      expect(response.body).toHaveProperty('mensagem');
    });

    test('should login with valid credentials (user)', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'user',
          senha: 'user123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.usuario).toBe('user');
    });

    test('should fail with invalid username', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'invalid',
          senha: 'password'
        })
        .expect(401);

      expect(response.body).toHaveProperty('erro');
    });

    test('should fail with invalid password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'admin',
          senha: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('erro');
    });

    test('should fail with missing username', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          senha: 'admin123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });

    test('should fail with missing password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'admin'
        })
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });

    test('should fail with short username', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'ab',
          senha: 'admin123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });

    test('should fail with short password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          username: 'admin',
          senha: '123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });
  });
});
