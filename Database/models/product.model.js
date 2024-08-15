import mongoose from "mongoose";

const {Schema,model}=mongoose;

const productSchema= new Schema({

    // string sextion

    title:{
        type:String,
        required:true,
        trim:true
    },

    slug:{

        type:String,
        trim:true,
        lowerCase:True
    },

overview:String,

specifications:Object,

badge:{
type:String,
enum:["New","Sale","Best Seller"]

},



// Number sections

price:{

    type:Number,
    required:true,
    min:50
},


appliedDiscount:{
amount:{
    type:Number,
    min:0,
    default:0
},
type:{
type:String,
enum:["Percentage","Fixed"],
default:"Percentage"

},

},


appliedPrice:{
    type:Number,
    required:true
},


stock:{

    type:Number,
    required:true,
    min:10
},

rating:{

    type:Number,
    min:0,
    max:5,
    default:0,
},


// Images Sections

Images:{

Urls:{
    secure_url:{
        type:String,
    required:true,
    },

    public_url:{
        type:String,
    required:true,
    unique:true
    }
},
customId:{
    type:String,
    required:true,
    unique:true
},

},

// Ids section

category:{
type:Schema.Types.ObjectId,
ref:"Category",
required:true
},

subCategory:{
    type:Schema.Types.ObjectId,
    ref:"SubCategory",
    required:true
},

Brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand",
    required:true
},
createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
}





},{
    timestamps:true,
    versionKey:false
}

)






















export const Product=mongoose.models.Product || model("Product",productSchema)