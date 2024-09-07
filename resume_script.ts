const toggleButton = document.getElementById('toggle-btn') as HTMLButtonElement;
const resume = document.getElementById('resume') as HTMLDivElement;
const resumeForm = document.getElementById('resume_form') as HTMLDivElement;

let flag = 0;
  toggleButton.addEventListener("click", function(){
    if (flag == 0){
      resume.style.display = "none";
      resumeForm.style.display = "block";
      toggleButton.textContent = "Go Back!";
      toggleButton.style.top = "1%"
      flag = 1;
    }
    else{
      resume.style.display = "block";
      resumeForm.style.display = "none";
      toggleButton.textContent = "Build your resume!";
      flag = 0;
    }
  }
)

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume_form') as HTMLFormElement;
    const displayName = document.getElementById('fullName') as HTMLElement;
    const displayJobTitle = document.getElementById('job_title') as HTMLElement;
    const displayEmail = document.getElementById('email') as HTMLElement;
    const displayPhone = document.getElementById('phone') as HTMLElement;
    const displayLocation = document.getElementById('location') as HTMLElement;
    const displayEducation = document.getElementById('education_section') as HTMLElement;
    const displaySkills = document.getElementById('skills_section') as HTMLElement;
    const displayExperience = document.getElementById('work_section') as HTMLElement;
    const displayAboutMe = document.getElementById('about_section') as HTMLElement;
  
    const educationSection = document.getElementById('education_section') as HTMLElement;
    const addEducationBtn = document.getElementById('addEducation') as HTMLButtonElement;
  
    addEducationBtn.addEventListener('click', () => {
      const educationEntry = document.createElement('div');
      educationEntry.className = 'education-entry';
      educationEntry.innerHTML = `
        <label>Degree:</label>
        <input type="text" name="degree" required />
  
        <label>Institution:</label>
        <input type="text" name="institution" required />
  
        <label>Duration:</label>
        <input type="text" name="duration" required />
  
        <button type="button" class="remove-education">Remove</button>
      `;
      educationSection.insertBefore(educationEntry, addEducationBtn);
    });
  
    educationSection.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('remove-education')) {
        const entry = (e.target as HTMLElement).parentElement;
        if (entry) {
          educationSection.removeChild(entry);
        }
      }
    });
  
    const workExperienceSection = document.getElementById('work_section') as HTMLElement;
    const addWorkBtn = document.getElementById('addWork') as HTMLButtonElement;
  
    addWorkBtn.addEventListener('click', () => {
      const workEntry = document.createElement('div');
      workEntry.className = 'work-entry';
      workEntry.innerHTML = `
        <label>Job Title:</label>
        <input type="text" name="jobTitle" required />
  
        <label>Company:</label>
        <input type="text" name="company" required />
  
        <label>Duration:</label>
        <input type="text" name="duration" required />
  
        <label>Responsibilities:</label>
        <textarea name="responsibilities" required></textarea>
  
        <button type="button" class="remove-work">Remove</button>
      `;
      workExperienceSection.insertBefore(workEntry, addWorkBtn);
    });
  
    workExperienceSection.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('remove-work')) {
        const entry = (e.target as HTMLElement).parentElement;
        if (entry) {
          workExperienceSection.removeChild(entry);
        }
      }
    });
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); 
  
      const fullName = (document.getElementById('full_name') as HTMLInputElement).value;
      const jobTitle = (document.getElementById('job_title') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const phone = (document.getElementById('phone') as HTMLInputElement).value;
      const location = (document.getElementById('location') as HTMLInputElement).value;
      const aboutMe = (document.getElementById('aboutMe') as HTMLTextAreaElement).value;
  
      displayName.innerText = fullName;
      displayJobTitle.innerText = jobTitle;
      displayEmail.innerText = `Email: ${email}`;
      displayPhone.innerText = `Phone: ${phone}`;
      displayLocation.innerText = `Location: ${location}`;
      displayAboutMe.innerText = aboutMe;
  
      const educationEntries = form.querySelectorAll('.education-entry');
      let educationHTML = '';
      educationEntries.forEach((entry) => {
        const degree = (entry.querySelector('input[name="degree"]') as HTMLInputElement).value;
        const institution = (entry.querySelector('input[name="institution"]') as HTMLInputElement).value;
        const duration = (entry.querySelector('input[name="duration"]') as HTMLInputElement).value;
        educationHTML += `<li>${degree} - ${institution}, ${duration}</li>`;
      });
      displayEducation.innerHTML = educationHTML;
  
      const workEntries = form.querySelectorAll('.work-entry');
      let workHTML = '';
      workEntries.forEach((entry) => {
        const jobTitle = (entry.querySelector('input[name="jobTitle"]') as HTMLInputElement).value;
        const company = (entry.querySelector('input[name="company"]') as HTMLInputElement).value;
        const duration = (entry.querySelector('input[name="duration"]') as HTMLInputElement).value;
        const responsibilities = (entry.querySelector('textarea[name="responsibilities"]') as HTMLTextAreaElement).value;
  
        const responsibilitiesList = responsibilities.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
  
        workHTML += `
          <div class="job">
            <h3>${jobTitle} at ${company}</h3>
            <p>${duration}</p>
            <ul>${responsibilitiesList}</ul>
          </div>
        `;
      });
      displayExperience.innerHTML = workHTML;
  
      const skillsInput = (document.getElementById('skillsInput') as HTMLInputElement).value;
      const skillsArray = skillsInput.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
      displaySkills.innerHTML = skillsArray;
    });
  });
  