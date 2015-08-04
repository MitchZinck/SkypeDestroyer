# SkypeDestroyer
TamperMonkey/GreaseMonkey addon for https://web.skype.com.

Exploits headers and the Skype protocol.

#Features

- Link spoofing
- Change text size
- More to come

# Usage

Load main.js into a Tampermonkey script. Use the following commands when typing a message to somebody on web.skype.com. Also only the desktop and mobile versions of skype will be seeing these exploits in action, the web beta client wont show the exploits for some reason but that is fine since almost nobody uses it.

```
# - Starts the script
!size here! - Determines the font size

E.G.
#[website](text)!font size! - Link spoofed with fontsize changed

#!fontsize!text here - Text with fontsize changed

#[website](text) - Link spoofed

(Font sizes in skype range from 9[Normal Size] to 1[Smallest Size])
```

EXAMPLE

```
#[www.google.com](facebook.com)!4! becomes 
<font size="4"><a href="https://www.google.com">facebook.com</a></font> 
in skype showing up as:
```
<font size="4"><a href="https://www.google.com">facebook.com</a></font>

```
#!4!SkypeDestroyer would show up as <font size="4">SkypeDestroyer</font>
```


