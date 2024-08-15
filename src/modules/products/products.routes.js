
import { Router } from "express";

// controllers
import * as productController from "./product.controller.js"


// middlewares
import * as middlewares from "../../middlewares/index.js"

// utils
import { extensions } from "../../utills/file-extenstion.utils.js";

// models
import { Brands } from "../../../Database/models/index.js";

 const productRouter=Router();

 const {errorHandler}=middlewares;





extensions













export {productRouter};