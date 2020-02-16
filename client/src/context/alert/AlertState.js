import React ,{ useReducer } from 'react';
// import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {SET_ALERT,REMOVE_ALERT} from '../types';

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type, timeout = 5000,_id) => {
        dispatch({
            type:SET_ALERT,
            payload:{ msg, type, _id }
        });

        setTimeout(()=>dispatch({ type:REMOVE_ALERT, payload:_id }), timeout)
    }
    // Remove Alert
    
    return (
        <AlertContext.Provider value={{
            alerts:state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;