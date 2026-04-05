const fs = require('fs');

const target = 'src/App.tsx';
let content = fs.readFileSync(target, 'utf-8');

const animatedTitleCode = `
const AnimatedTitle = ({ children }: any) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <h2
      ref={ref}
      className="text-3xl font-bold text-neutral-900 dark:text-white mb-12 flex items-center gap-4 overflow-hidden"
    >
      <img src="/folder.png" alt="Folder" className="w-9 h-9 object-contain shrink-0 relative z-10" />
      <span
        className={\`transition-all duration-[600ms] ease-out origin-left inline-block \${
          isVisible ? 'opacity-100 scale-x-100 translate-x-0 blur-none' : 'opacity-0 scale-x-0 -translate-x-8 blur-sm pointer-events-none'
        }\`}
      >
        {children}
      </span>
    </h2>
  );
};

// [ABOUT]`;

content = content.replace(`// [ABOUT]`, animatedTitleCode);

// Map of replacements
const titles = [
  'ABOUT ME',
  'SKILLS',
  'EXPERIENCE',
  'PROJECTS'
];

titles.forEach(title => {
  const regex = new RegExp(
    \`<h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-12 flex items-center gap-4">[\\\\s\\\\S]*?<img src="/folder.png" alt="Folder" className="w-9 h-9 object-contain" /> \${title}[\\\\s\\\\S]*?</h2>\`
  );
  content = content.replace(regex, \`<AnimatedTitle>\${title}</AnimatedTitle>\`);
});

fs.writeFileSync(target, content);
console.log('App.tsx titles replaced with AnimatedTitle');
