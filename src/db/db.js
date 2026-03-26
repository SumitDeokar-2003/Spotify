import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;