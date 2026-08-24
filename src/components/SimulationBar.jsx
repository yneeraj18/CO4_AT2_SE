import React from "react";
import { Sliders, Sun, Cloud, Wind, CloudRain, Sparkles, AlertTriangle, RefreshCw } from "lucide-react";

export default function SimulationBar({ 
  simTime, 
  setSimTime, 
  weatherPreset, 
  setWeatherPreset, 
  onSimulateDust, 
  onInjectFault, 
  onResetSim,
  onCleanAll
}) {
  return (
    <div className="glass-card" style={{ padding: "0.85rem 1.5rem", marginBottom: "1.5rem", background: "rgba(15, 23, 42, 0.9)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sliders size={18} color="var(--solar-amber)" />
          <span style={{ fontWeight: "700", fontSize: "0.9rem", letterSpacing: "0.02em", color: "var(--solar-amber)" }}>
            SOLAR ENVIRONMENT SIMULATOR & CONTROL BAR
          </span>
        </div>

        {/* Time Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "260px" }}>
          <Sun size={18} color="#f59e0b" />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>
              <span>Sun Path Cycle</span>
              <span className="font-mono" style={{ fontWeight: "700", color: "#fff" }}>{simTime}:00 HRS</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="19" 
              value={simTime} 
              onChange={(e) => setSimTime(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--solar-amber)",
                cursor: "pointer"
              }}
            />
          </div>
        </div>

        {/* Weather Presets */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginRight: "4px" }}>Preset:</span>
          
          <button 
            onClick={() => setWeatherPreset("clear")}
            className={weatherPreset === "clear" ? "btn-primary" : "btn-secondary"}
            style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
          >
            <Sun size={14} /> Clear (960W)
          </button>

          <button 
            onClick={() => setWeatherPreset("cloudy")}
            className={weatherPreset === "cloudy" ? "btn-primary" : "btn-secondary"}
            style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
          >
            <Cloud size={14} /> Cloudy (480W)
          </button>

          <button 
            onClick={() => {
              setWeatherPreset("dusty");
              onSimulateDust();
            }}
            className={weatherPreset === "dusty" ? "btn-primary" : "btn-secondary"}
            style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
          >
            <Wind size={14} /> Sandstorm (+Dust)
          </button>

          <button 
            onClick={() => setWeatherPreset("rain")}
            className={weatherPreset === "rain" ? "btn-primary" : "btn-secondary"}
            style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem" }}
          >
            <CloudRain size={14} /> Rain (Wash)
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button 
            onClick={onCleanAll}
            className="btn-emerald"
            style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem" }}
            title="Dispatch Autonomous Cleaning Fleet"
          >
            <Sparkles size={14} /> Dispatch Clean
          </button>

          <button 
            onClick={onInjectFault}
            className="btn-secondary"
            style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", color: "#f87171", borderColor: "rgba(239, 68, 68, 0.4)" }}
            title="Inject string fault for AI testing"
          >
            <AlertTriangle size={14} /> Inject Fault
          </button>

          <button 
            onClick={onResetSim}
            className="btn-secondary"
            style={{ padding: "0.4rem 0.6rem" }}
            title="Reset Simulation to Baseline"
          >
            <RefreshCw size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
