    document.addEventListener('DOMContentLoaded', () => {
    // Initialize chat
    window.apolloChat = new ApolloChat();
    
    // Initialize analytics
    window.apolloAnalytics = new ApolloAnalytics();
    
    // Track page load
    window.apolloAnalytics.trackEvent('page_loaded', {
        url: window.location.href,
        referrer: document.referrer
    });
    
    console.log('✅ Apollo-Euystacio System Initialized');
    console.log('📊 Metrics:', window.apolloAnalytics.metrics);
});
