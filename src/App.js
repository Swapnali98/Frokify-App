import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./component/Recipe";
import Alert from "./component/Alert";
import './App.css';



const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");


  const APP_ID = "161692a6";

  const APP_KEY = "d63cfa597d403d05abf5f04f2cf6712b";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== " ") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    }
    else {
      setAlert('please fill the form');
    }

  };

  const onChange = (e) => {
    setQuery(e.target.value);

  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();

  };


  return (
    <div>
      <div className="App"></div>

      <h1 onClick={getData}>frokify app</h1>
      <form className="search-form" onSubmit={onSubmit} >
        {alert !== "" && <Alert alert={alert} />}
        <input type="text" placeholder="search for receipes" autoComplete="off" onChange={onChange} value={query} />
        <input type="submit" value="search" />
      </form>

      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>

    </div >
  );
}

export default App;
