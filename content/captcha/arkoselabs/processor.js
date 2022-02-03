CaptchaProcessors.register({

    captchaType: "arkoselabs",

    canBeProcessed: function(widget, config) {
        if (!config.enabledForArkoselabs) return false;

        if (!widget.pkey) return false;

        return true;
    },

    attachButton: function(widget, config, button) {
        let input = $("#" + widget.inputId);

        input.after(button);

        if (config.autoSolveArkoselabs) button.click();
    },

    getParams: function(widget, config) {
        let params = {
            pageurl: location.href,
            publickey: widget.pkey,
        };

        if (widget.surl) {
            params.surl = widget.surl;
        }

        if (widget.data) {
            params.data = JSON.parse(decodeURIComponent(widget.data));
        }

        return params;
    },

    onSolved: function(widget, answer) {
        $("#" + widget.inputId).val(answer);
    },

    getForm: function(widget) {
        return $("#" + widget.containerId).closest("form");
    },

    getCallback: function(widget) {
        return widget.callback;
    },

});