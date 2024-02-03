import React, { useState } from "react";
import "./GitFinder.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const GitFinder = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "کاربری با این نام وجود ندارد!",
        icon: "error",
        timer: 5000,
      });
    }
    setUsername("");
  };
  return (
    <div className="container main">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="نام را وارد کنید...."
          value={username}
        />
        <button type="submit">جست و جو</button>
      </form>

      {user && (
        <div key={user.id} className="about-user">
          <div className="description">
          <img src={user.avatar_url} alt={user.name} />
            <h3>{user.name}</h3>
            <p>تعداد دنبال کننده ها : {user.followers}</p>
            <p>تداد دنبال شونده ها : {user.following}</p>
            <p>تعداد پروژه ها : {user.public_repos}</p>
            <Link to={user.html_url}>مشاهده پروفایل</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitFinder;
