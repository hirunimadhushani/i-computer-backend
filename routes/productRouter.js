import express from "express"
import { createProduct, getAllProducts,deleteProduct,updateProduct, getproductByID } from "../controllers/productContoller.js"

const productRouter =express.Router() 

productRouter.get("/",getAllProducts)

productRouter.get("/trending", (req,res)=>{
    res.json(
        {message : "trending products endpoint"}
    )
})



productRouter.post("/",createProduct)

productRouter.get("/:productID",getproductByID)

productRouter.delete("/:productID",deleteProduct)

productRouter.put("/:productID", updateProduct) 


export default productRouter;




