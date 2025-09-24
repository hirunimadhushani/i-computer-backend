import mongoose from "mongoose";

const userShema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true,
            unique: true
        },
        firstName :{
            type: String,
            required: true
        },

        lastName :{
            type: String,
            required: true
        },
        password :{
            type: String,
            required: true
        },

        role :{
            type: String,
            default:"customer"
        },

        isBlocked :{
            type: Boolean,
            default:false
        },

        isEmailverified :{
            type: Boolean,
            default:false
        },

        Image :{
            type: String,
            required: true,
            default :"/default.jpg"
        }
    }
)

const User = mongoose.model("User",userShema)
export default User;