import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import type { HomeAssistant } from 'custom-card-helpers';

interface SmartComfortThermostatCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  name?: string;
  show_current_temperature?: boolean;
  show_dew_point?: boolean;
  show_comfort_status?: boolean;
  show_humidity?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

interface ClimateEntity {
  entity_id: string;
  state: string;
  attributes: {
    current_temperature?: number;
    target_temperature?: number;
    actual_temperature?: number;
    humidity?: number;
    dew_point?: number;
    comfort_status?: string;
    feels_like_difference?: number;
    hvac_modes?: string[];
    hvac_mode?: string;
    underlying_hvac_mode?: string;
    humidity_priority?: boolean;
    friendly_name?: string;
  };
}

@customElement('smart-comfort-thermostat-card')
export class SmartComfortThermostatCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: SmartComfortThermostatCardConfig;
  @state() private dragging = false;
  @state() private dragValue = 0;

  public static async getConfigElement() {
    return document.createElement('smart-comfort-thermostat-card-editor');
  }

  public static getStubConfig(): SmartComfortThermostatCardConfig {
    return {
      type: 'custom:smart-comfort-thermostat-card',
      entity: '',
      show_current_temperature: true,
      show_dew_point: true,
      show_comfort_status: true,
      show_humidity: true,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public setConfig(config: SmartComfortThermostatCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const entity = this.hass.states[this.config.entity] as ClimateEntity;
    if (!entity) {
      return html`
        <ha-card>
          <div class="warning">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;
    }

    const isOn = entity.state !== 'off';
    const currentTemp = entity.attributes.current_temperature ?? 0;
    const targetTemp = entity.attributes.target_temperature ?? 72;
    const actualTemp = entity.attributes.actual_temperature;
    const humidity = entity.attributes.humidity;
    const dewPoint = entity.attributes.dew_point;
    const comfortStatus = entity.attributes.comfort_status ?? 'Unknown';
    const feelsLikeDiff = entity.attributes.feels_like_difference ?? 0;
    const underlyingMode = entity.attributes.underlying_hvac_mode ?? 'off';
    const humidityPriority = entity.attributes.humidity_priority ?? false;

    const displayTemp = this.dragging ? this.dragValue : targetTemp;
    const tempDiff = Math.abs(currentTemp - targetTemp);
    const comfortColor = this.getComfortColor(comfortStatus);
    const modeText = this.getModeText(underlyingMode, humidityPriority);

    return html`
      <ha-card class="comfort-card ${isOn ? 'on' : 'off'}">
        <div class="card-content">
          <!-- Header -->
          <div class="header">
            <div class="entity-name">
              ${this.config.name || entity.attributes.friendly_name || 'Smart Climate'}
            </div>
            <div class="power-button" @click=${this.togglePower}>
              <ha-icon icon=${isOn ? 'mdi:power' : 'mdi:power-off'}></ha-icon>
            </div>
          </div>

          <!-- Main Thermostat Circle -->
          <div class="thermostat-container">
            <div class="thermostat-circle" style="--comfort-color: ${comfortColor}">
              <!-- Outer ring showing comfort status -->
              <div class="comfort-ring"></div>
              
              <!-- Temperature display -->
              <div class="temperature-display">
                <div class="current-temp">${Math.round(currentTemp)}°</div>
                <div class="feels-like-label">feels like</div>
                <div class="target-temp-container">
                  <div class="target-temp" @click=${this.openMoreInfo}>
                    ${Math.round(displayTemp)}°
                  </div>
                  <div class="temp-diff ${tempDiff < 0.5 ? 'satisfied' : 'adjusting'}">
                    ${feelsLikeDiff > 0 ? '+' : ''}${feelsLikeDiff.toFixed(1)}°
                  </div>
                </div>
              </div>

              <!-- Touch area for temperature adjustment -->
              <div class="touch-area" 
                   @touchstart=${this.handleTouchStart}
                   @touchmove=${this.handleTouchMove}
                   @touchend=${this.handleTouchEnd}
                   @mousedown=${this.handleMouseDown}
                   @mousemove=${this.handleMouseMove}
                   @mouseup=${this.handleMouseUp}
                   @mouseleave=${this.handleMouseUp}>
              </div>
            </div>

            <!-- Temperature adjustment indicators -->
            ${this.renderTempMarkers(displayTemp)}
          </div>

          <!-- Status and Info -->
          <div class="status-section">
            <div class="comfort-status" style="color: ${comfortColor}">
              <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>
              ${comfortStatus}
            </div>
            <div class="mode-status">
              <ha-icon icon=${this.getModeIcon(underlyingMode)}></ha-icon>
              ${modeText}
            </div>
          </div>

          <!-- Additional Info Grid -->
          ${this.renderInfoGrid(actualTemp, humidity, dewPoint)}
        </div>
      </ha-card>
    `;
  }

  private renderTempMarkers(currentTarget: number): TemplateResult {
    const markers = [];
    const minTemp = 65;
    const maxTemp = 85;
    const step = 1;

    for (let temp = minTemp; temp <= maxTemp; temp += step) {
      const angle = ((temp - minTemp) / (maxTemp - minTemp)) * 270 - 135; // 270° arc, starting at -135°
      const isActive = Math.abs(temp - currentTarget) < 0.5;
      const opacity = isActive ? 1 : (Math.abs(temp - currentTarget) < 3 ? 0.3 : 0.1);
      
      markers.push(html`
        <div class="temp-marker ${isActive ? 'active' : ''}" 
             style="transform: rotate(${angle}deg); opacity: ${opacity}">
          <div class="marker-dot"></div>
          ${temp % 5 === 0 ? html`<div class="marker-label">${temp}</div>` : ''}
        </div>
      `);
    }

    return html`<div class="temp-markers">${markers}</div>`;
  }

  private renderInfoGrid(actualTemp?: number, humidity?: number, dewPoint?: number): TemplateResult {
    const items = [];

    if (this.config.show_current_temperature && actualTemp !== undefined) {
      items.push(html`
        <div class="info-item">
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <div class="info-value">${Math.round(actualTemp)}°F</div>
          <div class="info-label">actual temp</div>
        </div>
      `);
    }

    if (this.config.show_humidity && humidity !== undefined) {
      items.push(html`
        <div class="info-item">
          <ha-icon icon="mdi:water-percent"></ha-icon>
          <div class="info-value">${Math.round(humidity)}%</div>
          <div class="info-label">humidity</div>
        </div>
      `);
    }

    if (this.config.show_dew_point && dewPoint !== undefined) {
      items.push(html`
        <div class="info-item">
          <ha-icon icon="mdi:water-thermometer"></ha-icon>
          <div class="info-value">${Math.round(dewPoint)}°F</div>
          <div class="info-label">dew point</div>
        </div>
      `);
    }

    return items.length > 0 ? html`
      <div class="info-grid">
        ${items}
      </div>
    ` : html``;
  }

  private getComfortColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'oppressive': return '#e74c3c';
      case 'muggy': return '#f39c12';
      case 'slightly humid': return '#f1c40f';
      case 'comfortable': return '#2ecc71';
      case 'very comfortable': return '#27ae60';
      case 'dry': return '#3498db';
      case 'very dry': return '#9b59b6';
      default: return '#95a5a6';
    }
  }

  private getModeIcon(mode: string): string {
    switch (mode) {
      case 'cool': return 'mdi:snowflake';
      case 'dry': return 'mdi:water-minus';
      case 'fan_only': return 'mdi:fan';
      case 'heat': return 'mdi:fire';
      case 'off': return 'mdi:power-off';
      default: return 'mdi:help-circle';
    }
  }

  private getModeText(mode: string, humidityPriority: boolean): string {
    switch (mode) {
      case 'cool': return humidityPriority ? 'Cooling & Dehumidifying' : 'Cooling';
      case 'dry': return 'Dehumidifying';
      case 'fan_only': return 'Circulating Air';
      case 'heat': return 'Heating';
      case 'off': return 'Off';
      default: return 'Unknown';
    }
  }

  private togglePower(): void {
    const entity = this.hass.states[this.config.entity] as ClimateEntity;
    const newMode = entity.state === 'off' ? 'auto' : 'off';
    
    this.hass.callService('climate', 'set_hvac_mode', {
      entity_id: this.config.entity,
      hvac_mode: newMode,
    });
  }

  private openMoreInfo(): void {
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    });
    (event as any).detail = { entityId: this.config.entity };
    this.dispatchEvent(event);
  }

  // Touch and mouse handling for temperature adjustment
  private handleTouchStart(e: TouchEvent): void {
    this.dragging = true;
    this.updateTempFromEvent(e.touches[0]);
    e.preventDefault();
  }

  private handleTouchMove(e: TouchEvent): void {
    if (this.dragging) {
      this.updateTempFromEvent(e.touches[0]);
      e.preventDefault();
    }
  }

  private handleTouchEnd(): void {
    if (this.dragging) {
      this.commitTemperature();
      this.dragging = false;
    }
  }

  private handleMouseDown(e: MouseEvent): void {
    this.dragging = true;
    this.updateTempFromEvent(e);
    e.preventDefault();
  }

  private handleMouseMove(e: MouseEvent): void {
    if (this.dragging) {
      this.updateTempFromEvent(e);
    }
  }

  private handleMouseUp(): void {
    if (this.dragging) {
      this.commitTemperature();
      this.dragging = false;
    }
  }

  private updateTempFromEvent(event: Touch | MouseEvent): void {
    const circle = this.shadowRoot?.querySelector('.thermostat-circle') as HTMLElement;
    if (!circle) return;

    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = event.clientX - centerX;
    const y = event.clientY - centerY;
    
    // Calculate angle from center
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    // Normalize to 0-360
    angle = (angle + 360) % 360;
    
    // Map to temperature range (270° arc from 225° to 135°)
    let normalizedAngle;
    if (angle >= 225) {
      normalizedAngle = angle - 225;
    } else if (angle <= 135) {
      normalizedAngle = angle + 135;
    } else {
      // Outside the valid arc
      return;
    }
    
    const tempRatio = normalizedAngle / 270;
    const minTemp = 65;
    const maxTemp = 85;
    
    this.dragValue = Math.round((minTemp + (maxTemp - minTemp) * tempRatio) * 2) / 2; // Round to 0.5
    this.dragValue = Math.max(minTemp, Math.min(maxTemp, this.dragValue));
  }

  private commitTemperature(): void {
    this.hass.callService('climate', 'set_temperature', {
      entity_id: this.config.entity,
      temperature: this.dragValue,
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      .comfort-card {
        padding: 24px;
        background: linear-gradient(135deg, var(--ha-card-background, #fff) 0%, var(--secondary-background-color, #f8f9fa) 100%);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .comfort-card.off {
        opacity: 0.6;
        filter: grayscale(0.3);
      }

      .comfort-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--comfort-color, #95a5a6);
        opacity: 0.7;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .entity-name {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .power-button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--comfort-color, #95a5a6);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        color: white;
      }

      .power-button:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }

      .thermostat-container {
        position: relative;
        display: flex;
        justify-content: center;
        margin: 32px 0;
      }

      .thermostat-circle {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        position: relative;
        background: radial-gradient(circle, var(--ha-card-background, #fff) 60%, var(--secondary-background-color, #f8f9fa) 100%);
        box-shadow: 
          inset 0 0 40px rgba(0, 0, 0, 0.1),
          0 8px 32px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
      }

      .comfort-ring {
        position: absolute;
        top: 8px;
        left: 8px;
        right: 8px;
        bottom: 8px;
        border-radius: 50%;
        border: 3px solid var(--comfort-color, #95a5a6);
        opacity: 0.3;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.02); }
      }

      .temperature-display {
        text-align: center;
        z-index: 2;
      }

      .current-temp {
        font-size: 48px;
        font-weight: 300;
        color: var(--primary-text-color);
        line-height: 1;
        margin-bottom: 4px;
      }

      .feels-like-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .target-temp-container {
        position: relative;
      }

      .target-temp {
        font-size: 28px;
        font-weight: 600;
        color: var(--comfort-color, #95a5a6);
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 16px;
        transition: all 0.2s ease;
      }

      .target-temp:hover {
        background: rgba(0, 0, 0, 0.05);
        transform: scale(1.05);
      }

      .temp-diff {
        font-size: 12px;
        margin-top: 4px;
        font-weight: 500;
      }

      .temp-diff.satisfied {
        color: var(--success-color, #4CAF50);
      }

      .temp-diff.adjusting {
        color: var(--warning-color, #FF9800);
      }

      .touch-area {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        z-index: 1;
      }

      .temp-markers {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }

      .temp-marker {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 140px;
        height: 2px;
        transform-origin: 0 50%;
        transition: opacity 0.2s ease;
      }

      .marker-dot {
        position: absolute;
        right: 0;
        top: 50%;
        width: 4px;
        height: 4px;
        background: var(--comfort-color, #95a5a6);
        border-radius: 50%;
        transform: translateY(-50%);
      }

      .temp-marker.active .marker-dot {
        width: 8px;
        height: 8px;
        background: var(--comfort-color, #95a5a6);
        box-shadow: 0 0 8px var(--comfort-color, #95a5a6);
      }

      .marker-label {
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .status-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 24px 0;
        padding: 16px;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 16px;
      }

      .comfort-status, .mode-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
      }

      .comfort-status {
        font-size: 16px;
      }

      .mode-status {
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 16px;
        margin-top: 24px;
      }

      .info-item {
        text-align: center;
        padding: 16px 8px;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .info-item:hover {
        background: rgba(0, 0, 0, 0.06);
        transform: translateY(-2px);
      }

      .info-item ha-icon {
        color: var(--comfort-color, #95a5a6);
        margin-bottom: 8px;
        --mdc-icon-size: 20px;
      }

      .info-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .info-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .warning {
        padding: 16px;
        text-align: center;
        color: var(--error-color);
        font-weight: 500;
      }

      /* Dark mode adjustments */
      @media (prefers-color-scheme: dark) {
        .comfort-card {
          background: linear-gradient(135deg, var(--ha-card-background, #1c1c1e) 0%, var(--secondary-background-color, #2c2c2e) 100%);
        }
        
        .status-section, .info-item {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .info-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    `;
  }
}