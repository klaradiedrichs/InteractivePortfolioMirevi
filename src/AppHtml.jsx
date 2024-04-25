import React from 'react';

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      videoStarted: false
    };
  }

  handleStartClick = () => {
    // Check if the video has not already started
    if (!this.state.videoStarted) {
      // Start the video
      this.videoRef.current.play();
      // Update state to indicate video has started
      this.setState({ videoStarted: true });
    }
  };

  render() {
    return (
      <div>
        <h2>My Video</h2>
        <video
          ref={this.videoRef}
          className='max-w-[2500px] h-[1000px]'
          loop
        >
          <source src="/videos/test2.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {!this.state.videoStarted && (
          <button onClick={this.handleStartClick}>Start Video</button>
        )}
      </div>
    );
  }
}

export default VideoComponent;
