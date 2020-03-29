const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); //para evitar que o banco de testes cresça muito
        await connection.migrate.latest(); //executa as migrations_ver documentacao do knex
    });

    //para corrigir o warming do teste:
    //A worker has failed to exit gracefully and has been force exited. (alguma coisa ficou executando mesmo depois do teste)
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            "name": "APADTest",
            "email": "contato@apad.com.br",
            "whatsapp": "4700000000",
            "city": "Natal",
            "uf": "RN"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})