import Axios from 'axios'
import { URL, LOG_IN, LOG_OUT } from './helper'

export const logIn = (username, password) => {
    return async (dispatch) => {
        try {
            const { data } =  await Axios.get(URL + `/users?username=${username}&password=${password}`)
            localStorage.setItem('id', data[0].id)
            dispatch({type : LOG_IN, payload :  data[0]})
        } catch (err) {
            console.log(err)
        }
    }
}

export const logOut = () => {
    return { type : LOG_OUT }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            let id = localStorage.getItem('id')
            const { data } = await Axios.get(URL + `/users?id=${id}`)
            dispatch({ type : LOG_IN, payload : data[0]})
        } catch(err) {
            console.log(err)
        }
    }
}