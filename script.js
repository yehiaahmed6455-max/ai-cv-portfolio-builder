// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            updateActiveLink(this.getAttribute('href'));
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveLink('#' + section.id);
        }
    });
});

function updateActiveLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="${href}"]`)?.classList.add('active');
}

// Modal functions
function goToEditor() {
    document.getElementById('editorModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeEditor() {
    document.getElementById('editorModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('editorModal');
    if (e.target === modal) {
        closeEditor();
    }
});

// Generate CV
function generateCV(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const field = document.getElementById('field').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim());

    // Generate professional CV content
    const cvContent = `
        <div class="cv-content">
            <div class="cv-header">
                <div class="cv-name">${fullName}</div>
                <div class="cv-contact">${email} | ${phone}</div>
            </div>

            <div class="cv-section">
                <div class="cv-section-title">الملخص المهني</div>
                <div class="cv-section-content">
                    <p>${summary}</p>
                </div>
            </div>

            <div class="cv-section">
                <div class="cv-section-title">الخبرات المهنية</div>
                <div class="cv-section-content">
                    <p><strong>${field}</strong><br/>
                    عدد سنوات الخبرة: ${experience} سنوات<br/>
                    خبرة متقدمة في مجال ${field} مع إثبات قدرة على تحقيق نتائج متميزة.</p>
                </div>
            </div>

            <div class="cv-section">
                <div class="cv-section-title">المهارات</div>
                <div class="cv-section-content">
                    <p>${skills.map(skill => `• ${skill}`).join('<br/>')}</p>
                </div>
            </div>

            <div class="cv-section">
                <div class="cv-section-title">التعليم</div>
                <div class="cv-section-content">
                    <p><strong>درجة البكالوريوس</strong><br/>
                    تخصص: ${field}</p>
                </div>
            </div>

            <div class="download-btn">
                <button class="btn-primary" onclick="downloadPDF('${fullName}')"><i class="fas fa-file-pdf"></i> تحميل PDF</button>
                <button class="btn-secondary" onclick="downloadWord('${fullName}')"><i class="fas fa-file-word"></i> تحميل Word</button>
            </div>
        </div>
    `;

    document.getElementById('cvPreview').innerHTML = cvContent;
    
    // Show success message
    showNotification('تم توليد السيرة الذاتية بنجاح! ✨');
}

// Download as PDF
function downloadPDF(name) {
    const element = document.querySelector('.cv-content');
    const opt = {
        margin: 10,
        filename: `${name}-CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    // Note: In production, you would use html2pdf library
    alert('تم التحضير لتحميل الملف. في النسخة الكاملة، سيتم تحميل PDF مباشرة.');
}

// Download as Word
function downloadWord(name) {
    const element = document.querySelector('.cv-content');
    const html = `<html><body>${element.innerHTML}</body></html>`;
    
    const blob = new Blob([html], { type: 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}-CV.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('تم تحميل الملف بنجاح!');
}

// Contact form submission
function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // In production, send data to backend
    showNotification('شكراً لتواصلك! سنرد عليك قريباً.');
    form.reset();
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);