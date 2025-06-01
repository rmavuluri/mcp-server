import axios from 'axios';
export class WeatherService {
    baseUrl = process.env.NWS_API_BASE || 'https://api.weather.gov';
    userAgent = process.env.NWS_USER_AGENT || 'WeatherMCPApp';
    // Fetch active weather alerts for a state
    async getAlerts(state) {
        try {
            const response = await axios.get(`${this.baseUrl}/alerts/active?area=${state}`, {
                headers: { 'User-Agent': this.userAgent }
            });
            const alerts = response.data.features || [];
            if (!alerts.length) {
                return `No active weather alerts for ${state}.`;
            }
            return alerts
                .map((alert) => alert.properties.headline)
                .join('\n');
        }
        catch (error) {
            return `Error fetching alerts: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    }
}
//# sourceMappingURL=weather-service.js.map