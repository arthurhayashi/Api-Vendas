
import AppError from "@shaded/errors/AppError";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductRepository";

interface IRequest{
    id: string;
}

export default class DeleteProductService{
    public async execute({id}: IRequest): Promise<void>{
        const productRepository = getCustomRepository(ProductRepository);
        
        // Checa se o produto existe
        const product = await productRepository.findOne(id);
        if(!product){
            throw new AppError('Product not found.');
        }
        await productRepository.remove(product);
    }
}