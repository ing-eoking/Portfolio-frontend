const fs = require('fs');

function updateTheme() {
    const files = ['src/App.tsx', 'src/Robot.tsx'];

    const backgroundMap = {
        '#020617': '#050505',
        '#0B1121': '#0a0a0a',
        '#0F172A': '#111111',
        '#1E293B': '#222222',
        '#334155': '#333333',
        '#475569': '#555555',
        '#64748b': '#777777',
        '#94a3b8': '#aaaaaa',
        '#cbd5e1': '#cccccc',
        '#e2e8f0': '#eeeeee',
        'rgba\\(56,189,248': 'rgba(255,49,49', // For neon red glow
        'fill-yellow-400': 'fill-[#ff5e00]' // Robot searching color
    };

    files.forEach(f => {
        if (!fs.existsSync(f)) return;
        let content = fs.readFileSync(f, 'utf8');

        // Apply background changes
        Object.keys(backgroundMap).forEach(k => {
            content = content.replace(new RegExp(k, 'ig'), backgroundMap[k]);
        });

        // Specific Neon Replacements for App.tsx
        if (f.includes('App.tsx')) {
            // Apply gradient mapping
            content = content.replace(/from-\[#38BDF8\] to-blue-900/g, 'from-[#ff3131] to-[#ff5e00]');

            // The big background orbs
            content = content.replace(/bg-\[#38BDF8\]\/5/g, 'bg-[#ff3131]/10');
            content = content.replace(/bg-\[#38BDF8\]\/10 blur-\[80px\]/g, 'bg-[#ff5e00]/20 blur-[80px]');

            // Button glow
            content = content.replace(/hover:border-\[#38BDF8\]/g, 'hover:border-[#ff3131] shadow-[0_0_15px_rgba(255,49,49,0)] hover:shadow-[0_0_15px_rgba(255,49,49,0.5)]');

            // Text colors that should alternate or be neon gradient? 
            // We'll replace remaining #38BDF8 with neon red #ff3131
            content = content.replace(/#38BDF8/g, '#ff3131');
        }

        // Specific Neon Replacements for Robot.tsx
        if (f.includes('Robot.tsx')) {
            // Replace remaining #38BDF8 with neon red #ff3131
            content = content.replace(/#38BDF8/g, '#ff3131');
            // Eyes
            content = content.replace(/fill-\[#ff3131\]/g, 'fill-[#ff3131] drop-shadow-[0_0_5px_rgba(255,49,49,0.8)]');
        }

        fs.writeFileSync(f, content);
    });
    console.log("Neon theme updated successfully.");
}

updateTheme();
