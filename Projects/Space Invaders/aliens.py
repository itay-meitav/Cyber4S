from random import randint


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
