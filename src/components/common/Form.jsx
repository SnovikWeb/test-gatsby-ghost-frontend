import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'query-string';

const Form = ({ title, name, onSubmit, submitCaption, inputs, netlify }) => {
    const formRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }

        const formData = {};
        Object.keys(formRef.current).map(key => (formData[key] = formRef.current[key].value));

        const axiosOptions = {
            url: location.href,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(formData),
        };

        axios(axiosOptions)
            .then((response) => {
                console.log('success', response);
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    const buildInputsStructure = () => inputs.map(input => (
        <div key={`input-key-${input.name}`} className="form-group">
            {input.label ? <label htmlFor={input.name}>{input.label}</label> : null}
            <input type={input.type ? input.type : 'text'} name={input.name}/>
        </div>
    ));

    return (
        <form ref={formRef} name={name} method="POST" data-netlify={netlify ? 'true' : 'false'}
              data-netlify-honeypot="bot-field"
              onSubmit={submitHandler}>
            {title ? <h3>{title}</h3> : null}
            <input type="hidden" name="form-name" value={name}/>
            {buildInputsStructure()}
            <button type="submit">
                {submitCaption}
            </button>
        </form>
    );
};
export default Form;

Form.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    netlify: PropTypes.bool,
    submitCaption: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        value: PropTypes.string,
    })).isRequired,
};
