import React from 'react'
import InputField from "../components/InputField.jsx";
import Button from "./Button.jsx";

const JobPostingData = ({handleChange}) => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    console.log(now, sevenDaysAgo);
    //convert date to string
    const twentyFourHoursAgoDate=twentyFourHoursAgo.toISOString().slice(0, 10);
    const sevenDaysAgoDate=sevenDaysAgo.toISOString().slice(0, 10);
    const thirtyDaysAgoDate=thirtyDaysAgo.toISOString().slice(0, 10);
    console.log(twentyFourHoursAgoDate);
    return (
        <div className="space-y-5">
            <h3 className="text-lg font-medium mb-2">Date of Posting</h3>
            <div>
                <label className="sidebar-label-container">
                    <input type="radio" name="test" id="test3" value="" onChange={handleChange}/>
                    <span className="checkmark"></span>All time
                </label>
                <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title="Last 24 hours" name="test3"/>
                <InputField handleChange={handleChange} value={sevenDaysAgoDate} title="Last 7 days" name="test3"/>
                <InputField handleChange={handleChange} value={thirtyDaysAgoDate} title="Last month" name="test3"/>
            </div>
        </div>
    );
}

export default JobPostingData

