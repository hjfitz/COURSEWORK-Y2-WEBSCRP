# Details
## Technology
All of the configuration is stored in a config file, which is gotten every time the page is stored. It is stored in localstorage, to reduce the strain on the server.

### Configuration
There is a page, `/config`, which allows you to select information such as:
  - Header colour;
    - Subsequently the select colour
  - News source;
  - Subreddits (Picture of the moment);
  - Account (Agenda).

### API
Getting subdomains to work with Express was a bit of a pain. I eventually found `express-subdomain` which looked promising - but it just wouldn't work. Eventually I had to change my `/etc/hosts` (or whatever the Windows equivalent was). I had two entries, which you may well see in `init.sh`. Both point to `127.0.0.1`, one for `api.$DOMAIN.$TLD` and one for `$DOMAIN.$TLD`.  

It looks pretty slick, and I can separate my routes from my api, giving a js file for each.


## Layout
- The layout is split in to 4 main boxes
  - Picture of the moment
    - Grabs a random image from either a subreddit of choice, or NASAs APOD.
