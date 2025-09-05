# SkypeDestroyer (Archived)

Experimental Tampermonkey/Greasemonkey userscript for https://web.skype.com that demonstrates message transformation techniques:
- Link text vs. destination spoofing
- Custom font sizes
- Sending unescaped HTML

This project is intentionally preserved as historical/educational code. The Skype Web app has changed since this was written, so the script is likely outdated or non‑functional on modern Skype. 

---

## Features

- Link spoofing: Render link text that differs from the actual destination URL.
- Font size controls: Inline command to adjust font size of the outgoing message.
- Unescaped HTML passthrough: Send raw HTML without Skype’s automatic escaping.
- Quick inline command syntax (see Usage).

---

## Getting started

1) Install a userscript manager:
- Chrome/Edge: Tampermonkey
- Firefox: Greasemonkey or Tampermonkey

2) Create a new userscript and paste in the contents of `main.js`.

3) Ensure the script runs on:
- https://web.skype.com/*
  
4) Open https://web.skype.com, start a conversation, and use the commands below.

> Note: Because Skype Web evolved, this script may no longer hook the same DOM/events. The README preserves the original behavior for reference.

---

## Usage

Prefix messages with a `#` to enable transformation. Commands are inline and can be combined.

- `#` — Start/enable transformation for the current message.
- `!<size>!` — Set the font size (e.g., `!4!`). Skype sizes range from 1 (smallest) to large values; 9 was the original default.
- `#[website](text)` — Render a link where the display text differs from the destination.
- `##` — Passthrough mode. If the command starts with `##`, everything after is pasted into Skype verbatim (double hashtags removed) and HTML entities are unescaped.

Examples:
```text
# [website](text)!font size!
    -> Link spoofed with font size changed

# !font size!text here
    -> Text with font size changed

# [website](text)
    -> Link spoofed (text vs href)
```

Full examples from the original script:

```text
#[www.google.com](facebook.com)!4!
```

Becomes
```html
<font size="4"><a href="https://www.google.com">facebook.com</a></font>
```

```text
#!4!SkypeDestroyer
```

Becomes
```html
<font size="4">SkypeDestroyer</font>
```

Notes:
- “Unescaped HTML” means Skype’s automatic escaping is bypassed. Treat this as unsafe input; do not paste untrusted content.
- Default Skype font size was 9 at the time; sizes may behave differently now.

---

## How it works (high level)

- Runs as a userscript on web.skype.com.
- Watches the message compose area and intercepts content on send.
- Parses simple inline commands (e.g., `#`, `!<size>!`, `#[url](text)`, `##`).
- Transforms the outgoing HTML accordingly (e.g., injects `<font size="...">`, creates custom `<a href=...>` anchors, or sends unescaped HTML).
