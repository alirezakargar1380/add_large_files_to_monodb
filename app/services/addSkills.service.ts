import { ObjectId } from "mongodb";
import skillsModel from "../models/skills.model";

export const addSkills = (data: any, userId: ObjectId) => {
    const skillsData = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        skillsData.push({
            userId: userId,
            title: element
        })
    }
    return skillsModel.insertMany(skillsData)
}