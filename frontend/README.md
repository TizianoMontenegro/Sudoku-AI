# Sudoku Game with DFS Solver

<!-- ![Sudoku Screenshot](/frontend/public/sudoku-screenshot.png) *(add screenshot image later)* -->

A web-based Sudoku game featuring:
- Random puzzle generation with adjustable difficulty
- DFS-based solver using Node/StackFrontier paradigm
- Interactive React frontend
- Flask backend with REST API

## Features

### Game Features
- 🎲 Random puzzle generation (easy/medium/hard)
- ✅ Automatic solution using AI
<!-- - ✅ Automatic solution validation -->
<!-- - 🏆 Victory popup when puzzle is solved -->
- 🔄 New puzzle generation with one click

### Technical Features
- Depth-First Search (DFS) implementation with backtracking
- Node/StackFrontier architecture for state management
- React/TypeScript frontend with clean UI
- Python/Flask backend API
- Proper Sudoku rule enforcement

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm, pnpm, yarn, or bun (What I used)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
sudoku/
├── backend/               # Flask API
│   ├── app.py             # API endpoints
│   ├── generator.py       # Puzzle generation logic
│   ├── solver.py          # DFS solving logic
│   └── requirements.txt   # Python dependencies
└── frontend/              # React app
    ├── public/            # Static assets like favicons
    └── src/               # Source code
        ├── components/    # React components with their styles
        ├── hooks/         # React Hooks
        └── App.tsx        # Main component
```

## API Endpoints

| Endpoint    | Method | Description                                |
|-------------|--------|--------------------------------------------|
| `/generate` | GET    | Generates new puzzle (`?difficulty=30-50`) |
| `/solve`    | POST   | Solves submitted board                     |

## How the Solver Works

1. **DFS Implementation**:
   - Uses `Node` class to represent board states
   - `StackFrontier` manages the search stack
   - Backtracks when invalid states are encountered

2. **Puzzle Generation**:
   - Fills diagonal subgrids first
   - Completes board using randomized DFS
   - Removes numbers based on difficulty level

## Customizing Difficulty

Adjust the difficulty parameter:
- Easy: 30 empty cells
- Medium: 40 empty cells
- Hard: 50 empty cells

Example API call:
```bash
GET http://localhost:5000/generate?difficulty=45
```

## Future Enhancements

- [ ] Timer and score system
- [ ] Hint functionality
- [ ] Save/load game state
- [ ] Mobile responsiveness improvements
- [ ] Confetti animation on win

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

MIT License - see [LICENSE](LICENSE) file