import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import jwt from "jsonwebtoken"
import productRouter from "./routes/productRouter.js" 

 
const mongourl ="mongodb+srv://admin:1234@cluster0.yaxpzpv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongourl).then(
  ()=>{
  console.log("connected to mongoDB Cluster")
}
)

const app = express() 

app.use(express.json()) //middelware to parse JSON bodies

app.use(
    (req,res,next)=>{

        const authorizationHeader = req.header("Authorization")

        if(authorizationHeader != null){

            const token = authorizationHeader.replace("Bearer ", "")
 

            jwt.verify(token, "secretkey96$2025",
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


app.get("/",(req,rest)=>{

 Student.find().then(

  (students)=>{
    rest.json(students)
  }

 )
 
})


  
app.post("/",
  
  (req,rest)=>{
  //read the data inside the request 
  console.log(req.body)
  //
  const student = new Student(req.body)

  student.save().then(
    ()=>{
      rest.json({
        message: "Student created successfully"
    })
    }
  )

})

app.delete("/",(req,rest)=>{
  rest.json({
    message: "good bye"+ req.body.name
  })
})


  app.put("/",(req,rest)=>{
  rest.json({
    message: "see you again"+ req.body.name
  })
})


app.use(express.json()) //middelware to parse JSON bodies


app.use("/users",userRouter) 
app.use("/products",productRouter)

app.listen(5000, () => {
  console.log("Server is running")
}
)



