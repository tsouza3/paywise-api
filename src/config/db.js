import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.STRING_CONNECTION, {
      useUnifiedTopology: true,
    });
    console.log("Conexão com o banco de dados realizado.");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
