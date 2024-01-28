# Tools / Scripts

To make life and contributing easier there are some tools included into this project (notably findable in the `scripts/`-directory).
Their functionality and how to use them is described below.

## add-contributor

To add a contributor use the `add-contributor`-script. It requires the GitHub-name of the contributor as environment variable or CLI argument.

```bash
# with env
GITHUB_USER=test123 pnpm run add-contributor

# with argument
pnpm run add-contributor test123
```

## add-location

To scaffold a new location (with random id or static name) use the `add-location`-script. It has an optional argument CLI argument for a static name (without that it'll generate a random id).
Rules of thumb here:

- country = static name of the 2 letters representation of their [ISO-code] as argument
- region / city / location = no argument (aka random id)

Why random ids and not static names? => names might be misleading and from a global point of view not unique.<br />
Why no lat / long for locations? In case a location moves it'd be pretty misleading to not update the location, if they invested in stickers or anything fancy they'd need to reproduce that like that..

```bash
# random id
pnpm run add-location

# static id
pnpm run add-location DE
```

# Anything missing?

Feel free to open an issue and explain why a tool needs to be added / behave differently and open a Pull Request with custom stuff (if desired).

[ISO-code]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
