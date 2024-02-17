import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function formatError(errorResponse, history, email, id, bussinessType) {
    switch (errorResponse) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
            case 'Account inactive!':
                //return 'Email already exists';
                swal("Oops", "Account inactive!", "error");
                break;


                case 'Unauthorized':
                    //return 'Email already exists';
                    swal("Oops", "Invalid password!", "error");
                    break;

                    case 'Account pending!':
                        //return 'Email already exists';
                        localStorage.setItem('email',id);
                        history.push(
                            {
                                pathname: '/page-register',
                                state: { key1: 'page1', email:email , bussinessType:bussinessType}
                            }
                           // '/page-register'
                            );  
                        break;


                        case 'Bussiness pending!':
                        //return 'Email already exists';
                        history.push(
                            {
                                pathname: '/page-register',
                                state: { key1: 'page2', email:email }
                            }
                           // '/page-register'
                            );  
                        break;
                   
                


        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
         //   alert("hey")
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'Unauthorized':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        dispatch(logout(history));
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(history));
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logout(history));
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, history);
}