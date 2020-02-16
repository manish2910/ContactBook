import React,{ useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'User already exists'){
            setAlert(error,'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    },[error, isAuthenticated, props.history]);

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]:e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '' || password2 === ''){
            setAlert('Please enter all fields','danger');
        }else if(password !== password2){
            setAlert('Password doesnot match','danger');
        }else{
            register({
                name,
                email,
                password
            })
        }
    }
    
    return (
        <form onSubmit={onSubmit} className="container">
            <div className="center-align">Register Account</div>
            <div>Name: <input type="text" name="name" defaultValue={name} onChange={onChange}/></div>
            <div>Email: <input type="email" name="email" defaultValue={email} onChange={onChange}/></div>
            <div>Password: <input type="password" name="password" defaultValue={password} onChange={onChange}/></div>
            <div>Confirm Password: <input type="password" name="password2" defaultValue={password2} onChange={onChange}/></div>
            <div className="center-align"><input type="submit" defaultValue='Register' className='btn btn-large'/></div>
        </form>
    )
}

export default Register
