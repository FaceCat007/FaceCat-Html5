/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 图层
*/
function FCDiv() {
	this.m_scrollV = 0; //纵向滚动
	this.m_scrollH = 0; //横向滚动
	this.m_views = new Array(); //子视图
	this.m_showHScrollBar = false; //是否显示横向滚动条
	this.m_showVScrollBar = false; //是否显示横向滚动条
	this.m_scrollBarColor = "rgb(100,100,100)";
	this.m_allowDragScroll = true; //是否允许拖动滚动
	this.m_downScrollHButton = false; //是否按下横向滚动条
	this.m_downScrollVButton = false; ////是否按下纵向滚动条
	this.m_startScrollH = 0; //开始滚动的值
	this.m_startScrollV = 0; //结束滚动的值
	this.m_startPoint = new FCPoint(); //起始点
	this.m_mouseDownTime = 0; //鼠标按下的时间
	this.m_displayOffset = true; //是否显示偏移量
	this.m_type = "div"; //类型
	this.m_scrollSize = 10; //滚动条大小
	this.m_visible = true; //是否可见
};

FCDiv.prototype = FCView;

/*
* 绘制滚动条
* div:图层
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawDivScrollBar = function (div, paint, clipRect) {
     if(m_isMobile){
        if(m_mouseDownView == div){
        }else if(m_dragScrollView_Div == div && m_scrollAddSpeed_Div != 0){
        }else{
            return;
        }
    }
	//绘制滚动条
	if (div.m_showHScrollBar) {
		var contentWidth = getDivContentWidth(div);
		if (contentWidth > div.m_size.cx) {
			var sLeft = div.m_scrollH / contentWidth * div.m_size.cx;
			var sRight = (div.m_scrollH + div.m_size.cx) / contentWidth * div.m_size.cx;
			if (sRight - sLeft < div.m_scrollSize) {
				sRight = sLeft + div.m_scrollSize;
			}
			paint.fillRect(div.m_scrollBarColor, sLeft, div.m_size.cy - div.m_scrollSize, sRight, div.m_size.cy);
		}
	}
	if(div.m_showVScrollBar){
	    var contentHeight = getDivContentHeight(div);		
		if (contentHeight > div.m_size.cy) {
			var sTop = div.m_scrollV / contentHeight * div.m_size.cy;
			var sBottom = sTop + (div.m_size.cy / contentHeight * div.m_size.cy);
			if (sBottom - sTop < div.m_scrollSize) {
				sBottom = sTop + div.m_scrollSize;
			}
			paint.fillRect(div.m_scrollBarColor, div.m_size.cx - div.m_scrollSize, sTop, div.m_size.cx, sBottom);
		}
	}
};

/*
* 获取内容的宽度
* div:图层
*/
var getDivContentWidth = function (div) {
	var cWidth = 0;
	if(div.m_views){
	    for (var i = 0; i < div.m_views.length; i++) {
		    if (div.m_views[i].m_visible) {
			    if(cWidth < div.m_views[i].m_location.x + div.m_views[i].m_size.cx){
			        cWidth = div.m_views[i].m_location.x + div.m_views[i].m_size.cx;
			    }
		    }
	    }
	}
	return cWidth;
};

/*
* 获取内容的高度
* div:图层
*/
var getDivContentHeight = function (div) {
    var cHeight = 0;
	if(div.m_views){
	    for (var i = 0; i < div.m_views.length; i++) {
		    if (div.m_views[i].m_visible) {
			    if(cHeight < div.m_views[i].m_location.y + div.m_views[i].m_size.cy){
			        cHeight = div.m_views[i].m_location.y + div.m_views[i].m_size.cy;
			    }
		    }
	    }
	}
	return cHeight;
};

