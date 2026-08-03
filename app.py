from flask import Flask, render_template, request, jsonify
import models

app = Flask(
    __name__,
    template_folder='templates',
    static_folder='frontend',
    static_url_path=''
)

# Initialize the database on startup
models.init_db()

@app.route('/')
def home():
    """Render the Home Page."""
    return render_template('home.html', active_page='home')

@app.route('/about')
def about():
    """Render the About Page."""
    return render_template('about.html', active_page='about')

@app.route('/projects')
def projects():
    """Render the Projects Page."""
    return render_template('projects.html', active_page='projects')

@app.route('/certifications')
@app.route('/certification')
def certifications():
    """Render the Certifications Page."""
    return render_template('certifications.html', active_page='certifications')

@app.route('/skills')
def skills():
    """Render the Skills Page."""
    return render_template('skills.html', active_page='skills')

@app.route('/achievements')
def achievements():
    """Render the Achievements Page."""
    return render_template('achievements.html', active_page='achievements')

@app.route('/contact')
def contact():
    """Render the Contact Page."""
    return render_template('contact.html', active_page='contact')

@app.route('/api/contact', methods=['POST'])
def api_contact():
    """REST API endpoint for saving contact submissions."""
    # Support both JSON request body and form data
    if request.is_json:
        data = request.get_json() or {}
    else:
        data = request.form.to_dict() or {}
        
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()
    
    # Input validation
    if not name:
        return jsonify({"success": False, "message": "Name is required"}), 400
    if not email or '@' not in email:
        return jsonify({"success": False, "message": "A valid email is required"}), 400
    if not subject:
        return jsonify({"success": False, "message": "Subject is required"}), 400
    if not message:
        return jsonify({"success": False, "message": "Message body is required"}), 400
        
    try:
        models.save_contact_message(name, email, subject, message)
        return jsonify({
            "success": True, 
            "message": f"Thank you, {name}! Your message has been received."
        }), 200
    except Exception as e:
        app.logger.error(f"Database error during contact submission: {str(e)}")
        return jsonify({
            "success": False,
            "message": "An internal error occurred while saving your message. Please try again later."
        }), 500

@app.route('/api/messages', methods=['GET'])
def api_get_messages():
    """Retrieve all contact submissions (for testing or dashboard use)."""
    try:
        messages = models.get_all_contact_messages()
        return jsonify({"success": True, "messages": messages}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
