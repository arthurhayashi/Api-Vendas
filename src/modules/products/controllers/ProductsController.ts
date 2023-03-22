import { Request, Response } from "express";

import DeleteProductService from "@modules/products/services/DeleteProductService";
import ListProductService from "@modules/products/services/ListProductService";
import ShowProductService from "@modules/products/services/ShowProductService";
import UpdateProductService from "@modules/products/services/UpdateProductService";
import CreateProductService from "@modules/products/services/CreateProductsService";

export default class ProductsController{
    public async index(request: Request, response: Response): Promise<Response>{
        const listProducts = new ListProductService();
        // recebe o retorno dos produtos
        const products = await listProducts.execute();
        return response.json(products);
    }

    public async show(request: Request, response: Response): Promise<Response>{
        // pega o endereço da requisição lá no services ex.: localhost/products/71...
        const {id} = request.params;
        const showProduct = new ShowProductService();  
        // recebe o retorno dos produtos
        const product = await showProduct.execute({id});
        return response.json(product);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        // pega o corpo da requisição
        const {name, price, quantity} = request.body;
        const createProduct = new CreateProductService();  
        // recebe o retorno dos produtos
        const product = await createProduct.execute({name, price, quantity});
        return response.json(product);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const {name, price, quantity} = request.body;
        const updateProduct = new UpdateProductService();  
        // recebe o retorno dos produtos
        const product = await updateProduct.execute({ id, name, price, quantity });
        return response.json(product);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        // pega o endereço da requisição lá no services ex.: localhost/products/71...
        const {id} = request.params;
        const deleteProduct = new DeleteProductService();
        await deleteProduct.execute({ id });
        return response.json([]);
    }
}