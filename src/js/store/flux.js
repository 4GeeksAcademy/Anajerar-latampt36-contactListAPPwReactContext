const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userAgenda: {},
			contacts:[]		     
		},
		actions: {
			

			apiCall: async (uri,hdrs,success) => {
				try{ const response = await fetch (uri,hdrs);
					if (response.status !== success){throw new Error (`error code ${response.code}`)}
					const body = await response.json();
					return body;    
					}
				catch(error){
					console.log('Error en apiCall:',error);
					return null
							}
				},

			createUser: ()=> {
				async function initialSetUp() {
					const slug = await getActions().apiCall('https://playground.4geeks.com/contact/agendas/Aurelio',
												{method : 'POST',
												headers:{'accept':'application/json'}
												},201);
					console.log('Response from user creation:',slug);
					const userContacts = await getActions().apiCall('https://playground.4geeks.com/contact/agendas/Aurelio',
														{method:'GET',
														headers:{'accept':'application/json'}
														}, 200);
					console.log('Contacts: ',userContacts.contacts);
					let contacts = userContacts.contacts;
					setStore({userAgenda:userContacts});
					setStore({contacts:contacts})
					}
				initialSetUp();

			},
			
			updateContactsContext: (userContacts) =>{
				setStore({userAgenda:userContacts});
				setStore({contacts:userContacts.contacts});
			},

		},
	};
}
export default getState;
