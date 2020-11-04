import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ title, name, onSubmit, submitCaption, inputs, netlify }) => {
    const submitHandler = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }
        const form = event.target,
            formData = new FormData(form),
            formattedData = {};

        for (let key of formData.keys()) {
            formattedData[key] = formData.get(key);
        }

        console.log(formattedData);
        console.log(JSON.stringify(formattedData));
        console.log(encodeURIComponent(JSON.stringify(formattedData)));

        const answer = fetch(location.href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeURIComponent(JSON.stringify(formattedData)),
        }).then((res) => {
            console.log('RESPONSE', res);
            return res.json();
        });
        answer
            .then(response => console.log('submitHandler SUCCESS', response))
            .catch(err => console.warn('submitHandler ERROR', err));
    };

    const buildInputsStructure = () => inputs.map(input => (
        <div key={`input-key-${input.name}`} className="form-group">
            {input.label ? <label htmlFor={input.name}>{input.label}</label> : null}
            <input type={input.type ? input.type : 'text'} name={input.name}/>
        </div>
    ));

    return (
        <form name={name} method="POST" data-netlify={netlify ? 'true' : 'false'} data-netlify-honeypot="bot-field"
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
