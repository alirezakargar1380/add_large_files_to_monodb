import { connectToMongo } from "./app/loaders/loaders";
import skillsModel from "./app/models/skills.model";
import usersModel, { IUser } from "./app/models/users.model";
import { addExperience } from "./app/services/addExperience.service";
import { addInterests } from "./app/services/addInterests.service";
import { addLanguages } from "./app/services/addLanguage.service";
import { addSkills } from "./app/services/addSkills.service";
import { addUser } from "./app/services/addUser.service";
import { addCertifications } from "./app/services/addcertifications.service";

var fs = require('fs'), es = require('event-stream');
const fileNames: any = []
// const fileNames: any = ['part-00003 - Copy.json']
const folderAddress = "./db/Linkedin-June 2021"
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
    console.log(
        await skillsModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "languages",
                    localField: "userId",
                    foreignField: "userId",
                    as: "lang"
                }
            },
            {
                $unwind: {
                    "path": "$user",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $project: {
                    title: 1,
                    "user._id": 1,
                    "lang.title": 1
                }
            },
            {
                $match: {
                    title: { $regex: "media" }
                }
            }
        ])
    )
    return
    await readFileNames()
    for (let i = 0; i < fileNames.length; i++) {
        let fileName = fileNames[i]
        await fileReader(folderAddress + "/" + fileName)
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
    console.log(fileAddress)
    return new Promise(async (resolve, reject) => {
        var lineNr = 0;
        console.log("start:", new Date())
        var s = fs.createReadStream(fileAddress)
            .pipe(es.split())
            .pipe(es.mapSync(async (line: any) => {

                // pause the readstream
                s.pause();

                if (!isJson(line)) return s.resume();
                lineNr++;

                const json = JSON.parse(line)
                if (lineNr % 1000 === 0) console.log("im in line:", lineNr)

                const user: IUser | any = await addUser(json)
                if (!user) return s.resume();

                if (json.experience.length) await addExperience(json.experience, user._id)
                if (json.languages.length) await addLanguages(json.languages, user._id)
                if (json.skills.length) await addSkills(json.skills, user._id)
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

                // if (!json.interests.length) s.resume();
                // else console.log(json.interests) // string[]

                // if (!json.interests.length) s.resume();
                // else console.log(json.interests) // string[]

                // index: countries, regions, location_names, education, profiles
                // resume the readstream, possibly from a callback
                // console.log(json)
                // console.log("done")
                s.resume();
            }).on('error', function (err: any) {
                console.log('Error while reading file.', err);
                reject(true)
            })
                .on('end', function () {
                    console.log("finish", new Date())
                    console.log("all lines:", lineNr)
                    console.log('Read entire file.', fileAddress)
                    resolve(true)
                })
            );
    })
}