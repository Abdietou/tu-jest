import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";

const User = () => {
  const user = useSelector((state) => state.userReducer);
  return (
    <div className="user-container">
      <div className="user">
        <h3>{!isEmpty(user[0]) && user[0].pseudo}</h3>
        <img src="https://thispersondoesnotexist.com/image" alt="" />
        <p>Age : {!isEmpty(user[0]) && user[0].age} ans</p>
        <p>
          Like{!isEmpty(user[0]) && user[0].length > 1 ? "s" : null} : {""}
          {!isEmpty(user[0]) && user[0].likes}
        </p>
      </div>
    </div>
  );
};

export default User;