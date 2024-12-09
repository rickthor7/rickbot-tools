const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const summary = document.getElementById('summary');
const skills = document.getElementById('skills');
const experience = document.getElementById('experience');
const generateResumeButton = document.getElementById('generateResumeButton');
const downloadPDFButton = document.getElementById('downloadPDFButton');
const resumePreview = document.getElementById('resumePreview');

function generateResume() {
    const resumeContent = `
        <h3>${fullName.value || 'Your Name'}</h3>
        <p>Email: ${email.value || 'your.email@example.com'}</p>
        <p>Phone: ${phone.value || '123-456-7890'}</p>
        <h4>Summary</h4>
        <p>${summary.value || 'Write a brief summary about yourself here.'}</p>
        <h4>Skills</h4>
        <ul>${skills.value
            .split(',')
            .map(skill => `<li>${skill.trim()}</li>`)
            .join('') || '<li>Your skills go here.</li>'}</ul>
        <h4>Experience</h4>
        <p>${experience.value || 'Detail your work experience here.'}</p>
    `;

    resumePreview.innerHTML = resumeContent;
    downloadPDFButton.disabled = false;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.html(resumePreview, {
        callback: function (doc) {
            doc.save(`${fullName.value || 'resume'}.pdf`);
        },
        x: 10,
        y: 10,
    });
}

generateResumeButton.addEventListener('click', generateResume);
downloadPDFButton.addEventListener('click', downloadPDF);
