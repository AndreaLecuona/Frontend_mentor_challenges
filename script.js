const challenges = [
    {
        folder: "job-listings-with-filtering",
        title: "Job listing with filters",
        technologies: "JS - Dynamically generated HTML - Data manipulation - Mobile First - SASS"
    },
    {
        folder: "bookmark-landing-page",
        title: "Bookmark landing page",
        technologies: "Responsive - SASS - DOM - JS validation"
    },
    {
        folder: "url-shortening-API",
        title: "Url shortening API landing page",
        technologies: "SASS - DOM - JS validation - Fetch API - Session Storage"
    },
    {
        folder: "tracking-intro-component",
        title: "Project tracking intro component",
        technologies: "CSS3 transitions + animations"
    },
    {
        folder: "pricing-component-with-toggle",
        title: "Pricing component with toggle",
        technologies: "Grid - Flexbox - SASS - DOM - JS"
    },
    {
        folder: "insure-landing-page",
        title: "Insure landing page",
        technologies: "Responsive - CSS - SASS (partials, variables, mixins) - Crossbrowser"
    },
    {
        folder: "social-media-dashboard-with-theme-switcher",
        title: "Social media dashboard with theme switcher",
        technologies: "Responsive - Grid - Flexbox - DOM - JS"
    },
    {
        folder: "testimonials-slider",
        title: "Coding bootcamp testimonials slider",
        technologies: "CSS - CSS3 animation - DOM - JS"
    },
    {
        folder: "intro-signup-form",
        title: "Intro component with signup form",
        technologies: "CSS3 variables - DOM - JS validation"
    },
    {
        folder: "fylo-landing-page",
        title: "Fylo landing page",
        technologies: "HTML - Responsive - CSS - Bootstrap"
    },
    {
        folder: "article-preview-component",
        title: "Article preview component",
        technologies: "HTML - CSS - Grid - Flexbox - JS"
    },
    {
        folder: "single-price-grid",
        title: "Single price grid component",
        technologies: "HTML - Responsive - CSS - Grid"
    },
    {
        folder: "huddle-landing-page-master-section",
        title: "Huddle landing page intro section",
        technologies: "HTML - Responsive - Bootstrap - Fontawesome"
    },
];

const list = document.querySelector('.grid-projects');

challenges.forEach(item => {
    const card = document.createElement('div');
    card.classList = "card-style";

    card.innerHTML = 
        `<a href="/${item.folder}/index.html">
            <div class="img-container">
                <img src="/${item.folder}/design/desktop-preview.jpg" alt="project preview">
            </div>
            <h3 class="project-name">${item.title}</h3>
        </a>
        <p><span class = "bold">Focused on: </span> ${item.technologies}</p>`
    ;
    list.appendChild(card);
});
