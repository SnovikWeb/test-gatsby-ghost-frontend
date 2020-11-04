import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ title, name, onSubmit, submitCaption, inputs, netlify }) => {
    const submitHandler = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }
        const form = event.target,
            data = new FormData(form);
        console.log('form', form);
        console.log('data', data);
        const answer = fetch(form.action, {
            body: data,
        }).then(r => r.json());
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
        <form name={name} method="POST" data-netlify={netlify} onSubmit={submitHandler}>
            {title ? <h3>{title}</h3> : null}
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
