from time import time
from aliens import alien_direction
from lose import lose
import curses


def render(self):

    # score bar
    self.stdscr.addstr(0, 0, "Score: " + '{0}'.format(self.score))

    # lives bar
    curses.start_color()
    curses.init_pair(3, curses.COLOR_BLACK, curses.COLOR_WHITE)
    self.stdscr.attron(curses.color_pair(3))
    self.stdscr.addstr(
        (self.height - 1), 0, '{}  {}'.format(self.lives[0], ' '.join(self.lives[1:])))
    self.stdscr.addstr(self.height - 1, 8, " " *
                       (self.width - 8 - 1))
    self.stdscr.attroff(curses.color_pair(3))

    # ship render
    self.stdscr.addstr(self.pos[0], self.pos[1], '⍊')
    if self.pos[1] != self.pos_x_last:
        self.stdscr.addstr(self.pos[0], self.pos_x_last, ' ')

    # ship shoot
    if self.pos_shoot[0] == 1:
        self.shoots = 0
        self.stdscr.addstr(self.pos_shoot[0] + 1, self.pos_shoot[1], ' ')
        self.pos_shoot[0] = self.height - 4
    if self.shoots != 0:
        if self.pos_shoot[0] < self.height - 4:
            self.stdscr.addstr(
                self.pos_shoot[0] + 1, self.pos_shoot[1], ' ')
        self.stdscr.addstr(self.pos_shoot[0], self.pos_shoot[1], '|')
        if time() - self.shoot_time > self.shoot_speed:  # shoot speed
            self.pos_shoot[0] -= 1
            self.shoot_time = time()

    # ship shoot hit
    shotposchar = str(self.stdscr.inch(
        self.pos_shoot[0], self.pos_shoot[1]))
    if shotposchar != '32' and shotposchar != '124':  # space and shoot symbol '|'
        self.stdscr.addstr(
            self.pos_shoot[0], self.pos_shoot[1], ' ')  # shoting pos
        # clear shooting animation
        self.stdscr.addstr(self.pos_shoot[0] + 1, self.pos_shoot[1], ' ')
        if (self.pos_shoot[0], self.pos_shoot[1]) in self.defence:
            self.defence.remove((self.pos_shoot[0], self.pos_shoot[1]))
            self.shoots = 0
            self.pos_shoot[0] = self.height - 4
        elif ([self.pos_shoot[0], self.pos_shoot[1]]) in self.aliens10:
            self.aliens10.remove([self.pos_shoot[0], self.pos_shoot[1]])
            self.shoots = 0
            self.pos_shoot[0] = self.height - 4
            self.score += 10
        elif ([self.pos_shoot[0], self.pos_shoot[1]]) in self.aliens20:
            self.aliens20.remove([self.pos_shoot[0], self.pos_shoot[1]])
            self.shoots = 0
            self.pos_shoot[0] = self.height - 4
            self.score += 20
        elif ([self.pos_shoot[0], self.pos_shoot[1]]) in self.aliens30:
            self.aliens30.remove([self.pos_shoot[0], self.pos_shoot[1]])
            self.shoots = 0
            self.pos_shoot[0] = self.height - 4
            self.score += 30

    # render blocks
    for n in self.defence:
        self.stdscr.addstr(n[0], n[1], '#')

    # render aliens
    if time() - self.aliens_move_time > self.aliens_speed:  # aliens animation speed
        aliens = self.aliens10 + self.aliens20 + self.aliens30
        for n in aliens:  # checking if aliens need to change direction and go 1 level down
            if n[1] == 0:
                self.alien_dir = 1
                self.alien_down = 1
            elif n[1] == self.width - 1:
                self.alien_dir = 0
                self.alien_down = 1
        if self.alien_down == 1:
            aliens.sort()
            self.stdscr.clear()
            for n in self.aliens10:
                n[0] += 1
            for n in self.aliens20:
                n[0] += 1
            for n in self.aliens30:
                n[0] += 1
            self.alien_down = 0
        self.stdscr.clear()
        for n in self.aliens10:
            n[1] = alien_direction(self, n)  # making new positions
        for n in self.aliens20:
            n[1] = alien_direction(self, n)
        for n in self.aliens30:
            n[1] = alien_direction(self, n)
        self.aliens_move = 0
    for n in self.aliens30:  # rendering aliens on new positions
        self.stdscr.addstr(n[0], n[1], '^')
    for n in self.aliens20:
        self.stdscr.addstr(n[0], n[1], '¤')
    for n in self.aliens10:
        self.stdscr.addstr(n[0], n[1], 'ж')

    # aliens shoot
    if self.aliens_shoot_pos[0] == self.height - 2:  # shoot reaching bottom
        self.aliens_shoots = 0
        self.stdscr.addstr(
            self.aliens_shoot_pos[0] - 1, self.aliens_shoot_pos[1], ' ')
    if self.aliens_shoots != 0:
        aliens = self.aliens30 + self.aliens20 + self.aliens10
        aliens.sort(reverse=True)
        if self.aliens_shoot_pos[0] > aliens[0][0]+1:
            self.stdscr.addstr(
                self.aliens_shoot_pos[0] - 1, self.aliens_shoot_pos[1], ' ')
        self.stdscr.addstr(
            self.aliens_shoot_pos[0], self.aliens_shoot_pos[1], '$')
        if time() - self.aliens_shoot_time > self.aliens_shoot_speed:  # shoot speed
            self.aliens_shoot_pos[0] += 1
            self.aliens_shoot_time = time()

    # if aliens shoot hit
    if self.aliens_shoots != 0:
        if (self.aliens_shoot_pos[0], self.aliens_shoot_pos[1]) in self.defence:
            self.defence.remove(
                (self.aliens_shoot_pos[0], self.aliens_shoot_pos[1]))
            self.aliens_shoots = 0

        # when ship getting hit
        elif (self.aliens_shoot_pos[0], self.aliens_shoot_pos[1]) == (self.pos[0], self.pos[1]):
            self.aliens_shoots = 0
            if self.lives[0] > 0:
                self.lives[0] -= 1
                self.lives.append(" ")
                self.lives.append(" ")
                self.lives.remove('⍊')
            if self.lives[0] == 0:
                lose(self)

    # when aliens get hit
    aliens = self.aliens30 + self.aliens20 + self.aliens10
    aliens.sort(reverse=True)
    for n in aliens:
        if tuple(n) in self.defence:
            self.defence.remove(tuple(n))

    # when aliens get the bottom
    aliens = self.aliens30 + self.aliens20 + self.aliens10
    aliens.sort(reverse=True)
    if aliens[0][0] == self.height - 3:
        lose(self)

    # if no aliens left
    aliens = self.aliens30 + self.aliens20 + self.aliens10
    if len(aliens) == 0:
        score = self.score
        self.reset()
        self.score = score
