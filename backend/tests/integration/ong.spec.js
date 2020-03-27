const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

var idOng = ''; 

describe('ONG', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(() => {
    connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    .send({
      name: "APAD2",
      email: "contado@ong.com.br",
      whatsapp: "47000000000",
      city: "Blumenau",
      uf: "SC"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(20);
    idOng = response.body.id;
  });
  
  it('should be able to login with the new ONG', async () => {
    const response = await request(app)
    .post('/session')
    .send({
      id: idOng
    });

    expect(response.body).toHaveProperty('name');
  });
});