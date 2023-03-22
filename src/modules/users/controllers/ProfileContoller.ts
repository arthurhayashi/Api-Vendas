import ShowProfileService from "@modules/users/services/ShowProfileService";
import { Request, Response } from "express";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileContoller{
    public async show(request:Request,response:Response):Promise<Response>{
        const showProflile =new ShowProfileService()
        const user_id = request.user.id;
        const user = await showProflile.execute({user_id});
        return response.json(user)
    }
    public async update(request:Request,response:Response):Promise<Response>{
        const user_id = request.user.id;
        const {name,email,password,old_password} = request.body;
        const updateProfile = new UpdateProfileService();
        const user = await updateProfile.execute({user_id,name,email,password,old_password});
        return response.json(user)
    }
}