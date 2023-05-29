import languagesModel from "../models/languages.model"
import { ObjectId } from "mongodb"

export const addLanguages = async (data:any, userId:ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        await languagesModel.create({
            userId: userId,
            title: element.name,
            proficiency: element.proficiency
        })
    }
}