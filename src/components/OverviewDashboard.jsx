import React from "react";
import { 
  Zap, 
  Sun, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  ShieldAlert,
  Bot
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function OverviewDashboard({ 
  plantInfo, 
  telemetryData, 
  pvBlocks, 
  alerts, 
  robots,
  onNavigateToTab,
  onOpenPanelDetail
}) {
  // Compute health counts
  const total = pvBlocks.length;
  const healthy = pvBlocks.filter(b => b.status === "healthy").length;
  const soiled = pvBlocks.filter(b => b.status === "soiled").length;
  const warning = pvBlocks.filter(b => b.status === "warning").length;
  const fault = pvBlocks.filter(b => b.status === "fault").length;
  const offline = pvBlocks.filter(b => b.status === "offline").length;

  // Total current power output across all blocks
  const currentTotalMW = pvBlocks.reduce((acc, b) => acc + b.kwOutput, 0) / 1000;
  const powerPercentage = ((currentTotalMW / plantInfo.capacityMW) * 100).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* 4 KPI Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
        
        {/* Card 1: Active Generation */}
        <div className="glass-card glass-card-amber" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: "600" }}>
              Active Generation
            </span>
            <div style={{ background: "rgba(245, 158, 11, 0.15)", padding: "0.4rem", borderRadius: "10px" }}>
              <Zap size={20} color="#f59e0b" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", lineHeight: "1.1" }}>
            {currentTotalMW.toFixed(1)} <span style={{ fontSize: "1rem", color: "var(--solar-amber)" }}>MW</span>
          </div>
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Capacity Utilization</span>
            <span className="font-mono" style={{ fontWeight: "700", color: "#f59e0b" }}>{powerPercentage}%</span>
          </div>
          {/* Progress Bar */}
          <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", marginTop: "6px", overflow: "hidden" }}>
            <div style={{ width: `${Math.min(100, Math.max(0, powerPercentage))}%`, height: "100%", background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: "3px" }}></div>
          </div>
        </div>

        {/* Card 2: Today's Yield */}
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: "600" }}>
              Today's Energy Yield
            </span>
            <div style={{ background: "rgba(6, 182, 212, 0.15)", padding: "0.4rem", borderRadius: "10px" }}>
              <Sun size={20} color="#06b6d4" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", lineHeight: "1.1" }}>
            {plantInfo.todayYieldMWh} <span style={{ fontSize: "1rem", color: "#06b6d4" }}>MWh</span>
          </div>
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#34d399" }}>
            <TrendingUp size={14} />
            <span>Target: {plantInfo.expectedYieldMWh} MWh (96% met)</span>
          </div>
        </div>

        {/* Card 3: Performance Ratio */}
        <div className="glass-card glass-card-emerald" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: "600" }}>
              Performance Ratio (PR)
            </span>
            <div style={{ background: "rgba(16, 185, 129, 0.15)", padding: "0.4rem", borderRadius: "10px" }}>
              <TrendingUp size={20} color="#10b981" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: "2rem", fontWeight: "800", color: "#34d399", lineHeight: "1.1" }}>
            {plantInfo.performanceRatioPR}%
          </div>
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Industry Standard Baseline: <span style={{ color: "#fff", fontWeight: "600" }}>82.0%</span>
          </div>
        </div>

        {/* Card 4: Carbon & Revenue */}
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: "600" }}>
              Revenue & Carbon Offset
            </span>
            <div style={{ background: "rgba(168, 85, 247, 0.15)", padding: "0.4rem", borderRadius: "10px" }}>
              <Leaf size={20} color="#a855f7" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff", lineHeight: "1.1" }}>
            ${plantInfo.revenueTodayUSD.toLocaleString()}
          </div>
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#a855f7" }}>
            <Leaf size={14} />
            <span>{plantInfo.co2OffsetTonsToday} Tons CO₂ Avoided</span>
          </div>
        </div>

      </div>

      {/* Main Row: 24h Yield Chart & Array Health Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem" }}>
        
        {/* Telemetry Chart */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>
                Real-Time Telemetry & Yield Forecast
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Solar Irradiance (W/m²) vs Actual Generation vs Target Output (MW)
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#f59e0b" }}>
                <span style={{ width: "8px", height: "8px", background: "#f59e0b", borderRadius: "2px" }}></span> Irradiance
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981" }}>
                <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "2px" }}></span> Actual MW
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#06b6d4" }}>
                <span style={{ width: "8px", height: "8px", background: "#06b6d4", borderRadius: "2px" }}></span> Target MW
              </span>
            </div>
          </div>

          <div style={{ width: "100%", height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="irradianceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ background: "#0f172a", borderColor: "rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                />
                <Area type="monotone" dataKey="irradiance" stroke="#f59e0b" fillOpacity={1} fill="url(#irradianceGrad)" strokeWidth={2} name="Irradiance (W/m²)" />
                <Area type="monotone" dataKey="actualMW" stroke="#10b981" fillOpacity={1} fill="url(#actualGrad)" strokeWidth={3} name="Actual (MW)" />
                <Area type="monotone" dataKey="targetMW" stroke="#06b6d4" strokeDasharray="4 4" fill="none" strokeWidth={2} name="Target (MW)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Array Health Breakdown */}
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff" }}>
                PV Array Health Status
              </h3>
              <button 
                onClick={() => onNavigateToTab("grid")}
                className="btn-secondary"
                style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
              >
                View Grid Matrix <ArrowUpRight size={14} />
              </button>
            </div>

            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Total 48 Inverter Strings across 4 Plant Zones
            </div>

            {/* Health Bars List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              {/* Optimal / Healthy */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.825rem", marginBottom: "4px" }}>
                  <span style={{ color: "#34d399", display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} /> Optimal Generation
                  </span>
                  <span className="font-mono" style={{ fontWeight: "700", color: "#fff" }}>{healthy} / {total}</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                  <div style={{ width: `${(healthy / total) * 100}%`, height: "100%", background: "#10b981", borderRadius: "3px" }}></div>
                </div>
              </div>

              {/* Soiled */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.825rem", marginBottom: "4px" }}>
                  <span style={{ color: "#fbbf24", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Sparkles size={14} /> Soiled (Needs Clean)
                  </span>
                  <span className="font-mono" style={{ fontWeight: "700", color: "#fff" }}>{soiled} / {total}</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                  <div style={{ width: `${(soiled / total) * 100}%`, height: "100%", background: "#f59e0b", borderRadius: "3px" }}></div>
                </div>
              </div>

              {/* Warning Thermal */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.825rem", marginBottom: "4px" }}>
                  <span style={{ color: "#fb923c", display: "flex", alignItems: "center", gap: "6px" }}>
                    <AlertTriangle size={14} /> Thermal Hotspot
                  </span>
                  <span className="font-mono" style={{ fontWeight: "700", color: "#fff" }}>{warning} / {total}</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                  <div style={{ width: `${(warning / total) * 100}%`, height: "100%", background: "#f97316", borderRadius: "3px" }}></div>
                </div>
              </div>

              {/* Fault */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.825rem", marginBottom: "4px" }}>
                  <span style={{ color: "#f87171", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldAlert size={14} /> Voltage Drop Fault
                  </span>
                  <span className="font-mono" style={{ fontWeight: "700", color: "#fff" }}>{fault} / {total}</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                  <div style={{ width: `${(fault / total) * 100}%`, height: "100%", background: "#ef4444", borderRadius: "3px" }}></div>
                </div>
              </div>

              {/* Offline */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.825rem", marginBottom: "4px" }}>
                  <span style={{ color: "#cbd5e1", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Zap size={14} /> Offline / Maintenance
                  </span>
                  <span className="font-mono" style={{ fontWeight: "700", color: "#fff" }}>{offline} / {total}</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                  <div style={{ width: `${(offline / total) * 100}%`, height: "100%", background: "#64748b", borderRadius: "3px" }}></div>
                </div>
              </div>

            </div>
          </div>

          <div style={{
            marginTop: "1.25rem",
            padding: "0.85rem",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "12px",
            border: "1px solid var(--border-card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bot size={20} color="var(--emerald-green)" />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: "600", color: "#fff" }}>Autonomous Fleet</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>4 Cleaning Bots Operational</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToTab("maintenance")}
              className="btn-secondary"
              style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}
            >
              Control Fleet
            </button>
          </div>

        </div>

      </div>

      {/* AI Alert & Quick Dispatch Ticker */}
      <div className="glass-card" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldAlert size={20} color="#fb923c" />
            <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff" }}>
              Real-Time AI Anomaly Diagnostic Feed
            </h3>
          </div>
          <button 
            onClick={() => onNavigateToTab("maintenance")}
            className="btn-secondary"
            style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
          >
            Open Maintenance Center ({alerts.length})
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
          {alerts.slice(0, 3).map((alt) => {
            const block = pvBlocks.find(b => b.id === alt.blockId);
            return (
              <div 
                key={alt.id}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: alt.severity === "critical" ? "1px solid rgba(239, 68, 68, 0.4)" : "1px solid var(--border-card)",
                  borderRadius: "12px",
                  padding: "0.85rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.5rem"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span className={`badge badge-${alt.severity}`}>
                      {alt.severity}
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--cyan-sky)" }}>
                      {alt.blockId} ({alt.zone})
                    </span>
                  </div>
                  <div style={{ fontWeight: "600", fontSize: "0.875rem", color: "#fff" }}>
                    {alt.title}
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    {alt.details}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "0.25rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{alt.timestamp}</span>
                  {block && (
                    <button 
                      onClick={() => onOpenPanelDetail(block)}
                      className="btn-secondary"
                      style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                    >
                      Inspect Diagnostics →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
