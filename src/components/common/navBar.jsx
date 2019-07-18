import React from "react";

const NavBar = ({ isLocked, isRecognitionOn, onToggle, name }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <strong>{name}</strong>
      </a>
      <div>
        <span className="navbar-text face-recognition-box p-0 mr-2">
          <img src={require("../../images/face-recognition-icon.svg")} />
        </span>
        <span className="mr-4">
          <label className="switch">
            <input
              type="checkbox"
              defaultChecked={isRecognitionOn}
              onClick={e => onToggle(e)}
            />
            <span className="slider round" />
          </label>
        </span>
        <i
          className={
            isLocked
              ? "fa fa-lock fa-2x float-right"
              : "fa fa-unlock fa-2x float-right"
          }
          aria-hidden="true"
        />
      </div>
    </nav>
  );
};

export default NavBar;
