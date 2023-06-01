import { ObjectId } from "mongodb";
import interestsModel from "../models/interests.model";

let multiInterests: any[] = []

export const addMultiInterests = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        multiInterests.push({
            document: {
                userId: userId,
                title: data[i]
            }
        })
    }

    if (multiInterests.length >= 30000) {
        await bulkIntrest()
    }
}

export const bulkIntrest = async () => {
    await interestsModel.bulkWrite(multiInterests.map(item => ({
        insertOne: item
    })))
    multiInterests = []
}

export const addInterests = (data: any, userId: ObjectId) => {
    const interestsData = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        interestsData.push({
            userId: userId,
            title: element
        })
    }
    return interestsModel.insertMany(interestsData)
}