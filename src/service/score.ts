import { assessmentQuestionIds } from "../seeds/id";
import { EducationOptions, LanguageTestOptions } from "../models/types";
import { EducationOptionsEnum } from "../models/modelenums";
import helpers from "@src/helpers";

const logger = helpers.logger

export function getAgeScore(age, spouse) {
    let score = 0
    switch(true) {
        case (age <17):
            score = 0
            break;
        case (age === 18):
            score = spouse? 90 : 99
            break;
        case (age === 19):
            score = spouse? 95: 105
            break;
        case (age >= 20 && age <= 29):
            score = spouse? 100: 110
            break;
        case (age === 30):
            score = spouse? 95: 105
            break;
        case (age ===31):
            score = spouse? 90: 99     
            break;              
        case (age ===32):
            score = spouse? 85: 94
            break;              
        case (age ===33):
            score = spouse? 80: 88
            break;              
        case (age ===34):
            score = spouse? 75: 83
            break;
        case (age ===35):
            score = spouse? 70: 77
            break;
        case (age ===36):
            score = spouse? 65: 72
            break;
        case (age ===37):
            score = spouse? 60: 66
            break;
        case (age ===38):
            score = spouse? 55: 61
            break;
        case (age ===39):
            score = spouse? 50: 55
            break;
        case (age ===40):
            score = spouse? 45: 50
            break;
        case (age ===41):
            score = spouse? 35: 39
            break;
        case (age ===42):
            score = spouse? 25: 28
            break;
        case (age ===43):
            score = spouse? 15: 17
            break;
        case (age ===44):
            score = spouse? 5: 6
            break;
        default:
            score = 0
    }
    return score

}

export function getEducationScore(edu, spouse)  {
    let score = 0;
    // let edu = [
    //     {
    //         "6541f5b01a770999003a1a36": "ONE_YEAR_COURSE",
    //         "6541f5f01a770999003a1a37": "ANNA_UNIVERSITY",
    //         "6541f6141a770999003a1a38": "10-2-2019",
    //         "6541f63f1a770999003a1a39": "10-2-2019",
    //         "6541f6561a770999003a1a3a": "7.09"
    //     },
    //     {
    //         "6541f5b01a770999003a1a36": "BACHELOR_DEGREE",
    //         "6541f5f01a770999003a1a37": "ANNA_UNIVERSITY",
    //         "6541f6141a770999003a1a38": "10-2-2019",
    //         "6541f63f1a770999003a1a39": "10-2-2019",
    //         "6541f6561a770999003a1a3a": "7.09"
    //     }
    // ]
    // let educationcourse = edu.filter(x => x.hasOwnProperty(assessmentQuestionIds.QN_13_1.toString()))
    let educationcourse = edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.PHD )
    // let educationcourse = edu.map((x)=> {
    //     courses.push(x[assessmentQuestionIds.QN_13_1.toString()])
    // })

    if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.PHD)).length > 0) {
        score = spouse? 140 : 150
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.MASTERS_DEGREE)).length > 0) {
        score = spouse? 126 : 135
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.BACHELOR_DEGREE)).length > 1) {
        score = spouse? 119 : 128
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.BACHELOR_DEGREE)).length > 0) {
        score = spouse? 112 : 120
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.TWO_YEAR_COURSE)).length > 0) {
        score = spouse? 91 : 98
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.ONE_YEAR_COURSE)).length > 0) {
        score = spouse? 84 : 90
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.HSC)).length > 0) {
        score = spouse? 28 : 30
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.SSLC)).length > 0) {
        score = 0
    }


    return score;
}

export function getSpouseEducationScore(edu)  {
    let score = 0
    if((edu === EducationOptions.PHD)) {
        score +=10
    } else if(edu === EducationOptions.MASTERS_DEGREE) {
        score +=10
    } else if(edu === EducationOptions.MULTIPLE_DEGREE) {
        score +=9
    } else if(edu === EducationOptions.BACHELOR_DEGREE){
        score +=8
    } else if(edu === EducationOptions.TWO_YEAR_COURSE) {
        score +=7
    } else if(edu === EducationOptions.ONE_YEAR_COURSE) {
        score +=6
    } else if(edu === EducationOptions.HSC) {
        score +=2
    } else {
        score += 0
    }
    return score;
}

