import { ObjectId } from "mongodb";
import regionsModel, { IRegions } from "../models/regions.model";

export const addRegions = (data: any, userId: ObjectId) => {
    const regionsData: IRegions[] = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        regionsData.push({
            userId: userId,
            region: element
        })
    }
    return regionsModel.insertMany(regionsData)
}