from ship import shipRender
from ship import shipShot
from ship import shipShotHit
from aliens import AliensDirection, renderAliens
from aliens import aliensShot
from aliens import aliensShotHit
from lose import lose
import curses


def render(self):
    self.stdscr.clear()

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

    # # ship section
    shipRender(self)
    shipShotHit(self)
    shipShot(self)

    # render defence blocks
    for n in self.defence:
        self.stdscr.addstr(n[0], n[1], '#')

    # aliens section
    AliensDirection(self)
    renderAliens(self)
    aliensShot(self)
    aliensShotHit(self)
    self.stdscr.refresh()

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
