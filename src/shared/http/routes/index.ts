import customerRouter from "@modules/customers/routes/Customer.routes";
import orderRouter from "@modules/orders/routes/orders.routes";
import productRouter from "@modules/products/routes/products.routes";
import passwordRouter from "@modules/users/routes/passwordroutes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/sessionsRoutes";
import userRouter from "@modules/users/routes/usersRoutes";
import { Router } from "express";

const routes = Router();
// Redireciona para products router quando chamado
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions',sessionsRouter);
routes.use('/password',passwordRouter);
routes.use('/profile',profileRouter);
routes.use('/customers',customerRouter);
routes.use('/orders',orderRouter);

export default routes;