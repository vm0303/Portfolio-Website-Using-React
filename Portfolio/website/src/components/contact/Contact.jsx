import React, {useRef, useState, useEffect} from 'react';
import './Contact.css';
import Avatar from '../../image/Vishal-Contact.jpg';
import {Fade} from 'react-reveal';
import InputForm from './InputForm';
import {Slide, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = ({setMenuOpen}) => {
    const [focused, setFocus] = useState(false);
    const [scrollLimit, setScrollLimit] = useState(2150);
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
        message: '' // Added message field
    });

    const containerReviewRef = useRef(null);
    const contactContainerRef = useRef(null);
    const [reviewActive, setReviewActive] = useState(false);

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

    const formRef = useRef();

    const handleReview = async (event) => {
        event.preventDefault();
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setVals(prevVals => ({
            ...prevVals,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (containerReviewRef.current && reviewActive) {
            containerReviewRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [reviewActive]);

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
        // Scroll to the "contact" element
        if (contactContainerRef.current) {
            contactContainerRef.current.scrollIntoView({behavior: 'smooth'});
        }
        // Trigger the fade-out animation by setting reviewActive to false
        setReviewActive(false);
    };

    const handleReviewButtonClick = () => {
        // Check if all required fields are filled
        const hasEmptyFields = inputs.some(input => {
            return !vals[input.name] && input.required;
        });

        // If there are empty required fields, display errors and prevent opening the review section
        if (hasEmptyFields) {
            // Display errors for empty required fields
            const updatedInputs = inputs.map(input => {
                if (!vals[input.name] && input.required) {
                    return {...input, error: true};
                }
                return input;
            });
            setInputs(updatedInputs);
            return; // Exit early, do not proceed to opening the review section
        }

        // Proceed to open the review section if all required fields are filled
        if (containerReviewRef.current) {
            containerReviewRef.current.scrollIntoView({behavior: 'smooth'});
        }
        setReviewActive(true);
    };

    return (
        <Fade effect="fade" delay={700}>
            <div className='container' id="contact">
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
                                           onClick={handleInputClick} disabled={reviewActive}/>
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
                                onClick={handleReviewButtonClick}
                            >
                                <p>Review</p>
                            </button>
                        </form>

                        <ToastContainer position="bottom-right" transition={Slide}/>
                    </div>
                </div>
                <div
                    ref={containerReviewRef}
                    className={`container-review ${reviewActive ? 'active' : ''}`}
                >
                    <h2 className="review-title">Review Your Submission</h2>
                    <p className="review-desc">Please review what you typed in the form down below. </p>
                    <p className="review-desc">
                        If you need to make any changes, click or tap the back button.
                    </p>
                    <p className="review-desc">
                        Otherwise, wait 10 seconds before you can click or tap the submit button. This
                        is to prevent any
                        accidental submissions.
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
