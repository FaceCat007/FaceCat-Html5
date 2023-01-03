/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 坐标结构
*/
function FCPoint(x, y) {
	this.x = x; //横坐标
	this.y = y; //纵坐标
};

/*
* 大小结构
*/
function FCSize(cx, cy) {
	this.cx = cx; //长
	this.cy = cy; //宽
};

/*
* 矩形结构
*/
function FCRect(left, top, right, bottom) {
	this.left = left; //左侧
	this.top = top; //上侧
	this.right = right; //右侧
	this.bottom = bottom; //底部
};

/*
* 边距信息
*/
function FCPadding(left, top, right, bottom) {
	this.left = left; //左侧
	this.top = top; //上侧
	this.right = right; //右侧
	this.bottom = bottom; //底部
};

/*
* 绘图结构
*/
function FCPaint() {
	this.m_moveTo = false;
	this.m_offsetX = 0; //横向偏移
	this.m_offsetY = 0; //纵向偏移
	this.m_context = null; //绘图上下文
	this.m_canvas = null; //图层
	this.onPaint = null; //重绘回调
	this.onPaintBorder = null; //重绘边线回调
	this.m_defaultUIStyle = "dark"; //默认样式
	this.m_scaleFactorX = 1; //横向缩放比例
	this.m_scaleFactorY = 1; //纵向缩放比例
	this.m_isPath = false; //是否路径
	/*
	* 添加线
	* x1:横坐标1
	* y1:纵坐标1
	* x2:横坐标2
	* y2:纵坐标2
	*/
	this.addLine = function(x1, y1, x2, y2) {
		if (!this.m_moveTo) {
			this.m_moveTo = true;
			this.m_context.moveTo((x1 + this.m_offsetX) * this.m_scaleFactorX, (y1 + this.m_offsetY) * this.m_scaleFactorY);
		}
		this.m_context.lineTo((x2 + this.m_offsetX) * this.m_scaleFactorX, (y2 + this.m_offsetY) * this.m_scaleFactorY);
	};
	/*
	* 开始路径
	*/
	this.beginPath = function() {
		this.m_context.beginPath();
		this.m_isPath = true;
	};
	/*
	* 开始绘图
	* rect:区域
	*/
	this.beginPaint = function (rect) {
		this.m_context = this.m_canvas.getContext("2d");
		this.m_moveTo = false;
		this.m_offsetX = 0;
		this.m_offsetY = 0;
	};
	/*
	* 闭合路径
	*/
	this.closeFigure = function() {
		this.m_context.closePath();
	};
	/*
	* 关闭路径
	*/
	this.closePath = function() {
		this.m_moveTo = false;
	};
	/*
	* 绘制渐变矩形
	* color1:颜色1
	* color2:颜色2
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.fillGradientRect = function(color1, color2, left, top, right, bottom) {
		var w = right - left;
		var h = bottom - top;
		var startLiner = this.m_context.createLinearGradient((left + this.m_offsetX) * this.m_scaleFactorX, (top + this.m_offsetY) * this.m_scaleFactorY, w * this.m_scaleFactorX, h * this.m_scaleFactorY);
		startLiner.addColorStop(0, color1);
		startLiner.addColorStop(1, color2);
		this.m_context.fillStyle = startLiner;
		this.m_context.fillRect((left + this.m_offsetX) * this.m_scaleFactorX, (top + this.m_offsetY) * this.m_scaleFactorY, w * this.m_scaleFactorX, h * this.m_scaleFactorY);
	};
	/*
	* 绘制线
	* color:颜色
	* width:宽度
	* style:样式
	* x1:横坐标1
	* y1:纵坐标1
	* x2:横坐标2
	* y2:纵坐标2
	*/
	this.drawLine = function(color, width, style, x1, y1, x2, y2) {
	    width = Math.min(this.m_scaleFactorX, this.m_scaleFactorY) * width;
		this.m_context.beginPath();
		this.m_context.strokeStyle = color;
		this.m_context.lineWidth = width;
		if(this.m_context.lineWidth < 1){
		    this.m_context.lineWidth = 1;
		}
		if(style != 0){
		    this.m_context.setLineDash(style);
		}
		this.m_context.moveTo((x1 + this.m_offsetX) * this.m_scaleFactorX, (y1 + this.m_offsetY) * this.m_scaleFactorY);
		this.m_context.lineTo((x2 + this.m_offsetX) * this.m_scaleFactorX, (y2 + this.m_offsetY) * this.m_scaleFactorY);
		this.m_context.stroke();
		this.m_context.setLineDash([]);
	};
    /*
	* 绘制路径
	* color:颜色
	* width:宽度
	* style:样式
	*/
	this.drawPath = function(color, width, style) {
	    width = Math.min(this.m_scaleFactorX, this.m_scaleFactorY) * width;
	    if(style != 0){
		    this.m_context.setLineDash(style);
		}
		this.m_context.strokeStyle = color;
		this.m_context.lineWidth = width;
		if(this.m_context.lineWidth < 1){
		    this.m_context.lineWidth = 1;
		}
		this.m_context.stroke();
		this.m_context.setLineDash([]);
	};
	/*
	* 绘制图片
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.drawImage = function(image, left, top, right, bottom){
	    var w = right - left;
		var h = bottom - top;
		this.m_context.drawImage(image, (left + this.m_offsetX) * this.m_scaleFactorX, (top + this.m_offsetY) * this.m_scaleFactorY, w * this.m_scaleFactorX, h * this.m_scaleFactorY);
	};
	/*
	* 绘制矩形
	* color:颜色
	* width:宽度
	* style:样式
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.drawRect = function(color, width, style, left, top, right, bottom) {
	    width = Math.min(this.m_scaleFactorX, this.m_scaleFactorY) * width;
		var w = right - left;
		var h = bottom - top;
		if(style != 0){
		    this.m_context.setLineDash(style);
		}
		this.m_context.strokeStyle = color;
		this.m_context.lineWidth = width;
		if(this.m_context.lineWidth < 1){
		    this.m_context.lineWidth = 1;
		}
		this.m_context.strokeRect((left + this.m_offsetX) * this.m_scaleFactorX, (top + this.m_offsetY) * this.m_scaleFactorY, w * this.m_scaleFactorX, h * this.m_scaleFactorY);
		this.m_context.setLineDash([]);
	};
	/*
	* 绘制椭圆
	* color:颜色
	* width:宽度
	* style:样式
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.drawEllipse = function(color, width, style, left, top, right, bottom) {
	    width = Math.min(this.m_scaleFactorX, this.m_scaleFactorY) * width;
		var w = right - left;
		var h = bottom - top;
		this.m_context.beginPath();
		this.m_context.ellipse(((left + (right - left) / 2) + this.m_offsetX) * this.m_scaleFactorX, ((top + (bottom - top) / 2) + this.m_offsetY) * this.m_scaleFactorY, (w / 2) * this.m_scaleFactorX, (h / 2) * this.m_scaleFactorY, 0, 0, Math.PI * 2);
		if(style != 0){
		    this.m_context.setLineDash(style);
		}
		this.m_context.strokeStyle = color;
		this.m_context.lineWidth = width;
		if(this.m_context.lineWidth < 1){
		    this.m_context.lineWidth = 1;
		}
		this.m_context.stroke();
		this.m_context.setLineDash([]);
	};
	/*
	* 绘制文字
	* text:文字
	* color:颜色
	* font:字体
	* x:横坐标
	* y:纵坐标
	*/
	this.drawText = function(text, color, font, x, y) {
		if(text && text.length != 0 && font) {
		    if(this.m_scaleFactorX != 1 || this.m_scaleFactorY != 1){
		        var newFont = "";
		        var strs = font.split(' ');
		        for(var i = 0; i < strs.length; i++){
		            if(i == 0){
		                var px = strs[i].replace("px", "");
		                newFont += Math.min(this.m_scaleFactorX, this.m_scaleFactorY) * parseFloat(px) + "px";
		            }else{
    		            newFont += strs[i];
		            }
		            if(i != strs.length){
		                newFont += " ";
		            }
		        }
		        font = newFont;
		    }
			this.m_context.font = font;
			this.m_context.fillStyle = color;
			this.m_context.textAlign = 'left';
      		this.m_context.textBaseline = 'middle';
			this.m_context.fillText(text, (x + this.m_offsetX) * this.m_scaleFactorX, (y + this.m_offsetY) * this.m_scaleFactorY);
		}
    };
	/*
	* 结束绘图
	*/
	this.endPaint = function () {
	};
	/*
	* 填充路径
	* color:颜色
	*/
	this.fillPath = function(color) {
        this.m_context.fillStyle = color;
        this.m_context.fill();
	};
	/*
	* 填充矩形
    * color:颜色
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.fillRect = function(color, left, top, right, bottom) {
		var w = right - left;
		var h = bottom - top;
		this.m_context.fillStyle = color;
		this.m_context.fillRect((left + this.m_offsetX) * this.m_scaleFactorX, (top + this.m_offsetY) * this.m_scaleFactorY, w * this.m_scaleFactorX, h * this.m_scaleFactorY);
	};
	/*
	* 填充椭圆
    * color:颜色
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.fillEllipse = function(color, left, top, right, bottom) {
		var w = right - left;
		var h = bottom - top;
		this.m_context.beginPath();
		this.m_context.ellipse(((left + (right - left) / 2) + this.m_offsetX) * this.m_scaleFactorX, ((top + (bottom - top) / 2) + this.m_offsetY) * this.m_scaleFactorY, (w / 2) * this.m_scaleFactorX, (h / 2) * this.m_scaleFactorY, 0, 0, Math.PI * 2);
		this.m_context.fillStyle = color;
		this.m_context.fill();
	};
	/*
	* 裁剪
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.setClip = function(left, top, right, bottom) {
		var w = right - left;
		var h = bottom - top;
		this.m_context.beginPath(); 
		this.m_context.rect((left + this.m_offsetX) * this.m_scaleFactorX, (top + this.m_offsetY) * this.m_scaleFactorY, w * this.m_scaleFactorX, h * this.m_scaleFactorY);
		this.m_context.clip();
	};

	/*
	* 设置偏移量
	* offsetX:横向偏移
	* offsetY:纵向偏移
	*/
	this.setOffset = function(offsetX, offsetY) {
		this.m_offsetX = offsetX;
		this.m_offsetY = offsetY;
	};
	/*
	* 获取字体大小
	* text:文字
	* font:字体
	*/
	this.textSize = function(text, font) {	
		if(text && text.length != 0) {
		    this.m_context.font = font;
		    var metrics = this.m_context.measureText(text); 
		    var actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent; 
		    var tSize = new FCSize(metrics.width, actualHeight);
		    return tSize;
		}else{
			return new FCSize(0,0);
		}
    };
	/*
	* 保存状态
	*/
	this.save = function () {
		this.m_context.save();
	};
	/*
	* 恢复状态
	*/
	this.restore = function () {
		this.m_context.restore();
	};
    /*
	* 绘制文字
	* text:文字
	* color:颜色
	* font:字体
	* left:左侧坐标
	* top:上方坐标
	* right:右侧坐标
	* bottom:下方坐标
	*/
	this.drawTextAutoEllipsis = function (text, color, font, left, top, right, bottom) {
		if (text && text.length != 0) {
			var tSize = this.textSize(text, font);
			if (tSize.cx < right - left) {
				this.drawText(text, color, font, left, top);
			} else {
				if (tSize.cx > 0) {
					var subLen = 3;
					while (true) {
						var newLen = text.length - subLen;
						if (newLen > 0) {
							var newText = text.substring(0, newLen) + "...";
							tSize = this.textSize(newText, font);
							if (tSize.cx < right - left) {
								this.drawText(newText, color, font, left, top);

								break;
							} else {
								subLen += 3;
							}
						} else {
							break;
						}
					}
				}
			}
		}
	};
};

