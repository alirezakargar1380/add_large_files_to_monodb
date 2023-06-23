import { connectToMongo } from "./app/loaders/loaders";
import { addMultiUser, bulkUsers } from "./app/services/addUser.service";

var fs = require('fs'), es = require('event-stream');
const fileNames: any = []
const folderAddress = "./db/a1"
const readedLine = 5000

const fileReader = (fileAddress: string) => {
    return new Promise(async (resolve, reject) => {
        var lineNr = 0;
        console.log("start:", new Date())
        console.log(fileAddress)
        var s = fs.createReadStream(fileAddress, { highWaterMark: 1 * 1024 * 1024 })
            .pipe(es.split())
            .pipe(es.mapSync(async (line: any) => {

                if (!isJson(line)) return s.resume();
                lineNr++;

                // console.log("im in line:", lineNr, new Date(), fileAddress)

                const json = JSON.parse(line)
                // console.log(json)

                if (lineNr % readedLine === 0) {
                    // pause the readstream
                    s.pause();
                    console.log("im in line:", lineNr, new Date(), fileAddress)
                    console.log("----> s", new Date())
                    await bulkUsers()
                    // await bulkCertifications()
                    // await bulkCompany()
                    // await bulkCountries()
                    // await bulkEdu()
                    // await bulkEx()
                    // await bulkIntrest()
                    // await bulkLanguages()
                    // await bulkLocation()
                    // await bulkRegions()
                    // await bulkSchool()
                    // await bulkSkills()
                    console.log("----> e", new Date())
                    s.resume();
                }

                await addMultiUser(json)
                // if (json.languages.length) await addMultiLanguages(json.languages, userId)
                // if (json.countries.length) await addMultiCountries(json.countries, userId)
                // if (json.regions.length) await addMultiRegions(json.regions, userId)
                // if (json.certifications.length) await addMultiCertifications(json.certifications, userId)
                // if (json.interests.length) await addMultiInterests(json.interests, userId)
                // if (json.experience.length) await addMultiExperience(json.experience, userId)
                // if (json.education.length) await addMultiEducation(json.education, userId)
                // if (json.skills.length) await addMultiSkills(json.skills)

            }).on('error', function (err: any) {
                console.log('Error while reading file.', err);
                reject(true)
            })
                .on('end', async function () {
                    console.log("all lines:", lineNr)
                    await bulkUsers()
                    // await bulkCertifications()
                    // await bulkCompany()
                    // await bulkCountries()
                    // await bulkEdu()
                    // await bulkEx()
                    // await bulkIntrest()
                    // await bulkLanguages()
                    // await bulkLocation()
                    // await bulkRegions()
                    // await bulkSchool()
                    // await bulkSkills()
                    console.log("finish", new Date())
                    console.log('Read entire file.', fileAddress)
                    resolve(true)
                })
            );
    })
}

const readFileNames = async () => {
    return new Promise((resolve, reject) => {
        fs.readdir(folderAddress, (err: any, files: any) => {
            files.forEach((file: any) => {
                fileNames.push(file)
            });
            resolve(true)
        });
    })
}

const sendFileNamesToFileReader = async () => {
    await connectToMongo()
    // const data = await usersModel.aggregate([
    //     {
    //         $match: {
    //             $and: [
    //                 {
    //                     "education.school.website": "susla.edu"
    //                 },
    //                 {
    //                     "education.majors": "counseling"
    //                 }
    //             ]
    //         }
    //     },
    //     {
    //         $project: {
    //             education: 1
    //         }
    //     },
    //     {
    //         $limit: 3
    //     }
    // ])
    // console.log(
    //     data[0].education
    // )
    await readFileNames()
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

