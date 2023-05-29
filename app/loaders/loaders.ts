import mongoose from "mongoose";

export const connectToMongo = async () => {
    const url: string = 'mongodb://127.0.0.1:27017/linkedin_robot';
    mongoose.set("strictQuery", false);
    await mongoose.connect(url).then((res: any) => console.log('mongo connected!'))
}