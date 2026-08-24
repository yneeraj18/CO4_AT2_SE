import React from "react";
import { 
  X, 
  Zap, 
  Thermometer, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Bot, 
  Wrench, 
  RotateCcw,
  Activity,
  Layers,
  Calendar
} from "lucide-react";

export default function PanelDetailModal({ 
  block, 
  onClose, 
  onDispatchRobotClean, 
  onCreateTicket 
}) {
  if (!block) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          width: "100%",
          maxWidth: "680px",
          padding: "1.75rem",
          background: "#0d1322",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
          borderRadius: "20px",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
      >
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 className="font-mono" style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff" }}>
                STRING {block.id}
              </h2>
              <span className={`badge badge-${block.status}`}>
                {block.status.toUpperCase()}
              </span>
            </div>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "2px" }}>
              {block.zoneName} • Inverter: <span className="font-mono" style={{ color: "var(--cyan-sky)" }}>{block.inverterId}</span>
            </p>
          </div>

          <button 
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: "0.5rem", borderRadius: "50%" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 4 Primary Telemetry Gauges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
          
          {/* Power */}
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.75rem", borderRadius: "12px", border: "1px solid var(--border-card)", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Output Power</div>
            <div className="font-mono" style={{ fontSize: "1.25rem", fontWeight: "700", color: "#f59e0b", marginTop: "4px" }}>
              {block.kwOutput} <span style={{ fontSize: "0.75rem" }}>kW</span>
            </div>
          </div>

          {/* Voltage */}
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.75rem", borderRadius: "12px", border: "1px solid var(--border-card)", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>DC Voltage Voc</div>
            <div className="font-mono" style={{ fontSize: "1.25rem", fontWeight: "700", color: block.voc < 1200 ? "#f87171" : "#fff", marginTop: "4px" }}>
              {block.voc} <span style={{ fontSize: "0.75rem" }}>V</span>
            </div>
          </div>

          {/* Current */}
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.75rem", borderRadius: "12px", border: "1px solid var(--border-card)", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>DC Current Isc</div>
            <div className="font-mono" style={{ fontSize: "1.25rem", fontWeight: "700", color: "#fff", marginTop: "4px" }}>
              {block.isc} <span style={{ fontSize: "0.75rem" }}>A</span>
            </div>
          </div>

          {/* Efficiency */}
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.75rem", borderRadius: "12px", border: "1px solid var(--border-card)", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Efficiency PR</div>
            <div className="font-mono" style={{ fontSize: "1.25rem", fontWeight: "700", color: "#34d399", marginTop: "4px" }}>
              {block.efficiency}%
            </div>
          </div>

        </div>

        {/* AI Diagnostics Banner */}
        <div style={{
          background: block.status === "fault" ? "rgba(239, 68, 68, 0.1)" : block.status === "soiled" ? "rgba(245, 158, 11, 0.1)" : "rgba(16, 185, 129, 0.1)",
          border: block.status === "fault" ? "1px solid rgba(239, 68, 68, 0.3)" : block.status === "soiled" ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "14px",
          padding: "1rem",
          marginBottom: "1.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            {block.status === "fault" ? (
              <ShieldAlert size={18} color="#ef4444" />
            ) : block.status === "soiled" ? (
              <Sparkles size={18} color="#f59e0b" />
            ) : (
              <CheckCircle2 size={18} color="#10b981" />
            )}
            <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff" }}>
              AI Automated Diagnostic Analysis
            </h4>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-main)", lineHeight: "1.4" }}>
            {block.status === "soiled" && `Dust accumulation index is currently ${block.soilIndex}%. Transmittance losses are causing a -${(block.soilIndex * 0.12).toFixed(1)}% reduction in conversion efficiency.`}
            {block.status === "warning" && `Thermal camera scan flagged localized hotspot temperature of ${block.temperature}°C (+22°C above array average). Micro-crack shading or cell hotspot suspected.`}
            {block.status === "fault" && `Under-voltage detected (${block.voc}V vs expected 1500V). Inverter DC input bridge or bypass diode string trip suspected.`}
            {block.status === "healthy" && `Photovoltaic string is operating at peak performance ratio (${block.efficiency}%). No shading, tilt misalignment, or thermal degradation detected.`}
            {block.status === "offline" && `Array is currently isolated for manual grid maintenance.`}
          </p>
        </div>

        {/* Detailed Spec List */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem", fontSize: "0.825rem" }}>
          
          <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-card)" }}>
            <div style={{ color: "var(--text-muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <Layers size={14} /> Panel Hardware Specifications
            </div>
            <div style={{ color: "#fff", fontWeight: "600" }}>{block.model}</div>
            <div style={{ color: "var(--text-muted)", marginTop: "4px" }}>
              Total Array Panels: <span style={{ color: "#fff" }}>{block.panelsCount} modules</span>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.85rem", borderRadius: "12px", border: "1px solid var(--border-card)" }}>
            <div style={{ color: "var(--text-muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={14} /> Maintenance & Cleaning Log
            </div>
            <div style={{ color: "#fff", fontWeight: "600" }}>Last Cleaned: {block.lastCleaned}</div>
            <div style={{ color: "var(--text-muted)", marginTop: "4px" }}>
              Single-Axis Tracker Angle: <span style={{ color: "var(--solar-amber)" }}>{block.tiltAngle}° Tilt</span>
            </div>
          </div>

        </div>

        {/* Interactive Action Footer Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "1rem", borderTop: "1px solid var(--border-card)" }}>
          
          {block.status === "soiled" && (
            <button 
              onClick={() => {
                onDispatchRobotClean(block.id);
                onClose();
              }}
              className="btn-emerald"
            >
              <Bot size={16} /> Dispatch SolarBot Sweeper
            </button>
          )}

          <button 
            onClick={() => {
              onCreateTicket(block);
              onClose();
            }}
            className="btn-primary"
          >
            <Wrench size={16} /> Issue Work Order Ticket
          </button>

          <button 
            onClick={() => {
              alert(`Remote Inverter Reset signal dispatched to ${block.inverterId} for string ${block.id}.`);
              onClose();
            }}
            className="btn-secondary"
          >
            <RotateCcw size={16} /> Remote Reset Inverter
          </button>

        </div>

      </div>
    </div>
  );
}
