import React from "react";
import { Form } from "react-bootstrap";

const Options = ({ options, selectedOption, onOptionChange }) => {

    return (
        <div className="options mt-2">
        {options.map((option, index) => (
            <div key={index}>
            <Form.Check
                type="radio"
                name="option"
                value={option}
                label={option}
                onChange={onOptionChange}
                checked={selectedOption === option}
            />
            </div>
        ))}
        </div>
    );
};

export default Options;
