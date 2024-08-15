import { ErrorClass } from "../utills/error-class.utils.js";
 
// find category by name

export const getDocumentByName=(model)=>{
return   async(req,res,next)=>{
    const {name}=req.body;
if(name){



    const documentExist=await model.findOne({name});
    if(documentExist){
        return next (new ErrorClass("  this name already exist"
        ,400," this name already exist"))
        }
}

        next();
};

}