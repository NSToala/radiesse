import { types } from '../types/types';

// const state = {
//     name: 'Fernando',
//     logged: true
// }

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.login:
            return {
                ...action.payload,
                token: action.payload.token,
                user: action.payload.user
            }
        case types.signup:
            return {
                ...action.payload,
                token: action.payload.token,
                user: action.payload.user
            }
        case types.logout:
            return {
                token: '',
                user: []
            }    
        default:
            return state;
    }

}