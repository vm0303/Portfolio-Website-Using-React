import React, {useEffect, useRef, useState} from 'react';
import './Contact.css';
import Avatar from '../../image/Vishal-Contact.jpg';
import {Fade} from 'react-reveal';
import InputForm from './InputForm';
import {Slide, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

const Contact = ({setMenuOpen}) => {
    const [focused, setFocus] = useState(false);
    const [scrollLimit, setScrollLimit] = useState(2150);
    const [submitting, setSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [reviewButtonDisabled, setReviewButtonDisabled] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };


    const [vals, setVals] = useState({
        user_name: '',
        user_subject: '',
        user_email: '',
        message: '' // Added message field
    });

    const containerReviewRef = useRef(null);
    const contactContainerRef = useRef(null);
    const [reviewActive, setReviewActive] = useState(false);
    const [submitButtonCountdown, setSubmitButtonCountdown] = useState(0); // Countdown state for submit button.
    const [flash, setFlash] = useState(false); // Flash state
    const [inputs, setInputs] = useState([
        {
            id: 1,
            name: 'user_name',
            type: 'text',
            placeholder: 'Enter your name here. ',
            errorMsg: "Please enter a valid first name or a full name with a space that is between 2-50 characters. " +
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
            errorMsg: 'Please enter a valid subject title that can summarize your message here. ' +
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
            errorMsg: 'Please enter a valid email address. This is so I can reply my response back to you.',
            label: "Email",
            required: true,

        },
    ]);
    const [fadeOut, setFadeOut] = useState(false);
    const formRef = useRef();


    const handleReview = async (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setVals(prevVals => ({
            ...prevVals,
            [name]: value,
        }));
    };


    useEffect(() => {
        const handleScroll = () => {
            if (reviewActive) {
                // Check if the user is scrolling beyond the scroll limit
                if (window.pageYOffset < scrollLimit) {
                    // If so, prevent further scrolling
                    window.scrollTo(0, scrollLimit);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollLimit, reviewActive]);

    const handleBackButtonClick = () => {
        // Trigger the fade-out animation by setting reviewActive to false
        setFadeOut(true);
        setSubmitButtonCountdown(3);

        setTimeout(() => {
            setReviewActive(false);
            document.querySelector(".hamburger").style.pointerEvents = "auto";
            document.querySelector(".hamburger").style.opacity = 1;
            document.querySelector('.right').style.pointerEvents = 'auto';
            document.querySelector('.right').style.opacity = 1;
        }, 550); // Adjust the timing as needed to match your CSS animation duration


    };

    // Add a useEffect to reset fadeOut state when reviewActive changes
    useEffect(() => {
        setFadeOut(false); // Reset fadeOut state when reviewActive changes
    }, [reviewActive]);

    const handleReviewButtonClick = () => {
        if (reviewButtonDisabled) {
            toast.info(
                "Test",
                {
                    className: "toast-message",
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    autoClose: 5000,
                    transition: Slide
                });
        } else {
            // Check if all required fields are filled
            const hasEmptyFields = inputs.some(input => {
                return !vals[input.name] && input.required;
            });

            // If there are empty required fields, display errors and prevent opening the review section
            if (hasEmptyFields || !vals.message) {
                // Display errors for empty required fields
                const updatedInputs = inputs.map(input => {
                    if ((!vals[input.name] && input.required) || (!vals.message && input.name === 'message')) {
                        return {...input, error: true};
                    }
                    return input;
                });
                setInputs(updatedInputs);
                return; // Exit early and do not proceed to open the review section
            }

            // Check if email field is valid
            const emailInput = inputs.find(input => input.name === 'user_email');
            if (emailInput) {
                const emailField = document.querySelector(`input[name="${emailInput.name}"]`);
                if (emailField && !emailField.checkValidity()) {
                    // Display error for invalid email format
                    const updatedInputs = inputs.map(input => {
                        if (input.name === 'user_email') {
                            return {...input, error: true};
                        }
                        return input;
                    });
                    setInputs(updatedInputs);
                    return; // Exit early and do not proceed to open the review section
                }
            }

            // Proceed to open the review section if all required fields are filled and email is valid
            if (containerReviewRef.current) {
                containerReviewRef.current.scrollIntoView({behavior: 'smooth'});
            }
            setReviewActive(true);

            // Start the submitButtonCountdown when reviewActive becomes true
            setSubmitButtonCountdown(3);
        }
    }

    useEffect(() => {
        if (containerReviewRef.current && reviewActive) {
            containerReviewRef.current.scrollIntoView({behavior: 'smooth'});
            // Start the submitButtonCountdown when reviewActive becomes true
            setSubmitButtonCountdown(3);
            // Disable the navbar elements
            document.querySelector('.hamburger').style.pointerEvents = 'none';
            document.querySelector('.hamburger').style.opacity = 0.5;
            document.querySelector('.right').style.pointerEvents = 'none';
            document.querySelector('.right').style.opacity = 0.5;
            setMenuOpen(false);
        }
    }, [reviewActive]);
    const handleSubmitButtonClick = () => {
        if (!submitting) {
            setSubmitting(true); // Set submitting state to true
            // Perform any additional actions before submission if needed
            // Simulate submission delay
            setTimeout(() => {
                // Reset states after submission
                setSubmitting(false);
                setSubmitButtonCountdown(0);
                // Close the review section
                setTimeout(() => {
                    setReviewActive(false);
                }, 600)
                // Call the fade out state to fade out the review container
                setFadeOut(true);
                // Disable the form's input fields
                // Can be done by updating the input array to include a "disabled" property
                const updatedInputs = inputs.map(input => ({...input, disabled: true}));
                setInputs(updatedInputs);
                document.querySelector(".review-button").style.opacity = 0.4;
                document.querySelector('.hamburger').style.pointerEvents = 'none';
                document.querySelector('.hamburger').style.opacity = 0.5;
                document.querySelector('.right').style.pointerEvents = 'none';
                document.querySelector('.right').style.opacity = 0.5;
                disableBodyScroll(document.body);
                setReviewButtonDisabled(true);
                setFormSubmitted(true);


                setTimeout(() => {
                    toast.success("Thank you! The form has been submitted successfully. " +
                        "I'll get back to you shortly. " +
                        "Click to close this message.", {
                        className: "toast-message",
                        position: "bottom-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        autoClose: false,
                        transition: Slide,
                        onClose: () => {
                            enableBodyScroll(document.body)
                            document.querySelector(".hamburger").style.pointerEvents = "auto";
                            document.querySelector(".hamburger").style.opacity = 1;
                            document.querySelector('.right').style.pointerEvents = 'auto';
                            document.querySelector('.right').style.opacity = 1;

                        }
                    });
                }, 1200);
            }, 3000); // Adjust the delay as needed

        }
    };

    //Flashing text event to indicate the user can submit the form.
    useEffect(() => {
        // Start the flashing effect when submitButtonCountdown reaches 0
        if (submitButtonCountdown === 0) {
            const interval = setInterval(() => {
                setFlash(prevState => !prevState);
            }, 500);

            // Clear interval after 5 seconds
            setTimeout(() => clearInterval(interval), 5000);
        }
    }, [submitButtonCountdown]);


    useEffect(() => {
        if (submitButtonCountdown > 0) {
            const timer = setTimeout(() => {
                setSubmitButtonCountdown(submitButtonCountdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [submitButtonCountdown]);


    return (
        <div className='container' id="contact">
            <Fade effect="fade" delay={700}>
                <div className="container-bg"></div>
                <div className={`container-wrapper ${formSubmitted ? 'submitted' : ''}`} ref={contactContainerRef}>
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
                            {inputs.map(inputVals => (
                                <InputForm key={inputVals.id} {...inputVals} value={vals[inputVals.name]}
                                           onChange={handleChange} autoCapitalize="none"
                                           disabled={reviewActive}/>
                            ))}
                            <label className="text-area-label">Your message (Max: 500 Characters)</label>
                            <textarea
                                rows="10"
                                maxLength="500"
                                onBlur={handleFocus}
                                focused={focused.toString()}
                                title="Please fill out this field."
                                placeholder="Enter your message here."
                                name="message"
                                required
                                value={vals.message}
                                onChange={handleChange}
                                disabled={reviewActive}
                            />
                            <p className="error-message-textArea">Please enter your message above.
                                Make sure you don't exceed past 500 characters.</p>
                            <button
                                className='review-button'
                                type="submit"
                                onClick={(event) => !reviewActive ? handleReviewButtonClick(event) : null}
                                disabled={reviewActive && submitButtonCountdown > 0} // Disable button when reviewActive and submitButtonCountdown > 0
                            >
                                <p>Review</p>
                            </button>
                        </form>
                        <ToastContainer className="toastMessage"/>
                    </div>
                </div>
            </Fade>
            <div className={`fade-container ${!reviewActive ? 'hidden' : ''}`}>
                {reviewActive && (
                    <div
                        ref={containerReviewRef}
                        className={`container-review ${reviewActive ? 'active' : ''} ${fadeOut ? 'fade-out' : ''}`}
                    >
                        <h2 className="review-title">Review Your Submission</h2>
                        <p className="review-desc">Please review what you typed in the form down below. </p>
                        <p className="review-desc">
                            If you need to make any changes, click or tap the back button.
                        </p>
                        <p className={`review-desc ${submitButtonCountdown === 0 && flash ? 'animate-fade-out' : ''} ${submitButtonCountdown === 0 && !flash ? 'animate-fade-in' : ''}`}>
                            {submitButtonCountdown > 0 ? `Otherwise, please wait ${submitButtonCountdown} seconds before submitting.` : 'You can now submit the form.'}
                        </p>

                        {inputs.map(inputVals => (
                            <div key={inputVals.id} className="review-field">
                                <label className="input-label">{inputVals.label}:</label>
                                <p className="input-value">{vals[inputVals.name]}</p>
                            </div>
                        ))}
                        <div className="review-field">
                            <label className="input-label">Your message:</label>
                            <p className="input-value">{vals.message}</p>
                        </div>
                        <div className="review-form-buttons">
                            <button
                                className="back-button"
                                type="button"
                                onClick={handleBackButtonClick}
                            >
                                <p>Back</p>
                            </button>
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={submitButtonCountdown > 0 || submitting}
                                onClick={handleSubmitButtonClick}
                            >
                                <p>{submitting ? "Submitting..." : (submitButtonCountdown > 0 ? `Wait ${submitButtonCountdown}s` : 'Submit')}</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};


export default Contact;



