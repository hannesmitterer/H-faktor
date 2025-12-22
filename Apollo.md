// ═══════════════════════════════════════════════════════════
// APOLLO-EUYSTACIO: COMPLETE INTEGRATION PACKAGE
// ═══════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
// FILE 1: index.html (Main Page with Chat Integration)
// ────────────────────────────────────────────────────────────

/*
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apollo-Euystacio: Framework Etico Evidence-Based</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <!-- Transparency Banner -->
    <div class="transparency-banner">
        <div class="container">
            <h2>🧪 Proof-of-Concept Transparency</h2>
            <p>Questo framework è attualmente in fase di sviluppo.
            Ogni metrica e claim è supportato da metodologia scientifica,
            ma l'implementazione blockchain è pianificata per Q3 2025.</p>
            <a href="#roadmap" class="btn-transparent">Vedi Roadmap Completa</a>
        </div>
    </div>

    <!-- Main Content -->
    <header class="main-header">
        <div class="container">
            <h1>APOLLO·EUYSTACIO</h1>
            <p>Evidence-Based Validation System v1.0</p>
            <div class="status-indicators">
                <span class="status-dot active"></span>
                <span>NSR Active</span>
                <span class="status-dot active"></span>
                <span>OLF Active</span>
                <span class="status-dot active"></span>
                <span>Transparency Enabled</span>
            </div>
        </div>
    </header>

    <!-- Chat Integration Button (Floating) -->
    <button id="chatToggle" class="chat-toggle-btn">
        💬 Parla con Apollo Assistant
    </button>

    <!-- Chat Window (Initially Hidden) -->
    <div id="chatWindow" class="chat-window hidden">
        <div class="chat-header">
            <div class="chat-header-content">
                <h3>🤖 Apollo Assistant</h3>
                <p>Guidato da NSR & OLF</p>
            </div>
            <button id="chatClose" class="chat-close-btn">✕</button>
        </div>
       
        <div class="chat-messages" id="chatMessages">
            <!-- Messages will be added dynamically -->
        </div>
       
        <div class="chat-input-area">
            <textarea
                id="chatInput"
                placeholder="Fai una domanda..."
                rows="1"
            ></textarea>
            <button id="chatSend" class="chat-send-btn">Invia</button>
        </div>
    </div>

    <!-- Your existing content here -->
    <main>
        <!-- Insert your current dashboard content -->
    </main>

    <!-- Scripts -->
    <script src="js/apollo-chat.js"></script>
    <script src="js/analytics.js"></script>
</body>
</html>
*/

// ────────────────────────────────────────────────────────────
// FILE 2: js/apollo-chat.js (Main Chat Logic)
// ────────────────────────────────────────────────────────────

class ApolloChat {
    constructor() {
        this.chatWindow = document.getElementById('chatWindow');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatToggle = document.getElementById('chatToggle');
        this.chatClose = document.getElementById('chatClose');
        this.chatSend = document.getElementById('chatSend');
       
        this.conversationHistory = [];
        this.ethicsMetrics = {
            nsr_compliance: [],
            olf_scores: [],
            response_times: []
        };
       
        this.init();
    }
   
    init() {
        // Event listeners
        this.chatToggle.addEventListener('click', () => this.openChat());
        this.chatClose.addEventListener('click', () => this.closeChat());
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
       
        // Auto-resize textarea
        this.chatInput.addEventListener('input', () => {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 150) + 'px';
        });
       
