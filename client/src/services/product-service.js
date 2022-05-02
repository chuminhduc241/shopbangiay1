import { ServiceBase } from "config/service-base";

export class ProductService extends ServiceBase {
  // Implement method call API
  getProducts = async (params) => {
    const { limit } = params;
    return await this.get(`/getProducts/?limit=${limit}`);
  };
  getSaleProducts = async (params) => {
    const { limit } = params;
    return await this.get(`/getProducts/?limit=${limit}&isdiscount=${true}`);
  };
  searchProducts = async (params) => {
    const { limit, name } = params;
    return await this.get(`/getProducts/?limit=${100}&name[regex]=${name}`);
  };
  updatereview = async (params) => {
    const { id, ratings } = params;
    return await this.patch(`/review/${id}`, { ratings });
  };
  getProductAdmin = async (params) => {
    const { limit, page } = params;
    return await this.get(`/getProducts?limit=${limit}&page=${page}`);
  };

  getComments = async (params) => {
    const { product_id, page, limit } = params;
    const total = page * limit;
    return await this.get(`/getComments/${product_id}?limit=${total}`);
  };
  getProductById = async (params) => {
    const { id } = params;
    console.log(id);
    return await this.get(`getProduct/${id}`);
  };
  getProductByCategory = async (params) => {
    const { limit, sort, page, category } = params;
    return await this.get(
      `/getProducts?category=${category}&limit=${limit}&page=${page}&sort=${sort}`
    );
  };
  addProduct = async (params) => {
    const image = params.images;
    console.log(image);

    return await this.post("/createProduct", { ...params, images: image });
  };
  updateProduct = async (params) => {
    const image = params.images;
    const { id } = params;
    console.log(image);
    return await this.put(`/updateProduct/${id}`, { ...params, images: image });
  };
  deleteProduct = async (params) => {
    const { id } = params;

    return await this.delete(`/deleteProduct/${id}`);
  };
}
