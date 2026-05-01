/**
 * Ballistics Engine for BallisticsPro
 * Includes Point-Mass approximation, G7 drag functions, Coriolis, and Density Altitude calculations.
 */

const MathUtils = {
    degToRad: (deg) => deg * (Math.PI / 180),
    radToDeg: (rad) => rad * (180 / Math.PI),
    metersToFeet: (m) => m * 3.28084,
    feetToMeters: (f) => f / 3.28084,
    cmToInches: (cm) => cm * 0.393701,
    msToFps: (ms) => ms * 3.28084,
    gramsToGrains: (g) => g * 15.432,
    grainsToGrams: (gr) => gr / 15.432,
    kmhToMs: (kmh) => kmh / 3.6,
    kmhToMph: (kmh) => kmh * 0.621371,
    inHgToMbar: (inHg) => inHg * 33.8639,
    mbarToInHg: (mbar) => mbar / 33.8639
};

// Physics Constants
const G = 9.80665; // Gravity m/s^2
const STD_TEMP = 15; // Celsius
const STD_PRESSURE = 1013.25; // mbar

class BallisticsEngine {
    constructor(envParams, rifleParams) {
        this.env = envParams;
        this.rifle = rifleParams;
    }

    /**
     * Calculate Density Altitude (m)
     */
    calculateDensityAltitude() {
        const p = this.env.pressure; // mbar
        const t = this.env.temp; // C
        
        // Simplified DA calculation
        const stationPressure = p * Math.pow(1 - (0.0000225577 * this.env.altitude), 5.25588);
        const da = (this.env.altitude) + (118.8 * (t - STD_TEMP)); 
        return da;
    }

    /**
     * Approximated Point Mass Trajectory using G7 BC
     */
    calculateTrajectory(targetDistanceMeters) {
        // Initial velocity in m/s
        let v = this.rifle.muzzleVelocity;
        
        // Bullet mass in kg
        let m = MathUtils.grainsToGrams(this.rifle.bulletWeight) / 1000;
        
        // Air density rho (kg/m^3)
        // Standard air density is ~1.225 kg/m^3
        let tempK = this.env.temp + 273.15;
        let rho = (this.env.pressure * 100) / (287.05 * tempK);
        
        // Drag coefficient adjustment (simplified G7 mapped)
        let bc = this.rifle.g7Bc;
        let cDrag = 0.5 / bc; // Highly simplified drag factor for demo
        
        let t = 0; // Time of flight
        let x = 0; // Distance
        let y = 0; // Drop
        
        let dt = 0.01; // Time step
        let vy = 0;
        
        while(x < targetDistanceMeters && t < 10) {
            let vSpeed = Math.sqrt(v*v + vy*vy);
            let drag = 0.5 * rho * vSpeed * vSpeed * cDrag * (Math.PI * 0.00005); // Simplified area
            
            let ax = -(drag * (v/vSpeed)) / m;
            let ay = -G - ((drag * (vy/vSpeed)) / m);
            
            v += ax * dt;
            vy += ay * dt;
            
            x += v * dt;
            y += vy * dt;
            t += dt;
        }

        // Apply Rain Factor (if > 0, slows bullet down very slightly)
        if(this.env.rain > 0) {
            y = y * (1 + (this.env.rain * 0.005));
        }

        // Terminal Energy (Joules)
        let terminalVelocity = Math.sqrt(v*v + vy*vy);
        let energy = 0.5 * m * (terminalVelocity * terminalVelocity);

        return {
            dropMeters: Math.abs(y),
            timeOfFlight: t,
            terminalVelocity: terminalVelocity,
            terminalEnergy: energy
        };
    }

    /**
     * Calculate Windage Deflection
     */
    calculateWindage(targetDistanceMeters, timeOfFlight) {
        // Simplified wind deflection formula: D = W * (T - R/V)
        let windMs = MathUtils.kmhToMs(this.env.windSpeed);
        
        // Crosswind component
        let radDir = MathUtils.degToRad(this.env.windDir);
        let crossWind = windMs * Math.sin(radDir);
        
        // Deflection in meters
        let vacuumTime = targetDistanceMeters / this.rifle.muzzleVelocity;
        let deflection = crossWind * (timeOfFlight - vacuumTime);
        
        return deflection; // meters
    }

    /**
     * Calculate Spin Drift
     * Deflection in meters based on time of flight and generic twist
     */
    calculateSpinDrift(timeOfFlight) {
        // Simple heuristic: ~1.25 inches per second of flight at 1000y for right hand twist
        // Converting to meters
        let inches = 1.25 * timeOfFlight;
        return inches * 0.0254; // meters right
    }

    /**
     * Calculate Coriolis Deflection
     */
    calculateCoriolis(targetDistanceMeters, timeOfFlight) {
        // Simplified: roughly proportional to distance and time
        let omega = 7.2921e-5; // Earth rotation rad/s
        let latRad = MathUtils.degToRad(45); // Assuming 45 deg lat
        let coriolis = omega * Math.sin(latRad) * targetDistanceMeters * timeOfFlight;
        return coriolis; // meters
    }

    /**
     * Calculate Moving Target Lead
     */
    calculateLead(targetSpeedKmh, angleDeg, timeOfFlight) {
        if (targetSpeedKmh === 0) return 0;
        let speedMs = MathUtils.kmhToMs(targetSpeedKmh);
        let radDir = MathUtils.degToRad(angleDeg);
        let crossSpeed = speedMs * Math.sin(radDir);
        return crossSpeed * timeOfFlight; // meters lead
    }

    /**
     * Convert meters correction to selected unit
     */
    static convertCorrection(meters, distanceMeters, unit) {
        let cm = meters * 100;
        let mrad = (meters / distanceMeters) * 1000;
        let moa = mrad * 3.4377;
        let clicks = Math.round(moa * 4); // Assuming 1/4 MOA clicks
        let inches = MathUtils.cmToInches(cm);

        switch(unit) {
            case 'moa': return moa.toFixed(2);
            case 'mrad': return mrad.toFixed(2);
            case 'clicks': return clicks.toString();
            case 'in': return inches.toFixed(2);
            case 'cm': return cm.toFixed(1);
            default: return moa.toFixed(2);
        }
    }
}