export function getSposeCLBScore(clb) {
    let score = 0
    if(clb === 4) {
        score = 0
    } else if(clb ===5) {
        score +=1
    } else if(clb ===7) {
        score +=3
    } else {
        score +=5
    }
    return score
}

export function getSposeCanadianExpScore(experience) {
    let score = 0
    switch(experience) {
        case 0:
            score = 0
        case 1:
            score = 5
        case 2:
            score = 7
        case 3:
            score = 8
        case 4:
            score = 9
        case 5:
            score = 10
    }
    return score
}

export function getCanadianExpScore(experience, spouse) {
    let score = 0
    switch(experience) {
        case 0:
            score = spouse? 0 : 0
        case 1:
            score = spouse? 35 : 40
        case 2:
            score = spouse? 46 : 53
        case 3:
            score = spouse? 56 : 64
        case 4:
            score = spouse? 63 : 72
        case 5:
            score = spouse? 70 : 80
    }
    return score

}

export async function getLangProfScore(useranswers, spouse, clb){
    const languageTestTaken = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_14
    })
    let testtaken = languageTestTaken.answer.option
    if(testtaken !== 'yes') {
        return 0
    } else {
        // const testscores = useranswers.find((x) => {
        //     return x.questionId == assessmentQuestionIds.QN_15
        // })
        // const clb = await getCLBPoints(testscores)
        const languagescore = await getlanuagescore(clb, spouse)
        return languagescore
    }
}

export async function getCLBPoints(testscores) {
    try {
    // testscores = [
    //     {
    //         "6522ba4431d95cc8983c9ca0": LanguageTestOptions.CELPIP,
    //         "6522ba4d31d95cc8983c9ca1": 6,
    //         "6522ba5631d95cc8983c9ca2": 8,
    //         "6522ba5f31d95cc8983c9ca3": 6,
    //         "6522ba6831d95cc8983c9ca4": 9
    //     },
    //     {
    //         "6522ba4431d95cc8983c9ca0": LanguageTestOptions.IELTS,
    //         "6522ba4d31d95cc8983c9ca1": 6.5,
    //         "6522ba5631d95cc8983c9ca2": 8,
    //         "6522ba5f31d95cc8983c9ca3": 6,
    //         "6522ba6831d95cc8983c9ca4": 7.5
    //     },
    //     {
    //         "6522ba4431d95cc8983c9ca0": LanguageTestOptions.TCF,
    //         "6522ba4d31d95cc8983c9ca1": 10,
    //         "6522ba5631d95cc8983c9ca2": 530,
    //         "6522ba5f31d95cc8983c9ca3": 520,
    //         "6522ba6831d95cc8983c9ca4": 13
    //     },
    // ]
    let netScore = 0

    for(let i =0; i<testscores.length; i++ ) {
    let x = testscores[i]
    let speak = x[assessmentQuestionIds.QN_17.toString()]
    let listen = x[assessmentQuestionIds.QN_18.toString()]
    let read = x[assessmentQuestionIds.QN_19.toString()]
    let write = x[assessmentQuestionIds.QN_20.toString()]
    if(x[assessmentQuestionIds.QN_16.toString()] == LanguageTestOptions.CELPIP) {
        let min_value = Infinity;
        // Iterate over the values and update min_value if a smaller value is found
        for (const key in x) {
            if (typeof x[key] === 'number' && x[key] < min_value) {
                min_value = x[key];
            }
        }
        netScore += min_value
    } else if(x[assessmentQuestionIds.QN_16.toString()] == LanguageTestOptions.IELTS) {
        const [reading, writing, listening, speaking] = await Promise.all([ 
            getReadScoreIELTS(read), getWriteScoreIELTS(write), getListenScoreIELTS(listen), getSpeakScoreIELTS(speak)
        ])
        let average = Math.round((reading + writing+listening+ speaking)/4 )
        netScore += average
    } else if(x[assessmentQuestionIds.QN_16.toString()] == LanguageTestOptions.TEF) {
        const [reading, writing, listening, speaking] = await Promise.all([ 
            getReadScoreTEF(read), getWriteScoreTEF(write), getListenScoreTEF(listen), getSpeakScoreTEF(speak)
        ])
        let average = Math.round((reading + writing+listening+ speaking)/4 )
        netScore += average
    } else if(x[assessmentQuestionIds.QN_16.toString()] == LanguageTestOptions.TCF) {
        const [reading, writing, listening, speaking] = await Promise.all([ 
            getReadScoreTCF(read), getSpeakScoreTCF(write), getListenScoreTCF(listen), getSpeakScoreTCF(speak)
        ])
        let average = Math.round((reading + writing+listening+ speaking)/4 )
        netScore += average
    }

}

return Math.round(netScore/testscores.length)
} catch(e) {
    logger.error("error in calculating clb")
}
}

