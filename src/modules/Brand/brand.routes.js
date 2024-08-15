import { Router } from "express";

import * as brandController from "./brand.controller.js"








// middlewares
import { errorHandler } from "../../middlewares/error-handle.middleware.js";
import { multerHost } from "../../middlewares/multer.middlewares.js";
import { getDocumentByName } from "../../middlewares/finders.middleware.js";


// models
import { Brands } from "../../../Database/models/brand.model.js";

// utills
 import { extensions } from "../../utills/file-extenstion.utils.js";




 const brandRouter=Router();


// Routers


brandRouter.post("/createBrand",
multerHost({allowedExtensions:extensions.Images}).single("image"),
getDocumentByName (Brands)
,errorHandler(brandController.createBrand))



brandRouter.get("/getBrand",errorHandler(brandController.getBrand))


brandRouter.put("/updateBrand/:_id",
multerHost({allowedExtensions:extensions.Images}).single("image"),
getDocumentByName (Brands)
,errorHandler(brandController.updateBrand))


brandRouter.delete("/deleteBrand/:_id",
multerHost({allowedExtensions:extensions.Images}).single("image"),
errorHandler(brandController.deleteBrand))

export {brandRouter};
