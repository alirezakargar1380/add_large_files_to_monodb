import { ObjectId } from "mongodb"
import companyModel from "../models/companys.model"
import locationModel from "../models/location.model"
import { addMultiLocation } from "./addLocation.service"

let multiCompanyData: any[] = []

export const addMultiCompany = async (data: any, userId: ObjectId) => {
    const id: ObjectId = new ObjectId()
    let loc: any = ""
    if (data?.location) loc = await addMultiLocation(data.location)

    multiCompanyData.push({
        document: {
            _id: id,
            userId: userId,
            locationId: (loc) ? loc : null,
            ...data
        }
    })

    if (multiCompanyData.length >= 30000) {
        await bulkCompany()
    }

    return id
}

export const bulkCompany = async () => {
    await companyModel.bulkWrite(multiCompanyData.map(item => ({
        insertOne: item
    })))
    multiCompanyData = []
}

export const addCompany = async (data: any, userId: ObjectId) => {
    let loc: any = ""
    if (data?.location) loc = await locationModel.create({ ...data.location })
    return companyModel.create({
        userId: userId,
        locationId: (loc?._id) ? loc._id : null,
        ...data
    })
}