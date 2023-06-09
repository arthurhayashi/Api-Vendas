import isAuthenticated from "@shaded/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ProfileContoller from "../controllers/ProfileContoller";

const profileRouter = Router();
const profileController = new ProfileContoller
profileRouter.use(isAuthenticated)

profileRouter.get('/',profileController.show)

profileRouter.put('/',
    celebrate({
        [Segments.BODY]:{
            name: Joi.string().required(),
            email:Joi.string().email().required(),
            old_password:Joi.string(),
            password:Joi.string().optional(),
            password_confirmation:
            Joi.string().valid(Joi.ref('password')).when('password',{is:Joi.exist(),then:Joi.required()})
        }
    }),profileController.update)
    export default profileRouter;
