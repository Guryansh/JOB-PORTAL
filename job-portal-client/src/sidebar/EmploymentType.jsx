import React from 'react'
import InputField from "../components/InputField.jsx";

const WorkExperience = ({handleChange}) => {
    return (
        <div className="space-y-5">
            <h3 className="text-lg font-medium mb-2">Employment Type</h3>
            <div>
                <label className="sidebar-label-container">
                    <input type="radio" name="test" id="test4" value="" onChange={handleChange}/>
                    <span className="checkmark"></span>Any Experience
                </label>
                <InputField handleChange={handleChange} value="full-time" title="Full Time" name="test4"/>
                <InputField handleChange={handleChange} value="part-time" title="Part Time" name="test4"/>
                <InputField handleChange={handleChange} value="temporary" title="Temporary" name="test4"/>
            </div>
        </div>
    );
}

export default WorkExperience
