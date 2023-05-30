import { ObjectId } from "mongodb";
import certificationsModel from "../models/certifications.model";

let multiCertifications: any[] = []

export const addMultiCertifications = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        data[i].userId = userId
        multiCertifications.push({
            document: data[i]
        })
    }

    if (multiCertifications.length >= 1000) {
        await bulkCertifications()
    }
}


export const bulkCertifications = async () => {
    await certificationsModel.bulkWrite(multiCertifications.map(item => ({
        insertOne: item
    })))
    multiCertifications = []
}


export const addCertifications = (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        data[i].userId = userId
    }
    return certificationsModel.insertMany(data)
}