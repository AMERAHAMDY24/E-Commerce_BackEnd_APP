import { Router } from "express";

import * as categoryController from "./category.controller.js"
import { multerHost } from "../../middlewares/multer.middlewares.js";
import { extensions } from "../../utills/file-extenstion.utils.js";
import { errorHandler } from "../../middlewares/error-handle.middleware.js";
import {  getDocumentByName } from "../../middlewares/finders.middleware.js";
import { Category } from "../../../Database/models/category.model.js";

const categoryRouter=Router();

export{categoryRouter}

categoryRouter.post("/createCategory",
multerHost({allowedExtensions:extensions.Images}).single("image"),
getDocumentByName(Category),
errorHandler(categoryController.createCategory)
),


categoryRouter.get("/getCategory", errorHandler(categoryController.getCategory))


categoryRouter.put("/updateCategory/:_id",multerHost({allowedExtensions:extensions.Images}).single("image"),
getDocumentByName(Category),errorHandler(categoryController.updateCategory))




categoryRouter.delete("/deleteCategory/:_id",multerHost({allowedExtensions:extensions.Images}).single("image"),
getDocumentByName(Category),errorHandler(categoryController.deleteCategory))