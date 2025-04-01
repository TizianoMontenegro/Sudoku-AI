import copy
import random
from solver import StackFrontier, Node

class SudokuGenerator:
    def __init__(self):
        self.empty_board = [[0 for _ in range(9)] for _ in range(9)]
        
    def generate(self, difficulty=40):
        """Generate a random Sudoku puzzle with given difficulty (number of empty cells)"""
        # Start with empty board
        board = copy.deepcopy(self.empty_board)
        
        # Fill the diagonal subgrids (they are independent)
        self.fill_diagonal_subgrids(board)
        
        # Solve the complete board (this will be our solution)
        solution = self.solve_complete_board(board)
        if not solution:
            raise Exception("Could not generate valid Sudoku")
            
        # Create puzzle by removing numbers
        puzzle = self.create_puzzle(solution, difficulty)
        return puzzle
    
    def fill_diagonal_subgrids(self, board):
        """Fill the 3 diagonal subgrids with random valid numbers"""
        for box in range(3):
            nums = random.sample(range(1, 10), 9)
            for i in range(3):
                for j in range(3):
                    row = box * 3 + i
                    col = box * 3 + j
                    board[row][col] = nums.pop()
    
    def solve_complete_board(self, board):
        """Solve the board completely using DFS with your Node/StackFrontier"""
        start_node = Node(copy.deepcopy(board), None, None)
        frontier = StackFrontier()
        frontier.add(start_node)
        
        while not frontier.empty():
            current_node = frontier.remove()
            
            if self.is_complete(current_node.state):
                return current_node.state
                
            empty_pos = self.find_empty(current_node.state)
            if not empty_pos:
                continue
                
            row, col = empty_pos
            for num in random.sample(range(1, 10), 9):  # Try numbers in random order
                if self.is_valid(current_node.state, num, (row, col)):
                    new_state = copy.deepcopy(current_node.state)
                    new_state[row][col] = num
                    frontier.add(Node(new_state, current_node, (row, col, num)))
        
        return None
    
    def create_puzzle(self, solution, difficulty):
        """Create puzzle by removing numbers from solution"""
        puzzle = copy.deepcopy(solution)
        cells = [(i, j) for i in range(9) for j in range(9)]
        random.shuffle(cells)
        
        for i in range(difficulty):
            row, col = cells[i]
            puzzle[row][col] = 0
            
        return puzzle
    
    def is_complete(self, board):
        """Check if board is completely filled"""
        return all(cell != 0 for row in board for cell in row)
    
    def find_empty(self, board):
        """Find first empty cell"""
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    return (row, col)
        return None
    
    def is_valid(self, board, num, pos):
        """Check if number is valid in position"""
        row, col = pos
        # Check row
        if num in board[row]:
            return False
        # Check column
        if num in [board[i][col] for i in range(9)]:
            return False
        # Check subgrid
        sub_x = col // 3
        sub_y = row // 3
        for i in range(sub_y*3, sub_y*3 + 3):
            for j in range(sub_x*3, sub_x*3 + 3):
                if board[i][j] == num and (i,j) != pos:
                    return False
        return True