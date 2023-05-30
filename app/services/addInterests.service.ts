import { ObjectId } from "mongodb";
import interestsModel from "../models/interests.model";

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