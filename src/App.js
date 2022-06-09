import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navigation from "./components/Navigation";
/* import Home from "./components/Home"; */
import React, { useState, useEffect } from "react";
import { useFetch } from "./components/UseFetch";
import Follower from "./components/Follower";

function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, data, page]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index) => {
    setPage(index);
  };
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/home/" element={" "} />
        <Route path="/about/" element={<About />} />
      </Routes>
      <main>
        <div className="section-title">
          <h1>{loading ? "loading..." : "pagination"}</h1>
          <div className="underline"></div>
        </div>
        <section className="followers">
          <div className="container">
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />;
            })}
          </div>
          {!loading && (
            <div className="btn-container">
              <button className="prev-btn" onClick={prevPage}>
                prev
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`page-btn ${
                      index === page ? "active-btn" : null
                    }`}
                    onClick={() => handlePage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button className="next-btn" onClick={nextPage}>
                next
              </button>
            </div>
          )}
        </section>
      </main>
    </Router>
  );
}

export default App;
