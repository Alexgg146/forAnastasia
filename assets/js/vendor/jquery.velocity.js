/*!
* Velocity.js: Accelerated JavaScript animation.
* @version 0.2.1
* @docs http://velocityjs.org
* @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/
!function(a, b, c, d) {
    function e(a) {
        for (var b = -1, c = a ? a.length : 0, d = []; ++b < c; ) {
            var e = a[b];
            e && d.push(e)
        }
        return d
    }
    function f(a) {
        var b = q.data(a, k);
        return null === b ? d : b
    }
    function g(a) {
        return function(b) {
            return Math.round(b * a) * (1 / a)
        }
    }
    function h(a, b) {
        var c = a;
        return p.isString(a) ? r.Easings[a] || (c = !1) : c = p.isArray(a) && 1 === a.length ? g.apply(null, a) : p.isArray(a) && 2 === a.length ? t.apply(null, a.concat([b])) : p.isArray(a) && 4 === a.length ? s.apply(null, a) : !1,
        c === !1 && (c = r.Easings[r.defaults.easing] ? r.defaults.easing : m),
        c
    }
    function i(a) {
        if (a)
            for (var b = (new Date).getTime(), c = 0, e = r.State.calls.length; e > c; c++)
                if (r.State.calls[c]) {
                    var g = r.State.calls[c]
                      , h = g[0]
                      , k = g[2]
                      , l = g[3];
                    l || (l = r.State.calls[c][3] = b - 16);
                    for (var m = Math.min((b - l) / k.duration, 1), n = 0, q = h.length; q > n; n++) {
                        var s = h[n]
                          , t = s.element;
                        if (f(t)) {
                            var v = !1;
                            k.display && "none" !== k.display && u.setPropertyValue(t, "display", k.display);
                            for (var w in s)
                                if ("element" !== w) {
                                    var x, y = s[w], z = p.isString(y.easing) ? r.Easings[y.easing] : y.easing;
                                    if (x = 1 === m ? y.endValue : y.startValue + (y.endValue - y.startValue) * z(m),
                                    y.currentValue = x,
                                    u.Hooks.registered[w]) {
                                        var A = u.Hooks.getRoot(w)
                                          , B = f(t).rootPropertyValueCache[A];
                                        B && (y.rootPropertyValue = B)
                                    }
                                    var C = u.setPropertyValue(t, w, y.currentValue + (0 === parseFloat(x) ? "" : y.unitType), y.rootPropertyValue, y.scrollData);
                                    u.Hooks.registered[w] && (f(t).rootPropertyValueCache[A] = u.Normalizations.registered[A] ? u.Normalizations.registered[A]("extract", null, C[1]) : C[1]),
                                    "transform" === C[0] && (v = !0)
                                }
                            k.mobileHA && f(t).transformCache.translate3d === d && (f(t).transformCache.translate3d = "(0px, 0px, 0px)",
                            v = !0),
                            v && u.flushTransformCache(t)
                        }
                    }
                    k.display && "none" !== k.display && (r.State.calls[c][2].display = !1),
                    k.progress && k.progress.call(g[1], g[1], m, Math.max(0, l + k.duration - b), l),
                    1 === m && j(c)
                }
        r.State.isTicking && o(i)
    }
    function j(a, b) {
        if (!r.State.calls[a])
            return !1;
        for (var c = r.State.calls[a][0], e = r.State.calls[a][1], g = r.State.calls[a][2], h = !1, i = 0, j = c.length; j > i; i++) {
            var k = c[i].element;
            if (b || "none" !== g.display || g.loop || u.setPropertyValue(k, "display", g.display),
            (q.queue(k)[1] === d || !/\.velocityQueueEntryFlag/i.test(q.queue(k)[1])) && f(k)) {
                f(k).isAnimating = !1,
                f(k).rootPropertyValueCache = {};
                var l, m = ["transformPerspective", "translateZ", "rotateX", "rotateY"], n = !1;
                for (var o in m)
                    l = m[o],
                    /^\(0[^.]/.test(f(k).transformCache[l]) && (n = !0,
                    delete f(k).transformCache[l]);
                g.mobileHA && (n = !0,
                delete f(k).transformCache.translate3d),
                n && u.flushTransformCache(k)
            }
            b || !g.complete || g.loop || i !== j - 1 || g.complete.call(e, e),
            g.queue !== !1 && q.dequeue(k, g.queue)
        }
        r.State.calls[a] = !1;
        for (var p = 0, s = r.State.calls.length; s > p; p++)
            if (r.State.calls[p] !== !1) {
                h = !0;
                break
            }
        h === !1 && (r.State.isTicking = !1,
        delete r.State.calls,
        r.State.calls = [])
    }
    var k = "velocity"
      , l = 400
      , m = "swing"
      , n = function() {
        if (c.documentMode)
            return c.documentMode;
        for (var a = 7; a > 4; a--) {
            var b = c.createElement("div");
            if (b.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->",
            b.getElementsByTagName("span").length)
                return b = null,
                a
        }
        return d
    }()
      , o = b.requestAnimationFrame || function() {
        var a = 0;
        return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || function(b) {
            var c, d = (new Date).getTime();
            return c = Math.max(0, 16 - (d - a)),
            a = d + c,
            setTimeout(function() {
                b(d + c)
            }, c)
        }
    }()
      , p = {
        isString: function(a) {
            return "string" == typeof a
        },
        isArray: Array.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
        ,
        isFunction: function(a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        },
        isNodeList: function(a) {
            return "object" == typeof a && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a)) && a.length !== d && (0 === a.length || "object" == typeof a[0] && a[0].nodeType > 0)
        },
        isWrapped: function(a) {
            return a && (a.jquery || b.Zepto && b.Zepto.zepto.isZ(a))
        }
    }
      , q = b.jQuery || a.Velocity && a.Velocity.Utilities;
    if (!q)
        throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.");
    if (a.Velocity !== d && !a.Velocity.Utilities)
        throw new Error("Velocity: Namespace is occupied.");
    if (7 >= n) {
        if (b.jQuery)
            return void (b.jQuery.fn.velocity = b.jQuery.fn.animate);
        throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.")
    }
    if (8 === n && !b.jQuery)
        throw new Error("Velocity: For IE8, Velocity requires jQuery to be loaded. (Velocity's jQuery shim does not work with IE8.)");
    var r = a.Velocity = a.velocity = {
        State: {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            prefixElement: c.createElement("div"),
            prefixMatches: {},
            scrollAnchor: null,
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            isTicking: !1,
            calls: []
        },
        CSS: {},
        Utilities: b.jQuery ? {} : q,
        Sequences: {},
        Easings: {},
        defaults: {
            queue: "",
            duration: l,
            easing: m,
            begin: null,
            complete: null,
            progress: null,
            display: null,
            loop: !1,
            delay: !1,
            mobileHA: !0,
            _cacheValues: !0
        },
        animate: function() {},
        mock: !1,
        debug: !1
    };
    b.pageYOffset !== d ? (r.State.scrollAnchor = b,
    r.State.scrollPropertyLeft = "pageXOffset",
    r.State.scrollPropertyTop = "pageYOffset") : (r.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body,
    r.State.scrollPropertyLeft = "scrollLeft",
    r.State.scrollPropertyTop = "scrollTop");
    var s = function() {
        function a(a, b) {
            return 1 - 3 * b + 3 * a
        }
        function b(a, b) {
            return 3 * b - 6 * a
        }
        function c(a) {
            return 3 * a
        }
        function d(d, e, f) {
            return ((a(e, f) * d + b(e, f)) * d + c(e)) * d
        }
        function e(d, e, f) {
            return 3 * a(e, f) * d * d + 2 * b(e, f) * d + c(e)
        }
        return function(a, b, c, f) {
            function g(b) {
                for (var f = b, g = 0; 8 > g; ++g) {
                    var h = e(f, a, c);
                    if (0 === h)
                        return f;
                    var i = d(f, a, c) - b;
                    f -= i / h
                }
                return f
            }
            if (4 !== arguments.length)
                return !1;
            for (var h = 0; 4 > h; ++h)
                if ("number" != typeof arguments[h] || isNaN(arguments[h]) || !isFinite(arguments[h]))
                    return !1;
            return a = Math.min(a, 1),
            c = Math.min(c, 1),
            a = Math.max(a, 0),
            c = Math.max(c, 0),
            function(e) {
                return a === b && c === f ? e : d(g(e), b, f)
            }
        }
    }()
      , t = function() {
        function a(a) {
            return -a.tension * a.x - a.friction * a.v
        }
        function b(b, c, d) {
            var e = {
                x: b.x + d.dx * c,
                v: b.v + d.dv * c,
                tension: b.tension,
                friction: b.friction
            };
            return {
                dx: e.v,
                dv: a(e)
            }
        }
        function c(c, d) {
            var e = {
                dx: c.v,
                dv: a(c)
            }
              , f = b(c, .5 * d, e)
              , g = b(c, .5 * d, f)
              , h = b(c, d, g)
              , i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx)
              , j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);
            return c.x = c.x + i * d,
            c.v = c.v + j * d,
            c
        }
        return function d(a, b, e) {
            var f, g, h, i = {
                x: -1,
                v: 0,
                tension: null,
                friction: null
            }, j = [0], k = 0, l = 1e-4, m = .016;
            for (a = parseFloat(a) || 600,
            b = parseFloat(b) || 20,
            e = e || null,
            i.tension = a,
            i.friction = b,
            f = null !== e,
            f ? (k = d(a, b),
            g = k / e * m) : g = m; ; )
                if (h = c(h || i, g),
                j.push(1 + h.x),
                k += 16,
                !(Math.abs(h.x) > l && Math.abs(h.v) > l))
                    break;
            return f ? function(a) {
                return j[a * (j.length - 1) | 0]
            }
            : k
        }
    }();
    !function() {
        r.Easings.linear = function(a) {
            return a
        }
        ,
        r.Easings.swing = function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
        ,
        r.Easings.ease = s(.25, .1, .25, 1),
        r.Easings["ease-in"] = s(.42, 0, 1, 1),
        r.Easings["ease-out"] = s(0, 0, .58, 1),
        r.Easings["ease-in-out"] = s(.42, 0, .58, 1);
        var a = {};
        q.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(b, c) {
            a[c] = function(a) {
                return Math.pow(a, b + 2)
            }
        }),
        q.extend(a, {
            Sine: function(a) {
                return 1 - Math.cos(a * Math.PI / 2)
            },
            Circ: function(a) {
                return 1 - Math.sqrt(1 - a * a)
            },
            Elastic: function(a) {
                return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(a) {
                return a * a * (3 * a - 2)
            },
            Bounce: function(a) {
                for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11; )
                    ;
                return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
            }
        }),
        q.each(a, function(a, b) {
            r.Easings["easeIn" + a] = b,
            r.Easings["easeOut" + a] = function(a) {
                return 1 - b(1 - a)
            }
            ,
            r.Easings["easeInOut" + a] = function(a) {
                return .5 > a ? b(2 * a) / 2 : 1 - b(-2 * a + 2) / 2
            }
        }),
        r.Easings.spring = function(a) {
            return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a)
        }
    }();
    var u = r.CSS = {
        RegEx: {
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
        },
        Hooks: {
            templates: {
                color: ["Red Green Blue Alpha", "255 255 255 1"],
                backgroundColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderTopColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderRightColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderBottomColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderLeftColor: ["Red Green Blue Alpha", "255 255 255 1"],
                outlineColor: ["Red Green Blue Alpha", "255 255 255 1"],
                textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                backgroundPosition: ["X Y", "0% 0%"],
                transformOrigin: ["X Y Z", "50% 50% 0%"],
                perspectiveOrigin: ["X Y", "50% 50%"]
            },
            registered: {},
            register: function() {
                var a, b, c;
                if (n)
                    for (a in u.Hooks.templates) {
                        b = u.Hooks.templates[a],
                        c = b[0].split(" ");
                        var d = b[1].match(u.RegEx.valueSplit);
                        "Color" === c[0] && (c.push(c.shift()),
                        d.push(d.shift()),
                        u.Hooks.templates[a] = [c.join(" "), d.join(" ")])
                    }
                for (a in u.Hooks.templates) {
                    b = u.Hooks.templates[a],
                    c = b[0].split(" ");
                    for (var e in c) {
                        var f = a + c[e]
                          , g = e;
                        u.Hooks.registered[f] = [a, g]
                    }
                }
            },
            getRoot: function(a) {
                var b = u.Hooks.registered[a];
                return b ? b[0] : a
            },
            cleanRootPropertyValue: function(a, b) {
                return u.RegEx.valueUnwrap.test(b) && (b = b.match(u.Hooks.RegEx.valueUnwrap)[1]),
                u.Values.isCSSNullValue(b) && (b = u.Hooks.templates[a][1]),
                b
            },
            extractValue: function(a, b) {
                var c = u.Hooks.registered[a];
                if (c) {
                    var d = c[0]
                      , e = c[1];
                    return b = u.Hooks.cleanRootPropertyValue(d, b),
                    b.toString().match(u.RegEx.valueSplit)[e]
                }
                return b
            },
            injectValue: function(a, b, c) {
                var d = u.Hooks.registered[a];
                if (d) {
                    var e, f, g = d[0], h = d[1];
                    return c = u.Hooks.cleanRootPropertyValue(g, c),
                    e = c.toString().match(u.RegEx.valueSplit),
                    e[h] = b,
                    f = e.join(" ")
                }
                return c
            }
        },
        Normalizations: {
            registered: {
                clip: function(a, b, c) {
                    switch (a) {
                    case "name":
                        return "clip";
                    case "extract":
                        var d;
                        return u.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(u.RegEx.valueUnwrap),
                        d = d ? d[1].replace(/,(\s+)?/g, " ") : c),
                        d;
                    case "inject":
                        return "rect(" + c + ")"
                    }
                },
                opacity: function(a, b, c) {
                    if (8 >= n)
                        switch (a) {
                        case "name":
                            return "filter";
                        case "extract":
                            var d = c.toString().match(/alpha\(opacity=(.*)\)/i);
                            return c = d ? d[1] / 100 : 1;
                        case "inject":
                            return b.style.zoom = 1,
                            parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")"
                        }
                    else
                        switch (a) {
                        case "name":
                            return "opacity";
                        case "extract":
                            return c;
                        case "inject":
                            return c
                        }
                }
            },
            register: function() {
                function a(a) {
                    var b, c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return a = a.replace(c, function(a, b, c, d) {
                        return b + b + c + c + d + d
                    }),
                    b = d.exec(a),
                    b ? "rgb(" + (parseInt(b[1], 16) + " " + parseInt(b[2], 16) + " " + parseInt(b[3], 16)) + ")" : "rgb(0 0 0)"
                }
                var b = ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"];
                9 >= n || r.State.isGingerbread || (b = b.concat(["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]));
                for (var c = 0, e = b.length; e > c; c++)
                    !function() {
                        var a = b[c];
                        u.Normalizations.registered[a] = function(b, c, e) {
                            switch (b) {
                            case "name":
                                return "transform";
                            case "extract":
                                return f(c).transformCache[a] === d ? /^scale/i.test(a) ? 1 : 0 : f(c).transformCache[a].replace(/[()]/g, "");
                            case "inject":
                                var g = !1;
                                switch (a.substr(0, a.length - 1)) {
                                case "translate":
                                    g = !/(%|px|em|rem|\d)$/i.test(e);
                                    break;
                                case "scal":
                                case "scale":
                                    r.State.isAndroid && f(c).transformCache[a] === d && (e = 1),
                                    g = !/(\d)$/i.test(e);
                                    break;
                                case "skew":
                                    g = !/(deg|\d)$/i.test(e);
                                    break;
                                case "rotate":
                                    g = !/(deg|\d)$/i.test(e)
                                }
                                return g || (f(c).transformCache[a] = "(" + e + ")"),
                                f(c).transformCache[a]
                            }
                        }
                    }();
                for (var g = ["color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], c = 0, h = g.length; h > c; c++)
                    !function() {
                        var b = g[c];
                        u.Normalizations.registered[b] = function(c, e, f) {
                            switch (c) {
                            case "name":
                                return b;
                            case "extract":
                                var g;
                                if (u.RegEx.wrappedValueAlreadyExtracted.test(f))
                                    g = f;
                                else {
                                    var h, i = {
                                        aqua: "rgb(0, 255, 255);",
                                        black: "rgb(0, 0, 0)",
                                        blue: "rgb(0, 0, 255)",
                                        fuchsia: "rgb(255, 0, 255)",
                                        gray: "rgb(128, 128, 128)",
                                        green: "rgb(0, 128, 0)",
                                        lime: "rgb(0, 255, 0)",
                                        maroon: "rgb(128, 0, 0)",
                                        navy: "rgb(0, 0, 128)",
                                        olive: "rgb(128, 128, 0)",
                                        purple: "rgb(128, 0, 128)",
                                        red: "rgb(255, 0, 0)",
                                        silver: "rgb(192, 192, 192)",
                                        teal: "rgb(0, 128, 128)",
                                        white: "rgb(255, 255, 255)",
                                        yellow: "rgb(255, 255, 0)"
                                    };
                                    /^[A-z]+$/i.test(f) ? h = i[f] !== d ? i[f] : i.black : /^#([A-f\d]{3}){1,2}$/i.test(f) ? h = a(f) : /^rgba?\(/i.test(f) || (h = i.black),
                                    g = (h || f).toString().match(u.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                }
                                return 8 >= n || 3 !== g.split(" ").length || (g += " 1"),
                                g;
                            case "inject":
                                return 8 >= n ? 4 === f.split(" ").length && (f = f.split(/\s+/).slice(0, 3).join(" ")) : 3 === f.split(" ").length && (f += " 1"),
                                (8 >= n ? "rgb" : "rgba") + "(" + f.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                            }
                        }
                    }()
            }
        },
        Names: {
            camelCase: function(a) {
                return a.replace(/-(\w)/g, function(a, b) {
                    return b.toUpperCase()
                })
            },
            prefixCheck: function(a) {
                if (r.State.prefixMatches[a])
                    return [r.State.prefixMatches[a], !0];
                for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; d > c; c++) {
                    var e;
                    if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function(a) {
                        return a.toUpperCase()
                    }),
                    p.isString(r.State.prefixElement.style[e]))
                        return r.State.prefixMatches[a] = e,
                        [e, !0]
                }
                return [a, !1]
            }
        },
        Values: {
            isCSSNullValue: function(a) {
                return 0 == a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)
            },
            getUnitType: function(a) {
                return /^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|opacity|alpha|fillOpacity|flexGrow|flexHeight|zIndex|fontWeight)$)|color/i.test(a) ? "" : "px"
            },
            getDisplayType: function(a) {
                var b = a.tagName.toString().toLowerCase();
                return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : "block"
            }
        },
        getPropertyValue: function(a, c, e, g) {
            function h(a, c) {
                var e = 0;
                if (8 >= n)
                    e = q.css(a, c);
                else {
                    if (!g) {
                        if ("height" === c && "border-box" !== u.getPropertyValue(a, "boxSizing").toString().toLowerCase())
                            return a.offsetHeight - (parseFloat(u.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(u.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(u.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(u.getPropertyValue(a, "paddingBottom")) || 0);
                        if ("width" === c && "border-box" !== u.getPropertyValue(a, "boxSizing").toString().toLowerCase())
                            return a.offsetWidth - (parseFloat(u.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(u.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(u.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(u.getPropertyValue(a, "paddingRight")) || 0)
                    }
                    var i;
                    i = f(a) === d ? b.getComputedStyle(a, null) : f(a).computedStyle ? f(a).computedStyle : f(a).computedStyle = b.getComputedStyle(a, null),
                    n && "borderColor" === c && (c = "borderTopColor"),
                    e = 9 === n && "filter" === c ? i.getPropertyValue(c) : i[c],
                    ("" === e || null === e) && (e = a.style[c])
                }
                if ("auto" === e && /^(top|right|bottom|left)$/i.test(c)) {
                    var j = h(a, "position");
                    ("fixed" === j || "absolute" === j && /top|left/i.test(c)) && (e = q(a).position()[c] + "px")
                }
                return e
            }
            var i;
            if (u.Hooks.registered[c]) {
                var j = c
                  , k = u.Hooks.getRoot(j);
                e === d && (e = u.getPropertyValue(a, u.Names.prefixCheck(k)[0])),
                u.Normalizations.registered[k] && (e = u.Normalizations.registered[k]("extract", a, e)),
                i = u.Hooks.extractValue(j, e)
            } else if (u.Normalizations.registered[c]) {
                var l, m;
                l = u.Normalizations.registered[c]("name", a),
                "transform" !== l && (m = h(a, u.Names.prefixCheck(l)[0]),
                u.Values.isCSSNullValue(m) && u.Hooks.templates[c] && (m = u.Hooks.templates[c][1])),
                i = u.Normalizations.registered[c]("extract", a, m)
            }
            return /^[\d-]/.test(i) || (i = h(a, u.Names.prefixCheck(c)[0])),
            u.Values.isCSSNullValue(i) && (i = 0),
            r.debug >= 2 && console.log("Get " + c + ": " + i),
            i
        },
        setPropertyValue: function(a, c, d, e, g) {
            var h = c;
            if ("scroll" === c)
                g.container ? g.container["scroll" + g.direction] = d : "Left" === g.direction ? b.scrollTo(d, g.alternateValue) : b.scrollTo(g.alternateValue, d);
            else if (u.Normalizations.registered[c] && "transform" === u.Normalizations.registered[c]("name", a))
                u.Normalizations.registered[c]("inject", a, d),
                h = "transform",
                d = f(a).transformCache[c];
            else {
                if (u.Hooks.registered[c]) {
                    var i = c
                      , j = u.Hooks.getRoot(c);
                    e = e || u.getPropertyValue(a, j),
                    d = u.Hooks.injectValue(i, d, e),
                    c = j
                }
                if (u.Normalizations.registered[c] && (d = u.Normalizations.registered[c]("inject", a, d),
                c = u.Normalizations.registered[c]("name", a)),
                h = u.Names.prefixCheck(c)[0],
                8 >= n)
                    try {
                        a.style[h] = d
                    } catch (k) {
                        console.log("Error setting [" + h + "] to [" + d + "]")
                    }
                else
                    a.style[h] = d;
                r.debug >= 2 && console.log("Set " + c + " (" + h + "): " + d)
            }
            return [h, d]
        },
        flushTransformCache: function(a) {
            var b, c, d, e = "";
            for (b in f(a).transformCache)
                c = f(a).transformCache[b],
                "transformPerspective" !== b ? (9 === n && "rotateZ" === b && (b = "rotate"),
                e += b + c + " ") : d = c;
            d && (e = "perspective" + d + " " + e),
            u.setPropertyValue(a, "transform", e)
        }
    };
    u.Hooks.register(),
    u.Normalizations.register(),
    r.animate = function() {
        function a() {
            return g || o
        }
        function b() {
            function a() {
                function a(a) {
                    var c = d
                      , e = d
                      , f = d;
                    return p.isArray(a) ? (c = a[0],
                    !p.isArray(a[1]) && /^[\d-]/.test(a[1]) || p.isFunction(a[1]) ? f = a[1] : (p.isString(a[1]) || p.isArray(a[1])) && (e = h(a[1], g.duration),
                    a[2] && (f = a[2]))) : c = a,
                    e = e || g.easing,
                    p.isFunction(c) && (c = c.call(b, x, w)),
                    p.isFunction(f) && (f = f.call(b, x, w)),
                    [c || 0, e, f]
                }
                function k(a, b) {
                    var c, d;
                    return d = (b || 0).toString().toLowerCase().replace(/[%A-z]+$/, function(a) {
                        return c = a,
                        ""
                    }),
                    c || (c = u.Values.getUnitType(a)),
                    [d, c]
                }
                function l() {
                    var a = {
                        parent: b.parentNode,
                        position: u.getPropertyValue(b, "position"),
                        fontSize: u.getPropertyValue(b, "fontSize")
                    }
                      , d = a.position === E.lastPosition && a.parent === E.lastParent
                      , e = a.fontSize === E.lastFontSize && a.parent === E.lastParent;
                    E.lastParent = a.parent,
                    E.lastPosition = a.position,
                    E.lastFontSize = a.fontSize,
                    null === E.remToPxRatio && (E.remToPxRatio = parseFloat(u.getPropertyValue(c.body, "fontSize")) || 16);
                    var f = {
                        overflowX: null,
                        overflowY: null,
                        boxSizing: null,
                        width: null,
                        minWidth: null,
                        maxWidth: null,
                        height: null,
                        minHeight: null,
                        maxHeight: null,
                        paddingLeft: null
                    }
                      , g = {}
                      , h = 10;
                    if (g.remToPxRatio = E.remToPxRatio,
                    n)
                        var i = /^auto$/i.test(b.currentStyle.width)
                          , j = /^auto$/i.test(b.currentStyle.height);
                    d && e || (f.overflowX = u.getPropertyValue(b, "overflowX"),
                    f.overflowY = u.getPropertyValue(b, "overflowY"),
                    f.boxSizing = u.getPropertyValue(b, "boxSizing"),
                    f.width = u.getPropertyValue(b, "width", null, !0),
                    f.minWidth = u.getPropertyValue(b, "minWidth"),
                    f.maxWidth = u.getPropertyValue(b, "maxWidth") || "none",
                    f.height = u.getPropertyValue(b, "height", null, !0),
                    f.minHeight = u.getPropertyValue(b, "minHeight"),
                    f.maxHeight = u.getPropertyValue(b, "maxHeight") || "none",
                    f.paddingLeft = u.getPropertyValue(b, "paddingLeft")),
                    d ? (g.percentToPxRatioWidth = E.lastPercentToPxWidth,
                    g.percentToPxRatioHeight = E.lastPercentToPxHeight) : (u.setPropertyValue(b, "overflowX", "hidden"),
                    u.setPropertyValue(b, "overflowY", "hidden"),
                    u.setPropertyValue(b, "boxSizing", "content-box"),
                    u.setPropertyValue(b, "width", h + "%"),
                    u.setPropertyValue(b, "minWidth", h + "%"),
                    u.setPropertyValue(b, "maxWidth", h + "%"),
                    u.setPropertyValue(b, "height", h + "%"),
                    u.setPropertyValue(b, "minHeight", h + "%"),
                    u.setPropertyValue(b, "maxHeight", h + "%")),
                    e ? g.emToPxRatio = E.lastEmToPx : u.setPropertyValue(b, "paddingLeft", h + "em"),
                    d || (g.percentToPxRatioWidth = E.lastPercentToPxWidth = (parseFloat(u.getPropertyValue(b, "width", null, !0)) || 1) / h,
                    g.percentToPxRatioHeight = E.lastPercentToPxHeight = (parseFloat(u.getPropertyValue(b, "height", null, !0)) || 1) / h),
                    e || (g.emToPxRatio = E.lastEmToPx = (parseFloat(u.getPropertyValue(b, "paddingLeft")) || 1) / h);
                    for (var k in f)
                        null !== f[k] && u.setPropertyValue(b, k, f[k]);
                    return n ? (i && u.setPropertyValue(b, "width", "auto"),
                    j && u.setPropertyValue(b, "height", "auto")) : (u.setPropertyValue(b, "height", "auto"),
                    f.height !== u.getPropertyValue(b, "height", null, !0) && u.setPropertyValue(b, "height", f.height),
                    u.setPropertyValue(b, "width", "auto"),
                    f.width !== u.getPropertyValue(b, "width", null, !0) && u.setPropertyValue(b, "width", f.width)),
                    r.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(g), b),
                    g
                }
                if (g.begin && 0 === x && g.begin.call(o, o),
                "scroll" === A) {
                    var m, v, y, z = /^x$/i.test(g.axis) ? "Left" : "Top", B = parseFloat(g.offset) || 0;
                    g.container ? g.container.jquery || g.container.nodeType ? (g.container = g.container[0] || g.container,
                    m = g.container["scroll" + z],
                    y = m + q(b).position()[z.toLowerCase()] + B) : g.container = null : (m = r.State.scrollAnchor[r.State["scrollProperty" + z]],
                    v = r.State.scrollAnchor[r.State["scrollProperty" + ("Left" === z ? "Top" : "Left")]],
                    y = q(b).offset()[z.toLowerCase()] + B),
                    j = {
                        scroll: {
                            rootPropertyValue: !1,
                            startValue: m,
                            currentValue: m,
                            endValue: y,
                            unitType: "",
                            easing: g.easing,
                            scrollData: {
                                container: g.container,
                                direction: z,
                                alternateValue: v
                            }
                        },
                        element: b
                    }
                } else if ("reverse" === A) {
                    if (!f(b).tweensContainer)
                        return void q.dequeue(b, g.queue);
                    "none" === f(b).opts.display && (f(b).opts.display = "block"),
                    f(b).opts.loop = !1,
                    f(b).opts.begin = null,
                    f(b).opts.complete = null,
                    t.easing || delete g.easing,
                    t.duration || delete g.duration,
                    g = q.extend({}, f(b).opts, g);
                    var C = q.extend(!0, {}, f(b).tweensContainer);
                    for (var D in C)
                        if ("element" !== D) {
                            var G = C[D].startValue;
                            C[D].startValue = C[D].currentValue = C[D].endValue,
                            C[D].endValue = G,
                            t && (C[D].easing = g.easing)
                        }
                    j = C
                } else if ("start" === A) {
                    var C;
                    f(b).tweensContainer && f(b).isAnimating === !0 && (C = f(b).tweensContainer);
                    for (var H in s) {
                        var I = a(s[H])
                          , J = I[0]
                          , K = I[1]
                          , L = I[2];
                        H = u.Names.camelCase(H);
                        var M = u.Hooks.getRoot(H)
                          , N = !1;
                        if (u.Names.prefixCheck(M)[1] !== !1 || u.Normalizations.registered[M] !== d) {
                            g.display && "none" !== g.display && /opacity|filter/.test(H) && !L && 0 !== J && (L = 0),
                            g._cacheValues && C && C[H] ? (L === d && (L = C[H].endValue + C[H].unitType),
                            N = f(b).rootPropertyValueCache[M]) : u.Hooks.registered[H] ? L === d ? (N = u.getPropertyValue(b, M),
                            L = u.getPropertyValue(b, H, N)) : N = u.Hooks.templates[M][1] : L === d && (L = u.getPropertyValue(b, H));
                            var O, P, Q, R;
                            O = k(H, L),
                            L = O[0],
                            Q = O[1],
                            O = k(H, J),
                            J = O[0].replace(/^([+-\/*])=/, function(a, b) {
                                return R = b,
                                ""
                            }),
                            P = O[1],
                            L = parseFloat(L) || 0,
                            J = parseFloat(J) || 0;
                            var S;
                            if ("%" === P && (/^(fontSize|lineHeight)$/.test(H) ? (J /= 100,
                            P = "em") : /^scale/.test(H) ? (J /= 100,
                            P = "") : /(Red|Green|Blue)$/i.test(H) && (J = J / 100 * 255,
                            P = "")),
                            /[\/*]/.test(R))
                                P = Q;
                            else if (Q !== P && 0 !== L)
                                if (0 === J)
                                    P = Q;
                                else {
                                    S = S || l();
                                    var T = /margin|padding|left|right|width|text|word|letter/i.test(H) || /X$/.test(H) ? "x" : "y";
                                    switch (Q) {
                                    case "%":
                                        L *= "x" === T ? S.percentToPxRatioWidth : S.percentToPxRatioHeight;
                                        break;
                                    case "em":
                                        L *= S.emToPxRatio;
                                        break;
                                    case "rem":
                                        L *= S.remToPxRatio;
                                        break;
                                    case "px":
                                    }
                                    switch (P) {
                                    case "%":
                                        L *= 1 / ("x" === T ? S.percentToPxRatioWidth : S.percentToPxRatioHeight);
                                        break;
                                    case "em":
                                        L *= 1 / S.emToPxRatio;
                                        break;
                                    case "rem":
                                        L *= 1 / S.remToPxRatio;
                                        break;
                                    case "px":
                                    }
                                }
                            switch (R) {
                            case "+":
                                J = L + J;
                                break;
                            case "-":
                                J = L - J;
                                break;
                            case "*":
                                J = L * J;
                                break;
                            case "/":
                                J = L / J
                            }
                            j[H] = {
                                rootPropertyValue: N,
                                startValue: L,
                                currentValue: L,
                                endValue: J,
                                unitType: P,
                                easing: K
                            },
                            r.debug && console.log("tweensContainer (" + H + "): " + JSON.stringify(j[H]), b)
                        } else
                            r.debug && console.log("Skipping [" + M + "] due to a lack of browser support.")
                    }
                    j.element = b
                }
                j.element && (F.push(j),
                f(b).tweensContainer = j,
                f(b).opts = g,
                f(b).isAnimating = !0,
                x === w - 1 ? (r.State.calls.length > 1e4 && (r.State.calls = e(r.State.calls)),
                r.State.calls.push([F, o, g]),
                r.State.isTicking === !1 && (r.State.isTicking = !0,
                i())) : x++)
            }
            var b = this
              , g = q.extend({}, r.defaults, t)
              , j = {};
            if (f(b) === d && q.data(b, k, {
                isAnimating: !1,
                computedStyle: null,
                tweensContainer: null,
                rootPropertyValueCache: {},
                transformCache: {}
            }),
            /^\d/.test(g.delay) && g.queue !== !1 && q.queue(b, g.queue, function(a) {
                r.velocityQueueEntryFlag = !0,
                setTimeout(a, parseFloat(g.delay))
            }),
            r.mock === !0)
                g.duration = 1;
            else
                switch (g.duration.toString().toLowerCase()) {
                case "fast":
                    g.duration = 200;
                    break;
                case "normal":
                    g.duration = l;
                    break;
                case "slow":
                    g.duration = 600;
                    break;
                default:
                    g.duration = parseFloat(g.duration) || 1
                }
            g.easing = h(g.easing, g.duration),
            g.begin && !p.isFunction(g.begin) && (g.begin = null),
            g.progress && !p.isFunction(g.progress) && (g.progress = null),
            g.complete && !p.isFunction(g.complete) && (g.complete = null),
            g.display && (g.display = g.display.toString().toLowerCase()),
            g.mobileHA = g.mobileHA && r.State.isMobile && !r.State.isGingerbread,
            g.queue === !1 ? g.delay ? setTimeout(a, g.delay) : a() : q.queue(b, g.queue, function(b) {
                r.velocityQueueEntryFlag = !0,
                a(b)
            }),
            "" !== g.queue && "fx" !== g.queue || "inprogress" === q.queue(b)[0] || q.dequeue(b)
        }
        var g, m, o, s, t, v = arguments[0] && (q.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || p.isString(arguments[0].properties));
        if (p.isWrapped(this) ? (m = 0,
        o = this,
        g = this) : (m = 1,
        o = v ? arguments[0].elements : arguments[0]),
        o = p.isWrapped(o) ? [].slice.call(o) : o) {
            v ? (s = arguments[0].properties,
            t = arguments[0].options) : (s = arguments[m],
            t = arguments[m + 1]);
            var w = p.isArray(o) || p.isNodeList(o) ? o.length : 1
              , x = 0;
            if ("stop" !== s && !q.isPlainObject(t)) {
                var y = m + 1;
                t = {};
                for (var z = y; z < arguments.length; z++)
                    !p.isArray(arguments[z]) && /^\d/.test(arguments[z]) ? t.duration = parseFloat(arguments[z]) : p.isString(arguments[z]) || p.isArray(arguments[z]) && (1 === arguments[z].length || 2 === arguments[z].length || 4 === arguments[z].length) ? t.easing = arguments[z] : p.isFunction(arguments[z]) && (t.complete = arguments[z])
            }
            var A;
            switch (s) {
            case "scroll":
                A = "scroll";
                break;
            case "reverse":
                A = "reverse";
                break;
            case "stop":
                var B = [];
                return q.each(r.State.calls, function(a, b) {
                    b !== !1 && q.each(b[1].nodeType ? [b[1]] : b[1], function(b, c) {
                        q.each(o.nodeType ? [o] : o, function(b, d) {
                            d === c && (f(d) && q.each(f(d).tweensContainer, function(a, b) {
                                b.endValue = b.currentValue
                            }),
                            (t === !0 || p.isString(t)) && q.queue(d, p.isString(t) ? t : "", []),
                            B.push(a))
                        })
                    })
                }),
                q.each(B, function(a, b) {
                    j(b, !0)
                }),
                a();
            default:
                if (!q.isPlainObject(s) || q.isEmptyObject(s)) {
                    if (p.isString(s) && r.Sequences[s]) {
                        var C = o
                          , D = t.duration;
                        return t.backwards === !0 && (o = (o.jquery ? [].slice.call(o) : o).reverse()),
                        q.each(o, function(a, b) {
                            parseFloat(t.stagger) && (t.delay = parseFloat(t.stagger) * a),
                            t.drag && (t.duration = parseFloat(D) || (/^(callout|transition)/.test(s) ? 1e3 : l),
                            t.duration = Math.max(t.duration * (t.backwards ? 1 - a / w : (a + 1) / w), .75 * t.duration, 200)),
                            r.Sequences[s].call(b, b, t || {}, a, w)
                        }),
                        g || C
                    }
                    return console.log("First argument was not a property map, a known action, or a registered sequence. Aborting."),
                    a()
                }
                A = "start"
            }
            var E = {
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                remToPxRatio: null
            }
              , F = [];
            q.each(o.nodeType ? [o] : o, function(a, c) {
                c.nodeType && b.call(c)
            });
            var G, H = q.extend({}, r.defaults, t);
            if (H.loop = parseInt(H.loop),
            G = 2 * H.loop - 1,
            H.loop)
                for (var I = 0; G > I; I++) {
                    var J = {
                        delay: H.delay
                    };
                    H.complete && I === G - 1 && (J.complete = H.complete),
                    r.animate(o, "reverse", J)
                }
            return a()
        }
    }
    ;
    var v = b.jQuery || b.Zepto;
    v && (v.fn.velocity = r.animate,
    v.fn.velocity.defaults = r.defaults),
    "undefined" != typeof define && define.amd ? define(function() {
        return r
    }) : "undefined" != typeof module && module.exports && (module.exports = r),
    q.each(["Down", "Up"], function(a, b) {
        r.Sequences["slide" + b] = function(a, c) {
            var d = q.extend({}, c)
              , e = {
                height: null,
                marginTop: null,
                marginBottom: null,
                paddingTop: null,
                paddingBottom: null,
                overflow: null,
                overflowX: null,
                overflowY: null
            }
              , f = d.begin
              , g = d.complete
              , h = !1;
            null !== d.display && (d.display = "Down" === b ? d.display || r.CSS.Values.getDisplayType(a) : d.display || "none"),
            d.begin = function() {
                function c() {
                    a.style.display = "block",
                    e.height = r.CSS.getPropertyValue(a, "height"),
                    a.style.height = "auto",
                    r.CSS.getPropertyValue(a, "height") === e.height && (h = !0),
                    r.CSS.setPropertyValue(a, "height", e.height + "px")
                }
                if ("Down" === b) {
                    e.overflow = [r.CSS.getPropertyValue(a, "overflow"), 0],
                    e.overflowX = [r.CSS.getPropertyValue(a, "overflowX"), 0],
                    e.overflowY = [r.CSS.getPropertyValue(a, "overflowY"), 0],
                    a.style.overflow = "hidden",
                    a.style.overflowX = "visible",
                    a.style.overflowY = "hidden",
                    c();
                    for (var d in e)
                        /^overflow/.test(d) || (e[d] = [r.CSS.getPropertyValue(a, d), 0]);
                    a.style.display = "none"
                } else {
                    c();
                    for (var d in e)
                        e[d] = [0, r.CSS.getPropertyValue(a, d)];
                    a.style.overflow = "hidden",
                    a.style.overflowX = "visible",
                    a.style.overflowY = "hidden"
                }
                f && f.call(a, a)
            }
            ,
            d.complete = function(a) {
                var c = "Down" === b ? 0 : 1;
                h === !0 ? e.height[c] = "auto" : e.height[c] += "px";
                for (var d in e)
                    a.style[d] = e[d][c];
                g && g.call(a, a)
            }
            ,
            r.animate(a, e, d)
        }
    }),
    q.each(["In", "Out"], function(a, b) {
        r.Sequences["fade" + b] = function(a, c, d, e) {
            var f = q.extend({}, c)
              , g = {
                opacity: "In" === b ? 1 : 0
            };
            d !== e - 1 && (f.complete = f.begin = null),
            null !== f.display && (f.display = "In" === b ? r.CSS.Values.getDisplayType(a) : "none"),
            r.animate(this, g, f)
        }
    })
}(window.jQuery || window.Zepto || window, window, document);
