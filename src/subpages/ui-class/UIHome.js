import './UIHome.css';

function UIHome() {
  return (
    // A new wrapper is added to correctly position the background and content
    <div className="ui-home-page-wrapper">
      {/* The animated background component is placed here */}

      {/* Your original content is now layered on top of the background */}
      <div className="ui-home-container">
        <h1>Welcome to My USER INTERFACE I (CS 5167) Homepage</h1>
        <div className="about-me-section">
          <h2>About Me - Christian Graber</h2>
          <p>
            Hello! I am an aspiring front end designer and software engineer.
          </p>
          <p>
            More will be added here as the course progresses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UIHome;
