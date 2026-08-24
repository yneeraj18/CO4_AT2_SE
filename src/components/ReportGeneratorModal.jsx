import React, { useState } from "react";
import { X, FileText, Download, CheckCircle2, Calendar, ShieldCheck } from "lucide-react";

export default function ReportGeneratorModal({ plantInfo, pvBlocks, onClose }) {
  const [reportType, setReportType] = useState("executive");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCSV = () => {
    // Generate CSV string
    const headers = "String_ID,Zone,Inverter_ID,Status,Power_kW,Voltage_V,Current_A,Temp_C,Soil_Index_Pct,Efficiency_Pct\n";
    const rows = pvBlocks.map(b => 
      `${b.id},"${b.zoneName}",${b.inverterId},${b.status},${b.kwOutput},${b.voc},${b.isc},${b.temperature},${b.soilIndex},${b.efficiency}`
    ).join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `Solar_Farm_${reportType}_Report_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          width: "100%",
          maxWidth: "560px",
          padding: "1.75rem",
          background: "#0d1322",
          border: "1px solid rgba(6, 182, 212, 0.4)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
          borderRadius: "20px"
        }}
      >
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FileText size={22} color="var(--cyan-sky)" />
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#fff" }}>
              Export Yield & Performance Report
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: "0.5rem", borderRadius: "50%" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          
          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Report Document Category</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{
                width: "100%",
                background: "#0f172a",
                border: "1px solid var(--border-card)",
                borderRadius: "10px",
                padding: "0.65rem",
                color: "#fff",
                fontSize: "0.875rem"
              }}
            >
              <option value="executive">📊 Executive Plant Performance Summary (Daily Yield & PR)</option>
              <option value="esg">🌿 Environmental & Carbon Offset Compliance Report</option>
              <option value="maintenance">🤖 AI Anomaly & Robot Cleaning Service Log</option>
              <option value="financial">💰 Grid PPA Tariff Revenue & Feed-in Audit</option>
            </select>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-card)", fontSize: "0.825rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", marginBottom: "8px", fontWeight: "600", color: "#fff" }}>
              <span>Report Details & Metadata</span>
              <span className="font-mono" style={{ color: "var(--solar-amber)" }}>ISO 50001 Certified</span>
            </div>
            <div style={{ color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div>• Station: {plantInfo.name}</div>
              <div>• Data Points: {pvBlocks.length} PV Strings, 24h Telemetry, BESS Status</div>
              <div>• Generated: {new Date().toLocaleString()}</div>
            </div>
          </div>

          {downloadSuccess && (
            <div style={{ padding: "0.75rem", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", borderRadius: "10px", color: "#34d399", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={16} /> Report CSV exported successfully!
            </div>
          )}

        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid var(--border-card)" }}>
          <button onClick={onClose} className="btn-secondary">Close</button>
          <button onClick={handleDownloadCSV} className="btn-emerald">
            <Download size={16} /> Export CSV Spreadsheet
          </button>
        </div>

      </div>
    </div>
  );
}
