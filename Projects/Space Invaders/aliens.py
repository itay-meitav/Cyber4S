from random import randint
from time import time
from lose import lose


def aliens(self):
    aliens = self.aliens30 + self.aliens20 + self.aliens10
    aliens.sort(reverse=True)
    self.aliens_shoot_pos = [aliens[0][0] + 1,
                             aliens[randint(1, len(aliens))-1][1]]
    self.aliens_shoots = 1


def alien_direction(self, position):
    if self.alien_dir == 0:
        position = position[1] - 1
    elif self.alien_dir == 1:
        position = position[1] + 1
    return position


# render the aliens
def AliensDirection(self):
    if time() - self.aliens_move_time > self.aliens_speed:  # aliens animation speed
        aliens = self.aliens10 + self.aliens20 + self.aliens30
        for n in aliens:  # checking if aliens need to change direction and go 1 level down
            if n[1] <= 1:
                self.alien_dir = 1
                self.alien_down = 1
            elif n[1] >= self.width - 1:
                self.alien_dir = 0
                self.alien_down = 1
        if self.alien_down == 1:
            aliens.sort()
            # self.stdscr.clear()
            for n in self.aliens10:
                n[0] += 1
            for n in self.aliens20:
                n[0] += 1
            for n in self.aliens30:
                n[0] += 1
            self.alien_down = 0
        # self.stdscr.clear()
        renderAliensWhileMoving(self)


# # rendering aliens on the new positions
def renderAliensWhileMoving(self):
    for n in self.aliens10:
        n[1] = alien_direction(self, n)
    for n in self.aliens20:
        n[1] = alien_direction(self, n)
    for n in self.aliens30:
        n[1] = alien_direction(self, n)
    self.aliens_move = 0


def renderAliens(self):
    for n in self.aliens30:
        self.stdscr.addstr(n[0], n[1], '^')
    for n in self.aliens20:
        self.stdscr.addstr(n[0], n[1], '¤')
    for n in self.aliens10:
        self.stdscr.addstr(n[0], n[1], 'ж')


def aliensShot(self):
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


# if aliens shot hits
def aliensShotHit(self):
    if self.aliens_shoots != 0:
        if (self.aliens_shoot_pos[0], self.aliens_shoot_pos[1]) in self.defence:
            self.defence.remove(
                (self.aliens_shoot_pos[0], self.aliens_shoot_pos[1]))
            self.aliens_shoots = 0
        elif (self.aliens_shoot_pos[0], self.aliens_shoot_pos[1]) == (self.pos[0], self.pos[1]):
            self.aliens_shoots = 0
            if self.lives[0] > 0:
                self.lives[0] -= 1
                self.lives.append(" ")
                self.lives.append(" ")
                self.lives.remove('⍊')
            if self.lives[0] == 0:
                lose(self)
