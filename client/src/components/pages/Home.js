import React,{useContext,useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import AuthContext from "../../context/auth/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []) 
    return (
        <div className='container'>
            <ContactForm />
            <Contacts />
        </div>
    )
}

export default Home;