import reducer  from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer',() => {
    it('should return initial state', () =>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token on login', () =>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'someToken',
            userId: 'someUserId'
        })).toEqual({
            token: 'someToken',
            userId: 'someUserId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });
});