/*
* 基础视图
*/
function FCView() {
	this.m_backColor = null; //背景色
	this.m_borderColor = null; //边线色
	this.m_views = null; //子视图
	this.m_textColor = null; //前景色
	this.m_location = null; //坐标
	this.m_name = null; //名称
	this.m_parent = null; //父视图
	this.m_size = null; //大小
    this.m_tag = null; //数据
	this.m_text = null; //文字
	this.m_visible = true; //可见性
    this.m_scrollV = 0; //纵向滚动
	this.m_scrollH = 0; //横向滚动
	this.m_scrollSize = 8; //滚动条的大小
	this.m_showHScrollBar = false; //是否显示横向滚动条
	this.m_showVScrollBar = false; //是否显示横向滚动条
	this.m_scrollBarColor = "rgb(100,100,100)"; //滚动条的颜色
	this.m_allowDragScroll = false; //是否允许拖动滚动
	this.m_downScrollHButton = false; //是否按下横向滚动条
	this.m_downScrollVButton = false; //是否按下纵向滚动条
	this.m_startScrollH = 0; //开始滚动的值
	this.m_startScrollV = 0; //结束滚动的值
	this.m_startPoint = new FCPoint(); //起始点
	this.m_mouseDownTime = 0; //鼠标按下的时间
	this.m_displayOffset = true; //是否显示偏移量
	this.m_paint = null; //绘图对象
	this.m_padding = new FCPadding(0, 0, 0, 0); //内边距
	this.m_margin = new FCPadding(0, 0, 0, 0); //外边距
	this.m_dock = "none"; //悬浮状态
	this.m_backImage = null; //背景图片
	this.m_topMost = false; //是否置顶
	this.m_clipRect = null; //裁剪区域
	this.m_image = null; //图片
	this.m_font = "12px Arial"; //字体
	this.m_hoveredColor = null; //鼠标悬停时的颜色
	this.m_pushedColor = "rgb(100,100,100)"; //鼠标按下时的颜色
	this.m_allowDrag = false; //是否允许拖动
};