/*
* 图层的鼠标移动方法
* div: 图层
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseMoveDiv = function (div, firstTouch, secondTouch, firstPoint, secondPoint) {
	if (firstTouch) {
		var mp = firstPoint;
		if (div.m_showHScrollBar || div.m_showVScrollBar) {
			if (div.m_downScrollHButton) {
				var contentWidth = getDivContentWidth(div);
				var subX = (mp.x - div.m_startPoint.x) / div.m_size.cx * contentWidth;
				var newScrollH = div.m_startScrollH + subX;
				if (newScrollH < 0) {
					newScrollH = 0;
				} else if (newScrollH > contentWidth - div.m_size.cx) {
					newScrollH = contentWidth - div.m_size.cx;
				}
				div.m_scrollH = newScrollH;
				m_cancelClick = true;
				return;

			} else if (div.m_downScrollVButton) {
				var contentHeight = getDivContentHeight(div);
				var subY = (mp.y - div.m_startPoint.y) / div.m_size.cy * contentHeight;
				var newScrollV = div.m_startScrollV + subY;
				if (newScrollV < 0) {
					newScrollV = 0;
				} else if (newScrollV > contentHeight - div.m_size.cy) {
					newScrollV = contentHeight - div.m_size.cy;
				}
				div.m_scrollV = newScrollV;
				m_cancelClick = true;
				return;
			}
		}
		if (div.m_allowDragScroll) {
			var contentWidth = getDivContentWidth(div);
			if (contentWidth > div.m_size.cx) {
				var subX = div.m_startPoint.x - mp.x;
				var newScrollH = div.m_startScrollH + subX;
				if (newScrollH < 0) {
					newScrollH = 0;
				} else if (newScrollH > contentWidth - div.m_size.cx) {
					newScrollH = contentWidth - div.m_size.cx;
				}
				div.m_scrollH = newScrollH;
				if(Math.abs(subX) > 5){
				    m_cancelClick = true;
				}
			}
			var contentHeight = getDivContentHeight(div);
			if (contentHeight > div.m_size.cy) {
				var subY = div.m_startPoint.y - mp.y;
				var newScrollV = div.m_startScrollV + subY;
				if (newScrollV < 0) {
					newScrollV = 0;
				} else if (newScrollV > contentHeight - div.m_size.cy) {
					newScrollV = contentHeight - div.m_size.cy;
				}
				div.m_scrollV = newScrollV;
				if(Math.abs(subY) > 5){
				    m_cancelClick = true;
				}
			}
		}
	}
};

/*
* 图层的鼠标按下方法
* div: 图层
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseDownDiv = function (div, firstTouch, secondTouch, firstPoint, secondPoint) {
	var mp = firstPoint;
	div.m_mouseDownTime = new Date().getTime()
	div.m_startPoint = mp;
	div.m_downScrollHButton = false;
	div.m_downScrollVButton = false;
	if (div.m_showHScrollBar) {
		var contentWidth = getDivContentWidth(div);
		if (contentWidth > div.m_size.cx) {
		    var sLeft = div.m_scrollH / contentWidth * div.m_size.cx;
			var sRight = (div.m_scrollH + div.m_size.cx) / contentWidth * div.m_size.cx;
			if (sRight - sLeft < div.m_scrollSize) {
				sRight = sLeft + div.m_scrollSize;
			}
			if (mp.x >= sLeft && mp.x <= sRight && mp.y >= div.m_size.cy - div.m_scrollSize && mp.y <= div.m_size.cy) {
				div.m_downScrollHButton = true;
				div.m_startScrollH = div.m_scrollH;
				return;
			}
		}
	}
	if (div.m_showVScrollBar) {
	    var contentHeight = getDivContentHeight(div);
		if (contentHeight > div.m_size.cy) {
			var sTop = div.m_scrollV / contentHeight * div.m_size.cy;
			var sBottom = (div.m_scrollV + div.m_size.cy) / contentHeight * div.m_size.cy;
			if (sBottom - sTop < div.m_scrollSize) {
				sBottom = sTop + div.m_scrollSize;
			}
			if (mp.x >= div.m_size.cx - div.m_scrollSize && mp.x <= div.m_size.cx && mp.y >= sTop && mp.y <= sBottom) {
				div.m_downScrollVButton = true;
				div.m_startScrollV = div.m_scrollV;
				return;
			}
		}
	}
	if (div.m_allowDragScroll) {
		div.m_startScrollH = div.m_scrollH;
		div.m_startScrollV = div.m_scrollV;
	}
};

var m_dragScrollView_Div = null;//正在滚动的表格
var m_scrollAddSpeed_Div = 0;//滚动加速
var m_scrollDirection_Div = 0; //滚动方向

/*
* 检查拖动滚动
*/
var checkDragScroll_Div = function () {
    if (m_dragScrollView_Div) {
		var sub = parseInt(m_scrollAddSpeed_Div / 10);
		m_scrollAddSpeed_Div -= sub;
		if (sub == 0) {
		    var viewCache = m_dragScrollView_Div;
			m_scrollAddSpeed_Div = 0;
			m_dragScrollView_Div = null;
			if(viewCache.m_paint){
			    invalidateView(viewCache, viewCache.m_paint);
			}
		} else {
			var oldScrollV = parseInt(m_dragScrollView_Div.m_scrollV + m_scrollAddSpeed_Div);
			var oldScrollH = parseInt(m_dragScrollView_Div.m_scrollH + m_scrollAddSpeed_Div);
			if(m_scrollDirection_Div == 0){
			    var contentHeight = getDivContentHeight(m_dragScrollView_Div);
			    if (contentHeight < m_dragScrollView_Div.m_size.cy) {
				    m_dragScrollView_Div.m_scrollV = 0;
			    } else {
				    if (oldScrollV < 0) {
					    oldScrollV = 0;
				    } else if (oldScrollV > contentHeight - m_dragScrollView_Div.m_size.cy) {
					    oldScrollV = contentHeight - m_dragScrollView_Div.m_size.cy;
				    }
				    m_dragScrollView_Div.m_scrollV = oldScrollV;
			    }
			}else{
			    var contentWidth = getDivContentWidth(m_dragScrollView_Div);
			    if (contentWidth < m_dragScrollView_Div.m_size.cx) {
				    m_dragScrollView_Div.m_scrollH = 0;
			    } else {
				    if (oldScrollH < 0) {
					    oldScrollH = 0;
				    } else if (oldScrollH > contentWidth - m_dragScrollView_Div.m_size.cx) {
					    oldScrollH = contentWidth - m_dragScrollView_Div.m_size.cx;
				    }
				    m_dragScrollView_Div.m_scrollH = oldScrollH;
			    }
			}
			if(m_dragScrollView_Div.m_paint){
			    invalidateView(m_dragScrollView_Div, m_dragScrollView_Div.m_paint);
			}
		}
    }
};

