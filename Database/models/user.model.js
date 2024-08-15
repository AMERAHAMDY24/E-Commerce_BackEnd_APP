import mongoose from "mongoose";

const Schema=new mongoose.Schema({

    name:String,
    email:string,
    password:string,
    
    isBlocked:{
        type:Boolean,
        default:false
    },

role:{
type:String,
enum:["admin","user"],
default:"user"
}




},


{
timestamps:true,versionKey:false
}

)

export const User=mongoose.model("User",Schema)