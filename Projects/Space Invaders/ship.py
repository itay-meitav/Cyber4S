import curses


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
        game.pos_shoot[1] = game.pos[1]
