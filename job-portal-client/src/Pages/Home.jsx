import Banner from "../components/Banner.jsx";
import Card from "../components/Card.jsx";

import React from "react";
import Jobs from "./Jobs.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import Newsletter from "../components/Newsletter.jsx";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [jobs, setJobs] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;

    React.useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3000/all-jobs").then((res) => res.json()).then((data) => {
            setJobs(data);
            setIsLoading(false);
        });
    }, [])
    const [query, setQuery] = React.useState('');
    const handleInputChange = (event) => {
        setQuery(event.target.value)
    }

    //filter jobs by title
    const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    //-----------------Radio filtering
    const handleChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    // ------------button based filtering
    const handleClick = (event) => {
        setSelectedCategory(event.target.value)
    }

    //calculate the index range
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return {startIndex, endIndex};
    }

    //function for the next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    //function for the previous page
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    //main function
    const filteredDate = (jobs, selected, query) => {
        let filteredJobs = jobs

        //filtering Input Items
        if (query) {
            filteredJobs = filteredItems;
        }

        // category filtering
        if (selected) {
            filteredJobs = filteredJobs.filter(
                ({
                     jobLocation,
                     maxPrice,
                     experienceLevel,
                     salaryType,
                     employmentType,
                     postingDate
                 }) =>
                    jobLocation.toLowerCase() === selected.toLowerCase() ||
                    parseInt(maxPrice) <= parseInt(selected) ||
                    postingDate >= selected ||
                    salaryType.toLowerCase() === selected.toLowerCase() ||
                    experienceLevel.toLowerCase() === selected.toLowerCase() ||
                    employmentType.toLowerCase() === selected.toLowerCase()
            );
            // console.log(filteredJobs);
        }

        //slice the data based on current page
        const {startIndex, endIndex} = calculatePageRange();
        filteredJobs = filteredJobs.slice(startIndex, endIndex);

        return filteredJobs.map((data, i) => <Card key={i} data={data}/>)
    }
    const result = filteredDate(jobs, selectedCategory, query);

    return (
        <div>
            <Banner query={query} handleInputChange={handleInputChange}/>

            {/*main content*/}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                {/*Left side*/}
                <div className="bg-white p-4 rounded">
                    <Sidebar handleChange={handleChange} handleClick={handleClick}/>
                </div>
                {/*Job Cards*/}
                <div className="col-span-2 bg-white p-4 rounded-sm">
                    {isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ?
                        <Jobs result={result}/> : <>
                            <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                            <p>No data found</p>
                        </>

                    }
                    {/*Pagination*/}
                    {
                        result.length > 0 ? (
                            <div className="flex justify-center mt-4 space-x-8">
                                <button onClick={previousPage} className="hover:underline"
                                        disabled={currentPage === 1}>Previous
                                </button>
                                <span
                                    className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                                <button onClick={nextPage} className="hover:underline"
                                        disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>Next
                                </button>
                            </div>
                        ) : ""
                    }


                </div>
                {/*Right side*/}
                <div className="bg-white p-4 rounded"><Newsletter/></div>


            </div>
        </div>
    )
}

export default Home;