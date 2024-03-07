import React, {useState} from 'react'
import "./InputForm.css"

const InputForm = (props) => {
    const [focused, setFocus] = useState(false);
    const {label, errorMsg, onChange, id, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocus(true);
    }

    return (
        <div className="formInput">
            <label className="input-area-label">{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
            <p className="error-message">{errorMsg}</p>
        </div>
    );
};

export default InputForm;