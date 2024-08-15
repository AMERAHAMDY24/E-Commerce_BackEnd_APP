import slugify from "slugify";
import { nanoid } from "nanoid";


// utills
import { ErrorClass } from "../../utills/error-class.utils.js";
import { cloudinaryConfig } from "../../utills/cloudinary.utils.js";

// models
import {Category} from "../../../Database/models/category.model.js"
import { SubCategory } from "../../../Database/models/subcategory.model.js";
import { Brands } from "../../../Database/models/brand.model.js";

/**
 * @api {post} /Category/createCategory 
 * 
 */
export const createCategory=async(req,res,next)=>{

// destructing the request body
const {name} =req.body;

// Generating slug
const slug= slugify(name,{
    lower:true,
    replacement:"_"
})



// image data
if(!req.file){
    return next (new ErrorClass("please upload an image",400,"please upload an image"))
}

// upload the image to cloudinary
const customId=nanoid(4);
const {secure_url,public_id}=await cloudinaryConfig().uploader.upload(req.file.path,{
    folder:`${process.env.UPLOADS_FOLDER}/Categories/${customId}`
})
  

// prepare category object
const category={
    name,
    slug,
    Images:{
        secure_url,
        public_id
    },
    customId,
};


// create category in database

const newCategory=await Category.create(category)

// send the response
res.status(201).json({
    status:"success",
message:"category created successfully",
data:newCategory,
})
     
}



/**
 * @api {Get} /Category/getCategory 
 * 
 */

export const getCategory= async (req,res,next)=>{

// destructing the request body
   const {id,name,slug}=req.query;

// prepare category filter object
    const queryFilter={}
    if(id) queryFilter._id=id;
    if(name) queryFilter.name=name;
    if(slug) queryFilter.slug=slug;

    // find category from database
    const category=await Category.findOne(queryFilter);
   
    // send the response
    if(!category){
return next(new ErrorClass("category not found",404,"category not found"))
}

res.status(200).json({
    status:"success",
    message:"category found",
    category
})

}



/**
 * @api {put} /Category/updateCategory/:_id 
 * 
 */

export const updateCategory= async (req,res,next)=>{

 //destruct id from params 
const {_id}=req.params;

// find category by id
const category=await Category.findById(_id)
if(!category){
    return next(new ErrorClass("category not found",404,"category not found"))

}

const {name,public_id_new}=req.body;

// console.log(public_id_new);

// update name

if(name){
// Generating slug
const slug=slugify(name,{
    replacement:"_",
    lower:true
})

category.name=name;
category.slug=slug;
}

// update Image
if(req.file){

const splittedPublicId=category.Images.public_id.split(`${category.customId}/`)[1]

const {secure_url}=await cloudinaryConfig().uploader.upload(req.file.path,{
folder:`${process.env.UPLOADS_FOLDER}/Categories/${category.customId}`,
public_id:splittedPublicId
})
category.Images.secure_url=secure_url
}

await category.save();

res.status(200).json({
    status:"success",
    message:"category updated Successfully",
    data:category
})
}


/**
 * @api {delete} /Category/deleteCategory/:_id  delete category
 *  
 */

export const deleteCategory= async(req,res,next)=>{
// destruct id from params
const {_id}=req.params;

// check if category exist
const category =await Category.findByIdAndDelete(_id);
if(!category){
    return next(new ErrorClass("category not found",404,"category not found"))
};

// delete

// delete images
const categoryPath=`${process.env.UPLOADS_FOLDER}/Categories/${category.customId}`
await cloudinaryConfig().api.delete_resources_by_prefix(categoryPath)


// delete folder
await cloudinaryConfig().api.delete_folder(categoryPath)

//  delete related subCategory
const deletedSubCategory=await SubCategory.deleteMany({

    category:_id
})

if(deletedSubCategory.deletedCount){
//  delete brands belongs to this subCategory

await Brands.deleteMany({
    category:_id
})
}


// TODO-> delete product belongs to this brand




res.status(200).json({
    status:"success",
    message:"category deleted Successfully"
})

}



