const { login, addProduct, deleteProductByID, ensureProducts } = require('./helpers/helpers');
const data = require('./fixtures/product.json');
const postMessages = require('./fixtures/messages');
const request = require('supertest');

describe('POST /produtos', () => {
    let token;
    let registredProduct;

    beforeAll(async () => {
        token = await login(); // Obtem o token para autenticação
        await ensureProducts(token, data.postProduct); // Garante que o produto não existe antes de começar os testes
    });

    afterAll(async () => {
        await deleteProductByID(token, registredProduct._id); // Exclui o produto cadastrado após os testes
    });

    test('Deve retornar status 201 e uma mensagem de sucesso ao cadastrar um produto válido', async () => {
        const response = await addProduct(token, data.postProduct);

        expect(response.status).toBe(201); // Verifica se o status code é 201
        expect(response.body.message).toBe(postMessages.success); // Verifica a mensagem de sucesso
        expect(response.body).toHaveProperty('_id'); // Verifica se um _id foi gerado

        registredProduct = response.body
    });

    test('Deve retornar status 400 ao tentar cadastrar um produto duplicado', async () => {
        await addProduct(token, data.postProduct);
        const response = await addProduct(token, data.postProduct);
        expect(response.status).toBe(400); // Verifica se o status code é 400
        expect(response.body.message).toBe(postMessages.duplicateProduct); // Verifica a mensagem de erro para produto duplicado
    });

    test('Deve retornar status 401 ao tentar cadastrar um produto sem token de autenticação', async () => {
        const response = await request(baseUrl)
            .post('/produtos')
            .send(data.postProduct); // Envia a requisição sem token
        expect(response.status).toBe(401); // Verifica se o status code é 401
        expect(response.body.message).toBe(postMessages.invalidToken); // Verifica a mensagem de erro para token ausente
    });

    test('Deve retornar status 400 ao tentar cadastrar um produto sem o campo nome', async () => {
        const produtoInvalido = { ...data.postProduct };
        delete produtoInvalido.nome; // Remove o campo nome
        const response = await addProduct(token, produtoInvalido);

        expect(response.status).toBe(400); // Verifica se o status code é 400
        expect(response.body.nome).toContain(postMessages.nameIsMandatory); // Verifica a mensagem de erro para campo obrigatório
    });
});
