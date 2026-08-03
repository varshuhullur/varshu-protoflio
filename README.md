# Portfolio Web Application (MVC Model)

This is a premium, modern Portfolio Web Application built with an **MVC (Model-View-Controller)** architecture using Python, Flask, and SQLite. The frontend features a beautiful dark theme with responsive designs and custom CSS/JS assets matching a professional split-screen home page layout.

## 🚀 Key Features

- **Split-Screen Home Layout**: Custom hero design featuring corporate typography and a modern skyscraper architectural image.
- **Dynamic Multi-page Navigation**: Subpages for **About**, **Projects**, **Certifications**, **Skills**, **Achievements**, and **Contact**.
- **Interactive Technical Skills**: Skill percentages and dynamic loading bar animations.
- **REST API Contact Form**: Async AJAX contact submissions using the frontend JavaScript `fetch` API.
- **SQLite Database Persistence**: Secure data storage with parameterized SQLite queries to prevent SQL injections.
- **Modern Design System**: Google Fonts (Inter & Montserrat), deep navy tones, responsive mobile views, and elegant hover animations.

---

## 🏗️ MVC Architecture & Folder Structure

The project strictly follows the **Model-View-Controller** design pattern to separate concerns:

```
d:/github project/
├── .venv/                   # [Model/Controller Env] Python virtual environment
├── .gitignore               # [Git Configuration] Excluded files list
├── README.md                # [Documentation] Project manual
├── requirements.txt         # [Dependencies] Required libraries (Flask)
├── app.py                   # [Controller] Handles routing and REST API requests
├── models.py                # [Model] Database schema and CRUD interactions
├── database.db              # [Model Storage] SQLite database file
├── templates/               # [View - Layouts] Jinja2 HTML templates
│   ├── base.html            # Shared navigation, footer and static imports
│   ├── home.html            # Split layout home view (matches reference image)
│   ├── about.html           # Professional introduction and bios
│   ├── projects.html        # Interactive grid of projects
│   ├── certifications.html  # Credentials display cards
│   ├── skills.html          # Interactive skills progress page
│   ├── achievements.html    # Chronological history timeline
│   └── contact.html         # Form view connecting to the REST API
└── frontend/                # [View - Statics] Shared CSS/JS/Images assets
    ├── css/
    │   └── style.css        # Premium custom responsive stylesheet
    ├── js/
    │   └── main.js          # REST API Form validation and animations script
    └── images/
        └── hero.png         # Glass skyscraper hero banner image
```

### 1. Model (`models.py` & `database.db`)
Responsible for data structures and direct storage access. Initializes the SQLite schema and implements the secure `save_contact_message` function to store submitted contact fields.

### 2. View (`templates/` & `frontend/`)
Responsible for layout and appearance. Static files (CSS, JS, Images) are kept in the `frontend` folder, and HTML templates reside in the `templates` folder. Flask is configured to serve static assets directly from `/frontend` for structured rendering.

### 3. Controller (`app.py`)
Responsible for application logic, managing routes, rendering templates (Jinja2), and acting as the server controller. Handles POST request payloads from the contact form REST API `/api/contact` and invokes model queries.

---

## 🛠️ Setup & Local Running Instructions

This project uses **`uv`**, an extremely fast Python package and environment manager.

### Prerequisites
Make sure you have [uv](https://github.com/astral-sh/uv) installed on your system. If not, you can install it using standard installers, or fallback to python's virtualenv.

### 1. Clone the repository and navigate to the project directory
```bash
cd "d:/github project"
```

### 2. Initialize Virtual Environment
Create the virtual environment using `uv`:
```bash
uv venv
```

### 3. Activate Virtual Environment
- **Windows (Command Prompt)**:
  ```cmd
  .venv\Scripts\activate.bat
  ```
- **Windows (PowerShell)**:
  ```powershell
  .venv\Scripts\activate.ps1
  ```
- **macOS / Linux**:
  ```bash
  source .venv/bin/activate
  ```

### 4. Install Dependencies
Install packages listed in `requirements.txt` using `uv`:
```bash
uv pip install -r requirements.txt
```

### 5. Launch the Application
Start the Flask local development server:
```bash
python app.py
```
By default, the application runs on **`http://127.0.0.1:5000`**. Open this address in your web browser.

---

## 📋 REST API Documentation

### Contact Submission Endpoint

* **URL**: `/api/contact`
* **Method**: `POST`
* **Content-Type**: `application/json` (or `application/x-www-form-urlencoded`)
* **Request Body Schema**:
  ```json
  {
    "name": "Your Name",
    "email": "yourname@example.com",
    "subject": "Topic or Project Details",
    "message": "Write your detailed message here"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Thank you, Your Name! Your message has been received."
  }
  ```
* **Error Response (400 Bad Request / 500 Internal Server Error)**:
  ```json
  {
    "success": false,
    "message": "Detailed validation or database error message."
  }
  ```
