

import AppError from "@shaded/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest{
    id: string;
}

export default class ShowCustomerService{
    public async execute({id}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = await customerRepository.findOne(id);
        if(!customer){
            throw new AppError('Customer not found.');
        }
        return customer;
    }
}