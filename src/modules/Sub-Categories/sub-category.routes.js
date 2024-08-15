import { Router } from "express";

import * as subCategoryController from "./subCategory.controller.js"


// middlewares
import { errorHandler } from "../../middlewares/error-handle.middleware.js";
import { multerHost } from "../../middlewares/multer.middlewares.js";
import { getDocumentByName } from "../../middlewares/finders.middleware.js";


// models
import { SubCategory } from "../../../Database/models/subcategory.model.js";


// utills
 const subCategoryRouter=Router();
 import { extensions } from "../../utills/file-extenstion.utils.js";

// Routers

subCategoryRouter.post("/createSubCategory",
multerHost({allowedExtensions:extensions.Images}).single("image"),
getDocumentByName(SubCategory),
errorHandler(subCategoryController.createSubCategory))



subCategoryRouter.get("/getCategory",errorHandler(subCategoryController.getSubCategory))




subCategoryRouter.put("/updateSubCategory/:_id",multerHost({allowedExtensions:extensions.Images}).single("image"),
getDocumentByName(SubCategory),
errorHandler(subCategoryController.updateSubCategory))



subCategoryRouter.delete("/deleteSubCategory/:_id",
multerHost({allowedExtensions:extensions.Images}).single("image"),
 errorHandler(subCategoryController.deleteSubCategory))


 export {subCategoryRouter}