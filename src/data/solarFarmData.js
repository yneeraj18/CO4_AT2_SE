// Smart Solar Farm Initial Data & Simulation Defaults

export const PLANT_INFO = {
  name: "kanekal solar park",
  location: "Bhadla Sun Basin, Rajasthan, IN (27.53° N, 71.91° E)",
  capacityMW: 150,
  installedPanels: 420000,
  inverterBlocks: 30,
  substationVoltage: "220 kV Grid Interconnect",
  commissionedDate: "2023-11-15",
  performanceRatioPR: 84.6, // %
  todayYieldMWh: 642.8,
  expectedYieldMWh: 670.0,
  co2OffsetTonsToday: 488.5,
  revenueTodayUSD: 38568,
  ppaTariffUSD: 0.060, // $ per kWh
};

export const INITIAL_WEATHER = {
  irradiance: 895, // W/m^2
  ambientTemp: 34.2, // °C
  panelTemp: 48.6, // °C
  windSpeed: 12.4, // km/h
  uvIndex: 9.2,
  cloudCover: 8, // %
  condition: "Clear & Sunny",
  sunElevation: 64.5, // degrees
  sunAzimuth: 210.2, // degrees
};

// 24-hour yield curve mock
export const HOURLY_TELEMETRY = [
  { hour: "00:00", irradiance: 0, actualMW: 0, targetMW: 0, tempC: 22, batterySoC: 45 },
  { hour: "02:00", irradiance: 0, actualMW: 0, targetMW: 0, tempC: 21, batterySoC: 40 },
  { hour: "04:00", irradiance: 0, actualMW: 0, targetMW: 0, tempC: 20, batterySoC: 35 },
  { hour: "06:00", irradiance: 120, actualMW: 14.2, targetMW: 16.0, tempC: 23, batterySoC: 32 },
  { hour: "08:00", irradiance: 450, actualMW: 62.5, targetMW: 66.8, tempC: 29, batterySoC: 45 },
  { hour: "10:00", irradiance: 780, actualMW: 118.4, targetMW: 122.0, tempC: 38, batterySoC: 68 },
  { hour: "12:00", irradiance: 960, actualMW: 144.8, targetMW: 148.5, tempC: 46, batterySoC: 92 },
  { hour: "14:00", irradiance: 895, actualMW: 135.2, targetMW: 139.0, tempC: 48, batterySoC: 98 },
  { hour: "16:00", irradiance: 540, actualMW: 81.6, targetMW: 85.2, tempC: 42, batterySoC: 100 },
  { hour: "18:00", irradiance: 180, actualMW: 24.1, targetMW: 27.0, tempC: 33, batterySoC: 92 },
  { hour: "20:00", irradiance: 0, actualMW: 0, targetMW: 0, tempC: 27, batterySoC: 80 },
  { hour: "22:00", irradiance: 0, actualMW: 0, targetMW: 0, tempC: 24, batterySoC: 62 },
];

export const MONTHLY_HISTORICAL = [
  { month: "Jan", yieldMWh: 16800, PR: 83.2, revenueUSD: 1008000, co2Tons: 12760 },
  { month: "Feb", yieldMWh: 17900, PR: 84.0, revenueUSD: 1074000, co2Tons: 13600 },
  { month: "Mar", yieldMWh: 20400, PR: 85.5, revenueUSD: 1224000, co2Tons: 15500 },
  { month: "Apr", yieldMWh: 21800, PR: 86.1, revenueUSD: 1308000, co2Tons: 16560 },
  { month: "May", yieldMWh: 22600, PR: 85.0, revenueUSD: 1356000, co2Tons: 17170 },
  { month: "Jun", yieldMWh: 19800, PR: 82.4, revenueUSD: 1188000, co2Tons: 15040 },
  { month: "Jul", yieldMWh: 17500, PR: 80.8, revenueUSD: 1050000, co2Tons: 13300 },
  { month: "Aug", yieldMWh: 18200, PR: 82.0, revenueUSD: 1092000, co2Tons: 13830 },
];

// Generate 48 PV Array blocks across 4 zones
export const ZONES = [
  { id: "ZA", name: "Zone Alpha (North)", capacityMW: 45, totalStrings: 12 },
  { id: "ZB", name: "Zone Beta (East)", capacityMW: 40, totalStrings: 12 },
  { id: "ZC", name: "Zone Gamma (West)", capacityMW: 35, totalStrings: 12 },
  { id: "ZD", name: "Zone Delta (South)", capacityMW: 30, totalStrings: 12 },
];

