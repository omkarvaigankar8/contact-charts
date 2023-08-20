import * as React from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import { addContact, editContact } from 'store/features/contact/contactSlice';
import { useAppDispatch } from 'store/app/hooks';
import { Contact } from 'features/Interfaces';
import { Button } from '@material-tailwind/react';

type ContactFormProps = {
    contactEdit: Contact;
    setCreateContact: React.Dispatch<React.SetStateAction<boolean>>
    createContact: Boolean,
    setEditingContactId: React.Dispatch<React.SetStateAction<number | null>>
};
export const ContactForm: React.FC<ContactFormProps> = ({ contactEdit, setCreateContact, createContact, setEditingContactId }: ContactFormProps) => {
    const dispatch = useAppDispatch();

    const initialValues: Contact = contactEdit;

    const actionDispatch = (values: Contact) => {

        if (createContact === true) {
            setCreateContact(false)
            dispatch(addContact(values));
        }
        else {
            dispatch(editContact(values))
            setEditingContactId(null)
        }
    };

    return (

        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                if (!values.id) {
                    values.id = Math.random();
                }
                actionDispatch(values);

                console.log("values", values);
            }}
        >
            <Form className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>

                <div className="sm:col-span-3">
                    <label htmlFor="firstName" className=" block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <div className="mt-2">
                        <Field type="text" name="firstName" id="firstName" className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <div className="mt-2">
                        <Field type="text" name="lastName" id="lastName" className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full gap-7">
                    <div className="flex flex-col w-40 gap-2">
                        <div className="flex items-center gap-x-3">
                            <Field type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" name="status" value="Active" />
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Active</label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <Field type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" name="status" value="UnActive" />
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">UnActive</label>
                        </div>
                    </div>
                    <Button type="submit" className=' w-22'>Save</Button>
                </div>
            </Form>
        </Formik>
    );
}; 
