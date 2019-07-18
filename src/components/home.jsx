import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getLockStatus, lock } from "../services/lockService.js";
import { switchFaceRecognition } from "../services/recogniseFaceService.js";
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

  async handleLock(isLocked) {
    console.log("lock/unlock request from application");
    let response;
    try {
      response = await lock(isLocked);
    } catch (error) {
      toast.error(
        "Sorry! We are facing some problems. Your lock status may not be correct"
      );
      return;
    }

    if (response.data.isLocked) {
      toast.success("Your door is LOCKED");
    } else {
      toast.warn("Hey!, your door is UNLOCKED");
    }

    this.setState({ isLocked: response.data.isLocked });
  }

  async handleGetStatus() {
    console.log("Connecting with getStatusService");
    let response;
    try {
      response = await getLockStatus();
    } catch (error) {
      toast.error(
        "Sorry! We are facing some problems. Your lock status may not be correct"
      );
      return;
    }

    if (response.status !== 200 || response.data.status !== "success") {
      toast.error(
        "Sorry! We are facing some problems. Your lock status may not be correct"
      );
      console.log("Unsuccess response from getStatusService");
      return;
    }
    console.log(response.data);
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

  async handleToggle(e) {
    const requestForRecognition = e.target.checked;
    const recognitionResponse = await switchFaceRecognition(
      requestForRecognition
    );
    if (recognitionResponse.data.isRecognistionOn) {
      toast.info("Face recognition is ON");
    } else {
      toast.info("Face recognition is OFF");
    }
  }

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
