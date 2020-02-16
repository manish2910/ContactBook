import React, {useState, useContext, useEffect, Fragment} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const {addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(()=>{
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name:'',
                email:'',
                mobilenumber:'',
                type:'family'
            })
        }
    },[contactContext,current]);

    const [contact,setContact] = useState({
        name:'',
        email:'',
        mobilenumber:'',
        type:'family'
    });

    const { name,email,mobilenumber,type } = contact;

    const onChange = e => setContact({...contact,[e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }
        else
        {
            updateContact(contact);
        }
        clearAll();
    };
    
    const clearAll = () => {
        clearCurrent();
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="center-align">{current?'Update':'Add'} Contact</div>
                <div className="row">
                    <div className="input-field col s6">
                    <input value={name} id="name1" type="text" name='name' className="validate" onChange={onChange} />
                    <label className="active" htmlFor="name1">Name</label>
                    </div>
                    <div className="input-field col s6">
                    <input value={email} id="name2" type="email" name='email' className="validate" onChange={onChange} />
                    <label className="active" htmlFor="name2">Facebook Id</label>
                    </div>
                    <div className="input-field col s6">
                    <input value={mobilenumber} id="name3" type="number" name='mobilenumber' className="validate" onChange={onChange} />
                    <label className="active" htmlFor="name3">Mobile Number</label>
                    </div>
                    <label>
                        <input className="with-gap" name="type" type="radio" onChange={onChange} defaultValue="family" checked={type === 'family'}/>
                        <span>Family</span>
                    </label>
                    <label>
                        <input className="with-gap" name="type" type="radio" onChange={onChange} defaultValue="friends" checked={type === 'friends'}/>
                        <span>Friends</span>
                    </label>
                    <button className="btn waves-effect waves-light row" type="submit" name="action">{current?'Update':'Add'} Contact</button>
                    {current && <button className="btn waves-effect waves-light row" name="action" onClick={clearAll}>Clear</button>}
                </div>
            </form>
        </Fragment>
    )
}

export default ContactForm;
