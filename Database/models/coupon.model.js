import mongoose, { Types } from "mongoose";

const Schema=new mongoose.Schema({

code:
{
    type:String,
    unique:true,
    required:true
},

expire:Date,

discount:Number

},
{timestamps:true,versionKey:false}

)

export const Coupon=mongoose.model("Coupon",Schema)