(() => {

    setInterval(function () {
        let input = document.querySelector("input[name='fc-token']");

        if (!input) return;

        if (!window.arkoselabs_callback_dse7f73ek) return;

        if (isCaptchaWidgetRegistered("arkoselabs", 0)) return;

        let widgetInfo = getArkoselabsWidgetInfo(input);

        registerCaptchaWidget(widgetInfo);
    }, 2000);

    let getArkoselabsWidgetInfo = function (input) {
        if (!input.id) {
            input.id = "arkoselab-input-0";
        }

        let params = {};

        input.value.split('|').forEach(pair => {
            let p = pair.split('=');
            params[p[0]] = unescape(p[1]);
        });

        return {
            captchaType: "arkoselabs",
            widgetId: 0,
            pkey: params.pk,
            surl: params.surl,
            inputId: input.id,
            callback: "arkoselabs_callback_dse7f73ek",
            data: window["arkoselabs_data_dse7f73ek"] || null,
        };
    };

})()