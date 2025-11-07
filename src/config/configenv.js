export const config = {
  DB_Host: process.env.DB_Host || "localhost",
  DB_User: process.env.DB_User || "root",
  DB_Password: process.env.DB_Password || "root",
  DB_Name: process.env.DB_Name || "shop",
  DB_Port: process.env.DB_Port || 3306,
  PORT: process.env.PORT || 3000,
};