async function getReadScoreIELTS(reading:number) {
    let netReadScore = 0;
    switch(true) {
        case (reading >= 8.0):
            netReadScore += 10
            break;
        case (reading == 7.0):
            netReadScore += 9
            break
        case (reading >= 6.5):
            netReadScore += 8
            break
        case (reading >= 6.0):
            netReadScore +=7
            break
        case (reading >=5.0):
            netReadScore +=6;
            break
        case (reading >= 4.0):
            netReadScore +=5;
        case (reading >= 3.5):
            netReadScore +=4
            break            
    }
    return netReadScore;
}

async function getWriteScoreIELTS(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 7.5):
            netScore += 10
            break;
        case (score == 7.0):
            netScore += 9
            break
        case (score >= 6.5):
            netScore += 8
            break
        case (score >= 6.0):
            netScore +=7
            break
        case (score >=5.5):
            netScore +=6;
            break
        case (score >= 5.0):
            netScore +=5;
            break
        case (score >= 4.0):
            netScore +=4
            break            
    }
    return netScore;
}

async function getListenScoreIELTS(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 8.5):
            netScore += 10
            break;
        case (score == 8.0):
            netScore += 9
            break
        case (score >= 7.5):
            netScore += 8
            break
        case (score >= 6.0):
            netScore +=7
            break
        case (score >=5.5):
            netScore +=6;
            break
        case (score >= 5.0):
            netScore +=5;
            break
        case (score >= 4.5):
            netScore +=4
            break            
    }
    return netScore;
}

async function getSpeakScoreIELTS(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 7.5):
            netScore += 10
            break;
        case (score == 7.0):
            netScore += 9
            break
        case (score >= 6.5):
            netScore += 8
            break
        case (score >= 6.0):
            netScore +=7
            break
        case (score >=5.5):
            netScore +=6;
            break
        case (score >= 5.0):
            netScore +=5;
            break
        case (score >= 4.0):
            netScore +=4
            break            
    }
    return netScore;
}

