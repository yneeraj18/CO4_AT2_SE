import React, { useState } from "react";
import { 
  Bot, 
  Sparkles, 
  BatteryCharging, 
  Droplet, 
  ShieldAlert, 
  Wrench, 
  Plus, 
  CheckCircle2, 
  Clock, 
  User, 
  Play, 
  RotateCcw,
  Zap,
  Check
} from "lucide-react";

export default function MaintenanceCenter({ 
  robots, 
  alerts, 
  tickets, 
  onTriggerRobotSweep, 
  onResolveAlert, 
  onCreateTicket,
  pvBlocks
}) {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketBlock, setTicketBlock] = useState("ZA-S04");
  const [ticketPriority, setTicketPriority] = useState("High");
  const [ticketTech, setTicketTech] = useState("Eng. Sarah Jenkins (Field Tech)");

  const handleCreateTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketTitle.trim()) return;

    onCreateTicket({
      id: `WO-2026-${Math.floor(Math.random() * 800) + 100}`,
      title: ticketTitle,
      blockId: ticketBlock,
      priority: ticketPriority,
      assignedTo: ticketTech,
      status: "Open",
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16)
    });

    setTicketTitle("");
    setShowNewTicketModal(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* SECTION 1: Autonomous Cleaning Fleet */}
      <div className="glass-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bot size={22} color="var(--emerald-green)" />
              <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#fff" }}>
                Autonomous Robotic Cleaning & Drone Fleet
              </h2>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Waterless dry sweepers, hydro-mist rovers, and infrared UAV thermal inspectors
            </p>
          </div>

          <button 
            onClick={() => onTriggerRobotSweep("ROBOT-01")}
            className="btn-emerald"
          >
            <Sparkles size={16} /> Dispatch All Fleet Sweeps
          </button>
        </div>

        {/* Robot Fleet Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {robots.map((bot) => (
            <div 
              key={bot.id}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: bot.status.includes("Active") || bot.status.includes("Patrolling") ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid var(--border-card)",
                borderRadius: "14px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.75rem"
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--cyan-sky)", fontWeight: "700" }}>
                    {bot.id}
                  </span>
                  <span className={`badge ${bot.status.includes("Active") || bot.status.includes("Patrolling") ? "badge-healthy" : "badge-soiled"}`}>
                    {bot.status}
                  </span>
                </div>

                <div style={{ fontWeight: "700", fontSize: "1rem", color: "#fff" }}>
                  {bot.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Type: {bot.type}
                </div>
              </div>

              {/* Status metrics */}
              <div style={{ background: "rgba(0,0,0,0.2)", padding: "0.75rem", borderRadius: "10px", fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: "6px" }}>
                
                {/* Battery */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <BatteryCharging size={14} color="#34d399" /> Battery Level
                  </span>
                  <span className="font-mono" style={{ color: "#34d399", fontWeight: "700" }}>{bot.battery}%</span>
                </div>

                {/* Location */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Current Zone</span>
                  <span style={{ color: "#fff", fontWeight: "600" }}>{bot.zone}</span>
                </div>

                {/* Target Block */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Active String</span>
                  <span className="font-mono" style={{ color: "var(--solar-amber)", fontWeight: "700" }}>{bot.currentBlock}</span>
                </div>

                {/* Cleared Area */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Cleaned Today</span>
                  <span className="font-mono" style={{ color: "#fff" }}>{bot.clearedTodayM2.toLocaleString()} m²</span>
                </div>

                {/* Water Reservoir if present */}
                {bot.waterReservoir !== null && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Droplet size={14} color="#06b6d4" /> Hydro Reservoir
                    </span>
                    <span className="font-mono" style={{ color: "#06b6d4", fontWeight: "700" }}>{bot.waterReservoir}%</span>
                  </div>
                )}

              </div>

              {/* Quick Actions */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button 
                  onClick={() => onTriggerRobotSweep(bot.id)}
                  className="btn-emerald"
                  style={{ flex: 1, padding: "0.35rem", fontSize: "0.75rem", justifyContent: "center" }}
                >
                  <Play size={13} /> Start Clean
                </button>
                <button 
                  onClick={() => alert(`${bot.name} recalling to central docking bay.`)}
                  className="btn-secondary"
                  style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem" }}
                  title="Recall Bot to Charging Dock"
                >
                  Dock
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: AI Diagnostic Alerts & Work Orders Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        
        {/* Active AI Alerts List */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={20} color="#f87171" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>
                Active AI Anomaly Queue ({alerts.length})
              </h3>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {alerts.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                <CheckCircle2 size={36} color="#10b981" style={{ margin: "0 auto 0.5rem" }} />
                <div>All Array Strings Optimal! No Anomalies Flagged.</div>
              </div>
            ) : (
              alerts.map((alt) => (
                <div 
                  key={alt.id}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "12px",
                    padding: "0.85rem 1rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span className={`badge badge-${alt.severity}`}>
                      {alt.severity}
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--solar-amber)" }}>
                      {alt.blockId}
                    </span>
                  </div>

                  <div style={{ fontWeight: "600", fontSize: "0.875rem", color: "#fff", marginBottom: "4px" }}>
                    {alt.title}
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: "8px" }}>
                    {alt.details}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Recommended: {alt.recommended}</span>
                    <button 
                      onClick={() => onResolveAlert(alt.id)}
                      className="btn-emerald"
                      style={{ padding: "0.25rem 0.6rem", fontSize: "0.725rem" }}
                    >
                      <Check size={12} /> Auto Resolve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Work Order Tickets */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Wrench size={20} color="var(--solar-amber)" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff" }}>
                Field Work Orders ({tickets.length})
              </h3>
            </div>

            <button 
              onClick={() => setShowNewTicketModal(true)}
              className="btn-primary"
              style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem" }}
            >
              <Plus size={14} /> New Ticket
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {tickets.map((t) => (
              <div 
                key={t.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "12px",
                  padding: "0.85rem 1rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--cyan-sky)", fontWeight: "700" }}>
                    {t.id}
                  </span>
                  <span style={{
                    fontSize: "0.7rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "999px",
                    background: t.priority === "High" ? "rgba(239, 68, 68, 0.2)" : "rgba(245, 158, 11, 0.2)",
                    color: t.priority === "High" ? "#f87171" : "#fbbf24",
                    fontWeight: "600"
                  }}>
                    {t.priority} Priority
                  </span>
                </div>

                <div style={{ fontWeight: "600", fontSize: "0.875rem", color: "#fff" }}>
                  {t.title}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <User size={12} /> {t.assignedTo}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: t.status === "Resolved" ? "#34d399" : "#fb923c" }}>
                    <Clock size={12} /> {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal for Creating New Work Order Ticket */}
      {showNewTicketModal && (
        <div className="modal-overlay" onClick={() => setShowNewTicketModal(false)}>
          <div className="glass-card" onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: "500px", padding: "1.75rem", background: "#0d1322" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff", marginBottom: "1rem" }}>
              Issue Field Technician Work Order
            </h3>

            <form onSubmit={handleCreateTicketSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Issue Description Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Diode bridge thermal check"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "0.6rem", color: "#fff", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Target String</label>
                  <select 
                    value={ticketBlock}
                    onChange={(e) => setTicketBlock(e.target.value)}
                    style={{ width: "100%", background: "#0f172a", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "0.6rem", color: "#fff" }}
                  >
                    {pvBlocks.map(b => (
                      <option key={b.id} value={b.id}>{b.id} ({b.status})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Priority</label>
                  <select 
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    style={{ width: "100%", background: "#0f172a", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "0.6rem", color: "#fff" }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Assigned Engineer</label>
                <input 
                  type="text" 
                  value={ticketTech}
                  onChange={(e) => setTicketTech(e.target.value)}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "0.6rem", color: "#fff" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowNewTicketModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create Work Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
