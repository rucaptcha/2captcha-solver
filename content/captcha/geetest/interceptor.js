(() => {

    let originalFunc;

    Object.defineProperty(window, "initGeetest", {
        get: function () {
            return initGeetestHandler;
        },
        set: function (f) {
            originalFunc = f;
        },
    });

    let initGeetestHandler = function (params, callback) {
        setTimeout(function() {
            interceptorFunc(params, callback);
        }, 200);
    };

    let interceptorFunc = function (params, callback) {

        let getSelectorId = function (selector) {
            let id;

            /* selector is jQuery object */
            if (typeof selector === "object" && selector[0] !== undefined) {
                selector = selector[0];
            }

            if (typeof selector === "object" && typeof selector.appendChild !== "undefined") {
                if (selector.id) {
                    id = "#" + selector.id
                } else {
                    let n = document.createElement(selector.tagName);
                    n.id = "antcpt" + Math.round(Math.random() * 1e3);
                    selector.appendChild(n);
                    id = "#" + n.id
                }
            } else if (typeof selector === "string") {
                id = selector
            }

            if (id[0] == "#") {
                id = id.substr(1);
            }

            return id;
        };

        let initHelper = function (selector) {
            registerCaptchaWidget({
                captchaType: "geetest",
                widgetId: 0,
                containerId: getSelectorId(selector),
                gt: params.gt,
                challenge: params.challenge,
                apiServer: params.api_server || null,
            });
        };


        let captchaObjEvents = {};


        let captchaObj = {
            appendTo: function (selector) {
                if (params.product !== "bind") {
                    initHelper(selector);
                }
                return this
            },
            bindForm: function (selector) {
                initHelper(selector);
            },
            onReady: function (e) {
                captchaObjEvents.onReady = e;
                return this
            },
            onSuccess: function (e) {
                captchaObjEvents.onSuccess = e;
                return this
            },
            onError: function (e) {
                captchaObjEvents.onError = e;
                return this
            },
            onClose: function (e) {
                captchaObjEvents.onClose = e;
                return this
            },
            getValidate: function () {
                return {
                    geetest_challenge: null,
                    geetest_validate: null,
                    geetest_seccode: null,
                };
            },
            validate: function(e) {
                return this
            },
            verify: function () {

            },
            reset: function () {

            },
            destroy: function() {

            },
            hide: function() {

            },
            show: function() {

            },
            setInfos: function(e) {

            },
        };

        let captchaObjProxy = new Proxy(captchaObj, {
            get: function(target, prop) {
                if (prop in target) {
                    return target[prop];
                } else {
                    return function() {};
                }
            },
        });

        if (typeof callback === "function") {
            callback(captchaObjProxy)
        }

        window.captchaObj = captchaObj;
        window.captchaObjEvents = captchaObjEvents;
    };

})()