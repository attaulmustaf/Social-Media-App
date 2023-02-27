const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required :true,
        min:6,
        
    },
    profilePicture:{
        type:String,
        default:""

    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
       type:Array,
       default:[]
    },
    followins:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
      type:String,
      max:50,
      default:"hey its desc"
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50,
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },

},
{timestamp:true}
)
module.exports = mongoose.model("User",UserSchema)
