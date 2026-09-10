// app.js

const app = {
    currentUser: null,
    currentRole: null,
    currentBatchContext: null,

    init: () => {
        initDemoData();
        app.bindEvents();
        app.checkAuth();
        applyTranslations();
    },

    bindEvents: () => {
        document.getElementById('btn-theme-toggle').addEventListener('click', () => {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            Storage.set('theme', newTheme);
        });

        document.getElementById('btn-lang-toggle').addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'hi' : 'en';
            setLanguage(newLang);
        });

        document.getElementById('btn-nav-logout').addEventListener('click', () => {
            app.logout();
        });
        
        document.getElementById('btn-judge-demo').addEventListener('click', () => {
            app.startJudgeDemo();
        });

        const savedTheme = Storage.get('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        
        document.getElementById('farmer-search')?.addEventListener('input', (e) => {
            app.renderFarmerBatches(e.target.value);
        });
        
        document.getElementById('dir-search')?.addEventListener('input', (e) => {
            app.renderDirectory(e.target.value);
        });
    },

    checkAuth: () => {
        const role = Storage.get('role');
        if (role) {
            app.login(role, true);
        } else {
            app.showView('view-landing');
        }
    },

    login: (role, skipSave = false) => {
        if (!skipSave) Storage.set('role', role);
        app.currentRole = role;
        app.currentUser = INITIAL_ROLES[role];
        
        document.getElementById('btn-nav-logout').classList.remove('hidden');
        document.getElementById('nav-verify').classList.remove('hidden');
        document.getElementById('nav-dir').classList.remove('hidden');
        
        if (role === 'farmer') {
            app.showView('view-farmer');
            app.renderFarmerDashboard();
        } else if (role === 'processor') {
            app.showView('view-processor');
            app.renderProcessorDashboard();
        } else if (role === 'admin') {
            app.showView('view-admin');
            app.renderAdminDashboard();
        }
    },

    logout: () => {
        Storage.remove('role');
        app.currentRole = null;
        app.currentUser = null;
        document.getElementById('btn-nav-logout').classList.add('hidden');
        document.getElementById('nav-verify').classList.add('hidden');
        document.getElementById('nav-dir').classList.add('hidden');
        app.showView('view-landing');
    },

    resetDemo: () => {
        Storage.clearAll();
        initDemoData();
        app.showNotification("Demo data reset to initial state.", "success");
        app.logout();
    },

    showView: (viewId) => {
        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
        window.scrollTo(0,0);
        
        if (viewId === 'view-directory') app.renderDirectory();
    },

    openModal: (modalId) => {
        document.getElementById(modalId).classList.add('active');
    },

    closeModal: (modalId) => {
        document.getElementById(modalId).classList.remove('active');
    },

    showNotification: (msg, type="info") => {
        const container = document.getElementById('notification-container');
        const toast = document.createElement('div');
        toast.className = `toast`;
        
        let icon = "fa-info-circle text-info";
        if(type==="success") icon = "fa-check-circle text-success";
        if(type==="warning") icon = "fa-triangle-exclamation text-warning";
        
        toast.innerHTML = `<i class="fa-solid ${icon} mt-1"></i> <div>${msg}</div>`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    // --- FARMER LOGIC ---

    renderFarmerDashboard: () => {
        const batches = Storage.get('batches') || [];
        document.getElementById('farmer-stat-total').innerText = batches.length;
        
        const atRisk = batches.filter(b => b.spoilageRisk === 'Critical' || b.spoilageRisk === 'High').length;
        document.getElementById('farmer-stat-risk').innerText = atRisk;
        
        const connected = batches.filter(b => b.status === 'Completed' || b.status === 'Connection Pending').length;
        document.getElementById('farmer-stat-connected').innerText = connected;
        
        app.renderFarmerBatches();
        
        const rescueBanner = document.getElementById('rescue-banner');
        const rescueItems = document.getElementById('rescue-items');
        const criticalBatches = batches.filter(b => b.spoilageRisk === 'Critical');
        
        if (criticalBatches.length > 0) {
            rescueBanner.classList.remove('hidden');
            rescueItems.innerHTML = criticalBatches.map(b => `<span class="badge badge-rescue mr-1">${b.id} (${b.crop})</span>`).join(' ');
        } else {
            rescueBanner.classList.add('hidden');
        }
    },

    renderFarmerBatches: (searchTerm = "") => {
        let batches = Storage.get('batches') || [];
        if (searchTerm) {
            batches = batches.filter(b => b.crop.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        
        const tbody = document.querySelector('#farmer-batches-table tbody');
        tbody.innerHTML = '';
        
        batches.forEach(batch => {
            const ai = evaluateBatch(batch);
            const badgeClass = `badge-${ai.action.toLowerCase()}`;
            
            let actions = `<button class="btn btn-outline btn-sm" onclick="app.viewBatch('${batch.id}')">Traceability</button> `;
            if (batch.status === 'Pending Decision') {
                actions += `<button class="btn btn-primary btn-sm" onclick="app.showMagicMoment('${batch.id}')">AI Decision</button>`;
            } else if (batch.action === 'PROCESS' && batch.status !== 'Completed') {
                actions += `<button class="btn btn-secondary btn-sm" onclick="app.showProcessingOpps('${batch.id}')">Find Processor</button>`;
            }
            
            let row = `<tr>
                <td><strong>${batch.id}</strong></td>
                <td>${batch.crop}</td>
                <td>${batch.quantity} ${batch.unit}</td>
                <td><span class="badge ${badgeClass}">${ai.action}</span></td>
                <td>${batch.status}</td>
                <td>${actions}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    },

    submitBatch: () => {
        const crop = document.getElementById('inp-crop').value;
        const qty = document.getElementById('inp-qty').value;
        const quality = document.getElementById('inp-quality').value;
        const shelfLife = parseInt(document.getElementById('inp-shelflife').value);
        const market = document.getElementById('inp-market').value;
        const storage = document.getElementById('inp-storage').value === "true";
        
        if(!qty || !shelfLife) {
            app.showNotification("Please fill all required fields", "warning");
            return;
        }
        
        const batches = Storage.get('batches') || [];
        const newId = `KS-${crop.substring(0,3).toUpperCase()}-2026-00${batches.length + 1}`;
        
        const batch = {
            id: newId,
            crop: crop,
            quantity: parseInt(qty),
            unit: "Quintal",
            harvestDate: new Date().toISOString().split('T')[0],
            quality: quality,
            shelfLife: shelfLife,
            spoilageRisk: shelfLife <= 2 ? "High" : "Low",
            marketPrice: market,
            demand: "Average",
            storageAvailable: storage,
            storageCost: "Reasonable",
            processingSuitable: crop === 'Tomato' || crop === 'Potato',
            processorDemand: "Medium",
            status: "Pending Decision",
            farmerDecision: null,
            timeline: [
                { date: new Date().toLocaleString(), event: "Harvest Added & Blockchain Record Initialized (Mock)" }
            ]
        };
        
        batches.push(batch);
        Storage.set('batches', batches);
        
        app.closeModal('modal-add-batch');
        app.renderFarmerDashboard();
        
        // Trigger Simulated AI Loader
        app.openModal('modal-ai-loading');
        const progress = document.getElementById('ai-loading-progress');
        const text = document.getElementById('ai-loading-text');
        
        progress.style.width = '10%';
        text.innerText = 'Analyzing Crop Quality via YOLOv8 model...';
        
        setTimeout(() => {
            progress.style.width = '40%';
            text.innerText = 'Calculating Spoilage Risk based on shelf life...';
            
            setTimeout(() => {
                progress.style.width = '75%';
                text.innerText = 'Fetching Live Market Demand via API...';
                
                setTimeout(() => {
                    progress.style.width = '100%';
                    text.innerText = 'Generating optimal routing decision...';
                    
                    setTimeout(() => {
                        app.closeModal('modal-ai-loading');
                        app.showMagicMoment(newId);
                    }, 800);
                }, 1200);
            }, 1200);
        }, 1000);
    },

    // --- MAGIC MOMENT (AI DECISION) ---

    showMagicMoment: (batchId) => {
        const batches = Storage.get('batches');
        const batch = batches.find(b => b.id === batchId);
        app.currentBatchContext = batch;
        
        const ai = evaluateBatch(batch);
        
        const modal = document.getElementById('modal-magic');
        const badge = document.getElementById('magic-action-badge');
        const border = document.getElementById('magic-border');
        
        badge.className = `badge badge-${ai.action.toLowerCase()}`;
        badge.innerText = ai.action;
        border.style.borderTopColor = `var(--color-${ai.action.toLowerCase()})`;
        
        document.getElementById('magic-confidence').innerText = ai.confidence;
        
        const reasonsList = document.getElementById('magic-reasons');
        reasonsList.innerHTML = ai.reasons.map(r => `<li><i class="fa-solid fa-check text-success"></i> ${r}</li>`).join('');
        
        const risksList = document.getElementById('magic-risks');
        const riskTitle = document.getElementById('magic-risk-title');
        if (ai.risks.length > 0) {
            riskTitle.classList.remove('hidden');
            risksList.classList.remove('hidden');
            risksList.innerHTML = ai.risks.map(r => `<li><i class="fa-solid fa-triangle-exclamation"></i> ${r}</li>`).join('');
        } else {
            riskTitle.classList.add('hidden');
            risksList.classList.add('hidden');
        }
        
        const slider = document.getElementById('whatif-slider');
        const valDisp = document.getElementById('whatif-val');
        slider.value = batch.shelfLife;
        valDisp.innerText = batch.shelfLife;
        
        app.openModal('modal-magic');
    },

    runWhatIf: () => {
        const slider = document.getElementById('whatif-slider');
        const valDisp = document.getElementById('whatif-val');
        const newShelfLife = parseInt(slider.value);
        valDisp.innerText = newShelfLife;
        
        let simBatch = JSON.parse(JSON.stringify(app.currentBatchContext));
        simBatch.shelfLife = newShelfLife;
        
        const ai = evaluateBatch(simBatch);
        
        const badge = document.getElementById('magic-action-badge');
        const border = document.getElementById('magic-border');
        
        badge.className = `badge badge-${ai.action.toLowerCase()}`;
        badge.innerText = ai.action + " (Simulated)";
        border.style.borderTopColor = `var(--color-${ai.action.toLowerCase()})`;
        
        const reasonsList = document.getElementById('magic-reasons');
        reasonsList.innerHTML = ai.reasons.map(r => `<li><i class="fa-solid fa-check text-success"></i> ${r}</li>`).join('');
    },

    acceptDecision: () => {
        const batchId = app.currentBatchContext.id;
        let batches = Storage.get('batches');
        let idx = batches.findIndex(b => b.id === batchId);
        
        const ai = evaluateBatch(batches[idx]);
        
        batches[idx].status = 'Decision Accepted';
        batches[idx].action = ai.action;
        batches[idx].timeline.push({ date: new Date().toLocaleString(), event: `Farmer Accepted AI Recommendation: ${ai.action}` });
        
        Storage.set('batches', batches);
        app.closeModal('modal-magic');
        app.renderFarmerDashboard();
        app.showNotification("Decision saved. Updating next steps...", "success");
        
        if (ai.action === 'PROCESS') {
            setTimeout(() => {
                app.showProcessingOpps(batchId);
            }, 1000);
        }
    },
    
    overrideDecision: () => {
        const batchId = app.currentBatchContext.id;
        const newAction = prompt("Enter manual decision (SELL, STORE, PROCESS, RESCUE):", "SELL");
        if (newAction && ['SELL','STORE','PROCESS','RESCUE'].includes(newAction.toUpperCase())) {
            let batches = Storage.get('batches');
            let idx = batches.findIndex(b => b.id === batchId);
            batches[idx].status = 'Decision Overridden';
            batches[idx].action = newAction.toUpperCase();
            batches[idx].timeline.push({ date: new Date().toLocaleString(), event: `Farmer Overrode AI -> Selected ${newAction.toUpperCase()}` });
            Storage.set('batches', batches);
            app.closeModal('modal-magic');
            app.renderFarmerDashboard();
            app.showNotification("Manual decision recorded.", "info");
        }
    },

    showProcessingOpps: (batchId) => {
        const opps = Storage.get('opportunities') || [];
        const entities = Storage.get('entities') || [];
        const container = document.getElementById('opps-container');
        container.innerHTML = '';
        
        opps.forEach(o => {
            const ent = entities.find(e => e.id === o.entityId);
            const verifiedBadge = ent && ent.status.includes('VERIFIED') ? `<span class="badge badge-verified"><i class="fa-solid fa-check-circle"></i> Verified Processor</span>` : '';
            
            container.innerHTML += `
                <div class="card mb-1">
                    <div class="flex justify-between">
                        <h4>${o.product} by ${o.processor}</h4>
                        <span class="badge badge-process">${o.urgency} Demand</span>
                    </div>
                    <div class="mt-1 mb-1">${verifiedBadge}</div>
                    <p class="text-sm text-secondary"><i class="fa-solid fa-location-dot"></i> ${o.location} | Needs: ${o.quantityRequired} Qtl</p>
                    <p class="text-primary mt-1" style="font-weight:bold;">Indicative Offer: ${o.offer}</p>
                    <div class="mt-1 flex gap-1">
                        <button class="btn btn-outline btn-sm" onclick="app.openProofVault('${o.entityId}')"><i class="fa-solid fa-vault"></i> View Proof</button>
                        <button class="btn btn-primary btn-sm" onclick="app.sendConnection('${batchId}', '${o.id}')">Send Connection Request</button>
                    </div>
                </div>
            `;
        });
        
        app.openModal('modal-opps');
    },

    sendConnection: (batchId, oppId) => {
        let batches = Storage.get('batches');
        let idx = batches.findIndex(b => b.id === batchId);
        batches[idx].status = 'Connection Pending';
        batches[idx].timeline.push({ date: new Date().toLocaleString(), event: `Sent connection request to Verified Processor (Opp: ${oppId})` });
        Storage.set('batches', batches);
        
        app.closeModal('modal-opps');
        app.renderFarmerDashboard();
        app.showNotification("Connection request sent to processor.", "success");
    },

    // --- TIMELINE / BATCH VIEW ---
    viewBatch: (batchId) => {
        const batches = Storage.get('batches');
        const batch = batches.find(b => b.id === batchId);
        
        document.getElementById('batch-view-id').innerText = batch.id;
        document.getElementById('batch-view-status').innerText = batch.status;
        
        const timelineCont = document.getElementById('batch-timeline');
        timelineCont.innerHTML = batch.timeline.map((t, i) => `
            <div class="timeline-item ${i === batch.timeline.length-1 ? 'completed' : ''}">
                <span class="timeline-date">${t.date}</span>
                <div class="timeline-content">${t.event}</div>
            </div>
        `).join('');
        
        app.openModal('modal-batch-view');
    },

    showQR: () => {
        app.openModal('modal-qr');
    },

    // --- TRUST & VERIFY HUB ---
    switchVerifyTab: (tabId) => {
        document.querySelectorAll('#verify-tabs .sub-nav-item').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
        const input = document.getElementById('verify-search-input');
        if (tabId === 'entity') input.placeholder = "e.g. KS-ENT-2026-0047";
        if (tabId === 'product') input.placeholder = "e.g. KS-TOM-2026-001";
        if (tabId === 'record') input.placeholder = "Enter License or Document ID";
    },

    runVerification: () => {
        const query = document.getElementById('verify-search-input').value.trim();
        const container = document.getElementById('verify-results-container');
        
        if (!query) {
            app.showNotification("Please enter an ID to verify", "warning");
            return;
        }

        container.innerHTML = `<div class="text-center p-3"><div class="spinner"></div><p>Searching Simulated Registry...</p></div>`;
        
        setTimeout(() => {
            const entities = Storage.get('entities') || [];
            const ent = entities.find(e => e.id.toLowerCase() === query.toLowerCase());
            
            if (ent) {
                const verifiedClass = ent.status.includes('VERIFIED') ? 'text-success' : 'text-danger';
                const icon = ent.status.includes('VERIFIED') ? 'fa-circle-check' : 'fa-circle-xmark';
                
                container.innerHTML = `
                    <div class="card mt-2">
                        <div class="flex justify-between items-center mb-1">
                            <h3>${ent.name}</h3>
                            <span class="badge badge-demo">${ent.type}</span>
                        </div>
                        <h4 class="${verifiedClass} mb-2"><i class="fa-solid ${icon}"></i> ${ent.status}</h4>
                        <p><strong>Registration ID:</strong> ${ent.id}</p>
                        <p><strong>Location:</strong> ${ent.location}</p>
                        <p><strong>Categories:</strong> ${ent.categories.join(', ')}</p>
                        <p><strong>Verification Date:</strong> ${ent.verificationDate}</p>
                        <p><strong>Validity:</strong> ${ent.validity}</p>
                        
                        <div class="mt-2">
                            <button class="btn btn-outline" onclick="app.openProofVault('${ent.id}')"><i class="fa-solid fa-vault"></i> View Proof Vault</button>
                        </div>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="card mt-2 text-center" style="border-color: var(--warning);">
                        <h3 class="text-warning"><i class="fa-solid fa-circle-exclamation"></i> VERIFICATION INCOMPLETE</h3>
                        <p class="text-secondary mt-1">No sufficient proof found for ID: ${query}</p>
                        <p class="text-sm mt-1">Do not automatically assume this entity is fraudulent. Check ID spelling or request documents manually.</p>
                    </div>
                `;
            }
        }, 1000);
    },

    openProofVault: (entityId) => {
        const entities = Storage.get('entities') || [];
        const ent = entities.find(e => e.id === entityId);
        if (!ent) return;

        document.getElementById('proof-entity-name').innerText = ent.name;
        const container = document.getElementById('proof-vault-container');
        
        container.innerHTML = ent.proofs.map(p => `
            <div class="doc-mock">
                <div class="doc-header"><strong>${p.type}</strong></div>
                <div class="doc-body">
                    <p><strong>Status:</strong> <span class="${p.status==='Valid'?'text-success':'text-danger'}">${p.status}</span></p>
                    <p><strong>Source:</strong> ${p.source}</p>
                    <p><strong>Date:</strong> ${p.date}</p>
                    <p><strong>Entity:</strong> ${ent.id}</p>
                    <p style="margin-top:10px; font-size:0.8rem; border-top:1px dashed #ccc; padding-top:5px;">This is a simulated SIH demo document. Not legally binding.</p>
                </div>
            </div>
        `).join('');

        app.openModal('modal-proof-vault');
    },

    // --- VERIFIED DIRECTORY ---
    renderDirectory: (searchTerm = "") => {
        let entities = Storage.get('entities') || [];
        if (searchTerm) {
            entities = entities.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.type.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        
        const grid = document.getElementById('directory-grid');
        grid.innerHTML = '';
        
        entities.forEach(ent => {
            const verifiedClass = ent.status.includes('VERIFIED') ? 'text-success' : 'text-danger';
            grid.innerHTML += `
                <div class="card">
                    <h4>${ent.name}</h4>
                    <p class="text-sm text-secondary mb-1">${ent.type} | ${ent.location}</p>
                    <p class="${verifiedClass} text-sm" style="font-weight:bold;">${ent.status}</p>
                    <div class="mt-2">
                        <button class="btn btn-outline btn-sm w-full" onclick="app.openProofVault('${ent.id}')">View Evidence</button>
                    </div>
                </div>
            `;
        });
    },

    // --- CROP HEALTH ---
    simulateHealthScan: () => {
        app.showNotification("Mock image uploaded. Analyzing...", "info");
        setTimeout(() => {
            document.getElementById('health-result').style.display = 'block';
        }, 1500);
    },

    // --- AI ASSISTANT ---
    toggleChat: () => {
        document.getElementById('chat-widget').classList.toggle('active');
    },

    sendChatMessage: () => {
        const input = document.getElementById('chat-input');
        const msg = input.value.trim();
        if(!msg) return;
        
        const body = document.getElementById('chat-body');
        body.innerHTML += `<div class="chat-msg user">${msg}</div>`;
        input.value = '';
        body.scrollTop = body.scrollHeight;

        // Mock AI logic
        setTimeout(() => {
            const lmsg = msg.toLowerCase();
            let reply = ASSISTANT_KNOWLEDGE["default"];
            if (lmsg.includes('weak') || lmsg.includes('market')) reply = ASSISTANT_KNOWLEDGE["weak"];
            if (lmsg.includes('process')) reply = ASSISTANT_KNOWLEDGE["process"];
            if (lmsg.includes('spoil') || lmsg.includes('shelf')) reply = ASSISTANT_KNOWLEDGE["spoil"];
            if (lmsg.includes('trust') || lmsg.includes('verify') || lmsg.includes('fake')) reply = ASSISTANT_KNOWLEDGE["trust"];

            body.innerHTML += `<div class="chat-msg assistant">${reply}</div>`;
            body.scrollTop = body.scrollHeight;
        }, 800);
    },

    // --- PROCESSOR LOGIC ---
    renderProcessorDashboard: () => {
        const batches = Storage.get('batches') || [];
        const tbody = document.querySelector('#processor-market-table tbody');
        tbody.innerHTML = '';
        
        const available = batches.filter(b => b.action === 'PROCESS' || b.status === 'Connection Pending');
        
        available.forEach(batch => {
            let actions = `<button class="btn btn-primary btn-sm" onclick="app.processorAccept('${batch.id}')">Accept Connection</button>`;
            if (batch.status === 'Completed') {
                actions = `<span class="badge badge-success">Procured</span>`;
            }
            
            let row = `<tr>
                <td>Rajesh Kumar <i class="fa-solid fa-circle-check text-success" title="Farmer Verified"></i></td>
                <td>Uttar Pradesh</td>
                <td>${batch.crop}</td>
                <td>${batch.quantity} Qtl</td>
                <td>${batch.quality}</td>
                <td>${actions}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    },

    processorAccept: (batchId) => {
        let batches = Storage.get('batches');
        let idx = batches.findIndex(b => b.id === batchId);
        batches[idx].status = 'Completed';
        batches[idx].timeline.push({ date: new Date().toLocaleString(), event: `AgroFresh Processing Unit (Verified Entity) accepted the batch.` });
        Storage.set('batches', batches);
        
        app.renderProcessorDashboard();
        app.showNotification(`Connection accepted. Traceability updated.`, "success");
    },

    // --- ADMIN LOGIC ---
    renderAdminDashboard: () => {
        const batches = Storage.get('batches') || [];
        document.getElementById('admin-stat-batches').innerText = batches.length;
        
        let vol = 0;
        batches.forEach(b => vol += b.quantity);
        document.getElementById('admin-stat-volume').innerText = vol;

        const decisionCounts = { SELL: 0, STORE: 0, PROCESS: 0, RESCUE: 0 };
        batches.forEach(b => {
            const ai = evaluateBatch(b);
            decisionCounts[ai.action]++;
        });
        
        renderCSSBarChart('chart-decisions', [
            { label: 'SELL', value: decisionCounts.SELL, color: 'var(--color-sell)' },
            { label: 'STORE', value: decisionCounts.STORE, color: 'var(--color-store)' },
            { label: 'PROCESS', value: decisionCounts.PROCESS, color: 'var(--color-process)' },
            { label: 'RESCUE', value: decisionCounts.RESCUE, color: 'var(--color-rescue)' }
        ]);
        
        renderCSSBarChart('chart-crops', [
            { label: 'Wheat', value: batches.filter(b=>b.crop==='Wheat').reduce((acc,b)=>acc+b.quantity,0) },
            { label: 'Potato', value: batches.filter(b=>b.crop==='Potato').reduce((acc,b)=>acc+b.quantity,0) },
            { label: 'Tomato', value: batches.filter(b=>b.crop==='Tomato').reduce((acc,b)=>acc+b.quantity,0) }
        ]);
    },
    
    // --- MASTER DEMO SCENARIO ---
    startJudgeDemo: () => {
        app.resetDemo();
        setTimeout(() => {
            app.showNotification("Judge Demo Started. Step 1: Farmer Dashboard", "info");
            app.login('farmer');
            
            setTimeout(() => {
                document.getElementById('farmer-search').value = "Tomato";
                app.renderFarmerBatches("Tomato");
                app.showNotification("Step 2: Looking at a Tomato batch at risk.", "info");
                
                setTimeout(() => {
                    const batches = Storage.get('batches');
                    const tomBatch = batches.find(b=>b.crop==='Tomato');
                    if(tomBatch) {
                        app.showNotification("Step 3: Triggering AI Decision Engine", "info");
                        app.showMagicMoment(tomBatch.id);
                        
                        setTimeout(() => {
                            app.showNotification("Notice the PROCESS recommendation and Evidence.", "info");
                        }, 2000);
                    }
                }, 3000);
            }, 2000);
        }, 500);
    }
};

document.addEventListener('DOMContentLoaded', app.init);
