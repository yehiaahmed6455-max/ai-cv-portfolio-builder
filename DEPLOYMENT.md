# ProCV - Replit Deployment Configuration

## 🚀 How to Deploy

### Step 1: Import to Replit
1. Go to https://replit.com
2. Click "Create" → "Import from GitHub"
3. Paste: `https://github.com/yehiaahmed6455-max/ai-cv-portfolio-builder`
4. Click "Import"

### Step 2: Run
- Click the "Run" button
- Replit will automatically start the Flask server
- Your app will be live at: `https://your-replit-name.replit.dev`

### Step 3: Setup Custom Domain (Optional)
1. In Replit, go to "Tools" → "Domains"
2. Add your custom domain
3. Update DNS records at your domain provider

---

## 📁 Project Structure

```
ai-cv-portfolio-builder/
├── index.html          # Main frontend
├── style.css           # Styling
├── script.js           # Frontend logic
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker configuration
├── .replit             # Replit config
└── README.md           # Documentation
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-secret-key-here
```

---

## 🌐 API Endpoints

### Generate CV
```
POST /api/generate-cv
Content-Type: application/json

{
  "fullName": "محمد أحمد",
  "email": "email@example.com",
  "phone": "+966 50 123 4567",
  "experience": 5,
  "field": "Frontend Developer",
  "summary": "...",
  "skills": "JavaScript, React, CSS"
}
```

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "الاسم",
  "email": "email@example.com",
  "message": "الرسالة"
}
```

### Health Check
```
GET /api/health
```

### Statistics
```
GET /api/stats
```

---

## 📦 Deployment Options

### 1. Replit (Easiest) ✅
- No setup needed
- Free hosting
- Auto deployment from GitHub

### 2. Heroku
```bash
heroku create your-app-name
git push heroku main
```

### 3. Railway
1. Connect GitHub repo
2. Railway auto-deploys on push

### 4. Custom Server
```bash
pip install -r requirements.txt
python app.py
```

---

## 🚀 Next Steps

- [ ] Add Firebase for user authentication
- [ ] Setup payment with Stripe
- [ ] Add email notifications
- [ ] Setup database (MongoDB/PostgreSQL)
- [ ] Add analytics
- [ ] Custom domain

---

**Made with ❤️ by ProCV Team**