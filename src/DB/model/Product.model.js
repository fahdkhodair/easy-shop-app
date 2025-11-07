import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./User.model.js";
export const productModel = sequelize.define("Product",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    category:{
        type:DataTypes.STRING,
        allowNull:true
    },
},{
    timestamps:true,
})
productModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});