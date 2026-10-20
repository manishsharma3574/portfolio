
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

const projects = [
  {
    title: "FoodShare",
    category: "Full-Stack Web Application",
    description:
      "A food donation platform that connects restaurants with NGOs to reduce food waste and help distribute surplus food.",
    tech: ["React", "JavaScript", "Node.js", "MongoDB"],
    icon: "🍱",
    status: "Live Project",
    github: "https://github.com/manishsharma3574/foodshare",
    live: "https://foodshare-gray.vercel.app/",
    featured: true,
  },
  {
    title: "Stock Price Prediction",
    category: "Machine Learning",
    description:
      "A machine learning project exploring stock price prediction using historical market data and regression-based models.",
    tech: ["Python", "Pandas", "Scikit-learn", "ML"],
    icon: "📈",
    status: "ML Project",
    github:
      "https://github.com/manishsharma3574/stock-price-prediction-using-machine-learning",
    live: null,
  },
  {
    title: "Image Caption Generator",
    category: "Deep Learning",
    description:
      "A deep learning project focused on generating natural-language descriptions for images using image features and text generation.",
    tech: ["Python", "Deep Learning", "CNN", "NLP"],
    icon: "🖼️",
    status: "In Progress",
    github:
      "https://github.com/manishsharma3574/image-caption-generator",
    live: null,
  },
];

