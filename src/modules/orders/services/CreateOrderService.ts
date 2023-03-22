import CustomerRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shaded/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface IProduct{
    id:string;
    quantity:number;
}
interface IRequest{
    customer_id: string;
    products: IProduct[];
}
export default class CreateOrderService{
    public async execute ({customer_id,products}:IRequest):Promise<Order>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomerRepository);
        const productRepository = getCustomRepository(ProductRepository);
        
        const customerExists = await customerRepository.findById(customer_id);

        if(!customerExists){
            throw new AppError('Could not find any customer with the given IDs');
        }
        
        const existsProducts = await productRepository.findAllByIds(products);
        if(!existsProducts.length){
            throw new AppError('Could not find any Products with the given IDs');
        }
        const existsProductsIds = existsProducts.map((product)=>product.id);
        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id)
        )
        if(!existsProductsIds.length){
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
        }
        
        const quantityAvaliable = products.filter(
            product =>existsProducts.filter(
                prod =>prod.id === product.id
            )[0].quantity<product.quantity
        )
        if(quantityAvaliable.length){
            throw new AppError(`The quantity ${quantityAvaliable[0].quantity} is not available for ${quantityAvaliable[0].quantity}`)
        }
        
        const serializerProducts = products.map(product => ({
            product_id : product.id,
            quantity : product.quantity,
            price: existsProducts.filter(prod=>prod.id ===product.id)[0].price
        }));
        const order=await ordersRepository.createOrder({
            customer:customerExists,
            products:serializerProducts
        });
        
        const {order_products}=order;
        const updateProductQuantity = order_products.map(product=>({
            id:product.product_id,
            quantity: existsProducts.filter(
              p=>  p.id == product.product_id
            )[0].quantity-product.quantity

        }));

        await productRepository.save(updateProductQuantity);
        return order;
    }
    
}