import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomerContoller{
    public async index(request:Request,response:Response):Promise<Response>{
        const listcustomers = new ListCustomerService();
        const customers = await listcustomers.execute();
        return response.json(customers);
    }
    public async show(request: Request, response: Response): Promise<Response>{
        // pega o endereço da requisição lá no services ex.: localhost/products/71...
        const {id} = request.params;
        const showCustomer = new ShowCustomerService();  
        // recebe o retorno dos produtos
        const customer = await showCustomer.execute({id});
        return response.json(customer);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        // pega o corpo da requisição
        const {name, email} = request.body;
        const createCustomer = new CreateCustomerService();  
        // recebe o retorno dos produtos
        const customer = await createCustomer.execute({name, email});
        return response.json(customer);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const {name, email} = request.body;
        const updateCustomer = new UpdateCustomerService();  
        // recebe o retorno dos produtos
        const customer = await updateCustomer.execute({ id, name, email });
        return response.json(customer);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        // pega o endereço da requisição lá no services ex.: localhost/products/71...
        const {id} = request.params;
        const deleteCustomer = new DeleteCustomerService();
        await deleteCustomer.execute({ id });
        return response.json([]);
    }
}