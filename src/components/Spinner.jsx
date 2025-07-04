import React from 'react';
import './Spinner.scss';

const Spinner = ({ text }) => (
    <div className="spinnerContainer">
        <div className="spinner" />
        <p>{text}!...</p>
    </div>
);

export default Spinner;
