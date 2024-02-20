import React, { useEffect, useState } from 'react';

const Problem2 = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [showEven, setShowEven] = useState(false);


    const [contacts, setContacts] = useState(null);



    console.log(contacts);
    const handleModalAClick = () => {
        setShowEven(false)
        fetch('https://contact.mediusware.com/api/contacts/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': 'Ej8A1rLnUAN38tDS5ix5IemMjj01BGJ8IlSBFH7CsYh5rVB2BdQ5ZaB1r66waFF2'
            }

        }).then(res => res.json()).then(data => {

            setContacts(data)


            setModalVisible(true);
            setShowCheckbox(true);

        }).catch(err => console.log(err))

    };
    const handleModalBClick = () => {
        setShowEven(false)
        fetch('https://contact.mediusware.com/api/country-contacts/united%20states/?page_size=10', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': 'Ej8A1rLnUAN38tDS5ix5IemMjj01BGJ8IlSBFH7CsYh5rVB2BdQ5ZaB1r66waFF2'
            }
        }).then(res => res.json()).then(data => {

            setContacts(data)
            setModalVisible(true);
            setShowCheckbox(true);

        }

        ).catch(err => console.log(err))


        setModalVisible(true);
        setShowCheckbox(true);
    };


    const handleCloseClick = () => {

        setModalVisible(false);
        setContacts(null)
        setShowCheckbox(false);
        setShowEven(false)
    };





    // useEffect(() => {
    //     if (showEven && contacts) {
    //         const evenContacts = contacts?.results.filter(result => result.id % 2 == 0)

    //         setContacts(evenContacts)



    //     }
    // }, [showEven]);


    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log(searchTerm);
        event.target.reset()
    };


    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={handleModalAClick}>All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={handleModalBClick}>US Contacts</button>
                    <button className="btn btn-lg btn-outline-danger" type="button" onClick={handleCloseClick}>Close</button>
                </div>
                {/* Modal A */}
                {modalVisible && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"></h5>
                                    <button type="button" className="btn-close" onClick={handleCloseClick} aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex flex-column align-items-center">

                                    <form onSubmit={handleSearchSubmit} className="flex items-center w-full mx-auto mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={handleChange}
                                            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="submit"
                                            className="ml-2 button-primary py-2 px-4 rounded"
                                        >
                                            Search
                                        </button>
                                    </form>


                                    {
                                        contacts && contacts?.results.map(contact => {
                                            if (!showEven || showEven && contact.id % 2 == 0)
                                                return 
                                                <div className='text-center'>
                                                    <h6>{contact.country.name}</h6>
                                                    <h5> {contact.phone}</h5>
                                                </div>
                                        }
                                        )
                                    }
                                </div>
                                <div className=" p-2 d-flex justify-content-start gap-2 align-items-center w-full border">
                                    <input onChange={() => setShowEven(!showEven)} type="checkbox" />
show even
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Problem2;