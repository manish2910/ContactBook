import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'Invalid Credentials'){
            setAlert(error,'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    },[error, isAuthenticated, props.history]);

    const [user,setUser] = useState({
        email:'',
        password:'',
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]:e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password
            })
        }
    }

    return (
        <form onSubmit={onSubmit} className="container">
        <div className="center-align">Login Account</div>
        <div>Email: <input type="email" name="email" defaultValue={email} onChange={onChange}/></div>
        <div>Password: <input type="password" name="password" defaultValue={password} onChange={onChange}/></div>
        <div className="center-align"><input type="submit" defaultValue='Login' className='btn btn-large'/></div>
    </form>
    )
}

export default Login