/*
 * 添加顶层视图
 * view 视图
 * paint 绘图对象
 */
var addView = function (view, paint) {
	view.m_paint = paint;
	paint.m_canvas.m_views.push(view);
};

/*
 * 添加到父视图
 * view 视图
 * parent 父视图
 */
var addViewToParent = function (view, parent) {
	view.m_paint = parent.m_paint;
	if (!parent.m_views) {
		parent.m_views = new Array();
    }
	parent.m_views.push(view);
	view.m_parent = parent;
};

/*
 * 移除顶层视图
 */
var removeView = function (view, paint) {
	if (paint.m_canvas.m_views) {
		for (var i = 0; i < paint.m_canvas.m_views.length; i++) {
			if (paint.m_canvas.m_views[i] == view) {
				paint.m_canvas.m_views.splice(i, 1);
				break;
			}
		}
	}
};

/*
 * 从父视图中移除
 * view 视图
 * parent 父视图
 */
var removeViewFromParent = function (view, parent) {
	if (parent.m_views) {
		for (var i = 0; i < parent.m_views.length; i++) {
			if (parent.m_views[i] == view) {
				parent.m_views.splice(i, 1);
				break;
			}
		}
	}
};

/*
* 获取绝对位置X
* view:视图
*/
var clientX = function(view) {
	if(view) {
		var cLeft = view.m_location.x;
		if(view.m_parent) {
		    if(view.m_parent.m_displayOffset && view.m_parent.m_scrollH){
		        return cLeft + clientX(view.m_parent) - view.m_parent.m_scrollH;
		    }else{
			    return cLeft + clientX(view.m_parent);
			}
		} else {
			return cLeft;
		}
	} else {
		return 0;
	}
};

/*
* 获取绝对位置Y
* view:视图
*/
var clientY = function(view) {
	if(view) {
		var cTop = view.m_location.y;
		if(view.m_parent) {
		    if(view.m_parent.m_displayOffset && view.m_parent.m_scrollV){
		        return cTop + clientY(view.m_parent) -  view.m_parent.m_scrollV;;
		    }else{
			    return cTop + clientY(view.m_parent);
			}
		} else {
			return cTop;
		}
	} else {
		return 0;
	}
};

/*
* 是否包含坐标
* view:视图
* mp:坐标
*/
var containsPoint = function(view, mp) {
	var clx = clientX(view);
	var cly = clientY(view);
	var size = view.m_size;
	var cp = new FCPoint(mp.x - clx, mp.y - cly);
	if(cp.x >= 0 && cp.x <= size.cx &&
		cp.y >= 0 && cp.y <= size.cy) {
		return true;
	} else {
		return false;
	}
};

/*
* 根据名称查找视图
* name:名称
*/
var findViewByName = function(name, views){
    var size = views.length;
	for(var i = 0; i < size; i++) {
		var view = views[i];
		if(view.m_name == name){
		    return view;
		}else{
		    if(view.m_views) {
				var subView = findViewByName(name, view.m_views);
				if(subView) {
					return subView;
				}
			}
		}
	}
	return null;
};

