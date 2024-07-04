import React, {useEffect, useRef, useState} from 'react';
import './Contact.css';
import Avatar from '../../image/Contact-img.jpg';
import {Fade} from 'react-reveal';
import InputForm from './InputForm';
import {Slide, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = ({setMenuOpen}) => {
    const [focused, setFocus] = useState(false);
    const [scrollLimit, setScrollLimit] = useState(2150);
    const [submitting, setSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(
        JSON.parse(localStorage.getItem('formSubmitted')) || false // Retrieve from LocalStorage (boolean) or set to false
    );
    const [reviewButtonDisabled, setReviewButtonDisabled] = useState(
        JSON.parse(localStorage.getItem('reviewButtonDisabled')) || false // Retrieve from LocalStorage (boolean) or set to false
    );
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
    const formRef = useRef();
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
                "Avoid using numbers or any special characters that are not typically used in names. " +
                "In addition, make sure you don't start with a whitespace.",
            label: 'Name',
            required: true,
            pattern: "^(?! )(?![\\d])[A-Za-z][A-Za-z\\s]{1,49}$"
        },
        {
            id: 2,
            name: 'user_email',
            type: 'email',
            placeholder: 'Enter your email here.',
            errorMsg: 'Please enter a valid email address. This is so I can reply my response back to you.',
            label: "Email",
            required: true,

        },
        {
            id: 3,
            name: 'user_subject',
            type: 'text',
            placeholder: 'Enter the message subject here.',
            errorMsg: 'Please enter a valid subject title that can summarize your message here. ' +
                'Make sure it is between 2-78 characters, and that it does not start with a special character, ' +
                'or a whitespace.',
            label: 'Subject',
            required: true,
            pattern: "^[! ]?[^\\s](\\s*[^\\s]){1,76}$"
        }
    ]);
    const [fadeOut, setFadeOut] = useState(false);
    const initialTime = 20;
    const [timeRemaining, setTimeRemaining] = useState(
        parseInt(localStorage.getItem('timeRemaining')) || initialTime // Retrieve from LocalStorage or set initial value
    );
    const [startTimer, setStartTimer] = useState(
        JSON.parse(localStorage.getItem('startTimer')) || false
    );

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
            document.querySelector(".review-button").style.opacity = 1;
            document.querySelector(".hamburger").style.pointerEvents = "auto";
            document.querySelector(".hamburger").style.opacity = 1;
            document.querySelector('.right').style.pointerEvents = 'auto';
            document.querySelector('.right').style.opacity = 1;
            document.querySelector('.review-button').style.pointerEvents = 'auto';
        }, 550); // Adjust the timing as needed to match your CSS animation duration


    };

    // Add a useEffect to reset fadeOut state when reviewActive changes
    useEffect(() => {
        setFadeOut(false); // Reset fadeOut state when reviewActive changes
    }, [reviewActive]);

    const handleReviewButtonClick = () => {
        if (reviewButtonDisabled) {
            showToastInfo();
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
                        return {...input, error: "true"};
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
            // This is if the back button has not been clicked at all
            if (containerReviewRef.current) {
                containerReviewRef.current.scrollIntoView({behavior: 'smooth'});
            }
            document.querySelector('.review-button').style.pointerEvents = 'none';
            document.querySelector(".review-button").style.opacity = 0.2;

            setReviewActive(true);

            // Start the submitButtonCountdown when reviewActive becomes true
            setSubmitButtonCountdown(3);
        }
    }

    useEffect(() => {
        if (containerReviewRef.current && reviewActive) {
            containerReviewRef.current.scrollIntoView({behavior: 'smooth'});
            // Start the submitButtonCountdown when reviewActive becomes true
            // Disable the navbar elements
            document.querySelector('.hamburger').style.pointerEvents = 'none';
            document.querySelector('.hamburger').style.opacity = 0.5;
            document.querySelector('.right').style.pointerEvents = 'none';
            document.querySelector('.right').style.opacity = 0.5;
            setMenuOpen(false);
        }
    }, [reviewActive]);

    // This will be used when the toast success message is displayed.
    const newSubmitScroll = () => {
        const newScrollLimit = 2400;
        if (window.pageYOffset < newScrollLimit) {
            window.scrollTo(0, newScrollLimit);
        }
    };
    const handleSubmitButtonClick = () => {

        if (!submitting) {
            document.querySelector(".back-button").style.pointerEvents = "none";
            document.querySelector(".back-button").style.opacity = 0.2;
            setSubmitting(true); // Set submitting state to true
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
                document.querySelector('.hamburger').style.pointerEvents = 'none';
                document.querySelector('.hamburger').style.opacity = 0.5;
                document.querySelector('.right').style.pointerEvents = 'none';
                document.querySelector('.right').style.opacity = 0.5;
                setReviewButtonDisabled(true);
                setFormSubmitted(true);
                setVals({
                    user_name: '',
                    user_subject: '',
                    user_email: '',
                    message: ''
                })


                window.addEventListener('scroll', newSubmitScroll);

                setTimeout(() => {
                    if (contactContainerRef.current) {
                        contactContainerRef.current.scrollIntoView({behavior: 'smooth'});
                    }
                    showToastSuccess();
                }, 1200);
            }, 3000); // Adjust the delay as needed

        }
    };
    const showToastSuccess = () => {
        toast.success("Thank you! Your form has been submitted successfully. " +
            "I'll respond back as soon as I can. Click or tap to close this message.", {
            className: "toast-message",
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            autoClose: false,
            transition: Slide,
            onClose: () => {
                document.querySelector(".hamburger").style.pointerEvents = "auto";
                document.querySelector(".hamburger").style.opacity = 1;
                document.querySelector('.right').style.pointerEvents = 'auto';
                document.querySelector('.right').style.opacity = 1;
                document.querySelector('.review-button').style.pointerEvents = 'auto';
                document.querySelector(".review-button").style.cursor = 'auto';
                document.querySelector(".review-button").style.opacity = 1;
                showToastInfo();
                window.removeEventListener('scroll', newSubmitScroll);
            }
        });
    }

    //Flashing text event to indicate the user can submit the form.
    useEffect(() => {
        // Start the flashing effect when submitButtonCountdown reaches 0
        if (submitButtonCountdown === 0) {
            const interval = setInterval(() => {
                setFlash(prevState => !prevState);
            }, 550);

            // Clear interval after 5 seconds
            setTimeout(() => clearInterval(interval), 7000);
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


    const showToastInfo = () => {
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;
        setStartTimer(true);
        let toastMessage = "";
        if (hours > 0) {
            toastMessage = `please wait ${hours} hour${hours > 1 ? 's' : ''}`;
            if (minutes > 0 || seconds > 0) {
                toastMessage += `, ${minutes} minute${minutes > 1 ? 's' : ''}`;
                if (seconds > 0) {
                    toastMessage += ` and ${seconds} second${seconds > 1 ? 's' : ''}`;
                }
            }
        } else if (minutes > 0) {
            toastMessage = `please wait ${minutes} minute${minutes > 1 ? 's' : ''}`;
            if (seconds > 0) {
                toastMessage += ` and ${seconds} second${seconds > 1 ? 's' : ''}`;
            }
        } else {
            toastMessage = `please wait ${seconds} second${seconds > 1 ? 's' : ''}`;
        }

        toast.info(
            "To help prevent spam, " + toastMessage + " before submitting another form. " +
            "Thank you for you patience! Click or tap to close this message, " +
            "or wait 7 seconds.",
            {
                className: "toast-message",
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                autoClose: 7000,
                transition: Slide
            });

    }
    useEffect(() => {

        localStorage.setItem('timeRemaining', timeRemaining.toString());
        localStorage.setItem('formSubmitted', JSON.stringify(formSubmitted));
        localStorage.setItem('reviewButtonDisabled', JSON.stringify(reviewButtonDisabled));
        localStorage.setItem('startTimer', JSON.stringify(startTimer));
        if (startTimer && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime === 1) {
                        // Enable fields and button when time reaches zero
                        setReviewButtonDisabled(false);
                        setReviewActive(false);
                        setFormSubmitted(false);
                        document.querySelector('.review-button').style.opacity = 1;
                        document.querySelector('.review-button').style.cursor = "auto";
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearTimeout(timer);
        } else if (timeRemaining === 0) {
            // Reset the timer to initial value when it reaches zero
            setTimeRemaining(initialTime);
            setStartTimer(false);

        }
    }, [startTimer, timeRemaining, initialTime, formSubmitted, reviewButtonDisabled]);


    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className='container' id="contact">
            <Fade effect="fade" delay={700}>
                <div className="container-bg"></div>
                <div className="container-wrapper" ref={contactContainerRef}>
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
                                           disabled={reviewActive || formSubmitted}
                                           onClick={closeMenu}

                                />
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
                                onClick={closeMenu}
                                value={vals.message}
                                onChange={handleChange}
                                disabled={reviewActive || formSubmitted}

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
                        <div id="showToastForTextField" aria-live="assertive" style={{display: 'none'}}>
                            {showToastInfo}
                        </div>
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
            <ToastContainer/>
        </div>

    );
};


export default Contact;


