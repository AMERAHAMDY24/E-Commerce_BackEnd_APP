import express from "express";
import { config } from "dotenv";

import { globaleResponse } from "./src/middlewares/error-handle.middleware.js";
import db_connection from "./Database/dbconnection.js"



import * as routers from "./src/modules/index.js"
config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/Category",routers.categoryRouter)
app.use("/suubCategories",routers.subCategoryRouter)
app.use("/Brand",routers.brandRouter)
app.use("/product",routers.productRouter)




app.use(globaleResponse);

db_connection();


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