/*
* 根据坐标查找视图
* mp:坐标
* views:视图集合
*/
var findView = function(mp, views) {
	var size = views.length;
	for(var i = size - 1; i >= 0; i--) {
		var view = views[i];
		if(view.m_visible && view.m_topMost) {
			if(containsPoint(view, mp)) {
			    if(view.m_showVScrollBar && view.m_scrollSize){
			        var clx = clientX(view);
	                if(mp.x >= clx + view.m_size.cx - view.m_scrollSize){
	                    return view;
	                }
			    }
			    if(view.m_showHScrollBar && view.m_scrollSize){
			        var cly = clientY(view);
	                if(mp.y >= cly + view.m_size.cy - view.m_scrollSize){
	                    return view;
	                }
			    }
				if(view.m_views) {
					var subView = findView(mp, view.m_views);
					if(subView) {
						return subView;
					}
				}
				return view;
			}
		}
	}
	for(var i = size - 1; i >= 0; i--) {
		var view = views[i];
		if(view.m_visible && !view.m_topMost) {
			if(containsPoint(view, mp)) {
			    if(view.m_showVScrollBar && view.m_scrollSize){
			        var clx = clientX(view);
	                if(mp.x >= clx + view.m_size.cx - view.m_scrollSize){
	                    return view;
	                }
			    }
			    if(view.m_showHScrollBar && view.m_scrollSize){
			        var cly = clientY(view);
	                if(mp.y >= cly + view.m_size.cy - view.m_scrollSize){
	                    return view;
	                }
			    }
				if(view.m_views) {
					var subView = findView(mp, view.m_views);
					if(subView) {
						return subView;
					}
				}
				return view;
			}
		}
	}
	return null;
};

/*
* 获取点击位置
* evt:事件
* canvas:图层
* ratio:比例
*/
var getMousePostion = function(evt, canvas) {
	var style = window.getComputedStyle(canvas, null);
  	//宽高
  	var cssWidth = parseFloat(style["width"]);
 	var cssHeight = parseFloat(style["height"]);
  	//各个方向的边框长度
  	var borderLeft = parseFloat(style["border-left-width"]);
  	var borderTop = parseFloat(style["border-top-width"]);
  	var paddingLeft = parseFloat(style["padding-left"]);
  	var paddingTop = parseFloat(style["padding-top"]);

 	var scaleX = canvas.width / cssWidth; // 水平方向的缩放因子
  	var scaleY = canvas.height / cssHeight; // 垂直方向的缩放因子

 	var x = evt.clientX;
 	var y = evt.clientY;

  	var rect = canvas.getBoundingClientRect();
  	x -= (rect.left + borderLeft + paddingLeft); // 去除 borderLeft paddingLeft 后的坐标
  	y -= (rect.top + borderTop + paddingTop); // 去除 borderLeft paddingLeft 后的坐标

  	x *= scaleX; // 修正水平方向的坐标
  	y *= scaleY; // 修正垂直方向的坐标
  	x /= m_ratio;
  	y /= m_ratio;
  	
  	if(canvas.m_paint){
  	    x /= canvas.m_paint.m_scaleFactorX;
  	    y /= canvas.m_paint.m_scaleFactorY;
  	}
  	return {x,y};
};

/*
* 是否重绘时可见
* view:视图
*/
var isPaintVisible = function(view){
    if(view.m_visible){
        if(view.m_parent){
            if(view.m_parent.m_visible){
                return isPaintVisible(view.m_parent);
            }else{
                return false;
            }
        }else{
            return true;
        }
    }else{
        return false;
     }
};
    
    
/*
* 获取区域的交集
*/  
var getIntersectRect = function(lpDestRect, lpSrc1Rect, lpSrc2Rect)
{
    lpDestRect.left = Math.max(lpSrc1Rect.left, lpSrc2Rect.left);
    lpDestRect.right = Math.min(lpSrc1Rect.right, lpSrc2Rect.right);
    lpDestRect.top = Math.max(lpSrc1Rect.top, lpSrc2Rect.top);
    lpDestRect.bottom = Math.min(lpSrc1Rect.bottom, lpSrc2Rect.bottom);
    if(lpDestRect.right > lpDestRect.left && lpDestRect.bottom > lpDestRect.top){
        return 1;
    }
    else{
        lpDestRect.left = 0;
        lpDestRect.right = 0;
        lpDestRect.top = 0;
        lpDestRect.bottom = 0;
        return 0;
    }
};

