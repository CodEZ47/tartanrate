# TartanRate - Course Insights Tracker

A full-stack web application that allows university students to add, review, and explore course insights — including difficulty ratings, hints, and professor information.

---

## Features

## Frontend (Next.js + Tailwind CSS + SWR)

- Responsive single-page app built with **Next.js** and **TypeScript**
- Clean, modular components using **Tailwind CSS**
- Course list displayed in a searchable, filterable, sortable table
- Add/Edit/Delete course forms with validation via `react-hook-form`
- View course detail pages with:
  - Image and description
  - Ratings rendered as star icons
  - Difficulty shown as an interactive gauge
  - Extra resources and syllabus links

### Backend (Django + Django REST Framework)

- Django app with RESTful API endpoints for:
  - Listing courses
  - Creating, updating, deleting a course
- SQLite database by default (can be switched to PostgreSQL)
- Serializer validation and admin panel integration
- CORS support enabled for cross-origin requests

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, SWR, Tailwind CSS
- **Backend:** Django, Django REST Framework
- **Database:** SQLite (locally), ready for PostgreSQL in production
- **Tooling:** React Hook Form, Lucide Icons, React Hot Toast


### 🔹 Frontend (Vercel)

- Deployed using GitHub integration for continuous deployment
- Environment variables used for secure backend connection
- Publicly accessible at: (https://tartanrate.vercel.app/)

### 🔹 Backend (App Engine)

- Deployed to App Engine (Standard Environment)
- Static file issues were somewhat handled
- Database was configured via Google Cloud SQL but could not be fully connected

---

## 🧪 What Went Well

- Project architecture and full-stack integration structured cleanly
- Modern, responsive UI using TailwindCSS
- Form validation, icons, loading states, and filtering logic implemented successfully
- Backend API endpoints functional locally

---

## ⚠️ Challenges and Trade-offs

- Unable to fully verify CRUD operations in production due to PostgreSQL connection errors
- Admin panel static files (CSS/JS) not served initially without tweaks
- Cloud SQL socket connections and Django migration from App Engine required workarounds
- Time constraints limited testing, authentication, and CI/CD setup

---

## 🌱 If I Had More Time...

- Implement user authentication (JWT, session-based, or social login)
- CI/CD setup with GitHub Actions for both frontend and backend
- Add unit and integration tests
- Build recommendation engine for popular courses
- Create mobile-ready or native versions
- Add analytics on course popularity and reviews
- Allow comments or upvotes on course tips
- Setup security measures (rate limiting, input sanitation)

---

## 📈 Future Plans

- Enable authenticated users to post and bookmark courses
- Allow professors to manage and recommend resources
- Build dashboards for analytics
- Launch a full-scale MVP with user onboarding and feedback system

---

## ⚙️ Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
