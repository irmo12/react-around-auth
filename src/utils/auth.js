import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {regApi} from './api';


const auth = {

  signin: (data) => {
    return regApi.authorizationParams(data)
    .then((data) => {localStorage.setItem('token', data.token)})
},

  signup: (data) => { 
    return regApi.registerParams(data);
},

  checkToken: (token) => {},

};

export {auth};
