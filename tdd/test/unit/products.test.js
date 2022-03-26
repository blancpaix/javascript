const productController = require('../../controller/product');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');

const newProduct = require('../../data/new-product.json');
const allProducts = require('../../data/all-products.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = 'abcdefg';
const updatedProduct = { name: "updated name", description: "updated description" };

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
  // 비동기처리를 위해 필요한데 어디서 호출되었는지 확인하기 위해서 jest.fn() 사용
})

describe('Product Controller CREATE', () => {
  beforeEach(() => {
    req.body = newProduct;
  })
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  })
  it("should call ProductModel.create", async () => {
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct); // 직접적 호출을 막기 위해 mock 함수 생성
  })
  it("should retrun 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct)
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  })
  it("should handle errors", async () => {
    const errorMessage = { message: "Description property missing" };
    const rejectPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectPromise); // 임의로 집어넣어주고
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
});


describe("Product Controller GET", () => {
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toBe('function');
  })
  it("should call ProductModel.find({})", async () => {   // ({}) 조건없이 모든 값을 받길 원함
    await productController.getProducts(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({}); // 어떤값과 호출되는지 확인
  })
  it("should return 200 response", async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  })
  it("should return josn body in response", async () => {
    productModel.find.mockReturnValue(allProducts)
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  })
  it("should handle error", async () => {
    const errorMessage = { message: "Error finding product data" }
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})

describe("Product Controller GetById", () => {
  it("should have a getProductById", () => {
    expect(typeof productController.getProductById).toBe('function');
  })
  it("should call productModel.findById", async () => {
    req.params.productId = productId;   // 이걸로 값을 넣어주는거임

    await productController.getProductById(req, res, next);
    expect(productModel.findById).toBeCalledWith(productId);
  })
  it("should return json body and response code 200", async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it('should return 404 when item doesnt exist', async () => {
    productModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })
  // const rejectedPromise = Promise.reject(errorMEssage); // 이 부분 없으면 catch 로 안감
  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})

describe("Product contoller UPDATE", () => {
  it("should have an updateProduct function", () => {
    expect(typeof productController.updateProduct).toBe("function");
  })
  it("should call productMode.findByIdAndUpdate", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    await productController.updateProduct(req, res, next);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId, updatedProduct,
      { new: true }
    );
  })
  it("should return json body and respose code 200", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
  })
  it("should handle 404 when item doesn't exist", async () => {
    productModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it("should handle error", async () => {
    const errorMessage = { message: "Error" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await productController.updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  })
})

describe('Product Controller Delete', () => {
  it('should have a deleteProduct function', () => {
    expect(typeof productController.deleteProduct).toBe('function');
  })
  it("should call ProductModel.findByIdAndDelete", async () => {
    req.params.productId = productId;
    await productController.deleteProduct(req, res, next);
    expect(productModel.findByIdAndDelete).toBeCalledWith(productId);
  })
  it('should return 200 response', async () => {
    let deletedProduct = {
      name: 'deleted Product', description: "it is deleted"
    };
    productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedProduct);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it("should handle 404 when item doesn't exist", async () => {
    productModel.findByIdAndDelete.mockReturnValue(null);
    await productController.deleteProduct(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it('should handle errors', async () => {
    const errorMessage = { message: 'Error deleting' };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await productController.deleteProduct(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})
