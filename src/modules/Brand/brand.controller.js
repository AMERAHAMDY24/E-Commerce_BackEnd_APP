import slugify from "slugify";
import { nanoid } from "nanoid";



// utills
import { ErrorClass } from "../../utills/error-class.utils.js";
import { cloudinaryConfig } from "../../utills/cloudinary.utils.js";

// models

import { SubCategory } from "../../../Database/models/subcategory.model.js";

import { Brands } from "../../../Database/models/brand.model.js";



/**
 * @api {Post} /Brand/createBrand   create Brand
 * 
 */


export const createBrand=async (req,res,next)=>{

const {category,subCategory}=req.query;

const isSubCategory=await SubCategory.findById({_id:subCategory,
    category:category
}).populate("category")

// check if sub category exist

if(!isSubCategory){
return next(new ErrorClass ("subCategory not found",404,"subCategory not found"))
}

// destruct data

const {name}=req.body;

const slug =slugify(name,{
replacement:"_",
lower:true

});

// check image not send
if(!req.file){
    return next(new ErrorClass ("please upload an image",400,"please upload an image"))
}

// generate customId
const customId=nanoid(4);

const {secure_url,public_id}=await cloudinaryConfig().uploader.upload(req.file.path,{
        folder:`${process.env.UPLOADS_FOLDER}/Categories/${isSubCategory.category.customId}/subCategories/${isSubCategory.customId}/Brands/${customId}`
    })
// prepare brand object
const brandObj={
name,
slug,
logo:{
    secure_url,
    public_id
},
customId,
category:isSubCategory.category._id,
subCategory:isSubCategory._id,

}

// create new brand
const newBrand= await Brands.create(brandObj)

//  send the response

res.status(201).json({

    status:"success",
    message:"new Brand created successfully",
    data:newBrand
})
}



/**
 * @api {Get} /Brand/getBrand   get Brand
 * 
 */



export const getBrand= async(req,res,next)=>{

    // destruct data 
    const {id,name,slug}=req.query;
    
    const queryFilter={};
    
    if(id) queryFilter._id=id;
    if(name) queryFilter.name=name;
    if(slug) queryFilter.slug=slug;
    
    const Brand =await Brands.findOne(queryFilter)
    
    if(!Brand){
        return next(new ErrorClass("Brand not found",404,"Brand not found"))
    }
    res.status(200).json({
    
        status:"success",
        message:" Brand found successfully",
        data:Brand
    })
    
    }



    
/**
 * @api {put} /Brand/updateBrand   update Brand
 * 
 */


export const updateBrand= async(req,res,next)=>{

    // destruct brand id
    const {_id}=req.params;

    // destruct data from body
    const {name}=req.body;

    // check if brand  exist

    const brand=await Brands.findById(_id).populate("category").populate("subCategory")

if(!brand){
    return next(new ErrorClass ("Brand not found",404,"Brand not found"))
}

// update name and slug
if(name){

    const slug=slugify(name,{
        replacement:"_",
        lower:true
    })
brand.name=name;
brand.slug=slug;

}

// update Image
if(req.file){

    const splittedPublicId=brand.logo.public_id.split(`${brand.customId}/`)[1]
    
    const {secure_url}=await cloudinaryConfig().uploader.upload(req.file.path,{
    folder:`${process.env.UPLOADS_FOLDER}/Categories/${brand.category.customId}/subCategories/${brand.subCategory.customId}/Brands/${brand.customId}`,
    public_id:splittedPublicId
    })
    brand.logo.secure_url=secure_url
    }
    


await brand.save();

res.status(200).json({

    status:"success",
    message:" brand updated successfully",
    data:brand
})


}



/**
 * @api {delete} /Brand/deleteBrand/:_id delete sub brand
 *  
 * 
 */


export const deleteBrand=async(req,res,next)=>{

    const {_id}=req.params;
    
    // check if Brand exist
    const Brand= await Brands.findByIdAndDelete(_id).populate("category").populate("subCategory");
    
    if(!Brand){
    
        return next(new ErrorClass("Brand not found",404,"Brand not found"))
    }
    
    
    // delete images
    const brandPath=`${process.env.UPLOADS_FOLDER}/Categories/${Brand.category.customId}/subCategories/${Brand.subCategory.customId}/Brands/${Brand.customId}`;
    await cloudinaryConfig().api.delete_resources_by_prefix(brandPath)
    
    
    // delete folder
    await cloudinaryConfig().api.delete_folder(brandPath)
    
    // send the response
    res.status(200).json({
        status:"success",
        message:"Brand deleted Successfully"
    })
    
    
    }