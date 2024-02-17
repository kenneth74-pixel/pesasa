import {
    formatError,
  // login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';
import { login } from "../../util/APIUtils.js";
import { ACCESS_TOKEN } from "./../../constants";


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(email, password, history) {
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            runLogoutTimer(
                dispatch,
                response.data.expiresIn * 1000,
                history,
            );
            dispatch(confirmedSignupAction(response.data));
            history.push('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    localStorage.removeItem('userDetails');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history) {
    return (dispatch) => {
        const loginRequest = {
            usernameOrEmail: email,
            password: password
          };
        login(loginRequest)
            .then((response) => {
                console.log(response);
               // alert(JSON.stringify(response))
             //  alert("boo "+response)
             if(response.accessToken===null || response.accessToken===undefined){
                //alert("error")
                const errorMessage = formatError(response.message);
                dispatch(loginFailedAction(errorMessage));
               }
               else{
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                localStorage.setItem("userType", response.userType);
                saveTokenInLocalStorage(response);
                runLogoutTimer(
                    dispatch,
                    response.expiresIn * 1000,
                    history,
                );
                dispatch(loginConfirmedAction(response));
				history.push('/dashboard');  
               }
                
            })
            .catch((error) => {
             //   alert("ey "+error)
				console.log(error);
                let errorMessage =""
                if(error.message===undefined){
                errorMessage = formatError(error.error);
                }
                else{
                     errorMessage = formatError(error.message, history, email, error.id, error.bussinessType); 
                }
              dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
