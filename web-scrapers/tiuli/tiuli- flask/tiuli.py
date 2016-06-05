from flask import Flask, render_template, json
app = Flask(__name__, static_url_path='/static')

@app.route("/", methods=['GET'])
def index():
	with open('static/high_rated.json', 'r', encoding='utf-8') as f:
		trips = json.load(f)
	return render_template('trips.html', trips=trips)

if __name__ == "__main__":
	app.run(debug=True)