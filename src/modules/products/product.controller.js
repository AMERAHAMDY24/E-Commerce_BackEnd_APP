import slugify from "slugify";

// Utils
import { ErrorClass, uploadFile } from "../../utills/index.js";


// models
import { Brands } from "../../../Database/models/index.js";



/**
 * @api {Post} /Products/addProduct   Add Product
 *  
 */


export const addProduct=async(req,res,next)=>{
// destructing the request body 
const {title,overview,specification,price,discountAmount,discountType,stock}=req.body;

// Ids from req.query
const{category,subCategory,Brand}=req.query;

// req.file
if(!req.files.length)
{return next(new ErrorClass("no Images uploaded",400))
}
// Ids Check
const brandDocument=await Brands.findOne({

    _id:Brand,
    category:category,
    subCategory:subCategory

}).populate({path:"category",select:"customId"},
    {path:"subCategory",select:"customId"}
)
if(!brandDocument)
    {
        return next(new ErrorClass("Brand not found",400))
    }

// title and slug

if(title){
    const slug =slugify(title,{lower:true,replacement:"_"})
}

// specification
console.log(specification);


// prices
let appliedPrice=price;
if(discountAmount && discountType){

    if(discountType==="Percentage"){
appliedPrice=price-(price* discountAmount/100)
    }else if(discountType==="Fixed"){

appliedPrice=price-discountAmount
    }
}


// Images
const brandCustomId===
for (const file of req.files) {
// upload each file to cloudinary
const {}= await uploadFile({file:file.path,
    folder:
})
    
}














}

















/**
 * @api {delete} /subCategory/deleteSubCategory/:_id delete sub category
 *  
 * 
 */









/**
 * @api {delete} /subCategory/deleteSubCategory/:_id delete sub category
 *  
 * 
 */







/**
 * @api {delete} /subCategory/deleteSubCategory/:_id delete sub category
 *  
 * 
 */