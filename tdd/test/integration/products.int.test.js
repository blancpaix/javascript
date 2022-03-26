const request = require('supertest');
const app = require('../../server');

/// let newProductData = {} // 이거 말고
const newProduct = require('../../data/new-product.json');

let firstProduct;
it("Post /api/products", async () => {
  const response = await request(app)
    .post('/api/products')
    .send(newProduct)
  expect(response.statusCode).toBe(201)
  expect(response.body.name).toBe(newProduct.name)
  expect(response.body.description).toBe(newProduct.description)
})

it("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: "phone" })
  // console.log('response.body', response.body);
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required." })
})

it("GET /api/products", async () => {
  const response = await request(app).get('/api/products');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeTruthy();
  expect(response.body[0].description).toBeTruthy();
  firstProduct = response.body[0]
})

it("GET /api/product/:productId", async () => {
  // 직접적으로 넣어줘도 되는데
  // const response = await request(app).get('/api/products/5fcde7f946f68933145231e7')
  const response = await request(app).get('/api/products/' + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name)
  expect(response.body.description).toBe(firstProduct.description);
})

it("GET id doesn't exist /api/products/:productId", async () => {
  // id 형식이 안맞으면 몽고에서 500 리턴하니까 알아서 좀 잘 바꾸세요
  const response = await request(app).get('/api/products/5fcde7f946f68933145231e6')
  expect(response.statusCode).toBe(404)
})

it('PUT /api/products', async () => {
  const res = await request(app)
    .put('/api/products/' + firstProduct._id)
    .send({ name: 'updated name', description: 'updated description' });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("updated name")
  expect(res.body.description).toBe("updated description");
})

it('should return 404 on PUT /api/products', async () => {
  const res = await request(app)
    .put('/api/products' + '5fcde7f946f68933145231e678')
    .send({ name: 'updated name', description: 'updated description' });
  expect(res.statusCode).toBe(404);
})

it('DELETE /api/products', async () => {
  const res = await request(app)
    .delete('/api/products/' + firstProduct._id)
    .send();
  expect(res.statusCode).toBe(200);
})
it("DELETE id doesn't exist /api/products/:productId", async () => {
  const res = await request(app)
    .delete('/api/products/' + firstProduct._id)
    .send();
  expect(res.statusCode).toBe(404);
})
