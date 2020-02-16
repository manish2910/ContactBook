import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);

    const {deleteContact,setCurrent,clearCurrent} = contactContext;

    const {name,type,_id,mobilenumber,email} = contact;

    const onDelete = e => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className="">
            <div className="card #42a5f5 blue lighten-1">
                <div className="card-content white-text">
                <span className="card-title">{name}</span>{' '}<span className="card-title">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <div><i className="tiny material-icons">email</i>{" "}{email}</div>
                    <div><i className="tiny material-icons">phone_iphone</i>{" "}{mobilenumber}</div>
                </div>
                <div className="card-action white-text">
                    <i className="small material-icons" onClick={()=>setCurrent(contact)}>edit</i>
                    <i className="small material-icons" onClick={onDelete}>delete</i>
                </div>
            </div>
        </div>
    )
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
  };

export default ContactItem;