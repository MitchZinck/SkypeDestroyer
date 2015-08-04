# SkypeDestroyer
TamperMonkey/GreaseMonkey addon for https://web.skype.com.

Exploits headers and the Skype protocol.

#Features

- Link spoofing
- Change text size
- More to come

# Usage

```
# - Starts the script
!size here! - Determines the font size

#[website](text)!font size! OR #!fontsize!text here (Font sizes in skype range from 9[Normal Size] to 1[Smallest Size])
```

EXAMPLE

```
#[www.google.com](facebook.com)!4! becomes <font size="4"><a href="https://www.google.com">facebook.com</a></font> in skype showing up as:
```
<font size="4"><a href="https://www.google.com">facebook.com</a></font>

```
#!4!SkypeDestroyer would show up as <font size="4">SkypeDestroyer</font>
```


