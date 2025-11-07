import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
    process.env.DB_Name||"shop",
    process.env.DB_User||"root",
    process.env.DB_Password||"root",
    {
        host: process.env.DB_Host||'localhost',
        port: process.env.DB_Port || 3306,
        dialect: 'mysql',
        logging: false,
}
);
export async function checkdb(){
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}