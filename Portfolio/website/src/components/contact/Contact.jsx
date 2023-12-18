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
    const [timer, setTimer] = useState(10); // Initial timer value in seconds for submit button
    const [isReviewButtonDisabled, setIsReviewButtonDisabled] = useState(false);
    const [countdownTimer, setCountdownTimer] = useState(30);
    useEffect(() => {

        const body = document.body;
        if (showModal) {
            body.classList.add("no-scroll")
            setTimerSubmit(true);
            const interval = setInterval(() => {
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
            body.classList.remove("no-scroll");
            setTimerSubmit(false);
            setTimer(10); // Reset timer when modal is closed
        }
    }, [showModal]);

    useEffect(() => {
        const lastSubmitTime = localStorage.getItem('lastSubmitTime');
        const currentTime = new Date().getTime();
        const elapsedTimeSinceSubmit = (currentTime - lastSubmitTime) / 1000;

        if (elapsedTimeSinceSubmit < 30) {
            setCountdownTimer(-Math.floor(elapsedTimeSinceSubmit));
            setIsReviewButtonDisabled(true);

            const interval = setInterval(() => {
                setCountdownTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        setIsReviewButtonDisabled(false);
                        clearInterval(interval);
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, []); // Run this effect only once on component mount


    const inputs = [
        {
            id: 1,
            name: 'user_name',
            type: 'text',
            placeholder: 'Enter your name here. ',
            errorMsg:
                "Please enter either a valid first name, or a full name with no spaces. Make sure you don't exceed past 50 characters, or use any numbers or special characters that are not typically associated with names. ",
            label: 'Name',
            required: true,
            pattern: "^[a-zA-Z]+[a-zA-Z\\s]*?[^0-9]{1,50}$"
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
            pattern: "^[a-zA-Z0-9]+[a-zA-Z0-9\\s]*[^0-9]{2,78}$"
        },
        {
            id: 3,
            name: 'user_email',
            type: 'email',
            placeholder: 'Enter your email here.',
            errorMsg:
                'Please enter a valid email address. Make sure you are using a valid email domain so that I can reply my response back to you.',
            label: "Email",
            required: true,
        },
    ];

    const formRef = useRef();

    const handleReview = (event) => {
        event.preventDefault();
        const lastSubmitTime = localStorage.getItem('lastSubmitTime');
        const currentTime = new Date().getTime();
        const elapsedTimeSinceSubmit = (currentTime - lastSubmitTime) / 1000;

        if (isReviewButtonDisabled && elapsedTimeSinceSubmit < 30) {
            const remainingTime = Math.ceil(30 - elapsedTimeSinceSubmit);
            const remainingMinutes = Math.floor(remainingTime / 60);
            const remainingSeconds = remainingTime % 60;

            toast(`In order to avoid spam and mass submission, please wait ${remainingMinutes} minutes and ${remainingSeconds} 
            seconds before you can review and submit another form.`, {
                className: 'foo-bar',
            });
            return;
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({behavior: 'smooth'});
            }, 100); // Adjust the delay based on your needs
        }
        setIsReviewButtonDisabled(false);
        setShowModal(true);
        setModalOpen(true);
        setMenuOpen(false);
    };

    const handleReviewSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsClosing(true); // Trigger fade-out animation
            setModalOpen(false);
            setTimeout(() => {
                setShowModal(false);
                setModalOpen(false);
                setIsClosing(false);
                toast('Thanks! Your response has been sent! Please give me some time to respond back to you.', {
                    className: 'foo-bar',
                });
                localStorage.setItem('lastSubmitTime', new Date().getTime());
                setIsReviewButtonDisabled(true);
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
                        <p className="container-desc bolded">Have any questions, comments, or job opportunities for
                            me?</p>
                        <p className="container-desc">Don't hesitate to get in contact with me by filling out the form
                            below!</p>
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
                            <button className={`review-button ${isReviewButtonDisabled ? 'disabled' : ''}`}
                                    type="submit">
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
                                        <button className="back-button" onClick={closeModal} type="button">
                                            <p>Back</p>
                                        </button>
                                        <button type="submit" className="submit-button"
                                                disabled={timerSubmit || isSubmitting} onClick={handleReviewSubmit}>
                                            <p>{isSubmitting ? 'Submitting...' : timerSubmit ? `Wait (${timer}s)` : 'Submit'}</p>
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
