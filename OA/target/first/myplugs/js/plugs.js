$.fn
	.extend({
		// 全选
		chkAll: function(options) {
			var defaults = {
				chkName: "chks"
			};
			var opt = $.extend(defaults, options);
			// 全选的复选框
			var obj = $(this);
			var chks = $("input[name='" + opt.chkName + "']");
			obj.click(function() {
				chks.prop("checked", obj.is(":checked"));
			});
			chks.click(function() {
				obj.prop("checked", chks.length == chks
					.filter(":checked").length);
			});
		},
		//ajax分页插件
		pageAjax: function(options) {
			var defaults = {
				//当前第几页 
				pageIndex: 1,
				//总页数
				pageCount: 0,
				//点击按钮要调用的事件
				methodName: "loadData",
				//分页的皮肤
				skin: "#6FB3E0"
			};
			var opt = $.extend(defaults, options);
			var html = "<ul class='pages am-pagination'>";
			if(parseInt(opt.pageIndex) != 1) {
				html += "<li  id='prev'   style='color:" +
					opt.skin +
					"'><a href='javascript:void(0)' style='font-weight:bold;'><i class='icon-double-angle-left'></i>«</a></li>";
			} else {
				html += "<li onclick='javascript:void(0)' style='color:" +
					opt.skin +
					"'  disabled='disabled' id='prev'><a href='javascript:void(0)'><i class='icon-double-angle-left'></i>«</a></li>";
			}
			var dotLi_head = "";
			var dotLi_end = "";
			// 省略号后多少页开始
			var startNum;
			if(opt.pageIndex < 5)
				startNum = 1;
			else if(opt.pageIndex >= opt.pageCount - 3)
				startNum = opt.pageCount - 4;
			else
				startNum = opt.pageIndex - 2;
			if(startNum > 2)

				dotLi_head = "<li class='cpage' style='color:" + opt.skin +
				"' ><a href='javascript:void(0)'>1</a></li><li>&nbsp;...&nbsp;&nbsp;</li>";
			if(startNum + 5 < opt.pageCount)
				dotLi_end = "<li>&nbsp;...&nbsp;&nbsp;</li><li  class='cpage' style='color:" +
				opt.skin + "'  ><a href='javascript:void(0)'>" + opt.pageCount +
				"</a></li>";
			html += dotLi_head;
			var max = opt.pageCount > 5 ? 5 : opt.pageCount;
			for(var i = 0; i < max; i++) {
				if(startNum + i == opt.pageIndex)
					html += "<li  class='cpage  am-active' ><a href='javascript:void(0)'>" +
					opt.pageIndex + "</a></li>";
				else
					html += "<li class='cpage'   style='color:" + opt.skin +
					"'   ><a href='javascript:void(0)'>" + (startNum + i) + "</a></li>";
			}
			html += dotLi_end;
			if(opt.pageIndex == opt.pageCount) {
				html += "<li  onclick='javascript:void(0)'    style='color:" +
					opt.skin +
					"' id='next'><a href='javascript:void(0)'><i class='icon-double-angle-right'></i>»</a></li>";
			} else {
				+opt.skin +
					"'  id='next'><a href='javascript:void(0)'><i class='icon-double-angle-right'></i>»</a></li>";
			}
			html += "</ul>";
			$(this).html(html);
			$(".cpage").bind("click", function() {
				var pageindex = parseInt($(this).text());
				loadData(pageindex);
			});
			$("#prev").bind("click", function() {
				if(opt.pageIndex == 1) {
					$.jq_Alert({
						message: "已是第一页",
					});
					return;
				}
				loadData(parseInt(opt.pageIndex) - 1);
			});
			$("#next").bind("click", function() {
				$("input[name='page']").val(parseInt(opt.pageIndex) + 1);
				if(opt.pageIndex == opt.pageCount) {
					$.jq_Alert({
						message: "已是最后一页"
					});
					return;
				}
				loadData(parseInt(opt.pageIndex) + 1);
			});
		},
		//基于表单提交的分页
		pageForm: function(options) {
			var defaults = {
				pageIndex: 1,
				pageCount: 0,
				actionName: "",
				skin: "#6FB3E0"
			};
			var opt = $.extend(defaults, options);
			var html = "<form action=" +
				opt.actionName +
				"  id='frmPage'  method='post'><ul class='pages am-pagination'>";
			if(parseInt(opt.pageIndex) != 1) {
				html += "<li  id='prev'  style='color:" +
					opt.skin +
					"'><a href='javascript:void(0)'><i class='icon-double-angle-left'></i></a></li>";
			} else {
				html += "<li onclick='javascript:void(0)' style='color:" +
					opt.skin +
					"'  disabled='disabled' id='prev'><a href='javascript:void(0)'><i class='icon-double-angle-left'></i></a></li>";
			}
			var dotLi_head = "";
			var dotLi_end = "";
			// 省略号后多少页开始
			var startNum;
			if(opt.pageIndex < 5)
				startNum = 1;
			else if(opt.pageIndex >= opt.pageCount - 3)
				startNum = opt.pageCount - 4;
			else
				startNum = opt.pageIndex - 2;
			if(startNum > 2)

				dotLi_head = "<li class='cpage' style='color:" + opt.skin +
				"' ><a href='javascript:void(0)'>1</a></li><li>...</li>";
			if(startNum + 5 < opt.pageCount)
				dotLi_end = "<li>...</li><li  class='cpage' style='color:" +
				opt.skin + "'><a href='javascript:void(0)'>" + opt.pageCount + "</a></li>";
			html += dotLi_head;
			var max = opt.pageCount > 5 ? 5 : opt.pageCount;
			for(var i = 0; i < max; i++) {
				if(startNum + i == opt.pageIndex)
					html += "<li  class='cpage  am-active'  ><a href='javascript:void(0)'>" +
					opt.pageIndex + "</a></li>";
				else
					html += "<li class='cpage'   style='color:" + opt.skin +
					"'><a href='javascript:void(0)'>" + (startNum + i) + "</a></li>";
			}
			html += dotLi_end;
			if(opt.pageIndex == opt.pageCount) {
				html += "<li  onclick='javascript:void(0)'    style='color:" +
					opt.skin +
					"' id='next'><a href='javascript:void(0)'><i class='icon-double-angle-right'></i></a></li>";
			} else {
				html += "<li   style='color:" +
					opt.skin +
					"'  id='next'><a href='javascript:void(0)'><i class='icon-double-angle-right'></i></a></li>";
			}
			html += "</ul><input type='hidden'  name='page'  value=" +
				opt.pageIndex + "/>  </form>";

			$(this).html(html);
			$(".cpage").bind("click", function() {
				$("input[name='page']").val(parseInt($(this).text()));
				$("#frmPage").submit();
			});
			$("#prev").bind("click", function() {
				$("input[name='page']").val(parseInt(opt.pageIndex) - 1);

				if(opt.pageIndex == 1) {
					$.jq_Alert({
						message: "已是第一页",
					});
					return;
				}
				$("#frmPage").submit();
			});
			$("#next").bind("click", function() {
				$("input[name='page']").val(parseInt(opt.pageIndex) + 1);
				if(opt.pageIndex == opt.pageCount) {
					$.jq_Alert({
						message: "已是最后一页"
					});
					return;
				}
				$("#frmPage").submit();
			});
		},
		// 开关或checkbox插件
		icheck: function(options) {
			var defaults = {
				// 开关开着的文字
				onText: "ON",
				closeText: "OFF",
				// 大小
				size: 100
			};
			var opt = $.extend(defaults, options);
			var width = opt.size;
			var height = 0.41 * parseInt(opt.size);
			// 真正的 checkbox隐藏
			$(this).hide();
			// 真正的checkbox
			var obj = $(this);
			var str = "<div class='icheck icheckOnColor'  style='width:" +
				width +
				"px;height:" +
				height +
				"px;line-height:" +
				height +
				"px'><div  class='icheckOn' style='width:" +
				(0.5 * width) +
				"px;height:" +
				height +
				"px;'>" +
				opt.onText +
				"</div><div class='icheckbtn'  style='width:" +
				height +
				"px;height:" +
				(height - 2) +
				"px'></div></div>";
			// after在一个jq元素后面加元素
			$(this).after(str);
			// 判断真正的复选框是否选中
			if(obj.prop("checked")) {
				// 开关要切到开的状态（next:"一个jq元素的下一个元素,removeClass:给一个jq元素删除一个Class,addClass:给一个jq元素增加一个class"）
				obj.next(".icheck").removeClass("icheckCloseColor")
					.addClass("icheckOnColor")
					.children(".icheckOn").css("left", 0).text(
						opt.onText);
				obj.next(".icheck").children(".icheckbtn").css("left",
					parseInt(opt.size) * 0.48);

			} else {
				// 开关要切到关的状态（next:"一个jq元素的下一个元素,removeClass:给一个jq元素删除一个Class,addClass:给一个jq元素增加一个class"）
				obj.next(".icheck").removeClass("icheckOnColor")
					.addClass("icheckCloseColor").children(
						".icheckOn").css("left",
						parseInt(opt.size) * 0.48).text(
						opt.closeText);
				obj.next(".icheck").children(".icheckbtn").css("left",
					0);

			}
			// 点击开关
			$(".icheck").click(function() {
				// 判断开关是否开着
				if($(this).hasClass("icheckOnColor")) {

					obj.attr("checked", false);
					$(this).removeClass("icheckOnColor").addClass(
							"icheckCloseColor").children(
							".icheckOn").text(opt.closeText)
						.animate({
							"left": parseInt(opt.size) * 0.48
						}, 500);
					$(this).children(".icheckbtn").animate({
						"left": 0
					}, 500);
				} else {
					obj.attr("checked", "checked");
					$(this).removeClass("icheckCloseColor")
						.addClass("icheckOnColor").children(
							".icheckOn").text(opt.onText)
						.animate({
							"left": 0
						}, 500);
					$(this).children(".icheckbtn").animate({
						"left": parseInt(opt.size) * 0.58
					}, 500);
				}
			});
		}
	});

