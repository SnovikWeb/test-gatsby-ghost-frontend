import React, { useState } from 'react';
import Form from '../components/common/Form';
import { Layout } from '../components/common';

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
        name: 'ContactForm',
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

            <form name="Contact Form 7" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="Contact Form" />
                <div>
                    <label>Your Email:</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea name="message" />
                </div>
                <button type="submit">Send</button>
            </form>

        </Layout>
    );
};
export default ContactsPage;
