var toggleButton = document.getElementById('toggle-btn');
var resume = document.getElementById('resume');
var resumeForm = document.getElementById('resume_form');
var flag = 0;
toggleButton.addEventListener("click", function () {
    if (flag == 0) {
        resume.style.display = "none";
        resumeForm.style.display = "block";
        toggleButton.textContent = "Go Back!";
        toggleButton.style.top = "1%";
        flag = 1;
    }
    else {
        resume.style.display = "block";
        resumeForm.style.display = "none";
        toggleButton.textContent = "Build your resume!";
        flag = 0;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume_form');
    var displayName = document.getElementById('fullName');
    var displayJobTitle = document.getElementById('job_title');
    var displayEmail = document.getElementById('email');
    var displayPhone = document.getElementById('phone');
    var displayLocation = document.getElementById('location');
    var displayEducation = document.getElementById('education_section');
    var displaySkills = document.getElementById('skills_section');
    var displayExperience = document.getElementById('work_section');
    var displayAboutMe = document.getElementById('about_section');
    var educationSection = document.getElementById('education_section');
    var addEducationBtn = document.getElementById('addEducation');
    addEducationBtn.addEventListener('click', function () {
        var educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = "\n        <label>Degree:</label>\n        <input type=\"text\" name=\"degree\" required />\n  \n        <label>Institution:</label>\n        <input type=\"text\" name=\"institution\" required />\n  \n        <label>Duration:</label>\n        <input type=\"text\" name=\"duration\" required />\n  \n        <button type=\"button\" class=\"remove-education\">Remove</button>\n      ";
        educationSection.insertBefore(educationEntry, addEducationBtn);
    });
    educationSection.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-education')) {
            var entry = e.target.parentElement;
            if (entry) {
                educationSection.removeChild(entry);
            }
        }
    });
    var workExperienceSection = document.getElementById('work_section');
    var addWorkBtn = document.getElementById('addWork');
    addWorkBtn.addEventListener('click', function () {
        var workEntry = document.createElement('div');
        workEntry.className = 'work-entry';
        workEntry.innerHTML = "\n        <label>Job Title:</label>\n        <input type=\"text\" name=\"jobTitle\" required />\n  \n        <label>Company:</label>\n        <input type=\"text\" name=\"company\" required />\n  \n        <label>Duration:</label>\n        <input type=\"text\" name=\"duration\" required />\n  \n        <label>Responsibilities:</label>\n        <textarea name=\"responsibilities\" required></textarea>\n  \n        <button type=\"button\" class=\"remove-work\">Remove</button>\n      ";
        workExperienceSection.insertBefore(workEntry, addWorkBtn);
    });
    workExperienceSection.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-work')) {
            var entry = e.target.parentElement;
            if (entry) {
                workExperienceSection.removeChild(entry);
            }
        }
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var fullName = document.getElementById('full_name').value;
        var jobTitle = document.getElementById('job_title').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var location = document.getElementById('location').value;
        var aboutMe = document.getElementById('aboutMe').value;
        displayName.innerText = fullName;
        displayJobTitle.innerText = jobTitle;
        displayEmail.innerText = "Email: ".concat(email);
        displayPhone.innerText = "Phone: ".concat(phone);
        displayLocation.innerText = "Location: ".concat(location);
        displayAboutMe.innerText = aboutMe;
        var educationEntries = form.querySelectorAll('.education-entry');
        var educationHTML = '';
        educationEntries.forEach(function (entry) {
            var degree = entry.querySelector('input[name="degree"]').value;
            var institution = entry.querySelector('input[name="institution"]').value;
            var duration = entry.querySelector('input[name="duration"]').value;
            educationHTML += "<li>".concat(degree, " - ").concat(institution, ", ").concat(duration, "</li>");
        });
        displayEducation.innerHTML = educationHTML;
        var workEntries = form.querySelectorAll('.work-entry');
        var workHTML = '';
        workEntries.forEach(function (entry) {
            var jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            var company = entry.querySelector('input[name="company"]').value;
            var duration = entry.querySelector('input[name="duration"]').value;
            var responsibilities = entry.querySelector('textarea[name="responsibilities"]').value;
            var responsibilitiesList = responsibilities.split('\n').map(function (item) { return "<li>".concat(item.trim(), "</li>"); }).join('');
            workHTML += "\n          <div class=\"job\">\n            <h3>".concat(jobTitle, " at ").concat(company, "</h3>\n            <p>").concat(duration, "</p>\n            <ul>").concat(responsibilitiesList, "</ul>\n          </div>\n        ");
        });
        displayExperience.innerHTML = workHTML;
        var skillsInput = document.getElementById('skillsInput').value;
        var skillsArray = skillsInput.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
        displaySkills.innerHTML = skillsArray;
    });
});
