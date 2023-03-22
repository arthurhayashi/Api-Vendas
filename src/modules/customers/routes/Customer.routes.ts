import isAuthenticated from "@shaded/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import CustomerContoller from "../controllers/CustomerController";

const customerRouter = Router();
const customerController = new CustomerContoller();

customerRouter.use(isAuthenticated);

customerRouter.get('/',customerController.index)

customerRouter.get('/:id',celebrate({
    [Segments.PARAMS]:{id:Joi.string().uuid().required()}
}),customerController.show);

customerRouter.post('/',celebrate({
    [Segments.BODY]:{name:Joi.string().required(),
                        email:Joi.string().required()}
}),customerController.create);

customerRouter.put('/:id',celebrate({
    [Segments.BODY]:{name:Joi.string().required(),
                        email:Joi.string().required()},
    [Segments.PARAMS]:{id:Joi.string().uuid().required()}
}),customerController.update);

customerRouter.delete('/:id',celebrate({
    [Segments.PARAMS]:{id:Joi.string().uuid().required()}
}),customerController.delete);

export default customerRouter;