!
function (t) {
    "function" == typeof define && define.amd ? define("xiri", t) : window.Xiri = t()
}(function () {
    function t() {}

    function e(c) {
        var n = this;
        n._callback = c, void!
            function () {
                var t = new XMLHttpRequest;
                ! function l() {
                    t.open("GET", "http://127.0.0.1:44570/getcmd", !0),
                        n.uuid && t.setRequestHeader("uuid", n.uuid),
                        t.send(),
                        t.onreadystatechange = function () {
                            if (4 == this.readyState) {
                                if (200 == this.status && this.responseText) {
                                    var jsonText;
                                    try {
                                        n._callback(JSON.parse(this.responseText));
                                    } catch (t) {
                                        if(this.responseText != 'ok'){
                                            try {
                                                jsonText = this.responseText.replace(/'/g, "\""); 
                                                n._callback(JSON.parse(jsonText));
                                            } catch (error) {
                                                window.console && window.console.log(t.name + ": " + t.message)
                                            }
                                        }
                                    }
                                }
                                setTimeout(function () {
                                    l()
                                }, 200)
                            }
                        }
                }()
            }()
    }
    return t.prototype.Scene = function (t, e, n, s) {
            this._scene = t,
                this._commands = e,
                this._feedbacks = n,
                this._fuzzy_words = s
        },
        e.prototype.regist = function () {
            try {
                var t = new XMLHttpRequest;
                return function (e) {
                    var n = this;
                    n.uuid = +new Date,
                        t.open("POST", "http://127.0.0.1:44570/postkeyword", !0),
                        t.setRequestHeader("Content-Type", "application/json;charset=utf-8"),
                        t.setRequestHeader("uuid", n.uuid),
                        t.send(JSON.stringify(e || {})),
                        t.onreadystatechange = function () {
                            4 == this.readyState && 200 != this.status && setTimeout(function () {
                                    n.regist(e)
                                },
                                1e3)
                        }
                }
            } catch (error) {
                alert(error)
            }
        }(),
        e.prototype.syncViewState = function () {
            var t = new XMLHttpRequest;
            return function (e) {
                var n = this;
                t.open("POST", "http://127.0.0.1:44570/syncviewstate", !0),
                    t.setRequestHeader("Content-Type", "application/json;charset=utf-8"),
                    t.send(JSON.stringify(e)),
                    t.onreadystatechange = function () {
                        4 == this.readyState && 200 != this.status && setTimeout(function () {
                                n.syncViewState(e)
                            },
                            1e3)
                    }
            }
        }(),
        e.prototype.syncChannelInfo = function () {
            var t = new XMLHttpRequest;
            return function (e) {
                var n = this;
                t.open("POST", "http://127.0.0.1:44570/syncchannelinfo", !0),
                    t.setRequestHeader("Content-Type", "application/json;charset=utf-8"),
                    t.send(JSON.stringify(e)),
                    t.onreadystatechange = function () {
                        4 == this.readyState && 200 != this.status && setTimeout(function () {
                                n.syncChannelInfo(e)
                            },
                            1e3)
                    }
            }
        }(),
        e.prototype.syncClientInfo = function () {
            var t = new XMLHttpRequest;
            return function (e) {
                var n = this;
                t.open("POST", "http://127.0.0.1:44570/syncclientinfo", !0),
                    t.setRequestHeader("Content-Type", "application/json;charset=utf-8"),
                    t.send(JSON.stringify(e)),
                    t.onreadystatechange = function () {
                        4 == this.readyState && 200 != this.status && setTimeout(function () {
                                n.syncClientInfo(e)
                            },
                            1e3)
                    }
            }
        }(),
        e.prototype.postFeedBack = function () {
            var t = new XMLHttpRequest;
            return function (e) {
                var n = this;
                t.open("POST", "http://127.0.0.1:44570/postFeedBack", !0),
                    t.setRequestHeader("Content-Type", "text/plain;charset=utf-8"),
                    t.send(e),
                    t.onreadystatechange = function () {

                    }
            }
        }(),
        e.prototype.buryPoint = function () {
            var t = new XMLHttpRequest;
            return function (data) {
                var n = this;
                t.open("POST", "http://127.0.0.1:44570/buryPoint", true),
                    t.setRequestHeader("Content-Type", "text/plain;charset=utf-8"),
                    t.send(JSON.stringify(data))
            }
        }(),
        t.prototype.Listener = e,
        new t
});