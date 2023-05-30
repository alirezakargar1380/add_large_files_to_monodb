import { ObjectId } from "mongodb";
import { connectToMongo } from "./app/loaders/loaders";
import skillsModel from "./app/models/skills.model";
import usersModel, { IUser } from "./app/models/users.model";
import { addCountries, addMultiCountries, bulkCountries } from "./app/services/addCountries.service";
import { addEducation, addMultiEducation, bulkEdu } from "./app/services/addEducation.service";
import { addExperience, addMultiExperience, bulkEx } from "./app/services/addExperience.service";
import { addInterests, addMultiInterests, bulkIntrest } from "./app/services/addInterests.service";
import { addLanguages, addMultiLanguages, bulkLanguages } from "./app/services/addLanguage.service";
import { addMultiRegions, addRegions, bulkRegions } from "./app/services/addRegions.service";
import { addMultiSkills, addSkills, bulkSkills } from "./app/services/addSkills.service";
import { addMultiUser, addUser, bulkUsers } from "./app/services/addUser.service";
import { addCertifications, addMultiCertifications, bulkCertifications } from "./app/services/addcertifications.service";
import { bulkCompany } from "./app/services/addCompany.service";
import { bulkLocation } from "./app/services/addLocation.service";
import { bulkSchool } from "./app/services/addSchool.service";

var fs = require('fs'), es = require('event-stream');
const fileNames: any = []
// const fileNames: any = ['part-00003 - Copy.json']
const folderAddress = "./db/a3"
// const folderAddress = "./db"

const readFileNames = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(folderAddress, (err: any, files: any) => {
            files.forEach((file: any) => {
                const fileN = file.split(".")
                if (fileN.length == 1) {
                    fileNames.push(file)
                }
            });
            resolve(true)
        });
    })
}


const sendFileNamesToFileReader = async () => {
    await connectToMongo()
    // console.log(
    //     await skillsModel.aggregate([
    //         {
    //             $lookup: {
    //                 from: "users",
    //                 localField: "userId",
    //                 foreignField: "_id",
    //                 as: "user"
    //             }
    //         },
    //         {
    //             $lookup: {
    //                 from: "languages",
    //                 localField: "userId",
    //                 foreignField: "userId",
    //                 as: "lang"
    //             }
    //         },
    //         {
    //             $unwind: {
    //                 "path": "$user",
    //                 "preserveNullAndEmptyArrays": true
    //             }
    //         },
    //         {
    //             $project: {
    //                 title: 1,
    //                 "user._id": 1,
    //                 "lang.title": 1
    //             }
    //         },
    //         {
    //             $match: {
    //                 title: { $regex: "media" }
    //             }
    //         }
    //     ])
    // )
    // return
    await readFileNames()
    // let i = 0
    // fileReader(folderAddress + "/" + fileNames[i])
    // fileReader(folderAddress + "/" + fileNames[i + 1])
    // fileReader(folderAddress + "/" + fileNames[i + 2])
    for (let i = 0; i < fileNames.length; i++) {
        await fileReader(folderAddress + "/" + fileNames[i])
    }
}

sendFileNamesToFileReader()

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const fileReader = (fileAddress: string) => {
    return new Promise(async (resolve, reject) => {
        var lineNr = 0;
        console.log("start:", new Date())
        console.log(fileAddress)
        var s = fs.createReadStream(fileAddress)
            .pipe(es.split())
            .pipe(es.mapSync(async (line: any) => {

                // pause the readstream
                s.pause();

                if (!isJson(line)) return s.resume();
                lineNr++;

                const json = JSON.parse(line)
                if (lineNr % 20000 === 0) {
                    console.log("im in line:", lineNr, new Date(), fileAddress)
                }

                const userId: ObjectId = await addMultiUser(json)

                if (json.languages.length) await addMultiLanguages(json.languages, userId)
                if (json.skills.length) await addMultiSkills(json.skills, userId)
                if (json.countries.length) await addMultiCountries(json.countries, userId)
                if (json.regions.length) await addMultiRegions(json.regions, userId)
                if (json.certifications.length) await addMultiCertifications(json.certifications, userId)
                if (json.interests.length) await addMultiInterests(json.interests, userId)
                if (json.experience.length) await addMultiExperience(json.experience, userId)
                if (json.education.length) await addMultiEducation(json.education, userId)

                return s.resume();
                // ------------------------------------ old sulution
                const user: IUser | any = await addUser(json)
                if (!user) return s.resume();

                if (json.experience.length) await addExperience(json.experience, user._id)
                if (json.education.length) await addEducation(json.education, user._id)
                if (json.languages.length) await addLanguages(json.languages, user._id)
                if (json.skills.length) await addSkills(json.skills, user._id)
                if (json.countries.length) await addCountries(json.countries, user._id)
                if (json.regions.length) await addRegions(json.regions, user._id)
                if (json.certifications.length) await addCertifications(json.certifications, user._id)
                if (json.interests.length) await addInterests(json.interests, user._id)

                // ---------------------------------------- doned-----------------------------

                // if (!json.phone_numbers.length) s.resume();
                // else await addUser(json)

                // if (!json?.experience[0]?.title?.levels.length) s.resume();
                // else console.log(json.experience[0])

                // if (!json.skills.length) s.resume();
                // else console.log(json.skills) // array of strings

                // if (!json.languages.length) s.resume();
                // else console.log(json.languages) [{name:"", proficiency:""}] 
                // addLanguages()

                // if (!json.certifications.length) s.resume();
                // else console.log(json.certifications)

                // if (2>=json.profiles.length) s.resume();
                // else {
                //     console.log(json.profiles)
                //     console.log(json)
                // } // string[]

                // if (!json.education.length) s.resume();
                // else addEducation(json.education, user._id) // string[]

                // index: profiles
                // resume the readstream, possibly from a callback
                // console.log(json)
                // console.log("done")
                s.resume();
            }).on('error', function (err: any) {
                console.log('Error while reading file.', err);
                reject(true)
            })
                .on('end', async function () {
                    await bulkCertifications()
                    await bulkCompany()
                    await bulkCountries()
                    await bulkEdu()
                    await bulkEx()
                    await bulkIntrest()
                    await bulkLanguages()
                    await bulkLocation()
                    await bulkRegions()
                    await bulkSchool()
                    await bulkSkills()
                    await bulkUsers()
                    console.log("finish", new Date())
                    console.log("all lines:", lineNr)
                    console.log('Read entire file.', fileAddress)
                    resolve(true)
                })
            );
    })
}