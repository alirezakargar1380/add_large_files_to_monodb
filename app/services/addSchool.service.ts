import { ObjectId } from "mongodb"
import companyModel from "../models/companys.model"
import locationModel from "../models/location.model"
import schoolsModel from "../models/schools.model"
import { addMultiLocation } from "./addLocation.service"

let multiSchoolData: any[] = []

export const addMultiSchool = async (data: any, userId: ObjectId) => {
    const id: ObjectId = new ObjectId()
    if (data.id) {
        let school = await schoolsModel.findOne({
            id: data.id
        })
        if (school) return school._id
    }
    
    let loc: any = ""
    if (data?.location) {
        loc = await addMultiLocation(data.location)
    }
    delete data?.location

    multiSchoolData.push({
        document: {
            _id: id,
            userId: userId,
            locationId: (loc) ? loc : null,
            ...data
        }
    })

    // if (multiSchoolData.length >= 25000) {
    //     await bulkSchool()
    // }

    return id
}

export const bulkSchool = async () => {
    if (!multiSchoolData.length) return
    await schoolsModel.bulkWrite(multiSchoolData.map(item => ({
        insertOne: item
    })), {
        ordered: false
    })
    multiSchoolData = []
}

export const addSchool = async (data: any, userId: ObjectId) => {
    if (data.id) {
        let school = await schoolsModel.findOne({
            id: data.id
        })
        if (school) return school
    }
    
    let loc: any = ""
    if (data?.location) {
        loc = await locationModel.create({ ...data.location })
    }
    delete data?.location
    return schoolsModel.create({
        userId: userId,
        locationId: (loc?._id) ? loc._id : null,
        ...data
    })
}