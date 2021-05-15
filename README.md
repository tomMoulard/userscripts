# Userscripts

This repository is where I host all of my user scripts (used with
[tampermonkey](https://www.tampermonkey.net/)).

You can add scripts by adding them in the `scripts/` folder along with a json
file that serve as settings for tampermonkey, like:
```
scripts/
└── Awesome/
    ├── best_script.js
    └── best_script.json
```

Thus, when executing `make`, it will create a `out.json` file that can be
imported into tampermonkey.

Otherwise, you can use be built json files that you can file in the releases
[assets](https://github.com/tommoulard/userscripts/releases)).
