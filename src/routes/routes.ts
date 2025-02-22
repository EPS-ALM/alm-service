import { Router } from 'express';

import { getAllocationModule, getCashValueModule, getRiskNotebookModule } from './module';
import { getForecastModule } from './module/ForecastModule';
import { getLiabilities } from './module/GetLiabilities';

const routes = Router();

routes.get("/portfolio-allocation", getAllocationModule().execute(200));
routes.get("/cash-value", getCashValueModule().execute(200));
routes.get("/passivos", getLiabilities().execute(200));
routes.get(
  "/riskNotebook",
  getRiskNotebookModule().execute(200, "notebookName")
);
routes.post("/forecast/:type", getForecastModule().execute(200));

routes.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export { routes };
