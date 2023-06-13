import { ObjectId } from "mongodb";
import countriesModel, { ICountries } from "../models/countries.model";

let multiCountries: any[] = []

export const addMultiCountries = async (data: any, userId: ObjectId) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        multiCountries.push({
            document: {
                userId: userId,
                country: element
            }
        })
    }

    // if (multiCountries.length >= 30000) {
    //     await bulkCountries()
    // }
}

export const bulkCountries = async () => {
    if (!multiCountries.length) return
    await countriesModel.bulkWrite(multiCountries.map(item => ({
        insertOne: item
    })), {
        ordered: false
    })
    multiCountries = []
}


export const addCountries = (data: any, userId: ObjectId) => {
    const countriesData: ICountries[] = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        countriesData.push({
            userId: userId,
            country: element
        })
    }
    return countriesModel.insertMany(countriesData)
}