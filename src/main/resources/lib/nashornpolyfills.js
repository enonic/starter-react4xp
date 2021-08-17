(() => {
    var t, n, e, i = {
        172: function (t) {
            t.exports = function () {
                "use strict";
                var t, n = {}, e = "undefined" != typeof Symbol, i = Array.prototype,
                    r = (t = {}.hasOwnProperty, function (n, e) {
                        return !!e && t.call(n, e)
                    }), u = Array.isArray;

                function o(t) {
                    return null != t && ("function" == typeof t || "object" == typeof t)
                }

                function s(t) {
                    return !isNaN(t) && t + 0 === t
                }

                var l, a, c, h = (a = Function.prototype, function (t) {
                    return "function" == typeof t && t != a
                });

                function f(t) {
                    if (!o(t) || h(t) || null != (n = t) && n === n.window) return !1;
                    var n, e = !!t && "length" in t && t.length;
                    return u(t) || 0 === e || s(e) && e > 0 && e - 1 in t
                }

                function v(t, n, e) {
                    var i, r, u = [], o = t.length;
                    if (n = (n = n || 0) >= 0 ? n : Math.max(0, o + n), (e = isNaN(e) ? o : Math.min(e, o)) < 0 && (e = o + e), (r = e - n) > 0) for (u = new Array(r), i = 0; i < r; i++) u[i] = t[n + i];
                    return u
                }

                function p(t) {
                    return function (t) {
                        return !o(t)
                    }(t) || "toString" in t
                }

                function y(t, n) {
                    var e = t.prototype = Object.create(n && n.prototype || null);
                    return e.constructor = t, e
                }

                function d(t) {
                    t = t || 8;
                    for (var n = ""; (n += Math.random().toString(16).slice(2)).length < t;) ;
                    return n.slice(0, t)
                }

                function g(t, n) {
                    if (!o(t)) return t + "";
                    var e = t.objectUniqueID;
                    return e || n || Object.defineProperty(t, "objectUniqueID", {value: e = d()}), e
                }

                function x(t, n) {
                    var e = t[n];
                    return t.splice(n, 1), e
                }

                function T(t, n, e) {
                    if (f(n) || (n = [n]), void 0 === e) i.push.apply(t, n); else {
                        var r = [e, 0];
                        i.push.apply(r, n), i.splice.apply(t, r)
                    }
                    return t
                }

                function m() {
                    this.values = [], this.primitiveKeys = [], this.keyToValue = {}
                }

                function k() {
                    this.keys = [], this.IDToKey = {}, m.call(this)
                }

                function w(t) {
                    m.call(this), t && (f(t) || (t = [t]), this.addMulti(t))
                }

                return function () {
                    function t(t, n, e) {
                        for (var i, r = 1; r < n.length; r++) for (var u = n[r], o = 0; -1 != (o = t.indexOf(u, o));) {
                            if (x(t, o), e) return o;
                            i || (i = []), i.push(o)
                        }
                        return i
                    }

                    l = function (n) {
                        return t(n, arguments, !0)
                    }
                }(), function (t, n) {
                    function e(t) {
                        return this.key = this.primitiveKeys[this.index] || null, this.value = this.key && this.keyToValue[this.key], t ? this.value : !!this.key
                    }

                    function i(t, n, e, i) {
                        var u = r(this.keyToValue, t), o = !u || !e;
                        return u || (T(this.values, n, i), T(this.primitiveKeys, t, i), this.length++), o && (u && (this.values[this.primitiveKeys.indexOf(t)] = n), this.keyToValue[t] = n), o
                    }

                    function u(t) {
                        return this.keyToValue[t]
                    }

                    function o(t) {
                        return r(this.keyToValue, t)
                    }

                    function s(t) {
                        var n = -1;
                        return r(this.keyToValue, t) && (delete this.keyToValue[t], x(this.values, n = l(this.primitiveKeys, t)), this.length--), n
                    }

                    n.values = null, n.primitiveKeys = null, n.keyToValue = null, n.length = 0, n.index = -1, n.key = null, n.value = null, n.start = function () {
                        this.index = -1, e.call(this)
                    }, n.end = function () {
                        this.index = this.length, e.call(this)
                    }, n.first = function (t) {
                        return this.index = 0, e.call(this, t)
                    }, n.next = function (t) {
                        return this.index++, e.call(this, t)
                    }, n.prev = function (t) {
                        return this.index--, e.call(this, t)
                    }, n.last = function (t) {
                        return this.index = this.length - 1, e.call(this, t)
                    }, n.getFirst = function () {
                        return this.first(!0)
                    }, n.getNext = function () {
                        return this.next(!0)
                    }, n.getPrev = function () {
                        return this.prev(!0)
                    }, n.getLast = function () {
                        return this.last(!0)
                    }, n.clear = function () {
                        return this.values = [], this.primitiveKeys = [], this.keyToValue = {}, this.length = 0, this.index = -1, this.key = null, this.value = null, this
                    }, t.set = function (t, n, e, r, u) {
                        return i.call(t, n, e, r, u)
                    }, t.get = function (t, n) {
                        return u.call(t, n)
                    }, t.has = function (t, n) {
                        return o.call(t, n)
                    }, t.delete = function (t, n) {
                        return s.call(t, n)
                    }
                }(m, m.prototype), n.map = k, function (t, n) {
                    function u(t, n, e, i) {
                        var r = g(t), u = !!r && m.set(this, r, n, e, i);
                        return u && (T(this.keys, t, i), this.IDToKey[r] = t), u
                    }

                    function l(t, n, e) {
                        var i, r;
                        if (this.has(t)) {
                            if (!s(i = this.get(t))) return !1
                        } else i = 0;
                        return r = i, u.call(this, t, i += n) ? e || (r = i) : r = !1, r
                    }

                    function a(t, n, e, i) {
                        var r, o = this.has(t), s = !1;
                        return (o ? f(r = this.get(t)) : e) && (o || (r = []), s = n.apply(r, e || []), i && (r = s), o && !i || u.call(this, t, r) || (s = !1)), s
                    }

                    function c(t, n, e, i) {
                        var s, l;
                        return !!(this.has(t) ? o(s = this.get(t)) : u.call(this, t, s = {})) && ((l = !r(s, n) || !i) && (s[n] = e), l)
                    }

                    function h(t, e) {
                        var i = n[t].apply(this, e);
                        return this.key = this.IDToKey[this.key], i
                    }

                    t.keys = null, t.IDToKey = null, t.set = function (t, n, e) {
                        return u.call(this, t, n, !1, e), this
                    }, t.add = function (t, n, e) {
                        return u.call(this, t, n, !0, e)
                    }, t["++"] = function (t) {
                        return l.call(this, t, 1, !0)
                    }, t["--"] = function (t) {
                        return l.call(this, t, -1)
                    }, t.push = function (t) {
                        return a.call(this, t, i.push, v(arguments, 1))
                    }, t.unshift = function (t) {
                        return a.call(this, t, i.unshift, v(arguments, 1))
                    }, t.concat = function (t) {
                        return a.call(this, t, i.concat, v(arguments, 1), !0)
                    }, t.splice = function (t) {
                        return a.call(this, t, i.splice, v(arguments, 1), !0)
                    }, t.pop = function (t) {
                        return a.call(this, t, i.pop)
                    }, t.shift = function (t) {
                        return a.call(this, t, i.shift)
                    }, t.setProp = function (t, n, e) {
                        return c.call(this, t, n, e, !1)
                    }, t.addProp = function (t, n, e) {
                        return c.call(this, t, n, e, !0)
                    }, t.getProp = function (t, n) {
                        var e;
                        return this.has(t) && o(e = this.get(t)) && e[n]
                    }, t.hasProp = function (t, n) {
                        var e;
                        return p(n) && this.has(t) && o(e = this.get(t)) && r(e, n)
                    }, t.deleteProp = function (t, n) {
                        var e, i = this.has(t) && o(e = this.get(t)) && r(e, n);
                        return i && delete e[n], i
                    }, t.get = function (t) {
                        var n = g(t, !0);
                        return n && m.get(this, n) || void 0
                    }, t.has = function (t) {
                        var n = g(t, !0);
                        return !!n && m.has(this, n)
                    }, t.delete = function (t) {
                        var n = g(t), e = !!n && r(this.IDToKey, n);
                        return e && (delete this.IDToKey[n], x(this.keys, m.delete(this, n))), e
                    }, t.first = function () {
                        return h.call(this, "first", arguments)
                    }, t.next = function () {
                        return h.call(this, "next", arguments)
                    }, t.prev = function () {
                        return h.call(this, "prev", arguments)
                    }, t.last = function () {
                        return h.call(this, "last", arguments)
                    }, e && (t[Symbol.iterator] = function () {
                        var t = this;
                        return this.start(), {
                            next: function () {
                                return {done: !t.next(), value: [t.key, t.value]}
                            }
                        }
                    }), t.clear = function () {
                        n.clear.call(this), this.IDToKey = {}
                    }, t.clone = function () {
                        var t = new k;
                        for (this.start(); this.next();) t.add(this.key, this.value);
                        return t
                    }
                }(y(k, m), m.prototype), n.set = w, (c = y(w, m)).add = function (t, n) {
                    var e = g(t);
                    return !!e && m.set(this, e, t, !0, n)
                }, c.addMulti = function (t, n) {
                    for (var e = 0, i = 0; i < t.length; i++) this.add(t[i], n) && e++;
                    return e
                }, c.has = function (t) {
                    var n = g(t, !0);
                    return !!n && m.has(this, n)
                }, c.delete = function (t) {
                    var n = g(t, !0);
                    return -1 != m.delete(this, n)
                }, e && (c[Symbol.iterator] = function () {
                    var t = this;
                    return this.start(), {
                        next: function () {
                            return {done: !t.next(), value: t.value}
                        }
                    }
                }), c.clone = function () {
                    var t = new w;
                    for (this.start(); this.next();) t.add(this.value);
                    return t
                }, n
            }()
        }
    }, r = {};

    function u(t) {
        var n = r[t];
        if (void 0 !== n) return n.exports;
        var e = r[t] = {exports: {}};
        return i[t].call(e.exports, e, e.exports, u), e.exports
    }

    u.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }(), t = "undefined" != typeof window ? window : u.g, n = u(172).map, e = u(172).set, function (t) {
        void 0 === t.Map && (t.Map = n), void 0 === t.Set && (t.Set = e), "function" != typeof t.addEventListener && (t.addEventListener = function () {
        }), void 0 === t.document && (t.document = {})
    }(t), function (t) {
        "use strict";
        var n = Java.type("java.util.Timer"), e = Java.type("java.util.concurrent.Phaser"),
            i = new n("jsEventLoop", !1), r = new e, u = 0;

        function o() {
            u++
        }

        function s() {
            --u > 0 || (i.cancel(), r.forceTermination())
        }

        var l = function () {
            r.arriveAndDeregister()
        };
        void 0 === t.setTimeout && (t.setTimeout = function (n, e) {
            var u = [].slice.call(arguments, 2, arguments.length), a = (r.register(), !1);
            return i.schedule((function () {
                if (!a) try {
                    n.apply(t, u)
                } catch (t) {
                    print(t)
                } finally {
                    l(), s()
                }
            }), e), o(), function () {
                l(), a = !0, s()
            }
        }), void 0 === t.clearTimeout && (t.clearTimeout = function (t) {
            t()
        }), void 0 === t.setInterval && (t.setInterval = function (n, e) {
            var i = [].slice.call(arguments, 2, arguments.length), r = null, u = function u() {
                r = t.setTimeout(u, e), n.apply(t, i)
            };
            return r = t.setTimeout(u, e), function () {
                r()
            }
        }), void 0 === t.clearInterval && (t.clearInterval = function (t) {
            t()
        })
    }(t), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function (t, n) {
            "use strict";
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), i = 1; i < arguments.length; i++) {
                var r = arguments[i];
                if (null != r) for (var u in r) Object.prototype.hasOwnProperty.call(r, u) && (e[u] = r[u])
            }
            return e
        }, writable: !0, configurable: !0
    }), t.setTimeout((function () {
    }), 1)
})();
