import { Router } from "express"
import { list, updateProduct, deleteProduct, saveProduct, productDetail } from "../controllers/products";
import { productSchema } from "../schemas/product"
import { checkSchema } from "express-validator";
import { handleValidator } from "../helpers/handleValidator";
import { checkMultipart, handleUploadFirebase } from "../middlewares/uploadImg"
import { protectRouters } from "../controllers/authController";
const productRouter = Router()

productRouter.get('/', list)  

productRouter.get('/:id', productDetail); 

productRouter.use(protectRouters);

productRouter.post('/save', checkMultipart, handleUploadFirebase, checkSchema(productSchema), handleValidator, saveProduct); 

productRouter.put('/update/:id', checkSchema(productSchema), handleValidator, updateProduct);

productRouter.delete('/delete/:id', deleteProduct);

export default productRouter;