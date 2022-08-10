import React from "react";

function Task3() {
  return (
    <div className="task3">
      <h3>SUBSCRIBE</h3>
      <h5>Sigh up with your email adress to receive news and updates.</h5>
      <form>
        <div className="inputs">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Email" />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default Task3;
