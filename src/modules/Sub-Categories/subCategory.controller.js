import slugify from "slugify";
import { nanoid } from "nanoid";



// utills
import { ErrorClass } from "../../utills/error-class.utils.js";
import { cloudinaryConfig } from "../../utills/cloudinary.utils.js";

// models

import { SubCategory } from "../../../Database/models/subcategory.model.js";
import { Category } from "../../../Database/models/category.model.js";
import { Brands } from "../../../Database/models/brand.model.js";



/**
 * @api {Post} /subCategory/createSubCategory   create sub-category
 * 
 */


export const createSubCategory=async(req,res,next)=>{

// check category existence by id
const category =await Category.findById(req.query.category);


if(!category){

return next(new ErrorClass("category not found",404,"category not found"))

}
//  destruct data 

const {name}=req.body;

const slug= slugify(name,{
    replacement:"_",
    lower:true
})

// Image

if(!req.file)
{
    return next(new ErrorClass("please upload an image",400,"please upload an image"))
}

const customId=nanoid(4);

const {secure_url,public_id}=await cloudinaryConfig().uploader.upload(req.file.path,{
        folder:`${process.env.UPLOADS_FOLDER}/Categories/${category.customId}/subCategories/${customId}`
    })
// prepare category data
const subCategory={
name,
slug,
Images:{

    secure_url,
    public_id
},
customId,
category:category._id

}

// create category

const newSubCategory= await SubCategory.create(subCategory)

// send the reaponse

res.status(201).json({

    status:"success",
    message:"new subcategory created successfully",
    data:newSubCategory
})
}


/**
 * @api {Get} subCategory/getSubCategory  get category
 * 
 */


export const getSubCategory= async(req,res,next)=>{

// destruct data 
const {id,name,slug}=req.query;

const queryFilter={};

if(id) queryFilter._id=id;
if(name) queryFilter.name=name;
if(slug) queryFilter.slug=slug;

const subCategory =await SubCategory.findOne(queryFilter)

if(!subCategory){
    return next(new ErrorClass("category not found",404,"category not found"))
}
res.status(200).json({

    status:"success",
    message:" subcategory found successfully",
    data:subCategory
})

}











/**
 * @api {put} /subCategory/updateSubCategory/:_id update sub-category
 * 
 */

export const updateSubCategory=async(req,res,next)=>{
// destruct data
const {_id}=req.params;
const {name}=req.body;
// check if sub category exist

const subcategory= await SubCategory.findById(_id).populate("category");

if(!subcategory){

    return next(new ErrorClass("subCategory not found",404,"subCategory not found"))
}

// update name and slug
if(name){
    const slug=slugify(name,{
        replacement:"_",
        lower:true
    })
subcategory.name=name;
subcategory.slug=slug;

}
// update Image
if(req.file){

    const splittedPublicId=subcategory.Images.public_id.split(`${subcategory.customId}/`)[1]
    
    const {secure_url}=await cloudinaryConfig().uploader.upload(req.file.path,{
    folder:`${process.env.UPLOADS_FOLDER}/Categories/${subcategory.category.customId}/subCategories/${subcategory.customId}`,
    public_id:splittedPublicId
    })
    subcategory.Images.secure_url=secure_url
    }
    


await subcategory.save();

res.status(200).json({

    status:"success",
    message:" subcategory updated successfully",
    data:subcategory
})

}



export const deleteSubCategory=async(req,res,next)=>{

const {_id}=req.params;

// check if sub category exist

const subcategory= await SubCategory.findByIdAndDelete(_id).populate("category");

if(!subcategory){

    return next(new ErrorClass("subCategory not found",404,"subCategory not found"))
}


// delete images
const subCategoryPath=`${process.env.UPLOADS_FOLDER}/Categories/${subcategory.category.customId}/subCategories/${subcategory.customId}`
await cloudinaryConfig().api.delete_resources_by_prefix(subCategoryPath)


// delete folder
await cloudinaryConfig().api.delete_folder(subCategoryPath)

//  delete related brands belongs to this subCategory

await Brands.deleteMany({
    subCategory:_id
})


// TODO: delete product belongs to brand


res.status(200).json({
    status:"success",
    message:"subCategory delete Successfully"
})


}