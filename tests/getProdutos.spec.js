const { login, addProduct, getProduct, deleteProductByID, ensureProducts, findProduct } = require('./helpers/helpers');
const data = require('./fixtures/product.json');
jest.setTimeout(30000); // Aumenta o timeout global para 30 segundos
describe('GET /produtos', () => {
  let token;
  let registredProduct;
  let response;

  beforeAll(async () => {
    token = await login(); // Obtem token para autenticação

    await ensureProducts(token, data.NewProduct); // Exclui qualquer produto previamente cadastrado com os mesmos dados

    registredProduct = await addProduct(token, data.NewProduct); // Cadastro do produto usando os dados do JSON
  });

  beforeEach(async () => {
    response = await getProduct(); // Faz a requisição GET para o endpoint /produtos
  });

  afterAll(async () => {
    await deleteProductByID(token, registredProduct._id); // Exclui o produto cadastrado após os testes
  });

  test('Deve retornar status 200 e uma lista de produtos', async () => {
    expect(response.status).toBe(200); // Verifica se o status code é 200
    expect(Array.isArray(response.body.produtos)).toBe(true); // Verifica se 'produtos' é um array
  });

    test('Deve verificar que a quantidade corresponde ao número de produtos', async () => {
    const response = await getProduct();

    expect(response.body.quantidade).toBe(response.body.produtos.length); // Verifica se a informação 'quantidade' é igual ao número de produtos listados
  });

  test('Os produtos devem conter campos válidos', async () => {
    // Valida sobre cada produto no array e verifica se todos as propriedades de produtos estão presentes
    response.body.produtos.forEach(produto => {
      expect(produto).toHaveProperty('nome'); // Verifica se o campo 'nome' está presente
      expect(produto).toHaveProperty('preco'); // Verifica se o campo 'preco' está presente
      expect(produto).toHaveProperty('descricao'); // Verifica se o campo 'descricao' está presente
      expect(produto).toHaveProperty('quantidade'); // Verifica se o campo 'quantidade' está presente
      expect(produto).toHaveProperty('_id'); // Verifica se o campo '_id' está presente
    });
  });

  test('Deve conter o produto recém-cadastrado na lista de produtos', async () => {
    const productFound = await findProduct(response.body.produtos, registredProduct._id); // Procura no array retornado o produto recém-cadastrado

    expect(productFound).toBeDefined(); // Verifica se o produto foi encontrado (deve ser definido)
    expect(productFound.nome).toBe(data.NewProduct.nome); // Verifica se o nome do produto encontrado corresponde ao nome do produto cadastrado
    expect(productFound.preco).toBe(data.NewProduct.preco); // Verifica se o preço do produto encontrado corresponde ao preço cadastrado
    expect(productFound.descricao).toBe(data.NewProduct.descricao); // Verifica se a descrição do produto encontrado corresponde à descrição cadastrada
    expect(productFound.quantidade).toBe(data.NewProduct.quantidade); // Verifica se a quantidade do produto encontrado corresponde à quantidade cadastrada
  });
});
