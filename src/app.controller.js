import express from "express";
import { checkdb, sequelize } from "./DB/connection.db.js";
import { errorhandling } from "./utils/response.js";
import path from "node:path";
import * as dotenv from "dotenv";

console.log(path.resolve("./src/config/.env.dev"));
dotenv.config({ path: "./src/config/.env.dev" });

import usercontroller from "./moduels/user/user.controller.js";
import authcontroller from "./moduels/auth/auth.controller.js";
import productcontroller from "./moduels/products/products.controller.js";

const data = async () => {
  const app = express();
  const port = process.env.port || 3000;

  app.use(express.json());

  // ✅ Database connection
  await checkdb();
  await sequelize.sync({ alter: true, force: false });
  console.log("✅ Database synced successfully");

  // ✅ Routes
  app.use("/user", usercontroller);
  app.use("/auth", authcontroller);
  app.use("/products", productcontroller);

  // ✅ Error handler (should be after routes)
  app.use(errorhandling);

  app.listen(port, () => console.log(`🚀 Server running on ${port}`));
};

export default data;
