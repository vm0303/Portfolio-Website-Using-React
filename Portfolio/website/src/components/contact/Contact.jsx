import React, {useRef, useState, useEffect} from 'react';
import './Contact.css';
import Avatar from '../../image/Vishal-02.jpg';
import {Fade} from 'react-reveal';

import {Slide, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputForm from './InputForm';

const Contact = ({setModalOpen, setMenuOpen}) => {

    const [focused, setFocus] = useState(false);
    const handleFocus = () => {
        setFocus(true);
    };

    const [vals, setVals] = useState({
        user_name: '',
        user_subject: '',
        user_email: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timerSubmit, setTimerSubmit] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [timer, setTimer] = useState(10); // Initial timer value in seconds

    useEffect(() => {
        let interval;
        const body = document.body;
        if (showModal) {
            body.style.overflow = 'hidden';
            setTimerSubmit(true);
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        setTimerSubmit(false);
                        clearInterval(interval);
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        } else {
            body.style.overflow = 'auto';
            setTimerSubmit(false);
            setTimer(10); // Reset timer when modal is closed
        }
    }, [showModal]);

    const inputs = [
        {
            id: 1,
            name: 'user_name',
            type: 'text',
            placeholder: 'Enter your name here. ',
            errorMsg:
                "Please enter either a valid first name, or a full name. Make sure you don't exceed past 50 characters, or use any numbers or special characters that are not typically associated with names. ",
            label: 'Name',
            required: true,
            pattern: '^[A-Za-z\'-. ]{2,50}$',
        },
        {
            id: 2,
            name: 'user_subject',
            type: 'text',
            placeholder: 'Enter the message subject here.',
            errorMsg:
                'Please enter a valid subject that summarizes your message here. Make sure you don\'t exceed past 78 characters.',
            label: 'Subject',
            required: true,
            pattern: '^[a-zA-Z0-9!@#$&()\\-`.+,/" ]{2,78}$',
        },
        {
            id: 3,
            name: 'user_email',
            type: 'email',
            placeholder: 'Enter your email here.',
            errorMsg:
                'Please enter a valid email address. Make sure you are using a valid email domain so that I can reply my response back to you.',
            label: 'Email',
            required: true,
        },
    ];

    const formRef = useRef();

    const handleReview = (event) => {
        event.preventDefault();
        setShowModal(true);
        setModalOpen(true);
        setMenuOpen(false);

    };
    const [coolDown, setCoolDown] = useState(false);
    const handleReviewSubmit = () => {

        if (coolDown) {
            const remainingTime = Math.ceil((coolDown - Date.now()) / 1000 / 60); // Remaining time in minutes
            const message = `Please wait ${remainingTime} minute${remainingTime !== 1 ? 's' : ''} before submitting again.`;

            toast(message, {
                className: 'foo-bar',
            });
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsClosing(true); // Trigger fade-out animation
            setModalOpen(false);
            setTimeout(() => {
                setShowModal(false);
                setModalOpen(false);
                setIsClosing(false);
                toast('Thanks! Your response has been sent! Please give me some time ' +
                    'to respond back to you.', {
                    className: 'foo-bar',
                });
                setCoolDown(true);

                // Set coolDown period
                setTimeout(() => {
                    setCoolDown(false);
                }, 2.7e+6); // Adjust the coolDown duration as needed
            }, 500); // Adjust the delay based on your fade-out animation duration
        }, 2000);

    };


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

    const closeModal = () => {
        localStorage.removeItem('contactFormSubmitted');
        setIsClosing(true); // Trigger fade-out animation
        setModalOpen(false);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
        }, 500); // Adjust the delay based on your fade-out animation duration
    };

    return (
        <Fade effect="fade" delay={700}>
            <div id="contact" className="container">
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
                        <p className="container-desc bolded">
                            Have any questions, comments, or job opportunities for me?
                        </p>
                        <p className="container-desc">
                            Don't hesitate to get in contact with me by filling out the form below!
                        </p>
                        <form ref={formRef} onSubmit={handleReview}>
                            {inputs.map((inputVals) => (
                                <InputForm key={inputVals.id} {...inputVals} value={vals[inputVals.name]}
                                           onChange={handleChange}/>
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
                            <p className="error-message-textArea">Please enter your message above.</p>
                            <button className="review-button" type="submit">
                                <p>Review</p>
                            </button>
                        </form>
                        <ToastContainer position="bottom-right" transition={Slide}/>
                        {/* Display Modal */}
                        {showModal && (
                            <div className={`modal-overlay ${isClosing ? 'fade-out' : ''}`}>
                                <div className={`modal-content ${isClosing ? 'fade-out' : ''}`}>
                                    <h2 className="modal-title">Review Your Submission</h2>
                                    <p className="modal-desc">Please review what you typed in form down below. </p>
                                    <p className="modal-desc">
                                        If you need to make any changes,
                                        click or tap the back button.</p>
                                    <p className="modal-desc">Otherwise, wait 10 seconds before
                                        you can click or tap the submit button. This is to prevent any
                                        accidental submissions.</p>

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
                                        <button className="back-button" onClick={closeModal} type="submit">
                                            <p>Back</p>
                                        </button>
                                        <button className="submit-button" disabled={timerSubmit || isSubmitting}
                                                onClick={handleReviewSubmit}>
                                            <p>
                                                {isSubmitting
                                                    ? 'Submitting...'
                                                    : timerSubmit
                                                        ? `Wait (${timer}s)`
                                                        : 'Submit'}
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </Fade>
    );
};

export default Contact;
