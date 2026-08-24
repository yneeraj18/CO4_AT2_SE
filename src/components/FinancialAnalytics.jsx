import React from "react";
import { 
  DollarSign, 
  Leaf, 
  TrendingUp, 
  Award, 
  BatteryCharging, 
  Home, 
  Car, 
  TreePine,
  Download,
  CheckCircle2,
  PieChart
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Line
} from "recharts";

export default function FinancialAnalytics({ plantInfo, monthlyData, onOpenReportModal }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Financial Banner Header */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarSign size={24} color="var(--emerald-green)" />
              <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#fff" }}>
                Financial Revenue, Grid PPA & Environmental ROI
              </h2>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Power Purchase Agreement (PPA) Tariff: <span className="font-mono" style={{ color: "#34d399", fontWeight: "700" }}>${plantInfo.ppaTariffUSD} / kWh</span>
            </p>
          </div>

          <button 
            onClick={onOpenReportModal}
            className="btn-emerald"
          >
            <Download size={16} /> Export Financial & ESG Report
          </button>
        </div>
      </div>

      {/* 4 Environmental Impact Counters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        
        {/* Revenue */}
        <div className="glass-card glass-card-emerald" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "600" }}>Today's Revenue</span>
            <DollarSign size={20} color="#10b981" />
          </div>
          <div className="font-mono" style={{ fontSize: "1.8rem", fontWeight: "800", color: "#34d399" }}>
            ${plantInfo.revenueTodayUSD.toLocaleString()}
          </div>
          <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Projected Monthly: <span style={{ color: "#fff", fontWeight: "600" }}>$1.18M USD</span>
          </div>
        </div>

        {/* Trees Saved */}
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "600" }}>Trees Planted Equiv.</span>
            <TreePine size={20} color="#10b981" />
          </div>
          <div className="font-mono" style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff" }}>
            24,425 <span style={{ fontSize: "0.9rem", color: "var(--emerald-green)" }}>Trees</span>
          </div>
          <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Annual offset equivalent
          </div>
        </div>

        {/* Homes Powered */}
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "600" }}>Households Powered</span>
            <Home size={20} color="#06b6d4" />
          </div>
          <div className="font-mono" style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff" }}>
            48,800 <span style={{ fontSize: "0.9rem", color: "#06b6d4" }}>Homes</span>
          </div>
          <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Clean energy grid supply
          </div>
        </div>

        {/* EV Miles Saved */}
        <div className="glass-card" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "600" }}>Gas Miles Avoided</span>
            <Car size={20} color="#a855f7" />
          </div>
          <div className="font-mono" style={{ fontSize: "1.8rem", fontWeight: "800", color: "#fff" }}>
            1.22M <span style={{ fontSize: "0.9rem", color: "#a855f7" }}>Miles</span>
          </div>
          <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Zero-emission transport offset
          </div>
        </div>

      </div>

      {/* Monthly Financial Yield Chart & Battery BESS Storage */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem" }}>
        
        {/* Monthly Chart */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>
                Historical Monthly Generation & Revenue Trends
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Monthly Energy Yield (MWh) vs Revenue ($ USD)
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ background: "#0f172a", borderColor: "rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                />
                <Bar dataKey="yieldMWh" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Yield (MWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial ROI & Battery BESS Panel */}
        <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
              <BatteryCharging size={20} color="#06b6d4" />
              <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff" }}>
                BESS Battery Storage & Grid Feed-in
              </h3>
            </div>

            <div style={{ background: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.2)", borderRadius: "12px", padding: "1rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Battery State of Charge (SoC)</span>
                <span className="font-mono" style={{ fontWeight: "700", color: "#06b6d4" }}>92% (50 MWh)</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "92%", height: "100%", background: "#06b6d4", borderRadius: "4px" }}></div>
              </div>
              <div style={{ fontSize: "0.725rem", color: "var(--text-muted)", marginTop: "6px" }}>
                Peak Shaving Feed-in scheduled at 19:00 HRS ($0.095/kWh peak tariff)
              </div>
            </div>

            {/* Financial Metrics */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.825rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-muted)" }}>Plant Capital Expenditure (CapEx)</span>
                <span className="font-mono" style={{ color: "#fff", fontWeight: "600" }}>$112,500,000</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "var(--text-muted)" }}>Projected Payback Period</span>
                <span className="font-mono" style={{ color: "#34d399", fontWeight: "700" }}>5.4 Years</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0" }}>
                <span style={{ color: "var(--text-muted)" }}>Internal Rate of Return (IRR)</span>
                <span className="font-mono" style={{ color: "var(--solar-amber)", fontWeight: "700" }}>16.8%</span>
              </div>
            </div>
          </div>

          <div style={{ padding: "0.75rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "10px", fontSize: "0.775rem", color: "#34d399", textAlign: "center" }}>
            <CheckCircle2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
            Eligible for Clean Energy Carbon Credit Certification
          </div>

        </div>

      </div>

    </div>
  );
}
