import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFoundError from "./app/middlewares/notFoundError";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from 'cookie-parser';


const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', }));


app.get("/", (req: Request, res: Response) => {
  res.send("Pet Service Server");
});

//application route
app.use('/api', router);

//global error handler 
app.use(globalErrorHandler)

//not found error handler
app.all("*", notFoundError)

export default app;
