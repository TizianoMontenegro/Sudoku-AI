import copy

class Node():
    def __init__(self, state, parent, action):
        self.state = state
        self.parent = parent
        self.action = action  # (row, col, number)

class StackFrontier():
    def __init__(self):
        self.frontier = []

    def add(self, node):
        self.frontier.append(node)

    def contains_state(self, state):
        return any(node.state == state for node in self.frontier)

    def empty(self):
        return len(self.frontier) == 0

    def remove(self):
        if self.empty():
            raise Exception("empty frontier")
        else:
            return self.frontier.pop()

class SudokuSolver:
    def __init__(self):
        self.solution = None
        
    def solve(self, initial_board):
        # Initialize frontier with initial state
        start_node = Node(copy.deepcopy(initial_board), None, None)
        frontier = StackFrontier()
        frontier.add(start_node)

        while not frontier.empty():
            current_node = frontier.remove()
            
            if self.is_solved(current_node.state):
                self.solution = current_node.state
                return True

            # Get next empty cell
            empty_pos = self.find_empty(current_node.state)
            if not empty_pos:
                continue

            row, col = empty_pos
            for num in range(1, 10):
                if self.is_valid(current_node.state, num, (row, col)):
                    new_state = copy.deepcopy(current_node.state)
                    new_state[row][col] = num
                    frontier.add(Node(new_state, current_node, (row, col, num)))

        return False

    def is_solved(self, board):
        for row in board:
            if 0 in row:
                return False
        return self.is_valid_complete(board)

    def find_empty(self, board):
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    return (row, col)
        return None

    def is_valid(self, board, num, pos):
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

    def is_valid_complete(self, board):
        # Check all rows
        for row in board:
            if sorted(row) != list(range(1, 10)):
                return False
        # Check all columns
        for col in range(9):
            column = [board[row][col] for row in range(9)]
            if sorted(column) != list(range(1, 10)):
                return False
        # Check all subgrids
        for i in range(3):
            for j in range(3):
                subgrid = [board[x][y] for x in range(i*3, (i+1)*3) 
                                    for y in range(j*3, (j+1)*3)]
                if sorted(subgrid) != list(range(1, 10)):
                    return False
        return True

def solve_sudoku(board):
    solver = SudokuSolver()
    if solver.solve(board):
        return solver.solution
    return None
