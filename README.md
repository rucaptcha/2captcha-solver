# About

## Supported captcha types:
- Normal (image with text)
- reCAPTCHA V2, V3
- hCaptcha
- GeeTest, GeeTest V4
- KeyCaptcha
- ArkoseLabs (FunCaptcha)
- Lemin
- Yandex Smart Captcha
- Capy Puzzle
- Cloudflare Turnstile
- Amazon WAF Captcha

## Supported browsers:
- Chrome/Chromium 89+
- Firefox 89+

Should aslo work fine with all Chromium-based browsers like Opera, Yandex Browser, Ghost Browser and even AdsPower with proper Chrome version inside.

Chrome/Chromim version uses [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
Firefox version uses [Manifest V2](https://developer.chrome.com/docs/extensions/mv2/) because V3 is not supported in Firefox yet and due to that firefox version is located in a separate branch `firefox`. Please keep this in mind if you are planning to use the extension in Firefox. 


## Supported captcha bypass services:
- [2captcha.com](https://2captcha.com)
- [rucaptcha.com](https://rucaptcha.com)

Extension automatically detects which service to use when you enter your `API KEY` in the configuration.


# Install
- [Chrome Web Store](https://chrome.google.com/webstore/detail/2captcha-solver/ifibfemgeogfhoebkmokieepdoobkbpo)
- [Firefox Add-Ons](https://addons.mozilla.org/en-US/firefox/addon/2captcha-solver)
- [Load an unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked)
- [How to use in Puppeteer](https://2captcha.com/blog/how-to-use-2captcha-solver-extension-in-puppeteer)

# How does it work

There are 3 scripts for each captcha type:
* `processor.js` - required for any type. The script defines the extension logic: where to place the button, what to do when the answer is received, etc.
* `hunter.js` - looking for the captcha on page. Any found captcha is added to `captcha-widgets` collection.
* `interceptor.js` - intercept captchas that are loaded dynamically from a function/method call. Redefines the methods to intercept captcha parameters then adds the captcha to `captcha-widgets` collection.

The main script [`content/script.js`](content/script.js) periodically checks the `captcha-widgets` collection and applies the required logic to the captchas. The `captcha-widgets` collection is stored inside `<head>` tag.


# Want to contribute?
Follow the contribution guide below:

### Step 1: Fork
Fork the project on GitHub and clone your fork locally.

```
git clone git@github.com:username/2captcha-solver.git
cd 2captcha-solver
git remote add upstream git@github.com:2captcha/2captcha-solver.git 
git fetch upstream
```

### Step 2: Branch
To keep things organized, create local branches to hold your work. These should be branched directly off of the `main` branch.

```
git checkout -b my-branch -t upstream/main
```

### Step 3: Commit
It is recommended to keep your changes grouped logically within individual commits. There is no limit to the number of commits in a pull request.

### Step 4: Rebase
Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```
git fetch upstream
git rebase upstream/main
```

### Step 5: Test
At the moment there's no automated tests availble for the extension so please do all your best to make sure that you didn't break anything and your changes do work as expected.

### Step 6: Push
Once your commits are ready to go begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```
git push origin my-branch
```

### Step 7: Pull Request
From within GitHub, opening a new pull request describing the changes you made. 
