import React from "react";

class CardTop extends React.Component {
  render() {
    return (
      <>
        <img
          className="pic"
          src="https://www.web-eau.net/images/overrides/profile-image.jpg"
          alt="profile"
        />
        <b>Ricky Park</b>
        <br></br>
        New York<br></br>
        User interface designer and front-end developer - Cat lover<br></br>
        <div className="buttons">
          <button id="msg">Message</button>
          <button id="follow">Following</button>
        </div>
      </>
    );
  }
}

export default CardTop;
