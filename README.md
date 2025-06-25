Here’s the **complete README text** you can copy and paste directly into your `README.md` file:

---

```markdown
# 🏫 School Inspection Project

A full-stack web application to help education authorities manage, plan, and monitor school inspections effectively.

---

## 🚀 Features

- 🔐 Supervisor Login & Forgot Password via Email
- 🏫 School Onboarding with Map Location
- 👷 Inspector Onboarding & Assignment
- 📋 Define Checklists for Inspections
- 🗓️ Inspection Planning with Date & Assignee
- 📸 Report Submission with Photo Upload
- 📊 Dashboard Analytics (Rating, Top Inspectors, Stats)
- 🔍 Filter Inspection Reports (By School, Date, Inspector)
- 📁 Export Reports as PDF or Excel

---

## 🧰 Tech Stack

| Layer      | Tech Used                        |
|------------|----------------------------------|
| Frontend   | React, Tailwind CSS, Axios       |
| Backend    | Node.js, Express.js, Mongoose    |
| Database   | MongoDB (via MongoDB Compass)    |
| Auth       | JWT, bcrypt                      |
| Email      | Nodemailer (Gmail SMTP)          |
| Maps       | Google Maps Autocomplete API     |
| Reports    | pdfkit, exceljs, multer          |

---

## 🗂️ Folder Structure

```

school\_inspection\_project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env           ← Not committed
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env           ← Not committed
│   └── package.json
├── .gitignore
└── README.md

````

---

## 🛠️ Setup Instructions

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/RohiniBharne05/school-inspection-project.git
cd school_inspection_project
````

---

### ✅ 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
MONGO_URI=mongodb://localhost:27017/school_inspection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

Run backend:

```bash
npm start
```

---

### ✅ 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:

```
REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
```

Start frontend:

```bash
npm start
```

---

### ✅ 4. Enable Google Maps API

* Go to [Google Cloud Console](https://console.cloud.google.com/)
* Enable:

  * Maps JavaScript API
  * Places API
* Generate API key and add it to frontend `.env`

---

## 🧪 Test the App

1. Visit `http://localhost:3000`
2. Try logging in as supervisor
3. Add schools and inspectors
4. Create inspection plans and submit reports
5. View and filter reports
6. Export reports to PDF/Excel
7. Test forgot password (email link reset)

---

## ✍️ Author

**Rohini Bharne**
GitHub: [@RohiniBharne05](https://github.com/RohiniBharne05)

---

## ✅ To Do

* ☐ Add Admin Role for Checklist Management
* ☐ Deploy on Heroku (backend) & Vercel (frontend)
* ☐ Add push notifications

---

## 📄 License

This project is for educational/demo purposes. Attribution appreciated.

```

---

Paste this into a file called `README.md` at the root of your `school_inspection_project/` folder. Let me know if you want me to help format it directly into a file for download.
```
