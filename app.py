from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Store data in memory (in production, use database)
users_data = {}

@app.route('/')
def index():
    """Serve the main HTML file"""
    return render_template('index.html')

@app.route('/api/generate-cv', methods=['POST'])
def generate_cv():
    """Generate CV from user data"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'phone', 'field', 'summary']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create CV object
        cv = {
            'id': datetime.now().timestamp(),
            'fullName': data.get('fullName'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'experience': data.get('experience', 0),
            'field': data.get('field'),
            'summary': data.get('summary'),
            'skills': data.get('skills', '').split(','),
            'createdAt': datetime.now().isoformat(),
            'template': data.get('template', 'default')
        }
        
        # Store in memory
        user_email = data.get('email')
        if user_email not in users_data:
            users_data[user_email] = []
        users_data[user_email].append(cv)
        
        return jsonify({
            'success': True,
            'cv': cv,
            'message': '✅ تم توليد السيرة الذاتية بنجاح!'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        data = request.json
        
        # Validate
        required_fields = ['name', 'email', 'message']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # In production, send email here
        contact_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'message': data.get('message'),
            'createdAt': datetime.now().isoformat()
        }
        
        # Store contact message
        if 'contacts' not in users_data:
            users_data['contacts'] = []
        users_data['contacts'].append(contact_data)
        
        return jsonify({
            'success': True,
            'message': '✅ شكراً لتواصلك! سنرد عليك قريباً.'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'ProCV API is running',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/stats', methods=['GET'])
def stats():
    """Get statistics"""
    total_cvs = sum(len(cvs) for cvs in users_data.values() if isinstance(cvs, list))
    total_users = len([k for k in users_data.keys() if k != 'contacts'])
    total_contacts = len(users_data.get('contacts', []))
    
    return jsonify({
        'total_cvs': total_cvs,
        'total_users': total_users,
        'total_contacts': total_contacts
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)