import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/demo.css";

export const Agenda = ()=> {
   const { store, actions } = useContext(Context);

   async function deleteContact(id) {
    let url='https://playground.4geeks.com/contact/agendas/Aurelio/contacts/'+id
    const response = await actions.apiCall(url,{
                                                method:'DELETE',
                                                headres:{'accept':'appication/json'}
                                                },200);
    const userContacts = await actions.apiCall('https://playground.4geeks.com/contact/agendas/Aurelio',
            {method:'GET',
            headers:{'accept':'application/json'}
            }, 200);
        console.log('Contacts: ',userContacts.contacts);
        actions.updateContactsContext(userContacts);
 
   }

    return (
        <div className="p-5 m-5 w-75">
            <div className="d-flex justify-content-end py-2">
                <Link to="/contacts/0">
                    <button type="button" className="btn btn-success">Add a new contact</button>
                </Link>
            </div>
            {store.contacts.map((item,index)=>{
                return (
                <div className="card mb-3 w-100 py-1" key={item.id}>
                    <div className="row g-0">
                        <div className="col-md-4 ps-3 d-flex justify-content-cemter">
                            <img src="https://covatar.com/cdn/shop/products/tiktoksim.jpg?v=1653481900" className="img-fluid rounded-circle" style={{width:'150px',height:'150px'}} alt="..."/>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text my-0 py-0"><i className="fa-solid fa-location-dot" style={{color: '#b0b4ba'}}></i> {item.address}</p>
                                <p className="card-text my-0 py-0"><i className="fa-solid fa-phone" style={{color: '#b0b4ba'}}></i> {item.phone}</p>
                                <p className="card-text my-0 py-0"><i className="fa-solid fa-envelope" style={{color: '#b0b4ba'}}></i> {item.email}</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <Link to={"/contacts/"+item.id}>
                                <button type="buttin" className="btn btn-light p-2"><i className="fa-solid fa-pencil"></i></button>
                            </Link>
                            <button type="button" className="btn btn-light m-2" onClick={()=> deleteContact(item.id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>  )
            })}
        </div>

    )

}