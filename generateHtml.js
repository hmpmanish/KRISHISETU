const fs = require('fs');

const fileContent = fs.readFileSync('addDealers.js', 'utf8');
const cssContent = fs.readFileSync('css/style.css', 'utf8');

// Extract the rawData block
let rawDataMatch = fileContent.match(/const rawData = `([\s\S]*?)`;/);
if (!rawDataMatch) {
    rawDataMatch = fileContent.match(/`([\s\S]*?)`/);
}

const rawData = rawDataMatch ? rawDataMatch[1] : '';
const lines = rawData.split('\n');

let tableRows = '';

lines.forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 4) {
        let id = parts[0].trim();
        let district = parts[1].trim() || 'GONDA / GBN';
        let firmName = parts[2].trim();
        let licenseNo = parts[3].trim();
        if (!firmName || !licenseNo) return;
        
        let validUpto = parts[5] ? parts[5].trim() : "31-12-2027";
        if (!validUpto) validUpto = "31-12-2027";

        tableRows += `
            <tr>
                <td>${id}</td>
                <td>${district}</td>
                <td><strong>${firmName}</strong></td>
                <td><span class="badge badge-verified">${licenseNo}</span></td>
                <td>${validUpto}</td>
                <td><span class="text-success" style="font-weight:bold;"><i class="fa-solid fa-check-circle"></i> Verified</span></td>
            </tr>
        `;
    }
});

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KrishiSetu - Verified Dealers List</title>
    <style>${cssContent}</style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body data-theme="light">
    <nav class="navbar">
        <div class="nav-brand">
            <i class="fa-solid fa-leaf"></i>
            KrishiSetu Verified Dealers
        </div>
        <div class="nav-links">
            <a href="/" class="btn btn-primary">Back to App</a>
        </div>
    </nav>
    <div class="main-content" style="padding-top: 40px; max-width: 1200px; margin: 0 auto;">
        <h2 class="section-title">Verified Dealers Directory</h2>
        <p class="text-secondary mb-3">This is a standalone view of all 54 imported dealers across Gonda and GBN districts.</p>
        
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>District</th>
                        <th>Firm Name</th>
                        <th>License No</th>
                        <th>Valid Upto</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`;

fs.writeFileSync('dealers.html', htmlContent);
fs.writeFileSync('public/dealers.html', htmlContent);
console.log('Successfully created dealers.html inline.');
