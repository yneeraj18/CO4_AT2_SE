import React from "react";
import { LayoutDashboard, Grid, Bot, Compass, DollarSign, FileText } from "lucide-react";

export default function Navigation({ activeTab, setActiveTab, onOpenReportModal }) {
  const navItems = [
    { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
    { id: "grid", label: "PV Array Digital Twin", icon: Grid },
    { id: "maintenance", label: "AI Maintenance & Robotics", icon: Bot },
    { id: "tracking", label: "Solar Tracking & Forecast", icon: Compass },
    { id: "financial", label: "Financial & Carbon ROI", icon: DollarSign },
  ];

  return (
    <nav style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
      
      {/* Navigation Pills */}
      <div style={{
        background: "rgba(15, 23, 42, 0.8)",
        padding: "0.4rem",
        borderRadius: "14px",
        border: "1px solid var(--border-card)",
        display: "inline-flex",
        flexWrap: "wrap",
        gap: "4px"
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: isActive ? "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%)" : "transparent",
                color: isActive ? "#f59e0b" : "var(--text-muted)",
                border: isActive ? "1px solid rgba(245, 158, 11, 0.4)" : "1px solid transparent",
                padding: "0.6rem 1.1rem",
                borderRadius: "10px",
                fontWeight: isActive ? "600" : "400",
                fontSize: "0.875rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease"
              }}
            >
              <Icon size={16} color={isActive ? "#f59e0b" : "currentColor"} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Export Report CTA */}
      <button 
        onClick={onOpenReportModal}
        className="btn-secondary"
        style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}
      >
        <FileText size={16} color="var(--cyan-sky)" />
        <span>Export Yield Report</span>
      </button>

    </nav>
  );
}
