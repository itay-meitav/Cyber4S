from render import render
from reset import reset
from ship import ship


# game settings
class Game(object):

    def __init__(self, stdscr):
        self.stdscr = stdscr
        self.width = 36
        self.height = 30
        self.pos = []
        self.pos_x_last = 0
        self.lives = []
        self.pos_shoot = []
        self.shoot_time = 0
        self.shoots = 0
        self.shoot_speed = 0.15
        self.score = 0
        self.defence = []

        # aliens
        self.aliens_move_time = 0
        self.aliens_move = 0
        self.aliens30 = []
        self.aliens20 = []
        self.aliens10 = []
        self.alien_dir = 0  # 0 left, 1 right
        self.alien_down = 0
        self.aliens_shoot_time = 0
        self.aliens_shoots = 0
        self.aliens_shoot_pos = []
        self.aliens_speed = 0.5
        self.aliens_shoot_speed = 0.4

    def reset(self):
        reset(self)

    def ship(self, event):
        ship(self, event)

    def render(self):
        render(self)
