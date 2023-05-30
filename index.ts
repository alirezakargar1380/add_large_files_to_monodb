import { connectToMongo } from "./app/loaders/loaders";
import { IUser } from "./app/models/users.model";
import { addExperience } from "./app/services/addExperience.service";
import { addLanguages } from "./app/services/addLanguage.service";
import { addSkills } from "./app/services/addSkills.service";
import { addUser } from "./app/services/addUser.service";
import { addCertifications } from "./app/services/addcertifications.service";

var fs = require('fs'), es = require('event-stream');
const fileNames: any = []
const folderAddress = "./../Linkedin-June 2021"

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
    console.log("im here")
    await readFileNames()
    // console.log(fileNames)
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

                // if (json.experience.length) await addExperience(json.experience, user._id)
                // if (json.languages.length) await addLanguages(json.languages, user._id)
                // if (json.skills.length) await addSkills(json.skills, user._id)
                if (json.certifications.length) await addCertifications(json.certifications, user._id)

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
                // {
                //     organization: 'american red cross eastern pennsylvania region',
                //     start_date: '2019-01',
                //     end_date: '2021-01',
                //     name: 'adult and pediatric first aid/cpr/aed'
                // }

                // if (!json.interests.length) s.resume();
                // else console.log(json.interests) // string[]

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
                    // resolve(true)
                })
            );
    })
}