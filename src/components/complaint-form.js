import React from 'react';
import { reduxForm, Field } from 'redux-form';

class ComplainForm extends React.Component {
    render() {
        return (
            <div className="complaintForm">
                <h2>Report a problem with your delivery</h2>
                <form>
                    <label htmlFor="trackingNumber">Tracking number</label>
                    <Field component="input" name="trackingNumber"></Field>
                    <label htmlFor="issue">What is your issue></label>
                    <Field component="select" name="issue">
                        <option value="not-delivered">My delivery has not arrived</option>
                        <option value="wrong-item">The wrong item was delivered</option>
                        <option value="missing-part">Part of my order was missing</option>
                        <option value="damaged">My order was damaged</option>
                        <option value="other">Other (give details below)</option>
                    </Field>
                </form>
            </div>
        );
    }
}