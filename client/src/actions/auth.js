import * as api from "../api"

export const signin = (loginData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(loginData)

        navigate("/")
        const action = {
            type: "AUTH", payload: data
        }

        dispatch(action)
    } catch (error) {
        const errorMessage = error?.response?.data?.message

        if (errorMessage){
            const action = {
                type: "AUTH", payload: {message: errorMessage}
            }

            dispatch(action)
        }
    }
}


export const signup = (loginData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(loginData)

        navigate("/")
        const action = {
            type: "AUTH", payload: data
        }

        dispatch(action)
    } catch (error) {
        const errorMessage = error?.response?.data?.message

        if (errorMessage) {
            const action = {
                type: "AUTH", payload: { message: errorMessage }
            }

            dispatch(action)
        }
    }
}