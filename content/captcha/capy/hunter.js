(() => {

    setInterval(function () {
        let input = document.querySelector(".capy-captcha");
        if (!input) return;

        if (isCaptchaWidgetRegistered("capy", 0)) return;

        getCapyWidgetInfo(input);
    }, 2000);

    const findScript = function (scripts) {
        const scriptUrl = "/puzzle/get_js/?k=PUZZLE_";

        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute("src");
            if (typeof src === "string" && src.indexOf(scriptUrl) > 0) {
                return src;
            }
        }

        return null;
    }

    const getCapyData = function () {
        const scripts = document.querySelectorAll("script");
        let src = findScript(scripts);
        if (src) {
            const url = new URL(src);
            const captchakey = src.match('(PUZZLE_.*)')[1];
            const apiServer = url.origin;

            return [captchakey, apiServer];
        }

        return [ null, null ];
    };

    const getCapyWidgetInfo = function (input) {
        const [ captchakey, apiServer ] = getCapyData();

        if (captchakey) {
            if (!input.id) {
                input.id = "capy-" + captchakey;
            }

            registerCaptchaWidget({
                captchaType: "capy",
                captchakey: captchakey,
                apiServer: apiServer,
                widgetId: 0,
                inputId: input.id,
            });
        }
    };
})()