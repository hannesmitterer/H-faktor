window.APOLLO_CONFIG = {
    // Claude API (Set to null to use local knowledge base)
    useClaudeAPI: false,  // Set to true when you have API key
    claudeAPIKey: null,   // Add your API key here: 'sk-ant-...'
    
    // Analytics
    analyticsEndpoint: null,  // Optional: your analytics server
    debug: true,  // Set to false in production
    
    // Metrics thresholds
    thresholds: {
        nsr_drift_max: 0.001,  // Maximum acceptable NSR drift
        olf_score_min: 0.70,   // Minimum acceptable OLF score
        veto_latency_max: 3.0  // Maximum acceptable response time (ms)
    }
};
