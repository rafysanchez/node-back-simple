const request = require('supertest');
const app = require('../app');

describe('Health Check', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('Not Found Handler', () => {
  test('GET /undefined-route should return 404', async () => {
    const response = await request(app)
      .get('/undefined-route')
      .expect(404);
    
    expect(response.body).toHaveProperty('erro', 'Endpoint não encontrado');
  });
});

describe('CORS', () => {
  test('should include CORS headers', async () => {
    const response = await request(app)
      .get('/health');
    
    // Headers de CORS devem estar presentes
    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });
});
