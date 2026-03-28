import React from 'react';
import '../../styles/statsband.css';

export function StatsBand() {
  return (
    <div className="stats-band">
  <div>
    <div className="stat-num">2,500<span >+</span></div>
    <div className="stat-label">Happy Travellers</div>
  </div>
  <div>
    <div className="stat-num">15</div>
    <div className="stat-label">Years Experience</div>
  </div>
  <div>
    <div className="stat-num">36<span >+</span></div>
    <div className="stat-label">Safari Packages</div>
  </div>
  <div>
    <div className="stat-num">4</div>
    <div className="stat-label">Countries Covered</div>
  </div>
  <div>
    <div className="stat-num">98<span >%</span></div>
    <div className="stat-label">5-Star Reviews</div>
  </div>
</div>
  );
}
