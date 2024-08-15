import mongoose, { Types } from "mongoose";

const {Schema,model}=mongoose;

const brandSchema=new Schema({

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

logo:{
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
},
subCategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubCategory",
    required:true

}
},

{
    timestamps:true,versionKey:false
})

export const Brands= mongoose.models.Brands ||  model("Brands",brandSchema)