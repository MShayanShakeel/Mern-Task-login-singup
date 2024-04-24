import React, { useEffect } from "react";
import "./HomePage.css";

const HomePage = () => {
  // const authToken = localStorage.getItem("token");
  // console.log(authToken);

  // useEffect(() => {
  //   if (!authToken) {
  //     window.location.href = "/signup";
  //   } else {
  //     window.location.href = "/home";
  //   }
  // }, [authToken]);

  useEffect(() => {
    if (!authToken) {
      history.push("/signup");
    } else {
      history.push("/home");
    }
  }, [authToken, history]);

  return (
    <div className="home-page">
      <h1>Welcome to Your Study Website</h1>
      <p>Explore our resources and start learning today!</p>
      <div className="featured-courses">
        {/* Display featured courses here */}
        <h2>Featured Courses</h2>
        <ul>
          <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
          {/* Add more courses as needed */}
        </ul>
      </div>
      <div className="popular-topics">
        {/* Display popular topics or subjects here */}
        <h2>Popular Topics</h2>
        <ul>
          <li>Topic 1</li>
          <li>Topic 2</li>
          <li>Topic 3</li>
          {/* Add more topics as needed */}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