/*
* 重绘视图
* views:视图集合
* paint:绘图对象
* rect:区域
*/
var renderViews = function(views, paint, rect) {
	var viewsSize = views.length;
	for(var i = 0; i < viewsSize; i++) {
		var view = views[i];
		if(!rect){
		    if(view.m_views) {
		        var subViewsSize = view.m_views.length;
		        if(subViewsSize > 0) {
			        renderViews(view.m_views, paint, null);
		        }
	        }
		    view.m_clipRect = null;
		    continue;
		}
		if(!view.m_topMost && isPaintVisible(view)) {
			var clx = clientX(view);
			var cly = clientY(view);
			var drawRect = new FCRect(0, 0, view.m_size.cx, view.m_size.cy);
			var clipRect = new FCRect(clx, cly, clx + view.m_size.cx, cly + view.m_size.cy);
			var destRect = new FCRect();
			if(getIntersectRect(destRect, rect, clipRect) > 0){
			    paint.save();
			    paint.setOffset(0, 0);
			    paint.setClip(destRect.left, destRect.top, destRect.right, destRect.bottom);
			    view.m_clipRect = destRect;
			    paint.setOffset(clx, cly);
			    if(paint.onPaint){
			        paint.onPaint(view, paint, drawRect);
			    }
			    if(view.m_views) {
				    var subViewsSize = view.m_views.length;
				    if(subViewsSize > 0) {
						renderViews(view.m_views, paint, destRect);
				    }
			    }
			    paint.setOffset(clx, cly);
			    if(paint.onPaintBorder){
			        paint.onPaintBorder(view, paint, drawRect);
			    }
			    paint.restore();
			}else{
			     if(view.m_views) {
				    var subViewsSize = view.m_views.length;
				    if(subViewsSize > 0) {
					    renderViews(view.m_views, paint, null);
				    }
			    }
			    view.m_clipRect = null;
			}
		}
	}
	for(var i = 0; i < viewsSize; i++) {
		var view = views[i];
		if(!rect){
		    continue;
		}
		if(view.m_topMost && isPaintVisible(view)) {
			var clx = clientX(view);
			var cly = clientY(view);
			var drawRect = new FCRect(0, 0, view.m_size.cx, view.m_size.cy);
			var clipRect = new FCRect(clx, cly, clx + view.m_size.cx, cly + view.m_size.cy);
			var destRect = new FCRect();
			if(getIntersectRect(destRect, rect, clipRect) > 0){
			    paint.save();
			    paint.setOffset(0, 0);
			    view.m_clipRect = destRect;
			    paint.setClip(destRect.left, destRect.top, destRect.right, destRect.bottom);
			    paint.setOffset(clx, cly);
			    if(paint.onPaint){
			        paint.onPaint(view, paint, drawRect);
			    }
			    if(view.m_views) {
				    var subViewsSize = view.m_views.length;
				    if(subViewsSize > 0) {
						renderViews(view.m_views, paint, destRect);
				    }
			    }
			    paint.setOffset(clx, cly);
			    if(paint.onPaintBorder){
			        paint.onPaintBorder(view, paint, drawRect);
			    }
			    paint.restore();
			}
			else{
			    if(view.m_views) {
				    var subViewsSize = view.m_views.length;
				    if(subViewsSize > 0) {
					    renderViews(view.m_views, paint, null);
				    }
			    }
			    view.m_clipRect = null;
			}
		}
	}
};

/*
* 全局刷新方法
* paint:绘图对象
*/
var invalidate = function (paint) {
	var drawViews = paint.m_canvas.m_views;
    if(paint.onInvalidate){
		paint.onInvalidate(paint);
    }else{
	    paint.beginPaint(null);
	    var drawRect = new FCRect(0, 0, (paint.m_canvas.width / m_ratio / paint.m_scaleFactorX), (paint.m_canvas.height / m_ratio / paint.m_scaleFactorY));
	    if(paint.onRenderViews){
			paint.onRenderViews(drawViews, paint, drawRect);
	    }else{
			renderViews(drawViews, paint, drawRect);
	    }
	    paint.endPaint();
		showOrHideInput(drawViews);
	}
};

/*
* 刷新视图方法
* views:视图
* paint:绘图对象
*/
var invalidateView = function (view, paint) {
    if(paint.onInvalidateView){     
        paint.onInvalidateView(view, paint);
    }else{
        if(isPaintVisible(view)){
            var clX = clientX(view);
	        var clY = clientY(view);
	        var drawRect = new FCRect(clX, clY, clX + view.m_size.cx, clY + view.m_size.cy);
	        var drawViews = paint.m_canvas.m_views;
	        paint.beginPaint(null);
	        var drawRect = new FCRect(0, 0, (paint.m_canvas.width / m_ratio / paint.m_scaleFactorX), (paint.m_canvas.height / m_ratio / paint.m_scaleFactorY));
	        if(paint.onRenderViews){
	            paint.onRenderViews(drawViews, paint, drawRect);
	        }else{
	            renderViews(drawViews, paint, drawRect);
	        }
	        paint.endPaint();
	        showOrHideInput(drawViews);
	    }
	}
};

var m_mouseDownView = null; //鼠标按下的视图
var m_mouseMoveView = null; //鼠标移动的视图
var m_focusedView = null; //焦点视图
var m_mouseDownPoint = new FCPoint();
var m_touchPoint = new FCPoint();

var m_firstTouch = false; //是否第一次触摸
var m_secondTouch = false; //是否第二次触摸
var m_touchFirstPoint = new FCPoint(); //第一次触摸的点
var m_touchSecondPoint = new FCPoint(); //第二次触摸的点
var m_ratio = 1; //缩放比例
var m_cancelClick = false; //是否退出点击
var m_isMobile = false; //是否移动端

var m_dragBeginPoint = new FCPoint(); //拖动开始时的触摸位置
var m_dragBeginRect = new FCRect(); //拖动开始时的区域
var m_draggingView = null; //正被拖动的控件

/*
* 添加鼠标按下的方法
* canvas:图层
* callBack:回调函数
*/
var addMouseDownEvent = function(canvas, callBack){
    canvas.onmousedown = function(evt) {
        if(!m_isMobile){
	        var mp = getMousePostion(evt, canvas);
	        m_cancelClick = false;
	        m_mouseDownPoint = mp;
	        m_mouseDownView = findView(mp, canvas.m_views);
	        if(m_mouseDownView) {
	            m_focusedView = m_mouseDownView;
		        var cmp = new FCPoint(mp.x - clientX(m_mouseDownView), mp.y - clientY(m_mouseDownView));	
                if(callBack){
		            callBack(m_mouseDownView, cmp, 1, 1, 0);
		        }
	        }
	    }
    };
};

/*
	* 更新悬浮状态
	* views:视图集合
	*/
