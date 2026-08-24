import React, { useState } from "react";
import { 
  Grid, 
  Search, 
  Filter, 
  Eye, 
  Thermometer, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Zap,
  Info
} from "lucide-react";

export default function PVGridVisualizer({ 
  pvBlocks, 
  thermalMode, 
  setThermalMode, 
  onSelectBlock 
}) {
  const [selectedZone, setSelectedZone] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredBlocks = pvBlocks.filter((block) => {
    const matchesZone = selectedZone === "ALL" || block.zoneId === selectedZone;
    const matchesStatus = selectedStatus === "ALL" || block.status === selectedStatus;
    const matchesSearch = 
      block.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.inverterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.zoneName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesZone && matchesStatus && matchesSearch;
  });

  return (
    <div className={`glass-card ${thermalMode ? "thermal-mode" : ""}`} style={{ padding: "1.5rem" }}>
      
      {/* Top Header & Search Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
        
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Grid size={22} color="var(--solar-amber)" />
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#fff" }}>
              PV Array Digital Twin & String Matrix
            </h2>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Interactive real-time telemetry across {pvBlocks.length} photovoltaic string arrays
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
          
          {/* Search Box */}
          <div style={{ position: "relative" }}>
            <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="text" 
              placeholder="Search String ID or Inverter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-card)",
                borderRadius: "10px",
                padding: "0.45rem 0.85rem 0.45rem 2.2rem",
                color: "#fff",
                fontSize: "0.825rem",
                outline: "none",
                width: "220px"
              }}
            />
          </div>

          {/* Zone Selector */}
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-card)",
              borderRadius: "10px",
              padding: "0.45rem 0.85rem",
              color: "#fff",
              fontSize: "0.825rem",
              outline: "none"
            }}
          >
            <option value="ALL" style={{ background: "#0f172a" }}>All Plant Zones</option>
            <option value="ZA" style={{ background: "#0f172a" }}>Zone Alpha (North)</option>
            <option value="ZB" style={{ background: "#0f172a" }}>Zone Beta (East)</option>
            <option value="ZC" style={{ background: "#0f172a" }}>Zone Gamma (West)</option>
            <option value="ZD" style={{ background: "#0f172a" }}>Zone Delta (South)</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-card)",
              borderRadius: "10px",
              padding: "0.45rem 0.85rem",
              color: "#fff",
              fontSize: "0.825rem",
              outline: "none"
            }}
          >
            <option value="ALL" style={{ background: "#0f172a" }}>All Statuses</option>
            <option value="healthy" style={{ background: "#0f172a" }}>🟢 Optimal (Healthy)</option>
            <option value="soiled" style={{ background: "#0f172a" }}>🟡 Soiled (Dust Layer)</option>
            <option value="warning" style={{ background: "#0f172a" }}>🟠 Thermal Hotspot</option>
            <option value="fault" style={{ background: "#0f172a" }}>🔴 Voltage Fault</option>
            <option value="offline" style={{ background: "#0f172a" }}>⚪ Offline</option>
          </select>

          {/* Thermal View Toggle */}
          <button 
            onClick={() => setThermalMode(!thermalMode)}
            className={thermalMode ? "btn-primary" : "btn-secondary"}
            style={{ padding: "0.45rem 0.85rem", fontSize: "0.825rem" }}
          >
            <Eye size={16} />
            <span>{thermalMode ? "IR Ironbow View" : "Optical View"}</span>
          </button>

        </div>

      </div>

      {/* Grid Legend Bar */}
      <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid var(--border-card)",
        borderRadius: "12px",
        padding: "0.6rem 1rem",
        marginBottom: "1.25rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.775rem",
        color: "var(--text-muted)"
      }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "10px", height: "10px", background: "#10b981", borderRadius: "3px" }}></span> Optimal (Eff &gt; 20%)
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "10px", height: "10px", background: "#f59e0b", borderRadius: "3px" }}></span> Soiled Dust Layer (&gt; 30%)
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "10px", height: "10px", background: "#f97316", borderRadius: "3px" }}></span> Thermal Hotspot (&gt; 60°C)
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "10px", height: "10px", background: "#ef4444", borderRadius: "3px" }}></span> Voltage Drop Fault
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "10px", height: "10px", background: "#64748b", borderRadius: "3px" }}></span> Offline / Service
          </span>
        </div>
        <div>
          Showing <span style={{ color: "#fff", fontWeight: "700" }}>{filteredBlocks.length}</span> of {pvBlocks.length} PV Strings
        </div>
      </div>

      {/* PV Strings Grid Container */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
        gap: "0.85rem"
      }}>
        {filteredBlocks.map((block) => {
          let borderColor = "rgba(16, 185, 129, 0.3)";
          let bgGradient = "rgba(16, 185, 129, 0.08)";
          let badgeClass = "badge-healthy";
          let badgeText = "Optimal";

          if (block.status === "soiled") {
            borderColor = "rgba(245, 158, 11, 0.4)";
            bgGradient = "rgba(245, 158, 11, 0.08)";
            badgeClass = "badge-soiled";
            badgeText = `${block.soilIndex}% Soil`;
          } else if (block.status === "warning") {
            borderColor = "rgba(249, 115, 22, 0.5)";
            bgGradient = "rgba(249, 115, 22, 0.12)";
            badgeClass = "badge-warning";
            badgeText = `${block.temperature}°C Hot`;
          } else if (block.status === "fault") {
            borderColor = "rgba(239, 68, 68, 0.6)";
            bgGradient = "rgba(239, 68, 68, 0.15)";
            badgeClass = "badge-fault";
            badgeText = "V-Drop Fault";
          } else if (block.status === "offline") {
            borderColor = "rgba(100, 116, 139, 0.3)";
            bgGradient = "rgba(100, 116, 139, 0.08)";
            badgeClass = "badge-offline";
            badgeText = "Offline";
          }

          return (
            <div 
              key={block.id}
              onClick={() => onSelectBlock(block)}
              className={`pv-tile pv-tile-${block.status}`}
              style={{
                background: bgGradient,
                border: `1px solid ${borderColor}`,
                borderRadius: "14px",
                padding: "0.85rem",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "135px"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              {/* String ID Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="font-mono" style={{ fontWeight: "700", fontSize: "0.875rem", color: "#fff" }}>
                  {block.id}
                </span>
                <span className={`badge ${badgeClass}`} style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                  {badgeText}
                </span>
              </div>

              {/* Middle Metric: Power Output */}
              <div style={{ margin: "0.35rem 0" }}>
                <div className="font-mono" style={{ fontSize: "1.2rem", fontWeight: "800", color: "#fff", lineHeight: "1.1" }}>
                  {block.kwOutput} <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>kW</span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  Inverter: {block.inverterId}
                </div>
              </div>

              {/* Bottom Row Telemetry */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.725rem",
                paddingTop: "0.35rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                color: "var(--text-muted)"
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: "2px", color: block.temperature > 60 ? "#fb923c" : undefined }}>
                  <Thermometer size={12} /> {block.temperature}°C
                </span>
                <span style={{ color: "#34d399", fontWeight: "600" }}>
                  {block.efficiency}% Eff
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
