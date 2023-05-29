import { ObjectId } from "mongodb"
import companyModel from "../models/companys.model"
import locationModel from "../models/location.model"

export const addCompany = async (data: any, userId: ObjectId) => {
    let loc: any = ""
    if (data?.location) loc = await locationModel.create({ ...data.location })
    return companyModel.create({
        userId: userId,
        locationId: (loc?._id) ? loc._id : null,
        ...data
    })
}