export const generatePVBlocks = () => {
  const blocks = [];
  let idCounter = 1;

  ZONES.forEach((zone) => {
    for (let i = 1; i <= zone.totalStrings; i++) {
      const blockId = `${zone.id}-S${i < 10 ? "0" + i : i}`;
      let status = "healthy";
      let soilLevel = Math.floor(Math.random() * 15) + 3; // 3-18% dust
      let temp = Math.floor(Math.random() * 8) + 44; // 44-52°C
      let voc = (1495 + Math.random() * 20).toFixed(1); // Volts DC
      let isc = (248 + Math.random() * 10).toFixed(1); // Amps DC
      let efficiency = (21.4 - (soilLevel * 0.12)).toFixed(1);

      // Inject deterministic anomalies for rich demo UI
      if (blockId === "ZA-S04") {
        status = "soiled";
        soilLevel = 38;
        efficiency = "16.8";
      } else if (blockId === "ZB-S07") {
        status = "warning";
        temp = 68; // Thermal hotspot!
        efficiency = "17.2";
      } else if (blockId === "ZC-S02") {
        status = "fault";
        voc = "1020.0"; // Voltage drop!
        isc = "110.0";
        efficiency = "10.4";
      } else if (blockId === "ZD-S11") {
        status = "soiled";
        soilLevel = 42;
        efficiency = "15.9";
      } else if (blockId === "ZA-S09") {
        status = "offline";
        voc = "0.0";
        isc = "0.0";
        efficiency = "0.0";
      }

      blocks.push({
        id: blockId,
        num: idCounter++,
        zoneId: zone.id,
        zoneName: zone.name,
        inverterId: `INV-${zone.id}-${Math.ceil(i / 3)}`,
        status,
        voc: Number(voc),
        isc: Number(isc),
        kwOutput: status === "offline" ? 0 : Number(((Number(voc) * Number(isc)) / 1000).toFixed(1)),
        temperature: temp,
        soilIndex: soilLevel,
        efficiency: Number(efficiency),
        tiltAngle: 24, // degrees
        lastCleaned: "2 days ago",
        panelsCount: 875,
        model: "SunPower Maxeon 6 High Efficiency 430W",
      });
    }
  });

  return blocks;
};

export const INITIAL_ROBOTS = [
  {
    id: "ROBOT-01",
    name: "SolarBot Alpha",
    type: "Autonomous Dry Sweeper",
    zone: "Zone Alpha (North)",
    battery: 88,
    status: "Active Cleaning",
    currentBlock: "ZA-S04",
    clearedTodayM2: 2450,
    speedMetersPerMin: 18,
    waterReservoir: null,
  },
  {
    id: "ROBOT-02",
    name: "SolarBot Beta",
    type: "Hydro-Mist Washer",
    zone: "Zone Delta (South)",
    battery: 64,
    status: "En Route",
    currentBlock: "ZD-S11",
    clearedTodayM2: 1890,
    speedMetersPerMin: 14,
    waterReservoir: 72, // %
  },
  {
    id: "ROBOT-03",
    name: "AeroDrone Thermal XI",
    type: "AI Patrol UAV Drone",
    zone: "Zone Beta (East)",
    battery: 92,
    status: "Patrolling",
    currentBlock: "ZB-S07",
    clearedTodayM2: 12000, // Inspected area
    speedMetersPerMin: 120,
    waterReservoir: null,
  },
  {
    id: "ROBOT-04",
    name: "SolarBot Gamma",
    type: "Autonomous Dry Sweeper",
    zone: "Zone Gamma (West)",
    battery: 100,
    status: "Docked Charging",
    currentBlock: "Docking Bay 3",
    clearedTodayM2: 3100,
    speedMetersPerMin: 18,
    waterReservoir: null,
  },
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-9041",
    severity: "critical",
    title: "String Inverter Under-Voltage & Bypass Diode Trip",
    blockId: "ZC-S02",
    zone: "Zone Gamma",
    timestamp: "10 mins ago",
    details: "String DC voltage dropped to 1020V (Expected: 1500V). Possible cell cracking or blown diode bridge.",
    recommended: "Dispatch technician for junction box continuity test.",
  },
  {
    id: "ALT-9038",
    severity: "warning",
    title: "Thermal Hotspot Anomalous Cell Temp (68°C)",
    blockId: "ZB-S07",
    zone: "Zone Beta",
    timestamp: "28 mins ago",
    details: "Infrared UAV aerial scan flagged local hotspot +22°C above array ambient baseline. Potential localized shading or solder fault.",
    recommended: "Inspect panel surface and clean localized bird dropping shading.",
  },
  {
    id: "ALT-9032",
    severity: "soiled",
    title: "Severe Soiling & Dust Layer Accumulation (38%)",
    blockId: "ZA-S04",
    zone: "Zone Alpha",
    timestamp: "1 hour ago",
    details: "Optical dust sensors report 38% transmittance loss due to desert dust storm fallout.",
    recommended: "Deploy SolarBot Alpha for automated dry sweep cycle.",
  },
  {
    id: "ALT-9029",
    severity: "soiled",
    title: "High Dust Index Flagged (42%)",
    blockId: "ZD-S11",
    zone: "Zone Delta",
    timestamp: "2 hours ago",
    details: "Performance drop detected. String efficiency degraded to 15.9%.",
    recommended: "Dispatch SolarBot Beta Hydro-Mist Washer.",
  },
];

export const INITIAL_TICKETS = [
  {
    id: "WO-2026-881",
    title: "Junction Box Repair & Diode Replacement",
    blockId: "ZC-S02",
    priority: "High",
    assignedTo: "Eng. Sarah Jenkins (Field Tech)",
    status: "In Progress",
    createdAt: "2026-08-24 14:30",
  },
  {
    id: "WO-2026-879",
    title: "UAV Thermal Hotspot Physical Verification",
    blockId: "ZB-S07",
    priority: "Medium",
    assignedTo: "Eng. Raj Patel (O&M Tech)",
    status: "Open",
    createdAt: "2026-08-24 11:15",
  },
  {
    id: "WO-2026-874",
    title: "Substation Transformer Oil Temp Inspection",
    blockId: "SUB-MAIN",
    priority: "Low",
    assignedTo: "Elect. Marcus Vance",
    status: "Resolved",
    createdAt: "2026-08-23 09:00",
  },
];
