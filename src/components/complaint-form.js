import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required, nonEmpty, validLength, allNumbers } from '../validators';

export class ComplaintForm extends React.Component {
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
    form: 'complaint'
})(ComplaintForm);