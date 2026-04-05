const fs = require('fs');

const target = 'src/App.tsx';
let content = fs.readFileSync(target, 'utf-8');

// Add useRef
content = content.replace(
  `import { useState, useEffect } from 'react';`,
  `import { useState, useEffect, useRef } from 'react';`
);

// Add AnimatedReveal component just before AboutSection
const animatedRevealCode = `
const useIntersectionObserver = (options: any = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    const current = targetRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const AnimatedReveal = ({ children }: any) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={\`transition-all duration-[800ms] ease-out origin-top-left \${
        isVisible ? 'opacity-100 scale-100 translate-y-0 blur-none' : 'opacity-0 scale-95 -translate-y-8 blur-sm pointer-events-none'
      }\`}
    >
      {children}
    </div>
  );
};

// [ABOUT]`;

content = content.replace(`// [ABOUT]`, animatedRevealCode);

// Wrap AboutSection content
content = content.replace(
  `<div className="grid md:grid-cols-2 gap-12 text-neutral-600 dark:text-[#cccccc]">`,
  `<AnimatedReveal>\n      <div className="grid md:grid-cols-2 gap-12 text-neutral-600 dark:text-[#cccccc]">`
);
content = content.replace(
  `        </div>\n      </div>\n    </div>\n  </section>\n);`,
  `        </div>\n      </div>\n      </AnimatedReveal>\n    </div>\n  </section>\n);`
);

// Wrap SkillsSection content
content = content.replace(
  `{loading ? (`,
  `<AnimatedReveal>\n        {loading ? (`
);
content = content.replace(
  `          </div>\n        )}\n      </div>\n    </section>\n  );\n};`,
  `          </div>\n        )}\n        </AnimatedReveal>\n      </div>\n    </section>\n  );\n};`
);

// Wrap ExperienceSection content
content = content.replace(
  `<div className="relative border-l-2 border-neutral-200 dark:border-[#222222] ml-4 space-y-12">`,
  `<AnimatedReveal>\n      <div className="relative border-l-2 border-neutral-200 dark:border-[#222222] ml-4 space-y-12">`
);
content = content.replace(
  `          </ul>\n        </div>\n      </div>\n    </div>\n  </section>\n);`,
  `          </ul>\n        </div>\n      </div>\n      </AnimatedReveal>\n    </div>\n  </section>\n);`
);

// Wrap ProjectsSection content
content = content.replace(
  `<div className="grid md:grid-cols-3 gap-6">`,
  `<AnimatedReveal>\n      <div className="grid md:grid-cols-3 gap-6">`
);
content = content.replace(
  `          </div>\n        ))}\n      </div>\n    </div>\n  </section>\n);`,
  `          </div>\n        ))}\n      </div>\n      </AnimatedReveal>\n    </div>\n  </section>\n);`
);

fs.writeFileSync(target, content);
console.log('App.tsx wrapped with AnimatedReveal');
