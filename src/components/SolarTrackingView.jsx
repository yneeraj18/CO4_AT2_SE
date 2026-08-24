import React, { useState } from "react";
import { 
  Compass, 
  Sun, 
  Wind, 
  Sparkles, 
  ShieldCheck, 
  Cloud, 
  TrendingUp, 
  Zap, 
  Layers,
  ArrowRight
} from "lucide-react";

export default function SolarTrackingView({ weather, simTime }) {
  const [trackerMode, setTrackerMode] = useState("auto"); // "auto", "stow", "clean"

  // Calculate tilt angle based on tracker mode & time
  let currentTilt = 24.5;
  if (trackerMode === "stow") currentTilt = 0; // flat horizontal 0 degrees
  else if (trackerMode === "clean") currentTilt = 45; // steep 45 degrees
  else {
    // Auto tracking math based on simTime (5 to 19 hrs)
    const hourOffset = simTime - 12; // -7 (morning East) to +7 (evening West)
    currentTilt = Math.min(60, Math.max(-60, hourOffset * 6.5));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Tracker Mode Banner */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Compass size={24} color="var(--solar-amber)" />
              <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#fff" }}>
                Single / Dual-Axis Solar Tracker Controller
              </h2>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Real-time astronomical sun-position calculation & hydraulic tilt motor positioning
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              onClick={() => setTrackerMode("auto")}
              className={trackerMode === "auto" ? "btn-primary" : "btn-secondary"}
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
            >
              <Sun size={16} /> Auto Sun-Track
            </button>

            <button 
              onClick={() => setTrackerMode("stow")}
              className={trackerMode === "stow" ? "btn-primary" : "btn-secondary"}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                background: trackerMode === "stow" ? "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)" : undefined,
                color: trackerMode === "stow" ? "#000" : undefined
              }}
            >
              <Wind size={16} /> Storm Stow (0°)
            </button>

            <button 
              onClick={() => setTrackerMode("clean")}
              className={trackerMode === "clean" ? "btn-primary" : "btn-secondary"}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                background: trackerMode === "clean" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : undefined,
                color: trackerMode === "clean" ? "#000" : undefined
              }}
            >
              <Sparkles size={16} /> Cleaning Tilt (45°)
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Row: Visual SVG Solar Tracker & Astronomical Readout */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.25rem" }}>
        
        {/* Animated Tracker Visualizer */}
        <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          
          <div style={{ width: "100%", textAlign: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Dynamic Solar Angle Visualization
            </span>
            <div className="font-mono" style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--solar-amber)" }}>
              Current Tilt: {currentTilt.toFixed(1)}°
            </div>
          </div>

          {/* SVG Canvas */}
          <div style={{ width: "100%", height: "260px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="340" height="220" viewBox="0 0 340 220">
              
              {/* Sun Arc Path */}
              <path d="M 20 180 A 150 120 0 0 1 320 180" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="4 4" strokeWidth="2" />
              
              {/* Ground line */}
              <line x1="10" y1="180" x2="330" y2="180" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
              <text x="15" y="200" fill="#64748b" fontSize="10" fontFamily="sans-serif">EAST (Sunrise)</text>
              <text x="260" y="200" fill="#64748b" fontSize="10" fontFamily="sans-serif">WEST (Sunset)</text>

              {/* Central Tracker Pedestal Base */}
              <rect x="162" y="140" width="16" height="40" fill="#475569" rx="3" />
              <circle cx="170" cy="140" r="10" fill="#f59e0b" />

              {/* Tilting Solar Panel Grid Group */}
              <g transform={`translate(170, 140) rotate(${currentTilt})`}>
                {/* Panel Frame */}
                <rect x="-90" y="-10" width="180" height="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="4" />
                {/* Panel Blue Cells */}
                <rect x="-86" y="-8" width="38" height="8" fill="#2563eb" rx="1" />
                <rect x="-44" y="-8" width="38" height="8" fill="#2563eb" rx="1" />
                <rect x="-2" y="-8" width="38" height="8" fill="#2563eb" rx="1" />
                <rect x="40" y="-8" width="38" height="8" fill="#2563eb" rx="1" />
              </g>

              {/* Dynamic Sun Icon Positioned along arc based on simTime */}
              {(() => {
                const sunRatio = (simTime - 5) / 14; // 0 at 5am, 1 at 7pm
                const sunX = 20 + sunRatio * 300;
                const sunY = 180 - Math.sin(sunRatio * Math.PI) * 110;
                return (
                  <g transform={`translate(${sunX}, ${sunY})`}>
                    <circle cx="0" cy="0" r="16" fill="#f59e0b" opacity="0.25" />
                    <circle cx="0" cy="0" r="10" fill="#fbbf24" />
                    <line x1="-14" y1="0" x2="14" y2="0" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="0" y1="-14" x2="0" y2="14" stroke="#f59e0b" strokeWidth="2" />
                  </g>
                );
              })()}

            </svg>
          </div>

          <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.5rem" }}>
            {trackerMode === "auto" && "Auto Sun-Tracking mode optimizes beam angle cosine to maximize generation."}
            {trackerMode === "stow" && "Storm Stow flattens panels to 0° to reduce wind drag during gale gusts."}
            {trackerMode === "clean" && "Cleaning mode tilts panels to 45° for gravity dust slide and sweeper alignment."}
          </div>

        </div>

        {/* Astronomical & Meteorological Data Panel */}
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", marginBottom: "1rem" }}>
              Astronomical Ephemeris & Meteorological Telemetry
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Sun Elevation Angle</div>
                  <div className="font-mono" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>{weather.sunElevation}° Above Horizon</div>
                </div>
                <Sun size={24} color="#f59e0b" />
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Sun Azimuth Angle</div>
                  <div className="font-mono" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>{weather.sunAzimuth}° SW</div>
                </div>
                <Compass size={24} color="#06b6d4" />
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Wind Speed Gust Index</div>
                  <div className="font-mono" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#34d399" }}>{weather.windSpeed} km/h (Safe Zone)</div>
                </div>
                <Wind size={24} color="#10b981" />
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Cloud Cover Irradiance Loss</div>
                  <div className="font-mono" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>{weather.cloudCover}% (-{(weather.cloudCover * 0.9).toFixed(1)} W/m²)</div>
                </div>
                <Cloud size={24} color="#94a3b8" />
              </div>

            </div>
          </div>

          <div style={{ marginTop: "1rem", padding: "0.85rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "12px", fontSize: "0.8rem", color: "var(--solar-amber)", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp size={18} />
            <span>Single-Axis Solar Tracking increases daily MWh energy yield by <strong>+24.8%</strong> compared to fixed-tilt mounting.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
