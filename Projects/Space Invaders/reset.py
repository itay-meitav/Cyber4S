def reset(self):

    self.stdscr.clear()

    # ship position
    self.pos = [self.height - 3, (self.width // 2)]
    self.pos_x_last = 0
    self.pos_shoot = [self.height - 4, 0]
    self.shoot_time = 0
    self.shoots = 0
    self.lives = [3, '⍊', '⍊', '⍊']
    self.score = 0
    self.defence2 = [(y, x) for y in [self.height - 6] for x in range(
        ((self.width // 2) - 10), ((self.width // 2) + 10)) if x % 5 == 0]
    self.defence3 = [(y, x) for y in [self.height - 5] for x in range(0, self.width) if x in [((self.defence2[0][1])-1), ((self.defence2[0][1])), ((self.defence2[0][1])+1), ((self.defence2[1][1])-1), ((
        self.defence2[1][1])), ((self.defence2[1][1])+1), ((self.defence2[2][1])-1), ((self.defence2[2][1])), ((self.defence2[2][1])+1), ((self.defence2[3][1])-1), ((self.defence2[3][1])), ((self.defence2[3][1])+1)]]
    self.defence = self.defence2 + self.defence3

    # aliens position must be stored in list for further moditications
    self.aliens30 = [[y + 4, x + ((self.width // 2) - 10)]
                     for y in range(1) for x in range(22) if x % 2 == 0]
    self.aliens20 = [[y + 5, x + ((self.width // 2) - 10)]
                     for y in range(2) for x in range(22) if x % 2 == 0]
    self.aliens10 = [[y + 7, x + ((self.width // 2) - 10)]
                     for y in range(2) for x in range(22) if x % 2 == 0]
    self.aliens_move = 0
    self.aliens_move_time = 0
    self.alien_down = 0
    self.aliens_shoot_time = 0
    self.aliens_shoots = 0
    self.aliens_shoot_pos = [0, 0]
