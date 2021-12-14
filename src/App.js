import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';
import LanguageIcon from '@material-ui/icons/Language';
export default function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchdata(); // useeffect will call this function onload
  }, []); // empty array [] denotes every function inside useeffect will run once

  const fetchdata = async () => {
    const res = await axios.get(`https://api.github.com/users/google`);
    setUser(res.data);
    //console.log(res.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //without this webpage will refresh
    const res = await axios.get(`https://api.github.com/users/${username}`);
    await setUser(res.data);
    set;
    //console.log('i ran');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <SearchIcon color="primary" id="search-icon" />
        <input
          type="text"
          placeholder="Search Github username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>

      <div className="box">
        <div className="top">
          <img src={user.avatar_url} alt="avatar" />
          <div className="title-content">
            <h2>{user.login}</h2>
            <h4>{user.name}</h4>
            <p>{user.bio || 'no bio'}</p>
          </div>
          <div className="joined">Joined {user.created_at}</div>
        </div>

        <div className="bar">
          <div>
            <p className="bar-title">Repos</p>
            <p className="bar-values">{user.public_repos}</p>
          </div>
          <div>
            <p className="bar-title">Followers</p>
            <p className="bar-values">{user.followers}</p>
          </div>
          <div>
            <p className="bar-title">Following</p>
            <p className="bar-values">{user.following}</p>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-top">
            <div className="location">
              <LocationOnIcon className="footer-icon" />
              {user.location || 'Not available'}
            </div>
            <div className="twitter">
              <TwitterIcon className="footer-icon" />
              {user.twitter_username || 'Not available'}
            </div>
          </div>

          <div className="footer-btm">
            <div className="git">
              <LinkIcon className="footer-icon" />
              <a className="footer-link" href={user.html_url}>
                {user.html_url}
              </a>
            </div>
            <div className="blog">
              <LanguageIcon className="footer-icon" />
              <a className="footer-link" href={user.blog}>
                {user.blog || 'Not Available'}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
