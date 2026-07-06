import { Link } from "react-router-dom";
import "./BrowseFrames.css";

const frames = [
  {
    name: "Aviator",
    path: "?shape=aviator",
    svg: (
      <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left lens */}
        <path d="M 15 5 C 30 5 45 10 45 25 C 45 35 35 35 25 35 C 10 35 5 25 5 15 C 5 10 10 5 15 5 Z" stroke="currentColor" strokeWidth="3" />
        {/* Right lens */}
        <path d="M 85 5 C 70 5 55 10 55 25 C 55 35 65 35 75 35 C 90 35 95 25 95 15 C 95 10 90 5 85 5 Z" stroke="currentColor" strokeWidth="3" />
        {/* Bridge */}
        <path d="M 45 12 Q 50 8 55 12" stroke="currentColor" strokeWidth="3" fill="none"/>
        <path d="M 45 18 H 55" stroke="currentColor" strokeWidth="2" />
        {/* Arms */}
        <path d="M 5 15 H 0" stroke="currentColor" strokeWidth="3" />
        <path d="M 95 15 H 100" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  },
  {
    name: "Wayfarer",
    path: "?shape=wayfarer",
    svg: (
      <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left lens */}
        <path d="M 5 10 H 42 L 38 30 C 35 35 15 35 10 30 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
        {/* Right lens */}
        <path d="M 95 10 H 58 L 62 30 C 65 35 85 35 90 30 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
        {/* Bridge */}
        <path d="M 42 15 Q 50 10 58 15" stroke="currentColor" strokeWidth="3" fill="none"/>
        {/* Arms */}
        <path d="M 5 10 H 0" stroke="currentColor" strokeWidth="3" />
        <path d="M 95 10 H 100" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  },
  {
    name: "Round",
    path: "?shape=round",
    svg: (
      <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left lens */}
        <circle cx="25" cy="20" r="15" stroke="currentColor" strokeWidth="3" />
        {/* Right lens */}
        <circle cx="75" cy="20" r="15" stroke="currentColor" strokeWidth="3" />
        {/* Bridge */}
        <path d="M 40 20 Q 50 12 60 20" stroke="currentColor" strokeWidth="3" fill="none"/>
        {/* Arms */}
        <path d="M 10 20 H 0" stroke="currentColor" strokeWidth="3" />
        <path d="M 90 20 H 100" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  },
  {
    name: "Rectangle",
    path: "?shape=rectangle",
    svg: (
      <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left lens */}
        <rect x="5" y="10" width="38" height="20" rx="4" stroke="currentColor" strokeWidth="3" />
        {/* Right lens */}
        <rect x="57" y="10" width="38" height="20" rx="4" stroke="currentColor" strokeWidth="3" />
        {/* Bridge */}
        <path d="M 43 20 H 57" stroke="currentColor" strokeWidth="3" fill="none"/>
        {/* Arms */}
        <path d="M 5 15 H 0" stroke="currentColor" strokeWidth="3" />
        <path d="M 95 15 H 100" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  },
  {
    name: "Hexagon",
    path: "?shape=hexagon",
    svg: (
      <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left lens */}
        <polygon points="15,8 35,8 45,20 35,32 15,32 5,20" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
        {/* Right lens */}
        <polygon points="65,8 85,8 95,20 85,32 65,32 55,20" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
        {/* Bridge */}
        <path d="M 45 20 H 55" stroke="currentColor" strokeWidth="3" fill="none"/>
        {/* Arms */}
        <path d="M 5 20 H 0" stroke="currentColor" strokeWidth="3" />
        <path d="M 95 20 H 100" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  }
];

function BrowseFrames() {
  return (
    <section className="browse-frames-section">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          <span>Select Your Frame Shape</span>
          <span>Select Your Frame Shape</span>
          <span>Select Your Frame Shape</span>
          <span>Select Your Frame Shape</span>
        </div>
        <div className="marquee-content">
          <span>Select Your Frame Shape</span>
          <span>Select Your Frame Shape</span>
          <span>Select Your Frame Shape</span>
          <span>Select Your Frame Shape</span>
        </div>
      </div>
      <div className="container">
        <div className="frames-grid">
          {frames.map((frame, index) => (
            <Link to={`/products${frame.path}`} className="frame-card" key={index}>
              <div className="frame-icon">
                {frame.svg}
              </div>
              <h3 className="frame-name">{frame.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrowseFrames;
