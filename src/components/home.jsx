import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getLockStatus } from "../services/lockService.js";
import NavBar from "./common/navBar.jsx";
import Video from "./common/video.jsx";

class Home extends Component {
  state = {
    isLocked: false,
    isRecognitionOn: false
  };

  async componentDidMount() {
    await this.handleGetStatus();
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

  async handleGetStatus() {
    console.log("Connecting with getStatusService");
    const response = await getLockStatus();

    if (response.status != 200 || response.data.status != "success") {
      toast.error(
        "Sorry! We are facing some problems. Your lock status may not be correct"
      );
      console.log("Unsuccess response from getStatusService");
      return;
    }

    const lockStatus = response.data.isLocked;
    if (lockStatus) {
      toast.success("Your door is LOCKED");
    } else {
      toast.warn("Hey!, your door is OPEN");
    }

    this.setState({
      isLocked: lockStatus
    });
    console.log("Success response from getStatusService");
  }

  handleToggle = e => {
    const isFaceRecognitionOn = e.target.checked;
    if (isFaceRecognitionOn) {
      toast.info("Face recognition is ON");
    } else {
      toast.info("Face recognition is OFF");
    }
  };

  render() {
    const { isLocked, isRecognitionOn } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar
          isLocked={isLocked}
          isRecognitionOn={isRecognitionOn}
          onToggle={this.handleToggle}
          name="Smart Door Lock"
        />

        <Video data="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />

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
