/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 
/*
* 多页夹
*/
function FCTabView() {
	this.m_views = new Array(); //子视图
	this.m_type = "tabview"; //类型
	this.m_backColor = "rgb(255,255,255)"; //背景色
	this.m_borderColor = "rgb(0,0,0)"; //边线色
	this.m_tabPages = new Array(); //页夹集合
	this.m_layout = "top"; //布局方式
	this.m_underLineColor = null;//下划线的颜色
	this.m_underLineSize = null; //下划线的宽度
	this.m_underPoint = null; //下划点
	this.m_useAnimation = false; //是否使用动画
	this.m_animationSpeed = 20; //动画速度
	this.m_visible = true; //是否可见
};

FCTabView.prototype = FCView;

/*
* 页
*/
function FCTabPage(){
	this.m_backColor = "rgb(255,255,255)"; //背景色
	this.m_borderColor = "rgb(0,0,0)"; //边线色
	this.m_type = "tabpage"; //类型
	this.m_headerButton = null; //页头的按钮
	this.m_visible = false; //是否可见
};

FCTabPage.prototype = FCView;

/*
* 更新页的布局
* tabView:多页夹
* tabPage:页
* left:左侧坐标
* top:上方坐标
* width:宽度
* height:高度
* tw:页头按钮的宽度
* th:页头按钮的高度
*/
var updataPageLayout = function(tabView, tabPage, left, top, width, height, tw, th){
	var newBounds = new FCRect(0, 0, 0, 0);
	if(tabView.m_layout == "bottom"){
		newBounds.left = 0;
		newBounds.top = 0;
		newBounds.right = width;
		newBounds.bottom = height - th;
		tabPage.m_headerButton.m_location = new FCPoint(left, height - th);
	}else if(tabView.m_layout == "left"){
		newBounds.left = tw;
		newBounds.top = 0;
		newBounds.right = width;
		newBounds.bottom = height;
		tabPage.m_headerButton.m_location = new FCPoint(0, top);
	}else if(tabView.m_layout == "right"){
		newBounds.left = 0;
		newBounds.top = 0;
		newBounds.right = width - tw;
		newBounds.bottom = height;
		tabPage.m_headerButton.m_location = new FCPoint(width - tw, top);
	}else if(tabView.m_layout == "top"){
		newBounds.left = 0;
		newBounds.top = th;
		newBounds.right = width;
		newBounds.bottom = height;
		tabPage.m_headerButton.m_location = new FCPoint(left, 0);
	}
	tabPage.m_location = new FCPoint(newBounds.left, newBounds.top);
	tabPage.m_size = new FCSize(newBounds.right - newBounds.left, newBounds.bottom - newBounds.top);
};

/*
* 更新多页夹的布局
* tabView:多页夹
*/
var updateTabLayout = function(tabView){
	var width = tabView.m_size.cx;
	var height = tabView.m_size.cy;
	var left = 0, top = 0;
	for(var i = 0; i < tabView.m_tabPages.length; i++){
		var tabPage = tabView.m_tabPages[i];
		var headerButton = tabView.m_tabPages[i].m_headerButton;
		if(headerButton.m_visible){
			var tw = headerButton.m_size.cx;
			var th = headerButton.m_size.cy;
			updataPageLayout(tabView, tabPage, left, top, width, height, tw, th);
			left += tw;
			top += th;
		}else{
			tabPage.m_visible = false;
		}
	}
};

/*
* 添加页
* tabView:多页夹
* tabPage:页
* tabButton:页头按钮
*/
var addTabPage = function(tabView, tabPage, tabButton){
	tabPage.m_headerButton = tabButton;
	tabPage.m_parent = tabView;
	tabPage.m_paint = tabView.m_paint;
	tabButton.m_parent = tabView;
	tabButton.m_paint = tabView.m_paint;
	tabView.m_tabPages.push(tabPage);
	tabView.m_views.push(tabPage);
	tabView.m_views.push(tabButton);
};

/*
* 移除页
* tabView:多页夹
* tabPage:页
*/ 
var removeTabPage = function(tabView, tabPage){
	var headerButton = tabPage.m_headerButton;
	for(var i = 0; i < tabView.m_views.length; i++){
		if(tabView.m_views[j] == headerButton){
			tabView.m_views.splice(i, 1);
			break;
		}
	}
	for(var i = 0; i < tabView.m_views.length; i++){
		if(tabView.m_views[j] == tabPage){
			tabView.m_views.splice(i, 1);
			break;
		}
	}
	for(var i = 0; i < tabView.m_tabPages.length; i++){
		if(tabView.m_tabPages[i] == tabPage){
			tabView.m_tabPages.splice(i, 1);
			break;
		}
	}
};

