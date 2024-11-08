import React, { useContext , useEffect } from "react";
import { Context } from "../store/appContext";
import { Link,useNavigate,useParams } from "react-router-dom";


import "../../styles/demo.css";

export const ContactForm = ()=> {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
    
        let formFields = {name:'',email:'',phone:'',address:''};
        if (params.theid>0) {
            const requestedContact = store.contacts.filter((contact)=> contact.id==params.theid);
            formFields.name=requestedContact[0].name;
            formFields.email=requestedContact[0].email;
            formFields.phone=requestedContact[0].phone;
            formFields.address=requestedContact[0].address;
         } 

    async function submitForm(event) {
        event.preventDefault();
        const parameters = { method:'POST',
                            headers:{'accept':'application/json','Content-Type':'application/json'},
                            body: JSON.stringify({name:formFields.name,
                                                phone: formFields.phone,
                                                email: formFields.email,
                                                address: formFields.address
                            })
        }
        let url = 'https://playground.4geeks.com/contact/agendas/Aurelio/contacts';
        let response = 201;
        
        if (params.theid>0) {
            url = url +'/' + params.theid;
            parameters.method='PUT';
            response = 200

        }
        const apiResponse = await actions.apiCall(url,parameters,response);
        if (apiResponse===null) { alert('Contact add/update error, please try again');
            return null
        }
        const userContacts = await actions.apiCall('https://playground.4geeks.com/contact/agendas/Aurelio',
            {method:'GET',
            headers:{'accept':'application/json'}
            }, 200);

        actions.updateContactsContext(userContacts);
        navigate('/');                
    } 

    return (
    <div className="p-5">    
    <div className="d-flex justify-content-center">
        <h1>{params.theid==0 ? 'Add a new contact' : 'Modify Contact' }</h1>
    </div>
    <form onSubmit={submitForm}>    
        <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="fullName" defaultValue={formFields.name}
            placeholder="Full Name" onChange={e=>formFields.name=e.target.value}/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" defaultValue={formFields.email}
            placeholder="Email" onChange={e=>formFields.email=e.target.value}/>
        </div>
        <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="phone" className="form-control" id="phone" defaultValue={formFields.phone}
            placeholder="Phone" onChange={e=>formFields.phone=e.target.value}/>
        </div>
        <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" defaultValue={formFields.address}
            placeholder="Address" onChange={e=>formFields.address=e.target.value}/>
        </div>
        <div className="mb-3 w-100">
            <button type="submit" className="btn btn-primary w-100">{params.theid==0 ? 'Save' : 'Update'}</button>
            <Link to="/">
				<p className="navbar-brand mb-0 h1">or get back to contacts</p>
			</Link> 
        </div>
    </form>
    </div>
    )
}