setInterval(checkDragScroll_Div, 20);

/*
* 图层的鼠标抬起方法
* div: 图层
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseUpDiv = function (div, firstTouch, secondTouch, firstPoint, secondPoint) {
	if (firstTouch && firstPoint && div.m_startPoint && !div.m_downScrollHButton && !div.m_downScrollVButton) {
		if (div.m_allowDragScroll) {
			var mouseUpTime = new Date().getTime();
			var diff = mouseUpTime - div.m_mouseDownTime;
			//加速滚动
			if (diff < 500) {
				var sub1 = 30 * ((Math.abs(firstPoint.y - div.m_startPoint.y)) / 20) / diff * 10;
				var sub2 =  30 * ((Math.abs(firstPoint.x - div.m_startPoint.x)) / 20) / diff * 10;
				if("A:" + sub1 != "A:NaN" && "A:" + sub2 != "A:NaN"){
				    if(Math.abs(sub1) > Math.abs(sub2)){
				        if (firstPoint.y < div.m_startPoint.y) {
					        m_scrollAddSpeed_Div += sub1;
				        } else {
					        m_scrollAddSpeed_Div -= sub1;
				        }
				        m_scrollDirection_Div = 0;
				    }else{
				        if (firstPoint.x < div.m_startPoint.x) {
					        m_scrollAddSpeed_Div += sub2;
				        } else {
					        m_scrollAddSpeed_Div -= sub2;
				        }
				        m_scrollDirection_Div = 1;
				    }
				    m_dragScrollView_Div = div;
				    if(Math.abs(m_scrollAddSpeed_Div) > 0){
				        m_cancelClick = true;
				    }
				}
			}
		}
	}
	div.m_downScrollHButton = false;
	div.m_downScrollVButton = false;
};

/*
* 图层的鼠标滚轮方法
* div:图层
* delta:滚轮值
*/
var mouseWheelDiv = function(div, delta){
    var oldScrollV = div.m_scrollV;
    if (delta > 0) {
	    oldScrollV -= 10;
    } else if (delta < 0) {
	    oldScrollV += 10;
    }
    var contentHeight = getDivContentHeight(div);
    if (contentHeight < div.m_size.cy) {
        div.m_scrollV = 0;
    } else {
        if (oldScrollV < 0) {
	        oldScrollV = 0;
	    } else if (oldScrollV > contentHeight - div.m_size.cy) {
		    oldScrollV = contentHeight - div.m_size.cy;
        }
        div.m_scrollV = oldScrollV;
    }
};

/*
* 重绘图层
* div:视图
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawDiv = function(div, paint, clipRect){
	if(div.m_backColor){
        paint.fillRect(div.m_backColor, 0, 0, div.m_size.cx, div.m_size.cy);
    }
    if(div.m_backImage && div.m_backImage.length > 0){
        if(!div.m_image){
            div.m_image = new Image();
            div.m_image.onload = function(){ invalidateView(div, paint);}; 
            div.m_image.src = div.m_backImage;
        }else{
            paint.drawImage(div.m_image, 0, 0, div.m_size.cx, div.m_size.cy);
        }
    }
};

/*
* 重绘图层边线
* div:视图
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawDivBorder = function(div, paint, clipRect){
	if(div.m_borderColor){
        paint.drawRect(div.m_borderColor, 1, 0, 0, 0, div.m_size.cx, div.m_size.cy);
    }
};
