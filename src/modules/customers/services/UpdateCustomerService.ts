

import AppError from "@shaded/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest{
    id: string;
    name: string;
    email:string;
}

export default class UpdateCustomerService{

    public async execute({id, name, email}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = await customerRepository.findOne(id);
        if(!customer){
            throw new AppError('Customer not found.');
        }

        const customerExists = await customerRepository.findByEmail(email);
        // Regra de negócio, para atualizar um produto no banco, apenas se tiver o mesmo nome e produto, caso contrário dispara a exceção
        if(customerExists && email != customer.email){
            throw new AppError('There is already one customer with this email');
        }

        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);

        return customer;
    }
}