import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Aadishakti",
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Some error occurred");
    });
};
