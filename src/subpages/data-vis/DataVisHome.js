import './DataVisHome.css';

function DataVisHome() {
  return (
    // A new wrapper is added to correctly position the background and content
    <div className="ui-home-page-wrapper">
      {/* The animated background component is placed here */}

      {/* Your original content is now layered on top of the background */}
      <center>
      <div className="ui-home-container">
        <h2>Welcome to My DATA VISUALIZATION (CS 5124) Homepage</h2>
        <div className="about-me-section">
          <h3>About Me - Christian Graber</h3>
          <p>
            Hello! I am an aspiring front end designer and software engineer.
          </p>
          <p>
            More will be added here as the course progresses.
          </p>
        </div>
      </div>
      </center>
    </div>
  );
}

export default DataVisHome;
