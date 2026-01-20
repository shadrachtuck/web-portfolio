import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDownloadPDF = async () => {
    try {
      // Check if the PDF file exists
      const response = await fetch('/resume.pdf', { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('PDF file not found');
      }

      // Create a link to download the PDF
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Shadrach_Tuck_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('PDF file not found. Please ensure resume.pdf is placed in the public folder.');
    }
  };

  const handlePrint = () => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/9ae61d99-5cfa-4d18-a3ac-b9bc61952471',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Resume.jsx:handlePrint',message:'Print button clicked',data:{resumeExists:!!document.getElementById('resume'),resumeDisplay:document.getElementById('resume')?.style.display,resumeVisibility:document.getElementById('resume')?.style.visibility,resumeChildren:document.getElementById('resume')?.children.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    window.print();
  };

  return (
    <section id="resume" ref={ref} className="min-h-screen px-6 md:px-16 lg:px-24 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header with Download and Print Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 no-print">
          <h2 className="text-4xl md:text-5xl lg:text-6xl">
            Resume
          </h2>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="square-button green-button-glow flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2.5 border transition-all font-ds-terminal text-xs md:text-sm glitch-effect glitch-layers"
              data-text="Print Resume"
            >
              <span>Print Resume</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="square-button green-button-glow flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2.5 border transition-all font-ds-terminal text-xs md:text-sm glitch-effect glitch-layers"
              data-text="Download PDF"
            >
              <span>Download PDF</span>
            </motion.button>
          </div>
        </div>

        {/* Resume Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 shadow-lg overflow-hidden"
        >
          <div className="resume-container">
            <div className="resume-header">
              <h1>Shadrach Tuck</h1>
              <div className="resume-subtitle">Software Developer | Full-Stack Engineer | UX/UI Designer</div>
              <div className="resume-contact">
                <div>2723 N Cole Rd, Boise, USA, 83704</div>
                <div>208.283.3045</div>
                <div>shadrachtuck@gmail.com</div>
              </div>
            </div>
            
            <div className="resume-content">
              <div className="resume-summary">
                Software developer with over 5 years of professional experience building scalable, user-centric applications across diverse technology stacks. Expertise in full-stack development with C#/.NET, React, Vue.js, and modern JavaScript frameworks. Proven track record of enhancing application usability through RESTful APIs, microservices architecture, and responsive UI design. Skilled in Agile methodologies, automated testing, and cross-functional team leadership. Passionate about creating intuitive user experiences while maintaining clean, efficient, and maintainable code.
              </div>
              
              <div className="resume-section">
                <h2 className="resume-section-title">Professional Experience</h2>
                
                <div className="resume-job">
                  <div className="resume-job-header">
                    <div>
                      <div className="resume-job-title">Freelance Full-Stack Developer, Mishap Creative Works</div>
                      <div className="resume-job-location">Boise, ID / Remote</div>
                    </div>
                    <div className="resume-job-date">Jan 2019 - Present</div>
                  </div>
                  <ul>
                    <li>Developed and deployed fast, secure dynamic web applications using React, Vue.js, Next.js, and custom CMS-based solutions for clients across diverse sectors.</li>
                    <li>Implemented agile methodologies to streamline project workflows, consistently delivering projects on time and exceeding client expectations.</li>
                    <li>Created responsive, intuitive UI/UX designs that drove measurable improvements in user engagement and retention metrics.</li>
                    <li>Built headless CMS implementations using WordPress with Advanced Custom Fields, Prismic CMS, and Faust.js for enhanced performance and flexibility.</li>
                    <li>Integrated GraphQL APIs to optimize data fetching and improve application performance.</li>
                    <li>Developed modular, reusable component architectures that reduced development time and improved code maintainability.</li>
                    <li>Mentored junior developers on best practices, code reviews, and modern development workflows.</li>
                  </ul>
                </div>
                
                <div className="resume-job">
                  <div className="resume-job-header">
                    <div>
                      <div className="resume-job-title">Software Developer, Matraex</div>
                      <div className="resume-job-location">Boise, ID / Remote</div>
                    </div>
                    <div className="resume-job-date">Jun 2024 - Jun 2025</div>
                  </div>
                  <ul>
                    <li>Engineered scalable OOP features utilizing RESTful APIs and microservices architecture, enhancing application usability and resulting in consistent positive client feedback.</li>
                    <li>Developed automated data-mining and web-scraping scripts using PuppeteerJS, significantly improving data collection efficiency and providing valuable business insights.</li>
                    <li>Optimized MySQL databases and crafted efficient queries, improving data retrieval speed by 30% and overall application performance.</li>
                    <li>Created and deployed features for iOS applications powered by web APIs, enhancing user engagement and cross-platform functionality.</li>
                    <li>Designed modular application architectures that streamlined updates and reduced deployment time by 40%, fostering more agile project cycles.</li>
                    <li>Developed bash scripts and CRON jobs for automated server maintenance and process management.</li>
                    <li>Collaborated with cross-functional teams using Git for version control and maintained comprehensive technical documentation.</li>
                    <li>Enhanced application performance through code refactoring, leading to substantial improvements in load times and user satisfaction.</li>
                  </ul>
                </div>
                
                <div className="resume-job">
                  <div className="resume-job-header">
                    <div>
                      <div className="resume-job-title">Software Developer, UX/UI Designer & Project Manager, Almanac Systems</div>
                      <div className="resume-job-location">Boise, ID / Remote</div>
                    </div>
                    <div className="resume-job-date">Jan 2020 - Jan 2023</div>
                  </div>
                  <ul>
                    <li>Architected and developed data capture and document sharing applications for U.S. Army JPEO's Enterprise Data Management (EDM) division and Navy Medicine's BUMED-M44 survey application.</li>
                    <li>Built full-stack applications using C#/.NET with Blazor, React, Vue.js, TypeScript, and PHP, backed by SQL, Postgres, and MongoDB databases on Azure Cloud infrastructure.</li>
                    <li>Led cross-functional teams as Scrum Master, improving project delivery timelines by 25% and fostering strong team collaboration.</li>
                    <li>Spearheaded major UI/UX overhaul that improved system usability scores by 35% and significantly enhanced client satisfaction.</li>
                    <li>Implemented comprehensive automated testing protocols using Selenium, Cypress, and NUnit, reducing bugs by 45% and enhancing software reliability.</li>
                    <li>Designed user stories and workflows using Figma for prototyping and Enterprise Architect for infrastructure planning.</li>
                    <li>Developed .NET Core/Vue/MySQL application for automotive industry client (Permaplate) on Magentrix CMS platform.</li>
                    <li>Optimized application performance through database query optimization and efficient API design patterns.</li>
                    <li>Conducted thorough code reviews and maintained comprehensive technical documentation for seamless knowledge transfer.</li>
                  </ul>
                </div>
                
                <div className="resume-job">
                  <div className="resume-job-header">
                    <div>
                      <div className="resume-job-title">E-commerce Developer & Technical Lead, Mishap Records</div>
                      <div className="resume-job-location">Boise, ID / Remote</div>
                    </div>
                    <div className="resume-job-date">Jun 2017 - Present</div>
                  </div>
                  <ul>
                    <li>Architected and developed custom Shopify e-commerce platform achieving thousands of monthly visitors and global sales distribution.</li>
                    <li>Built custom Shopify themes and features using Liquid templating, JavaScript, and REST APIs to enhance user experience and increase conversion rates.</li>
                    <li>Implemented SEO optimization strategies and analytics tracking, resulting in 150% increase in organic traffic.</li>
                    <li>Developed custom WordPress solutions using Advanced Custom Fields for dynamic content management and improved editorial workflows.</li>
                    <li>Currently developing multiple custom-coded artist websites using modern JavaScript frameworks and headless CMS architectures.</li>
                    <li>Integrated third-party APIs for payment processing, inventory management, and marketing automation.</li>
                  </ul>
                </div>
                
                <div className="resume-job">
                  <div className="resume-job-header">
                    <div>
                      <div className="resume-job-title">Product Development Intern, Ventive</div>
                      <div className="resume-job-location">Boise, ID</div>
                    </div>
                    <div className="resume-job-date">Jul 2019 - Dec 2019</div>
                  </div>
                  <ul>
                    <li>Learned Agile/Scrum methodology and contributed to ReactJS web application development for project management platform.</li>
                    <li>Collaborated on UX/UI design using Figma, designing user flows, building components, and staging interactive prototypes.</li>
                    <li>Developed comprehensive knowledge base using Webflow, improving resource accessibility and team productivity.</li>
                    <li>Participated in sprint planning, daily standups, and retrospectives to deliver features on schedule.</li>
                  </ul>
                </div>
              </div>
              
              <div className="resume-section">
                <h2 className="resume-section-title">Technical Skills</h2>
                
                <div className="resume-skills-grid">
                  <div className="resume-skill-category">
                    <h3>Front-End Development</h3>
                    <p>HTML5, CSS3, SCSS, JavaScript (ES5/6+), TypeScript, React.js, Next.js, Vue.js (Vue 3), Blazor, TailwindCSS, Bootstrap, Shadcn, Vuetify, jQuery, Pinia, Element UI, Kendo UI, Webpack, Vite</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>Back-End Development</h3>
                    <p>C#, .NET Core, PHP, Node.js, Express, Python, Flask, SQL, GraphQL, RESTful API Development, Microservices Architecture</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>Databases</h3>
                    <p>MySQL, PostgreSQL, MongoDB, Mongoose, SQL Server, Database Design & Optimization</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>Testing & Quality Assurance</h3>
                    <p>Cypress, Selenium, NUnit Framework, Unit Testing, Integration Testing, End-to-End Testing</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>DevOps & Cloud</h3>
                    <p>Docker, Azure Cloud, AWS, Google Cloud, Vercel, Digital Ocean, CI/CD (Circle CI), Server Management, Bash Scripting, CRON Jobs</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>Development Tools</h3>
                    <p>Git, GitHub, GitLab, NPM, Yarn, Visual Studio, VS Code, Postman, Chrome DevTools</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>CMS & E-commerce</h3>
                    <p>WordPress (Advanced Custom Fields), Shopify (Liquid), Webflow, Prismic CMS, Faust.js, Magentrix, Headless CMS Architecture</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>Project Management & Methodology</h3>
                    <p>Agile/Scrum, Jira, Azure DevOps, Enterprise Architect, UML, Technical Documentation, Code Review</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>UX/UI Design</h3>
                    <p>Figma, Adobe XD, Balsamiq, Responsive Design, User Stories & Flows, Prototyping, Accessibility (WCAG)</p>
                  </div>
                  
                  <div className="resume-skill-category">
                    <h3>Other Technical Skills</h3>
                    <p>PuppeteerJS (Web Scraping), Data Structures & Algorithms, Object-Oriented Programming, Design Patterns, Performance Optimization, SEO, Web Analytics</p>
                  </div>
                </div>
              </div>
              
              <div className="resume-section">
                <h2 className="resume-section-title">Education</h2>
                
                <div className="resume-education-item">
                  <div className="resume-education-header">
                    <div className="resume-education-title">Coding Dojo</div>
                    <div className="resume-education-date">Jan 2019 - May 2019</div>
                  </div>
                  <div className="resume-education-degree">Full-Stack Development Certificate, Boise, ID</div>
                  <div className="resume-education-description">
                    Intensive 14-week immersive full-stack coding bootcamp. Completed over 1,000 hours of programming instruction across three technology stacks:
                  </div>
                  <ul>
                    <li><strong>Python Stack:</strong> Python, Flask, MySQL, Object-Oriented Programming</li>
                    <li><strong>MEAN Stack:</strong> MongoDB, Express, Angular, Node.js</li>
                    <li><strong>C# Stack:</strong> C#, .NET Core, SQL Server, Entity Framework</li>
                  </ul>
                  <ul style={{ marginTop: '10px' }}>
                    <li>Built full-stack web applications from scratch in under 4.5 hours during timed assessments</li>
                    <li>Earned "The Creative" distinction for ingenuity and design excellence during graduation</li>
                    <li>Demonstrated proficiency in data structures, algorithms, and software design patterns</li>
                  </ul>
                </div>
                
                <div className="resume-education-item">
                  <div className="resume-education-header">
                    <div className="resume-education-title">Boise State University</div>
                    <div className="resume-education-date">Sep 2016 - May 2017</div>
                  </div>
                  <div className="resume-education-degree">Arts Studies, Boise, ID</div>
                </div>
              </div>
              
              <div className="resume-section">
                <h2 className="resume-section-title">Certifications & Professional Development</h2>
                
                <ul>
                  <li><strong>Full-Stack Development Certificate</strong> - Coding Dojo (2019)</li>
                  <li><strong>Agile/Scrum Methodology</strong> - Practical experience as Scrum Master and team member</li>
                  <li><strong>Cloud Platform Experience</strong> - Azure, AWS, Google Cloud deployment and management</li>
                </ul>
              </div>
              
              <div className="resume-section">
                <h2 className="resume-section-title">Notable Projects & Achievements</h2>
                
                <ul>
                  <li>Developed mission-critical applications for U.S. Army and Navy Medicine, handling sensitive data with high security requirements</li>
                  <li>Built and optimized e-commerce platform serving customers across all continents with 99.9% uptime</li>
                  <li>Reduced software bugs by 45% through implementation of comprehensive automated testing frameworks</li>
                  <li>Improved application performance metrics by 30-40% through database optimization and code refactoring</li>
                  <li>Led UI/UX overhaul resulting in 35% improvement in system usability scores</li>
                  <li>Contributed to open-source projects and community development initiatives</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}

