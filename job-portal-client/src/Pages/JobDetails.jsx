import React, {useEffect} from 'react';
import Swal from 'sweetalert2';
import {useParams} from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = React.useState([]);
    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/all-jobs/${id}`)
            .then(res => res.json())
            .then(data => setJob(data));
    })
    const handleApply = async () => {
        const {value: url} = await Swal.fire({
            input:"url",
            inputLabel:"URL address",
            inputPlaceholder:"Enter the URL"
        })
        if (url) {
            Swal.fire(`Entered url ${url}`);
        }
    }

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 PX-4">
            <PageHeader title="Job Details" path={"Job Details"} />
            <h2>Job Details:</h2>
            <h1>{job.jobTitle}</h1>
            <button className="bg-blue px-8 py-2 text-white" onClick={handleApply}>Apply Now</button>
        </div>
    );
};

export default JobDetails;