import axios from 'axios';

export class WeatherService {
  private baseUrl: string = process.env.NWS_API_BASE || 'https://api.weather.gov';
  private userAgent: string = process.env.NWS_USER_AGENT || 'WeatherMCPApp';

  // Fetch active weather alerts for a state
  async getAlerts(state: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/alerts/active?area=${state}`, {
        headers: { 'User-Agent': this.userAgent }
      });
      const alerts = response.data.features || [];
      if (!alerts.length) {
        return `No active weather alerts for ${state}.`;
      }
      return alerts
        .map((alert: any) => alert.properties.headline)
        .join('\n');
    } catch (error) {
      return `Error fetching alerts: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
}