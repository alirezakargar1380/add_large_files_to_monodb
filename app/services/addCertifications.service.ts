import { ObjectId } from "mongodb";
import certificationsModel from "../models/certifications.model";

export const addCertifications = (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        data[i].userId = userId
    }
    return certificationsModel.insertMany(data)
}