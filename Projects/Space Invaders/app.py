import curses
from aliens import aliens
from game import Game
from time import time


def draw_menu(stdscr):
    spaceinv = Game(stdscr)
    # Clear and refresh the screen
    curses.curs_set(0)
    stdscr.clear()
    stdscr.refresh()

    # Start colors in curses
    curses.start_color()
    curses.init_pair(1, curses.COLOR_CYAN, curses.COLOR_BLACK)
    curses.init_pair(2, curses.COLOR_RED, curses.COLOR_BLACK)

    # Initialization
    stdscr.clear()
    height, width = stdscr.getmaxyx()

    # Declaration of strings
    title = "Space Invaders"[:width-1]
    subTitle = "Itay Meitav"[:width-1]
    keysTitle = "(p) for Play | (q) for Quit"[:width-1]
    noteTitle = "For better experience set the terminal to 30x36"[:width-1]

    # Centering calculations
    start_x_title = int((width // 2) - (len(title) // 2) - len(title) % 2)
    start_x_subtitle = int(
        (width // 2) - (len(subTitle) // 2) - len(subTitle) % 2)
    start_x_keystr = int(
        (width // 2) - (len(keysTitle) // 2) - len(keysTitle) % 2)
    start_x_note = int(
        (width // 2) - (len(noteTitle) // 2) - len(noteTitle) % 2)
    start_y = int((height // 2) - 2)

    # Turning on attributes for title
    stdscr.attron(curses.color_pair(2))
    stdscr.attron(curses.A_BOLD)

    # Rendering title
    stdscr.addstr(start_y, start_x_title, title)

    # Turning off attributes for title
    stdscr.attroff(curses.color_pair(2))
    stdscr.attroff(curses.A_BOLD)

    # Turning on attributes for title
    stdscr.attron(curses.color_pair(1))
    stdscr.attron(curses.A_BOLD)

    # Rendering sub-title
    stdscr.addstr(start_y + 1, start_x_subtitle, subTitle)

    # Turning off attributes for sub-title
    stdscr.attroff(curses.color_pair(1))
    stdscr.attroff(curses.A_BOLD)

    # Print rest of text
    stdscr.addstr(start_y + 3, (width // 2) - 2, '-' * 4)
    stdscr.addstr(start_y + 5, start_x_keystr, keysTitle)
    stdscr.addstr(start_y + 7, start_x_note, noteTitle)

    while True:
        stdscr.nodelay(1)
        event = stdscr.getch()
        screen = stdscr.getmaxyx()
        spaceinv.height, spaceinv.width = screen[0], screen[1]
        if event == ord('p'):
            spaceinv.reset()
            stdscr.clear()
            while True:
                if spaceinv.aliens_move == 0:
                    spaceinv.aliens_move_time = time()
                    spaceinv.aliens_move = 1
                if spaceinv.aliens_shoots == 0:
                    aliens(spaceinv)
                    spaceinv.aliens_shoot_time = time()
                spaceinv.render()
                event = stdscr.getch()
                if event in [curses.KEY_LEFT, curses.KEY_RIGHT]:
                    spaceinv.ship(event)
                elif event == 32:  # is SPACE
                    if spaceinv.shoots == 0:
                        spaceinv.ship(event)
                        spaceinv.shoot_time = time()
                elif event == ord('q'):
                    stdscr.clear()
                    break
        elif event == ord('q'):
            break


def main():
    curses.wrapper(draw_menu)


if __name__ == "__main__":
    main()
