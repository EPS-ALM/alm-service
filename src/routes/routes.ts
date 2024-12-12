import { Router } from "express";
import { getAllocationModule } from "./module";

const routes = Router();

routes.get("/portfolio-allocation", getAllocationModule().execute(200));

routes.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export { routes };
