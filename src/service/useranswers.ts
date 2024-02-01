import { assessmentQuestionIds } from "../seeds/id";
import { getAgeScore, getCLBPoints, getCanadianExpScore, getEducationScore, getLangProfScore, getStfEducationScore,
    getStfCanadianScore, 
    getStfForeignExpScore,
    getStfForeigncanadianExpScore,
    CalculateSTFqualificationExpScore,
    CalculateAdditionalPointScore,
    getSpouseEducationScore,
    getSposeCLBScore,
    getSposeCanadianExpScore} from "./score";



export async function CalculateSelfScore(useranswers, clb) {
    try {
        const withSpouse = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_SPOUSE1
        })
        let isSpouse = false
        if(withSpouse && withSpouse.answer.option === 'yes') {
            isSpouse = true
        }
        const dob = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_4
        })
        const education = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_13
        })

    
        const canadianWorkExp = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_21
        })
        const birthDate = new Date(dob?.answer);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        // const isSpouse = (spouse =='married'? true : false)
        const [ageScore, EducationScore, canadianExpScore, languageScore] = await Promise.all([ // , langProf1, langProf2, workExp
            getAgeScore(age, isSpouse), getEducationScore(education.answer,isSpouse ), getCanadianExpScore(parseInt(canadianWorkExp.answer.option), isSpouse), getLangProfScore(useranswers, isSpouse, clb),// getLangProf1Score(), workExp()
        ])
        console.log('agescore', ageScore, EducationScore, canadianExpScore, languageScore)
    
        return ageScore+ EducationScore+ canadianExpScore+ languageScore
    } catch(e) {
        console.log('Error in calculating Self score', e)
    }

}

export async function CalculateSpouseScore(useranswers) {
    try {
        const withSpouse = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_SPOUSE1
        })
  
        if(!withSpouse || withSpouse.answer.option !== 'yes') {
            return 0
        }
        const spouseeducation = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_SPOUSE2
        })
        const clbscores = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_SPOUSE4
        })
        const experience = useranswers.find((x) => {
            return x.questionId == assessmentQuestionIds.QN_SPOUSE3
        })
        await getSposeCLBScore(spouseeducation.answer.option)
        const [eduscore, clbscore, canadianExpScore] = await Promise.all([
        getSpouseEducationScore(spouseeducation.answer.option), getSposeCLBScore(clbscores.answer.option), getSposeCanadianExpScore(parseInt(experience.answer.option))
    ])
    
        return eduscore+ clbscore+ canadianExpScore
    } catch(e) {
        console.log('Error in calculating Self score')
    }

}


export async function CalculateSTFEducationScore(useranswers, clb) {
    // const testscores = useranswers.find((x) => {
    //     return x.questionId == assessmentQuestionIds.QN_15
    // })
    try {
    const education = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_13
    })    
    // const clb = await getCLBPoints(testscores);
    const score = await getStfEducationScore(education.answer, clb);
    return score;
  } catch(e) {
    console.log('Error in calculating edu score')
}
}

export async function CalculateSTFCanadianExpScore(useranswers) {
    try {
    const education = useranswers.find((x) => { //
        return x.questionId == assessmentQuestionIds.QN_13
    })    
    const experience = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_21
    })
    let canadianExperience = parseInt(experience.answer?.option);
    const oneyear = (canadianExperience <=1) ? true: false
    const score = await getStfCanadianScore(education.answer, oneyear);
    return score;
    } catch(e) {
    console.log('Error in calculating canadianexp')
}
}

export async function CalculateSTFForeignExpScore(useranswers, clb) {
    try {
    const forein_experience = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_22
    })
    let foreignExperience = forein_experience.answer?.option;

    const score = await getStfForeignExpScore(parseInt(foreignExperience), clb);
    return score;
} catch(e) {
    console.log('Error in calculating foreign score')
}
}

export async function CalculateSTFForeignCanadaExpScore(useranswers) {
    try {
    const forein_experience = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_22
    })
    let foreignExperience = parseInt(forein_experience.answer?.option);
    const canadian_experience = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_21
    })
    let CanadianExperience = parseInt(canadian_experience.answer?.option);

    const score = await getStfForeigncanadianExpScore(foreignExperience, CanadianExperience);
    return score;
    } catch(e) {
    console.log('Error in calculating foreign canada score')
    }
}

export async function CalculateSTFqualificationScore(useranswers, clb) {
    try {
    const qualification = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_23
    })
    let qualification_certified = qualification.answer?.option;
    if(qualification_certified !== 'yes') {
        return 0
    } else {
        let score = await CalculateSTFqualificationExpScore(clb)
        return score;
    }
    } catch(e) {
    console.log('Error in calculating stfqualti score')
    }
}

export async function CalcualteAdditionalScore(useranswers) {
    try {
        console.log('CalcualteAdditionalScore')
    const sibling_living_inCanada = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_8 //QN_25
    })
    let siblingdata = sibling_living_inCanada.answer?.option;
    console.log('--1')
    const provincial_nomition = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_25
    })
    let province_nomition = provincial_nomition.answer?.option;
    console.log('--2')
    const teer = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_26
    })
    let noc_teer = teer.answer?.option;
    console.log('--3')
    const pg_credential = useranswers.find((x) => {
        return x.questionId == assessmentQuestionIds.QN_27_1
    })
    let post_secondary_year = pg_credential.answer?.option;
    console.log('--4')
    console.log('ggogo', siblingdata,  province_nomition, noc_teer, post_secondary_year)

    let score = await CalculateAdditionalPointScore(siblingdata, province_nomition, noc_teer, post_secondary_year)
    return score
} catch(e) {
    console.log('Error in calculating additional score', e)
    }
}


export function getScore(questionid, answer) {
    switch(questionid) {
    case assessmentQuestionIds.QN_4.toString():
        let score = 0
        const today = new Date();
        const birthDate = new Date(answer);
        let age = today.getFullYear() - birthDate.getFullYear();
        if(age <= 17) {
            score = 0
        } else if(age == 18) {  
            score = 90
        }
        break;
    default:
        console.log('defalt')
    }

}