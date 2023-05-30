import { ObjectId } from "mongodb";
import countriesModel, { ICountries } from "../models/countries.model";

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