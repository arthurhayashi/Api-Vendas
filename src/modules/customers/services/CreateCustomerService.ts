

import AppError from "@shaded/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest{
    name: string;
    email:string
}

export default class CreateCustomerService{
    public async execute({name, email}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomerRepository);

        const customerExists = await customerRepository.findByEmail(email);
        if(customerExists){
            throw new AppError('Email addres already used');
        }
        const customer = customerRepository.create({name, email});
        await customerRepository.save(customer);
        return customer;
    }
}

// Olhar importações