var updateViewDefault = function (views) {
	for (var i = 0; i < views.length; i++) {
		var view = views[i];
		if (view.m_dock == "fill") {
			if (view.m_parent && view.m_parent.m_type != "split") {
				view.m_location = new FCPoint(0, 0);
				view.m_size = new FCSize(view.m_parent.m_size.cx, view.m_parent.m_size.cy);
			}
		}
		if (view.m_type == "split") {
			resetSplitLayoutDiv(view);
		} else if (view.m_type == "tabview") {
			updateTabLayout(view);
		} else if (view.m_type == "layout") {
			resetLayoutDiv(view);
		} else if (view.m_type == "calendar") {
			updateCalendar(view);
		}
		if (view.m_views) {
			updateViewDefault(view.m_views);
		}
	}
};

/*
* 添加鼠标移动的方法
* canvas:图层
* callBack:回调函数
*/
var addMouseMoveEvent =  function(canvas, callBack){
     canvas.onmousemove = function(evt) {
        if(evt.buttons == 0){
            m_mouseDownView = null;
        }
        if(!m_isMobile){
	        var mp = getMousePostion(evt, canvas);
			if (m_mouseDownView) {
				m_mouseMoveView = m_mouseDownView;
				var cmp = new FCPoint(mp.x - clientX(m_mouseDownView), mp.y - clientY(m_mouseDownView));
				if (callBack) {
					callBack(m_mouseDownView, cmp, 1, 1, 0);
				}
				if (m_mouseDownView.m_allowDrag) {
					if (Math.abs(mp.x - m_mouseDownPoint.x) > 5 || Math.abs(mp.y - m_mouseDownPoint.y) > 5) {
						m_dragBeginRect = new FCRect(m_mouseDownView.m_location.x, m_mouseDownView.m_location.y,
							m_mouseDownView.m_location.x + m_mouseDownView.m_size.cx,
							m_mouseDownView.m_location.y + m_mouseDownView.m_size.cy);
						m_dragBeginPoint = new FCPoint(m_mouseDownPoint.x, m_mouseDownPoint.y);
						m_draggingView = m_mouseDownView;
						m_mouseDownView = null;
					}
				}
			}
			else if (m_draggingView != null) {
				var offsetX = mp.x - m_dragBeginPoint.x;
				var offsetY = mp.y - m_dragBeginPoint.y;
				var newBounds = new FCRect(m_dragBeginRect.left + offsetX, m_dragBeginRect.top + offsetY,
					m_dragBeginRect.right + offsetX, m_dragBeginRect.bottom + offsetY);
				m_draggingView.m_location = new FCPoint(newBounds.left, newBounds.top);
				if (m_draggingView.m_parent && m_draggingView.m_parent.m_type == "split") {
					resetSplitLayoutDiv(m_draggingView.m_parent);
					updateViewDefault(m_draggingView.m_parent.m_views);
                }
				if (m_draggingView.m_parent) {
					if (m_draggingView.m_parent.m_paint) {
						invalidateView(m_draggingView.m_parent, m_draggingView.m_parent.m_paint);
                    }
				} else {
					if (m_draggingView.m_paint) {
						invalidate(m_draggingView.m_paint);
					}
                }
            }
			else {
	            var view = findView(mp, canvas.m_views);
	            var cmp = new FCPoint(mp.x - clientX(view), mp.y - clientY(view));
				if (view) {
					m_mouseMoveView = view;
	                if(callBack){
		                callBack(view, cmp, 0, 0, 0);
		            }
	            }
	        }
	    }
    };
};

/*
* 添加鼠标移动的方法
* canvas:图层
* callBack:回调函数
* enterCallBack:进入回调函数
* leaveCallBack:离开回调函数
*/
var addMouseMoveEvent2 =  function(canvas, callBack, enterCallBack, leaveCallBack){
     canvas.onmousemove = function(evt) {
        if(evt.buttons == 0){
            m_mouseDownView = null;
        }
        if(!m_isMobile){
	        var mp = getMousePostion(evt, canvas);
			if (m_mouseDownView) {
				m_mouseMoveView = m_mouseDownView;
	            var cmp = new FCPoint(mp.x - clientX(m_mouseDownView), mp.y - clientY(m_mouseDownView));
	            if(callBack){
	                callBack(m_mouseDownView, cmp, 1, 1, 0);
				}
				if (m_mouseDownView.m_allowDrag) {
					if (Math.abs(mp.x - m_mouseDownPoint.x) > 5 || Math.abs(mp.y - m_mouseDownPoint.y) > 5) {
						m_dragBeginRect = new FCRect(m_mouseDownView.m_location.x, m_mouseDownView.m_location.y,
							m_mouseDownView.m_location.x + m_mouseDownView.m_size.cx,
							m_mouseDownView.m_location.y + m_mouseDownView.m_size.cy);
						m_dragBeginPoint = new FCPoint(m_mouseDownPoint.x, m_mouseDownPoint.y);
						m_draggingView = m_mouseDownView;
						m_mouseDownView = null;
					}
				}
			}
			else if (m_draggingView != null) {
				var offsetX = mp.x - m_dragBeginPoint.x;
				var offsetY = mp.y - m_dragBeginPoint.y;
				var newBounds = new FCRect(m_dragBeginRect.left + offsetX, m_dragBeginRect.top + offsetY,
					m_dragBeginRect.right + offsetX, m_dragBeginRect.bottom + offsetY);
				m_draggingView.m_location = new FCPoint(newBounds.left, newBounds.top);
				if (m_draggingView.m_parent && m_draggingView.m_parent.m_type == "split") {
					resetSplitLayoutDiv(m_draggingView.m_parent);
					updateViewDefault(m_draggingView.m_parent.m_views);
				}
				if (m_draggingView.m_parent) {
					if (m_draggingView.m_parent.m_paint) {
						invalidateView(m_draggingView.m_parent, m_draggingView.m_parent.m_paint);
					}
				} else {
					if (m_draggingView.m_paint) {
						invalidate(m_draggingView.m_paint);
					}
				}
			}
			else {
	            var view = findView(mp, canvas.m_views);
	            var cmp = new FCPoint(mp.x - clientX(view), mp.y - clientY(view));
				if (view) {
					oldMouseMoveView = m_mouseMoveView
					m_mouseMoveView = view;
					if (oldMouseMoveView != None && oldMouseMoveView != view) {
						if (leaveCallBack) {
							leaveCallBack(oldMouseMoveView, cmp, 0, 0, 0);
						}
					}
					if (oldMouseMoveView == None || oldMouseMoveView != view) {
						if (enterCallBack) {
							enterCallBack(view, cmp, 0, 0, 0);
						}
                    }
	                if(callBack){
		                callBack(view, cmp, 0, 0, 0);
		            }
	            }
	        }
	    }
    };
};

