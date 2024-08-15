import mongoose, { Types } from "mongoose";

const Schema=new mongoose.Schema({

comment:String,
    
user:{
type:Types.ObjectId,
required:true,
ref:"User"
},

product:{
    type:Types.ObjectId,
    ref:"Product"


},

rate:{

    type:Number,
    required:true,
    min:0,
    max:5
}




},


{
timestamps:true,versionKey:false
}

)

export const Review=mongoose.model("Review",Schema)