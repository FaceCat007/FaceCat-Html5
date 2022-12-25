/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 复选按钮
*/
function FCCheckBox() { 
	this.m_displayOffset = true; //是否显示偏移量
	this.m_visible = true; //是否可见
	this.m_type = "checkbox"; //类型
	this.m_buttonSize = new FCSize(16,16); //按钮的大小
	this.m_checked = true; //是否选中
	this.m_font = "12px Arial"; //字体
};

FCCheckBox.prototype = FCView;

/*
* 单选按钮
*/
function FCRadioButton() { 
	this.m_displayOffset = true; //是否显示偏移量
	this.m_visible = true; //是否可见
	this.m_type = "radiobutton"; //类型
	this.m_buttonSize = new FCSize(16,16); //按钮的大小
	this.m_checked = false; //是否选中
	this.m_font = "12px Arial"; //字体
	this.m_groupName = ""; //组别
};

FCRadioButton.prototype = FCView;

/*
* 重绘复选按钮
* checkBox:视图
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawCheckBox = function(checkBox, paint, clipRect){
    var width = checkBox.m_size.cx, height = checkBox.m_size.cy;
    if(checkBox.m_textColor){
        var eRight = checkBox.m_buttonSize.cx + 10;
        var eRect = new FCRect(1, (height - checkBox.m_buttonSize.cy) / 2, checkBox.m_buttonSize.cx + 1, (height + checkBox.m_buttonSize.cy) / 2);
        paint.drawRect(checkBox.m_textColor, 1, 0, eRect.left, eRect.top, eRect.right, eRect.bottom);
        if(checkBox.m_checked){
            eRect.left += 2;
            eRect.top += 2;
            eRect.right -= 2;
            eRect.bottom -= 2;
            paint.fillRect(checkBox.m_textColor, eRect.left, eRect.top, eRect.right, eRect.bottom);
        }
        paint.drawText(checkBox.m_text, checkBox.m_textColor, checkBox.m_font, eRight, height / 2 + 1);
    }
};

/*
* 重绘单选按钮
* radioButton:视图
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawRadioButton = function(radioButton, paint, clipRect){
    var width = radioButton.m_size.cx, height = radioButton.m_size.cy;
    if(radioButton.m_textColor){
        var eRight = radioButton.m_buttonSize.cx + 10;
        var eRect = new FCRect(1, (height - radioButton.m_buttonSize.cy) / 2, radioButton.m_buttonSize.cx + 1, (height + radioButton.m_buttonSize.cy) / 2);
        paint.drawEllipse(radioButton.m_textColor, 1, 0, eRect.left, eRect.top, eRect.right, eRect.bottom);
        if(radioButton.m_checked){
            eRect.left += 2;
            eRect.top += 2;
            eRect.right -= 2;
            eRect.bottom -= 2;
            paint.fillEllipse(radioButton.m_textColor, eRect.left, eRect.top, eRect.right, eRect.bottom);
        }
        paint.drawText(radioButton.m_text, radioButton.m_textColor, radioButton.m_font, eRight, height / 2 + 1);
    }
};

/*
* 点击复选按钮
* checkBox:视图
*/
var clickCheckBox = function(checkBox, mp){
    checkBox.m_checked = !checkBox.m_checked;
};

/*
* 点击单选按钮
* radioButton:视图
*/
var clickRadioButton = function(radioButton, mp){
    var hasOther = false;
    if(radioButton.m_parent && radioButton.m_parent.m_views){
        for(var i = 0; i < radioButton.m_parent.m_views.length; i++){
            var rView = radioButton.m_parent.m_views[i];
            if(rView != radioButton && 
            rView.m_groupName == radioButton.m_groupName){
                rView.m_checked = false;
            }
        }
    }
    radioButton.m_checked = true;
};

/*
* 重绘按钮
* button:视图
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawButton = function (button, paint, clipRect) {
    if (button == m_mouseDownView) {
        if (button.m_pushedColor) {
            paint.fillRect(button.m_pushedColor, 0, 0, button.m_size.cx, button.m_size.cy);
        } else {
            if (button.m_backColor) {
                paint.fillRect(button.m_backColor, 0, 0, button.m_size.cx, button.m_size.cy);
            }
        }
    } else if (button == m_mouseMoveView) {
        if (button.m_hoveredColor) {
            paint.fillRect(button.m_hoveredColor, 0, 0, button.m_size.cx, button.m_size.cy);
        } else {
            if (button.m_backColor) {
                paint.fillRect(button.m_backColor, 0, 0, button.m_size.cx, button.m_size.cy);
            }
        }
    }
    else if (button.m_backColor) {
        paint.fillRect(button.m_backColor, 0, 0, button.m_size.cx, button.m_size.cy);
    }
    if(button.m_backImage && button.m_backImage.length > 0){
        if(!button.m_image){
            button.m_image = new Image();
            button.m_image.onload = function(){ invalidateView(button, paint);}; 
            button.m_image.src = button.m_backImage;
        }else{
            paint.drawImage(button.m_image, 0, 0, button.m_size.cx, button.m_size.cy);
        }
    }
    if(button.m_textColor && button.m_text){
        var tSize = paint.textSize(button.m_text, button.m_font);
        paint.drawText(button.m_text, button.m_textColor, button.m_font, (button.m_size.cx - tSize.cx) / 2, button.m_size.cy / 2 + 1);
    }
    if(button.m_borderColor){
        paint.drawRect(button.m_borderColor, 1, 0, 0, 0, button.m_size.cx, button.m_size.cy);
    }
};