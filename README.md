
# <img src="docs/img/perfectCookie.png" width="24"> Cookie Clicker

A mirror of all the files needed to play [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/).
This can be useful if you want to:
- Play offline
- Make your own deploy
- Read the code to make a mod... or cheat 😅

# How to use

Either download the repo or clone it and host the `/docs` folder using a http server of your preference.

# How it works

There is a node script that downloads all the files needed to run the game and saves them in the `/docs` folder.

The list of needed files was obtained by inspecting the code and by looking at the steam version files.

### External files

Besides the files that the script downloads there are a few special files needed, these are files that were added manually to make sure the game is playable offline.

- `grab.json`: On load the game makes a http request, to avoid this I created this mock response and use it instead. I set the heralt to 100.
- fonts: The game uses Merriweather font, to avoid downloading the font from the web I made a local copy. This is the same approach as the steam version.

### Ads and trackers

In the `index.html` there are a few ads and trackers setup, I manually removed them. So for future updates these need to be removed manually again.

### Mods

The [Cookie Monster](https://github.com/CookieMonsterTeam/CookieMonster) addon is included by default.

# Contributing

You are welcome to open PRs.