/*
* 添加鼠标滚动的方法
* canvas:图层
* callBack:回调函数
*/
var addMouseWheelEvent =  function(canvas, callBack){
     //图层鼠标移动事件
    canvas.onmousewheel = function(evt) {
        if(!m_isMobile){
	        var mp = getMousePostion(evt, canvas);
	        var view = findView(mp, canvas.m_views);
	        if(view) {
		        var cmp = new FCPoint(mp.x - clientX(view), mp.y - clientY(view));
		        var delta = evt.detail ? -evt.detail / 3 : evt.wheelDelta / 120; 
		        if(callBack){
		            callBack(view, cmp, 0, 0, delta);
		        }
	        }
	        if(view.m_allowDragScroll){
	            evt.preventDefault && evt.preventDefault();
	            evt.returnValue = false;
	            evt.stopPropagation && evt.stopPropagation();
	        }
	    }
	    return false;
    };
};

/*
* 添加鼠标抬起的方法
* canvas:图层
* callBack:回调函数
*/
var addMouseUpEvent = function(canvas, callBack, clickCallBack){
    canvas.onmouseup = function(evt) {
        if(!m_isMobile){
			var mp = getMousePostion(evt, canvas);
	        if(m_mouseDownView) {
		        var cmp = new FCPoint(mp.x - clientX(m_mouseDownView), mp.y - clientY(m_mouseDownView));
		        var view = findView(mp, canvas.m_views);
		        if(view != null && view == m_mouseDownView) {
		            if(!m_cancelClick){
		                if(clickCallBack){
			                clickCallBack(m_mouseDownView, cmp, 1, 1, 0);
			            }
			        }
		        } 
		        if(m_mouseDownView) {
			        var mouseDownView = m_mouseDownView;
			        m_mouseDownView = null;
			        if(callBack){
			            callBack(mouseDownView, cmp, 1, 1, 0);
			        }
		        }
			}
			m_draggingView = null;
	    }
    };
};

/*
* 添加触摸开始的方法
* canvas:图层
* callBack:回调函数
*/
var addTouchBeginEvent = function(canvas, callBack){
    /*
    * 触摸开始方法
    * evt: 事件参数
    */
    canvas.ontouchstart = function (evt) {
        if(m_isMobile){
            m_cancelClick = false;
            var mp = getMousePostion(evt.touches[0], canvas);
            m_touchPoint = new FCPoint(mp.x, mp.y);
            m_mouseDownPoint = new FCPoint(mp.x, mp.y);
            m_mouseDownView = findView(mp, canvas.m_views);
	        if (m_mouseDownView) {
	            m_focusedView = m_mouseDownView;
	            m_firstTouch = false;
	            m_secondTouch = false;
	            m_touchFirstPoint = new FCPoint();
	            m_touchSecondPoint = new FCPoint();
		        var clx = clientX(m_mouseDownView);
		        var cly = clientY(m_mouseDownView);
	            if (evt.touches.length >= 1) {
		            m_firstTouch = true;
		            m_touchFirstPoint = getMousePostion(evt.touches[0], canvas);
		            m_touchFirstPoint.x -= clx;
		            m_touchFirstPoint.y -= cly;
	            }
	            if (evt.touches.length >= 2) {
		            m_secondTouch = true;
		            m_touchSecondPoint = getMousePostion(evt.touches[1], canvas);
		            m_touchSecondPoint.x -= clx;
		            m_touchSecondPoint.y -= cly;
	            }
	            if(callBack){
	                callBack(m_mouseDownView, m_firstTouch, m_secondTouch, m_touchFirstPoint, m_touchSecondPoint);
	            }
	        }
	    }
    };
};

