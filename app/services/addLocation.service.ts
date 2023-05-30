import { ObjectId } from "mongodb"
import companyModel from "../models/companys.model"
import locationModel from "../models/location.model"

let multiLocationData: any[] = []

export const addMultiLocation = async (data: any) => {
    const id: ObjectId = new ObjectId()

    multiLocationData.push({
        document: {
            ...data
        }
    })

    if (multiLocationData.length >= 1000) {
        await bulkLocation()
    }

    return id
}

export const bulkLocation = async () => {
    await locationModel.bulkWrite(multiLocationData.map(item => ({
        insertOne: item
    })))
    multiLocationData = []
}