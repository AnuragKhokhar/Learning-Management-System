import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // For getting the authentication state from Redux
import HomePageImage from "../Assets/Images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    const navigate = useNavigate();

    // Get authentication state from Redux (or Context)
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

    const handleExploreCourses = () => {
        if (isAuthenticated) {
            navigate("/courses");  // If the user is authenticated, go to the courses page
        } else {
            navigate("/login");    // Otherwise, redirect to the login page
        }
    };

    return (
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">
                        Find out best
                        <span className="text-yellow-500 font-bold">
                            Online Courses
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>

                    <div className="space-x-6">
                        <button
                            onClick={handleExploreCourses}
                            className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300"
                        >
                            Explore courses
                        </button>

                        <Link to="/contact">
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <img alt="homepage image" src={HomePageImage} />
                </div>
            </div>
        </HomeLayout>
    );
}

export default HomePage;
