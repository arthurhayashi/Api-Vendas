import { getCustomRepository } from "typeorm"
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository"
import UserRepository from "../typeorm/repositories/UsersRepository"
import AppError from "@shaded/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";

interface IRequest{
    email:string
}
export default class SendForgotEmailPassword{
    public async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const forgotPasswordTemplate = path.resolve(__dirname,"..","views","forgot_password.hbs")
        const user = await userRepository.findByEmail(email);
        
        if (!user) {
          throw new AppError("User does not exist.");
        }
        const { token } = await userTokensRepository.generate(user.id);
        console.log(token);
        await EtherealMail.sendMail({
          to: {name: user.name, email:user.email},
          subject:'[API VENDAS] - Recuperação de senha',
          templateData : 
            {file:forgotPasswordTemplate,
            variables:{
              name:user.name,
              link:`http://localhost:3000/reset_password?token=${token}`
            }
          }
        });
      }
    }