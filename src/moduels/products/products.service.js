import {productModel} from '../../DB/model/Product.model.js';
import { successResponse,errorhandling } from '../../utils/response.js';
export const saveProduct = async (req, res, next) => {
  try {
    const { name, price, category, description } = req.body;
    if (!name || !price || !category || !description) {
      return res.status(400).json({
        message: "Fields [name, price, category] are required",
      });
    }
    const product = await productModel.create({ name, price, category });
    return successResponse({
      res,
      data: { product },
      message: "Product created successfully",
      status: 201,
    });

  } catch (error) {
      errorhandling({res,error,stack:error.stack})
  }
}
export const getAllproducts = async(req,res,next)=>{
    try {
        const products = await productModel.findAll();
        return successResponse({
            res,
            data: { products },
            message: "Products retrieved successfully",
            status: 200,
        });
    } catch (error) {
        errorhandling({res,error,stack:error.stack})
    }
}
export const getAllproductsbyid = async(req,res,next) =>{
    try {
        const {id} = req.params;
        const products = await productModel.findAll({where:{userId:id}})
        return successResponse({res,data:{products},message:"products retrieved",status:200})
    } catch (error) {
        errorhandling({res,error,stack:error.stack})
    }
}
export const updateproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
    if (!name && !price && !category && !description) {
      return res.status(400).json({ message: "Please provide at least one field to update" });
    }
    const product = await productModel.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update({ name, price, category, description });
    return successResponse({
      res,
      data: { product },
      message: "Product updated successfully",
      status: 200,
    });

  } catch (error) {
    return errorhandling({ res, error, stack: error.stack });
  }
};

export const deleteproduct = async(req,res,next) =>{
    try {
        const {id} = req.params;
        const product = await productModel.destroy({where:{id}});
        if (!product) {
            return res.status(404).json({message:"Product not found"});
        }
        return successResponse({res,data:{product},message:"Product deleted successfully",status:200});
    } catch (error) {
        errorhandling({res,error,stack:error.stack})
    }
}