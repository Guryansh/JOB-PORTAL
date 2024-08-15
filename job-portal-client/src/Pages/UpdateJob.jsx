import React from 'react';
import {useLoaderData, useParams} from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import {useForm} from "react-hook-form";

const UpdateJob = () => {
    const {id} = useParams();

    const {
        _id,
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        postingDate,
        experienceLevel,
        companyLogo,
        employmentType,
        description,
        postedBy,
        skills
    } = useLoaderData()
    const [selectedOption, setSelectedOption] = React.useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();
    const onSubmit = (data) => {
        data.skills = selectedOption;
        fetch(`http://localhost:3000/update-job/${_id}`, {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((result) => {
                if (result.acknowledged === true) {
                    alert("Job Updated successfully")
                }
                reset()
            });
    };

    const options = [
        {value: "Javascript", label: "Javascript"},
        {value: "C++", label: "C++"},
        {value: "HTML", label: "HTML"},
        {value: "CSS", label: "CSS"},
        {value: "React", label: "React"},
        {value: "Node", label: "Node"},
        {value: "JQuery", label: "JQuery"},
        {value: "MongoDB", label: "MongoDB"},
        {value: "Python", label: "Python"},
        {value: "Redux", label: "Redux"},
    ]

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">

            <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/*{1st row}*/}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Title</label>
                            <input type="text" defaultValue={jobTitle}
                                   placeholder="Job Title" {...register("jobTitle")}
                                   className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Name</label>
                            <input type="text" placeholder="Company Name" defaultValue={companyName} {...register("companyName")}
                                   className="create-job-input"/>
                        </div>

                    </div>
                    {/*{2nd row}*/}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Minimum Salary</label>
                            <input type="text" placeholder="$20k" defaultValue={minPrice} {...register("minPrice")}
                                   className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Maximum Salary</label>
                            <input type="text" placeholder="$100k" defaultValue={maxPrice} {...register("maxPrice")}
                                   className="create-job-input"/>
                        </div>

                    </div>
                    {/*{3rd row}*/}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Salary Type</label>
                            <select {...register("salaryType")} defaultValue={salaryType}
                                    className="create-job-input">

                                <option value="">Choose your salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Location</label>
                            <input type="text" placeholder="Ex: New York" defaultValue={jobLocation} {...register("jobLocation")}
                                   className="create-job-input"/>
                        </div>
                    </div>
                    {/*{4th row}*/}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Posting Date</label>
                            <input type="date" placeholder="Ex: 2023-10-28" defaultValue={postingDate} {...register("postingDate")}
                                   className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Experience Level</label>
                            <select {...register("experienceLevel")} defaultValue={experienceLevel}
                                    className="create-job-input">

                                <option value="">Choose your experience level</option>
                                <option value="NoExperience">No Experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                        </div>

                    </div>
                    {/*{5th row}*/}
                    <div>
                        <label className="block mb-2 text-lg">Required Skill Sets:</label>
                        <CreatableSelect className="create-job-input py-4" defaultValue={skills}
                                         onChange={setSelectedOption} options={options} isMulti/>
                    </div>
                    {/*{6th row}*/}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company logo</label>
                            <input type="url" defaultValue={companyLogo}
                                   placeholder="Paste your company logo URL: https://google.com" {...register("companyLogo")}
                                   className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Employment Type</label>
                            <select {...register("experienceType")} defaultValue={employmentType} {...register("employmentType")}
                                    className="create-job-input">

                                <option value="">Choose your experience level</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>

                    </div>
                    {/*{6th row}*/}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Description</label>
                        <textarea
                            className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700" {...register("jobDescription")}
                            rows={6} placeholder="Job Description"
                            defaultValue={description}/>
                    </div>
                    {/*{7th row}*/}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Posted By</label>
                        <input type="email" defaultValue={postedBy} {...register("postedBy")} className="create-job-input"
                               placeholder="Your email"/>
                    </div>
                    <input type="submit"
                           className="block mt-12 bg-blue text-white font-semibold px-8 py-2 roundeed-sm cursor-pointer"/>
                </form>
            </div>

        </div>
    );
};

export default UpdateJob;