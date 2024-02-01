import { LanguageTestOptions } from "../models/types";
import { assessmentQuestionIds } from "../seeds/id";

export async function Getoptions(question_id, testname) {
    let obj
    if(testname ===LanguageTestOptions.CELPIP) {
        obj = {
            factor_type: 1,
            min_value: 4,
            max_value: 10 
        
        }
    } else if(testname ===LanguageTestOptions.IELTS) {
        obj = {
            factor_type: 0.5,
            min_value: 3.5,
            max_value: 8.5 
        
        }
    } else if (testname ===LanguageTestOptions.TEF) {
        if(question_id === assessmentQuestionIds.QN_17.toString()) {
            obj = {
                factor_type: 1,
                min_value: 181,
                max_value: 450 
            }   
        } else if(question_id === assessmentQuestionIds.QN_18.toString()) {
            obj = {
                factor_type: 1,
                min_value: 145,
                max_value: 360 
            }   
        } else if(question_id === assessmentQuestionIds.QN_20.toString()) {
            obj = {
                factor_type: 1,
                min_value: 181,
                max_value: 450 
            }   
        } else if(question_id === assessmentQuestionIds.QN_19.toString()) {
            obj = {
                factor_type: 1,
                min_value: 121,
                max_value: 300 
            }   
        }
    } else if(testname ===LanguageTestOptions.TCF) {
        if(question_id === assessmentQuestionIds.QN_17.toString()) {
            obj = {
                factor_type: 1,
                min_value: 4,
                max_value: 20 
            }   
        } else if(question_id === assessmentQuestionIds.QN_18.toString()) {
            obj = {
                factor_type: 1,
                min_value: 331,
                max_value: 699 
            }   
        } else if(question_id === assessmentQuestionIds.QN_20.toString()) {
            obj = {
                factor_type: 1,
                min_value: 342,
                max_value: 699 
            }   
        } else if(question_id === assessmentQuestionIds.QN_19.toString()) {
            obj = {
                factor_type: 1,
                min_value: 4,
                max_value: 20 
            }   
        }
    }
    return obj
}



// If obj is still undefined, handle the case where testname or question_id doesn't match any configuration.
