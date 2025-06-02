from flask import Flask, request, jsonify, render_template
from models import insert_event, get_latest_events
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/webhook', methods=['POST'])
def webhook():
    event_type = request.headers.get('X-GitHub-Event')  # 💡 define it first
    payload = request.json

    print(f"Received event type: {event_type}")
    print(f"Payload: {payload}")

    from datetime import datetime, timezone
    timestamp = datetime.now(timezone.utc).strftime('%d %B %Y - %I:%M %p UTC')

    if event_type == 'push':
        author = payload['pusher']['name']
        branch = payload['ref'].split('/')[-1]
        msg = f'"{author}" pushed to "{branch}" on {timestamp}'
        insert_event({'type': 'push', 'message': msg, 'timestamp': datetime.now(timezone.utc)})

    elif event_type == 'pull_request':
        pr = payload['pull_request']
        author = pr['user']['login']
        from_branch = pr['head']['ref']
        to_branch = pr['base']['ref']
        labels = pr.get('labels', [])
        label_names = [label['name'] for label in labels]
        label_text = f" with labels [{', '.join(label_names)}]" if label_names else ""

        if pr['merged']:
            msg = f'"{author}" merged branch "{from_branch}" to "{to_branch}" on {timestamp}{label_text}'
            etype = 'merge'
        else:
            msg = f'"{author}" submitted a pull request from "{from_branch}" to "{to_branch}" on {timestamp}{label_text}'
            etype = 'pull_request'

        insert_event({'type': etype, 'message': msg, 'timestamp': datetime.now(timezone.utc)})

    else:
        print("Unhandled or missing event type.")
        return jsonify({'status': 'ignored'}), 200

    return jsonify({'status': 'success'}), 200

@app.route('/events')
def events():
    return jsonify(get_latest_events())

if __name__ == '__main__':
    app.run(debug=True)
