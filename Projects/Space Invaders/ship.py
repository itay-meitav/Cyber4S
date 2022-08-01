import curses
from time import time


# ship controllers
def ship(game, event):
    if event == curses.KEY_LEFT:
        game.pos_x_last = game.pos[1]
        game.pos[1] -= 1
        if game.pos[1] < 1:
            game.pos[1] = 0
    if event == curses.KEY_RIGHT:
        game.pos_x_last = game.pos[1]
        game.pos[1] += 1
        if game.pos[1] > game.width - 1:
            game.pos[1] = game.width - 1
    # shoot
    if event == 32:  # if SPACE
        game.shoots = 1
        game.ship_shots = 1
        game.pos_shoot[1] = game.pos[1]


def shipRender(self):
    # ship render
    self.stdscr.addstr(self.pos[0], self.pos[1], '⍊')
    if self.pos[1] != self.pos_x_last:
        self.stdscr.addstr(self.pos[0], self.pos_x_last, ' ')


# ship shot
def shipShot(self):
    if self.pos_shoot[0] == 1:
        self.shoots = 0
        self.stdscr.addstr(self.pos_shoot[0] + 1, self.pos_shoot[1], ' ')
        self.pos_shoot[0] = self.height - 4
        self.ship_shots = 0
    if self.shoots != 0:
        if self.pos_shoot[0] < self.height - 4:
            self.stdscr.addstr(
                self.pos_shoot[0] + 1, self.pos_shoot[1], ' ')
        self.stdscr.addstr(self.pos_shoot[0], self.pos_shoot[1], '+')
        # shooting speed
        if time() - self.shoot_time > self.shoot_speed:
            self.pos_shoot[0] -= 1
            self.shoot_time = time()
    shipShotHit(self)


def shipShotHit(self):
    # ship shot hits
    shotposchar = str(self.stdscr.inch(self.pos_shoot[0], self.pos_shoot[1]))

    # space and shoot symbol '+'
    if self.ship_shots > 0:

        # shooting position
        self.stdscr.addstr(self.pos_shoot[0], self.pos_shoot[1], '+')

        # clear shooting animation
        self.stdscr.addstr(self.pos_shoot[0] + 1, self.pos_shoot[1], ' ')

        isHit = False
        #  shooting possibiles and score change
        if (self.pos_shoot[0], self.pos_shoot[1]) in self.defence:
            self.defence.remove((self.pos_shoot[0], self.pos_shoot[1]))
            isHit = True

        elif ([self.pos_shoot[0], self.pos_shoot[1]]) in self.aliens10:
            self.aliens10.remove([self.pos_shoot[0], self.pos_shoot[1]])
            self.score += 10
            isHit = True
        elif ([self.pos_shoot[0], self.pos_shoot[1]]) in self.aliens20:
            self.aliens20.remove([self.pos_shoot[0], self.pos_shoot[1]])
            self.score += 20
            isHit = True
        elif ([self.pos_shoot[0], self.pos_shoot[1]]) in self.aliens30:
            self.aliens30.remove([self.pos_shoot[0], self.pos_shoot[1]])
            self.score += 30
            isHit = True
        if isHit:
            # shot hits effect
            self.stdscr.addstr(self.pos_shoot[0], self.pos_shoot[1] - 1, " * ")
            self.stdscr.addstr(
                self.pos_shoot[0] - 1, self.pos_shoot[1] - 1, "* *")
            self.stdscr.addstr(
                self.pos_shoot[0] + 1, self.pos_shoot[1] - 1, "* *")
            self.shoots = 0
            self.pos_shoot[0] = self.height - 4
            self.ship_shots = 0
