import React from 'react'
import InputField from "../components/InputField.jsx";

const WorkExperience = ({handleChange}) => {

    return (
        <div className="space-y-5">
            <h3 className="text-lg font-medium mb-2">Work Experience</h3>
            <div>
                <label className="sidebar-label-container">
                    <input type="radio" name="test" id="test" value="" onChange={handleChange}/>
                    <span className="checkmark"></span>Any Experience
                </label>
                <InputField handleChange={handleChange} value="Internship" title="Internship" name="test"/>
                <InputField handleChange={handleChange} value="Work Remotely" title="Work Remotely" name="test"/>
            </div>
        </div>
    );
}

export default WorkExperience
