import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({title,icon}) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user, loadUser } = authContext;
    const { clearContacts } = contactContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
      }, []);

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>
                <Link to='/about'>
                    Contacts
                </Link>
            </li>
            <li>Hello {user && user.name}</li>
            <li>
                <a href='#!' onClick={onLogout}>
                    Logout
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <nav>
            <div className="nav-wrapper #039be5 light-blue darken-1">
                <Link to='/' className="brand-logo">{icon}{title}</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                { isAuthenticated ? authLinks : guestLinks }
                </ul>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
    title:'Contactbook',
    icon:<i className="large material-icons">contacts</i>
}

export default Navbar;