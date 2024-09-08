const toggleButton = document.getElementById(
  "toggle-form-btn"
) as HTMLButtonElement;
const resume = document.getElementById("resume-container") as HTMLDivElement;
const resumeForm = document.getElementById("resume-form") as HTMLDivElement;
const submitButton = document.getElementById(
  "submit-resume-btn"
) as HTMLButtonElement;

let flag = 0;
toggleButton.addEventListener("click", function () {
  if (flag === 0) {
    resume.style.display = "none";
    resumeForm.style.display = "block";
    toggleButton.style.top = "1%";
    toggleButton.textContent = "Go Back!";
    flag = 1;
  } else {
    resume.style.display = "block";
    resumeForm.style.display = "none";
    toggleButton.textContent = "Generate Your Resume!";
    flag = 0;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const profilePicInput = document.getElementById("profilePic") as HTMLInputElement;
  const profilePicPreview = document.getElementById("profile-picture") as HTMLImageElement;

  function buildResume() {
    const fullName = (document.getElementById("fullName") as HTMLInputElement)
      .value;
    const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const location = (document.getElementById("location") as HTMLInputElement)
      .value;
    const aboutMe = (document.getElementById("aboutInput") as HTMLInputElement)
      .value;

    const educationEntries = document.querySelectorAll(".education-entry");
    let educationData: any[] = [];
    educationEntries.forEach((entry) => {
      const degree = (
        entry.querySelector('input[name="degree"]') as HTMLInputElement
      ).value;
      const institution = (
        entry.querySelector('input[name="institution"]') as HTMLInputElement
      ).value;
      const duration = (
        entry.querySelector('input[name="duration"]') as HTMLInputElement
      ).value;
      educationData.push({ degree, institution, duration });
    });

    const workEntries = document.querySelectorAll(".work-entry");
    let workData: any[] = [];
    workEntries.forEach((entry) => {
      const jobTitle = (
        entry.querySelector('input[name="jobTitle"]') as HTMLInputElement
      ).value;
      const company = (
        entry.querySelector('input[name="company"]') as HTMLInputElement
      ).value;
      const duration = (
        entry.querySelector('input[name="duration"]') as HTMLInputElement
      ).value;
      const responsibilities = (
        entry.querySelector(
          'textarea[name="responsibilities"]'
        ) as HTMLTextAreaElement
      ).value;
      workData.push({ jobTitle, company, duration, responsibilities });
    });

    const skills = (
      document.getElementById("skills_Input") as HTMLInputElement
    ).value
      .split(",")
      .map((skill) => skill.trim());

      const profilePicFile = profilePicInput.files?.[0];
      if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profilePicPreview.src = e.target?.result as string;
        };
        reader.readAsDataURL(profilePicFile);
      }

    (document.getElementById("user-full-name") as HTMLElement).innerText =
      fullName;
    (document.getElementById("user-job-title") as HTMLElement).innerText =
      jobTitle;
    (
      document.getElementById("user-email") as HTMLElement
    ).innerText = `Email: ${email}`;
    (
      document.getElementById("user-phone") as HTMLElement
    ).innerText = `Phone: ${phone}`;
    (
      document.getElementById("user-location") as HTMLElement
    ).innerText = `Location: ${location}`;
    (document.getElementById("user-about") as HTMLElement).innerText = aboutMe;

    const educationSection = document.getElementById(
      "education-list"
    ) as HTMLElement;
    educationSection.innerHTML = educationData
      .map(
        (edu: any) =>
          `<li>${edu.degree} - ${edu.institution}, ${edu.duration}</li>`
      )
      .join("");

    const workExperienceSection = document.getElementById(
      "experience-section"
    ) as HTMLElement;
    workExperienceSection.innerHTML = workData
      .map(
        (work: any) => `
        <h3>${work.jobTitle} at ${work.company}</h3>
        <p>${work.duration}</p>
        <ul>${work.responsibilities
          .split("\n")
          .map((resp: string) => `<li>${resp}</li>`)
          .join("")}</ul>
      `
      )
      .join("");

    const skillsSection = document.getElementById("user-skills") as HTMLElement;
    skillsSection.innerHTML = `<ul>${skills
      .map((skill: string) => `<li>${skill}</li>`)
      .join("")}</ul>`;
  }

  function addEducationEntry() {
    const educationSection = document.getElementById(
      "form-education-section"
    ) as HTMLDivElement;
    const newEntry = document.createElement("div");
    newEntry.className = "education-entry";
    newEntry.innerHTML = `
    <label>Degree:</label>
    <input type="text" name="degree" required />
    <label>Institution:</label>
    <input type="text" name="institution" required />
    <label>Duration:</label>
    <input type="text" name="duration" required />
    <button type="button" class="remove-education">Remove</button>
  `;
    educationSection.insertBefore(
      newEntry,
      document.getElementById("addEducation")
    );
  }

  function addWorkEntry() {
    const workSection = document.getElementById(
      "form-work-section"
    ) as HTMLDivElement;
    const newEntry = document.createElement("div");
    newEntry.className = "work-entry";
    newEntry.innerHTML = `
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
    workSection.insertBefore(newEntry, document.getElementById("addWork"));
  }

  document
    .getElementById("addEducation")
    ?.addEventListener("click", addEducationEntry);
  document.getElementById("addWork")?.addEventListener("click", addWorkEntry);

  resumeForm.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).classList.contains("remove-education")) {
      (event.target as HTMLElement).parentElement?.remove();
    }
    if ((event.target as HTMLElement).classList.contains("remove-work")) {
      (event.target as HTMLElement).parentElement?.remove();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    buildResume();
    toggleButton.click();
  });
});
