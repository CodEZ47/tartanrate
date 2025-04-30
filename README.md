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
