import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/app/hooks';
import { Contact } from 'features/Interfaces';
import { ContactForm } from 'features/Forms/ContactForm';
import { deleteContact } from 'store/features/contact/contactSlice';
import { Button } from '@material-tailwind/react';

const ContactPage = () => {
    const allContacts = useAppSelector((state) => state.contact.contacts);
    const dispatch = useAppDispatch();
    const [editingContactId, setEditingContactId] = useState<number | null>(null);
    const [createContact, setCreateContact] = useState<boolean>(false);

    const toggleEdit = (contactId: number) => {
        setEditingContactId(contactId === editingContactId ? null : contactId);
    };
    const handleDelete = (contactId: number) => {
        dispatch(deleteContact(contactId));
    };
    return (
        <div className="flex flex-col gap-5 items-center">
            <h1 className='text-3xl font-bold underline text-red-600'>Contacts</h1>


            <Button onClick={() => {
                setCreateContact(true);
            }}>Create a Contact</Button>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-5'>
                {!createContact && allContacts?.map((contact: Contact) => (
                    <div className=" w-80 border-2 p-4 border-black shadow-2xl" key={contact.id}>
                        <h3><span className=' font-semibold'>First Name:</span> {contact.firstName}</h3>
                        <h3><span className=' font-semibold'>Last Name:</span> {contact.lastName}</h3>
                        <p><span className=' font-semibold'>Status:</span> {contact.status}</p>
                        <div className="flex justify-start items-center gap-2 mt-3">
                            <Button onClick={() => toggleEdit(contact.id)}>
                                {editingContactId === contact.id ? "Cancel Edit" : "Edit"}
                            </Button>
                            <Button onClick={() => handleDelete(contact.id)}>Delete</Button>
                        </div>
                        {editingContactId === contact.id && (
                            <ContactForm contactEdit={contact} setCreateContact={setCreateContact} createContact={createContact} setEditingContactId={setEditingContactId} />
                        )}
                    </div>
                ))}
                {createContact && (
                    <ContactForm contactEdit={{ id: 0, firstName: '', lastName: '', status: 'Active' }} setCreateContact={setCreateContact} createContact={createContact} setEditingContactId={setEditingContactId} />
                )}
            </div>
        </div>
    );
}

export default ContactPage;