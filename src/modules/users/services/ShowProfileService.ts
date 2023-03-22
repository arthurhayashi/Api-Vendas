import AppError from "@shaded/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

interface IRequest{
    user_id: string;
}

export default class ShowProfileService{
    public async execute({user_id}:IRequest):Promise<User>{
        const userRepository =  getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);
        if(!user){
            throw new AppError('User not found.');
        }
        return user;
    }
}