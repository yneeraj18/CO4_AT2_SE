import React from "react";
import { 
  Sun, 
  Zap, 
  Activity, 
  Thermometer, 
  Wind, 
  Eye, 
  Bell, 
  ShieldCheck, 
  Radio
} from "lucide-react";

export default function Header({ 
  plantInfo, 
  weather, 
  thermalMode, 
  setThermalMode, 
  alertCount, 
  onOpenNotifications 
}) {
  return (
    <header className="glass-card" style={{ borderRadius: "0 0 20px 20px", padding: "1rem 1.75rem", marginBottom: "1.25rem", borderTop: "none" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        
        {/* Plant Branding & Live Frequency */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px rgba(245, 158, 11, 0.2)"
          }}>
            <Sun size={26} color="#f59e0b" className="animate-spin-slow" />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h1 style={{ fontSize: "1.35rem", fontWeight: "700", letterSpacing: "-0.02em", color: "#fff" }}>
                {plantInfo.name}
              </h1>
              <span className="badge badge-healthy">
                <span className="pulse-dot" style={{ color: "#34d399" }}></span> LIVE
              </span>
            </div>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>{plantInfo.location}</span>
              <span>•</span>
              <span className="font-mono" style={{ color: "var(--cyan-sky)" }}>
                <Zap size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "2px" }} />
                {plantInfo.substationVoltage}
              </span>
            </p>
          </div>
        </div>

        {/* Live Weather & Telemetry Quick Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
          
          {/* Irradiance */}
          <div style={{
            background: "rgba(255, 255, 255, 0.04)",
            padding: "0.5rem 0.85rem",
            borderRadius: "12px",
            border: "1px solid var(--border-card)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Sun size={18} color="#f59e0b" />
            <div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Solar Irradiance</div>
              <div className="font-mono" style={{ fontWeight: "700", color: "#f8fafc", fontSize: "0.95rem" }}>
                {weather.irradiance} <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>W/m²</span>
              </div>
            </div>
          </div>

          {/* Ambient / Panel Temp */}
          <div style={{
            background: "rgba(255, 255, 255, 0.04)",
            padding: "0.5rem 0.85rem",
            borderRadius: "12px",
            border: "1px solid var(--border-card)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Thermometer size={18} color="#06b6d4" />
            <div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ambient / Panel</div>
              <div className="font-mono" style={{ fontWeight: "700", color: "#f8fafc", fontSize: "0.95rem" }}>
                {weather.ambientTemp}°C / <span style={{ color: "#fb923c" }}>{weather.panelTemp}°C</span>
              </div>
            </div>
          </div>

          {/* Grid Freq */}
          <div style={{
            background: "rgba(16, 185, 129, 0.08)",
            padding: "0.5rem 0.85rem",
            borderRadius: "12px",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Radio size={18} color="#10b981" />
            <div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Grid Frequency</div>
              <div className="font-mono" style={{ fontWeight: "700", color: "#34d399", fontSize: "0.95rem" }}>
                50.02 Hz
              </div>
            </div>
          </div>

          {/* Thermal View Toggle */}
          <button 
            onClick={() => setThermalMode(!thermalMode)}
            className={thermalMode ? "btn-primary" : "btn-secondary"}
            style={{
              borderColor: thermalMode ? "var(--solar-amber)" : undefined,
              boxShadow: thermalMode ? "0 0 15px rgba(245, 158, 11, 0.4)" : undefined
            }}
            title="Toggle Infrared Thermal Imaging Camera Filter"
          >
            <Eye size={18} />
            <span>{thermalMode ? "Thermal IR Active" : "Normal Vision"}</span>
          </button>

          {/* Notifications Alert Bell */}
          <button 
            onClick={onOpenNotifications}
            className="btn-secondary"
            style={{ position: "relative", padding: "0.6rem" }}
            title="View Diagnostic AI Alerts"
          >
            <Bell size={20} color={alertCount > 0 ? "#fb923c" : "#94a3b8"} />
            {alertCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "#ef4444",
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: "700",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(239, 68, 68, 0.6)"
              }}>
                {alertCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
