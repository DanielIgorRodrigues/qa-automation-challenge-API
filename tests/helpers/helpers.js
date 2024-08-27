const request = require('supertest');

// Função para fazer login e retornar o token de autenticação
async function login() {
    const loginResponse = await request(baseUrl)
        .post('/login')
        .send({ email: 'fulano@qa.com', password: 'teste' });

    return loginResponse.body.authorization;
}

// Função para cadastrar um produto e retornar o produto cadastrado
async function addProduct(token, produto) {
    const response = await request(baseUrl)
        .post('/produtos')
        .set('Authorization', token)
        .send(produto);

    return response;
}

// Função para obter a lista de produtos
async function getProduct() {
    const response = await request(baseUrl).get('/produtos');

    return response;
}

// Função para excluir um produto por ID
async function deleteProductByID(token, productID) {
    await request(baseUrl)
        .delete(`/produtos/${productID}`)
        .set('Authorization', token);
}

// Função para excluir produtos com os mesmos dados do produto que será cadastrado
async function ensureProducts(token, newProduct) {
    const product = await getProduct();
    const duplicateProducts = product.body.produtos.filter(p => p.nome === newProduct.nome);

    for (const duplicateProduct of duplicateProducts) {
        await deleteProductByID(token, duplicateProduct._id);
    }
}

async function findProduct(product, id) {
    return product.find(produto => produto._id === id);
  }
  

module.exports = {
    login,
    addProduct,
    getProduct,
    deleteProductByID,
    ensureProducts,
    findProduct,
};