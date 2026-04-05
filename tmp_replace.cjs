const fs = require('fs');

const target = 'src/App.tsx';
let content = fs.readFileSync(target, 'utf-8');

// 1. Add theme and toggleTheme to Navbar
content = content.replace(
  `const Navbar = ({ activeSection }) => {`,
  `const Navbar = ({ activeSection, theme, toggleTheme }) => {`
);

content = content.replace(
  `        <ul className="hidden md:flex gap-8">`,
  `        <ul className="hidden md:flex gap-8 items-center">`
);

content = content.replace(
  `            </li>\n          ))}\n        </ul>`,
  `            </li>\n          ))}\n          <li>\n            <button onClick={toggleTheme} className="text-xl p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-[#222222] transition-colors">\n              {theme === 'dark' ? '☀️' : '🌙'}\n            </button>\n          </li>\n        </ul>`
);

// 2. Add state to App
content = content.replace(
  `// --- Main ---\nfunction App() {\n  const [activeSection, setActiveSection] = useState('home');\n\n  useEffect(() => {\n    const handleScroll = () => {`,
  `// --- Main ---\nfunction App() {\n  const [activeSection, setActiveSection] = useState('home');\n  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');\n\n  useEffect(() => {\n    if (theme === 'dark') {\n      document.documentElement.classList.add('dark');\n    } else {\n      document.documentElement.classList.remove('dark');\n    }\n    localStorage.setItem('theme', theme);\n  }, [theme]);\n\n  useEffect(() => {\n    const handleScroll = () => {`
);

// 3. Pass theme to Navbar in App
content = content.replace(
  `<Navbar activeSection={activeSection} />`,
  `<Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />`
);

// 4. Color replacements
// Backgrounds
content = content.replace(/bg-\[\#0a0a0c\]/g, 'bg-white dark:bg-[#0a0a0c]');
content = content.replace(/bg-\[\#050505\]/g, 'bg-neutral-50 dark:bg-[#050505]');
content = content.replace(/bg-\[\#111111\]/g, 'bg-white dark:bg-[#111111]');

// Texts
content = content.replace(/text-white/g, 'text-neutral-900 dark:text-white');
content = content.replace(/text-\[\#cccccc\]/g, 'text-neutral-600 dark:text-[#cccccc]');
content = content.replace(/text-\[\#aaaaaa\]/g, 'text-neutral-500 dark:text-[#aaaaaa]');
content = content.replace(/text-\[\#777777\]/g, 'text-neutral-400 dark:text-[#777777]');
content = content.replace(/text-\[\#eeeeee\]/g, 'text-neutral-800 dark:text-[#eeeeee]');
content = content.replace(/text-\[\#555555\]/g, 'text-neutral-400 dark:text-[#555555]');

// Borders
content = content.replace(/border-\[\#222222\]/g, 'border-neutral-200 dark:border-[#222222]');

fs.writeFileSync(target, content);
console.log('App.tsx string replacements complete.');