/*
* 选中页
* tabView:多页夹
* tabPage:页
*/
var selectTabPage = function(tabView, tabPage){
	for(var i = 0; i < tabView.m_tabPages.length; i++){
		var tp = tabView.m_tabPages[i];
		if(tp == tabPage){
			tp.m_visible = true;
		}else{
			tp.m_visible = false;
		}
	}
	updateTabLayout(tabView);
};

//动画中的页夹
var m_animationTabPages = new Array();

/*
* 检查页的动画
*/
var checkTabPageAnimation = function(){
    if(m_animationTabPages.length > 0){
        for(var i = 0; i < m_animationTabPages.length; i++){
            var tp = m_animationTabPages[i];
            if(tp.m_parent){
                if(tp.m_parent.m_underPoint){
                    var location = tp.m_headerButton.m_location;
                    if(location.x > tp.m_parent.m_underPoint.x){
                        tp.m_parent.m_underPoint.x += tp.m_parent.m_animationSpeed;
                    }
                    else if(location.x < tp.m_parent.m_underPoint.x){
                        tp.m_parent.m_underPoint.x -= tp.m_parent.m_animationSpeed;
                    }
                     if(location.y > tp.m_parent.m_underPoint.y){
                        tp.m_parent.m_underPoint.y += tp.m_parent.m_animationSpeed;
                    }
                    else if(location.y < tp.m_parent.m_underPoint.y){
                        tp.m_parent.m_underPoint.y -= tp.m_parent.m_animationSpeed;
                    }
                    if(Math.abs(location.x - tp.m_parent.m_underPoint.x) <= tp.m_parent.m_animationSpeed && Math.abs(location.y - tp.m_parent.m_underPoint.y) <= tp.m_parent.m_animationSpeed){
                        tp.m_parent.m_underPoint = null;
                        m_animationTabPages.splice(i, 1);
                    }
                }
                if(tp.m_parent.m_paint){
                    invalidateView(tp.m_parent, tp.m_parent.m_paint);
                }
            }else{
                m_animationTabPages.splice(i, 1);
            }
            break;
        }
    }
};

setInterval(checkTabPageAnimation, 20);

/*
* 开始页夹的动画
*/
var startTabPageAnimation = function(newPage, oldPage){
    if(newPage.m_parent){
        if(newPage == oldPage){
            newPage.m_parent.m_underPoint = null;
            if(newPage.m_parent.m_paint){
                invalidateView(newPage.m_parent, newPage.m_parent.m_paint);
            }
        }else{
            if(newPage.m_parent.m_useAnimation){
                newPage.m_parent.m_underPoint = new FCPoint(oldPage.m_headerButton.m_location.x, oldPage.m_headerButton.m_location.y);
                var hasTabPage = false;
                for(var i = 0; i < m_animationTabPages.length; i++){
	                var tp = m_animationTabPages[i];
	                if(tp == newPage){
	                    hasTabPage = true;
	                    break;
	                }
	            }
	            if(!hasTabPage){
	                m_animationTabPages.push(newPage);
	            }
            }
        }
    }
};

/*
* 重绘多页加
* tabView:多页夹
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawTabViewBorder = function(tabView, paint, clipRect){
 if(tabView.m_underLineColor){
        for(var i = 0; i < tabView.m_tabPages.length; i++){
	        var tp = tabView.m_tabPages[i];
	        if(tp.m_visible){
	            var headerButton = tp.m_headerButton;
	            var location = new FCPoint(headerButton.m_location.x, headerButton.m_location.y);
	            var size = headerButton.m_size;
	            if(tabView.m_useAnimation){
                   if(tabView.m_underPoint){
                      location.x = tabView.m_underPoint.x;
                      location.y = tabView.m_underPoint.y;
                   }
                }
	            if(tabView.m_layout == "bottom"){
	                paint.fillRect(tabView.m_underLineColor, location.x, location.y, location.x + size.cx, location.y + tabView.m_underLineSize);
                }else if(tabView.m_layout == "left"){
                    paint.fillRect(tabView.m_underLineColor, location.x + size.cx - tabView.m_underLineSize, location.y, location.x + size.cx, location.y + size.cy);
                }else if(tabView.m_layout == "top"){
                     paint.fillRect(tabView.m_underLineColor, location.x, location.y + size.cy - tabView.m_underLineSize, location.x + size.cx, location.y + size.cy);
                }
                else if(tabView.m_layout == "right"){
                    paint.fillRect(tabView.m_underLineColor, location.x, location.y, location.x + tabView.m_underLineSize, location.y + size.cy);
                }
	            break;
	        }
        }
    }
};
