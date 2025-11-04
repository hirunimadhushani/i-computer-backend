import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import jwt from "jsonwebtoken"
import productRouter from "./routes/productRouter.js" 
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

 
const mongourl =process.env.MONGO_URL

mongoose.connect(mongourl).then(
  ()=>{
  console.log("connected to mongoDB Cluster")
}
)

const app = express() 

app.use(cors()) // to enable CORS for all origins

app.use(express.json()) //middelware to parse JSON bodies

app.use(
  
    (req,res,next)=>{

        const authorizationHeader = req.header("Authorization")

        if(authorizationHeader != null){

            const token = authorizationHeader.replace("Bearer ", "")
 

            jwt.verify(token,process.env.JWT_SECRET,
                (error, content)=>{

                    if(content == null){

                        console.log("invalid token")

                        res.json({
                            message : "invalid token"
                        })

                    }else{
                        
                        req.user = content

                        next()
                    }
                }
            )
        }else{
            next()
        }

    }
)


// app.get("/",(req,rest)=>{

//  Student.find().then(

//   (students)=>{
//     rest.json(students)
//   }

//  )
 
// })


  
// app.post("/",
  
//   (req,rest)=>{
//   //read the data inside the request 
//   console.log(req.body)
//   //
//   const student = new Student(req.body)

//   student.save().then(
//     ()=>{
//       rest.json({
//         message: "Student created successfully"
//     })
//     }
//   )

// })

// app.delete("/",(req,rest)=>{
//   rest.json({
//     message: "good bye"+ req.body.name
//   })
// })


//   app.put("/",(req,rest)=>{
//   rest.json({
//     message: "see you again"+ req.body.name
//   })
// })


// app.use(express.json()) //middelware to parse JSON bodies


app.use("/api/users",userRouter) 
app.use("/api/products",productRouter)

app.listen(5000, () => {
  console.log("Server is running")
}
)



