import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import SessionsController from "../controllers/SessionsController";

const sessionsRouter= Router();
const sessisonsController = new SessionsController();

sessionsRouter.post("/",celebrate({
    [Segments.BODY]:{
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    }
}),sessisonsController.create)

export default sessionsRouter;