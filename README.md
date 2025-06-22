# Smart Comfort Thermostat Card

A beautiful, intuitive thermostat card designed specifically for the Smart Comfort Climate integration. Shows comfort-based temperature control with feels-like readings, dew point, and intelligent mode explanations.

![Smart Comfort Thermostat Card](https://via.placeholder.com/400x500/2ecc71/ffffff?text=Smart+Comfort+Thermostat)

## Features

- **🎯 Feels-Like Temperature Control**: Interactive circular thermostat showing "feels like" temperature
- **🌡️ Comfort Visualization**: Color-coded comfort ring showing current comfort status
- **💧 Humidity Intelligence**: Shows when the system is prioritizing dehumidification
- **📊 Rich Information Display**: Dew point, actual temperature, humidity, and comfort status
- **🎨 Beautiful Design**: Premium glass-morphism design with smooth animations
- **📱 Touch/Mouse Friendly**: Intuitive temperature adjustment via circular interaction
- **🌙 Dark Mode Support**: Automatically adapts to Home Assistant themes

## Requirements

- **Smart Comfort Climate Integration**: This card is designed to work with Smart Comfort Climate entities
- **Home Assistant 2023.4+**: Uses modern Lovelace card features

## Installation

### HACS (Recommended)

1. Open HACS → Frontend
2. Click the ⋮ menu → Custom repositories  
3. Add repository URL with category "Lovelace"
4. Install "Smart Comfort Thermostat Card"
5. Add to your resources (HACS will prompt you)

### Manual Installation

1. Download `smart-comfort-thermostat-card.js` from the latest release
2. Copy to `/config/www/community/smart-comfort-thermostat-card/`
3. Add to your resources in Home Assistant:

```yaml
resources:
  - url: /hacsfiles/smart-comfort-thermostat-card/smart-comfort-thermostat-card.js
    type: module
```

## Basic Usage

Add the card to your dashboard:

```yaml
type: custom:smart-comfort-thermostat-card
entity: climate.smart_comfort_climate_bedroom
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Smart Comfort Climate entity ID |
| `name` | string | Entity name | Override the displayed name |
| `show_current_temperature` | boolean | `true` | Show actual temperature sensor reading |
| `show_humidity` | boolean | `true` | Show current humidity percentage |
| `show_dew_point` | boolean | `true` | Show calculated dew point |
| `show_comfort_status` | boolean | `true` | Show comfort status text |

## Full Configuration Example

```yaml
type: custom:smart-comfort-thermostat-card
entity: climate.smart_comfort_climate_bedroom
name: "Master Bedroom"
show_current_temperature: true
show_humidity: true
show_dew_point: true
show_comfort_status: true
```

## Card Features Explained

### Main Thermostat Display
- **Large Number**: Current "feels like" temperature
- **"feels like" label**: Indicates this is comfort-based, not raw temperature
- **Target Temperature**: What you want it to feel like (adjustable)
- **Temperature Difference**: Shows how far off from target (+/- degrees)

### Comfort Ring
The colored ring around the thermostat changes based on comfort status:
- 🔴 **Red (Oppressive)**: Dew point > 65°F - very uncomfortable
- 🟠 **Orange (Muggy)**: Dew point 60-65°F - uncomfortably humid  
- 🟡 **Yellow (Slightly Humid)**: Dew point 55-60°F - noticeable humidity
- 🟢 **Green (Comfortable)**: Dew point 45-55°F - ideal comfort zone
- 🔵 **Blue (Dry)**: Dew point < 45°F - may feel dry

### Status Section
- **Comfort Status**: Human-readable comfort level
- **Mode Status**: What the AC is doing and why
  - "Dehumidifying" - Removing humidity for comfort
  - "Cooling & Dehumidifying" - Hot and humid
  - "Cooling" - Good humidity, just too warm
  - "Circulating Air" - Maintaining comfort
  - "Off" - Perfect conditions or too cold

### Information Grid
Shows additional metrics when enabled:
- **Actual Temp**: Raw temperature sensor reading
- **Humidity**: Current humidity percentage  
- **Dew Point**: The key metric for comfort science

## Interacting with the Card

### Temperature Adjustment
- **Tap the target temperature** to open more-info dialog
- **Drag around the circle** to adjust temperature
- **Visual feedback** with temperature markers around the edge

### Power Control
- **Tap the power button** to turn the system on/off
- Button color matches current comfort status

## Understanding the Display

### Why "Feels Like" Instead of Actual Temperature?
The card shows "feels like" temperature because that's what actually matters for comfort. 75°F at low humidity feels comfortable, but 75°F at high humidity feels hot and sticky. The Smart Comfort system controls based on how the air actually feels.

### What's Special About Dew Point?
Dew point is the most accurate measure of humidity comfort:
- **Below 55°F**: Comfortable humidity levels
- **55-60°F**: Starting to feel humid
- **Above 60°F**: Uncomfortably muggy regardless of temperature

### Why Different Modes?
The status shows why the system chose each mode:
- **High humidity** → Dry mode to remove moisture first
- **Good humidity + warm** → Cool mode for temperature
- **Perfect conditions** → Fan only for air circulation

## Troubleshooting

**Card shows "Entity not found":**
- Verify the entity ID is correct
- Make sure Smart Comfort Climate integration is installed and configured

**Temperature adjustment not working:**
- Check that the Smart Comfort Climate entity supports temperature changes
- Verify the entity is not in "off" mode

**Styling looks wrong:**
- Clear your browser cache
- Check that the card file loaded correctly in Developer Tools → Network

**Colors don't match my theme:**
- The card automatically adapts to Home Assistant themes
- Custom CSS can be added via card-mod if needed

## Advanced Customization

### Custom Styling with card-mod

```yaml
type: custom:smart-comfort-thermostat-card
entity: climate.smart_comfort_climate_bedroom
card_mod:
  style: |
    .comfort-card {
      --comfort-color: #your-custom-color !important;
    }
```

## Changelog

### v1.0.0
- Initial release
- Full Smart Comfort Climate integration support
- Interactive temperature adjustment
- Comfort-based color coding
- Responsive design with dark mode support

## Contributing

Found a bug or want to contribute? Please open an issue or pull request!

## Credits

Designed specifically for the Smart Comfort Climate integration, bringing intuitive comfort-based climate control to Home Assistant.