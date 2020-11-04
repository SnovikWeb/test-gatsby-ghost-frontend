import React, { useState } from 'react';
import Form from '../components/common/Form';
import { Layout } from "../components/common"

const ContactsPage = () => {
    const [contactFormState, setContactFormState] = useState({
        status: false,
    });

    const contactFormSubmitHandler = () => {
        setContactFormState({
            status: true,
        });
    };

    const contactForm = {
        title: 'Контактная форма на странице контактов',
        name: 'ContactPage-ContactForm',
        onSubmit: contactFormSubmitHandler,
        netlify: true,
        submitCaption: 'Отправить',
        inputs: [
            {
                label: 'Имя пользователя',
                name: 'name',
                type: 'text',
                value: '',
            }, {
                label: 'Email',
                name: 'email',
                type: 'email',
                value: '',
            }, {
                label: 'Сообщение',
                name: 'message',
                type: 'message',
                value: '',
            },
        ],
    };

    return (
        <Layout>
            <div>

                {
                    contactFormState.status
                        ? <h3>Спасибо за ваше обращение!</h3>
                        : <Form {...contactForm} />
                }
            </div>
        </Layout>
    );
};
export default ContactsPage;
