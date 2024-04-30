import { Constants } from './constants'



export function createUrl(path) {
    return Constants.serverUrl + path
}

// use the logging on console by default
export function log(message) {
    console.log(message)
}