async function getReadScoreTEF(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 263 && score <= 300):
            netScore += 10
            break;
        case (score >= 248 && score <= 262):
            netScore += 9
            break
        case (score >= 233 && score <= 247):
            netScore += 8
            break
        case (score >= 207 && score <= 232):
            netScore +=7
            break
        case (score >= 181 && score <= 206):
            netScore +=6;
            break
        case (score >= 151 && score <= 180):
            netScore +=5;
            break
        case (score >= 121 && score <= 150):
            netScore +=4
            break            
    }
    return netScore;
}
async function getWriteScoreTEF(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 393 && score <= 450):
            netScore += 10
            break;
        case (score >= 371 && score <= 392):
            netScore += 9
            break
        case (score >= 349 && score <= 370):
            netScore += 8
            break
        case (score >= 310 && score <= 348):
            netScore +=7
            break
        case (score >= 271 && score <= 309):
            netScore +=6;
            break
        case (score >= 226 && score <= 270):
            netScore +=5;
            break
        case (score >= 181 && score <= 225):
            netScore +=4
            break            
    }
    return netScore;
}
async function getListenScoreTEF(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 316 && score <= 360):
            netScore += 10
            break;
        case (score >= 298 && score <= 315):
            netScore += 9
            break
        case (score >= 280 && score <= 297):
            netScore += 8
            break
        case (score >= 249 && score <= 279):
            netScore +=7
            break
        case (score >= 217 && score <= 248):
            netScore +=6;
            break
        case (score >= 181 && score <= 216):
            netScore +=5;
            break
        case (score >= 145 && score <= 180):
            netScore +=4
            break            
    }
    return netScore;
}
async function getSpeakScoreTEF(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 393 && score <= 450):
            netScore += 10
            break;
        case (score >= 371 && score <= 392):
            netScore += 9
            break
        case (score >= 349 && score <= 370):
            netScore += 8
            break
        case (score >= 310 && score <= 348):
            netScore +=7
            break
        case (score >= 271 && score <= 309):
            netScore +=6;
            break
        case (score >= 226 && score <= 270):
            netScore +=5;
            break
        case (score >= 181 && score <= 225):
            netScore +=4
            break            
    }
    return netScore;
}
async function getReadScoreTCF(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 549 && score <= 699):
            netScore += 10
            break;
        case (score >= 524 && score <= 548):
            netScore += 9
            break
        case (score >= 499 && score <= 523):
            netScore += 8
            break
        case (score >= 453 && score <= 498):
            netScore +=7
            break
        case (score >= 406 && score <= 452):
            netScore +=6;
            break
        case (score >= 375 && score <= 405):
            netScore +=5;
            break
        case (score >= 342 && score <= 374):
            netScore +=4
            break            
    }
    return netScore;
}
async function getListenScoreTCF(score:number) {
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 549 && score <= 699):
            netScore += 10
            break;
        case (score >= 523 && score <= 548):
            netScore += 9
            break
        case (score >= 503 && score <= 522):
            netScore += 8
            break
        case (score >= 458 && score <= 502):
            netScore +=7
            break
        case (score >= 398 && score <= 457):
            netScore +=6;
            break
        case (score >= 369 && score <= 397):
            netScore +=5;
            break
        case (score >= 331 && score <= 368):
            netScore +=4
            break            
    }
    return netScore;
}
async function getSpeakScoreTCF(score:number) { // same scoring for speak and write
    // to refer scoring --> https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/standard-requirements/language-requirements/test-equivalency-charts.html
    let netScore = 0;
    switch(true) {
        case (score >= 16 && score <= 20):
            netScore += 10
            break;
        case (score >= 14 && score <= 15):
            netScore += 9
            break
        case (score >= 12 && score <= 13):
            netScore += 8
            break
        case (score >= 10 && score <= 11):
            netScore +=7
            break
        case (score >= 7 && score <= 9):
            netScore +=6;
            break
        case (score == 6):
            netScore +=5;
            break
        case (score >= 4 && score <= 5):
            netScore +=4
            break            
    }
    return netScore;
}



export async function getlanuagescore(clb, spouse) {
    let score = 0
    switch(true) {
        case (clb< 4):
            score = 0
            break;
        case (clb === 4 || clb === 5):
            score = 6
            break;
        case (clb === 6):
            score = spouse? 8 : 9
            break;
        case (clb === 7):
            score = spouse? 16 : 17
            break;
        case (clb === 8):
            score = spouse? 22 : 23
            break;
        case (clb === 9):
            score = spouse? 29 : 31
            break;           
        case (clb >= 10):
            score = spouse? 32 : 34
            break;              
        default:
            score = 0
        }
        return score;
    
}

