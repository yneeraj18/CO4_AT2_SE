import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SimulationBar from "./components/SimulationBar";
import Navigation from "./components/Navigation";
import OverviewDashboard from "./components/OverviewDashboard";
import PVGridVisualizer from "./components/PVGridVisualizer";
import PanelDetailModal from "./components/PanelDetailModal";
import MaintenanceCenter from "./components/MaintenanceCenter";
import SolarTrackingView from "./components/SolarTrackingView";
import FinancialAnalytics from "./components/FinancialAnalytics";
import ReportGeneratorModal from "./components/ReportGeneratorModal";

import { 
  PLANT_INFO, 
  INITIAL_WEATHER, 
  HOURLY_TELEMETRY, 
  MONTHLY_HISTORICAL,
  generatePVBlocks, 
  INITIAL_ROBOTS, 
  INITIAL_ALERTS, 
  INITIAL_TICKETS 
} from "./data/solarFarmData";

export default function App() {
  // Navigation & Modal state
  const [activeTab, setActiveTab] = useState("overview");
  const [thermalMode, setThermalMode] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Simulation environment state
  const [simTime, setSimTime] = useState(14); // 14:00 (2 PM)
  const [weatherPreset, setWeatherPreset] = useState("clear");
  const [weather, setWeather] = useState(INITIAL_WEATHER);

  // Data states
  const [pvBlocks, setPvBlocks] = useState(generatePVBlocks);
  const [robots, setRobots] = useState(INITIAL_ROBOTS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [telemetry, setTelemetry] = useState(HOURLY_TELEMETRY);

  // Dynamic simulation effect when simTime or weatherPreset changes
  useEffect(() => {
    // 1. Calculate irradiance based on time & preset
    const timeFactor = Math.sin(((simTime - 5) / 14) * Math.PI); // Peak at 12 PM
    let baseIrradiance = Math.max(0, Math.round(980 * Math.max(0, timeFactor)));

    if (weatherPreset === "cloudy") baseIrradiance = Math.round(baseIrradiance * 0.5);
    else if (weatherPreset === "dusty") baseIrradiance = Math.round(baseIrradiance * 0.75);
    else if (weatherPreset === "rain") baseIrradiance = Math.round(baseIrradiance * 0.2);

    const ambientT = Math.round(20 + timeFactor * 16);
    const panelT = Math.round(ambientT + (baseIrradiance / 980) * 18);

    setWeather((prev) => ({
      ...prev,
      irradiance: baseIrradiance,
      ambientTemp: ambientT,
      panelTemp: panelT,
      sunElevation: Number((timeFactor * 72).toFixed(1)),
      sunAzimuth: Number((120 + ((simTime - 5) / 14) * 150).toFixed(1)),
      condition: weatherPreset === "clear" ? "Clear & Sunny" : weatherPreset === "cloudy" ? "Passing Clouds" : weatherPreset === "dusty" ? "Desert Sandstorm" : "Monsoon Rain",
      cloudCover: weatherPreset === "cloudy" ? 65 : weatherPreset === "rain" ? 90 : 8,
    }));

    // 2. Scale PV Blocks generation kW based on new irradiance factor
    const irrRatio = baseIrradiance / 980;
    setPvBlocks((prevBlocks) =>
      prevBlocks.map((b) => {
        if (b.status === "offline") return b;
        const maxKW = (b.voc * b.isc) / 1000;
        const soilLossFactor = 1 - (b.soilIndex * 0.008);
        const actualKW = Number((maxKW * irrRatio * soilLossFactor).toFixed(1));
        return {
          ...b,
          kwOutput: actualKW,
          temperature: Math.round(panelT + (b.status === "warning" ? 20 : 0)),
        };
      })
    );

    // 3. Update telemetry chart point
    setTelemetry((prev) =>
      prev.map((t) => {
        const hourNum = parseInt(t.hour.split(":")[0]);
        if (hourNum === simTime) {
          const currentMW = Number((pvBlocks.reduce((acc, b) => acc + b.kwOutput, 0) / 1000).toFixed(1));
          return {
            ...t,
            irradiance: baseIrradiance,
            actualMW: currentMW > 0 ? currentMW : Number((140 * irrRatio).toFixed(1)),
          };
        }
        return t;
      })
    );
  }, [simTime, weatherPreset]);

  // Handler: Simulate Dust Accumulation
  const handleSimulateDust = () => {
    setPvBlocks((prev) =>
      prev.map((b, idx) => {
        if (idx % 4 === 0 && b.status === "healthy") {
          return {
            ...b,
            status: "soiled",
            soilIndex: 40,
            efficiency: 16.2,
          };
        }
        return b;
      })
    );

    setAlerts((prev) => [
      {
        id: `ALT-${Math.floor(Math.random() * 9000) + 1000}`,
        severity: "soiled",
        title: "Sandstorm Dust Accumulation (40% Soiling Flagged)",
        blockId: "ZA-S08",
        zone: "Zone Alpha",
        timestamp: "Just now",
        details: "Sandstorm dust layer deposited across multiple array strings.",
        recommended: "Dispatch SolarBot fleet for automated wash sweep.",
      },
      ...prev,
    ]);
  };

  // Handler: Inject Fault
  const handleInjectFault = () => {
    const targetId = "ZC-S09";
    setPvBlocks((prev) =>
      prev.map((b) =>
        b.id === targetId
          ? {
              ...b,
              status: "fault",
              voc: 980.0,
              isc: 105.0,
              kwOutput: 102.9,
              efficiency: 10.8,
            }
          : b
      )
    );

    setAlerts((prev) => [
      {
        id: `ALT-${Math.floor(Math.random() * 9000) + 1000}`,
        severity: "critical",
        title: "DC Sub-String Under-Voltage Inverter Trip",
        blockId: targetId,
        zone: "Zone Gamma",
        timestamp: "Just now",
        details: "String DC voltage dropped to 980V. Diode breakdown or string cable short suspected.",
        recommended: "Dispatch Field Engineer for insulation resistance testing.",
      },
      ...prev,
    ]);
  };

  // Handler: Reset Simulation
  const handleResetSim = () => {
    setSimTime(14);
    setWeatherPreset("clear");
    setPvBlocks(generatePVBlocks());
    setRobots(INITIAL_ROBOTS);
    setAlerts(INITIAL_ALERTS);
    setTickets(INITIAL_TICKETS);
  };

  // Handler: Dispatch Cleaning Robots
  const handleCleanAll = (targetBlockId) => {
    setPvBlocks((prev) =>
      prev.map((b) => {
        if (b.status === "soiled" || (targetBlockId && b.id === targetBlockId)) {
          return {
            ...b,
            status: "healthy",
            soilIndex: 4,
            efficiency: 21.4,
            lastCleaned: "Just now",
          };
        }
        return b;
      })
    );

    // Update robots status
    setRobots((prev) =>
      prev.map((bot) => ({
        ...bot,
        status: "Active Cleaning",
        clearedTodayM2: bot.clearedTodayM2 + 450,
      }))
    );

    // Filter out soiled alerts
    setAlerts((prev) => prev.filter((a) => a.severity !== "soiled"));
  };

  // Handler: Resolve Alert
  const handleResolveAlert = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  // Handler: Create Ticket
  const handleCreateTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 1.25rem 3rem" }}>
      
      {/* Header Bar */}
      <Header 
        plantInfo={PLANT_INFO}
        weather={weather}
        thermalMode={thermalMode}
        setThermalMode={setThermalMode}
        alertCount={alerts.length}
        onOpenNotifications={() => setActiveTab("maintenance")}
      />

      {/* Simulation Interactive Control Bar */}
      <SimulationBar 
        simTime={simTime}
        setSimTime={setSimTime}
        weatherPreset={weatherPreset}
        setWeatherPreset={setWeatherPreset}
        onSimulateDust={handleSimulateDust}
        onInjectFault={handleInjectFault}
        onResetSim={handleResetSim}
        onCleanAll={() => handleCleanAll()}
      />

      {/* Main View Navigation Tabs */}
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setShowReportModal(true)}
      />

      {/* Tab Content Display */}
      <main>
        {activeTab === "overview" && (
          <OverviewDashboard 
            plantInfo={PLANT_INFO}
            telemetryData={telemetry}
            pvBlocks={pvBlocks}
            alerts={alerts}
            robots={robots}
            onNavigateToTab={setActiveTab}
            onOpenPanelDetail={(block) => setSelectedBlock(block)}
          />
        )}

        {activeTab === "grid" && (
          <PVGridVisualizer 
            pvBlocks={pvBlocks}
            thermalMode={thermalMode}
            setThermalMode={setThermalMode}
            onSelectBlock={(block) => setSelectedBlock(block)}
          />
        )}

        {activeTab === "maintenance" && (
          <MaintenanceCenter 
            robots={robots}
            alerts={alerts}
            tickets={tickets}
            pvBlocks={pvBlocks}
            onTriggerRobotSweep={(robotId) => handleCleanAll()}
            onResolveAlert={handleResolveAlert}
            onCreateTicket={handleCreateTicket}
          />
        )}

        {activeTab === "tracking" && (
          <SolarTrackingView 
            weather={weather}
            simTime={simTime}
          />
        )}

        {activeTab === "financial" && (
          <FinancialAnalytics 
            plantInfo={PLANT_INFO}
            monthlyData={MONTHLY_HISTORICAL}
            onOpenReportModal={() => setShowReportModal(true)}
          />
        )}
      </main>

      {/* Panel Detail Drawer Modal */}
      {selectedBlock && (
        <PanelDetailModal 
          block={selectedBlock}
          onClose={() => setSelectedBlock(null)}
          onDispatchRobotClean={(blockId) => handleCleanAll(blockId)}
          onCreateTicket={(block) => {
            handleCreateTicket({
              id: `WO-2026-${Math.floor(Math.random() * 800) + 100}`,
              title: `Maintenance Request for String ${block.id}`,
              blockId: block.id,
              priority: block.status === "fault" ? "High" : "Medium",
              assignedTo: "Eng. Sarah Jenkins (Field Tech)",
              status: "Open",
              createdAt: new Date().toISOString().replace("T", " ").substring(0, 16)
            });
            setActiveTab("maintenance");
          }}
        />
      )}

      {/* Report Download Modal */}
      {showReportModal && (
        <ReportGeneratorModal 
          plantInfo={PLANT_INFO}
          pvBlocks={pvBlocks}
          onClose={() => setShowReportModal(false)}
        />
      )}

    </div>
  );
}
