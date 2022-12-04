/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 文本框
*/
function FCTextBox() { 
	this.m_displayOffset = true; //是否显示偏移量
	this.m_visible = true; //是否可见
	this.m_type = "textbox"; //类型
	this.m_font = "12px Arial"; //字体
	this.m_input = null; //输入框
};

FCTextBox.prototype = FCView;

/*
* 单选按钮
*/
function FCComboBox() { 
	this.m_displayOffset = true; //是否显示偏移量
	this.m_visible = true; //是否可见
	this.m_type = "combobox"; //类型
	this.m_font = "12px Arial"; //字体
	this.m_selectedIndex = -1; //选中索引
	this.m_input = null; //输入框
};

FCComboBox.prototype = FCView;

/*
* 数值框
*/
function FCSpin(){
    this.m_displayOffset = true; //是否显示偏移量
	this.m_visible = true; //是否可见
	this.m_type = "spin"; //类型
	this.m_font = "12px Arial"; //字体
	this.m_input = null; //输入框
};

FCSpin.prototype = FCView;

/*
* 日期框
*/
function FCDatePicker(){
    this.m_displayOffset = true; //是否显示偏移量
	this.m_visible = true; //是否可见
	this.m_type = "datepicker"; //类型
	this.m_font = "12px Arial"; //字体
	this.m_input = null; //输入框
};

FCDatePicker.prototype = FCView;

/*
* 日期框
*/
function FCImage(){
    this.m_displayOffset = true; //是否显示偏移量
	this.m_visible = true; //是否可见
	this.m_type = "image"; //类型
	this.m_input = null; //输入框
	this.m_src = ""; //图片路径
};

FCImage.prototype = FCView;

/*
* 创建文本框实体
* textBox:文本框
*/
var createInputTextBox = function(textBox){
    var input = document.createElement("input" ); 
    textBox.m_input = input;
    input.m_input = textBox;
    input.type = "text" ;
    input.style.position = "absolute";
    if(textBox.m_font && textBox.m_paint && textBox.m_paint.m_scaleFactorX != 1 || textBox.m_paint.m_scaleFactorY != 1){
        var newFont = "";
        var strs = textBox.m_font.split(' ');
        for(var i = 0; i < strs.length; i++){
            if(i == 0){
                var px = strs[i].replace("px", "");
                newFont += Math.min(textBox.m_paint.m_scaleFactorX, textBox.m_paint.m_scaleFactorY) * parseFloat(px) + "px";
            }else{
	            newFont += strs[i];
            }
            if(i != strs.length){
                newFont += " ";
            }
        }
        input.style.font = newFont;
    }else{
        input.style.font = textBox.m_font;
    }
    document.body.appendChild(input);
    input.text = textBox.m_text;
};

/*
* 创建数值框实体
*/
var createInputComboBox = function(comboBox){
    var input = document.createElement("select" ); 
    input.m_input = comboBox;
    comboBox.m_input = input;
    input.style.position = "absolute";
    if(comboBox.m_font && comboBox.m_paint && comboBox.m_paint.m_scaleFactorX != 1 || comboBox.m_paint.m_scaleFactorY != 1){
        var newFont = "";
        var strs = comboBox.m_font.split(' ');
        for(var i = 0; i < strs.length; i++){
            if(i == 0){
                var px = strs[i].replace("px", "");
                newFont += Math.min(comboBox.m_paint.m_scaleFactorX, comboBox.m_paint.m_scaleFactorY) * parseFloat(px) + "px";
            }else{
	            newFont += strs[i];
            }
            if(i != strs.length){
                newFont += " ";
            }
        }
        input.style.font = newFont;
    }else{
        input.style.font = comboBox.m_font;
    }
    document.body.appendChild(input);
    input.text = comboBox.m_text;
};

/*
* 创建日期框实体
*/
var createInputDatePicker = function(datePicker){
     var input = document.createElement("input" ); 
    datePicker.m_input = input;
    input.m_input = datePicker;
    input.type = "date" ;
    input.style.position = "absolute";
    if(datePicker.m_font && datePicker.m_paint && datePicker.m_paint.m_scaleFactorX != 1 || datePicker.m_paint.m_scaleFactorY != 1){
        var newFont = "";
        var strs = datePicker.m_font.split(' ');
        for(var i = 0; i < strs.length; i++){
            if(i == 0){
                var px = strs[i].replace("px", "");
                newFont += Math.min(datePicker.m_paint.m_scaleFactorX, datePicker.m_paint.m_scaleFactorY) * parseFloat(px) + "px";
            }else{
	            newFont += strs[i];
            }
            if(i != strs.length){
                newFont += " ";
            }
        }
        input.style.font = newFont;
    }else{
        input.style.font = datePicker.m_font;
    }
    document.body.appendChild(input);
    input.text = datePicker.m_text;
};

/*
* 创建图片框实体
*/
var createInputImage = function(image){
     var input = document.createElement("img" ); 
    image.m_input = input;
    input.m_input = image;
    input.style.position = "absolute";
    document.body.appendChild(input);
    input.src = image.m_src;
};