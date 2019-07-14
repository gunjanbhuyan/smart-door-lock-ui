import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getLockStatus } from "../services/lockService.js";
import { getRecognitionStatus } from "../services/recogniseFaceService.js";

class Home extends Component {
  state = {
    isLocked: false,
    isRecognitionOn: false
  };

  componentDidMount() {
    this.handleGetStatus();
  }

  handleLock = isLocked => {
    console.log("lock/unlock request from application");
    if (isLocked) {
      //service call to unlock
      this.setState({ isLocked: false });
      toast.warn("Hey!, your door is UNLOCKED");
    } else {
      //service call to lock
      this.setState({ isLocked: true });
      toast.success("Your door is LOCKED");
    }
  };

  handleGetStatus = () => {
    const lockStatus = getLockStatus();
    console.log("Connecting with getStatusService");

    if (lockStatus.status != "success") {
      toast.error(
        "Sorry! We are facing some problems. Your lock status may not be correct"
      );
      console.log("Unsuccess response from getStatusService");
      return;
    }
    console.log(lockStatus);
    if (lockStatus.isLocked) {
      toast.success("Your door is LOCKED");
    } else {
      toast.warn("Hey!, your door is OPEN");
    }

    this.setState({
      isLocked: lockStatus.isLocked
    });
    console.log("Success response from getStatusService");
  };

  handleToggle = e => {
    console.log(e.target.checked);
    const isFaceRecognitionOn = e.target.checked;
    if (isFaceRecognitionOn) {
      toast.info("Face recognition is ON");
    } else {
      toast.info("Face recognition is OFF");
    }
  };

  render() {
    const { isLocked, isRecognitionOn } = this.state;
    console.log(isLocked);
    return (
      <React.Fragment>
        <ToastContainer />
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <strong>Smart Door Lock</strong>
          </a>
          <div>
            <span className="navbar-text face-recognition-box p-0 mr-2">
              <img src={require("../images/face-recognition-icon.svg")} />
            </span>
            <span className="mr-4">
              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked={isRecognitionOn}
                  onClick={e => this.handleToggle(e)}
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

        <div className="col-md-8 mx-auto mb-4 mt-4">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              title="content"
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mb-2">
          <button
            type="button"
            className="btn btn-secondary col-md-4 mr-2"
            onClick={() => this.handleLock(isLocked)}
          >
            {isLocked ? "Unlock" : "Lock"}
          </button>
          <button
            type="button"
            className="btn btn-secondary col-md-4"
            onClick={() => this.handleGetStatus()}
          >
            Get Status
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
