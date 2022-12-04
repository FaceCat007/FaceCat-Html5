/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 分割图层
*/
function FCSplitLayoutDiv() {
	this.m_views = new Array(); //子视图
	this.m_displayOffset = true; //是否显示偏移量
	this.m_type = "split"; //类型
	this.m_firstView = null; //第一个视图
	this.m_secondView = null; //第二个视图
	this.m_splitMode = "absolutesize"; //分割模式 percentsize百分比 或absolutesize绝对值
	this.m_splitPercent = -1; //分割百分比
	this.m_splitter = null; //分割线 
	this.m_layoutStyle = "lefttoright"; //分割方式
	this.m_oldSize = new FCSize(0,0); //上次的尺寸
	this.m_visible = true; //是否可以
	this.m_allowDragScroll = false;
};

FCSplitLayoutDiv.prototype = FCView;

/*
* 重置分割线的布局
*/
var resetSplitLayoutDiv = function(split){
    var reset = false;
    var splitRect = new FCRect(0, 0, 0, 0);
    var width = split.m_size.cx, height = split.m_size.cy;
    var fRect = new FCRect(0, 0, 0, 0);
    var sRect = new FCRect(0, 0, 0, 0);
    var splitterSize = new FCSize(0, 0);
    if(split.m_splitter.m_visible){
        splitterSize.cx = split.m_splitter.m_size.cx;
        splitterSize.cy = split.m_splitter.m_size.cy;
    }
    var layoutStyle = split.m_layoutStyle;
    if (layoutStyle == "bottomtotop") {
        if (split.m_splitMode == "absolutesize" || split.m_oldSize.cy == 0){
            splitRect.left = 0;
            splitRect.top = height - (split.m_oldSize.cy - split.m_splitter.m_location.y);
            splitRect.right = width;
            splitRect.bottom = splitRect.top + splitterSize.cy;
        }
        else if (split.m_splitMode == "percentsize") {
            splitRect.left = 0;
            if (split.m_splitPercent == -1) {
                split.m_splitPercent = split.m_splitter.m_location.y / split.m_oldSize.cy;
            }
            splitRect.top = height * split.m_splitPercent;
            splitRect.right = width;
            splitRect.bottom = splitRect.top + splitterSize.cy;
        }
        fRect.left = 0;
        fRect.top = splitRect.bottom;
        fRect.right = width;
        fRect.bottom = height;
        sRect.left = 0;
        sRect.top = 0;
        sRect.right = width;
        sRect.bottom = splitRect.top;
    }
    else if(layoutStyle == "lefttoright"){
        if (split.m_splitMode == "absolutesize" || split.m_oldSize.cx == 0){
            splitRect.left = split.m_splitter.m_location.x;
            splitRect.top = 0;
            splitRect.right = splitRect.left + splitterSize.cx;
            splitRect.bottom = height;
        }
        else if (split.m_splitMode == "percentsize"){
            if(split.m_splitPercent == -1){
                split.m_splitPercent = split.m_splitter.m_location.x / split.m_oldSize.cx;
            }
            splitRect.left = width * split.m_splitPercent;
            splitRect.top = 0;
            splitRect.right = splitRect.left + splitterSize.cx;
            splitRect.bottom = height;
        }
        fRect.left = 0;
        fRect.top = 0;
        fRect.right = splitRect.left;
        fRect.bottom = height;
        sRect.left = splitRect.right;
        sRect.top = 0;
        sRect.right = width;
        sRect.bottom = height;
    }
    else if(layoutStyle == "righttoleft"){
        if (split.m_splitMode == "absolutesize" || split.m_oldSize.cx == 0){
            splitRect.left = width - (split.m_oldSize.cx - split.m_splitter.m_location.x);
            splitRect.top = 0;
            splitRect.right = splitRect.left + splitterSize.cx;
            splitRect.bottom = height;
        }
        else if (split.m_splitMode == "percentsize"){
            if(split.m_splitPercent == -1){
                split.m_splitPercent = split.m_splitter.m_location.x / split.m_oldSize.cx;
            }
            splitRect.left = width * split.m_splitPercent;
            splitRect.top = 0;
            splitRect.right = splitRect.left + splitterSize.cx;
            splitRect.bottom = height;
        }
        fRect.left = splitRect.right;
        fRect.top = 0;
        fRect.right = width;
        fRect.bottom = height;
        sRect.left = 0;
        sRect.top = 0;
        sRect.right = splitRect.left;
        sRect.bottom = height;
    }
    else if(layoutStyle == "toptobottom"){
        if (split.m_splitMode == "absolutesize" || split.m_oldSize.cy == 0){
            splitRect.left = 0;
            splitRect.top = split.m_splitter.m_location.y;
            splitRect.right = width;
            splitRect.bottom = splitRect.top + splitterSize.cy;
        }
        else if (split.m_splitMode == "percentsize"){
            splitRect.left = 0;
            if(split.m_splitPercent == -1){
                split.m_splitPercent = split.m_splitter.m_location.y / split.m_oldSize.cy;
            }
            splitRect.top = height * split.m_splitPercent;
            splitRect.right = width;
            splitRect.bottom = splitRect.top + splitterSize.cy;
        }
        fRect.left = 0;
        fRect.top = 0;
        fRect.right = width;
        fRect.bottom = splitRect.top;
        sRect.left = 0;
        sRect.top = splitRect.bottom;
        sRect.right = width;
        sRect.bottom = height;
    }
    if(split.m_splitter.m_visible){
        var spRect = new FCRect(split.m_splitter.m_location.x,  split.m_splitter.m_location.y, split.m_splitter.m_location.x + split.m_splitter.m_size.cx, split.m_splitter.m_location.y + split.m_splitter.m_size.cy);
        if (spRect.left != splitRect.left || spRect.top != splitRect.top || spRect.right != splitRect.right || spRect.bottom != splitRect.bottom){
            split.m_splitter.m_location = new FCPoint(splitRect.left, splitRect.top);
            split.m_splitter.m_size = new FCSize(splitRect.right - splitRect.left, splitRect.bottom - splitRect.top);
            reset = true;
        }
    }
    var fcRect = new FCRect(split.m_firstView.m_location.x,  split.m_firstView.m_location.y, split.m_firstView.m_location.x + split.m_firstView.m_size.cx, split.m_firstView.m_location.y + split.m_firstView.m_size.cy);
    if (fcRect.left != fRect.left || fcRect.top != fRect.top || fcRect.right != fRect.right || fcRect.bottom != fRect.bottom){
        reset = true;
        split.m_firstView.m_location = new FCPoint(fRect.left, fRect.top);
        split.m_firstView.m_size = new FCSize(fRect.right - fRect.left, fRect.bottom - fRect.top);
    }
    var scRect = new FCRect(split.m_secondView.m_location.x,  split.m_secondView.m_location.y, split.m_secondView.m_location.x + split.m_secondView.m_size.cx, split.m_secondView.m_location.y + split.m_secondView.m_size.cy);
    if (scRect.left != sRect.left || scRect.top != sRect.top || scRect.right != sRect.right || scRect.bottom != sRect.bottom){
        reset = true;
        split.m_secondView.m_location = new FCPoint(sRect.left, sRect.top);
        split.m_secondView.m_size = new FCSize(sRect.right - sRect.left, sRect.bottom - sRect.top);
    }
    split.m_oldSize = new FCSize(width, height);
    return reset;
};