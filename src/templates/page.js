import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Layout } from '../components/common';
import { MetaData } from '../components/common/meta';
import Form from "../components/common/Form"

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage;

    const [contactFormState, setContactFormState] = useState({
        status: false,
    });

    const contactFormSubmitHandler = () => {
        console.log('Page form send');
        setContactFormState({
            status: true,
        });
    };

    const contactForm = {
        title: 'Контактная форма из шаблона страницы',
        name: 'PageContactForm',
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
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        <h1 className="content-title">{page.title}</h1>

                        {/* The main page content */}
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                    </article>
                </div>

                {
                    contactFormState.status
                        ? <h3>Спасибо за ваше обращение!</h3>
                        : <Form {...contactForm} />
                }

            </Layout>
        </>
    );
};

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