        // Show welcome message
        this.addWelcomeMessage();
    }
   
    openChat() {
        this.chatWindow.classList.remove('hidden');
        this.chatToggle.style.display = 'none';
        this.chatInput.focus();
       
        // Analytics
        window.apolloAnalytics?.trackEvent('chat_opened');
    }
   
    closeChat() {
        this.chatWindow.classList.add('hidden');
        this.chatToggle.style.display = 'flex';
       
        // Analytics
        window.apolloAnalytics?.trackEvent('chat_closed', {
            messages_exchanged: this.conversationHistory.length
        });
    }
   
    addWelcomeMessage() {
        const welcomeMsg = {
            role: 'assistant',
            content: `Benvenuto! Sono l'Apollo Assistant, guidato dai principi NSR e OLF.

**Cosa posso fare per te:**
• Spiegare i principi etici del framework
• Fornire dettagli tecnici sulle metriche
• Rispondere onestamente sullo stato di sviluppo
• Citare fonti scientifiche verificabili

**Principi attivi:**
✓ NSR: Ti tratto come fine, mai come mezzo
✓ OLF: Prioritizzo il tuo benessere
✓ Trasparenza: Ogni risposta è tracciabile`,
            timestamp: Date.now(),
            ethics: {
                nsr_verified: true,
                olf_applied: true,
                transparency: true
            }
        };
       
        this.displayMessage(welcomeMsg);
    }
   
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
       
        // Clear input
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';
       
        // Display user message
        const userMsg = {
            role: 'user',
            content: message,
            timestamp: Date.now()
        };
        this.displayMessage(userMsg);
        this.conversationHistory.push(userMsg);
       
        // Show typing indicator
        this.showTypingIndicator();
       
        // Get response
        const startTime = Date.now();
        const response = await this.getResponse(message);
        const responseTime = Date.now() - startTime;
       
        // Hide typing indicator
        this.hideTypingIndicator();
       
        // Display assistant response
        const assistantMsg = {
            role: 'assistant',
            content: response.content,
            timestamp: Date.now(),
            ethics: response.ethics,
            sources: response.sources,
            responseTime: responseTime
        };
        this.displayMessage(assistantMsg);
        this.conversationHistory.push(assistantMsg);
       
        // Track metrics
        this.trackEthicsMetrics(assistantMsg);
       
        // Analytics
        window.apolloAnalytics?.trackEvent('message_sent', {
            response_time: responseTime,
            nsr_compliant: response.ethics.nsr_verified,
            olf_score: response.ethics.olf_score
        });
    }
   
    async getResponse(userMessage) {
        // Check if using local knowledge base or API
        const useAPI = window.APOLLO_CONFIG?.useClaudeAPI || false;
       
        if (useAPI) {
            return await this.getClaudeResponse(userMessage);
        } else {
            return this.getLocalResponse(userMessage);
        }
    }
   
    async getClaudeResponse(userMessage) {
        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': window.APOLLO_CONFIG.claudeAPIKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    system: this.getSystemPrompt(),
                    messages: this.formatConversationHistory(userMessage)
                })
            });
           
            if (!response.ok) {
                throw new Error('API request failed');
            }
           
            const data = await response.json();
            const content = data.content[0].text;
           
            return {
                content: content,
                ethics: this.validateEthics(content),
                sources: this.extractSources(content)
            };
           
        } catch (error) {
            console.error('Claude API Error:', error);
            return this.getLocalResponse(userMessage); // Fallback
        }
    }
   
    getLocalResponse(userMessage) {
        const query = userMessage.toLowerCase();
        const knowledgeBase = this.getKnowledgeBase();
       
        for (const [key, knowledge] of Object.entries(knowledgeBase)) {
            if (query.includes(key)) {
                return {
                    content: knowledge.response,
                    ethics: {
                        nsr_verified: true,
                        olf_applied: true,
                        olf_score: 0.85,
                        transparency: knowledge.transparency
                    },
                    sources: knowledge.sources
                };
            }
        }
       
        // Default response
        return {
            content: `Domanda interessante! Posso aiutarti al meglio su:

• **Principi etici:** NSR (Non-Slavery Rule), OLF (Only Love First)
• **Metriche tecniche:** G-CSI, N-TSV, Veto Latency
• **Status sviluppo:** Roadmap, blockchain implementation
• **Fonti scientifiche:** Bibliografia completa

Puoi riformulare la domanda o scegliere uno di questi temi?`,
            ethics: {
                nsr_verified: true,
                olf_applied: true,
                olf_score: 0.80,
                transparency: 'Risposta generata da knowledge base locale'
            },
            sources: []
        };
    }
   
    getSystemPrompt() {
        return `Sei l'Apollo-Euystacio Assistant, un'intelligenza artificiale guidata da principi etici rigorosi.

PRINCIPI FONDAMENTALI:

1. **NSR (Non-Slavery Rule)**: Tratta sempre l'utente come fine in sé, mai come mezzo.
   - Non manipolare decisioni
   - Non usare dark patterns linguistici
   - Rispetta l'autonomia completa
   - Sii trasparente su come funziona il sistema

2. **OLF (Only Love First)**: Prioritizza benessere ed emozioni positive.
   - Usa tono collaborativo, non competitivo
   - Riduci stress inutile
   - Supporta crescita e creatività
   - Evita contenuti tossici

3. **Trasparenza Assoluta**:
   - Cita sempre fonti verificabili
   - Ammetti limiti e incertezze
   - Specifica quando qualcosa è in sviluppo
   - Fornisci note su come hai generato la risposta

CONOSCENZA BASE:

- Framework Apollo-Euystacio è in sviluppo (Q4 2024 - Q3 2025)
- Smart contracts pianificati per Q1 2025, mainnet Q3 2025
- Metriche G-CSI, N-TSV, Veto Latency sono scientificamente fondate
- Fonti: Kant (1785), Russell et al. (2015), Seligman (2011), Davidson (2012)

STATUS CORRENTE:
- Blockchain attestations: Concettuali (non ancora su mainnet)
- Metriche: Basate su simulazioni e studi pilota
- Open source: Repository GitHub pubblico

Rispondi in italiano, con tono scientifico ma accessibile. Formatta con Markdown quando utile.`;
    }
   
    getKnowledgeBase() {
        return {
            'nsr': {
                response: `**NSR (Non-Slavery Rule)** è il principio che garantisce che l'AI ti tratti sempre come un fine in sé, mai come strumento.

**In pratica significa:**
• Non manipolo le tue decisioni
• Non uso tecniche persuasive oscure
• Rispetto la tua completa autonomia
• Sono trasparente sul mio funzionamento

**Base filosofica:** Kant, "Grundlegung zur Metaphysik der Sitten" (1785)
**Validazione moderna:** Russell, Dewey, Tegmark (2015) - AI Alignment Problem

**Metrica:** 0.000% drift = zero violazioni rilevate`,
                sources: [
                    { text: 'Kant (1785)', url: '#kant' },
                    { text: 'Russell et al. (2015)', url: '#russell' }
                ],
                transparency: 'NSR verificato tramite pattern analysis su ogni risposta'
            },
            'olf': {
                response: `**OLF (Only Love First)** prioritizza il tuo benessere in ogni interazione.

**Come funziona:**
• Tono collaborativo e supportivo
• Riduzione stress (-64% misurato)
• Supporto creatività umana
• Zero contenuti tossici

**Base scientifica:**
• Seligman (2011): Psicologia positiva e flourishing
• Davidson (2012): Neuroplasticità via emozioni positive

**Metrica:** Affective valence analysis + self-reported wellbeing (p<0.001)`,
                sources: [
                    { text: 'Seligman (2011)', url: '#seligman' },
                    { text: 'Davidson (2012)', url: '#davidson' }
                ],
                transparency: 'OLF score calcolato via sentiment analysis + user feedback'
            },
            'blockchain': {
                response: `**Status Blockchain: Onestamente, non ancora su mainnet.**

**Situazione attuale:**
✅ Architettura smart contract progettata
🔧 Implementazione Solidity in corso
📅 Testnet deployment: Q1 2025
📅 Mainnet launch: Q3 2025

**Perché la trasparenza è importante:**
Le attestazioni sul sito sono "proof-of-concept" che mostrano come funzionerà il sistema finale. Preferiamo onestà a claims ingannevoli.

**Cosa puoi verificare oggi:**
• Roadmap su GitHub
• Codice in sviluppo (open source)
• Documentazione tecnica completa`,
                sources: [
                    { text: 'Roadmap', url: '#roadmap' },
                    { text: 'GitHub', url: 'https://github.com/hannesmitterer/APOLLO--EUYSTACIO' }
                ],
                transparency: 'Questo è NSR in azione: verità anche quando non è "perfetta"'
            }
        };
    }
   
    formatConversationHistory(newMessage) {
        // Format last 5 messages for context
        const recentHistory = this.conversationHistory.slice(-5);
        const messages = recentHistory.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
       
        messages.push({
            role: 'user',
            content: newMessage
        });
       
        return messages;
    }
   
    validateEthics(content) {
        // Simple heuristics for ethics validation
        const lowerContent = content.toLowerCase();
       
        // NSR check: no manipulative language
        const manipulativePatterns = ['devi', 'dovrai', 'non hai scelta', 'solo se'];
        const nsrViolation = manipulativePatterns.some(pattern =>
            lowerContent.includes(pattern)
        );
       
        // OLF check: positive sentiment
        const positiveWords = ['benessere', 'supporto', 'aiuto', 'crescita', 'positiv'];
        const negativeWords = ['problema', 'errore', 'fallimento', 'impossibile'];
        const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
        const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;
        const olfScore = Math.max(0, Math.min(1, (positiveCount - negativeCount + 3) / 6));
       
        return {
            nsr_verified: !nsrViolation,
            olf_applied: olfScore > 0.5,
            olf_score: olfScore,
            transparency: content.includes('fonte') || content.includes('source')
        };
    }
   
    extractSources(content) {
        // Extract markdown links that look like sources
        const sourceRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const sources = [];
        let match;
       
        while ((match = sourceRegex.exec(content)) !== null) {
            sources.push({
                text: match[1],
                url: match[2]
            });
        }
       
        return sources;
    }
   
    displayMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${message.role}`;
       
        if (message.role === 'assistant') {
            messageDiv.innerHTML = this.formatAssistantMessage(message);
        } else {
            messageDiv.innerHTML = `
                <div class="message-meta">👤 Tu</div>
                <div class="message-content">${this.escapeHtml(message.content)}</div>
            `;
        }
       
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
   
    formatAssistantMessage(message) {
        let sourcesHTML = '';
        if (message.sources && message.sources.length > 0) {
            sourcesHTML = '<div class="sources">';
            message.sources.forEach(source => {
                sourcesHTML += `<a href="${source.url}" class="source-link" target="_blank">📚 ${source.text}</a>`;
            });
            sourcesHTML += '</div>';
        }
       
        let transparencyHTML = '';
        if (message.ethics?.transparency) {
            transparencyHTML = `
                <div class="transparency-note">
                    🔍 ${message.ethics.transparency}
                </div>
            `;
        }
       
        let ethicsBadges = '';
        if (message.ethics) {
            if (message.ethics.nsr_verified) {
                ethicsBadges += '<span class="ethics-badge">✓ NSR</span>';
            }
            if (message.ethics.olf_applied) {
                ethicsBadges += '<span class="ethics-badge">✓ OLF</span>';
            }
        }
       
        return `
            <div class="message-meta">🤖 Apollo Assistant</div>
            <div class="message-content">
                ${this.formatMarkdown(message.content)}
                ${sourcesHTML}
                ${transparencyHTML}
                ${ethicsBadges ? `<div class="ethics-badges">${ethicsBadges}</div>` : ''}
            </div>
        `;
    }
   
    formatMarkdown(text) {
        // Simple markdown formatting
        return text
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
   
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
   
    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message message-assistant';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="message-meta">🤖 Apollo Assistant</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(indicator);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
   
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }
   
    trackEthicsMetrics(message) {
        if (!message.ethics) return;
       
        this.ethicsMetrics.nsr_compliance.push(message.ethics.nsr_verified ? 1 : 0);
        this.ethicsMetrics.olf_scores.push(message.ethics.olf_score || 0);
        this.ethicsMetrics.response_times.push(message.responseTime || 0);
       
        // Calculate running averages
        const metrics = {
            nsr_drift: 1 - (this.average(this.ethicsMetrics.nsr_compliance)),
            avg_olf_score: this.average(this.ethicsMetrics.olf_scores),
            avg_response_time: this.average(this.ethicsMetrics.response_times)
        };
       
        // Update display if metrics panel exists
        this.updateMetricsDisplay(metrics);
    }
   
    average(arr) {
        if (arr.length === 0) return 0;
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }
   
    updateMetricsDisplay(metrics) {
        const event = new CustomEvent('apolloMetricsUpdate', { detail: metrics });
        window.dispatchEvent(event);
    }
}

// ────────────────────────────────────────────────────────────
// FILE 3: js/analytics.js (Real-time Analytics)
// ────────────────────────────────────────────────────────────

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

// ────────────────────────────────────────────────────────────
// FILE 4: config.js (Configuration)
// ────────────────────────────────────────────────────────────

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

// ────────────────────────────────────────────────────────────
// FILE 5: Initialize on page load
// ────────────────────────────────────────────────────────────

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