$
	.extend({
		notifationTime: undefined,
		longpresstm: undefined,
		pageRecordEventArg: undefined,
		pageObject: undefined,

		/* 获取顶层页面 */
		win: function() {
			var w = window;
			while(true) {
				if(w.top == w.self)
					break;
				else
					w = w.top;
			}
			return w;
		},
		/* 遮罩阴影层 */
		jq_MaskDiv: function(e) {
			var str = "<div aria-hidden='false' class='theme-popover-mask " +
				e.cn +
				"' style=\"z-index:2;height:" +
				$($.win()).height() +
				"px;position:fixed;left:0;top:0;left:0;right:0;background:#000;opacity:0.1;filter:alpha(opacity=10);-moz-opacity:0.1;display:none;\"></div>";
			$("body").append(str);
			$('.theme-popover-mask').show();
		},
		jq_MaskDiv_close: function(e) {
			$('.' + e.cn).hide();
			$('.' + e.cn).remove();
		},
		/* 确定取消对话框 */
		jq_Confirm: function(e) {
			if(!e)
				return;
			e.btnOktext = !e.btnOktext ? "确定" : e.btnOktext;
			e.btnCanceltext = !e.btnCanceltext ? "取消" : e.btnCanceltext;
			e.dialogModal = e.dialogModal == undefined ? true :
				e.dialogModal;
			if(!e.message) {
				e.message = "请输入对应的提示信息";
			}
			// set it's modal
			if(e.dialogModal) {
				$.jq_MaskDiv({
					cn: "confirmMask"
				});
			}
			var str = "<div class='jq_dvconfirm' style='z-index:1000000000;box-shadow: 0px 0px 5px #BCD4E5;border: 1px solid #BCD4E5 !important;position:absolute;background-Color:#fff;min-width:578px;width:578px;min-height:144px;border: 1px solid rgba(0, 0, 0, 0.2);font-size: 13px;opacity:0;filter:alpha(opacity=0);-moz-opacity:0;'>" +
				"<div style='min-height:54px;line-height:54px;padding:20px;'>" +
				"<button title='关闭' class='btncloseconfirm' style='outline:0px;float:right;margin-top:-10px;font-size:18px;font-weight: bold;color: rgb(0, 0, 0);text-shadow: 0px 1px 0px rgb(255, 255, 255);border:0px;background-color:transparent;cursor:pointer;opacity:0.2;filter:alpha(opacity=20);-moz-opacity:0.2;'>×</button>" +
				"<div style='font-size:16px;color: rgb(57, 57, 57);'>" +
				e.message +
				"</div>" +
				"</div>" +
				"<div style='overflow:auto;padding:12px 14px;background-color: rgb(239, 243, 248);'>" +
				"<input class='confirmbtncancel am-btn am-btn-primary' type='button' value=' x " +
				e.btnCanceltext +
				"' style='float:right;margin:0px 10px;' />" +
				"<input class='confirmbtnok am-btn am-btn-primary' type='button' value=' ✓ " +
				e.btnOktext +
				"' style='float:right;' />" +
				"</div>" +
				"</div>";
			$("body").append(str);
			$(".btncloseconfirm").hover(function() {
				$(this).css("opacity", 1);
			}, function() {
				$(this).css("opacity", 0.2);
			});

			$('.jq_dvconfirm').css(
				"left",
				($("body").width() - $('.jq_dvconfirm').width()) / 2 +
				"px");
			$('.jq_dvconfirm').css("top", 0 - $('.jq_dvconfirm').height());
			$('.jq_dvconfirm').stop().animate({
				"top": 200 + $($.win()).scrollTop(),
				"opacity": 1
			}, 350);

			$('.confirmbtnok').bind("click", function() {
				if(e.btnOkClick)
					e.btnOkClick();
				$.jq_Confirm_close();
			});
			$('.confirmbtncancel').bind("click", function() {
				if(e.btnCancelClick)
					e.btnCancelClick();
				$.jq_Confirm_close();
			});
			$('.btncloseconfirm').bind("click", function() {
				$.jq_Confirm_close();
			});
		},
		/* 确定取消对话框关闭 */
		jq_Confirm_close: function() {
			$('.jq_dvconfirm').stop().animate({
				"top": 0 - $('.jq_dvconfirm').height(),
				"opacity": 0
			}, 150, function() {
				$.jq_MaskDiv_close({
					cn: "confirmMask"
				});
				$(".jq_dvconfirm").remove();
			});
		},
		/* 确定对话框 */
		jq_Alert: function(e) {
			if(!e)
				return;
			e.btnOktext = !e.btnOktext ? "确定" : e.btnOktext;
			e.dialogModal = e.dialogModal == undefined ? true :
				e.dialogModal;

			if(!e.message) {
				e.message = "请输入对应的提示信息";
			}

			// set it's modal
			if(e.dialogModal) {
				$.jq_MaskDiv({
					cn: "okMask"
				});
			}
			var str = "<div class='jq_dvalert' style='z-index:100000000000;box-shadow: 0px 0px 5px #BCD4E5;border: 1px solid #BCD4E5 !important;position:absolute;background-Color:#fff;min-width:578px;width:578px;min-height:144px;border: 1px solid rgba(0, 0, 0, 0.2);font-size: 13px;opacity:0;filter:alpha(opacity=0);-moz-opacity:0;'>" +
				"<div style='min-height:54px;line-height:54px;padding:20px;'>" +
				"<button title='关闭' class='btnclosealert' style='outline:0px;float:right;margin-top:-10px;font-size:18px;font-weight: bold;color: rgb(0, 0, 0);text-shadow: 0px 1px 0px rgb(255, 255, 255);border:0px;background-color:transparent;cursor:pointer;opacity:0.2;filter:alpha(opacity=20);-moz-opacity:0.2;'>×</button>" +
				"<div style='font-size:16px;color: rgb(57, 57, 57);'>" +
				e.message +
				"</div>" +
				"</div>" +
				"<div style='overflow:auto;padding:12px 14px;background-color:rgb(239, 243, 248);'>" +
				"<input class='alertbtnok am-btn  am-btn-primary btn btn-primary' type='button' value=' ✓ " +
				e.btnOktext +
				"' style='float:right;' />" +
				"</div>" +
				"</div>";
			$("body").append(str);
			$(".btnclosealert").hover(function() {
				$(this).css("opacity", 1);
			}, function() {
				$(this).css("opacity", 0.2);
			});
			$('.jq_dvalert').css(
				"left",
				($("body").width() - $('.jq_dvalert').width()) / 2 +
				"px");
			$('.jq_dvalert').css("top", 0 - $('.jq_dvalert').height());
			$('.jq_dvalert').stop().animate({
				"top": 200 + $("body").scrollTop(),
				"opacity": 1
			}, 350);
			$('.alertbtnok').bind("click", function() {
				$.jq_Alert_close();
				if(e.btnOkClick) {
					e.btnOkClick();
				}
			});
			$('.btnclosealert').bind("click", function() {
				$.jq_Alert_close();
			});
		},
		/* 确定对话框关闭 */
		jq_Alert_close: function() {
			$('.jq_dvalert').stop().animate({
				"top": 0 - $('.jq_dvalert').height(),
				"opacity": 0
			}, 150, function() {
				$.jq_MaskDiv_close({
					cn: "okMask"
				});
				$(".jq_dvalert").remove();
			});
		},
		/* 加载对话框 */
		jq_Loading: function() {
			// set it's modal
			$.jq_MaskDiv({
				cn: "loadMask"
			});
			var str = "<div class='jq_dvloading' style='z-index:2;box-shadow: 0px 0px 5px #BCD4E5;border: 1px solid #BCD4E5 !important;position:absolute;background-Color:#fff;min-width:578px;width:578px;border: 1px solid rgba(0, 0, 0, 0.2);font-size: 13px;opacity:0;filter:alpha(opacity=0);-moz-opacity:0;'>" +
				"<div style='height:100px;padding:30px 30px;'>" +
				"<div style='font-weight:bold;height:100px;line-height:100px;text-indent:160px;font-size:16px;color: rgb(57, 57, 57);background-Image:url(css/images/loading.gif);background-repeat:no-repeat;background-position:40px 0px;'>正在加载，请稍后……</div>" +
				"</div>" + "</div>";
			$("body").append(str);

			$('.jq_dvloading').css(
				"left",
				($($.win()).width() - $('.jq_dvloading').width()) / 2 +
				"px");
			$('.jq_dvloading').css("top", 0 - $('.jq_dvloading').height());
			$('.jq_dvloading').stop().animate({
				"top": 200 + $($.win()).scrollTop(),
				"opacity": 1
			}, 350);
		},
		/* 加载对话框 关闭 */
		jq_Loading_close: function() {
			$('.jq_dvloading').stop().animate({
				"top": 0 - $('.jq_dvloading').height(),
				"opacity": 0
			}, 150, function() {
				$.jq_MaskDiv_close({
					cn: "loadMask"
				});
				$(".jq_dvloading").remove();
			});
		},
		/* 消息提示 对话框 */
		jq_Notifation: function(e) {
			if(!e)
				return;
			e.message = !e.message ? "请填写消息内容" : e.message;
			var str = "<div class='jq_dvnotifation' style='z-index:2;box-shadow: 0px 0px 5px #BCD4E5;border: 1px solid #BCD4E5 !important;position:absolute;right:5px;bottom:3px;background-Color:#fff;min-width:328px;width:328px;border: 1px solid rgba(0, 0, 0, 0.2);font-size: 13px;opacity:0;filter:alpha(opacity=0);-moz-opacity:0;'>" +
				"<div class='jq_dvnotifation_title' style='background-color:#ECF2F7 !important;border-bottom: 1px solid #BCD4E5 !important;font-weight:600;padding:10px 10px;'>" +
				"提示消息" +
				"<button title='关闭' class='btnclosenotifation' style='outline:0px;float:right;margin-top:-5px;font-size:18px;font-weight: bold;color: rgb(0, 0, 0);text-shadow: 0px 1px 0px rgb(255, 255, 255);border:0px;background-color:transparent;cursor:pointer;opacity:0.2;filter:alpha(opacity=20);-moz-opacity:0.2;'>×</button>" +
				"</div>" +
				"<div class='jq_dvnotifation_content' style='padding:20px 10px;min-height:100px;'>" +
				e.message + "</div>" + "</div>";

			$("body").append(str);
			$(".btnclosenotifation").hover(function() {
				$(this).css("opacity", 1);
			}, function() {
				$(this).css("opacity", 0.2);
			});

			$('.jq_dvnotifation').stop().animate({
				"opacity": 1
			}, 350);

			$('.btnclosenotifation').bind("click", function() {
				$.jq_Notifation_close();
			});
			var tm = window.setTimeout(function() {
				$.jq_Notifation_close();
			}, 4000);

			$('.jq_dvnotifation_title,.jq_dvnotifation_content').hover(
				function(event) {
					window.clearTimeout(tm);
					$('.jq_dvnotifation').css("opacity", 1);
				},
				function() {
					tm = window.setTimeout(function() {
						$.jq_Notifation_close();
					}, 4000);
				});
		},
		/* 消息提示 对话框 关闭 */
		jq_Notifation_close: function() {
			$('.jq_dvnotifation').stop().animate({
				"opacity": 0
			}, 1050, function() {
				window.clearTimeout($.notifationTime);
				$('.jq_dvnotifation').remove();
			});
		},
		jq_Panel: function(e) {
			if(!e)
				return;
			e.dialogModal = e.dialogModal == undefined ? true :
				e.dialogModal;
			e.title = !e.title ? "提示" : e.title;
			if(e.dialogModal) {
				$.jq_MaskDiv({
					cn: "panel"
				});
			}
			var str = "<div class='jq_dvpanel'  style='z-index:2;box-shadow: 0px 0px 5px #BCD4E5;border: 1px solid #BCD4E5 !important;position:absolute;background-Color:#fff;width:" +
				(parseInt(e.iframeWidth) + 30) +
				"px; border: 1px solid rgba(0, 0, 0, 0.2);font-size: 13px;opacity:1;filter:alpha(opacity=100);-moz-opacity:1;'>" +
				"<div style='height:45px;line-height:45px;background-color:rgb(239, 243, 248);'>" +
				"<div style='font-size:15px;color: rgb(57, 57, 57);font-weight:600;text-indent:10px;float:left;'>" +
				e.title +
				"</div>" +
				"<button title='关闭' class='btnclosepanel' style='outline:0px;float:right;margin-top:6px;margin-right:5px;font-size:18px;font-weight: bold;color: rgb(0, 0, 0);text-shadow: 0px 1px 0px rgb(255, 255, 255);border:0px;background-color:transparent;cursor:pointer;opacity:0.2;filter:alpha(opacity=20);-moz-opacity:0.2;'>×</button>" +
				"</div>" +
				"<div style='padding:15px;'>" +
				"<iframe frameborder='0' style=' overflow-x:hidden; height:" + e.iframeHeight + "px;' scrolling='no' width='" +
				e.iframeWidth +
				"px'   src='" + e.url + "' />" + "</div>" + "</div>";
			$("body").append(str);
			$(".btnclosepanel").hover(function() {
				$(this).css("opacity", 1);
			}, function() {
				$(this).css("opacity", 0.2);
			});
			$('.jq_dvpanel').css(
				"left",
				($("body").width() - $('.jq_dvpanel').width()) / 2 +
				"px");
			$('.jq_dvpanel')
				.css("top", 0 - $('.jq_dvpanel').height() - 200);
			$('.jq_dvpanel').stop().animate({
				"top": 150 + $($.win()).scrollTop(),
				"opacity": 1
			}, 350);

			$('.btnclosepanel').bind("click", function() {
				$.jq_Panel_close();
			});

		},
		jq_Panel_close: function() {
			$('.jq_dvpanel').stop().animate({
				"opacity": 0
			}, 150, function() {
				$.jq_MaskDiv_close({
					cn: "panel"
				});
				$('.jq_dvpanel').remove();
			});
		},

	});