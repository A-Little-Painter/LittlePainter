# app.py
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    print("Hello D106")


if __name__ == "__main__":
    app.run(port=8700, debug=True)
