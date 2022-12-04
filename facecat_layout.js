/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 布局图层
*/
function FCLayoutDiv() { 
    this.m_scrollV = 0; //纵向滚动
	this.m_scrollH = 0; //横向滚动
	this.m_views = new Array(); //子视图
	this.m_showHScrollBar = true; //是否显示横向滚动条
	this.m_showVScrollBar = true; //是否显示横向滚动条
	this.m_scrollBarColor = "rgb(100,100,100)";
	this.m_allowDragScroll = true; //是否允许拖动滚动
	this.m_downScrollHButton = false; //是否按下横向滚动条
	this.m_downScrollVButton = false; ////是否按下纵向滚动条
	this.m_startScrollH = 0; //开始滚动的值
	this.m_startScrollV = 0; //结束滚动的值
	this.m_startPoint = new FCPoint(); //起始点
	this.m_mouseDownTime = 0; //鼠标按下的时间
	this.m_displayOffset = true; //是否显示偏移量
	this.m_scrollSize = 10; //滚动条大小
	this.m_visible = true; //是否可见
	
	this.m_type = "layout"; //类型
	this.m_layoutStyle = "lefttoright"; //分割方式
	this.m_autoWrap = false; //是否自动换行
};

FCLayoutDiv.prototype = FCDiv;

/*
* 重置布局图层
* layout:布局层
*/
var resetLayoutDiv = function(layout){
    var reset = false;
    var padding = new FCPadding(0, 0, 0, 0);
    if(layout.m_padding){
        padding = layout.m_padding;
    }
    var vPos = 0, left = padding.left, top = padding.top, width = layout.m_size.cx - padding.left - padding.right, height = layout.m_size.cy - padding.top - padding.bottom;
    for(var i = 0; i < layout.m_views.length; i++){
        var view = layout.m_views[i];
        if(view.m_visible){
            var size = view.m_size;
            var margin = new FCPadding(0, 0, 0, 0);
            if(view.m_margin){
                margin = view.m_margin;
            }
            var cLeft = view.m_location.x, cTop = view.m_location.y, cWidth = size.cx, cHeight = size.cy;
            var nLeft = cLeft, nTop = cTop, nWidth = cWidth, nHeight = cHeight;
            if(layout.m_layoutStyle == "bottomtotop"){
                if (i == 0){
                    top = height - padding.top;
                }
                var lWidth = 0;
                if (layout.m_autoWrap){
                    lWidth = size.cx;
                    var lTop = top - margin.top - cHeight - margin.bottom;
                    if (lTop < padding.top){
                        if(vPos != 0){
                            left += cWidth + margin.left;
                        }
                        top = height - padding.top;
                    }
                }
                else{
                    lWidth = width - margin.left - margin.right;
                }
                top -= cHeight + margin.bottom;
                nLeft = left + margin.left;
                nWidth = lWidth;
                nTop = top;
            }else if(layout.m_layoutStyle == "lefttoright"){
                var lHeight = 0;
                if (layout.m_autoWrap){
                    lHeight = size.cy;
                    var lRight = left + margin.left + cWidth + margin.right;
                    if (lRight > width){
                        left = padding.left;
                        if(vPos != 0){
                            top += cHeight + margin.top;
                        }
                    }
                }
                else{
                    lHeight = height - margin.top - margin.bottom;
                }
                left += margin.left;
                nLeft = left;
                nTop = top + margin.top;
                nHeight = lHeight;
                left += cWidth + margin.right;
            }else if(layout.m_layoutStyle == "righttoleft"){
                if (i == 0){
                    left = width - padding.left;
                }
                var lHeight = 0;
                if (layout.m_autoWrap){
                    lHeight = size.cy;
                    var lLeft = left - margin.left - cWidth - margin.right;
                    if (lLeft < padding.left){
                        left = width - padding.left;
                        if(vPos != 0){
                            top += cHeight + margin.top;
                        }
                    }
                }
                else{
                    lHeight = height - margin.top - margin.bottom;
                }
                left -= cWidth + margin.left;
                nLeft = left;
                nTop = top + margin.top;
                nHeight = lHeight;
            }else if(layout.m_layoutStyle == "toptobottom"){
                var lWidth = 0;
                if (layout.m_autoWrap){
                    lWidth = size.cx;
                    var lBottom = top + margin.top + cHeight + margin.bottom;
                    if (lBottom > height){
                        if(vPos != 0){
                            left += cWidth + margin.left + margin.right;
                        }
                        top = padding.top;
                    }
                }
                else{
                    lWidth = width - margin.left - margin.right;
                }
                top += margin.top;
                nTop = top;
                nLeft = left + margin.left;
                nWidth = lWidth;
                top += cHeight + margin.bottom;
            }
            if (cLeft != nLeft || cTop != nTop || cWidth != nWidth || cHeight != nHeight){
                view.m_location = new FCPoint(nLeft, nTop);
                view.m_size = new FCSize(nWidth, nHeight);
                reset = true;
            }
            vPos++;
        }
    }
    return reset;
};
