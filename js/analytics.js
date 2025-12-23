class ApolloAnalytics {
    constructor() {
        this.events = [];
        this.metrics = {
            g_csi: 0.940,
            n_tsv: 0.045,
            veto_latency: 2.55,
            nsr_drift: 0.000,
            olf_score: 0.85
        };
        
        this.init();
    }
    
    init() {
        // Listen for metrics updates
        window.addEventListener('apolloMetricsUpdate', (e) => {
            this.updateMetrics(e.detail);
        });
        
        // Update display every 5 seconds
        setInterval(() => this.refreshDisplay(), 5000);
    }
    
    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            timestamp: Date.now(),
            data: data
        };
        
        this.events.push(event);
        
        // Log to console in development
        if (window.APOLLO_CONFIG?.debug) {
            console.log('📊 Analytics Event:', event);
        }
        
        // Send to server if configured
        if (window.APOLLO_CONFIG?.analyticsEndpoint) {
            this.sendToServer(event);
        }
    }
    
    updateMetrics(newMetrics) {
        Object.assign(this.metrics, newMetrics);
        this.refreshDisplay();
    }
    
    refreshDisplay() {
        // Update NSR drift
        const nsrElement = document.querySelector('[data-metric="nsr-drift"]');
        if (nsrElement) {
            nsrElement.textContent = (this.metrics.nsr_drift * 100).toFixed(3) + '%';
        }
        
        // Update OLF score
        const olfElement = document.querySelector('[data-metric="olf-score"]');
        if (olfElement) {
            olfElement.textContent = this.metrics.olf_score.toFixed(3);
        }
        
        // Update response time
        const latencyElement = document.querySelector('[data-metric="veto-latency"]');
        if (latencyElement) {
            latencyElement.textContent = this.metrics.veto_latency.toFixed(2) + 'ms';
        }
    }
    
    async sendToServer(event) {
        try {
            await fetch(window.APOLLO_CONFIG.analyticsEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
        } catch (error) {
            console.error('Analytics send failed:', error);
        }
    }
    
    getSessionSummary() {
        return {
            total_events: this.events.length,
            session_duration: Date.now() - this.events[0]?.timestamp,
            metrics: this.metrics,
            events_by_type: this.groupEventsByType()
        };
    }
    
    groupEventsByType() {
        const grouped = {};
        this.events.forEach(event => {
            if (!grouped[event.name]) {
                grouped[event.name] = 0;
            }
            grouped[event.name]++;
        });
        return grouped;
    }
}
