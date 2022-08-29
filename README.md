This may be outdated/not working.

# SkypeDestroyer
TamperMonkey/GreaseMonkey addon for https://web.skype.com.

Exploits headers and the Skype protocol.

#Features

- Link spoofing
- Change text size
- Unescaped html
- More to come

# Usage

Load main.js into a Tampermonkey script. Use the following commands when typing a message to somebody on web.skype.com. Also only the desktop and mobile versions of skype will be seeing these exploits in action, the web beta client wont show the exploits for some reason but that is fine since almost nobody uses it.

```
# - Starts the script
!size here! - Determines the font size
## - If the command starts with this then everything after is copy pasted 
into skype without the double hashtags. Html and other entities 
are also unescaped because Skype automatically escapes 
them so you can fiddle with html without Skype automatically escaping it.

E.G.
#[website](text)!font size! - Link spoofed with fontsize changed

#!fontsize!text here - Text with fontsize changed

#[website](text) - Link spoofed

(Font sizes in skype range from 1[Smallest] to a huge amount. 9 is default size.
```

# EXAMPLES

```
#[www.google.com](facebook.com)!4! changes the message in the header to
<font size="4"><a href="https://www.google.com">facebook.com</a></font> 
showing up as:
```
<font size="4"><a href="https://www.google.com">facebook.com</a></font>

```
#!4!SkypeDestroyer would show up as <font size="4">SkypeDestroyer</font>
```

