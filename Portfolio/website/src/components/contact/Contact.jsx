import React, {useRef, useState, useEffect} from 'react';
import './Contact.css';
import Avatar from '../../image/Vishal-Contact.jpg';
import {Fade} from 'react-reveal';


import {Slide, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputForm from './InputForm';

const Contact = ({setMenuOpen}) => {

    const [focused, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);

    };
    const handleInputClick = () => {
        setMenuOpen(false);
    };


    const [vals, setVals] = useState({
        user_name: '',
        user_subject: '',
        user_email: '',
    });


    const inputs = [
        {
            id: 1,
            name: 'user_name',
            type: 'text',
            placeholder: 'Enter your name here. ',
            errorMsg:
                "Please enter a valid first name or a full name with a space that is between 2-50 characters. " +
                "Avoid using numbers or any special characters that are not typically used in names." +
                "In addition, make sure you don't start with a whitespace.",
            label: 'Name',
            required: true,
            pattern: "^(?! )(?![\\d])[A-Za-z][A-Za-z\\s]{1,49}$"
        },
        {
            id: 2,
            name: 'user_subject',
            type: 'text',
            placeholder: 'Enter the message subject here.',
            errorMsg:
                'Please enter a valid subject title that can summarize your message here. ' +
                'Make sure it is between 2-78 characters, and that it does not start with a special character, ' +
                'or a whitespace.',
            label: 'Subject',
            required: true,
            pattern: "^[! ]?[^\\s](\\s*[^\\s]){1,76}$"
        },
        {
            id: 3,
            name: 'user_email',
            type: 'email',
            placeholder: 'Enter your email here.',
            errorMsg:
                'Please enter a valid email address. This is so I can reply my response back to you.',
            label: "Email",
            required: true,
        },
    ];

    const formRef = useRef();

    /*The code below handles the logic when the modal is open*/


    const handleReview = async (event) => {
        event.preventDefault();

    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        // Handle message separately
        if (name === 'message') {
            setVals((prevVals) => ({
                ...prevVals,
                [name]: value,
            }));
        } else {
            setVals((prevVals) => ({
                ...prevVals,
                [name]: value,
            }));
        }
    };

    return (
        <Fade effect="fade" delay={700}>
            <div className='container fade-out' id="contact">
                <div className="container-bg"></div>
                <div className="container-wrapper">
                    <div className="container-left">
                        <h1 className="container-title">Feel free to contact me!</h1>
                        <div className="container-info">
                            <div className="container-info-image">
                                <img src={Avatar} alt="An image of me" className="container-image"/>
                            </div>
                        </div>
                    </div>
                    <div className="container-right">
                        <p className="container-desc bolded">Have any questions, comments, or job opportunities for
                            me?</p>
                        <p className="container-desc">Don't hesitate to get in contact with me by filling out the
                            form
                            below!</p>
                        <form ref={formRef} onSubmit={handleReview}>
                            {inputs.map((inputVals) => (
                                <InputForm key={inputVals.id} {...inputVals} value={vals[inputVals.name]}
                                           onChange={handleChange} autoCapitalize="none"
                                           onClick={handleInputClick}/>
                            ))}
                            <label className="text-area-label">Your message</label>
                            <textarea
                                rows="10"
                                maxLength="480"
                                onBlur={handleFocus}
                                focused={focused.toString()}
                                title="Please fill out this field."
                                placeholder="Enter your message here."
                                name="message"
                                required
                                value={vals.message}
                                onChange={handleChange}
                            />
                            <p className="error-message-textArea">Please enter your message above.
                                Make sure you don't exceed past 480 characters.</p>
                            <button className='review-button'
                                    type="submit">
                                <p>Review</p>
                            </button>
                        </form>
                        <ToastContainer position="bottom-right" transition={Slide}/>
                    </div>
                </div>
                <div className='container-review fade-in'>
                    <h2 className="modal-title">Review Your Submission</h2>
                    <p className="modal-desc">Please review what you typed in the form down below. </p>
                    <p className="modal-desc">
                        If you need to make any changes, click or tap the back button.
                    </p>
                    <p className="modal-desc">
                        Otherwise, wait 10 seconds before you can click or tap the submit button. This
                        is to prevent any
                        accidental submissions.
                    </p>

                    {inputs.map((inputVals) => (
                        <div key={inputVals.id} className="review-field">
                            <label className="input-label">{inputVals.label}:</label>
                            <p className="input-value">{vals[inputVals.name]}</p>
                        </div>
                    ))}
                    <div className="review-field">
                        <label className="input-label">Your message:</label>
                        <p className="input-value">{vals.message}</p>
                    </div>
                    <div className="modal-buttons">
                        <button className="back-button" type="button">
                            <p>Back</p>
                        </button>
                        <button type="submit" className="submit-button">
                            <p>Submit</p>
                        </button>
                    </div>
                </div>
            </div>
        </Fade>
    );
};
export default Contact;
