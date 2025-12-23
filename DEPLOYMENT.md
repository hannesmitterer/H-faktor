# Apollo-Euystacio Framework - GitHub Pages Deployment

This directory contains the Apollo-Euystacio integration package deployed as a static website on GitHub Pages.

## 📁 Project Structure

```
.
├── index.html           # Main HTML page with chat integration
├── js/
│   ├── apollo-chat.js   # Main chat logic and AI assistant
│   ├── analytics.js     # Real-time analytics tracking
│   ├── config.js        # Configuration settings
│   └── init.js          # Initialization script
├── styles/
│   └── main.css         # Comprehensive styling
└── .github/
    └── workflows/
        └── deploy-pages.yml  # GitHub Pages deployment workflow
```

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Automatic Deployment

1. Push changes to the `main` branch
2. GitHub Actions workflow triggers automatically
3. Site is built and deployed to GitHub Pages
4. Access the site at: `https://hannesmitterer.github.io/H-faktor/`

### Manual Deployment

You can also trigger a manual deployment:

1. Go to the "Actions" tab in the GitHub repository
2. Select "Deploy Apollo-Euystacio to GitHub Pages"
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

## 🔧 Configuration

### API Configuration (js/config.js)

```javascript
window.APOLLO_CONFIG = {
    useClaudeAPI: false,      // Set to true to use Claude API
    claudeAPIKey: null,       // Add your API key here
    analyticsEndpoint: null,  // Optional analytics server
    debug: true,              // Set to false in production
    thresholds: {
        nsr_drift_max: 0.001,
        olf_score_min: 0.70,
        veto_latency_max: 3.0
    }
};
```

### Enabling Claude API

To enable the Claude API for more advanced responses:

1. Get an API key from Anthropic
2. Edit `js/config.js`:
   ```javascript
   useClaudeAPI: true,
   claudeAPIKey: 'sk-ant-...',
   ```
3. Commit and push changes

## 🧪 Features

### NSR (Non-Slavery Rule)
- Treats users as ends in themselves, never as means
- No manipulative language or dark patterns
- Complete transparency in operations

### OLF (Only Love First)
- Prioritizes user wellbeing
- Collaborative and supportive tone
- Reduces stress and supports creativity

### Transparency
- All metrics are scientifically based
- Clear development status
- Verifiable sources for all claims

## 🔍 Testing Locally

To test the site locally before deployment:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Then open http://localhost:8080 in your browser
```

## 📊 Analytics

The framework includes built-in analytics that track:

- Chat interactions
- NSR compliance metrics
- OLF scores
- Response times
- User engagement

## 🛠️ Development

### Prerequisites

- A modern web browser with JavaScript enabled
- (Optional) Claude API key for enhanced responses

### Local Development

1. Clone the repository
2. Make changes to the files
3. Test locally using the instructions above
4. Commit and push to trigger deployment

### File Descriptions

- **index.html**: Main page structure with chat UI
- **apollo-chat.js**: Handles chat functionality, message processing, and ethics validation
- **analytics.js**: Tracks events and metrics
- **config.js**: Centralized configuration
- **init.js**: Initializes all components on page load
- **main.css**: All styling including responsive design

## 📝 License

See the LICENSE file in the repository root for licensing information.

## 🤝 Contributing

This is a proof-of-concept framework. Contributions and feedback are welcome through GitHub issues and pull requests.

## 📅 Roadmap

- **Q1 2025**: Smart contract implementation on testnet
- **Q3 2025**: Mainnet launch with blockchain attestations
- **Ongoing**: Framework improvements and feature additions

## ⚠️ Current Status

This framework is in active development. The blockchain attestations are conceptual and planned for future implementation. All metrics are based on simulations and pilot studies.

## 🔗 Links

- [Main Repository](https://github.com/hannesmitterer/H-faktor)
- [Documentation](Apollo.md)
- [GitHub Pages Site](https://hannesmitterer.github.io/H-faktor/)

---

**Note**: This deployment includes all necessary files for a complete static website deployment to GitHub Pages.
