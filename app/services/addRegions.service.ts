import { ObjectId } from "mongodb";
import regionsModel, { IRegions } from "../models/regions.model";

let multiRegions: any[] = []

export const addMultiRegions = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        multiRegions.push({
            document: {
                userId: userId,
                region: element
            }
        })
    }

    if (multiRegions.length >= 30000) {
        await bulkRegions()
    }
}

export const bulkRegions = async () => {
    await regionsModel.bulkWrite(multiRegions.map(item => ({
        insertOne: item
    })))
    multiRegions = []
}


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