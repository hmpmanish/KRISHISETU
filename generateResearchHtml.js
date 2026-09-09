const fs = require('fs');

const cssContent = fs.readFileSync('css/style.css', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KrishiSetu - Research & Architecture Index</title>
    <style>${cssContent}</style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .research-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .research-card {
            background: var(--surface);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            border: 1px solid var(--border);
        }
        .research-card h2 {
            color: var(--primary);
            border-bottom: 2px solid var(--border);
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .research-card h3 {
            color: var(--secondary);
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .highlight-box {
            background: rgba(39, 174, 96, 0.1);
            border-left: 4px solid var(--primary);
            padding: 15px;
            border-radius: 0 8px 8px 0;
            margin: 15px 0;
        }
        ul {
            line-height: 1.6;
            margin-bottom: 15px;
            padding-left: 20px;
        }
        li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body data-theme="light">
    <nav class="navbar">
        <div class="nav-brand">
            <i class="fa-solid fa-flask"></i>
            KrishiSetu Research Index
        </div>
        <div class="nav-links">
            <a href="/" class="btn btn-outline">Prototype</a>
            <a href="/dealers.html" class="btn btn-outline">Verified Dealers</a>
        </div>
    </nav>
    
    <div class="main-content research-container">
        
        <div class="text-center mb-3">
            <h1 style="font-size: 2.5rem; color: var(--primary);"><i class="fa-solid fa-leaf"></i> KRISHISETU</h1>
            <p class="text-secondary" style="font-size: 1.2rem;">Smart India Hackathon 2026 | Team LogicForge</p>
            <span class="badge badge-verified mt-1">Problem Statement ID: 26193</span>
        </div>

        <div class="research-card">
            <h2><i class="fa-solid fa-bullseye"></i> 1. Project Overview & Core Ideology</h2>
            <p>KrishiSetu is an AI-Based Post-Harvest Decision & Rescue Engine. It acts as a unified platform to prevent agricultural produce from spoiling by providing data-driven recommendations on whether a farmer should:</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div class="card" style="border-top: 4px solid var(--color-sell)"><strong>SELL NOW:</strong> Optimal market timing</div>
                <div class="card" style="border-top: 4px solid var(--color-store)"><strong>STORE:</strong> Shelf-life & quality guidance</div>
                <div class="card" style="border-top: 4px solid var(--color-process)"><strong>PROCESS:</strong> Routing excess to units</div>
                <div class="card" style="border-top: 4px solid var(--color-rescue)"><strong>RESCUE:</strong> Connecting bulk buyers</div>
            </div>
            <div class="highlight-box mt-2">
                <strong>Core USP:</strong> <em>AI Recommends. The Farmer Decides. (Human-in-the-Loop Paradigm)</em>
            </div>
        </div>

        <div class="research-card">
            <h2><i class="fa-solid fa-book-open"></i> 2. Research Foundation</h2>
            <h3>Government Data (ICAR & NABCONS 2022)</h3>
            <ul>
                <li>Validates a massive 15% physical produce loss problem across grains, fruits, and vegetables in India.</li>
                <li>Pinpoints market delays, inadequate cold chain storage, and uncoordinated supply routing as primary drivers.</li>
            </ul>
            <h3>IEEE Computer Vision Framework</h3>
            <ul>
                <li>Validates image-based automated crop grading and shelf-life estimation.</li>
                <li>Backs the YOLOv8 approach for real-time visual quality and disease detection on device cameras.</li>
            </ul>
        </div>

        <div class="research-card">
            <h2><i class="fa-solid fa-sitemap"></i> 3. Technical Architecture</h2>
            
            <h3>A. The AI Engine & Data Fusion</h3>
            <p><strong>Proposed Stack:</strong> Python, FastAPI, PostgreSQL, TensorFlow.js, React, AWS.</p>
            <ul>
                <li><strong>Agmarknet API:</strong> Real-time agricultural market pricing feeds.</li>
                <li><strong>IMD Weather API:</strong> Local weather forecasts & logistics planning.</li>
                <li><strong>YOLOv8 Model:</strong> Visual grade analysis and shelf-life forecasting.</li>
            </ul>

            <h3>B. Master Prototype (Live Deployment)</h3>
            <p>Engineered as an ultra-fast, static SPA deployed on Vercel to ensure flawless SIH demonstration.</p>
            <ul>
                <li><strong>decisionEngine.js:</strong> Frontend rule engine simulating AI contextual math (outputting confidence scores).</li>
                <li><strong>data.js:</strong> Local data layer with simulated batches and a Trust & Verify ecosystem containing 54 real-world dealers.</li>
                <li><strong>UI/UX:</strong> Glassmorphism styling, frosted glass effects, and dynamic micro-animations without heavy client frameworks.</li>
            </ul>
        </div>

        <div class="research-card">
            <h2><i class="fa-solid fa-chart-line"></i> 4. Feasibility, Viability & Scalability</h2>
            <h3>Risk Mitigation</h3>
            <ul>
                <li><strong>Data Quality:</strong> Validation pipelines before Computer Vision analysis.</li>
                <li><strong>Market Volatility:</strong> Confidence Scores instead of absolute predictions.</li>
                <li><strong>Connectivity Constraints:</strong> Lightweight, offline-friendly static interface.</li>
            </ul>
            <h3>Scalability (Future Scope)</h3>
            <ul>
                <li><strong>Expandable Crop-by-Crop:</strong> Iteratively scaling from Tomatoes/Potatoes to diverse cash crops and grains.</li>
                <li><strong>Modular CV Architecture:</strong> Cloud-deployable models that improve independently.</li>
                <li><strong>IoT & Voice:</strong> Cold storage sensor monitoring and multilingual voice commands.</li>
            </ul>
        </div>

        <div class="research-card">
            <h2><i class="fa-solid fa-trophy"></i> 5. Competitive Advantage</h2>
            <p>Unlike legacy players that offer isolated utilities (e.g., only price forecasting or only quality grading), KrishiSetu integrates all parameters to suggest the <strong>absolute next best step</strong>, closing the "Unified Decision Engine Gap" in the Indian AgriTech sector.</p>
        </div>

    </div>
</body>
</html>`;

fs.writeFileSync('research.html', htmlContent);
fs.writeFileSync('public/research.html', htmlContent);
fs.writeFileSync('frontend/public/research.html', htmlContent);
console.log('Successfully created research.html in root, public, and frontend/public');
