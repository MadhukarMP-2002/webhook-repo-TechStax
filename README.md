# Webhook Repo – TechStax
A Flask-based webhook listener application that captures GitHub events and stores them in MongoDB.


## 🚀 Features
- Receives GitHub Webhook events (e.g., push, pull requests, merges)
- Stores event data securely in MongoDB
- API to fetch latest 10 events
- Renders events with clear formatting


# 📁 Project Structure
.
├── app.py               # Main Flask app
├── db.py                # MongoDB connection + DB helper functions
├── templates/
│   └── index.html       # UI for viewing events
├── static/
│   └── main.js          # JS for dynamic rendering
├── .env                 # Environment variables (ignored in Git)
├── .gitignore
├── requirements.txt
└── README.md

## 🚀 Getting Started
```bash
git clone https://github.com/MadhukarMP-2002/webhook-repo-TechStax.git
cd webhook-repo-TechStax
pip install -r requirements.txt
python server.py
Visit http://127.0.0.1:3000/ in your browser.
ngrok http 3000
```
# also u can add the deployed url if the project is deployed in cloud(render,aws,etc)

# GitHub Webhook Setup or Action-repo Setuo
1. Navigate to your GitHub repository Settings -> Webhooks

2. Click Add webhook

3. Configure:

    -Payload URL: http://your-server-url/events (replace with your ngrok or deployed URL)

    -Content type: application/json

    -Which events: Select Just the push event or Send me everything

4. Click Add webhook
  
