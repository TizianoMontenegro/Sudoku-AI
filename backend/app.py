from flask import Flask, jsonify, request
from flask_cors import CORS
from solver import solve_sudoku
from generator import SudokuGenerator

app = Flask(__name__)
CORS(app)

@app.route('/solve', methods=['POST'])
def solve():
    try:
        data = request.get_json()
        board = data['board']
        solution = solve_sudoku([row.copy() for row in board])
        return jsonify({'solution': solution})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

generator = SudokuGenerator()

@app.route('/generate', methods=['GET'])
def generate_puzzle():
    try:
        difficulty = request.args.get('difficulty', default=40, type=int)
        puzzle = generator.generate(difficulty)
        return jsonify({'puzzle': puzzle})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)