const skills = [
  { name: "HTML", icon: "🌐", group: "Frontend" },
  { name: "CSS", icon: "🎨", group: "Frontend" },
  { name: "JavaScript", icon: "⚡", group: "Frontend" },
  { name: "React", icon: "⚛️", group: "Frontend" },
  { name: "Node.js", icon: "🟢", group: "Backend" },
  { name: "MongoDB", icon: "🍃", group: "Database" },
  { name: "Python", icon: "🐍", group: "Programming" },
  { name: "C / C++", icon: "💻", group: "Programming" },
  { name: "Git & GitHub", icon: "🔧", group: "Tools" },
  { name: "Machine Learning", icon: "🤖", group: "AI / ML" },
];

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "dark";
  });

  const [profilePhoto, setProfilePhoto] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Reveal sections and cards when they enter the viewport.
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    const photoUrl = URL.createObjectURL(file);
    setProfilePhoto((previousPhoto) => {
      if (previousPhoto) URL.revokeObjectURL(previousPhoto);
      return photoUrl;
    });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      setFormStatus("Message sent successfully! Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus(
        error.message ||
          "Could not send your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <div className="portfolio">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Go to home">
          <span className="brand-mark">M.</span>
          <span>manish<span className="accent">.dev</span></span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              AVAILABLE FOR OPPORTUNITIES
            </div>

            <p className="hero-greeting">Hello, I'm</p>
            <h1>
              Manish
              <br />
              <span className="gradient-text">Sharma.</span>
            </h1>

            <h2 className="hero-role">
              Developer <span className="accent">·</span> Problem Solver
            </h2>

            <p className="hero-description">
              A Computer Science student passionate about building useful
              web applications, exploring machine learning, and turning
              ideas into real projects.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                Explore my work <span>↗</span>
              </a>
              <a className="btn btn-secondary" href="#contact">
                Let's connect
              </a>
              <a
                className="btn btn-secondary"
                href={`${API_URL}/api/resume`}
                target="_blank"
                rel="noreferrer"
              >
                Download Resume <span>↓</span>
              </a>
            </div>

            <div className="hero-socials">
              <a
                href="https://github.com/manishsharma3574"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <span className="social-separator">/</span>
              <a href="#education">Education</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <div className="profile-card">
              <div className="profile-card-top">
                <span className="window-dot dot-red" />
                <span className="window-dot dot-yellow" />
                <span className="window-dot dot-green" />
                <span className="profile-card-label">developer.profile</span>
              </div>

              <label className="photo-upload" title="Upload a profile photo">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Your profile" />
                ) : (
                  <div className="photo-placeholder">
                    <span>MS</span>
                    <small>YOUR PHOTO</small>
                  </div>
                )}
                <span className="photo-edit">✎</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  aria-label="Upload profile photo"
                />
              </label>

              <div className="profile-info">
                <h3>Manish Sharma</h3>
                <p>Computer Science Student</p>
              </div>

              <div className="profile-divider" />

              <div className="profile-stat-row">
                <span><i className="mini-status" /> Building projects</span>
                <span className="accent">●</span>
              </div>

              <div className="profile-code">
                <span className="code-muted">const</span> passion ={" "}
                <span className="code-green">"building"</span>;
                <br />
                <span className="code-muted">const</span> focus ={" "}
                <span className="code-green">"learning"</span>;
              </div>
            </div>

            <div className="floating-tag tag-top">{"{ }"} React</div>
            <div className="floating-tag tag-bottom">⚡ Keep building</div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section-shell section-block reveal" id="about">
          <div className="section-heading">
            <span className="section-index">01 / ABOUT</span>
            <h2>A little about <span className="accent">me.</span></h2>
            <p>Curious mind. Practical approach. Continuous learning.</p>
          </div>

          <div className="about-grid">
            <div className="about-copy panel">
              <span className="panel-label">MY STORY</span>
              <h3>Learning by building.</h3>
              <p>
                I'm a third-year Computer Science student at JK Lakshmipat
                University. I enjoy creating web applications, solving
                programming problems, and understanding how software works
                behind the scenes.
              </p>
              <p>
                From frontend development to exploring machine learning and
                deep learning, I'm focused on strengthening my fundamentals
                and building projects that solve practical problems.
              </p>
            </div>

            <div className="about-highlights">
              <div className="highlight-card panel">
                <span className="highlight-icon">⌘</span>
                <h3>Web Development</h3>
                <p>Building responsive, user-friendly web experiences.</p>
              </div>
              <div className="highlight-card panel">
                <span className="highlight-icon">◈</span>
                <h3>AI & Machine Learning</h3>
                <p>Exploring data-driven solutions and deep learning.</p>
              </div>
              <div className="highlight-card panel">
                <span className="highlight-icon">↗</span>
                <h3>Problem Solving</h3>
                <p>Improving logic through programming and DSA practice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section-shell section-block reveal" id="skills">
          <div className="section-heading">
            <span className="section-index">02 / SKILLS</span>
            <h2>Tools of the <span className="accent">trade.</span></h2>
            <p>Technologies I use and concepts I'm learning.</p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div
                className="skill-card panel reveal"
                key={skill.name}
                style={{ "--delay": `${index * 65}ms` }}
              >
                <span className="skill-icon">{skill.icon}</span>
                <div className="skill-details">
                  <h3>{skill.name}</h3>
                  <p>{skill.group}</p>
                </div>
                <span className="skill-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section-shell section-block reveal" id="projects">
          <div className="section-heading">
            <span className="section-index">03 / PROJECTS</span>
            <h2>Things I've <span className="accent">built.</span></h2>
            <p>Real projects, practical learning, and ideas in progress.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card panel reveal ${
                  project.featured ? "featured-project" : ""
                }`}
                key={project.title}
                style={{ "--delay": `${index * 120}ms` }}
              >
                <div className="project-card-top">
                  <span className="project-icon">{project.icon}</span>
                  <span
                    className={`project-status ${
                      project.featured ? "live-status" : ""
                    }`}
                  >
                    <span className="status-dot" />
                    {project.status}
                  </span>
                </div>

                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="tech-tags">
                  {project.tech.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    className="btn btn-secondary project-code-btn"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Code <span>↗</span>
                  </a>

                  {project.live && (
                    <a
                      className="btn btn-primary project-live-btn"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Go Live <span>↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <a
            className="all-projects-link"
            href="https://github.com/manishsharma3574"
            target="_blank"
            rel="noreferrer"
          >
            Explore more on GitHub <span>↗</span>
          </a>
        </section>

        {/* EDUCATION */}
        <section
          className="section-shell section-block reveal"
          id="education"
        >
          <div className="section-heading">
            <span className="section-index">04 / EDUCATION</span>
            <h2>My learning <span className="accent">journey.</span></h2>
            <p>Building a strong foundation for what's next.</p>
          </div>

          <div className="education-card panel">
            <div className="education-symbol">🎓</div>
            <div className="education-content">
              <span className="panel-label">UNDERGRADUATE</span>
              <h3>Bachelor of Technology — Computer Science</h3>
              <p>JK Lakshmipat University</p>
              <span className="education-note">
                Third Year · Ongoing
              </span>
            </div>
            <span className="education-arrow">↗</span>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section-shell section-block reveal" id="contact">
          <div className="section-heading">
            <span className="section-index">05 / CONTACT</span>
            <h2>Have an idea? Let's <span className="accent">talk.</span></h2>
            <p>Have a project, opportunity, or just want to connect?</p>
          </div>

          <div className="contact-grid">
            <div className="contact-copy panel">
              <span className="panel-label">GET IN TOUCH</span>
              <h3>Let's build something useful.</h3>
              <p>
                I'm always interested in learning, collaborating, and
                discussing ideas around development and technology.
              </p>
              <a
                className="contact-link"
                href="https://github.com/manishsharma3574"
                target="_blank"
                rel="noreferrer"
              >
                <span>⌘</span>
                <span>
                  <small>FIND ME ON</small>
                  <strong>GitHub ↗</strong>
                </span>
              </a>
            </div>

            <form className="contact-form panel" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />

              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />

              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me what you're thinking..."
                rows="4"
                required
              />

              <button
                className="btn btn-primary submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send message ↗"}
              </button>

              {formStatus && (
                <p className="form-status" role="status">
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">M.</span>
          <span>manish<span className="accent">.dev</span></span>
        </a>
        <p>Designed with curiosity. Built with consistency.</p>
        <a
          href="https://github.com/manishsharma3574"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
        <span className="footer-copy">
          © {new Date().getFullYear()} Manish Sharma
        </span>
      </footer>
    </div>
  );
}

export default App;
