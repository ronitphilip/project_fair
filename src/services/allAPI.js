import commonAPI from './commonAPI'
import SERVER_BASE_URL from './serverURL'

// registerAPI
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}

// loginAPI
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}

// add-project
export const addProjectAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-project`,reqBody,reqHeader)
}

// home-projects
export const homeProjectAPI = async () => {
    return await commonAPI("GET",`${SERVER_BASE_URL}/home-projects`,{})
}

// user-projects
export const userProjectAPI = async (reqHeader) => {
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-projects`,{},reqHeader)
}

// all-projects
export const allProjectAPI = async (reqHeader) => {
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-projects`,{},reqHeader)
}