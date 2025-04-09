// pages/index.js
import { useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import { 
  faCertificate,
  faAddressCard, 
  faGraduationCap,
  faCode,
  faLanguage,
  faBriefcase,
  faProjectDiagram,
  faLink,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Home.module.css';


export default function Home() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  

  useEffect(() => {
    const handleScroll = () => {
      return scrollY.onChange((latest) => {
      // Your scroll handling logic here
      // latest will be a value between 0 and 1
      const scrollPosition = latest * document.body.scrollHeight;
      // Scroll progress calculation
      const scrollTop = latest;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      setScrollProgress(progress);
      
  
      // Active section detection
      const sections = document.querySelectorAll(`.${styles.section}`);
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionOffsetTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (
          scrollPosition  >= sectionOffsetTop - 150 && // 100px offset for early detection
          scrollPosition  < sectionOffsetTop + sectionHeight - windowHeight / 3
        ) {
          currentSection = sectionId;
        }
        
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, scrollY]);
  
  
  // Keep your IntersectionObserver for animations only
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
  
    sections.forEach(section => {
      observer.observe(section);
    });
  
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

 
    
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const offset = 100;
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
  
      // Update active section immediately for better UX
      setActiveSection(sectionId);
    }
  };



  

  return (
    <div className={styles.container}>
      <Head>
        <title>Dhia Eddine Naija - Professional CV</title>
        <meta name="description" content="Full Stack Developer with 5+ years experience" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2c3e50" />
      </Head>

      {/* Scroll Progress Indicator */}
      <div className={styles.scrollProgressContainer}>
        <div
          className={styles.scrollProgressBar}
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {['about', 'experiences', 'projects', 'certifications', 'skills', 'education', 'contact'].map((section) => (
            <li key={section} className={styles.navItem}>
              <button
                onClick={(e) => handleNavClick(section, e)}
                className={`${styles.navLink} ${
                  activeSection === section ? styles.active : ''
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className={styles.navIndicator}></span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <header className={styles.hero}>
  <div className={styles.heroContent}>
    <div className={styles.heroText}>
      <h1 className={styles.heroTitle}>Dhia Eddine Naija</h1>
      <div className={styles.heroSubtitle}>
        <span className={styles.location}>📍 Sousse, Tunisia</span>
        <span className={styles.divider}>|</span>
        <span className={styles.tagline}>Full Stack Developer</span>
      </div>
      <div className={styles.heroHighlight}>
        <p>Specializing in modern web development with React, Node.js, and Next.js</p>
        <div className={styles.techStack}>
          <span className={styles.techPill}>JavaScript</span>
          <span className={styles.techPill}>TypeScript</span>
          <span className={styles.techPill}>React.js</span>
          <span className={styles.techPill}>Node.js</span>
          <span className={styles.techPill}>Next.js</span>
        </div>
      </div>
    </div>
    <div className={styles.heroActions}>
      <a href="#contact" className={styles.primaryButton}>Contact Me</a>
      <a href="#projects" className={styles.secondaryButton}>View Projects</a>
    </div>
  </div>
</header>

      <main>
        <section id="about" className={styles.section}>
          <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faAddressCard} /> Summary</h2>
          <div className={styles.sectionContent}>
            <p className={styles.highlightText}>
              Experienced Full Stack Web Developer :
            </p>
            <ul className={styles.keyAchievements}>
              <li>Experienced Full Stack Developer proficient in maintaining and building applications using the MERN stack and Next.js.</li>
              <li>Expertise in creating Next.js-based projects, including ecommerce platforms and dashboards, with a focus on performance and user experience</li>
              <li>Experienced in designing, developing, and maintaining scalable web applications with robust backend APIs</li>
            </ul>
          </div>
        </section>

        <section id="experiences" className={styles.section}>
          <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faBriefcase} /> Work Experiences</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h3>Web application internship</h3>
              <div className={styles.timelineDetails}>
                <span>Februray 2023 - july 2023</span>
                <span>Sousse, TN</span>
              </div>
              <ul className={styles.responsibilities}>
              <li><div>
                  <strong>Needs Analysis:</strong> Collaborated with stakeholders to gather and analyze project requirements, defining the site&apos;s key features.
                  </div>
                </li>
                <li>
                  <strong>Design and Development:</strong> Designed the site&apos;s architecture and developed functionalities using modern technologies, creating an intuitive and responsive user interface and implementing a database for dynamic content management.
                </li>
                <li>
                  <strong>Testing and Optimization:</strong> Conducted rigorous testing to ensure quality and performance, optimizing code for faster loading speeds and an enhanced user experience.
                </li>
                <li>
                  <strong>Deployment:</strong> Supervised the site&apos;s deployment, ensuring it was fully functional, accessible, and ready for end users.
                </li>
              </ul>
            </div>

            <div className={styles.timelineItem}>
              <h3>Full Stack Developer - Freelancer</h3>
              <div className={styles.timelineDetails}>
                <span>2024 - Present</span>
              </div>
              <ul className={styles.responsibilities}>
              <li>
                  Developed and deployed scalable web applications as a Fullstack Developer, specializing in <strong>JavaScript</strong>, <strong>backend development</strong>, <strong>Next.js</strong>, and <strong>MERN stack</strong>.
                </li>
                <li>
                  Built end-to-end solutions, including intuitive user interfaces, RESTful APIs, and database management for dynamic, data-driven applications.
                </li>
                <li>
                  Delivered high-performance MERN stack projects, from concept to deployment, ensuring seamless functionality and optimal user experience.
                </li>
                <li>
                  Optimized application performance through rigorous testing, code refinement, and efficient deployment strategies.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faProjectDiagram} /> Projects</h2>
          <div className={styles.projectsGrid}>
            <div className={styles.projectCard}>
              <a
                  href="https://nextjs-dashboard-projects.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectTitleLink} // Optional: Add custom styling
              >
                <h3>Dashboard Platform <span className={styles.externalIcon}>↗</span></h3>
              </a>
              <p>A full-stack Dashboard solution built with Next.js</p>
              <div className={styles.techStack}>
                <span>React</span>
                <span>Typescript</span>
                <span>Tailwind CSS</span>
                <span>Vercel/postgres</span>
              </div>
                <a  href="https://github.com/Dhia7/nextjs-dashboard"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.projectLink}
                  >
                    View Project <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.linkIcon} />
                </a>
              </div>

            <div className={styles.projectCard}>
              <a
                  href="https://technotes-kd2z.onrender.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectTitleLink} // Optional: Add custom styling
              >
           
              <h3>Technotes project <span className={styles.externalIcon}>↗</span></h3>
              </a>
              <p>A MernStack application built with a backend API&apos;s.</p>
              <div className={styles.techStack}>
                <span>MongoDB</span>
                <span>Express</span>
                <span>React</span>
                <span>Node.js</span>
                <span>reduxJs</span>
                <span>Jwt-decode</span>
              </div>
              <a  href="https://github.com/Dhia7/technotes" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.projectLink}
                  >
                    View Project <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.linkIcon} />
                    </a>
            </div>

            <div className={styles.projectCard}>
              <a
                  href="https://cv-website-nine-chi.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectTitleLink} // Optional: Add custom styling
              >
              <h3>Portfolio Website <span className={styles.externalIcon}>↗</span></h3>
              </a>
              <p>A personal portfolio website built with Next.js and Tailwind CSS.</p>
              <div className={styles.techStack}>
                <span>Next.js</span>
                <span>React</span>
                <span>Typescript</span>
                <span>Tailwind CSS</span>
              </div>
              <a href="https://github.com/Dhia7/cv-website" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.projectLink}
              >
                View Project <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.linkIcon} />
                </a>
            </div>
          </div>
        </section>

        <section id="certifications" className={styles.section}>
          <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faCertificate} /> Certifications</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h3 style={{ display: 'flex', alignItems: 'center' }}> <FontAwesomeIcon icon={faFreeCodeCamp}/>_BackEnd Development and APIs</h3>
              <div className={styles.timelineDetails}>
                <span>Februray 14 - 2025</span>|
                <a style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer"  href='https://www.freecodecamp.org/certification/Dhianaija/back-end-development-and-apis'><span>https://www.freecodecamp.org/certification/Dhianaija/back-end-development-and-apis</span></a>
              </div>
              <ul className={styles.responsibilities}>
                <li>Managing Packages with NPM</li>
                <li>Basic Node and Express.js</li>
                <li>MongoDB and Mongoose</li>
                <li>Back End Development and APIs Projects</li>
              </ul>
            </div>

            <div className={styles.timelineItem}>
              <h3 style={{ display: 'flex', alignItems: 'center' }}><FontAwesomeIcon icon={faFreeCodeCamp} />_Legacy Javascript Algorithms and Data Structures</h3>
              <div className={styles.timelineDetails}>
                <span>December 10 - 2024</span>|
                <a style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer"  href='https://www.freecodecamp.org/certification/Dhianaija/javascript-algorithms-and-data-structures'><span>https://www.freecodecamp.org/certification/Dhianaija/javascript-algorithms-and-data-structures</span></a>
              </div>
              <ul className={styles.responsibilities}>
                <li>Basic JavaScript</li>
                <li>ES6</li>
                <li>Regular Expressions</li>
                <li>Debugging</li>
                <li>Basic Data Structures</li>
                <li>Basic Algorithm Scripting</li>
                <li>Object Oriented Programming</li>
                <li>Functional Programming</li>
                <li>Intermediate Algorithm Scripting</li>
                <li>JavaScript Algorithms and Data Structures Projects</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className={styles.section}>
          <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faCode} /> Technical Skills</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h3>Frontend</h3>
              <ul className={styles.skillList}>
                <li>React/Redux</li>
                <li>TypeScript</li>
                <li>Next.js</li>
                <li>TailwindCSS</li>
              </ul>
            </div>

            <div className={styles.skillCategory}>
              <h3>Backend</h3>
              <ul className={styles.skillList}>
                <li>Node.js</li>
                <li>MongoDB</li>
                <li>REST APIs</li>
                <li>PostgreSQL</li>       
                <li></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="education" className={styles.section}>
          <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faGraduationCap} /> Education</h2>
          <div className={styles.educationItem}>
            <h3>Business Intelligence</h3>
            <div className={styles.educationDetails}>
              <span>Polytechnic Sousse University </span>
              <span>2021 - 2023</span>
            </div>
            <p>Relevant Coursework: Advanced Algorithms, Web Application Development, Data Analysis, Machine Learning and Deep Learning</p>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionTitle}> <FontAwesomeIcon icon={faLink}/> Contact</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <FontAwesomeIcon icon={faLinkedin} />
              <a href="https://www.linkedin.com/in/dhia-naija-64bb82200/">linkedin.com/in/dhianaija</a>
            </div>
            <div className={styles.contactItem}>
              <FontAwesomeIcon icon={faGithub} />
              <a href="https://https://github.com/Dhia7.com/johndoe">github.com/dhianaija</a>
            </div>
            <div className={styles.contactItem}>
              <FontAwesomeIcon icon={faLanguage} />
              <span>Arabic (Native), English (Fluent), French (Fluent)</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}