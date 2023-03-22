import fs from "fs"
import uploadConfig from "@config/upload";
import { getCustomRepository } from "typeorm";
import AppError from "@shaded/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import path from "path";
import User from "../typeorm/entities/User";

interface IRequest{
    user_id:string;
    avatarFileName:string;
}
export default class UpdateUserAvatarService{
    public async execute({user_id,avatarFileName}:IRequest):Promise<User>{
        const userRepository = getCustomRepository(UsersRepository)
        const user = await userRepository.findById(user_id);
        if(!user){
            throw new AppError("User not Found");
        }
        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory , user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists){
                //remove o arquivo do servidor
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar= avatarFileName;
        await userRepository.save(user);
        return user;
    }
}