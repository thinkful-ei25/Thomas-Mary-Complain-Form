import React from 'react';
import { reduxForm, Field, SubmissionError, focus } from 'redux-form';
import { required, nonEmpty, validLength, allNumbers } from '../validators';
import Input from './input';

export class ComplaintForm extends React.Component {
    onSubmit(values) {
        return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                if (
                    res.headers.has('content-type') &&
                    res.headers
                        .get('content-type')
                        .startsWith('application/json')
                ) {
                    // It's a nice JSON error returned by us, so decode it
                    return res.json().then(err => Promise.reject(err));
                }
                // It's a less informative error returned by express
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return;
        })
        .then(() => console.log('Submitted with values', values))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            return Promise.reject(
                new SubmissionError({
                    _error: 'Error submitting message'
                })
            );
        });
    }

    render() {
        return (
            <div className="complaintForm">
                <h2>Report a problem with your delivery</h2>
                <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <Field
                        component={Input}
                        name="trackingNumber"
                        label="Tracking Number"
                        validate={[required, nonEmpty, validLength, allNumbers]}
                        />
                    <Field 
                    component={Input}
                    element="select" 
                    name="issue"
                    label="What is your issue?"
                    validate={[required, nonEmpty]}>
                        <option value="not-delivered">My delivery has not arrived</option>
                        <option value="wrong-item">The wrong item was delivered</option>
                        <option value="missing-part">Part of my order was missing</option>
                        <option value="damaged">My order was damaged</option>
                        <option value="other">Other (give details below)</option>
                    </Field>
                
                    <Field 
                    component={Input}
                    element="textarea" 
                    name="details"
                    label="Please provide more details (optional)"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'complaint',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('contact', Object.keys(errors)[0]))
})(ComplaintForm);