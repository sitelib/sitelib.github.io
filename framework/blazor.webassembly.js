!function (e) {
    var t = {};
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
    }
    n.m = e,
        n.c = t,
        n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }
        ,
        n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        n.t = function (e, t) {
            if (1 & t && (e = n(e)),
                8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var r = Object.create(null);
            if (n.r(r),
                Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }),
                2 & t && "string" != typeof e)
                for (var o in e)
                    n.d(r, o, function (t) {
                        return e[t]
                    }
                        .bind(null, o));
            return r
        }
        ,
        n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            }
                : function () {
                    return e
                }
                ;
            return n.d(t, "a", t),
                t
        }
        ,
        n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 43)
}([, , , function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
        function (e) {
            window.DotNet = e;
            var t = []
                , n = {}
                , r = {}
                , o = 1
                , a = null;
            function i(e) {
                t.push(e)
            }
            function u(e, t, n, r) {
                var o = c();
                if (o.invokeDotNetFromJS) {
                    var a = JSON.stringify(r, m)
                        , i = o.invokeDotNetFromJS(e, t, n, a);
                    return i ? f(i) : null
                }
                throw new Error("The current dispatcher does not support synchronous calls from JS to .NET. Use invokeMethodAsync instead.")
            }
            function s(e, t, r, a) {
                if (e && r)
                    throw new Error("For instance method calls, assemblyName should be null. Received '" + e + "'.");
                var i = o++
                    , u = new Promise((function (e, t) {
                        n[i] = {
                            resolve: e,
                            reject: t
                        }
                    }
                    ));
                try {
                    var s = JSON.stringify(a, m);
                    c().beginInvokeDotNetFromJS(i, e, t, r, s)
                } catch (e) {
                    l(i, !1, e)
                }
                return u
            }
            function c() {
                if (null !== a)
                    return a;
                throw new Error("No .NET call dispatcher has been set.")
            }
            function l(e, t, r) {
                if (!n.hasOwnProperty(e))
                    throw new Error("There is no pending async call with ID " + e + ".");
                var o = n[e];
                delete n[e],
                    t ? o.resolve(r) : o.reject(r)
            }
            function f(e) {
                return e ? JSON.parse(e, (function (e, n) {
                    return t.reduce((function (t, n) {
                        return n(e, t)
                    }
                    ), n)
                }
                )) : null
            }
            function d(e) {
                return e instanceof Error ? e.message + "\n" + e.stack : e ? e.toString() : "null"
            }
            function p(e) {
                if (r.hasOwnProperty(e))
                    return r[e];
                var t, n = window, o = "window";
                if (e.split(".").forEach((function (e) {
                    if (!(e in n))
                        throw new Error("Could not find '" + e + "' in '" + o + "'.");
                    t = n,
                        n = n[e],
                        o += "." + e
                }
                )),
                    n instanceof Function)
                    return n = n.bind(t),
                        r[e] = n,
                        n;
                throw new Error("The value '" + o + "' is not a function.")
            }
            e.attachDispatcher = function (e) {
                a = e
            }
                ,
                e.attachReviver = i,
                e.invokeMethod = function (e, t) {
                    for (var n = [], r = 2; r < arguments.length; r++)
                        n[r - 2] = arguments[r];
                    return u(e, t, null, n)
                }
                ,
                e.invokeMethodAsync = function (e, t) {
                    for (var n = [], r = 2; r < arguments.length; r++)
                        n[r - 2] = arguments[r];
                    return s(e, t, null, n)
                }
                ,
                e.jsCallDispatcher = {
                    findJSFunction: p,
                    invokeJSFromDotNet: function (e, t) {
                        var n = p(e).apply(null, f(t));
                        return null == n ? null : JSON.stringify(n, m)
                    },
                    beginInvokeJSFromDotNet: function (e, t, n) {
                        var r = new Promise((function (e) {
                            e(p(t).apply(null, f(n)))
                        }
                        ));
                        e && r.then((function (t) {
                            return c().endInvokeJSFromDotNet(e, !0, JSON.stringify([e, !0, t], m))
                        }
                        ), (function (t) {
                            return c().endInvokeJSFromDotNet(e, !1, JSON.stringify([e, !1, d(t)]))
                        }
                        ))
                    },
                    endInvokeDotNetFromJS: function (e, t, n) {
                        var r = t ? n : new Error(n);
                        l(parseInt(e), t, r)
                    }
                };
            var h = function () {
                function e(e) {
                    this._id = e
                }
                return e.prototype.invokeMethod = function (e) {
                    for (var t = [], n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                    return u(null, e, this._id, t)
                }
                    ,
                    e.prototype.invokeMethodAsync = function (e) {
                        for (var t = [], n = 1; n < arguments.length; n++)
                            t[n - 1] = arguments[n];
                        return s(null, e, this._id, t)
                    }
                    ,
                    e.prototype.dispose = function () {
                        s(null, "__Dispose", this._id, null).catch((function (e) {
                            return console.error(e)
                        }
                        ))
                    }
                    ,
                    e.prototype.serializeAsArg = function () {
                        return {
                            __dotNetObject: this._id
                        }
                    }
                    ,
                    e
            }();
            function m(e, t) {
                return t instanceof h ? t.serializeAsArg() : t
            }
            i((function (e, t) {
                return t && "object" == typeof t && t.hasOwnProperty("__dotNetObject") ? new h(t.__dotNetObject) : t
            }
            ))
        }(t.DotNet || (t.DotNet = {}))
}
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            n(23),
            n(17);
        var r = n(24)
            , o = n(12)
            , a = {}
            , i = !1;
        function u(e, t, n) {
            var o = a[e];
            o || (o = a[e] = new r.BrowserRenderer(e)),
                o.attachRootComponentToLogicalElement(n, t)
        }
        t.attachRootComponentToLogicalElement = u,
            t.attachRootComponentToElement = function (e, t, n) {
                var r = document.querySelector(e);
                if (!r)
                    throw new Error("Could not find any element matching selector '" + e + "'.");
                u(n || 0, o.toLogicalElement(r, !0), t)
            }
            ,
            t.renderBatch = function (e, t) {
                var n = a[e];
                if (!n)
                    throw new Error("There is no browser renderer with ID " + e + ".");
                for (var r = t.arrayRangeReader, o = t.updatedComponents(), u = r.values(o), s = r.count(o), c = t.referenceFrames(), l = r.values(c), f = t.diffReader, d = 0; d < s; d++) {
                    var p = t.updatedComponentsEntry(u, d)
                        , h = f.componentId(p)
                        , m = f.edits(p);
                    n.updateComponent(t, h, m, l)
                }
                var v = t.disposedComponentIds()
                    , y = r.values(v)
                    , b = r.count(v);
                for (d = 0; d < b; d++) {
                    h = t.disposedComponentIdsEntry(y, d);
                    n.disposeComponent(h)
                }
                var g = t.disposedEventHandlerIds()
                    , w = r.values(g)
                    , E = r.count(g);
                for (d = 0; d < E; d++) {
                    var _ = t.disposedEventHandlerIdsEntry(w, d);
                    n.disposeEventHandler(_)
                }
                i && (i = !1,
                    window.scrollTo && window.scrollTo(0, 0))
            }
            ,
            t.resetScrollAfterNextBatch = function () {
                i = !0
            }
    }
    , , , function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function u(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function (e) {
                            e(t)
                        }
                        ))).then(i, u)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
            , o = this && this.__generator || function (e, t) {
                var n, r, o, a, i = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                },
                    "function" == typeof Symbol && (a[Symbol.iterator] = function () {
                        return this
                    }
                    ),
                    a;
                function u(a) {
                    return function (u) {
                        return function (a) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; i;)
                                try {
                                    if (n = 1,
                                        r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                            0) : r.next) && !(o = o.call(r, a[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (a = [2 & a[0], o.value]),
                                    a[0]) {
                                        case 0:
                                        case 1:
                                            o = a;
                                            break;
                                        case 4:
                                            return i.label++,
                                            {
                                                value: a[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++,
                                                r = a[1],
                                                a = [0];
                                            continue;
                                        case 7:
                                            a = i.ops.pop(),
                                                i.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = i.trys,
                                                (o = o.length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                i.label = a[1];
                                                break
                                            }
                                            if (6 === a[0] && i.label < o[1]) {
                                                i.label = o[1],
                                                    o = a;
                                                break
                                            }
                                            if (o && i.label < o[2]) {
                                                i.label = o[2],
                                                    i.ops.push(a);
                                                break
                                            }
                                            o[2] && i.ops.pop(),
                                                i.trys.pop();
                                            continue
                                    }
                                    a = t.call(e, i)
                                } catch (e) {
                                    a = [6, e],
                                        r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & a[0])
                                throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, u])
                    }
                }
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            n(3);
        var a, i = n(4), u = !1, s = !1, c = null;
        function l(e, t, n) {
            void 0 === n && (n = !1);
            var r = p(e);
            if (!t && h(r))
                f(r, !1, n);
            else if (t && location.href === e) {
                var o = e + "?";
                history.replaceState(null, "", o),
                    location.replace(e)
            } else
                n ? history.replaceState(null, "", r) : location.href = e
        }
        function f(e, t, n) {
            void 0 === n && (n = !1),
                i.resetScrollAfterNextBatch(),
                n ? history.replaceState(null, "", e) : history.pushState(null, "", e),
                d(t)
        }
        function d(e) {
            return r(this, void 0, void 0, (function () {
                return o(this, (function (t) {
                    switch (t.label) {
                        case 0:
                            return c ? [4, c(location.href, e)] : [3, 2];
                        case 1:
                            t.sent(),
                                t.label = 2;
                        case 2:
                            return [2]
                    }
                }
                ))
            }
            ))
        }
        function p(e) {
            return (a = a || document.createElement("a")).href = e,
                a.href
        }
        function h(e) {
            var t, n = (t = document.baseURI).substr(0, t.lastIndexOf("/") + 1);
            return e.startsWith(n)
        }
        t.internalFunctions = {
            listenForNavigationEvents: function (e) {
                if (c = e,
                    s)
                    return;
                s = !0,
                    window.addEventListener("popstate", (function () {
                        return d(!1)
                    }
                    ))
            },
            enableNavigationInterception: function () {
                u = !0
            },
            navigateTo: l,
            getBaseURI: function () {
                return document.baseURI
            },
            getLocationHref: function () {
                return location.href
            }
        },
            t.attachToEventDelegator = function (e) {
                e.notifyAfterClick((function (e) {
                    if (u && 0 === e.button && !function (e) {
                        return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey
                    }(e) && !e.defaultPrevented) {
                        var t = function e(t, n) {
                            return t ? t.tagName === n ? t : e(t.parentElement, n) : null
                        }(e.target, "A");
                        if (t && t.hasAttribute("href")) {
                            var n = t.getAttribute("target");
                            if (!(!n || "_self" === n))
                                return;
                            var r = p(t.getAttribute("href"));
                            h(r) && (e.preventDefault(),
                                f(r, !0))
                        }
                    }
                }
                ))
            }
            ,
            t.navigateTo = l,
            t.toAbsoluteUri = p
    }
    , , , , , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = p("_blazorLogicalChildren")
            , o = p("_blazorLogicalParent")
            , a = p("_blazorLogicalEnd");
        function i(e, t) {
            if (e.childNodes.length > 0 && !t)
                throw new Error("New logical elements must start empty, or allowExistingContents must be true");
            return r in e || (e[r] = []),
                e
        }
        function u(e, t, n) {
            var a = e;
            if (e instanceof Comment && (c(a) && c(a).length > 0))
                throw new Error("Not implemented: inserting non-empty logical container");
            if (s(a))
                throw new Error("Not implemented: moving existing logical children");
            var i = c(t);
            if (n < i.length) {
                var u = i[n];
                u.parentNode.insertBefore(e, u),
                    i.splice(n, 0, a)
            } else
                d(e, t),
                    i.push(a);
            a[o] = t,
                r in a || (a[r] = [])
        }
        function s(e) {
            return e[o] || null
        }
        function c(e) {
            return e[r]
        }
        function l(e) {
            if (e instanceof Element)
                return e;
            if (e instanceof Comment)
                return e.parentNode;
            throw new Error("Not a valid logical element")
        }
        function f(e) {
            var t = c(s(e));
            return t[Array.prototype.indexOf.call(t, e) + 1] || null
        }
        function d(e, t) {
            if (t instanceof Element)
                t.appendChild(e);
            else {
                if (!(t instanceof Comment))
                    throw new Error("Cannot append node because the parent is not a valid logical element. Parent: " + t);
                var n = f(t);
                n ? n.parentNode.insertBefore(e, n) : d(e, s(t))
            }
        }
        function p(e) {
            return "function" == typeof Symbol ? Symbol() : e
        }
        t.toLogicalRootCommentElement = function (e, t) {
            if (!e.parentNode)
                throw new Error("Comment not connected to the DOM " + e.textContent);
            var n = e.parentNode
                , r = i(n, !0)
                , u = c(r);
            return Array.from(n.childNodes).forEach((function (e) {
                return u.push(e)
            }
            )),
                e[o] = r,
                t && (e[a] = t,
                    i(t)),
                i(e)
        }
            ,
            t.toLogicalElement = i,
            t.createAndInsertLogicalContainer = function (e, t) {
                var n = document.createComment("!");
                return u(n, e, t),
                    n
            }
            ,
            t.insertLogicalChild = u,
            t.removeLogicalChild = function e(t, n) {
                var r = c(t).splice(n, 1)[0];
                if (r instanceof Comment)
                    for (var o = c(r); o.length > 0;)
                        e(r, 0);
                var a = r;
                a.parentNode.removeChild(a)
            }
            ,
            t.getLogicalParent = s,
            t.getLogicalSiblingEnd = function (e) {
                return e[a] || null
            }
            ,
            t.getLogicalChild = function (e, t) {
                return c(e)[t]
            }
            ,
            t.isSvgElement = function (e) {
                return "http://www.w3.org/2000/svg" === l(e).namespaceURI
            }
            ,
            t.getLogicalChildrenArray = c,
            t.permuteLogicalChildren = function (e, t) {
                var n = c(e);
                t.forEach((function (e) {
                    e.moveRangeStart = n[e.fromSiblingIndex],
                        e.moveRangeEnd = function e(t) {
                            if (t instanceof Element)
                                return t;
                            var n = f(t);
                            if (n)
                                return n.previousSibling;
                            var r = s(t);
                            return r instanceof Element ? r.lastChild : e(r)
                        }(e.moveRangeStart)
                }
                )),
                    t.forEach((function (t) {
                        var r = t.moveToBeforeMarker = document.createComment("marker")
                            , o = n[t.toSiblingIndex + 1];
                        o ? o.parentNode.insertBefore(r, o) : d(r, e)
                    }
                    )),
                    t.forEach((function (e) {
                        for (var t = e.moveToBeforeMarker, n = t.parentNode, r = e.moveRangeStart, o = e.moveRangeEnd, a = r; a;) {
                            var i = a.nextSibling;
                            if (n.insertBefore(a, t),
                                a === o)
                                break;
                            a = i
                        }
                        n.removeChild(t)
                    }
                    )),
                    t.forEach((function (e) {
                        n[e.toSiblingIndex] = e.moveRangeStart
                    }
                    ))
            }
            ,
            t.getClosestDomElement = l
    }
    , , , , , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.setPlatform = function (e) {
                return t.platform = e,
                    t.platform
            }
    }
    , function (e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.dispatchEvent = function (e, t) {
                if (!r)
                    throw new Error("eventDispatcher not initialized. Call 'setEventDispatcher' to configure it.");
                return r(e, t)
            }
            ,
            t.setEventDispatcher = function (e) {
                r = e
            }
    }
    , , , , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(7)
            , o = n(4);
        window.Blazor = {
            navigateTo: r.navigateTo,
            _internal: {
                attachRootComponentToElement: o.attachRootComponentToElement,
                navigationManager: r.internalFunctions
            }
        }
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(25)
            , o = n(26)
            , a = n(12)
            , i = n(29)
            , u = n(18)
            , s = n(7)
            , c = document.createElement("template")
            , l = document.createElementNS("http://www.w3.org/2000/svg", "g")
            , f = {
                submit: !0
            }
            , d = {}
            , p = function () {
                function e(e) {
                    var t = this;
                    this.childComponentLocations = {},
                        this.browserRendererId = e,
                        this.eventDelegator = new o.EventDelegator((function (e, n, r, o) {
                            !function (e, t, n, r, o) {
                                f[e.type] && e.preventDefault();
                                var a = {
                                    browserRendererId: t,
                                    eventHandlerId: n,
                                    eventArgsType: r.type,
                                    eventFieldInfo: o
                                };
                                u.dispatchEvent(a, r.data)
                            }(e, t.browserRendererId, n, r, o)
                        }
                        )),
                        s.attachToEventDelegator(this.eventDelegator)
                }
                return e.prototype.attachRootComponentToLogicalElement = function (e, t) {
                    this.attachComponentToElement(e, t),
                        d[e] = t
                }
                    ,
                    e.prototype.updateComponent = function (e, t, n, r) {
                        var o = this.childComponentLocations[t];
                        if (!o)
                            throw new Error("No element is currently associated with component " + t);
                        var i = d[t];
                        if (i) {
                            var u = a.getLogicalSiblingEnd(i);
                            delete d[t],
                                u ? function (e, t) {
                                    var n = a.getLogicalParent(e);
                                    if (!n)
                                        throw new Error("Can't clear between nodes. The start node does not have a logical parent.");
                                    for (var r = a.getLogicalChildrenArray(n), o = r.indexOf(e) + 1, i = r.indexOf(t), u = o; u <= i; u++)
                                        a.removeLogicalChild(n, o);
                                    e.textContent = "!"
                                }(i, u) : function (e) {
                                    var t;
                                    for (; t = e.firstChild;)
                                        e.removeChild(t)
                                }(i)
                        }
                        var s = a.getClosestDomElement(o).ownerDocument
                            , c = s && s.activeElement;
                        this.applyEdits(e, t, o, 0, n, r),
                            c instanceof HTMLElement && s && s.activeElement !== c && c.focus()
                    }
                    ,
                    e.prototype.disposeComponent = function (e) {
                        delete this.childComponentLocations[e]
                    }
                    ,
                    e.prototype.disposeEventHandler = function (e) {
                        this.eventDelegator.removeListener(e)
                    }
                    ,
                    e.prototype.attachComponentToElement = function (e, t) {
                        this.childComponentLocations[e] = t
                    }
                    ,
                    e.prototype.applyEdits = function (e, t, n, o, i, u) {
                        for (var s, c = 0, l = o, f = e.arrayBuilderSegmentReader, d = e.editReader, p = e.frameReader, h = f.values(i), m = f.offset(i), v = m + f.count(i), y = m; y < v; y++) {
                            var b = e.diffReader.editsEntry(h, y)
                                , g = d.editType(b);
                            switch (g) {
                                case r.EditType.prependFrame:
                                    var w = d.newTreeIndex(b)
                                        , E = e.referenceFramesEntry(u, w)
                                        , _ = d.siblingIndex(b);
                                    this.insertFrame(e, t, n, l + _, u, E, w);
                                    break;
                                case r.EditType.removeFrame:
                                    _ = d.siblingIndex(b);
                                    a.removeLogicalChild(n, l + _);
                                    break;
                                case r.EditType.setAttribute:
                                    w = d.newTreeIndex(b),
                                        E = e.referenceFramesEntry(u, w),
                                        _ = d.siblingIndex(b);
                                    if (!((C = a.getLogicalChild(n, l + _)) instanceof Element))
                                        throw new Error("Cannot set attribute on non-element child");
                                    this.applyAttribute(e, t, C, E);
                                    break;
                                case r.EditType.removeAttribute:
                                    var C;
                                    _ = d.siblingIndex(b);
                                    if (!((C = a.getLogicalChild(n, l + _)) instanceof HTMLElement))
                                        throw new Error("Cannot remove attribute from non-element child");
                                    var I = d.removedAttributeName(b);
                                    this.tryApplySpecialProperty(e, C, I, null) || C.removeAttribute(I);
                                    break;
                                case r.EditType.updateText:
                                    w = d.newTreeIndex(b),
                                        E = e.referenceFramesEntry(u, w),
                                        _ = d.siblingIndex(b);
                                    var S = a.getLogicalChild(n, l + _);
                                    if (!(S instanceof Text))
                                        throw new Error("Cannot set text content on non-text child");
                                    S.textContent = p.textContent(E);
                                    break;
                                case r.EditType.updateMarkup:
                                    w = d.newTreeIndex(b),
                                        E = e.referenceFramesEntry(u, w),
                                        _ = d.siblingIndex(b);
                                    a.removeLogicalChild(n, l + _),
                                        this.insertMarkup(e, n, l + _, E);
                                    break;
                                case r.EditType.stepIn:
                                    _ = d.siblingIndex(b);
                                    n = a.getLogicalChild(n, l + _),
                                        c++,
                                        l = 0;
                                    break;
                                case r.EditType.stepOut:
                                    n = a.getLogicalParent(n),
                                        l = 0 === --c ? o : 0;
                                    break;
                                case r.EditType.permutationListEntry:
                                    (s = s || []).push({
                                        fromSiblingIndex: l + d.siblingIndex(b),
                                        toSiblingIndex: l + d.moveToSiblingIndex(b)
                                    });
                                    break;
                                case r.EditType.permutationListEnd:
                                    a.permuteLogicalChildren(n, s),
                                        s = void 0;
                                    break;
                                default:
                                    throw new Error("Unknown edit type: " + g)
                            }
                        }
                    }
                    ,
                    e.prototype.insertFrame = function (e, t, n, o, a, u, s) {
                        var c = e.frameReader
                            , l = c.frameType(u);
                        switch (l) {
                            case r.FrameType.element:
                                return this.insertElement(e, t, n, o, a, u, s),
                                    1;
                            case r.FrameType.text:
                                return this.insertText(e, n, o, u),
                                    1;
                            case r.FrameType.attribute:
                                throw new Error("Attribute frames should only be present as leading children of element frames.");
                            case r.FrameType.component:
                                return this.insertComponent(e, n, o, u),
                                    1;
                            case r.FrameType.region:
                                return this.insertFrameRange(e, t, n, o, a, s + 1, s + c.subtreeLength(u));
                            case r.FrameType.elementReferenceCapture:
                                if (n instanceof Element)
                                    return i.applyCaptureIdToElement(n, c.elementReferenceCaptureId(u)),
                                        0;
                                throw new Error("Reference capture frames can only be children of element frames.");
                            case r.FrameType.markup:
                                return this.insertMarkup(e, n, o, u),
                                    1;
                            default:
                                throw new Error("Unknown frame type: " + l)
                        }
                    }
                    ,
                    e.prototype.insertElement = function (e, t, n, o, i, u, s) {
                        var c = e.frameReader
                            , l = c.elementName(u)
                            , f = "svg" === l || a.isSvgElement(n) ? document.createElementNS("http://www.w3.org/2000/svg", l) : document.createElement(l)
                            , d = a.toLogicalElement(f);
                        a.insertLogicalChild(f, n, o);
                        for (var p = s + c.subtreeLength(u), h = s + 1; h < p; h++) {
                            var m = e.referenceFramesEntry(i, h);
                            if (c.frameType(m) !== r.FrameType.attribute) {
                                this.insertFrameRange(e, t, d, 0, i, h, p);
                                break
                            }
                            this.applyAttribute(e, t, f, m)
                        }
                        f instanceof HTMLSelectElement && "_blazorSelectValue" in f && v(f, f._blazorSelectValue)
                    }
                    ,
                    e.prototype.insertComponent = function (e, t, n, r) {
                        var o = a.createAndInsertLogicalContainer(t, n)
                            , i = e.frameReader.componentId(r);
                        this.attachComponentToElement(i, o)
                    }
                    ,
                    e.prototype.insertText = function (e, t, n, r) {
                        var o = e.frameReader.textContent(r)
                            , i = document.createTextNode(o);
                        a.insertLogicalChild(i, t, n)
                    }
                    ,
                    e.prototype.insertMarkup = function (e, t, n, r) {
                        for (var o, i = a.createAndInsertLogicalContainer(t, n), u = e.frameReader.markupContent(r), s = (o = u,
                            a.isSvgElement(t) ? (l.innerHTML = o || " ",
                                l) : (c.innerHTML = o || " ",
                                    c.content)), f = 0; s.firstChild;)
                            a.insertLogicalChild(s.firstChild, i, f++)
                    }
                    ,
                    e.prototype.applyAttribute = function (e, t, n, r) {
                        var o = e.frameReader
                            , a = o.attributeName(r)
                            , i = o.attributeEventHandlerId(r);
                        if (i) {
                            var u = m(a);
                            this.eventDelegator.setListener(n, u, i, t)
                        } else
                            this.tryApplySpecialProperty(e, n, a, r) || n.setAttribute(a, o.attributeValue(r))
                    }
                    ,
                    e.prototype.tryApplySpecialProperty = function (e, t, n, r) {
                        switch (n) {
                            case "value":
                                return this.tryApplyValueProperty(e, t, r);
                            case "checked":
                                return this.tryApplyCheckedProperty(e, t, r);
                            default:
                                return !!n.startsWith("__internal_") && (this.applyInternalAttribute(e, t, n.substring("__internal_".length), r),
                                    !0)
                        }
                    }
                    ,
                    e.prototype.applyInternalAttribute = function (e, t, n, r) {
                        var o = r ? e.frameReader.attributeValue(r) : null;
                        if (n.startsWith("stopPropagation_")) {
                            var a = m(n.substring("stopPropagation_".length));
                            this.eventDelegator.setStopPropagation(t, a, null !== o)
                        } else {
                            if (!n.startsWith("preventDefault_"))
                                throw new Error("Unsupported internal attribute '" + n + "'");
                            a = m(n.substring("preventDefault_".length));
                            this.eventDelegator.setPreventDefault(t, a, null !== o)
                        }
                    }
                    ,
                    e.prototype.tryApplyValueProperty = function (e, t, n) {
                        var r = e.frameReader;
                        if ("INPUT" === t.tagName && "time" === t.getAttribute("type") && !t.getAttribute("step")) {
                            var o = n ? r.attributeValue(n) : null;
                            if (o)
                                return t.value = o.substring(0, 5),
                                    !0
                        }
                        switch (t.tagName) {
                            case "INPUT":
                            case "SELECT":
                            case "TEXTAREA":
                                var a = n ? r.attributeValue(n) : null;
                                return t instanceof HTMLSelectElement ? (v(t, a),
                                    t._blazorSelectValue = a) : t.value = a,
                                    !0;
                            case "OPTION":
                                (a = n ? r.attributeValue(n) : null) || "" === a ? t.setAttribute("value", a) : t.removeAttribute("value");
                                var i = this.findClosestAncestorSelectElement(t);
                                return i && "_blazorSelectValue" in i && i._blazorSelectValue === a && (this.tryApplyValueProperty(e, i, n),
                                    delete i._blazorSelectValue),
                                    !0;
                            default:
                                return !1
                        }
                    }
                    ,
                    e.prototype.tryApplyCheckedProperty = function (e, t, n) {
                        if ("INPUT" === t.tagName) {
                            var r = n ? e.frameReader.attributeValue(n) : null;
                            return t.checked = null !== r,
                                !0
                        }
                        return !1
                    }
                    ,
                    e.prototype.findClosestAncestorSelectElement = function (e) {
                        for (; e;) {
                            if (e instanceof HTMLSelectElement)
                                return e;
                            e = e.parentElement
                        }
                        return null
                    }
                    ,
                    e.prototype.insertFrameRange = function (e, t, n, r, o, a, i) {
                        for (var u = r, s = a; s < i; s++) {
                            var c = e.referenceFramesEntry(o, s);
                            r += this.insertFrame(e, t, n, r, o, c, s),
                                s += h(e, c)
                        }
                        return r - u
                    }
                    ,
                    e
            }();
        function h(e, t) {
            var n = e.frameReader;
            switch (n.frameType(t)) {
                case r.FrameType.component:
                case r.FrameType.element:
                case r.FrameType.region:
                    return n.subtreeLength(t) - 1;
                default:
                    return 0
            }
        }
        function m(e) {
            if (e.startsWith("on"))
                return e.substring(2);
            throw new Error("Attribute should be an event name, but doesn't start with 'on'. Value: '" + e + "'")
        }
        function v(e, t) {
            e.value = t || ""
        }
        t.BrowserRenderer = p
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            function (e) {
                e[e.prependFrame = 1] = "prependFrame",
                    e[e.removeFrame = 2] = "removeFrame",
                    e[e.setAttribute = 3] = "setAttribute",
                    e[e.removeAttribute = 4] = "removeAttribute",
                    e[e.updateText = 5] = "updateText",
                    e[e.stepIn = 6] = "stepIn",
                    e[e.stepOut = 7] = "stepOut",
                    e[e.updateMarkup = 8] = "updateMarkup",
                    e[e.permutationListEntry = 9] = "permutationListEntry",
                    e[e.permutationListEnd = 10] = "permutationListEnd"
            }(t.EditType || (t.EditType = {})),
            function (e) {
                e[e.element = 1] = "element",
                    e[e.text = 2] = "text",
                    e[e.attribute = 3] = "attribute",
                    e[e.component = 4] = "component",
                    e[e.region = 5] = "region",
                    e[e.elementReferenceCapture = 6] = "elementReferenceCapture",
                    e[e.markup = 8] = "markup"
            }(t.FrameType || (t.FrameType = {}))
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(27)
            , o = n(28)
            , a = l(["abort", "blur", "change", "error", "focus", "load", "loadend", "loadstart", "mouseenter", "mouseleave", "progress", "reset", "scroll", "submit", "unload", "DOMNodeInsertedIntoDocument", "DOMNodeRemovedFromDocument"])
            , i = l(["click", "dblclick", "mousedown", "mousemove", "mouseup"])
            , u = function () {
                function e(t) {
                    this.onEvent = t,
                        this.afterClickCallbacks = [];
                    var n = ++e.nextEventDelegatorId;
                    this.eventsCollectionKey = "_blazorEvents_" + n,
                        this.eventInfoStore = new s(this.onGlobalEvent.bind(this))
                }
                return e.prototype.setListener = function (e, t, n, r) {
                    var o = this.getEventHandlerInfosForElement(e, !0)
                        , a = o.getHandler(t);
                    if (a)
                        this.eventInfoStore.update(a.eventHandlerId, n);
                    else {
                        var i = {
                            element: e,
                            eventName: t,
                            eventHandlerId: n,
                            renderingComponentId: r
                        };
                        this.eventInfoStore.add(i),
                            o.setHandler(t, i)
                    }
                }
                    ,
                    e.prototype.removeListener = function (e) {
                        var t = this.eventInfoStore.remove(e);
                        if (t) {
                            var n = t.element
                                , r = this.getEventHandlerInfosForElement(n, !1);
                            r && r.removeHandler(t.eventName)
                        }
                    }
                    ,
                    e.prototype.notifyAfterClick = function (e) {
                        this.afterClickCallbacks.push(e),
                            this.eventInfoStore.addGlobalListener("click")
                    }
                    ,
                    e.prototype.setStopPropagation = function (e, t, n) {
                        this.getEventHandlerInfosForElement(e, !0).stopPropagation(t, n)
                    }
                    ,
                    e.prototype.setPreventDefault = function (e, t, n) {
                        this.getEventHandlerInfosForElement(e, !0).preventDefault(t, n)
                    }
                    ,
                    e.prototype.onGlobalEvent = function (e) {
                        if (e.target instanceof Element) {
                            for (var t, n, u = e.target, s = null, c = a.hasOwnProperty(e.type), l = !1; u;) {
                                var f = this.getEventHandlerInfosForElement(u, !1);
                                if (f) {
                                    var d = f.getHandler(e.type);
                                    if (d && (t = u,
                                        n = e.type,
                                        !((t instanceof HTMLButtonElement || t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement) && i.hasOwnProperty(n) && t.disabled))) {
                                        s || (s = r.EventForDotNet.fromDOMEvent(e));
                                        var p = o.EventFieldInfo.fromEvent(d.renderingComponentId, e);
                                        this.onEvent(e, d.eventHandlerId, s, p)
                                    }
                                    f.stopPropagation(e.type) && (l = !0),
                                        f.preventDefault(e.type) && e.preventDefault()
                                }
                                u = c || l ? null : u.parentElement
                            }
                            "click" === e.type && this.afterClickCallbacks.forEach((function (t) {
                                return t(e)
                            }
                            ))
                        }
                    }
                    ,
                    e.prototype.getEventHandlerInfosForElement = function (e, t) {
                        return e.hasOwnProperty(this.eventsCollectionKey) ? e[this.eventsCollectionKey] : t ? e[this.eventsCollectionKey] = new c : null
                    }
                    ,
                    e.nextEventDelegatorId = 0,
                    e
            }();
        t.EventDelegator = u;
        var s = function () {
            function e(e) {
                this.globalListener = e,
                    this.infosByEventHandlerId = {},
                    this.countByEventName = {}
            }
            return e.prototype.add = function (e) {
                if (this.infosByEventHandlerId[e.eventHandlerId])
                    throw new Error("Event " + e.eventHandlerId + " is already tracked");
                this.infosByEventHandlerId[e.eventHandlerId] = e,
                    this.addGlobalListener(e.eventName)
            }
                ,
                e.prototype.addGlobalListener = function (e) {
                    if (this.countByEventName.hasOwnProperty(e))
                        this.countByEventName[e]++;
                    else {
                        this.countByEventName[e] = 1;
                        var t = a.hasOwnProperty(e);
                        document.addEventListener(e, this.globalListener, t)
                    }
                }
                ,
                e.prototype.update = function (e, t) {
                    if (this.infosByEventHandlerId.hasOwnProperty(t))
                        throw new Error("Event " + t + " is already tracked");
                    var n = this.infosByEventHandlerId[e];
                    delete this.infosByEventHandlerId[e],
                        n.eventHandlerId = t,
                        this.infosByEventHandlerId[t] = n
                }
                ,
                e.prototype.remove = function (e) {
                    var t = this.infosByEventHandlerId[e];
                    if (t) {
                        delete this.infosByEventHandlerId[e];
                        var n = t.eventName;
                        0 == --this.countByEventName[n] && (delete this.countByEventName[n],
                            document.removeEventListener(n, this.globalListener))
                    }
                    return t
                }
                ,
                e
        }()
            , c = function () {
                function e() {
                    this.handlers = {},
                        this.preventDefaultFlags = null,
                        this.stopPropagationFlags = null
                }
                return e.prototype.getHandler = function (e) {
                    return this.handlers.hasOwnProperty(e) ? this.handlers[e] : null
                }
                    ,
                    e.prototype.setHandler = function (e, t) {
                        this.handlers[e] = t
                    }
                    ,
                    e.prototype.removeHandler = function (e) {
                        delete this.handlers[e]
                    }
                    ,
                    e.prototype.preventDefault = function (e, t) {
                        return void 0 !== t && (this.preventDefaultFlags = this.preventDefaultFlags || {},
                            this.preventDefaultFlags[e] = t),
                            !!this.preventDefaultFlags && this.preventDefaultFlags[e]
                    }
                    ,
                    e.prototype.stopPropagation = function (e, t) {
                        return void 0 !== t && (this.stopPropagationFlags = this.stopPropagationFlags || {},
                            this.stopPropagationFlags[e] = t),
                            !!this.stopPropagationFlags && this.stopPropagationFlags[e]
                    }
                    ,
                    e
            }();
        function l(e) {
            var t = {};
            return e.forEach((function (e) {
                t[e] = !0
            }
            )),
                t
        }
    }
    , function (e, t, n) {
        "use strict";
        var r = this && this.__assign || function () {
            return (r = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ).apply(this, arguments)
        }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function () {
            function e(e, t) {
                this.type = e,
                    this.data = t
            }
            return e.fromDOMEvent = function (t) {
                var n = t.target;
                switch (t.type) {
                    case "input":
                    case "change":
                        if (function (e) {
                            return -1 !== i.indexOf(e.getAttribute("type"))
                        }(n)) {
                            var o = function (e) {
                                var t = e.value
                                    , n = e.type;
                                switch (n) {
                                    case "date":
                                    case "datetime-local":
                                    case "month":
                                        return t;
                                    case "time":
                                        return 5 === t.length ? t + ":00" : t;
                                    case "week":
                                        return t
                                }
                                throw new Error("Invalid element type '" + n + "'.")
                            }(n);
                            return new e("change", {
                                type: t.type,
                                value: o
                            })
                        }
                        var u = function (e) {
                            return !!e && "INPUT" === e.tagName && "checkbox" === e.getAttribute("type")
                        }(n) ? !!n.checked : n.value;
                        return new e("change", {
                            type: t.type,
                            value: u
                        });
                    case "copy":
                    case "cut":
                    case "paste":
                        return new e("clipboard", {
                            type: t.type
                        });
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        return new e("drag", function (e) {
                            return r(r({}, a(e)), {
                                dataTransfer: e.dataTransfer
                            })
                        }(t));
                    case "focus":
                    case "blur":
                    case "focusin":
                    case "focusout":
                        return new e("focus", {
                            type: t.type
                        });
                    case "keydown":
                    case "keyup":
                    case "keypress":
                        return new e("keyboard", function (e) {
                            return {
                                type: e.type,
                                key: e.key,
                                code: e.code,
                                location: e.location,
                                repeat: e.repeat,
                                ctrlKey: e.ctrlKey,
                                shiftKey: e.shiftKey,
                                altKey: e.altKey,
                                metaKey: e.metaKey
                            }
                        }(t));
                    case "contextmenu":
                    case "click":
                    case "mouseover":
                    case "mouseout":
                    case "mousemove":
                    case "mousedown":
                    case "mouseup":
                    case "dblclick":
                        return new e("mouse", a(t));
                    case "error":
                        return new e("error", function (e) {
                            return {
                                type: e.type,
                                message: e.message,
                                filename: e.filename,
                                lineno: e.lineno,
                                colno: e.colno
                            }
                        }(t));
                    case "loadstart":
                    case "timeout":
                    case "abort":
                    case "load":
                    case "loadend":
                    case "progress":
                        return new e("progress", function (e) {
                            return {
                                type: e.type,
                                lengthComputable: e.lengthComputable,
                                loaded: e.loaded,
                                total: e.total
                            }
                        }(t));
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchenter":
                    case "touchleave":
                    case "touchstart":
                        return new e("touch", function (e) {
                            function t(e) {
                                for (var t = [], n = 0; n < e.length; n++) {
                                    var r = e[n];
                                    t.push({
                                        identifier: r.identifier,
                                        clientX: r.clientX,
                                        clientY: r.clientY,
                                        screenX: r.screenX,
                                        screenY: r.screenY,
                                        pageX: r.pageX,
                                        pageY: r.pageY
                                    })
                                }
                                return t
                            }
                            return {
                                type: e.type,
                                detail: e.detail,
                                touches: t(e.touches),
                                targetTouches: t(e.targetTouches),
                                changedTouches: t(e.changedTouches),
                                ctrlKey: e.ctrlKey,
                                shiftKey: e.shiftKey,
                                altKey: e.altKey,
                                metaKey: e.metaKey
                            }
                        }(t));
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointerenter":
                    case "pointerleave":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        return new e("pointer", function (e) {
                            return r(r({}, a(e)), {
                                pointerId: e.pointerId,
                                width: e.width,
                                height: e.height,
                                pressure: e.pressure,
                                tiltX: e.tiltX,
                                tiltY: e.tiltY,
                                pointerType: e.pointerType,
                                isPrimary: e.isPrimary
                            })
                        }(t));
                    case "wheel":
                    case "mousewheel":
                        return new e("wheel", function (e) {
                            return r(r({}, a(e)), {
                                deltaX: e.deltaX,
                                deltaY: e.deltaY,
                                deltaZ: e.deltaZ,
                                deltaMode: e.deltaMode
                            })
                        }(t));
                    default:
                        return new e("unknown", {
                            type: t.type
                        })
                }
            }
                ,
                e
        }();
        function a(e) {
            return {
                type: e.type,
                detail: e.detail,
                screenX: e.screenX,
                screenY: e.screenY,
                clientX: e.clientX,
                clientY: e.clientY,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                button: e.button,
                buttons: e.buttons,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey,
                metaKey: e.metaKey
            }
        }
        t.EventForDotNet = o;
        var i = ["date", "datetime-local", "month", "time", "week"]
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                this.componentId = e,
                    this.fieldValue = t
            }
            return e.fromEvent = function (t, n) {
                var r = n.target;
                if (r instanceof Element) {
                    var o = function (e) {
                        if (e instanceof HTMLInputElement)
                            return e.type && "checkbox" === e.type.toLowerCase() ? {
                                value: e.checked
                            } : {
                                    value: e.value
                                };
                        if (e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement)
                            return {
                                value: e.value
                            };
                        return null
                    }(r);
                    if (o)
                        return new e(t, o.value)
                }
                return null
            }
                ,
                e
        }();
        t.EventFieldInfo = r
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(3);
        function o(e) {
            return "_bl_" + e
        }
        t.applyCaptureIdToElement = function (e, t) {
            e.setAttribute(o(t), "")
        }
            ;
        r.DotNet.attachReviver((function (e, t) {
            return t && "object" == typeof t && t.hasOwnProperty("__internalId") && "string" == typeof t.__internalId ? (n = t.__internalId,
                r = "[" + o(n) + "]",
                document.querySelector(r)) : t;
            var n, r
        }
        ))
    }
    , function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function u(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function (e) {
                            e(t)
                        }
                        ))).then(i, u)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
            , o = this && this.__generator || function (e, t) {
                var n, r, o, a, i = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                },
                    "function" == typeof Symbol && (a[Symbol.iterator] = function () {
                        return this
                    }
                    ),
                    a;
                function u(a) {
                    return function (u) {
                        return function (a) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; i;)
                                try {
                                    if (n = 1,
                                        r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                            0) : r.next) && !(o = o.call(r, a[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (a = [2 & a[0], o.value]),
                                    a[0]) {
                                        case 0:
                                        case 1:
                                            o = a;
                                            break;
                                        case 4:
                                            return i.label++,
                                            {
                                                value: a[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++,
                                                r = a[1],
                                                a = [0];
                                            continue;
                                        case 7:
                                            a = i.ops.pop(),
                                                i.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = i.trys,
                                                (o = o.length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                i.label = a[1];
                                                break
                                            }
                                            if (6 === a[0] && i.label < o[1]) {
                                                i.label = o[1],
                                                    o = a;
                                                break
                                            }
                                            if (o && i.label < o[2]) {
                                                i.label = o[2],
                                                    i.ops.push(a);
                                                break
                                            }
                                            o[2] && i.ops.pop(),
                                                i.trys.pop();
                                            continue
                                    }
                                    a = t.call(e, i)
                                } catch (e) {
                                    a = [6, e],
                                        r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & a[0])
                                throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, u])
                    }
                }
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = !1;
        t.showErrorNotification = function () {
            return r(this, void 0, void 0, (function () {
                var e;
                return o(this, (function (t) {
                    return (e = document.querySelector("#blazor-error-ui")) && (e.style.display = "block"),
                        a || (a = !0,
                            document.querySelectorAll("#blazor-error-ui .reload").forEach((function (e) {
                                e.onclick = function (e) {
                                    location.reload(),
                                        e.preventDefault()
                                }
                            }
                            )),
                            document.querySelectorAll("#blazor-error-ui .dismiss").forEach((function (e) {
                                e.onclick = function (e) {
                                    var t = document.querySelector("#blazor-error-ui");
                                    t && (t.style.display = "none"),
                                        e.preventDefault()
                                }
                            }
                            ))),
                        [2]
                }
                ))
            }
            ))
        }
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = Math.pow(2, 32)
            , o = Math.pow(2, 21) - 1;
        function a(e, t) {
            return e[t] + (e[t + 1] << 8) + (e[t + 2] << 16) + (e[t + 3] << 24 >>> 0)
        }
        t.readInt32LE = function (e, t) {
            return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24
        }
            ,
            t.readUint32LE = a,
            t.readUint64LE = function (e, t) {
                var n = a(e, t + 4);
                if (n > o)
                    throw new Error("Cannot read uint64 with high order part " + n + ", because the result would exceed Number.MAX_SAFE_INTEGER.");
                return n * r + a(e, t)
            }
            ,
            t.readLEB128 = function (e, t) {
                for (var n = 0, r = 0, o = 0; o < 4; o++) {
                    var a = e[t + o];
                    if (n |= (127 & a) << r,
                        a < 128)
                        break;
                    r += 7
                }
                return n
            }
            ,
            t.numLEB128Bytes = function (e) {
                return e < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : 4
            }
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = "function" == typeof TextDecoder ? new TextDecoder("utf-8") : null;
        t.decodeUtf8 = r ? r.decode.bind(r) : function (e) {
            var t = 0
                , n = e.length
                , r = []
                , o = [];
            for (; t < n;) {
                var a = e[t++];
                if (0 === a)
                    break;
                if (0 == (128 & a))
                    r.push(a);
                else if (192 == (224 & a)) {
                    var i = 63 & e[t++];
                    r.push((31 & a) << 6 | i)
                } else if (224 == (240 & a)) {
                    i = 63 & e[t++];
                    var u = 63 & e[t++];
                    r.push((31 & a) << 12 | i << 6 | u)
                } else if (240 == (248 & a)) {
                    i = 63 & e[t++],
                        u = 63 & e[t++];
                    var s = 63 & e[t++]
                        , c = (7 & a) << 18 | i << 12 | u << 6 | s;
                    c > 65535 && (c -= 65536,
                        r.push(c >>> 10 & 1023 | 55296),
                        c = 56320 | 1023 & c),
                        r.push(c)
                }
                r.length > 1024 && (o.push(String.fromCharCode.apply(null, r)),
                    r.length = 0)
            }
            return o.push(String.fromCharCode.apply(null, r)),
                o.join("")
        }
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.shouldAutoStart = function () {
                return !(!document || !document.currentScript || "false" === document.currentScript.getAttribute("autostart"))
            }
    }
    , , , , , , , , , , function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function u(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function (e) {
                            e(t)
                        }
                        ))).then(i, u)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
            , o = this && this.__generator || function (e, t) {
                var n, r, o, a, i = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                },
                    "function" == typeof Symbol && (a[Symbol.iterator] = function () {
                        return this
                    }
                    ),
                    a;
                function u(a) {
                    return function (u) {
                        return function (a) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; i;)
                                try {
                                    if (n = 1,
                                        r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                            0) : r.next) && !(o = o.call(r, a[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (a = [2 & a[0], o.value]),
                                    a[0]) {
                                        case 0:
                                        case 1:
                                            o = a;
                                            break;
                                        case 4:
                                            return i.label++,
                                            {
                                                value: a[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++,
                                                r = a[1],
                                                a = [0];
                                            continue;
                                        case 7:
                                            a = i.ops.pop(),
                                                i.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = i.trys,
                                                (o = o.length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                i.label = a[1];
                                                break
                                            }
                                            if (6 === a[0] && i.label < o[1]) {
                                                i.label = o[1],
                                                    o = a;
                                                break
                                            }
                                            if (o && i.label < o[2]) {
                                                i.label = o[2],
                                                    i.ops.push(a);
                                                break
                                            }
                                            o[2] && i.ops.pop(),
                                                i.trys.pop();
                                            continue
                                    }
                                    a = t.call(e, i)
                                } catch (e) {
                                    a = [6, e],
                                        r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & a[0])
                                throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, u])
                    }
                }
            }
            , a = this && this.__read || function (e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r, o, a = n.call(e), i = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = a.next()).done;)
                        i.push(r.value)
                } catch (e) {
                    o = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = a.return) && n.call(a)
                    } finally {
                        if (o)
                            throw o.error
                    }
                }
                return i
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(3);
        n(22);
        var u = n(17)
            , s = n(44)
            , c = n(4)
            , l = n(47)
            , f = n(33)
            , d = n(18)
            , p = n(48)
            , h = n(49)
            , m = n(50)
            , v = !1;
        function y(e) {
            return r(this, void 0, void 0, (function () {
                var t, n, f, y, b, g, w, E = this;
                return o(this, (function (_) {
                    switch (_.label) {
                        case 0:
                            if (v)
                                throw new Error("Blazor has already started.");
                            return v = !0,
                                d.setEventDispatcher((function (e, t) {
                                    return i.DotNet.invokeMethodAsync("Microsoft.AspNetCore.Components.WebAssembly", "DispatchEvent", e, JSON.stringify(t))
                                }
                                )),
                                t = u.setPlatform(s.monoPlatform),
                                window.Blazor.platform = t,
                                window.Blazor._internal.renderBatch = function (e, t) {
                                    c.renderBatch(e, new l.SharedMemoryRenderBatch(t))
                                }
                                ,
                                n = window.Blazor._internal.navigationManager.getBaseURI,
                                f = window.Blazor._internal.navigationManager.getLocationHref,
                                window.Blazor._internal.navigationManager.getUnmarshalledBaseURI = function () {
                                    return BINDING.js_string_to_mono_string(n())
                                }
                                ,
                                window.Blazor._internal.navigationManager.getUnmarshalledLocationHref = function () {
                                    return BINDING.js_string_to_mono_string(f())
                                }
                                ,
                                window.Blazor._internal.navigationManager.listenForNavigationEvents((function (e, t) {
                                    return r(E, void 0, void 0, (function () {
                                        return o(this, (function (n) {
                                            switch (n.label) {
                                                case 0:
                                                    return [4, i.DotNet.invokeMethodAsync("Microsoft.AspNetCore.Components.WebAssembly", "NotifyLocationChanged", e, t)];
                                                case 1:
                                                    return n.sent(),
                                                        [2]
                                            }
                                        }
                                        ))
                                    }
                                    ))
                                }
                                )),
                                [4, m.BootConfigResult.initAsync()];
                        case 1:
                            return y = _.sent(),
                                [4, Promise.all([p.WebAssemblyResourceLoader.initAsync(y.bootConfig, e || {}), h.WebAssemblyConfigLoader.initAsync(y)])];
                        case 2:
                            b = a.apply(void 0, [_.sent(), 1]),
                                g = b[0],
                                _.label = 3;
                        case 3:
                            return _.trys.push([3, 5, , 6]),
                                [4, t.start(g)];
                        case 4:
                            return _.sent(),
                                [3, 6];
                        case 5:
                            throw w = _.sent(),
                            new Error("Failed to start platform. Reason: " + w);
                        case 6:
                            return t.callEntryPoint(g.bootConfig.entryAssembly),
                                [2]
                    }
                }
                ))
            }
            ))
        }
        window.Blazor.start = y,
            f.shouldAutoStart() && y().catch((function (e) {
                "undefined" != typeof Module && Module.printErr ? Module.printErr(e) : console.error(e)
            }
            ))
    }
    , function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function u(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function (e) {
                            e(t)
                        }
                        ))).then(i, u)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
            , o = this && this.__generator || function (e, t) {
                var n, r, o, a, i = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                },
                    "function" == typeof Symbol && (a[Symbol.iterator] = function () {
                        return this
                    }
                    ),
                    a;
                function u(a) {
                    return function (u) {
                        return function (a) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; i;)
                                try {
                                    if (n = 1,
                                        r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                            0) : r.next) && !(o = o.call(r, a[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (a = [2 & a[0], o.value]),
                                    a[0]) {
                                        case 0:
                                        case 1:
                                            o = a;
                                            break;
                                        case 4:
                                            return i.label++,
                                            {
                                                value: a[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++,
                                                r = a[1],
                                                a = [0];
                                            continue;
                                        case 7:
                                            a = i.ops.pop(),
                                                i.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = i.trys,
                                                (o = o.length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                i.label = a[1];
                                                break
                                            }
                                            if (6 === a[0] && i.label < o[1]) {
                                                i.label = o[1],
                                                    o = a;
                                                break
                                            }
                                            if (o && i.label < o[2]) {
                                                i.label = o[2],
                                                    i.ops.push(a);
                                                break
                                            }
                                            o[2] && i.ops.pop(),
                                                i.trys.pop();
                                            continue
                                    }
                                    a = t.call(e, i)
                                } catch (e) {
                                    a = [6, e],
                                        r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & a[0])
                                throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, u])
                    }
                }
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a, i = n(3), u = n(45), s = n(30), c = n(46), l = Math.pow(2, 32), f = Math.pow(2, 21) - 1;
        function d(e) {
            return Module.HEAP32[e >> 2]
        }
        t.monoPlatform = {
            start: function (e) {
                return new Promise((function (t, n) {
                    var l, f;
                    u.attachDebuggerHotkey(e),
                        window.Browser = {
                            init: function () { }
                        },
                        l = function () {
                            window.Module = function (e, t, n) {
                                var l = this
                                    , f = e.bootConfig.resources
                                    , d = window.Module || {}
                                    , h = ["DEBUGGING ENABLED"];
                                d.print = function (e) {
                                    return h.indexOf(e) < 0 && console.log(e)
                                }
                                    ,
                                    d.printErr = function (e) {
                                        console.error(e),
                                            s.showErrorNotification()
                                    }
                                    ,
                                    d.preRun = d.preRun || [],
                                    d.postRun = d.postRun || [],
                                    d.preloadPlugins = [];
                                var y, b = e.loadResources(f.assembly, (function (e) {
                                    return "framework/" + e
                                }
                                ), "assembly"), g = e.loadResources(f.pdb || {}, (function (e) {
                                    return "framework/" + e
                                }
                                ), "pdb"), w = e.loadResource("dotnet.wasm", "framework/dotnet.wasm", e.bootConfig.resources.runtime["dotnet.wasm"], "dotnetwasm");
                                return e.bootConfig.resources.runtime.hasOwnProperty("dotnet.timezones.dat") && (y = e.loadResource("dotnet.timezones.dat", "framework/dotnet.timezones.dat", e.bootConfig.resources.runtime["dotnet.timezones.dat"], "timezonedata")),
                                    d.instantiateWasm = function (e, t) {
                                        return r(l, void 0, void 0, (function () {
                                            var n, r;
                                            return o(this, (function (o) {
                                                switch (o.label) {
                                                    case 0:
                                                        return o.trys.push([0, 3, , 4]),
                                                            [4, w];
                                                    case 1:
                                                        return [4, v(o.sent(), e)];
                                                    case 2:
                                                        return n = o.sent(),
                                                            [3, 4];
                                                    case 3:
                                                        throw r = o.sent(),
                                                        d.printErr(r),
                                                        r;
                                                    case 4:
                                                        return t(n),
                                                            [2]
                                                }
                                            }
                                            ))
                                        }
                                        )),
                                            []
                                    }
                                    ,
                                    d.preRun.push((function () {
                                        a = cwrap("mono_wasm_add_assembly", null, ["string", "number", "number"]),
                                            cwrap("mono_wasm_string_get_utf8", "number", ["number"]),
                                            MONO.loaded_files = [],
                                            y && function (e) {
                                                r(this, void 0, void 0, (function () {
                                                    var t, n;
                                                    return o(this, (function (r) {
                                                        switch (r.label) {
                                                            case 0:
                                                                return t = "blazor:timezonedata",
                                                                    addRunDependency(t),
                                                                    [4, e.response];
                                                            case 1:
                                                                return [4, r.sent().arrayBuffer()];
                                                            case 2:
                                                                return n = r.sent(),
                                                                    c.loadTimezoneData(n),
                                                                    removeRunDependency(t),
                                                                    [2]
                                                        }
                                                    }
                                                    ))
                                                }
                                                ))
                                            }(y),
                                            b.forEach((function (e) {
                                                return E(e, function (e, t) {
                                                    var n = e.lastIndexOf(".");
                                                    if (n < 0)
                                                        throw new Error("No extension to replace in '" + e + "'");
                                                    return e.substr(0, n) + t
                                                }(e.name, ".dll"))
                                            }
                                            )),
                                            g.forEach((function (e) {
                                                return E(e, e.name)
                                            }
                                            )),
                                            window.Blazor._internal.dotNetCriticalError = function (e) {
                                                d.printErr(BINDING.conv_string(e) || "(null)")
                                            }
                                            ,
                                            window.Blazor._internal.getSatelliteAssemblies = function (t) {
                                                var n = BINDING.mono_array_to_js_array(t)
                                                    , a = e.bootConfig.resources.satelliteResources;
                                                if (a) {
                                                    var i = Promise.all(n.filter((function (e) {
                                                        return a.hasOwnProperty(e)
                                                    }
                                                    )).map((function (t) {
                                                        return e.loadResources(a[t], (function (e) {
                                                            return "framework/" + e
                                                        }
                                                        ), "assembly")
                                                    }
                                                    )).reduce((function (e, t) {
                                                        return e.concat(t)
                                                    }
                                                    ), new Array).map((function (e) {
                                                        return r(l, void 0, void 0, (function () {
                                                            return o(this, (function (t) {
                                                                switch (t.label) {
                                                                    case 0:
                                                                        return [4, e.response];
                                                                    case 1:
                                                                        return [2, t.sent().arrayBuffer()]
                                                                }
                                                            }
                                                            ))
                                                        }
                                                        ))
                                                    }
                                                    )));
                                                    return BINDING.js_to_mono_obj(i.then((function (e) {
                                                        return e.length && (window.Blazor._internal.readSatelliteAssemblies = function () {
                                                            for (var t = BINDING.mono_obj_array_new(e.length), n = 0; n < e.length; n++)
                                                                BINDING.mono_obj_array_set(t, n, BINDING.js_typed_array_to_array(new Uint8Array(e[n])));
                                                            return t
                                                        }
                                                        ),
                                                            e.length
                                                    }
                                                    )))
                                                }
                                                return BINDING.js_to_mono_obj(Promise.resolve(0))
                                            }
                                    }
                                    )),
                                    d.postRun.push((function () {
                                        var n, r, o;
                                        e.bootConfig.debugBuild && e.bootConfig.cacheBootResources && e.logToConsole(),
                                            e.purgeUnusedCacheEntriesAsync(),
                                            MONO.mono_wasm_setenv("MONO_URI_DOTNETRELATIVEORABSOLUTE", "true"),
                                            cwrap("mono_wasm_load_runtime", null, ["string", "number"])("appBinDir", u.hasDebuggingEnabled() ? -1 : 0),
                                            MONO.mono_wasm_runtime_ready(),
                                            n = m("Microsoft.AspNetCore.Components.WebAssembly", "Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime", "InvokeDotNet"),
                                            r = m("Microsoft.AspNetCore.Components.WebAssembly", "Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime", "BeginInvokeDotNet"),
                                            o = m("Microsoft.AspNetCore.Components.WebAssembly", "Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime", "EndInvokeJS"),
                                            i.DotNet.attachDispatcher({
                                                beginInvokeDotNetFromJS: function (e, t, n, o, a) {
                                                    if (!o && !t)
                                                        throw new Error("Either assemblyName or dotNetObjectId must have a non null value.");
                                                    var i = o ? o.toString() : t;
                                                    r(e ? e.toString() : null, i, n, a)
                                                },
                                                endInvokeJSFromDotNet: function (e, t, n) {
                                                    o(n)
                                                },
                                                invokeDotNetFromJS: function (e, t, r, o) {
                                                    return n(e || null, t, r ? r.toString() : null, o)
                                                }
                                            }),
                                            t()
                                    }
                                    )),
                                    d;
                                function E(e, t) {
                                    return r(this, void 0, void 0, (function () {
                                        var r, i, u, s, c;
                                        return o(this, (function (o) {
                                            switch (o.label) {
                                                case 0:
                                                    r = "blazor:" + e.name,
                                                        addRunDependency(r),
                                                        o.label = 1;
                                                case 1:
                                                    return o.trys.push([1, 3, , 4]),
                                                        [4, e.response.then((function (e) {
                                                            return e.arrayBuffer()
                                                        }
                                                        ))];
                                                case 2:
                                                    return i = o.sent(),
                                                        u = new Uint8Array(i),
                                                        s = Module._malloc(u.length),
                                                        new Uint8Array(Module.HEAPU8.buffer, s, u.length).set(u),
                                                        a(t, s, u.length),
                                                        MONO.loaded_files.push((l = e.url,
                                                            p.href = l,
                                                            p.href)),
                                                        [3, 4];
                                                case 3:
                                                    return c = o.sent(),
                                                        n(c),
                                                        [2];
                                                case 4:
                                                    return removeRunDependency(r),
                                                        [2]
                                            }
                                            var l
                                        }
                                        ))
                                    }
                                    ))
                                }
                            }(e, t, n),
                                function (e) {
                                    if ("undefined" == typeof WebAssembly || !WebAssembly.validate)
                                        throw new Error("This browser does not support WebAssembly.");
                                    var t = Object.keys(e.bootConfig.resources.runtime).filter((function (e) {
                                        return e.startsWith("dotnet.") && e.endsWith(".js")
                                    }
                                    ))[0]
                                        , n = e.bootConfig.resources.runtime[t]
                                        , r = document.createElement("script");
                                    if (r.src = "framework/" + t,
                                        r.defer = !0,
                                        e.bootConfig.cacheBootResources && (r.integrity = n,
                                            r.crossOrigin = "anonymous"),
                                        e.startOptions.loadBootResource) {
                                        var o = e.startOptions.loadBootResource("dotnetjs", t, r.src, n);
                                        if ("string" == typeof o)
                                            r.src = o;
                                        else if (o)
                                            throw new Error("For a dotnetjs resource, custom loaders must supply a URI string.")
                                    }
                                    document.body.appendChild(r)
                                }(e)
                        }
                        ,
                        f = document.createElement("script"),
                        window.__wasmmodulecallback__ = l,
                        f.type = "text/javascript",
                        f.text = "var Module; window.__wasmmodulecallback__(); delete window.__wasmmodulecallback__;",
                        document.body.appendChild(f)
                }
                ))
            },
            callEntryPoint: function (e) {
                m("Microsoft.AspNetCore.Components.WebAssembly", "Microsoft.AspNetCore.Components.WebAssembly.Hosting.EntrypointInvoker", "InvokeEntrypoint")(e, null)
            },
            toUint8Array: function (e) {
                var t = h(e)
                    , n = d(t);
                return new Uint8Array(Module.HEAPU8.buffer, t + 4, n)
            },
            getArrayLength: function (e) {
                return d(h(e))
            },
            getArrayEntryPtr: function (e, t, n) {
                return h(e) + 4 + t * n
            },
            getObjectFieldsBaseAddress: function (e) {
                return e + 8
            },
            readInt16Field: function (e, t) {
                return n = e + (t || 0),
                    Module.HEAP16[n >> 1];
                var n
            },
            readInt32Field: function (e, t) {
                return d(e + (t || 0))
            },
            readUint64Field: function (e, t) {
                return function (e) {
                    var t = e >> 2
                        , n = Module.HEAPU32[t + 1];
                    if (n > f)
                        throw new Error("Cannot read uint64 with high order part " + n + ", because the result would exceed Number.MAX_SAFE_INTEGER.");
                    return n * l + Module.HEAPU32[t]
                }(e + (t || 0))
            },
            readFloatField: function (e, t) {
                return n = e + (t || 0),
                    Module.HEAPF32[n >> 2];
                var n
            },
            readObjectField: function (e, t) {
                return d(e + (t || 0))
            },
            readStringField: function (e, t, n) {
                var r = d(e + (t || 0));
                if (0 === r)
                    return null;
                if (n) {
                    var o = BINDING.unbox_mono_obj(r);
                    return "boolean" == typeof o ? o ? "" : null : o
                }
                return BINDING.conv_string(r)
            },
            readStructField: function (e, t) {
                return e + (t || 0)
            }
        };
        var p = document.createElement("a");
        function h(e) {
            return e + 12
        }
        function m(e, t, n) {
            var r = "[" + e + "] " + t + ":" + n;
            return BINDING.bind_static_method(r)
        }
        function v(e, t) {
            return r(this, void 0, void 0, (function () {
                var n, r;
                return o(this, (function (o) {
                    switch (o.label) {
                        case 0:
                            if ("function" != typeof WebAssembly.instantiateStreaming)
                                return [3, 4];
                            o.label = 1;
                        case 1:
                            return o.trys.push([1, 3, , 4]),
                                [4, WebAssembly.instantiateStreaming(e.response, t)];
                        case 2:
                            return [2, o.sent().instance];
                        case 3:
                            return n = o.sent(),
                                console.info("Streaming compilation failed. Falling back to ArrayBuffer instantiation. ", n),
                                [3, 4];
                        case 4:
                            return [4, e.response.then((function (e) {
                                return e.arrayBuffer()
                            }
                            ))];
                        case 5:
                            return r = o.sent(),
                                [4, WebAssembly.instantiate(r, t)];
                        case 6:
                            return [2, o.sent().instance]
                    }
                }
                ))
            }
            ))
        }
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = window.chrome && navigator.userAgent.indexOf("Edge") < 0
            , o = !1;
        function a() {
            return o && r
        }
        t.hasDebuggingEnabled = a,
            t.attachDebuggerHotkey = function (e) {
                o = !!e.bootConfig.resources.pdb;
                var t = navigator.platform.match(/^Mac/i) ? "Cmd" : "Alt";
                a() && console.info("Debugging hotkey: Shift+" + t + "+D (when application has focus)"),
                    document.addEventListener("keydown", (function (e) {
                        var t;
                        e.shiftKey && (e.metaKey || e.altKey) && "KeyD" === e.code && (o ? r ? ((t = document.createElement("a")).href = "framework/debug?url=" + encodeURIComponent(location.href),
                            t.target = "_blank",
                            t.rel = "noopener noreferrer",
                            t.click()) : console.error("Currently, only Microsoft Edge (80+), or Google Chrome, are supported for debugging.") : console.error("Cannot start debugging, because the application was not compiled with debugging enabled."))
                    }
                    ))
            }
    }
    , function (e, t, n) {
        "use strict";
        var r = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator
                , n = t && e[t]
                , r = 0;
            if (n)
                return n.call(e);
            if (e && "number" == typeof e.length)
                return {
                    next: function () {
                        return e && r >= e.length && (e = void 0),
                        {
                            value: e && e[r++],
                            done: !e
                        }
                    }
                };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }
            , o = this && this.__read || function (e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r, o, a = n.call(e), i = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = a.next()).done;)
                        i.push(r.value)
                } catch (e) {
                    o = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = a.return) && n.call(a)
                    } finally {
                        if (o)
                            throw o.error
                    }
                }
                return i
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(31)
            , i = n(32);
        t.loadTimezoneData = function (e) {
            var t, n, u = new Uint8Array(e), s = a.readInt32LE(u, 0);
            u = u.slice(4);
            var c = i.decodeUtf8(u.slice(0, s))
                , l = JSON.parse(c);
            u = u.slice(s),
                Module.FS_createPath("/", "zoneinfo", !0, !0),
                new Set(l.map((function (e) {
                    return e[0].split("/")[0]
                }
                ))).forEach((function (e) {
                    return Module.FS_createPath("/zoneinfo", e, !0, !0)
                }
                ));
            try {
                for (var f = r(l), d = f.next(); !d.done; d = f.next()) {
                    var p = o(d.value, 2)
                        , h = p[0]
                        , m = p[1]
                        , v = u.slice(0, m);
                    Module.FS_createDataFile("/zoneinfo/" + h, null, v, !0, !0, !0),
                        u = u.slice(m)
                }
            } catch (e) {
                t = {
                    error: e
                }
            } finally {
                try {
                    d && !d.done && (n = f.return) && n.call(f)
                } finally {
                    if (t)
                        throw t.error
                }
            }
        }
    }
    , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(17)
            , o = function () {
                function e(e) {
                    this.batchAddress = e,
                        this.arrayRangeReader = a,
                        this.arrayBuilderSegmentReader = i,
                        this.diffReader = u,
                        this.editReader = s,
                        this.frameReader = c
                }
                return e.prototype.updatedComponents = function () {
                    return r.platform.readStructField(this.batchAddress, 0)
                }
                    ,
                    e.prototype.referenceFrames = function () {
                        return r.platform.readStructField(this.batchAddress, a.structLength)
                    }
                    ,
                    e.prototype.disposedComponentIds = function () {
                        return r.platform.readStructField(this.batchAddress, 2 * a.structLength)
                    }
                    ,
                    e.prototype.disposedEventHandlerIds = function () {
                        return r.platform.readStructField(this.batchAddress, 3 * a.structLength)
                    }
                    ,
                    e.prototype.updatedComponentsEntry = function (e, t) {
                        return l(e, t, u.structLength)
                    }
                    ,
                    e.prototype.referenceFramesEntry = function (e, t) {
                        return l(e, t, c.structLength)
                    }
                    ,
                    e.prototype.disposedComponentIdsEntry = function (e, t) {
                        var n = l(e, t, 4);
                        return r.platform.readInt32Field(n)
                    }
                    ,
                    e.prototype.disposedEventHandlerIdsEntry = function (e, t) {
                        var n = l(e, t, 8);
                        return r.platform.readUint64Field(n)
                    }
                    ,
                    e
            }();
        t.SharedMemoryRenderBatch = o;
        var a = {
            structLength: 8,
            values: function (e) {
                return r.platform.readObjectField(e, 0)
            },
            count: function (e) {
                return r.platform.readInt32Field(e, 4)
            }
        }
            , i = {
                structLength: 12,
                values: function (e) {
                    var t = r.platform.readObjectField(e, 0)
                        , n = r.platform.getObjectFieldsBaseAddress(t);
                    return r.platform.readObjectField(n, 0)
                },
                offset: function (e) {
                    return r.platform.readInt32Field(e, 4)
                },
                count: function (e) {
                    return r.platform.readInt32Field(e, 8)
                }
            }
            , u = {
                structLength: 4 + i.structLength,
                componentId: function (e) {
                    return r.platform.readInt32Field(e, 0)
                },
                edits: function (e) {
                    return r.platform.readStructField(e, 4)
                },
                editsEntry: function (e, t) {
                    return l(e, t, s.structLength)
                }
            }
            , s = {
                structLength: 20,
                editType: function (e) {
                    return r.platform.readInt32Field(e, 0)
                },
                siblingIndex: function (e) {
                    return r.platform.readInt32Field(e, 4)
                },
                newTreeIndex: function (e) {
                    return r.platform.readInt32Field(e, 8)
                },
                moveToSiblingIndex: function (e) {
                    return r.platform.readInt32Field(e, 8)
                },
                removedAttributeName: function (e) {
                    return r.platform.readStringField(e, 16)
                }
            }
            , c = {
                structLength: 36,
                frameType: function (e) {
                    return r.platform.readInt16Field(e, 4)
                },
                subtreeLength: function (e) {
                    return r.platform.readInt32Field(e, 8)
                },
                elementReferenceCaptureId: function (e) {
                    return r.platform.readStringField(e, 16)
                },
                componentId: function (e) {
                    return r.platform.readInt32Field(e, 12)
                },
                elementName: function (e) {
                    return r.platform.readStringField(e, 16)
                },
                textContent: function (e) {
                    return r.platform.readStringField(e, 16)
                },
                markupContent: function (e) {
                    return r.platform.readStringField(e, 16)
                },
                attributeName: function (e) {
                    return r.platform.readStringField(e, 16)
                },
                attributeValue: function (e) {
                    return r.platform.readStringField(e, 24, !0)
                },
                attributeEventHandlerId: function (e) {
                    return r.platform.readUint64Field(e, 8)
                }
            };
        function l(e, t, n) {
            return r.platform.getArrayEntryPtr(e, t, n)
        }
    }
    , function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function u(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function (e) {
                            e(t)
                        }
                        ))).then(i, u)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
            , o = this && this.__generator || function (e, t) {
                var n, r, o, a, i = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                },
                    "function" == typeof Symbol && (a[Symbol.iterator] = function () {
                        return this
                    }
                    ),
                    a;
                function u(a) {
                    return function (u) {
                        return function (a) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; i;)
                                try {
                                    if (n = 1,
                                        r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                            0) : r.next) && !(o = o.call(r, a[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (a = [2 & a[0], o.value]),
                                    a[0]) {
                                        case 0:
                                        case 1:
                                            o = a;
                                            break;
                                        case 4:
                                            return i.label++,
                                            {
                                                value: a[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++,
                                                r = a[1],
                                                a = [0];
                                            continue;
                                        case 7:
                                            a = i.ops.pop(),
                                                i.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = i.trys,
                                                (o = o.length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                i.label = a[1];
                                                break
                                            }
                                            if (6 === a[0] && i.label < o[1]) {
                                                i.label = o[1],
                                                    o = a;
                                                break
                                            }
                                            if (o && i.label < o[2]) {
                                                i.label = o[2],
                                                    i.ops.push(a);
                                                break
                                            }
                                            o[2] && i.ops.pop(),
                                                i.trys.pop();
                                            continue
                                    }
                                    a = t.call(e, i)
                                } catch (e) {
                                    a = [6, e],
                                        r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & a[0])
                                throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, u])
                    }
                }
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(7)
            , i = function () {
                function e(e, t, n) {
                    this.bootConfig = e,
                        this.cacheIfUsed = t,
                        this.startOptions = n,
                        this.usedCacheKeys = {},
                        this.networkLoads = {},
                        this.cacheLoads = {}
                }
                return e.initAsync = function (t, n) {
                    return r(this, void 0, void 0, (function () {
                        var r;
                        return o(this, (function (o) {
                            switch (o.label) {
                                case 0:
                                    return [4, u(t)];
                                case 1:
                                    return r = o.sent(),
                                        [2, new e(t, r, n)]
                            }
                        }
                        ))
                    }
                    ))
                }
                    ,
                    e.prototype.loadResources = function (e, t, n) {
                        var r = this;
                        return Object.keys(e).map((function (o) {
                            return r.loadResource(o, t(o), e[o], n)
                        }
                        ))
                    }
                    ,
                    e.prototype.loadResource = function (e, t, n, r) {
                        return {
                            name: e,
                            url: t,
                            response: this.cacheIfUsed ? this.loadResourceWithCaching(this.cacheIfUsed, e, t, n, r) : this.loadResourceWithoutCaching(e, t, n, r)
                        }
                    }
                    ,
                    e.prototype.logToConsole = function () {
                        var e = Object.values(this.cacheLoads)
                            , t = Object.values(this.networkLoads)
                            , n = s(e)
                            , r = s(t)
                            , o = n + r;
                        if (0 !== o) {
                            var a = this.bootConfig.linkerEnabled ? "%c" : "\n%cThis application was built with linking (tree shaking) disabled. Published applications will be significantly smaller.";
                            console.groupCollapsed("%cblazor%c Loaded " + c(o) + " resources" + a, "background: purple; color: white; padding: 1px 3px; border-radius: 3px;", "font-weight: bold;", "font-weight: normal;"),
                                e.length && (console.groupCollapsed("Loaded " + c(n) + " resources from cache"),
                                    console.table(this.cacheLoads),
                                    console.groupEnd()),
                                t.length && (console.groupCollapsed("Loaded " + c(r) + " resources from network"),
                                    console.table(this.networkLoads),
                                    console.groupEnd()),
                                console.groupEnd()
                        }
                    }
                    ,
                    e.prototype.purgeUnusedCacheEntriesAsync = function () {
                        return r(this, void 0, void 0, (function () {
                            var e, t, n, a = this;
                            return o(this, (function (i) {
                                switch (i.label) {
                                    case 0:
                                        return (e = this.cacheIfUsed) ? [4, e.keys()] : [3, 3];
                                    case 1:
                                        return t = i.sent(),
                                            n = t.map((function (t) {
                                                return r(a, void 0, void 0, (function () {
                                                    return o(this, (function (n) {
                                                        switch (n.label) {
                                                            case 0:
                                                                return t.url in this.usedCacheKeys ? [3, 2] : [4, e.delete(t)];
                                                            case 1:
                                                                n.sent(),
                                                                    n.label = 2;
                                                            case 2:
                                                                return [2]
                                                        }
                                                    }
                                                    ))
                                                }
                                                ))
                                            }
                                            )),
                                            [4, Promise.all(n)];
                                    case 2:
                                        i.sent(),
                                            i.label = 3;
                                    case 3:
                                        return [2]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    ,
                    e.prototype.loadResourceWithCaching = function (e, t, n, i, u) {
                        return r(this, void 0, void 0, (function () {
                            var r, s, c, l;
                            return o(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        if (!i || 0 === i.length)
                                            throw new Error("Content hash is required");
                                        r = a.toAbsoluteUri(n + "." + i),
                                            this.usedCacheKeys[r] = !0,
                                            o.label = 1;
                                    case 1:
                                        return o.trys.push([1, 3, , 4]),
                                            [4, e.match(r)];
                                    case 2:
                                        return s = o.sent(),
                                            [3, 4];
                                    case 3:
                                        return o.sent(),
                                            [3, 4];
                                    case 4:
                                        return s ? (c = parseInt(s.headers.get("content-length") || "0"),
                                            this.cacheLoads[t] = {
                                                responseBytes: c
                                            },
                                            [2, s]) : [3, 5];
                                    case 5:
                                        return [4, this.loadResourceWithoutCaching(t, n, i, u)];
                                    case 6:
                                        return l = o.sent(),
                                            this.addToCacheAsync(e, t, r, l),
                                            [2, l]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    ,
                    e.prototype.loadResourceWithoutCaching = function (e, t, n, r) {
                        if (this.startOptions.loadBootResource) {
                            var o = this.startOptions.loadBootResource(r, e, t, n);
                            if (o instanceof Promise)
                                return o;
                            "string" == typeof o && (t = o)
                        }
                        return fetch(t, {
                            cache: "no-cache",
                            integrity: this.bootConfig.cacheBootResources ? n : void 0
                        })
                    }
                    ,
                    e.prototype.addToCacheAsync = function (e, t, n, a) {
                        return r(this, void 0, void 0, (function () {
                            var r, i, u, s;
                            return o(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return [4, a.clone().arrayBuffer()];
                                    case 1:
                                        r = o.sent(),
                                            i = function (e) {
                                                if ("undefined" != typeof performance)
                                                    return performance.getEntriesByName(e)[0]
                                            }(a.url),
                                            u = i && i.encodedBodySize || void 0,
                                            this.networkLoads[t] = {
                                                responseBytes: u
                                            },
                                            s = new Response(r, {
                                                headers: {
                                                    "content-type": a.headers.get("content-type") || "",
                                                    "content-length": (u || a.headers.get("content-length") || "").toString()
                                                }
                                            }),
                                            o.label = 2;
                                    case 2:
                                        return o.trys.push([2, 4, , 5]),
                                            [4, e.put(n, s)];
                                    case 3:
                                        return o.sent(),
                                            [3, 5];
                                    case 4:
                                        return o.sent(),
                                            [3, 5];
                                    case 5:
                                        return [2]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    ,
                    e
            }();
        function u(e) {
            return r(this, void 0, void 0, (function () {
                var t, n;
                return o(this, (function (r) {
                    switch (r.label) {
                        case 0:
                            if (!e.cacheBootResources || "undefined" == typeof caches)
                                return [2, null];
                            t = document.baseURI.substring(document.location.origin.length),
                                n = "blazor-resources-" + t,
                                r.label = 1;
                        case 1:
                            return r.trys.push([1, 3, , 4]),
                                [4, caches.open(n)];
                        case 2:
                            return [2, r.sent() || null];
                        case 3:
                            return r.sent(),
                                [2, null];
                        case 4:
                            return [2]
                    }
                }
                ))
            }
            ))
        }
        function s(e) {
            return e.reduce((function (e, t) {
                return e + (t.responseBytes || 0)
            }
            ), 0)
        }
        function c(e) {
            return (e / 1048576).toFixed(2) + " MB"
        }
        t.WebAssemblyResourceLoader = i
    }
    , function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function u(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function (e) {
                            e(t)
                        }
                        ))).then(i, u)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
            , o = this && this.__generator || function (e, t) {
                var n, r, o, a, i = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                },
                    "function" == typeof Symbol && (a[Symbol.iterator] = function () {
                        return this
                    }
                    ),
                    a;
                function u(a) {
                    return function (u) {
                        return function (a) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; i;)
                                try {
                                    if (n = 1,
                                        r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                            0) : r.next) && !(o = o.call(r, a[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (a = [2 & a[0], o.value]),
                                    a[0]) {
                                        case 0:
                                        case 1:
                                            o = a;
                                            break;
                                        case 4:
                                            return i.label++,
                                            {
                                                value: a[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++,
                                                r = a[1],
                                                a = [0];
                                            continue;
                                        case 7:
                                            a = i.ops.pop(),
                                                i.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = i.trys,
                                                (o = o.length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                i.label = a[1];
                                                break
                                            }
                                            if (6 === a[0] && i.label < o[1]) {
                                                i.label = o[1],
                                                    o = a;
                                                break
                                            }
                                            if (o && i.label < o[2]) {
                                                i.label = o[2],
                                                    i.ops.push(a);
                                                break
                                            }
                                            o[2] && i.ops.pop(),
                                                i.trys.pop();
                                            continue
                                    }
                                    a = t.call(e, i)
                                } catch (e) {
                                    a = [6, e],
                                        r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & a[0])
                                throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, u])
                    }
                }
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function () {
            function e() { }
            return e.initAsync = function (e) {
                return r(this, void 0, void 0, (function () {
                    function t(e) {
                        return r(this, void 0, void 0, (function () {
                            var t, n;
                            return o(this, (function (r) {
                                switch (r.label) {
                                    case 0:
                                        return [4, fetch(e, {
                                            method: "GET",
                                            credentials: "include",
                                            cache: "no-cache"
                                        })];
                                    case 1:
                                        return t = r.sent(),
                                            n = Uint8Array.bind,
                                            [4, t.arrayBuffer()];
                                    case 2:
                                        return [2, new (n.apply(Uint8Array, [void 0, r.sent()]))]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    var n, a = this;
                    return o(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return window.Blazor._internal.getApplicationEnvironment = function () {
                                    return BINDING.js_string_to_mono_string(e.applicationEnvironment)
                                }
                                    ,
                                    [4, Promise.all((e.bootConfig.config || []).filter((function (t) {
                                        return "appsettings.json" === t || t === "appsettings." + e.applicationEnvironment + ".json"
                                    }
                                    )).map((function (e) {
                                        return r(a, void 0, void 0, (function () {
                                            var n;
                                            return o(this, (function (r) {
                                                switch (r.label) {
                                                    case 0:
                                                        return n = {
                                                            name: e
                                                        },
                                                            [4, t(e)];
                                                    case 1:
                                                        return [2, (n.content = r.sent(),
                                                            n)]
                                                }
                                            }
                                            ))
                                        }
                                        ))
                                    }
                                    )))];
                            case 1:
                                return n = i.sent(),
                                    window.Blazor._internal.getConfig = function (e) {
                                        var t = BINDING.conv_string(e)
                                            , r = n.find((function (e) {
                                                return e.name === t
                                            }
                                            ));
                                        return r ? BINDING.js_typed_array_to_array(r.content) : void 0
                                    }
                                    ,
                                    [2]
                        }
                    }
                    ))
                }
                ))
            }
                ,
                e
        }();
        t.WebAssemblyConfigLoader = a
    }
    , function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (o, a) {
                function i(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function u(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        a(e)
                    }
                }
                function s(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function (e) {
                            e(t)
                        }
                        ))).then(i, u)
                }
                s((r = r.apply(e, t || [])).next())
            }
            ))
        }
            , o = this && this.__generator || function (e, t) {
                var n, r, o, a, i = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    throw: u(1),
                    return: u(2)
                },
                    "function" == typeof Symbol && (a[Symbol.iterator] = function () {
                        return this
                    }
                    ),
                    a;
                function u(a) {
                    return function (u) {
                        return function (a) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; i;)
                                try {
                                    if (n = 1,
                                        r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r),
                                            0) : r.next) && !(o = o.call(r, a[1])).done)
                                        return o;
                                    switch (r = 0,
                                    o && (a = [2 & a[0], o.value]),
                                    a[0]) {
                                        case 0:
                                        case 1:
                                            o = a;
                                            break;
                                        case 4:
                                            return i.label++,
                                            {
                                                value: a[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++,
                                                r = a[1],
                                                a = [0];
                                            continue;
                                        case 7:
                                            a = i.ops.pop(),
                                                i.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = i.trys,
                                                (o = o.length > 0 && o[o.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                                                i.label = a[1];
                                                break
                                            }
                                            if (6 === a[0] && i.label < o[1]) {
                                                i.label = o[1],
                                                    o = a;
                                                break
                                            }
                                            if (o && i.label < o[2]) {
                                                i.label = o[2],
                                                    i.ops.push(a);
                                                break
                                            }
                                            o[2] && i.ops.pop(),
                                                i.trys.pop();
                                            continue
                                    }
                                    a = t.call(e, i)
                                } catch (e) {
                                    a = [6, e],
                                        r = 0
                                } finally {
                                    n = o = 0
                                }
                            if (5 & a[0])
                                throw a[1];
                            return {
                                value: a[0] ? a[1] : void 0,
                                done: !0
                            }
                        }([a, u])
                    }
                }
            }
            ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = function () {
            function e(e, t) {
                this.bootConfig = e,
                    this.applicationEnvironment = t
            }
            return e.initAsync = function () {
                return r(this, void 0, void 0, (function () {
                    var t, n;
                    return o(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, fetch("framework/blazor.boot.json", {
                                    method: "GET",
                                    credentials: "include",
                                    cache: "no-cache"
                                })];
                            case 1:
                                return t = r.sent(),
                                    n = t.headers.get("Blazor-Environment") || "Production",
                                    [4, t.json()];
                            case 2:
                                return [2, new e(r.sent(), n)]
                        }
                    }
                    ))
                }
                ))
            }
                ,
                e
        }();
        t.BootConfigResult = a
    }
]);
