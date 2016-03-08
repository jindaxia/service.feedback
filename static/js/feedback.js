! function() {
	function a(a) {
		var b = this.os = {},
			c = this.browser = {},
			d = a.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
			e = a.match(/(Android);?[\s\/]+([\d.]+)?/),
			f = !!a.match(/\(Macintosh\; Intel /),
			g = a.match(/(iPad).*OS\s([\d_]+)/),
			h = a.match(/(iPod)(.*OS\s([\d_]+))?/),
			i = !g && a.match(/(iPhone\sOS)\s([\d_]+)/),
			j = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			k = a.match(/Windows Phone ([\d.]+)/),
			l = j && a.match(/TouchPad/),
			m = a.match(/Kindle\/([\d.]+)/),
			n = a.match(/Silk\/([\d._]+)/),
			o = a.match(/(BlackBerry).*Version\/([\d.]+)/),
			p = a.match(/(BB10).*Version\/([\d.]+)/),
			q = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			r = a.match(/PlayBook/),
			s = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
			t = a.match(/Firefox\/([\d.]+)/),
			u = a.match(/MSIE\s([\d.]+)/) || a.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
			v = a.match(/IEMobile\/([\d.]+)/),
			w = !s && a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
			x = w || a.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/),
			y = a.match(/MQQBrowser\/([\d.]+)/),
			z = a.match(/MicroMessenger\/([\d.]+)/);
		(c.webkit = !!d) && (c.version = d[1]), e && (b.android = !0, b.version = e[2]), i && !h && (b.ios = b.iphone = !0, b.version = i[2].replace(/_/g, ".")), g && (b.ios = b.ipad = !0, b.version = g[2].replace(/_/g, ".")), h && (b.ios = b.ipod = !0, b.version = h[3] ? h[3].replace(/_/g, ".") : null), k && (b.wp = !0, b.version = k[1]), j && (b.webos = !0, b.version = j[2]), l && (b.touchpad = !0), o && (b.blackberry = !0, b.version = o[2]), p && (b.bb10 = !0, b.version = p[2]), q && (b.rimtabletos = !0, b.version = q[2]), r && (c.playbook = !0), m && (b.kindle = !0, b.version = m[1]), n && (c.silk = !0, c.version = n[1]), !n && b.android && a.match(/Kindle Fire/) && (c.silk = !0), s && (c.chrome = !0, c.version = s[1]), t && (c.firefox = !0, c.version = t[1]), u && (c.ie = !0, c.version = u[1]), v && (c.ie = !0, c.version = v[1]), x && (f || b.ios) && (c.safari = !0, f && (c.version = x[1])), w && (c.webview = !0), y && (c.qq = !0, c.version = y[1]), z && (c.weixin = !0, c.webviewversion = z[1]), b.tablet = !!(g || r || e && !a.match(/Mobile/) || t && a.match(/Tablet/) || u && !a.match(/Phone/) && a.match(/Touch/)), b.phone = !(b.tablet || b.ipod || !(e || i || j || o || p || s && a.match(/Android/) || s && a.match(/CriOS\/([\d.]+)/) || t && a.match(/Mobile/) || u && a.match(/Touch/)))
	}
	a.call($, navigator.userAgent), $.__detect = a
}(),
function() {
	function a(a) {
		return "tagName" in a ? a : a.parentNode
	}

	function b(a, b, c, d) {
		var e = Math.abs(a - b),
			f = Math.abs(c - d);
		return e >= f ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
	}

	function c() {
		i = null, j.last && (j.el.trigger("longTap"), j = {})
	}

	function d() {
		i && clearTimeout(i), i = null
	}

	function e() {
		f && clearTimeout(f), g && clearTimeout(g), h && clearTimeout(h), i && clearTimeout(i), f = g = h = i = null, j = {}
	}
	var f, g, h, i, j = {},
		k = 750;
	$(document).ready(function() {
		var l, m;
		$(document.body).bind("touchstart", function(b) {
			l = Date.now(), m = l - (j.last || l), j.el = $(a(b.touches[0].target)), f && clearTimeout(f), j.x1 = b.touches[0].pageX, j.y1 = b.touches[0].pageY, m > 0 && 250 >= m && (j.isDoubleTap = !0), j.last = l, i = setTimeout(c, k)
		}).bind("touchmove", function(a) {
			d(), j.x2 = a.touches[0].pageX, j.y2 = a.touches[0].pageY, Math.abs(j.x1 - j.x2) > 10 && a.preventDefault()
		}).bind("touchend", function() {
			d(), j.x2 && Math.abs(j.x1 - j.x2) > 30 || j.y2 && Math.abs(j.y1 - j.y2) > 30 ? h = setTimeout(function() {
				j.el.trigger("swipe"), j.el.trigger("swipe" + b(j.x1, j.x2, j.y1, j.y2)), j = {}
			}, 0) : "last" in j && (g = setTimeout(function() {
				var a = $.Event("tap");
				a.cancelTouch = e, j.el.trigger(a), j.isDoubleTap ? (j.el.trigger("doubleTap"), j = {}) : f = setTimeout(function() {
					f = null, j.el.trigger("singleTap"), j = {}
				}, 250)
			}, 0))
		}).bind("touchcancel", e), $(window).bind("scroll", e)
	}), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(a) {
		$.fn[a] = function(b) {
			return this.bind(a, b)
		}
	})
}(),
function() {
	var a = function(a) {
			var b = "";
			for (var c in a) b += c + "=" + a[c] + "&";
			return b = b.substr(0, b.length - 1)
		},
		b = function(b) {
			var c;
			try {
				c = new XMLHttpRequest
			} catch (d) {
				c = new ActiveXObject("Microsoft.XMLHTTP")
			}
			if (c.onreadystatechange = function() {
					4 == c.readyState && (200 == c.status ? "function" == typeof b.success && b.success(c.responseText) : "function" == typeof b.error && b.error(c.responseText), "function" == typeof b.complete && b.complete())
				}, "post" == b.type) {
				c.open("post", b.url, !0), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				var e = a(b.data);
				c.send(e)
			} else c.open("get", b.url, !0), c.send(null)
		};
	window.ajax = b
}(),
function(a) {
	var b = {},
		c = function(a) {
			return new Function("obj", "var p=[];with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "typeof($1)==='undefined'?'':$1\r").replace(/\t=(.*?)%>/g, "',(typeof($1)==='undefined'?'':$1),'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
		},
		d = function(d, e) {
			var f, g, h;
			d instanceof a ? f = d : "string" == typeof d && (f = a(d)), g = f.html();
			c(g);
			return h = /\W/.test(d) ? c(g) : b[d] = b[d] || c(g), e ? h(e) : h
		};
	a.tmpl = d
}(Zepto),
function() {
	var a = function(a, b) {
		var c = {
				BossId: 2620,
				CheckSum: 1780452978,
				sIp: "",
				iQQ: b || 0,
				sBiz: "tv-feedback",
				sOp: a,
				iSta: 0,
				iFlow: 0,
				sUrl: encodeURIComponent(window.location.href),
				sRef: "",
				sPageId: "",
				sPos: ""
			},
			d = "";
		for (var e in c) d += e + "=" + c[e] + "&";
		d += "_dc=" + Math.random(), window.bossimg = new Image(1, 1), window.bossimg.src = "http://btrace.qq.com/kvcollect?" + d
	};
	window.bossReport = a
}();
var log = function(a) {
	$("body").append(JSON.stringify(a))
};
! function(a) {
	var b = {
			limit: 200,
			tpl: {
				unlimited: "还可以输入{num}字",
				limited: '<span class="error">超出了{num}字</span>',
				fd_success: ['<div class="fd-success">', '<h3 class="title">反馈成功</h3>', '<p class="gray">我们将尽快查看并回复您的问题</p>', "<p>请注意查收短信 <br/> 和来自客服人员的QQ好友申请</p>", '<p class="gray">感谢您对我们产品的支持!</p>', "</div>"].join(" ")
			},
			words: {
				uploadingSglPicTips: "正在上传...",
				uploadingMulPicTips: "正在上传: {ct}"
			},
			maxPicCount: 3
		},
		c = function(a) {
			return document.getElementById(a)
		},
		d = function() {
			var a = c("fd-alert"),
				b = c("alert-text"),
				d = c("alert-ok"),
				e = function(c, e) {
					b.innerHTML = c, a.style.display = "block", $.isFunction(e) && (d.onclick = function() {
						a.style.display = "none", e()
					})
				},
				f = function() {
					d.onclick = function() {
						a.style.display = "none"
					}
				};
			return f(), {
				alert: e
			}
		}(),
		e = function(a, b) {
			a = a ? a : "KT";
			var c;
			return c = "page" == b ? "pageaccess-" + a.toLowerCase() : "btnsubmit-" + a.toLowerCase()
		},
		f = function(b) {
			var c = $(a).height(),
				d = $(a).width();
			$("#pic-preview .pic").html('<img src="' + b + '" style="max-width:' + (c - 80) + "px;max-height:" + (d - 40) + 'px;" />');
			var e = $.dialog($("#pic-preview").html(), {
				usePanel: "tips",
				modalClose: !0
			});
			$(".btnPicDel", e.dialogbox).on("click", function() {
				return $.confirm("确定删除?", function() {
					$("#pic-panel .photo_list .item[data-pic='" + b + "']").remove(), g(), e.close()
				}, function() {}), !1
			}), $(".pic-panel", e.dialogbox).on("click", function() {
				return e.close(), !1
			})
		},
		g = function() {
			$("#pic-panel .photo_list .item").length > b.maxPicCount ? $("#pic-panel .item-add").hide() : $("#pic-panel .item-add").show()
		},
		h = function() {
			var a = function(a) {
					var c = $("#pic-panel .item-add");
					c.hasClass("disabled") || (c.addClass("disabled"), wx.chooseImage({
						count: b.maxPicCount,
						sizeType: ["compressed"],
						fail: function() {
							d.alert(b.words.wxChooseImageError)
						},
						success: function(c) {
							var e = c.localIds,
								f = $("#pic-panel .photo_list .item").length - 1;
							return f + e.length > b.maxPicCount ? (d.alert("最多上传3张图片~"), void 0) : (a(e), void 0)
						},
						complete: function() {
							c.removeClass("disabled")
						},
						cancel: function() {}
					}))
				},
				c = function(a) {
					var c, e = 0,
						f = 0,
						h = 0,
						i = 0,
						j = [],
						k = function(a) {
							var b = a.length;
							if (b > 0) {
								var c = $("#pic-panel .photo_list"),
									d = $.tmpl("#tmpl-pic-lt", {
										pics: a
									});
								c.prepend(d)
							}
							g()
						},
						l = function() {
							f + i == a.length && (c.close(), h + i == 0 || h + i == a.length, k(j))
						},
						m = function(a) {
							return a ? ($.ajax({
								url: "notice_dl_pic",
								data: {
									media_id: a
								},
								type: "GET",
								dataType: "json",
								success: function(a) {
									0 == a.result.ret ? j.push(a.data.url) : (d.alert(a.result.msg), h++)
								},
								error: function() {
									h++
								},
								complete: function() {
									f++, l()
								}
							}), void 0) : (h++, f++, l(), void 0)
						},
						n = function() {
							if (e < a.length) {
								var f = a[e];
								if (e++, c) $(".layer_txt", c.dialogbox).text(b.words.uploadingMulPicTips.replace("{ct}", e + "/" + a.length));
								else {
									var g;
									g = 1 == a.length ? b.words.uploadingSglPicTips : b.words.uploadingMulPicTips.replace("{ct}", e + "/" + a.length), c = $.tips("loading", g)
								}
								var h = "";
								wx.uploadImage({
									localId: f,
									isShowProgressTips: 0,
									success: function(a) {
										m(a.serverId)
									},
									fail: function(a) {
										d.alert(a.errMsg), i++, l(), h = a.errMsg
									},
									complete: function() {
										setTimeout(function() {
											n()
										}, 500)
									}
								})
							}
						};
					n()
				};
			wx.ready(function() {
				a(function(a) {
					c(a)
				})
			})
		},
		i = function() {
			var a = !1;
			return $.os.ios && $.browser.weixin && $.browser.webviewversion >= "6.0.2" && (a = !0), $.os.android && $.browser.weixin && $.browser.webviewversion > "6.2" && (a = !0), a
		};
	$.dialog = function(b, c) {
		var d = {
			dialog: ['<div class="dialog">', '<div class="bd">', "</div>", '<div class="ft">', "</div>", "</div>"].join(""),
			modal: '<div class="dialog-modal"></div>'
		};
		c = $.extend(!0, {
			usePanel: !0,
			buttons: !1,
			modal: !0,
			autoClose: !1,
			width: "auto",
			height: "auto",
			top: "",
			onClose: null,
			modalClose: !1
		}, c);
		var e = $(d.dialog),
			f = $(d.modal),
			g = function() {
				var a = j();
				c.modal && f.css("zIndex", a).appendTo("body"), c.modalClose && f.click(function() {
					h()
				}), c.usePanel !== !0 && e.addClass(c.usePanel), e.css({
					visibility: "hidden",
					width: c.width,
					height: c.height,
					zIndex: a + 1
				});
				var d = $(".bd", e);
				if (d.html(b), c.buttons) {
					var g = $(".ft", e);
					$.each(c.buttons, function(a, b) {
						var c = $('<a class="dialog-btn" href="javascript:;">' + a + "</a>");
						c.bind("click", function() {
							h.call(c, b)
						}), c.prependTo(g)
					})
				} else $(".ft", e).remove();
				e.appendTo("body"), i(), c.autoClose && setTimeout(h, c.autoClose)
			},
			h = function() {
				return c.onClose && "function" == typeof c.onClose && c.onClose.call(this, arguments[0]) === !1 ? void 0 : (f.remove(), e.remove(), !1)
			},
			i = function() {
				var a = e.width(),
					b = e.height();
				c.top ? e.css({
					top: c.top
				}) : e.css({
					"margin-top": -b / 2
				}), e.css({
					"margin-left": -a / 2,
					visibility: "visible"
				})
			},
			j = function() {
				return a.dialog_zindex || (a.dialog_zindex = 999), a.dialog_zindex++, a.dialog_zindex
			};
		return g(), {
			close: h,
			dialogbox: e
		}
	}, $.confirm = function(a, b, c) {
		var d = {
			modal: !0,
			width: 270,
			buttons: {
				"确定": "ok",
				"取消": "cancel"
			},
			onClose: function(a) {
				"ok" == a ? $.isFunction(b) && b() : "cancel" == a && $.isFunction(c) && c()
			}
		};
		$.dialog(a, d)
	}, $.tips = function(a, b, c) {
		var d, e, f, g = {
			error: '<div class="tipsbox"><div class="tipsbox-error"></div><div class="text">{msg}</div></div>',
			success: '<div class="tipsbox"><div class="tipsbox-success"></div><div class="text">{msg}</div></div>',
			loading: '<div class="layer_loading"><div class="layer_bg"></div><div class="layer_con"><div class="spinner"><div class="b1"></div><div class="b2"></div><div class="b3"></div><div class="b4"></div><div class="b5"></div><div class="b6"></div><div class="b7"></div><div class="b8"></div><div class="b9"></div><div class="b10"></div><div class="b11"></div><div class="b12"></div></div><p class="layer_txt">{msg}</p></div></div>'
		};
		d = g[a], d = d.replace("{msg}", b), "loading" == a ? (e = !1, f = !0) : (e = 2e3, f = !1), c = $.extend({
			modal: f,
			autoClose: e,
			usePanel: "tips"
		}, c);
		var h = $.dialog(d, c);
		return $.tips.close && $.tips.close(), $.tips.close = h.close, h
	};
	var j = function() {
			wx.config({
				debug: !1,
				appId: b.appId,
				timestamp: b.timestamp,
				nonceStr: b.nonceStr,
				signature: b.signature,
				jsApiList: ["checkJsApi", "chooseImage", "previewImage", "uploadImage"]
			}), wx.error(function() {
				$("#pic-panel").hide()
			})
		},
		k = function(g) {
			$.extend(b, g), i() && ($("#pic-panel").show(), j()), b.pt = c("pt").value, b.openid = c("openid").value;
			var k = function() {
				var a, d = this,
					e = d.value;
				a = e.length > b.limit ? b.tpl.limited.replace("{num}", e.length - b.limit) : b.tpl.unlimited.replace("{num}", b.limit - e.length), c("limit-tips").innerHTML = a
			};
			c("text").onkeyup = k, c("text").onpaste = function() {
				var a = this;
				setTimeout(function() {
					k.call(a)
				}, 1)
			};
			var l = function() {
				var a, d, e = c("text").value,
					f = (c("contact").value, !0);
				return 0 == e.length ? (a = "请填写问题或建议~", d = "text", f = !1) : e.length > b.limit && (d = "text", a = "超过200字了呢~", f = !1), {
					ret: f,
					msg: a,
					id: d
				}
			};
			c("contact").onkeydown = function(b) {
				var d = b || a.event;
				return d && 13 == d.keyCode ? (c("btnSubmit").click(), !1) : void 0
			}, $("#btnSubmit").on("click", function() {
				var a, f = this;
				if (f.getAttribute("data-disabled")) return !1;
				if (f.setAttribute("data-disabled", "1"), bossReport(e(b.pt, "submit"), b.openid), a = l(), !a.ret) return d.alert(a.msg, function() {
					$("#" + a.id).focus()
				}), f.setAttribute("data-disabled", ""), !1;
				f.innerHTML = "提交中...";
				var g = document.forms[0],
					h = g.action,
					i = c("text").value,
					j = c("contact").value,
					k = c("telphone").value,
					m = c("guid").value,
					n = c("sys_version").value,
					o = b.pt,
					p = c("pr").value,
					q = c("version").value,
					r = c("android_hash").value,
					s = c("accesstoken").value,
					t = c("appid").value,
					w = c("channel").value,
					x = c("from").value;
				var y = [];
				$("#pic-panel .photo_list .item").each(function() {
					var a = $(this),
						b = a.attr("data-pic");
					b && y.push(b)
				}), y = y.join(",");
				var z = function() {
						c("text").value = "", c("contact").value = "", c("telphone").value = "", c("limit-tips").innerHTML = b.tpl.unlimited.replace("{num}", b.limit), d.alert(b.tpl.fd_success)
					},
					A = function() {
						$.tips("error", "提交失败")
					};
				return $.ajax({
					url: h,
					data: {
						content: i,
						qq: j,
						phone: k,
						guid: m,
						sys_version: n,
						pt: o,
						pr: p,
						version: q,
						android_hash: r,
						openid: b.openid,
						accesstoken: s,
						appid: t,
						channel: w,
						pics: y,
						from: x
					},
					type: "post",
					dataType: 'json',//json
					success: function(a) {
						0 == a.result.ret ? z() : A()
					},
					error: function() {
						A()
					},
					complete: function() {
						f.innerHTML = "提交", f.setAttribute("data-disabled", "")
					}
				}), !1
			}), $("#pic-panel .item-add").on("ontouchmove" in a ? "tap" : "click", function() {
				h()
			}), $("#pic-panel .photo_list").on("click", ".pic", function() {
				var a = $(this).parent().attr("data-pic");
				return f(a), !1
			}), bossReport(e(b.pt, "page"), b.openid)
		};
	a.initFB = k
}(this, document);