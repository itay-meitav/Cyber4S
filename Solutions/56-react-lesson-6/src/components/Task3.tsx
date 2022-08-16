import React, { useEffect, useState } from "react";
let values: string[] = [];

function storeInLocal(arr: string[]) {
  localStorage.removeItem("values");
  localStorage.setItem("values", JSON.stringify(arr));
  values = [];
}

function restoreFromLocal() {
  if (localStorage.length > 0) {
    const json: string[] = JSON.parse(localStorage.getItem("values") || "[]");
    values = json;
  } else {
    return;
  }
}

function Task3() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [google, setGoogle] = useState<string>("");
  const [changes, setChanges] = useState<boolean>(false);

  useEffect(() => {
    restoreFromLocal();
    setFirstName(values[0]);
    setLastName(values[1]);
    setTitle(values[2]);
    setEmail(values[3]);
    setBio(values[4]);
    setFacebook(values[5]);
    setTwitter(values[6]);
    setLinkedin(values[7]);
    setGoogle(values[8]);
  }, []);

  useEffect(() => {
    const changed = [
      firstName,
      lastName,
      title,
      email,
      bio,
      facebook,
      twitter,
      linkedin,
      google,
    ].some((x, i) => x != values[i]);
    setChanges(changed);
  }, [
    firstName,
    lastName,
    title,
    email,
    bio,
    facebook,
    twitter,
    linkedin,
    google,
  ]);

  window.addEventListener("unload", () => {
    values = [
      firstName,
      lastName,
      title,
      email,
      bio,
      facebook,
      twitter,
      linkedin,
      google,
    ];
    storeInLocal(values);
  });

  return (
    <>
      <form>
        <b>
          <h4>Basic Info</h4>
        </b>
        <div className="solid" />
        <div className="name">
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input
              required
              value={firstName}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setFirstName(String(val));
              }}
              type="text"
              placeholder="enter your first name"
            />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input
              required
              value={lastName}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setLastName(String(val));
              }}
              type="text"
              placeholder="enter your last name"
            />
          </div>
        </div>
        <label htmlFor="title">Title</label>
        <input
          required
          value={title}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setTitle(String(val));
          }}
          type="text"
          placeholder="enter your title"
        />
        <label htmlFor="email">Email</label>
        <input
          required
          value={email}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setEmail(String(val));
          }}
          type="email"
          placeholder="enter your email"
        />
        <b>
          <h4>About Me</h4>
        </b>
        <div className="solid" />
        <label htmlFor="bio">Biography</label>
        <input
          required
          value={bio}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setBio(String(val));
          }}
          type="text"
          id="bio"
          placeholder="enter your bio"
        />
        <b>
          <h4>External Links</h4>
        </b>
        <div className="solid" />
        <label htmlFor="facebook">Facebook</label>
        <input
          required
          value={facebook}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setFacebook(String(val));
          }}
          type="text"
          placeholder="enter your link"
        />
        <label htmlFor="twitter">Twitter</label>
        <input
          required
          value={twitter}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setTwitter(String(val));
          }}
          type="text"
          placeholder="enter your link"
        />
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          required
          value={linkedin}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setLinkedin(String(val));
          }}
          type="text"
          placeholder="enter your link"
        />
        <label htmlFor="google+">Google+</label>
        <input
          required
          value={google}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setGoogle(String(val));
          }}
          type="text"
          placeholder="enter your link"
        />
        <div className="buttons">
          <button type="reset">Cancel</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location = window.location;
            }}
            type="submit"
            disabled={!changes}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Task3;
