

import AppError from "@shaded/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest{
    id: string;
}

export default class DeleteCustomerService{
    public async execute({id}: IRequest): Promise<void>{
        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = await customerRepository.findOne(id);
        if(!customer){
            throw new AppError('Customer not found.');
        }
        await customerRepository.remove(customer)
    }
}