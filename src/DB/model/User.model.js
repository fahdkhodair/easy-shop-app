import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const UserModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    middlename:{
        type: DataTypes.STRING,
        allowNull:true
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg:"email must be unique",
            fields:["email"]
        },
         validate: {
            isEmail: {
                msg: 'يجب إدخال بريد إلكتروني صحيح'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type:DataTypes.ENUM("admin","user"),
        defaultValue:"user"
    },
    fullName:{
        type:DataTypes.VIRTUAL,
        set(value){
            const [firstname, middlename, lastname] = value.split(" ");
            this.setDataValue("firstname", firstname);
            this.setDataValue("middlename", middlename);
            this.setDataValue("lastname", lastname);
        },
        get(){
            return `${this.firstname} ${this.middlename} ${this.lastname}`
        },
    }
},{
    timestamps:true
});

UserModel.associate = (models) => {
    if (models && models.ProductModel) {
        UserModel.hasMany(models.ProductModel, {
            foreignKey: "userId",
            as: "products",
        });
    }
};
