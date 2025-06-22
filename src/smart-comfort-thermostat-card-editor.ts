import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardEditor } from 'custom-card-helpers';
import type { HomeAssistant } from 'custom-card-helpers';

interface SmartComfortThermostatCardConfig {
  type: string;
  entity: string;
  name?: string;
  show_current_temperature?: boolean;
  show_dew_point?: boolean;
  show_comfort_status?: boolean;
  show_humidity?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

@customElement('smart-comfort-thermostat-card-editor')
export class SmartComfortThermostatCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: SmartComfortThermostatCardConfig;

  public setConfig(config: SmartComfortThermostatCardConfig): void {
    this.config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    // Get all smart comfort climate entities
    const climateEntities = Object.keys(this.hass.states)
      .filter(entity => entity.startsWith('climate.') && 
        this.hass.states[entity].attributes.dew_point !== undefined)
      .sort();

    return html`
      <div class="card-config">
        <div class="option">
          <label class="label" for="entity">
            Entity (Required)
            <span class="secondary">Smart Comfort Climate entity</span>
          </label>
          <select
            id="entity"
            .value=${this.config.entity || ''}
            .configValue=${'entity'}
            @change=${this.valueChanged}
          >
            <option value="">Select entity...</option>
            ${climateEntities.map(
              entity => html`
                <option value=${entity} ?selected=${entity === this.config.entity}>
                  ${this.hass.states[entity].attributes.friendly_name || entity}
                </option>
              `
            )}
          </select>
        </div>

        <div class="option">
          <label class="label" for="name">
            Name (Optional)
            <span class="secondary">Override the entity's friendly name</span>
          </label>
          <input
            id="name"
            type="text"
            .value=${this.config.name || ''}
            .configValue=${'name'}
            @input=${this.valueChanged}
            placeholder="Smart Climate"
          />
        </div>

        <div class="option-group">
          <div class="group-label">Display Options</div>
          
          <div class="option">
            <label class="checkbox-label">
              <input
                type="checkbox"
                .checked=${this.config.show_current_temperature !== false}
                .configValue=${'show_current_temperature'}
                @change=${this.valueChanged}
              />
              Show Actual Temperature
              <span class="secondary">Display the raw temperature sensor reading</span>
            </label>
          </div>

          <div class="option">
            <label class="checkbox-label">
              <input
                type="checkbox"
                .checked=${this.config.show_humidity !== false}
                .configValue=${'show_humidity'}
                @change=${this.valueChanged}
              />
              Show Humidity
              <span class="secondary">Display current humidity percentage</span>
            </label>
          </div>

          <div class="option">
            <label class="checkbox-label">
              <input
                type="checkbox"
                .checked=${this.config.show_dew_point !== false}
                .configValue=${'show_dew_point'}
                @change=${this.valueChanged}
              />
              Show Dew Point
              <span class="secondary">Display calculated dew point temperature</span>
            </label>
          </div>

          <div class="option">
            <label class="checkbox-label">
              <input
                type="checkbox"
                .checked=${this.config.show_comfort_status !== false}
                .configValue=${'show_comfort_status'}
                @change=${this.valueChanged}
              />
              Show Comfort Status
              <span class="secondary">Display comfort level (e.g., "Comfortable", "Muggy")</span>
            </label>
          </div>
        </div>

        ${this.config.entity ? this.renderPreview() : ''}
      </div>
    `;
  }

  private renderPreview(): TemplateResult {
    const entity = this.hass.states[this.config.entity];
    if (!entity) return html``;

    return html`
      <div class="preview-section">
        <div class="group-label">Preview</div>
        <div class="preview">
          <div class="preview-placeholder">
            <div class="placeholder-content">
              <div class="placeholder-title">Smart Comfort Thermostat</div>
              <div class="placeholder-temp">72°</div>
              <div class="placeholder-label">feels like</div>
              <div class="placeholder-status">Configured and ready to use</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private valueChanged(ev: Event): void {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configValue = target.configValue;
    
    if (!configValue) {
      return;
    }

    let value: any;
    if (target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
      if (value === '') {
        value = undefined;
      }
    }


    if (this.config[configValue as keyof SmartComfortThermostatCardConfig] === value) {
      return;
    }

    const newConfig = {
      ...this.config,
      [configValue]: value,
    } as SmartComfortThermostatCardConfig;

    
    const messageEvent = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .option-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        background: var(--secondary-background-color);
      }

      .group-label {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .checkbox-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        display: flex;
        align-items: flex-start;
        gap: 8px;
        cursor: pointer;
        flex-direction: column;
      }

      .checkbox-label input[type="checkbox"] {
        margin: 0;
        align-self: flex-start;
        margin-top: 2px;
      }

      .secondary {
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      select, input[type="text"] {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--ha-card-background);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      select:focus, input[type="text"]:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(var(--accent-color), 0.2);
      }

      .preview-section {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid var(--divider-color);
      }

      .preview {
        max-width: 400px;
        margin: 0 auto;
      }

      .preview-placeholder {
        background: var(--ha-card-background);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        text-align: center;
        border: 2px dashed var(--divider-color);
      }

      .placeholder-content {
        opacity: 0.7;
      }

      .placeholder-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 16px;
      }

      .placeholder-temp {
        font-size: 48px;
        font-weight: 300;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .placeholder-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .placeholder-status {
        font-size: 14px;
        color: var(--success-color, #4CAF50);
        font-weight: 500;
      }
    `;
  }
}