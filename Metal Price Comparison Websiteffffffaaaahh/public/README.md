# Metal Price Comparison System

A simple, clean, and beginner-friendly website to track and compare metal prices in Indian Rupees (INR).

## Features

- **Dashboard**: View live prices for Gold, Silver, Platinum, and Palladium
- **Compare**: Compare prices across different Indian cities
- **History**: View historical price trends with interactive charts
- **Admin Panel**: Manually update metal prices

## How to Run in VS Code with Live Server

### Method 1: Using Live Server Extension (Recommended)

1. **Install Live Server Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Open the Project**
   - Open the `public` folder in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will automatically open the website

3. **Alternative Method**
   - Open `index.html` in VS Code
   - Look for "Go Live" button in the bottom right corner of VS Code
   - Click it to start the server

### Method 2: Direct Browser Opening

1. Navigate to the `public` folder
2. Double-click `index.html`
3. The website will open in your default browser

## File Structure

```
public/
├── index.html      # Main HTML file
├── styles.css      # Custom CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and layout
- **Bootstrap 5**: Responsive design framework
- **JavaScript**: Interactive functionality
- **Chart.js**: Price trend visualization

## Features Breakdown

### Dashboard Page
- 4 metal price cards showing current prices
- Price change indicators (positive/negative)
- Market status overview
- Real-time update timestamps

### Compare Page
- Dropdown to select metal type
- Table comparing prices across 6 Indian cities
- Automatic highlighting of lowest and highest prices
- Clean, easy-to-read layout

### History Page
- Interactive line chart for price trends
- Toggle between 7-day and 30-day views
- Select different metals
- Smooth animations

### Admin Page
- Simple form to update prices
- Metal, price, and source selection
- Success notification on submission
- Recent updates table

## Prices in Indian Rupees

All prices are displayed in INR (₹):
- Gold: per 10 grams
- Silver: per kilogram
- Platinum: per 10 grams
- Palladium: per 10 grams

## Customization

### Change Prices
Edit the data in `script.js`:
- `cityPrices` object for city-wise comparison
- `basePrices` object for historical charts
- HTML cards in `index.html` for dashboard

### Change Colors
Edit `styles.css`:
- Primary gold color: `#D4AF37`
- Success green: `#28a745`
- Danger red: `#dc3545`

### Add More Cities
In `script.js`, add new entries to the `cityPrices` object:
```javascript
{ city: 'YourCity', price: 65500 }
```

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## No Build Process Required

This is a static website - no npm, no webpack, no build process!
Just open and run.

## Support

For any issues or questions, check that:
1. All three files (index.html, styles.css, script.js) are in the same folder
2. You have internet connection (for Bootstrap and Chart.js CDN)
3. JavaScript is enabled in your browser

Enjoy tracking metal prices! 💰
