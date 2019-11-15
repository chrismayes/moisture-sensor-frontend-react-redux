//Import 3rd Party Dependencies
import React from "react";

export default class Loading extends React.Component {
  render() {
    const {flag} = this.props;
    return (
      <div className="loadingPage">
        <div className="centerContent">
					Loading icon
        </div>
        <LoadingText flag={flag} />
      </div>
    )
  }
}

// ## PRIVATE CLASSES ##
class LoadingText extends React.Component {
  render() {
    const {flag} = this.props;
    switch(flag) {
      case "coin":
        return <div className="loadingText">Sending data to the server...</div>
      default:
        return <div className="loadingText">Loading...</div>
    }
  }
}
