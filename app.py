from flask import Flask, render_template, request, jsonify
from collections import deque

app = Flask(__name__)

def bfs(capA, capB, goal):
    start = (0, 0)
    queue = deque([[start]])
    visited = set([start])

    while queue:
        path = queue.popleft()
        a, b = path[-1]

        if a == goal:
            return path

        states = [
            (capA, b),                     # Fill A
            (a, capB),                     # Fill B
            (0, b),                        # Empty A
            (a, 0),                        # Empty B
            (min(capA, a+b), max(0, a+b-capA)),  # Pour B → A
            (max(0, a+b-capB), min(capB, a+b))   
        ]

        for s in states:
            if s not in visited:
                visited.add(s)
                queue.append(path + [s])

    return []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/solve", methods=["POST"])
def solve():
    data = request.json
    capA = int(data["capA"])
    capB = int(data["capB"])
    goal = int(data["goal"])

    steps = bfs(capA, capB, goal)
    return jsonify(steps)

if __name__ == "__main__":
    app.run(debug=True)
