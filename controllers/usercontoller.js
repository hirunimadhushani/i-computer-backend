import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function createUser(req,rest){
    

const data = req.body
const hashPassword =bcrypt.hashSync(data.password,10)

const user =new User({
    email : data.email,
    firstName : data.firstName,
    lastName : data.lastName,
    password : hashPassword,
    role : data.role,
})
    user.save().then(
        ()=>{
            rest.json({
                message : "User created successfully"
            })
        }
    )
}

export function loginUser(req,res){

    const email = req.body.email
    const password = req.body.password

    User.find({email : email}).then(
        (users)=>{
            if(users[0] == null){
                res.json(
                    {
                        message : "User not found"
                    })
            }else {
                const user = users[0]
             
              const isPasswordCorrect = bcrypt.compareSync(password,user.password)
             
              if(isPasswordCorrect){

                const payload = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    isEmailVerified : user.isEmailVerified,
                    image : user.image
                }

                const token = jwt.sign(payload,'secretkey96$2025')


                    res.json({
                        message: "Login successful",
                        token : token 
                    })
                }else{
                    res.statuse(401).json({
                        message: "Invalid password"
                    })
                }
            }
        }
    )
}


 export function isAdmin(req){
    if(req.user == null){
       
        return false
    }

    if(req.user.role != "admin"){
       
        return false
    }

    return true
}
