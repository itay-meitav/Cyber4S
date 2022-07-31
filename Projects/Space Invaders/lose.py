
from time import sleep

from reset import reset


def lose(self):
    self.stdscr.addstr(3, (self.width // 2) - 4, 'YOU LOSE')
    self.stdscr.refresh()
    sleep(2)
    reset(self)
