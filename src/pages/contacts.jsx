import React, { useState } from "react";

const ContactsPage = () => {
    const [contactFormState, setContactFormState] = useState({
        status: false,
    });

    const contactFormSubmitHandler = () => {
        setContactFormState({
            status: true,
        });
    };

    return (
        <div>

            {
                contactFormState.status
                    ? <h3>Спасибо за ваше обращение!</h3>
                    : <form onSubmit={contactFormSubmitHandler}
                            action="https://getform.io/f/9cb58ccc-abbd-49b1-aae9-3a8962b2d93e"
                            method="POST">
                        <div className="form-group">
                            <input type="text" name="name" placeholder="name"/>
                        </div>
                        <input type="email" name="email" placeholder="email"/>
                        <textarea type="text" name="message" placeholder="message"/>
                        <button type="submit">Send</button>
                    </form>
            }
        </div>
    );
};
export default ContactsPage;
