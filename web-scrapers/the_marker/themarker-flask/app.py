from flask import Flask, render_template, request, json
app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    options = [
        {'id':'main','text':'כללי'},
        {'id':'news','text':'חדשות'},
        {'id':'tech','text':'טכנולוגיה'},
        {'id':'business','text':'עסקים'},
        {'id':'cars','text':'רכב'},
        {'id':'realestate','text':'נדל"ן'},
        {'id':'markets','text':'שוק'},
        {'id':'finance','text':'כלכלה'}
    ]
    if request.method == 'POST' and 'category' in request.form:
        category = request.form['category']
        for option in options:
            if option['id'] == category:
                category_he = option['text']
                break
        with open('../jsons/themarker_' + category + '.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return render_template('data.html', category=category_he, data=data)
    return render_template('index.html', options=options)

if __name__ == '__main__':
    app.run(debug=True)