var toggleButton = document.getElementById("toggle-form-btn");
var resume = document.getElementById("resume-container");
var resumeForm = document.getElementById("resume-form");
var submitButton = document.getElementById("submit-resume-btn");
var flag = 0;
toggleButton.addEventListener("click", function () {
    if (flag === 0) {
        resume.style.display = "none";
        resumeForm.style.display = "block";
        toggleButton.style.top = "-60%";
        toggleButton.textContent = "Go Back!";
        toggleButton.style.removeProperty('bottom');
        scrollToTop();
        flag = 1;
    }
    else {
        resume.style.display = "block";
        resumeForm.style.display = "none";
        toggleButton.style.bottom = "3%";
        toggleButton.textContent = "Build Your Resume!";
        toggleButton.style.removeProperty('top');
        scrollToTop();
        flag = 0;
    }
});
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    var form = document.getElementById("resume-form");
    var profilePicInput = document.getElementById("profilePic");
    var profilePicPreview = document.getElementById("profile-picture");
    function buildResume() {
        var _a;
        var fullName = document.getElementById("fullName")
            .value;
        var jobTitle = document.getElementById("jobTitle")
            .value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var location = document.getElementById("location")
            .value;
        var aboutMe = document.getElementById("aboutInput")
            .value;
        var educationEntries = document.querySelectorAll(".education-entry");
        var educationData = [];
        educationEntries.forEach(function (entry) {
            var degree = entry.querySelector('input[name="degree"]').value;
            var institution = entry.querySelector('input[name="institution"]').value;
            var duration = entry.querySelector('input[name="duration"]').value;
            educationData.push({ degree: degree, institution: institution, duration: duration });
        });
        var workEntries = document.querySelectorAll(".work-entry");
        var workData = [];
        workEntries.forEach(function (entry) {
            var jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            var company = entry.querySelector('input[name="company"]').value;
            var duration = entry.querySelector('input[name="duration"]').value;
            var responsibilities = entry.querySelector('textarea[name="responsibilities"]').value;
            workData.push({ jobTitle: jobTitle, company: company, duration: duration, responsibilities: responsibilities });
        });
        var skills = document.getElementById("skills_Input").value
            .split(",")
            .map(function (skill) { return skill.trim(); });
        var profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (profilePicFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(profilePicFile);
        }
        document.getElementById("user-full-name").innerText =
            fullName;
        document.getElementById("user-job-title").innerText =
            jobTitle;
        document.getElementById("user-email").innerText = "Email: ".concat(email);
        document.getElementById("user-phone").innerText = "Phone: ".concat(phone);
        document.getElementById("user-location").innerText = "Location: ".concat(location);
        document.getElementById("user-about").innerText = aboutMe;
        var educationSection = document.getElementById("education-list");
        educationSection.innerHTML = educationData
            .map(function (edu) {
            return "<li>".concat(edu.degree, " - ").concat(edu.institution, ", ").concat(edu.duration, "</li>");
        })
            .join("");
        var workExperienceSection = document.getElementById("experience-section");
        workExperienceSection.innerHTML = workData
            .map(function (work) { return "\n        <h3>".concat(work.jobTitle, " at ").concat(work.company, "</h3>\n        <p>").concat(work.duration, "</p>\n        <ul>").concat(work.responsibilities
            .split("\n")
            .map(function (resp) { return "<li>".concat(resp, "</li>"); })
            .join(""), "</ul>\n      "); })
            .join("");
        var skillsSection = document.getElementById("user-skills");
        skillsSection.innerHTML = "<ul>".concat(skills
            .map(function (skill) { return "<li>".concat(skill, "</li>"); })
            .join(""), "</ul>");
    }
    function addEducationEntry() {
        var educationSection = document.getElementById("form-education-section");
        var newEntry = document.createElement("div");
        newEntry.className = "education-entry";
        newEntry.innerHTML = "\n    <label>Degree:</label>\n    <input type=\"text\" name=\"degree\" required />\n    <label>Institution:</label>\n    <input type=\"text\" name=\"institution\" required />\n    <label>Duration:</label>\n    <input type=\"text\" name=\"duration\" required />\n    <button type=\"button\" class=\"remove\">Remove</button>\n  ";
        educationSection.insertBefore(newEntry, document.getElementById("addEducation"));
    }
    function addWorkEntry() {
        var workSection = document.getElementById("form-work-section");
        var newEntry = document.createElement("div");
        newEntry.className = "work-entry";
        newEntry.innerHTML = "\n    <label>Job Title:</label>\n    <input type=\"text\" name=\"jobTitle\" required />\n    <label>Company:</label>\n    <input type=\"text\" name=\"company\" required />\n    <label>Duration:</label>\n    <input type=\"text\" name=\"duration\" required />\n    <label>Responsibilities:</label>\n    <textarea name=\"responsibilities\" required></textarea>\n    <button type=\"button\" class=\"remove\">Remove</button>\n  ";
        workSection.insertBefore(newEntry, document.getElementById("addWork"));
    }
    (_a = document
        .getElementById("addEducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addEducationEntry);
    (_b = document.getElementById("addWork")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addWorkEntry);
    resumeForm.addEventListener("click", function (event) {
        var _a;
        if (event.target.classList.contains("remove")) {
            (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        }
    });
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        buildResume();
        toggleButton.click();
        toggleButton.style.display = "none";
    });
});
