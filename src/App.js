import React, {Component, useState, useEffect} from "React";

const App = () => {
  //state
  const [news, setNews] =useState([]);
  const[searchQuery, setSearchQuery] =useState('react');
  const [url, setUrl] =useState('https://hn.algolia.com/api/v1/search?query=$react');
  // initially it is set to false so it can be manipulated in the app somewhere
  const [loading, setLoading] = useState(false);

  //fetch news
  const fetchNews = () => {
    //this sets the loading to true
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    //.then(data => console.log(data));
    .then(data=> setNews(data.hits), setLoading(false))
    .catch(error => console.log(error));

  };
  //runs when component mounts and it is changed
  //after modifications it only changes after the button is pressed instead of real time
  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) =>{
    setSearchQuery()
  };

  const handleSubmit = e => {
    e.preventDefault()
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }


  return(
    <div>
      <h2>News</h2>
      {loading ? <h2>Loading...</h2> : ""}
      <form onSubmit={handleSubmit}>
        <input
        type ="text"
        value={searchQuery}
        onChange={handleChange}
        />
      </form>
      {news.map((n,i)=> (
        <p key={i}>{n.title}</p>
      ))}
    </div>
  );
};
