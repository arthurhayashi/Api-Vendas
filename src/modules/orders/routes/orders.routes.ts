import OrderController from "@modules/orders/controllers/OrderController";
import isAuthenticated from "@shaded/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";

const orderRouter =Router();

const ordersController=new OrderController();

orderRouter.use(isAuthenticated);


orderRouter.get('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}),ordersController.show);

orderRouter.post('/', celebrate({
    [Segments.BODY] : {
        customer_id: Joi.string().required(),
        products: Joi.required()
    }
}), ordersController.create);

export default orderRouter;
