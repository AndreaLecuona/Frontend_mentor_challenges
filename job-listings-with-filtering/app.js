let data = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: []
  },
  {
    id: 2,
    company: "Manage",
    logo: "./images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"]
  },
  {
    id: 3,
    company: "Account",
    logo: "./images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"]
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: []
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["Ruby", "Sass"]
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"]
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"]
  },
  {
    id: 8,
    company: "Insure",
    logo: "./images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"]
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"]
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"]
  }
]

const filterBox = document.querySelector('.filter-container');
const filterContainer = filterBox.querySelector('.filter-list');
const jobContainer = document.querySelector('.card-container');
const clearAllBtn = filterBox.querySelector('#clear-all');

let dataCopy = data.slice()
let selectedFilters = [];


const showFilterBox = () => {
  filterBox.style.display = 'flex';
};
const hideFilterBox = () => {
  filterBox.style.display = 'none';
};

const removeSingleFilter = (e) => {
  const singleFilterCategory = e.currentTarget.dataset.category;
  const indexOfTarget = selectedFilters.indexOf( singleFilterCategory );
  selectedFilters.splice(indexOfTarget, 1);

  if(selectedFilters.length === 0) removeAllFilters();
  populateFilters(selectedFilters);
  unfilter(selectedFilters);
};

const removeAllFilters = () => {
  hideFilterBox();
  dataCopy = data.slice()
  selectedFilters = [];
  populateJobs(data);
};

const populateFilters = (filterArr) => {
  let newArr = filterArr.map(filter => {
    return `
        <li class="filter-item">
            <span class="filter-item-name">${filter}</span>
            <button class="clear-one" data-category="${filter}"><img src="./images/icon-remove.svg" alt="icon remove"></button>
        </li>
        `
  })
  filterContainer.innerHTML = newArr.join("");
  const singleClear = filterContainer.querySelectorAll('.clear-one');
  singleClear.forEach(btn => btn.addEventListener('click', removeSingleFilter))
};

clearAllBtn.addEventListener('click', removeAllFilters);

window.addEventListener('DOMContentLoaded', () => {
  populateJobs(data)
});


const filter = (filterName) => {
  const newJobList = dataCopy.filter(
    job => {
      const allInOne = [job.role, job.level, ...job.languages, ...job.tools];
      return allInOne.find(tag => { if (tag === filterName) { return true } })
    }
  );

  dataCopy = newJobList;
  populateJobs(newJobList);
};

const unfilter = (arrOfFilters) => {
  dataCopy = data.slice();
  const searchRegex = new RegExp(`\\b(${arrOfFilters.join(')|(')})\\b`)

  const prevFilteredJobList = dataCopy.filter(
    job => {
      const allInOne = [job.role, job.level, ...job.languages, ...job.tools];
      return allInOne.find(tag => { if(searchRegex.test( tag )) { return true } } )
    }
  )

  dataCopy = prevFilteredJobList;
  populateJobs(prevFilteredJobList);
}

const displayFilters = (e) => {
  showFilterBox();
  
  let clickedFilter = e.target.textContent;
  
  if (selectedFilters.includes(clickedFilter)) return;
  selectedFilters.push(clickedFilter);
  
  populateFilters(selectedFilters);
  filter(clickedFilter);
};


const populateJobTags = (arrLang, arrTools) => {
  const joinedArr = [...arrLang, ...arrTools];
  
  const tags = joinedArr.map(spec => {
    return `<li class="filter-item">
        <button class="btn-filter">${spec}</button>
        </li>`
  })
  return tags.join("");
}


const populateJobs = (data) => {
  let content = data.map(job => {
    return `
        <div class="card-item shadow ${job.featured && `border`}">

        <div class="card-info">

          <div class="logo-container">
            <img src="${job.logo}" alt="${job.logo}">
          </div>

          <div class="name">
            <h2>${job.company}</h2>
            ${job.new ? `<span class="tag new">new!</span>` : ""}
            ${job.featured ? `<span class="tag featured">featured</span>` : ""}
          </div>

          <h2 class="job-title">${job.position}</h2>

          <ul class="job-specs-list">
            <li class="job-specs-item">${job.postedAt}</li>
            <li class="job-specs-item">${job.contract}</li>
            <li class="job-specs-item">${job.location}</li>
          </ul>

        </div>

        <div class="filter-container">
            <ul class="filter-list">
                <li class="filter-item">
                <button class="btn-filter">${job.role}</button>
                </li>
                <li class="filter-item">
                <button class="btn-filter">${job.level}</button>
                </li>
                ${populateJobTags(job.languages, job.tools)}
            </ul>
        </div>

      </div>
        `
  })

  jobContainer.innerHTML = content.join("");

  const jobFilters = Array.from(document.querySelectorAll('.btn-filter'));
  jobFilters.forEach(filterBtn => filterBtn.addEventListener('click', displayFilters))
};
