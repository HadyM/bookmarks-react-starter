// DEPENDENCIES

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { apiURL } from "./util/apiURL";

// PAGES
import Edit from "./Pages/Edit";
import FourOFour from "./Pages/FourOFour";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";

// COMPONENTS
import NavBar from "./Components/NavBar";

// CONFIGURATION
const API_BASE = apiURL();

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  // Should make a post request to add bookmark to 'database'
  // Should update App state with new bookmark
  const addBookmark = (newBookmark) => {
    axios
      .post(`${API_BASE}/bookmarks`, newBookmark)
      .then((response) => {
        setBookmarks([...bookmarks, newBookmark]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const addBookmark = (newBookmark) => {
  //   axios
  //     .post(`${API_BASE}/bookmarks`, newBookmark)
  //     .then((response) => {
  //       return axios.get(`${API_BASE}/bookmarks`);
  //     })
  //     .then((response) => {
  //       setBookmarks(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // This would be better in production level code
  // It would allow the use of multiple users for example

  const deleteBookmark = (index) => {};
  const updateBookmark = (updatedBookmark, index) => {
    axios.put(`${API_BASE}/bookmarks/${index}`, updatedBookmark).then(
      (response) => {
        const updateArray = [...bookmarks];
        updateArray[index] = updatedBookmark;
        setBookmarks(updateArray);
      }, //success
      (err) => {
        console.log(err);
      }, // error
    );
  };

  // Get a list of bookmarks for our application
  //  Kinda like componentDidMount
  useEffect(() => {
    axios.get(`${API_BASE}/bookmarks`).then((response) => {
      const { data } = response;
      setBookmarks(data);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/bookmarks">
              <Index bookmarks={bookmarks} />
            </Route>
            <Route path="/bookmarks/new">
              <New addBookmark={addBookmark} />
            </Route>
            <Route exact path="/bookmarks/:index">
              <Show bookmarks={bookmarks} deleteBookmark={deleteBookmark} />
            </Route>
            <Route path="/bookmarks/:index/edit">
              <Edit bookmarks={bookmarks} updateBookmark={updateBookmark} />
            </Route>
            <Route path="*">
              <FourOFour />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
