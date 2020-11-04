import React from 'react';
import PropTypes from 'prop-types';

const serialize = function (form) {
    const serialized = [];
    for (var i = 0; i < form.elements.length; i++) {
        const field = form.elements[i];
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') {
            continue;
        }
        if (field.type === 'select-multiple') {
            for (var n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) {
                    continue;
                }
                serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[n].value));
            }
        } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
        }
    }
    return serialized.join('&');
};

const ajaxRequest = (url, body) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(body);

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(Promise.reject(JSON.parse(xhr.response)));
                }
            }
        };
    });
};

const Form = ({ title, name, onSubmit, submitCaption, inputs, netlify }) => {
    const submitHandler = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }
        console.log('submitHandler', event);
        const answer = ajaxRequest(event.action, serialize(event.target));
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
