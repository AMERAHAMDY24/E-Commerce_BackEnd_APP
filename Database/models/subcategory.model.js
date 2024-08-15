import mongoose, { Types } from "mongoose";

const {Schema,model}=mongoose;

const subCategorySchema=new Schema({

    name:{
        type:String,
        required:true,
        lowercase:true,
        unique:[true ,"name is required"],
        trim:true
        },
    
    slug:{
type:String,
unique:[true ,"slug is required"],
required:true
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",  //TODO: Add user model
required:false ,// Todo : change to true after adding authentication
},

Images:{
    secure_url:{
        type:String,
        required:true
    },
    public_id:{
       type:String,
       unique:true,
       required:true

    }
},
customId:{
    type:String,
    required:true,
    unique:true
},
category:{

    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
}


},

{
    timestamps:true,versionKey:false
})

export const SubCategory= mongoose.models.SubCategory ||  model("SubCategory",subCategorySchema)