export async function getStfEducationScore(edu, clb) {
    let score = 0;
    let educationcourse = edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.PHD )
    // let educationcourse = edu.map((x)=> {
    //     courses.push(x[assessmentQuestionIds.QN_13_1.toString()])
    // })

    if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.PHD)).length > 0) {
        score = (clb >= 7 && clb < 9)? 25 : 50
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.MASTERS_DEGREE)).length > 0) {
        score = (clb >= 7 && clb < 9)? 25 : 50
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.BACHELOR_DEGREE)).length > 1) {
        score = (clb >= 7 && clb < 9)? 25 : 50
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.BACHELOR_DEGREE)).length > 0) {
        score = (clb >= 7 && clb < 9)? 13 : 25
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.TWO_YEAR_COURSE)).length > 0) {
        score = (clb >= 7 && clb < 9)? 13 : 25
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.ONE_YEAR_COURSE)).length > 0) {
        score = (clb >= 7 && clb < 9) ? 13 : 25
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.HSC)).length > 0) {
        score = (clb >= 7 && clb < 9) ? 0 : 0
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.SSLC)).length > 0) {
        score = 0
    };

    return score;
    
}

export async function getStfCanadianScore(edu, oneyear) {
    let score = 0

    if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.PHD)).length > 0) {
        score = oneyear? 25 : 50
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.MASTERS_DEGREE)).length > 0) {
        score = oneyear? 25 : 50
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.BACHELOR_DEGREE)).length > 1) {
        score = oneyear? 25 : 50
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.BACHELOR_DEGREE)).length > 0) {
        score = oneyear? 13 : 25
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.TWO_YEAR_COURSE)).length > 0) {
        score = oneyear? 13 : 25
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.ONE_YEAR_COURSE)).length > 0) {
        score = oneyear? 13 : 25
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.HSC)).length > 0) {
        score = 0
    } else if((edu.filter(x => x[assessmentQuestionIds.QN_13_1.toString()] === EducationOptions.SSLC)).length > 0) {
        score = 0
    }
    return score;
}

export async function getStfForeignExpScore(foreignExperience, clb) {
    let score = 0
    if(clb <9 && clb >=7) {
        if(foreignExperience == 0) {
            score = 0
        } else if(foreignExperience >= 1 && foreignExperience < 3) {
            score = 13
        } else if(foreignExperience >= 3) {
            score = 25
        }
    } else if(clb>=9) {
        if(foreignExperience == 0) {
            score = 0
        } else if(foreignExperience >= 1 && foreignExperience < 3) {
            score = 25
        } else if(foreignExperience >= 3) {
            score = 50
        }
    }
    return score;
}

export async function getStfForeigncanadianExpScore(foreignExperience, CanadianExperience) {
    let score = 0
    if(CanadianExperience <= 1) {
        if(foreignExperience == 0) {
            score = 0
        } else if(foreignExperience >= 1 && foreignExperience < 3) {
            score = 13
        } else if(foreignExperience >= 3) {
            score = 25
        }
    } else if(CanadianExperience >=2) {
        if(foreignExperience == 0) {
            score = 0
        } else if(foreignExperience >= 1 && foreignExperience < 3) {
            score = 25
        } else if(foreignExperience >= 3) {
            score = 50
        }
    }
    return score;
}

export async function CalculateSTFqualificationExpScore(clb) {
    let score = 0
    if(clb >=5 && clb <7) {
        score = 25
    } else if(clb >=7) {
        score = 50
    }
    return score;
}

export async function CalculateAdditionalPointScore(siblingdata, province_nomition, noc_teer, post_secondary_year) {
    let score = 0
    if(siblingdata === 'yes') {
        score += 15
    }
    if(province_nomition === 'yes') {
        score += 600
    }
    if(noc_teer && noc_teer === 'teer_00') {
        score += 200
    } else {
        score += 50
    }
    if(post_secondary_year && post_secondary_year === 'ps_1') {
        score += 15
    } else if(post_secondary_year && post_secondary_year === 'ps_2') {
        score += 30
    } 
    return score;
}