/*
* 添加触摸移动的方法
* canvas:图层
* callBack:回调函数
*/
var addTouchMoveEvent = function(canvas, callBack){
    canvas.ontouchmove = function (evt) {
        if(m_isMobile){
	        if (m_mouseDownView) {
	            m_firstTouch = false;
	            m_secondTouch = false;
	            m_touchFirstPoint = new FCPoint();
	            m_touchSecondPoint = new FCPoint();
		        var clx = clientX(m_mouseDownView);
				var cly = clientY(m_mouseDownView);
				var mp = getMousePostion(evt.touches[0], canvas);
	            if (evt.touches.length >= 1) {
		            m_firstTouch = true;
		            m_touchFirstPoint = getMousePostion(evt.touches[0], canvas);
		            m_touchPoint = new FCPoint(m_touchFirstPoint.x, m_touchFirstPoint.y);
		            m_touchFirstPoint.x -= clx;
		            m_touchFirstPoint.y -= cly;
	            }
	            if (evt.touches.length >= 2) {
		            m_secondTouch = true;
		            m_touchSecondPoint = getMousePostion(evt.touches[1], canvas);
		            m_touchSecondPoint.x -= clx;
		            m_touchSecondPoint.y -= cly;
	            }
	            if(callBack){
		            callBack(m_mouseDownView, m_firstTouch, m_secondTouch, m_touchFirstPoint, m_touchSecondPoint);
				}
				if (m_mouseDownView.m_allowDrag) {
					if (Math.abs(mp.x - m_mouseDownPoint.x) > 5 || Math.abs(mp.y - m_mouseDownPoint.y) > 5) {
						m_dragBeginRect = new FCRect(m_mouseDownView.m_location.x, m_mouseDownView.m_location.y,
							m_mouseDownView.m_location.x + m_mouseDownView.m_size.cx,
							m_mouseDownView.m_location.y + m_mouseDownView.m_size.cy);
						m_dragBeginPoint = new FCPoint(m_mouseDownPoint.x, m_mouseDownPoint.y);
						m_draggingView = m_mouseDownView;
						m_mouseDownView = null;
					}
				}
				if (m_mouseDownView && m_mouseDownView.m_allowDragScroll) {
					evt.preventDefault && evt.preventDefault();
					evt.returnValue = false;
					evt.stopPropagation && evt.stopPropagation();
				}
			}
			else if (m_draggingView != null) {
				var mp = getMousePostion(evt.touches[0], canvas);
				var offsetX = mp.x - m_dragBeginPoint.x;
				var offsetY = mp.y - m_dragBeginPoint.y;
				var newBounds = new FCRect(m_dragBeginRect.left + offsetX, m_dragBeginRect.top + offsetY,
					m_dragBeginRect.right + offsetX, m_dragBeginRect.bottom + offsetY);
				m_draggingView.m_location = new FCPoint(newBounds.left, newBounds.top);
				if (m_draggingView.m_parent) {
					if (m_draggingView.m_parent.m_paint) {
						invalidateView(m_draggingView.m_parent, m_draggingView.m_parent.m_paint);
					}
				} else {
					if (m_draggingView.m_paint) {
						invalidate(m_draggingView.m_paint);
					}
				}
				if (m_draggingView && m_draggingView.m_allowDragScroll) {
					evt.preventDefault && evt.preventDefault();
					evt.returnValue = false;
					evt.stopPropagation && evt.stopPropagation();
				}
			}
        }
        return false;
    };
};

/*
* 添加触摸结束的方法
* canvas:图层
* callBack:回调函数
*/
var addTouchEndEvent = function(canvas, callBack, clickCallBack){
    canvas.ontouchend = function (evt) {
		if (m_isMobile) {
            if (m_mouseDownView){
                 var mouseDownView = m_mouseDownView;
	            var mp = m_touchPoint;
	            var view = findView(mp, canvas.m_views);
		        if(view != null && view == m_mouseDownView) {
	                if(clickCallBack){
	                    var cmp = new FCPoint(mp.x - clientX(m_mouseDownView), mp.y - clientY(m_mouseDownView));
	                    clickCallBack(m_mouseDownView, cmp, 1, 1, 0);
	                }
	            }
	            m_mouseDownView = null;
	            if(callBack){
	                callBack(mouseDownView, m_firstTouch, m_secondTouch, m_touchFirstPoint, m_touchSecondPoint);
	            }
			}
			m_draggingView = null;
        }
    };
};

/*
* 加载FaceCat
*/
var renderFaceCat = function(paint, xml, size){
    var xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
    var rootNode = xmlDoc.getElementsByTagName('body')[0];
    readXmlNode(paint, rootNode, null);
    for(var i = 0; i < paint.m_canvas.m_views.length; i++){
        if(paint.m_canvas.m_views[i].m_dock == "fill"){
            paint.m_canvas.m_views[i].m_size = size;
        }
    }
    updateView(paint.m_canvas.m_views);
    invalidate(m_paint);
};

/*
* 显示或隐藏输入框
*/
var showOrHideInput = function(views){
    for(var i = 0; i < views.length; i++){
        var view = views[i];
        var paintVisible = isPaintVisible(view);
        if(view.m_views){
            showOrHideInput(view.m_views);
        }
        if(view.m_input){
            var clipRect = view.m_clipRect;
            if(clipRect){
                var canvas = view.m_paint.m_canvas;
  	            var rect = canvas.getBoundingClientRect();
  	            var newTop = rect.top + document.documentElement.scrollTop;
  	            var newLeft = rect.left + document.documentElement.scrollLeft;
  	            var relativeRect = new FCRect((newLeft + clipRect.left) * canvas.m_paint.m_scaleFactorX, (newTop + clipRect.top) * canvas.m_paint.m_scaleFactorY, (newLeft + clipRect.right)  * canvas.m_paint.m_scaleFactorX, (newTop + clipRect.bottom) * canvas.m_paint.m_scaleFactorY);
                 view.m_input.style.left = relativeRect.left + "px";
                view.m_input.style.top = relativeRect.top + "px";
                 view.m_input.style.width = (relativeRect.right - relativeRect.left) + "px";
                 view.m_input.style.height = (relativeRect.bottom - relativeRect.top) + "px";
                 view.m_input.style.backgroundColor = view.m_backColor;
                 view.m_input.style.border = "1px solid " + view.m_borderColor;
                 view.m_input.style.color = view.m_textColor;
                 if(paintVisible){
                    view.m_input.style.display = "block";
                 }else{
                    view.m_input.style.display = "none";
                 }
             }
        }
    }         
};

/*
* 是否移动端
*/
var isMobileMode = function(){
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
    return isMobile;
};