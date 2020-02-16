import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';

const About = () => {
    return (
        <div className='container'>
            <ContactFilter />
            <Contacts />
        </div>
    )
}

export default About;
