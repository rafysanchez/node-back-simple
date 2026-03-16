const request = require('supertest');
const app = require('../../app');

let validToken;

describe('Produtos Endpoints', () => {
  beforeAll(async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        senha: 'admin123'
      });

    validToken = response.body.token;
  });

  describe('GET /produtos', () => {
    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/produtos')
        .expect(401);

      expect(response.body).toHaveProperty('erro');
    });

    test('should return list of products with valid token', async () => {
      const response = await request(app)
        .get('/produtos')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /produtos/:id', () => {
    test('should return 401 without token', async () => {
      const response = await request(app)
        .get('/produtos/1')
        .expect(401);

      expect(response.body).toHaveProperty('erro');
    });

    test('should return product with valid token', async () => {
      const response = await request(app)
        .get('/produtos/1')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('nome');
      expect(response.body).toHaveProperty('preco');
    });

    test('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/produtos/99999')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('erro');
    });
  });

  describe('POST /produtos', () => {
    test('should create product with valid data', async () => {
      const response = await request(app)
        .post('/produtos')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          nome: 'Produto Teste',
          descricao: 'Descricao do teste',
          preco: 99.99,
          estoque: 5
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('nome', 'Produto Teste');
      expect(response.body).toHaveProperty('preco', 99.99);
    });

    test('should fail without token', async () => {
      await request(app)
        .post('/produtos')
        .send({
          nome: 'Produto Teste',
          preco: 99.99
        })
        .expect(401);
    });

    test('should fail with missing nome', async () => {
      const response = await request(app)
        .post('/produtos')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          preco: 99.99
        })
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });

    test('should fail with missing preco', async () => {
      const response = await request(app)
        .post('/produtos')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          nome: 'Produto Teste'
        })
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });

    test('should fail with negative preco', async () => {
      const response = await request(app)
        .post('/produtos')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          nome: 'Produto Teste',
          preco: -10
        })
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });
  });
});
