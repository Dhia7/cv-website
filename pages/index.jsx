// pages/index.js
import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import { 
  faCertificate,
  faAddressCard, 
  faGraduationCap,
  faCode,
  faEnvelope,
  faBriefcase,
  faProjectDiagram,
  faLink,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Home.module.css';
import AnimatedSection from '../components/AnimatedSection';
import TypingEffect from '../components/TypingEffect';
import ThemeToggle from '../components/ThemeToggle';


export default function Home() {
  const navigationSections = [
    { id: 'about', label: 'About' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'skills', label: 'Skills' }
  ];
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      // Don't update section during manual navigation
      if (isNavigatingRef.current) {
        return;
      }
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const heroSection = document.querySelector('header');
      const heroHeight = heroSection ? heroSection.offsetHeight : 0;
      
      // Active section detection
      let currentSection = 'about'; // Default to about (hero)
      
      // Priority 1: Check if we're at the bottom of the page - keep last section (skills) active
      const isAtBottom = scrollPosition + windowHeight >= documentHeight - 50;
      
      if (isAtBottom) {
        currentSection = 'skills';
      } else {
        // Priority 2: Check if we're in the hero/summary section (About)
        const summarySection = document.getElementById('summary');
        const summaryEnd = summarySection ? summarySection.offsetTop + summarySection.offsetHeight : heroHeight;
        
        if (scrollPosition + 100 < summaryEnd) {
          currentSection = 'about';
        } else {
          // Priority 3: Check which section is most visible in the viewport
          const navSectionIds = ['experiences', 'projects', 'certifications', 'skills'];
          let maxVisibleArea = 0;
          let mostVisibleSection = 'experiences';
          
          for (const sectionId of navSectionIds) {
            const section = document.getElementById(sectionId);
            if (section) {
              const rect = section.getBoundingClientRect();
              const sectionTop = rect.top;
              const sectionBottom = rect.bottom;
              const navbarHeight = 80;
              
              // Calculate visible area of this section in viewport
              const visibleTop = Math.max(sectionTop, navbarHeight);
              const visibleBottom = Math.min(sectionBottom, windowHeight);
              const visibleArea = Math.max(0, visibleBottom - visibleTop);
              
              // The section with the most visible area is the active one
              if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                mostVisibleSection = sectionId;
              }
            }
          }
          
          currentSection = mostVisibleSection;
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    // Debounce scroll for smoother performance
    let scrollTimeout;
    const debouncedHandleScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [activeSection, navigationSections]);

 
    
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    
    // Set flag to prevent scroll detection from interfering
    isNavigatingRef.current = true;
    
    // Update active section immediately
    setActiveSection(sectionId);
    
    // Special handling for "about" - scroll to top (hero section)
    if (sectionId === 'about') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Clear navigation flag after scroll completes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1000);
      return;
    }
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const offset = 80; // Navbar height
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
      
      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Clear navigation flag after scroll animation completes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1000);
    } else {
      isNavigatingRef.current = false;
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

      <motion.nav 
        className={styles.nav}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ul className={styles.navList}>
          {navigationSections.map((section, index) => (
            <motion.li 
              key={section.id} 
              className={styles.navItem}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <button
                onClick={(e) => handleNavClick(section.id, e)}
                className={`${styles.navLink} ${
                  activeSection === section.id ? styles.active : ''
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.span 
                    className={styles.navIndicator}
                    layoutId="activeIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </motion.li>
          ))}
          <motion.li
            className={styles.navItem}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navigationSections.length * 0.1, duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.li>
        </ul>
      </motion.nav>

      <motion.header 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
  <div className={styles.heroContent}>
    <div className={styles.heroText}>
            <TypingEffect 
              text="Dhia Eddine Naija"
              className={styles.heroTitle}
            />
            <motion.div 
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
        <span className={styles.location}>📍 Sousse, Tunisia</span>
        <span className={styles.divider}>|</span>
        <span className={styles.tagline}>Full Stack Developer</span>
            </motion.div>
            <motion.div 
              className={styles.heroHighlight}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
        <p>Specializing in modern web development with React, Node.js, and Next.js</p>
        <div className={styles.techStack}>
                {['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Next.js'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className={styles.techPill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <motion.a 
              href="#contact" 
              className={styles.primaryButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a 
              href="#projects" 
              className={styles.secondaryButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </motion.div>
        </div>
      </motion.header>

      <main>
        <AnimatedSection id="summary" className={styles.section}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faAddressCard} /> Summary
          </motion.h2>
          <div className={styles.sectionContent}>
            <motion.p 
              className={styles.highlightText}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Experienced Full Stack Web Developer :
            </motion.p>
            <motion.ul 
              className={styles.keyAchievements}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {[
                "Experienced Full Stack Developer proficient in maintaining and building applications using the MERN stack and Next.js.",
                "Expertise in creating Next.js-based projects, including ecommerce platforms and dashboards, with a focus on performance and user experience",
                "Experienced in designing, developing, and maintaining scalable web applications with robust backend APIs"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </AnimatedSection>

        <AnimatedSection id="experiences" className={styles.section}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faBriefcase} /> Work Experiences
          </motion.h2>
          <motion.div 
            className={styles.timeline}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            <motion.div 
              className={styles.timelineItem}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection id="projects" className={styles.section}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faProjectDiagram} /> Projects
          </motion.h2>
          <motion.div 
            className={styles.projectsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              {
                title: "Dashboard Platform",
                url: "https://nextjs-dashboard-projects.vercel.app/",
                description: "A full-stack Dashboard solution built with Next.js",
                tech: ["React", "Typescript", "Tailwind CSS", "Vercel/postgres"],
                github: "https://github.com/Dhia7/nextjs-dashboard"
              },
              {
                title: "Technotes project",
                url: "https://technotes-kd2z.onrender.com/",
                description: "A MernStack application focused on backend API's.",
                tech: ["MongoDB", "Express", "React", "Node.js", "reduxJs", "Jwt-decode"],
                github: "https://github.com/Dhia7/technotes"
              },
              {
                title: "Ecommerce Website",
                url: "https://weary-iota.vercel.app/",
                description: "A eCommerce website built with Next.js and other technologies.",
                tech: ["Next.js", "React", "Typescript", "Tailwind CSS", "Vercel/postgres"],
                github: "https://github.com/Dhia7/weary"
              }
            ].map((project, index) => (
              <motion.div 
                key={index}
                className={styles.projectCard}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <a
                  href={project.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectTitleLink}
              >
                  <h3>{project.title} <span className={styles.externalIcon}>↗</span></h3>
              </a>
                <p>{project.description}</p>
              <div className={styles.techStack}>
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
              </div>
                <motion.a  
                  href={project.github}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.projectLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  >
                    View Project <FontAwesomeIcon icon={faExternalLinkAlt} className={styles.linkIcon} />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection id="certifications" className={styles.section}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faCertificate} /> Certifications
          </motion.h2>
          <motion.div 
            className={styles.timeline}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            <motion.div 
              className={styles.timelineItem}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection id="skills" className={styles.section}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faCode} /> Technical Skills
          </motion.h2>
          <motion.div 
            className={styles.skillsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              { title: "Frontend", skills: ["React/Redux", "TypeScript", "Next.js", "TailwindCSS"] },
              { title: "Backend", skills: ["Node.js", "MongoDB", "REST APIs", "PostgreSQL"] }
            ].map((category, index) => (
              <motion.div 
                key={index}
                className={styles.skillCategory}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <h3>{category.title}</h3>
                <motion.ul 
                  className={styles.skillList}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {category.skills.map((skill, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection id="education" className={styles.section}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faGraduationCap} /> Education
          </motion.h2>
          <motion.div 
            className={styles.educationItem}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3>Business Intelligence</h3>
            <div className={styles.educationDetails}>
              <span>Polytechnic Sousse University </span>
              <span>2021 - 2023</span>
            </div>
            <p>Relevant Coursework: Advanced Algorithms, Web Application Development, Data Analysis, Machine Learning and Deep Learning</p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection id="contact" className={styles.section}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faLink}/> Contact
          </motion.h2>
          <motion.div 
            className={styles.contactGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {[
              { icon: faLinkedin, href: "https://www.linkedin.com/in/dhia-naija-64bb82200/", text: "linkedin.com/in/dhianaija" },
              { icon: faGithub, href: "https://https://github.com/Dhia7.com/johndoe", text: "github.com/dhianaija" },
              { icon: faEnvelope, href: "#", text: "dhianaija@gmail.com" }
            ].map((contact, index) => (
              <motion.div 
                key={index}
                className={styles.contactItem}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
              >
                <FontAwesomeIcon icon={contact.icon} />
                <a href={contact.href}>{contact.text}</a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </main>
    </div>
  );
}