/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 证券数据结构
*/
function SecurityData() {
	this.m_amount = 0; //成交额
	this.m_close = 0; //收盘价
	this.m_date = 0; //日期，为1970年到现在的秒
	this.m_high = 0; //最高价
	this.m_low = 0; //最低价
	this.m_open = 0; //开盘价
	this.m_volume = 0; //成交额
	//拷贝数值
	this.copy = function(securityData) {
		this.m_amount = securityData.m_amount;
		this.m_close = securityData.m_close;
		this.m_date = securityData.m_date;
		this.m_high = securityData.m_high;
		this.m_low = securityData.m_low;
		this.m_open = securityData.m_open;
		this.m_volume = securityData.m_volume;
	}
};

/*
 * 基础图形
 */
function BaseShape() {
    this.m_divIndex = 0; //所在层
    this.m_type = "line"; //类型
    this.m_lineWidth = 1; //线的宽度
    this.m_color = "none"; //颜色
    this.m_color2 = "none"; //颜色2
    this.m_datas = new Array(); //第一组数据
    this.m_datas2 = new Array(); //第二组数据
    this.m_title = ""; //第一个标题
    this.m_title2 = ""; //第二个标题
    this.m_name = ""; //名称
    this.m_style = ""; //样式
};

/*
* 画线工具结构
*/
function FCPlot() {
    this.m_plotType = "Line"; //线的类型
    this.m_lineColor = "rgb(255,255,255)"; //线的颜色
    this.m_pointColor = "rgba(255,255,255,0.5)"; //线的颜色
    this.m_lineWidth = 1; //线的宽度
    this.m_key1 = null; //第一个键
    this.m_value1 = null; //第一个值
    this.m_key2 = null; //第二个键
    this.m_value2 = null; //第二个值
    this.m_key3 = null; //第三个键
    this.m_value3 = null; //第三个值
    this.m_startKey1 = null; //移动前第一个键
    this.m_startValue1 = null; //移动前第一个值
    this.m_startKey2 = null; //移动前第二个键
    this.m_startValue2 = null; //移动前第二个值
    this.m_startKey3 = null; //移动前第三个键
    this.m_startValue3 = null; //移动前第三个值
};

/*
* K线的结构
*/
function FCChart() {
    this.m_candleDistance = 0; //蜡烛线的距离
    this.m_hScalePixel = 11; //蜡烛线的宽度
    this.m_data = null; //K线数据
    this.m_downColor = "rgb(15,193,118)"; //下跌颜色
    this.m_leftVScaleWidth = 0; //左轴宽度
    this.m_rightVScaleWidth = 100; //右轴宽度
    this.m_upColor = "rgb(219,68,83)"; //上涨颜色
    this.m_firstVisibleIndex = -1; //起始可见的索引
    this.m_lastVisibleIndex = -1; //结束可见的索引
    this.m_hScaleHeight = 30; //X轴的高度
    this.m_scaleColor = "rgb(255,0,0)"; //刻度的颜色
    this.m_candleMax = 0; //蜡烛线的最大值
    this.m_candleMin = 0; //蜡烛线的最小值
    this.m_volMax = 0; //成交量层的最大值
    this.m_volMin = 0; //成交量层的最小值
    this.m_indMax = 0; //指标层的最大值
    this.m_indMin = 0; //指标层的最小值
    this.m_indMax2 = 0; //指标层2的最大值
    this.m_indMin2 = 0; //指标层2的最小值
    this.m_crossTipColor = "rgb(50,50,50)"; //十字线标识的颜色
    this.m_crossLineColor = "rgb(100,100,100)"; //十字线的颜色
    this.m_font = "12px Arial"; //字体
    this.m_candleDigit = 2; //K线层保留小数的位数
    this.m_volDigit = 0; //成交量层保留小数的位数
    this.m_indDigit = 2; //指标层保留小数的位数
    this.m_indDigit2 = 2; //指标层2保留小数的位数
    this.m_lastRecordIsVisible = true; //最后记录是否可见
    this.m_lastVisibleKey = 0; //最后可见的主键
    this.m_autoFillHScale = false; //是否填充满X轴
    this.m_candleDivPercent = 0.5; //K线层的占比
    this.m_volDivPercent = 0.2; //成交量层的占比
    this.m_indDivPercent = 0.3; //指标层的占比
    this.m_indDivPercent2 = 0.0; //指标层2的占比
    this.m_mainIndicator = "MA"; //主图指标
    this.m_showIndicator = "MACD"; //显示指标
    this.m_gridColor = "rgba(255,0,0,0.5)"; //网格颜色 
    this.m_magnitude = 1; //成交量的比例
    this.m_showCrossLine = true; //是否显示十字线
    this.m_candlePaddingTop = 30; //K线层的上边距
    this.m_candlePaddingBottom = 30; //K线层的下边距
    this.m_volPaddingTop = 20; //成交量层的上边距
    this.m_volPaddingBottom = 0; //成交量层的下边距
    this.m_indPaddingTop = 20; //指标层的上边距
    this.m_indPaddingBottom = 20; //指标层的下边距
    this.m_indPaddingTop2 = 20; //指标层2的上边距
    this.m_indPaddingBottom2 = 20; //指标层2的下边距
    this.m_vScaleDistance = 35; //纵轴的间隔
    this.m_vScaleType = "standard"; //纵轴的类型 log10代表指数坐标
    this.m_plots = new Array(); //画线的集合
    this.m_selectPlotPoint = -1; ////选中画线的点
    this.m_sPlot = null; //选中的画线
    this.m_startMovePlot = false; //选中画线
    this.m_crossStopIndex = -1; //鼠标停留位置
    this.m_cycle = "minute"; //周期
    this.m_mousePosition = new FCPoint(); //鼠标坐标
    this.m_lastValidIndex = -1; //最后有效数据索引
    //指标的缓存
    this.m_closearr = new Array();
    this.m_allema12 = new Array();
    this.m_allema26 = new Array();
    this.m_alldifarr = new Array();
    this.m_alldeaarr = new Array();
    this.m_allmacdarr = new Array();
    this.m_bollMap = {};
    this.m_biasMap = {};
    this.m_dmaMap = {};
    this.m_kdjMap = {};
    this.m_bbiMap = {};
    this.m_rocMap = {};
    this.m_rsiMap = {};
    this.m_wrMap = {};
    this.m_trixMap = {};
    this.m_maMap = {};
    this.m_cciArr = [];
    this.m_selectShape = ""; //选中的图形
    this.m_selectShapeEx = ""; //选中的图形信息
    this.m_type = "chart"; //类型
    this.m_allowDragScroll = true; //是否允许拖动滚动
    this.m_rightSpace = 0; //右侧空间
    this.m_visible = true; //是否可见
    this.m_shapes = new Array(); //扩展图形
};

//直线参数
var m_k_Chart = 0, m_b_Chart = 0, m_oX_Chart = 0, m_oY_Chart = 0, m_r_Chart = 0;
FCChart.prototype = FCView;
var m_indicatorColors = new Array(); //指标的颜色
m_indicatorColors.push("rgb(255,255,255)");
m_indicatorColors.push("rgb(255,255,0)");
m_indicatorColors.push("rgb(255,0,255)");
m_indicatorColors.push("rgb(255,0,0)");
m_indicatorColors.push("rgb(0,255,255)");
m_indicatorColors.push("rgb(0,255,0)");
m_indicatorColors.push("rgb(255,255,0)");
m_indicatorColors.push("rgb(255,255,255)");
var m_lineWidth_Chart = 1;
var m_plotPointSize_Chart = 5; //画线的选中点大小
var m_gridStep_Chart = 0; //网格计算临时变量
var m_gridDigit_Chart = 0; //网格计算临时变量
//拖动滚动的缓存
var m_firstIndexCache_Chart = -1;
var m_firstTouchIndexCache_Chart = -1;
var m_firstTouchPointCache_Chart = new FCPoint();
var m_lastIndexCache_Chart = -1;
var m_secondTouchIndexCache_Chart = -1;
var m_secondTouchPointCache_Chart = new FCPoint();

/*
* 格式化字符串
* fmt:格式化字符
* date:日期
*/
function dateFormat(fmt, date) {
    var ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (var k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
};


/*
* 计算直线参数
* mp:坐标
* x1:横坐标1
* y1:纵坐标1
* x2:横坐标2
* y2:纵坐标2
* oX:坐标起始X
* oY:坐标起始Y
*/
var lineXY = function(x1, y1, x2, y2, oX, oY){
    m_k_Chart = 0;
    m_b_Chart = 0;
    if ((x1 - oX) != (x2 - oX)) {
        m_k_Chart = ((y2 - oY) - (y1 - oY)) / ((x2 - oX) - (x1 - oX));
        m_b_Chart = (y1 - oY) - m_k_Chart * (x1 - oX);
    }
};

/*
* 判断是否选中直线
* mp:坐标
* x1:横坐标1
* y1:纵坐标1
* x2:横坐标2
* y2:纵坐标2
*/
var selectLine = function(mp, x1, y1, x2, y2){
    lineXY(x1, y1, x2, y2, 0, 0);
    if (!(m_k_Chart == 0 && m_b_Chart == 0)) {
        if (mp.y / (mp.x * m_k_Chart + m_b_Chart) >= 0.9 && mp.y / (mp.x * m_k_Chart + m_b_Chart) <= 1.1) {
            return true;
        }
    } else {
        if (mp.x >= x1 - m_plotPointSize_Chart && mp.x <= x1 + m_plotPointSize_Chart) {
            return true;
        }
    }
    return false;
};

/*
* 判断是否选中射线
* mp:坐标
* x1:横坐标1
* y1:纵坐标1
* x2:横坐标2
* y2:纵坐标2
*/
var selectRay = function(mp, x1, y1, x2, y2){
    lineXY(x1, y1, x2, y2, 0, 0);
    if (!(m_k_Chart == 0 && m_b_Chart == 0)) {
        if (mp.y / (mp.x * m_k_Chart + m_b_Chart) >= 0.9 && mp.y / (mp.x * m_k_Chart + m_b_Chart) <= 1.1) {
            if (x1 >= x2) {
                if (mp.x > x1 + m_plotPointSize_Chart) return false;
            } else if (x1 < x2) {
                if (mp.x < x1 - m_plotPointSize_Chart) return false;
            }
            return true;
        }
    } else {
        if (mp.x >= x1 - m_plotPointSize_Chart && mp.x <= x1 + m_plotPointSize_Chart){
            if (y1 >= y2) {
                if (mp.y <= y1 - m_plotPointSize_Chart) {
                    return true;
                }
            } else {
                if (mp.y >= y1 - m_plotPointSize_Chart) {
                    return true;
                }
            }
        }
    }
    return false;
};

/*
* 判断是否选中线段
* mp:坐标
* x1:横坐标1
* y1:纵坐标1
* x2:横坐标2
* y2:纵坐标2
*/
var selectSegment = function(mp, x1, y1, x2, y2){
    lineXY(x1, y1, x2, y2, 0, 0);
    var smallX = x1 <= x2 ? x1 : x2;
    var smallY = y1 <= y2 ? y1 : y2;
    var bigX = x1 > x2 ? x1 : x2;
    var bigY = y1 > y2 ? y1 : y2;
    if (mp.x >= smallX - 2 && mp.x <= bigX + 2 && mp.y >= smallY - 2 && mp.y <= bigY + 2) {
        if (m_k_Chart != 0 || m_b_Chart != 0) {
            if (mp.y / (mp.x * m_k_Chart + m_b_Chart) >= 0.9 && mp.y / (mp.x * m_k_Chart + m_b_Chart) <= 1.1) {
                return true;
            }
        } else {
            if (mp.x >= x1 - m_plotPointSize_Chart && mp.x <= x1 + m_plotPointSize_Chart){
                return true;
            }
        }
    }
    return false;
};

/*
* 根据三点计算圆心
* x1:横坐标1
* y1:纵坐标1
* x2:横坐标2
* y2:纵坐标2
* x3:横坐标3
* y3:纵坐标3
*/
var ellipseOR = function(x1, y1, x2, y2, x3, y3){
    m_oX_Chart = ((y3 - y1) * (y2 * y2 - y1 * y1 + x2 * x2 - x1 * x1) + (y2 - y1) * (y1 * y1 - y3 * y3 + x1 * x1 - x3 * x3))
        / (2 * (x2 - x1) * (y3 - y1) - 2 * (x3 - x1) * (y2 - y1));
    m_oY_Chart = ((x3 - x1) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1) + (x2 - x1) * (x1 * x1 - x3 * x3 + y1 * y1 - y3 * y3))
        / (2 * (y2 - y1) * (x3 - x1) - 2 * (y3 - y1) * (x2 - x1));
    m_r_Chart = Math.sqrt((x1 - m_oX_Chart) * (x1 - m_oX_Chart) + (y1 - m_oY_Chart) * (y1 - m_oY_Chart));
}

/*
* 判断点是否在椭圆上
* x:横坐标
* y:纵坐标
* oX:坐标起始X
* oY:坐标起始Y
* a:椭圆参数a
* b:椭圆参数b
*/
var ellipseHasPoint = function(x, y, oX, oY, a, b){
    x -= oX;
    y -= oY;
    if (a == 0 && b == 0 && x == 0 && y == 0) {
        return true;
    }
    if (a == 0) {
        if (x == 0 && y >= -b && y <= b) {
            return false;
        }
    }
    if (b == 0) {
        if (y == 0 && x >= -a && x <= a) {
            return true;
        }
    }
    if ((x * x) / (a * a) + (y * y) / (b * b) >= 0.8 && (x * x) / (a * a) + (y * y) / (b * b) <= 1.2) {
        return true;
    }
    return false;
};

/*
* 计算线性回归
* list:集合
*/
var linearRegressionEquation = function(list){
    var result = 0;
    var sumX = 0;
    var sumY = 0;
    var sumUp = 0;
    var sumDown = 0;
    var xAvg = 0;
    var yAvg = 0;
    m_k_Chart = 0;
    m_b_Chart = 0;
    var length = list.length;
    if(length > 1){
        for(var i = 0; i < length; i++){
            sumX += i + 1;
            sumY += list[i];
        }
        xAvg = sumX / length;
        yAvg = sumY / length;
        for (var i = 0; i < length; i++){
            sumUp += (i + 1 - xAvg) * (list[i] - yAvg);
            sumDown += (i + 1 - xAvg) * (i + 1 - xAvg);
        }
        m_k_Chart = sumUp / sumDown;
        m_b_Chart = yAvg - m_k_Chart * xAvg;
    }
    return result;
}

/*
* 计算最大值
* list:集合
*/
var maxValue = function(list){
    var length = list.length;
    var max = 0;
    for (var i = 0; i < length; i++){
        if (i == 0){
            max = list[i];
        }
        else{
            if (max < list[i]){
                max = list[i];
            }
        }
    }
    return max;
};

/*
* 计算最小值
* list:集合
*/
var minValue = function(list){
    var length = list.length;
    var min = 0;
    for (var i = 0; i < length; i++){
        if (i == 0){
            min = list[i];
        }
        else{
            if (min > list[i]){
                min = list[i];
            }
        }
    }
    return min;
};

/*
* 计算平均值
* list:集合
*/
var avgValue = function(list){
    var sum = 0;
    var length = list.length;
    if (length > 0){
        for (i = 0; i < length; i++){
            sum += list[i];
        }
        return sum / length;
    }
    return 0;
};

var m_x4_Chart = 0, m_y4_Chart = 0;

/*
* 计算平行四边形参数
* x1:横坐标1
* y1:纵坐标1
* x2:横坐标2
* y2:纵坐标2
* x3:横坐标3
* y3:纵坐标3
*/
var parallelogram =  function(x1, y1, x2, y2, x3, y3){
    m_x4_Chart = x1 + x3 - x2;
    m_y4_Chart = y1 + y3 - y2;
};

/*
* 计算斐波那契数列
* index:索引
*/
var fibonacciValue = function(index){
    if (index < 1){
        return 0;
    }
    else
    {
        var vList = new Array();
        for(var i = 0; i < index; i++){
            vList.push(0);
        }
        var result = 0;
        for (i = 0; i <= index - 1; i++){
            if (i == 0 || i == 1){
                vList[i] = 1;
            }
            else{
                vList[i] = vList[i - 1] + vList[i - 2];
            }
        }
        result = vList[index - 1];
        return result;
    }
};

/*
* 获取百分比线的刻度
* y1: 纵坐标1
* y2: 纵坐标2
*/
var getPercentParams = function(y1, y2){
    var y0 = 0, y25 = 0, y50 = 0, y75 = 0, y100 = 0;
    y0 = y1;
    y25 = y1 <= y2 ? y1 + (y2 - y1) / 4 : y2 + (y1 - y2) * 3 / 4;
    y50 = y1 <= y2 ? y1 + (y2 - y1) / 2 : y2 + (y1 - y2) / 2;
    y75 = y1 <= y2 ? y1 + (y2 - y1) * 3 / 4 : y2 + (y1 - y2) / 4;
    y100 = y2;
    var list = new Array();
    list.push(y0);
    list.push(y25);
    list.push(y50);
    list.push(y75);
    list.push(y100);
    return list;
};

var m_nHigh_Chart = 0, m_nLow_Chart = 0;

/*
* 获取K线的区域
* chart: K线
* plot: 画线
*/
var getCandleRange = function(chart, plot){
    var bIndex = getChartIndexByDate(chart, plot.m_key1);
    var eIndex = getChartIndexByDate(chart, plot.m_key2);
    var tempBIndex = Math.min(bIndex, eIndex);
    var tempEIndex = Math.max(bIndex, eIndex);
    bIndex = tempBIndex;
    eIndex = tempEIndex;
    var highList = new Array();
    var lowList = new Array();
    for(var i = bIndex; i <= eIndex; i++){
        highList.push(chart.m_data[i].m_high);
        lowList.push(chart.m_data[i].m_low);
    }
    m_nHigh_Chart = maxValue(highList);
    m_nLow_Chart = minValue(lowList);
};

var m_x_Chart = 0, m_y_Chart = 0, m_w_Chart = 0, m_h_Chart = 0;

/*
* 根据坐标计算矩形
* x1:横坐标1
* y1:纵坐标1
* x2:横坐标2
* y2:纵坐标2
*/
var rectangleXYWH = function(x1, y1, x2, y2){
    m_x_Chart = x1 < x2 ? x1 : x2;
    m_y_Chart = y1 < y2 ? y1 : y2;
    m_w_Chart = Math.abs(x1 - x2);
    m_h_Chart = Math.abs(y1 - y2);
    if (m_w_Chart <= 0) {
        m_w_Chart = 4;
    }
    if (m_h_Chart <= 0) {
        m_h_Chart = 4;
    }
};

/*
* 选中直线
* chart: K线
* mp:坐标
*/
var selectPlot = function(chart, mp){
    var sPlot = null;
    chart.m_startMovePlot = false;
    chart.m_selectPlotPoint = -1;
    for(var i = 0; i < chart.m_plots.length; i++){
        var plot = chart.m_plots[i];
        var m_index1 = 0, m_index2 = 0, m_index3 = 0;
        var mpx1 = 0, mpy1 = 0, mpx2 = 0, mpy2 = 0, mpx3 = 0, mpy3 = 0;
        //检查关键点
        if(plot.m_key1){
            m_index1 = getChartIndexByDate(chart, plot.m_key1);
            mpx1 = getChartX(chart, m_index1);
            mpy1 = getChartY(chart, 0, plot.m_value1);
            if(mp.x >= mpx1 - m_plotPointSize_Chart && mp.x <= mpx1 + m_plotPointSize_Chart && mp.y >= mpy1 - m_plotPointSize_Chart && mp.y <= mpy1 + m_plotPointSize_Chart){
                sPlot = plot;
                chart.m_selectPlotPoint = 0;
                break;
            }
        }
        if(plot.m_key2){
            m_index2 = getChartIndexByDate(chart, plot.m_key2);
            mpx2 = getChartX(chart, m_index2);
            mpy2 = getChartY(chart, 0, plot.m_value2);
            if(mp.x >= mpx2 - m_plotPointSize_Chart && mp.x <= mpx2 + m_plotPointSize_Chart && mp.y >= mpy2 - m_plotPointSize_Chart && mp.y <= mpy2 + m_plotPointSize_Chart){
                sPlot = plot;
                chart.m_selectPlotPoint = 1;
                break;
            }
        }
        if(plot.m_key3){
            m_index3 = getChartIndexByDate(chart, plot.m_key3);
            mpx3 = getChartX(chart, m_index3);
            mpy3 = getChartY(chart, 0, plot.m_value3);
            if(mp.x >= mpx3 - m_plotPointSize_Chart && mp.x <= mpx3 + m_plotPointSize_Chart && mp.y >= mpy3 - m_plotPointSize_Chart && mp.y <= mpy3 + m_plotPointSize_Chart){
                sPlot = plot;
                chart.m_selectPlotPoint = 2;
                break;
            }
        }
        //判断其余部分的选中
        if(chart.m_selectPlotPoint == -1){
            if(plot.m_plotType == "Line"){
                chart.m_startMovePlot = selectLine(mp, mpx1, mpy1, mpx2, mpy2);
            }
            else if (plot.m_plotType == "ArrowSegment") {
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
            }
            else if(plot.m_plotType == "AngleLine"){
                chart.m_startMovePlot = selectLine(mp, mpx1, mpy1, mpx2, mpy2);
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectLine(mp, mpx1, mpy1, mpx3, mpy3);
                }
            }
            else if(plot.m_plotType == "Parallel"){
                chart.m_startMovePlot = selectLine(mp, mpx1, mpy1, mpx2, mpy2);
                if (!chart.m_startMovePlot){
                    lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
                    var newB = mpy3 - m_k_Chart * mpx3;
                    if(mpx2 == mpx1){
                        if(mp.x >= mpx3 - m_plotPointSize_Chart && mp.x <= mpx3 + m_plotPointSize_Chart){
                            chart.m_startMovePlot = true;
                        }
                    }else{
                        var newX1 = chart.m_leftVScaleWidth;
                        var newY1 = newX1 * m_k_Chart + newB;
                        var newX2 = chart.m_size.cx - chart.m_rightVScaleWidth;
                        var newY2 = newX2 * m_k_Chart + newB;
                        chart.m_startMovePlot = selectLine(mp, newX1, newY1, newX2, newY2);
                    }
                }
            }
            else if(plot.m_plotType == "LRLine"){
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
            }
            else if(plot.m_plotType == "Segment"){
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
            }else if(plot.m_plotType == "Ray"){
                chart.m_startMovePlot = selectRay(mp, mpx1, mpy1, mpx2, mpy2);
            }
            else if(plot.m_plotType == "Triangle"){
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, mpx2, mpy2, mpx3, mpy3);
                }
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx3, mpy3);
                }
            }
            else if (plot.m_plotType == "SymmetricTriangle") {
                if (mpx2 != mpx1) {
                    a = (mpy2 - mpy1) / (mpx2 - mpx1);
                    b = mpy1 - a * mpx1;
                    c = -a;
                    d = mpy3 - c * mpx3;
                    leftX = chart.m_leftVScaleWidth;
                    leftY = leftX * a + b;
                    rightX = chart.m_size.cx - chart.m_rightVScaleWidth;
                    rightY = rightX * a + b;
                    chart.m_startMovePlot = selectSegment(mp, leftX, leftY, rightX, rightY);
                    if (!chart.m_startMovePlot) {
                        leftY = leftX * c + d;
                        rightY = rightX * c + d;
                        chart.m_startMovePlot = selectSegment(mp, leftX, leftY, rightX, rightY);
                    }
                } else {
                    chart.m_startMovePlot = selectSegment(mp, mpx1, 0, mpx1, divHeight);
                    if (!chart.m_startMovePlot) {
                        chart.m_startMovePlot = selectSegment(mp, mpx3, 0, mpx3, divHeight);
                    }
                }
            }
            else if (plot.m_plotType == "Rect") {
                var sX1 = Math.min(mpx1, mpx2);
                var sY1 = Math.min(mpy1, mpy2);
                var sX2 = Math.max(mpx1, mpx2);
                var sY2 = Math.max(mpy1, mpy2);
                chart.m_startMovePlot = selectSegment(mp, sX1, sY1, sX2, sY1);
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX2, sY1, sX2, sY2);
                }
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX1, sY2, sX2, sY2);
                }
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX1, sY1, sX1, sY2);
                }
            }
            else if(plot.m_plotType == "BoxLine"){
                var sX1 = Math.min(mpx1, mpx2);
                var sY1 = Math.min(mpy1, mpy2);
                var sX2 = Math.max(mpx1, mpx2);
                var sY2 = Math.max(mpy1, mpy2);
                chart.m_startMovePlot = selectSegment(mp, sX1, sY1, sX2, sY1);
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX2, sY1, sX2, sY2);
                }
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX1, sY2, sX2, sY2);
                }
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX1, sY1, sX1, sY2);
                }
            }
            else if(plot.m_plotType == "TironeLevels"){
                var sX1 = Math.min(mpx1, mpx2);
                var sY1 = Math.min(mpy1, mpy2);
                var sX2 = Math.max(mpx1, mpx2);
                var sY2 = Math.max(mpy1, mpy2);
                chart.m_startMovePlot = selectSegment(mp, sX1, sY1, sX2, sY1);
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX1, sY2, sX2, sY2);
                }
            }
            else if(plot.m_plotType == "QuadrantLines"){
                var sX1 = Math.min(mpx1, mpx2);
                var sY1 = Math.min(mpy1, mpy2);
                var sX2 = Math.max(mpx1, mpx2);
                var sY2 = Math.max(mpy1, mpy2);
                chart.m_startMovePlot = selectSegment(mp, sX1, sY1, sX2, sY1);
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, sX1, sY2, sX2, sY2);
                }
            }else if(plot.m_plotType == "GoldenRatio"){
                var sX1 = Math.min(mpx1, mpx2);
                var sY1 = Math.min(mpy1, mpy2);
                var sX2 = Math.max(mpx1, mpx2);
                var sY2 = Math.max(mpy1, mpy2);
                var ranges = new Array();
                ranges.push(0);
                ranges.push(0.236);
                ranges.push(0.382);
                ranges.push(0.5);
                ranges.push(0.618);
                ranges.push(0.809);
                ranges.push(1);
                ranges.push(1.382);
                ranges.push(1.618);
                ranges.push(2);
                ranges.push(2.382);
                ranges.push(2.618);
                var minValue = Math.min(plot.m_value1, plot.m_value2);
                var maxValue = Math.max(plot.m_value1, plot.m_value2);
                for(var j = 0; j < ranges.length; j++){
                    var newY = sY1 <= sY2 ? sY1 + (sY2 - sY1) * ranges[j] : sY2 + (sY1 - sY2) * (1 - ranges[j]);
                    chart.m_startMovePlot = selectSegment(mp, chart.m_leftVScaleWidth, newY, chart.m_size.cx - chart.m_rightVScaleWidth, newY);
                    if (chart.m_startMovePlot){
                        break;
                    }
                }
            }
            else if(plot.m_plotType == "Cycle"){
                var r = Math.sqrt(Math.abs((mpx2 - mpx1) * (mpx2 - mpx1) + (mpy2 - mpy1) * (mpy2 - mpy1)));
                var round = (mp.x - mpx1) * (mp.x - mpx1) + (mp.y - mpy1) * (mp.y - mpy1);
                if (round / (r * r) >= 0.9 && round / (r * r) <= 1.1){
                    chart.m_startMovePlot = true;
                }
            }else if(plot.m_plotType == "CircumCycle"){
                ellipseOR(mpx1, mpy1, mpx2, mpy2, mpx3, mpy3);
                var round = (mp.x - m_oX_Chart) * (mp.x - m_oX_Chart) + (mp.y - m_oY_Chart) * (mp.y - m_oY_Chart);
                if (round / (m_r_Chart * m_r_Chart) >= 0.9 && round / (m_r_Chart * m_r_Chart) <= 1.1){
                    chart.m_startMovePlot = true;
                }
            }
            else if(plot.m_plotType == "Ellipse"){
                var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
                if(mpx1 <= mpx2){
                    x1 = mpx2;
                    y1 = mpy2;
                    x2 = mpx1;
                    y2 = mpy1;
                }else{
                    x1 = mpx1;
                    y1 = mpy1;
                    x2 = mpx2;
                    y2 = mpy2;
                }
                var x = x1 - (x1 - x2);
                var y = 0;
                var width = (x1 - x2) * 2;
                var height = 0;
                if (y1 >= y2){
                    height = (y1 - y2) * 2;
                }
                else{
                    height = (y2 - y1) * 2;
                }
                y = y2 - height / 2;
                var a = width / 2;
                var b = height / 2;
                chart.m_startMovePlot = ellipseHasPoint(mp.x, mp.y, x + (width / 2), y + (height / 2), a, b);
            }else if(plot.m_plotType == "LRBand"){
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
                if (!chart.m_startMovePlot){
                    var list = new Array();
                    var minIndex = Math.min(m_index1, m_index2);
                    var maxIndex = Math.max(m_index1, m_index2);
                    for(var j = minIndex; j <= maxIndex; j++){
                        list.push(chart.m_data[j].m_close);
                    }
                    linearRegressionEquation(list);
                    getLRBandRange(chart, plot, m_k_Chart, m_b_Chart);
                    mpy1 = getChartY(chart, 0, plot.m_value1 + m_upSubValue);
                    mpy2 = getChartY(chart, 0, plot.m_value2 + m_upSubValue);
                    chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
                    if (!chart.m_startMovePlot){
                        mpy1 = getChartY(chart, 0, plot.m_value1 - m_downSubValue);
                        mpy2 = getChartY(chart, 0, plot.m_value2 - m_downSubValue);
                        chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
                    }
                }
            }else if(plot.m_plotType == "LRChannel"){
                lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
                var rightX = chart.m_size.cx - chart.m_rightVScaleWidth;
                var rightY = rightX * m_k_Chart + m_b_Chart;
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, rightX, rightY);
                if (!chart.m_startMovePlot){
                    var list = new Array();
                    var minIndex = Math.min(m_index1, m_index2);
                    var maxIndex = Math.max(m_index1, m_index2);
                    for(var j = minIndex; j <= maxIndex; j++){
                        list.push(chart.m_data[j].m_close);
                    }
                    linearRegressionEquation(list);
                    getLRBandRange(chart, plot, m_k_Chart, m_b_Chart);
                    mpy1 = getChartY(chart, 0, plot.m_value1 + m_upSubValue);
                    mpy2 = getChartY(chart, 0, plot.m_value2 + m_upSubValue);
                    lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
                    rightY = rightX * m_k_Chart + m_b_Chart;
                    chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, rightX, rightY);
                    if (!chart.m_startMovePlot){
                        mpy1 = getChartY(chart, 0, plot.m_value1 - m_downSubValue);
                        mpy2 = getChartY(chart, 0, plot.m_value2 - m_downSubValue);
                        lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
                        rightY = rightX * m_k_Chart + m_b_Chart;
                        chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, rightX, rightY);
                    }
                }
            }else if(plot.m_plotType == "ParalleGram"){
                parallelogram(mpx1, mpy1, mpx2, mpy2, mpx3, mpy3);
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
                if (!chart.m_startMovePlot){
                    chart.m_startMovePlot = selectSegment(mp, mpx2, mpy2, mpx3, mpy3);
                    if (!chart.m_startMovePlot){
                        chart.m_startMovePlot = selectSegment(mp, mpx3, mpy3, m_x4_Chart, m_y4_Chart);
                        if (!chart.m_startMovePlot){
                            chart.m_startMovePlot = selectSegment(mp, m_x4_Chart, m_y4_Chart, mpx1, mpy1);
                        }
                    }
                }
            }
            else if(plot.m_plotType == "SpeedResist"){
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
                if (!chart.m_startMovePlot){
                    if (mpx1 != mpx2 && mpy1 != mpy2){
                        var firstP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) / 3);
                        var secondP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 2 / 3);
                        var startP = new FCPoint(mpx1, mpy1);
                        var fK = 0, fB = 0, sK = 0, sB = 0;
                        lineXY(startP.x, startP.y, firstP.x, firstP.y, 0, 0);
                        fK = m_k_Chart;
                        fb = m_b_Chart;
                        lineXY(startP.x, startP.y, secondP.x, secondP.y, 0, 0);
                        sK = m_k_Chart;
                        sB = m_b_Chart;
                        var newYF = 0, newYS = 0;
                        var newX = 0;
                        if (mpx2 > mpx1){
                            newYF = fK * (chart.m_size.cx - chart.m_rightVScaleWidth) + fB;
                            newYS = sK * (chart.m_size.cx - chart.m_rightVScaleWidth) + sB;
                            newX = (chart.m_size.cx - chart.m_rightVScaleWidth);
                        }
                        else{
                            newYF = fB;
                            newYS = sB;
                            newX = chart.m_leftVScaleWidth;
                        }
                        chart.m_startMovePlot = selectSegment(mp, startP.x, startP.y, newX, newYF);
                        if (!chart.m_startMovePlot){
                            chart.m_startMovePlot = selectSegment(mp, startP.x, startP.y, newX, newYS);
                        }
                    }
                }
            }else if(plot.m_plotType == "FiboFanline"){
                chart.m_startMovePlot = selectSegment(mp, mpx1, mpy1, mpx2, mpy2);
                if (!chart.m_startMovePlot){
                    if (mpx1 != mpx2 && mpy1 != mpy2){
                        var firstP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 0.382);
                        var secondP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 0.5);
                        var thirdP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 0.618);
                        var startP = new FCPoint(mpx1, mpy1);
                        var listP = new Array();
                        listP.push(firstP);
                        listP.push(secondP);
                        listP.push(thirdP);
                        var listSize = listP.length;
                        for (var j = 0; j < listSize; j++){
                            lineXY(startP.x, startP.y, listP[j].x, listP[j].y, 0, 0);
                            var newX = 0;
                            var newY = 0;
                            if (mpx2 > mpx1){
                                newY = m_k_Chart * (chart.m_size.cx - chart.m_rightVScaleWidth) + m_b_Chart;
                                newX = (chart.m_size.cx - chart.m_rightVScaleWidth);
                            }
                            else
                            {
                                newY = m_b_Chart;
                                newX = chart.m_leftVScaleWidth;
                            }
                            chart.m_startMovePlot = selectSegment(mp, startP.x, startP.y, newX, newY);
                            if (chart.m_startMovePlot){
                                break;
                            }
                        }
                    }
                }
            }
            else if(plot.m_plotType == "FiboTimezone"){
                var fValue = 1;
                var aIndex = m_index1;
                var pos = 1;
                var divHeight = getCandleDivHeight(chart);
                chart.m_startMovePlot = selectSegment(mp, mpx1, 0, mpx1, divHeight);
                if (!chart.m_startMovePlot){
                    while (aIndex + fValue <= chart.m_lastVisibleIndex){
                        fValue = fibonacciValue(pos);
                        var newIndex = aIndex + fValue;
                        var newX = getChartX(chart, newIndex);
                        chart.m_startMovePlot = selectSegment(mp, newX, 0, newX, divHeight);
                        if (chart.m_startMovePlot){
                            break;
                        }
                        pos++;
                    }
                }
            }
            else if(plot.m_plotType == "Percent"){
                var list = getPercentParams(mpy1, mpy2);
                for(var j = 0; j < list.length; j++){
                    chart.m_startMovePlot = selectSegment(mp, chart.m_leftVScaleWidth, list[j], chart.m_size.cx - chart.m_rightVScaleWidth, list[j]);
                    if (chart.m_startMovePlot){
                        break;
                    }
                }
            }
            if (chart.m_startMovePlot){
                sPlot = plot;
                plot.m_startKey1 = plot.m_key1;
                plot.m_startValue1 = plot.m_value1;
                plot.m_startKey2 = plot.m_key2;
                plot.m_startValue2 = plot.m_value2;
                plot.m_startKey3 = plot.m_key3;
                plot.m_startValue3 = plot.m_value3;
                break;
            }
        }
    }
    return sPlot;
};

/*
* K线的鼠标移动方法
* chart: K线
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseMoveChart = function(chart, firstTouch, secondTouch, firstPoint, secondPoint){
    if(!chart.m_data || chart.m_data.length == 0){
        return;
    }
    var mp = firstPoint;
    chart.m_crossStopIndex = getChartIndex(chart, mp);
	chart.m_mousePosition = mp;
	if(firstTouch && chart.m_sPlot){
	    var newIndex = getChartIndex(chart, mp);
	    if(newIndex >= 0 && newIndex < chart.m_data.length){
	        var newDate = getChartDateByIndex(chart, newIndex);
            var newValue = getCandleDivValue(chart, mp);
            if (chart.m_selectPlotPoint == 0){
	            chart.m_sPlot.m_key1 = newDate;
                chart.m_sPlot.m_value1 = newValue;
            } else if (chart.m_selectPlotPoint == 1){
                chart.m_sPlot.m_key2 = newDate;
                chart.m_sPlot.m_value2 = newValue;
            } else if (chart.m_selectPlotPoint == 2){
                chart.m_sPlot.m_key3 = newDate;
                chart.m_sPlot.m_value3 = newValue;
	        }
            else if (chart.m_startMovePlot){
                var bValue = getCandleDivValue(chart, m_mouseDownPoint_Chart);
	            var bIndex = getChartIndex(chart, m_mouseDownPoint_Chart);
                if (chart.m_sPlot.m_key1){
                    chart.m_sPlot.m_value1 = chart.m_sPlot.m_startValue1 + (newValue - bValue);
                    var startIndex1 = getChartIndexByDate(chart, chart.m_sPlot.m_startKey1);
                    var newIndex1 = startIndex1 + (newIndex - bIndex);
                    if(newIndex1 < 0){
                        newIndex1 = 0;
                    }
                    else if(newIndex1 > chart.m_data.length - 1){
                        newIndex1 = chart.m_data.length - 1;
                    }
                    chart.m_sPlot.m_key1 = getChartDateByIndex(chart, newIndex1);
                }
                if (chart.m_sPlot.m_key2){
                    chart.m_sPlot.m_value2 = chart.m_sPlot.m_startValue2 + (newValue - bValue);
                    var startIndex2 = getChartIndexByDate(chart, chart.m_sPlot.m_startKey2);
                    var newIndex2 = startIndex2 + (newIndex - bIndex);
                    if(newIndex2 < 0){
                        newIndex2 = 0;
                    }
                    else if(newIndex2 > chart.m_data.length - 1){
                        newIndex2 = chart.m_data.length - 1;
                    }
                    chart.m_sPlot.m_key2 = getChartDateByIndex(chart, newIndex2);
                }
                if (chart.m_sPlot.m_key3){
                    chart.m_sPlot.m_value3 = chart.m_sPlot.m_startValue3 + (newValue - bValue);
                    var startIndex3 = getChartIndexByDate(chart, chart.m_sPlot.m_startKey3);
                    var newIndex3 = startIndex3 + (newIndex - bIndex);
                    if(newIndex3 < 0){
                        newIndex3 = 0;
                    }
                    else if(newIndex3 > chart.m_data.length - 1){
                        newIndex3 = chart.m_data.length - 1;
                    }
                    chart.m_sPlot.m_key3 = getChartDateByIndex(chart, newIndex3);
                }
            }
	    }
	    return;
	}
	if (firstTouch && secondTouch) {
        if (firstPoint.x > secondPoint.x) {
            m_firstTouchPointCache_Chart = secondPoint;
            m_secondTouchPointCache_Chart = firstPoint;
        } else {
            m_firstTouchPointCache_Chart = firstPoint;
            m_secondTouchPointCache_Chart = secondPoint;
        }
        if (m_firstTouchIndexCache_Chart == -1 || m_secondTouchIndexCache_Chart == -1) {
            m_firstTouchIndexCache_Chart = getChartIndex(chart, m_firstTouchPointCache_Chart);
            m_secondTouchIndexCache_Chart = getChartIndex(chart, m_secondTouchPointCache_Chart);
            m_firstIndexCache_Chart = chart.m_firstVisibleIndex;
            m_lastIndexCache_Chart = chart.m_lastVisibleIndex;
        }
    } else if (firstTouch) {
        m_secondTouchIndexCache_Chart = -1;
        if (m_firstTouchIndexCache_Chart == -1) {
            m_firstTouchPointCache_Chart = firstPoint;
            m_firstTouchIndexCache_Chart = getChartIndex(chart, m_firstTouchPointCache_Chart);
            m_firstIndexCache_Chart = chart.m_firstVisibleIndex;
            m_lastIndexCache_Chart = chart.m_lastVisibleIndex;
        }
    }

    if (firstTouch && secondTouch) {
        if (m_firstTouchIndexCache_Chart != -1 && m_secondTouchIndexCache_Chart != -1) {
            var fPoint = firstPoint;
            var sPoint = secondPoint;
            if (firstPoint.x > secondPoint.x) {
                fPoint = secondPoint;
                sPoint = firstPoint; ;
            }
            var subX = Math.abs(sPoint.x - fPoint.x);
            var subIndex = Math.abs(m_secondTouchIndexCache_Chart - m_firstTouchIndexCache_Chart);
            if (subX > 0 && subIndex > 0) {
                var newScalePixel = subX / subIndex;
                if (newScalePixel >= 3) {
                    var intScalePixel = parseInt(newScalePixel);
                    newScalePixel = intScalePixel;
                }
                if (newScalePixel != chart.m_hScalePixel) {
                    var newFirstIndex = m_firstTouchIndexCache_Chart;
                    var thisX = fPoint.x;
                    thisX -= newScalePixel;
                    while (thisX > chart.m_leftVScaleWidth + newScalePixel) {
                        newFirstIndex--;
                        if (newFirstIndex < 0) {
                            newFirstIndex = 0;
                            break;
                        }
                        thisX -= newScalePixel;
                    }

                    thisX = sPoint.x;
                    var newSecondIndex = m_secondTouchIndexCache_Chart;
                    thisX += newScalePixel;
                    while (thisX < chart.m_size.cx - chart.m_rightVScaleWidth - newScalePixel) {
                        newSecondIndex++;
                        if (newSecondIndex > chart.m_data.length - 1) {
                            newSecondIndex = chart.m_data.length - 1;
                            break;
                        }
                        thisX += newScalePixel;
                    }
                    setChartVisibleIndex(chart, newFirstIndex, newSecondIndex);
                    var maxVisibleRecord = getChartMaxVisibleCount(chart, chart.m_hScalePixel, getChartWorkAreaWidth(chart));
                    while (maxVisibleRecord < chart.m_lastVisibleIndex - chart.m_firstVisibleIndex + 1
                          && chart.m_lastVisibleIndex > chart.m_firstVisibleIndex) {
                        chart.m_lastVisibleIndex--;
                    }
                    checkChartLastVisibleIndex(chart);
                    resetChartVisibleRecord(chart);
                    if(chart.onCalculateChartMaxMin){
                        chart.onCalculateChartMaxMin(chart);
                    }else{
                        calculateChartMaxMin(chart);
                    }
                }
            }
        }
    } else if (firstTouch) {
        var subIndex = parseInt((m_firstTouchPointCache_Chart.x - firstPoint.x) / chart.m_hScalePixel);
        if (chart.m_lastVisibleIndex + subIndex > chart.m_data.length - 1) {
            subIndex = chart.m_data.length - 1 - m_lastIndexCache_Chart;
        } else if (chart.m_firstVisibleIndex + subIndex < 0) {
            subIndex = m_firstIndexCache_Chart;
        }
        chart.m_firstVisibleIndex = m_firstIndexCache_Chart + subIndex;
        chart.m_lastVisibleIndex = m_lastIndexCache_Chart + subIndex;
        checkChartLastVisibleIndex(chart);
        resetChartVisibleRecord(chart);
        if(chart.onCalculateChartMaxMin){
            chart.onCalculateChartMaxMin(chart);
        }else{
            calculateChartMaxMin(chart);
        }
    }
};

var m_upSubValue = 0, m_downSubValue = 0; 

/*
* 计算线性回归上下限
* chart:K线
* plot:画线
* a:直线k
* b:直线b
*/
var getLRBandRange = function(chart, plot, a, b){
    var bIndex = getChartIndexByDate(chart, plot.m_key1);
    var eIndex = getChartIndexByDate(chart, plot.m_key2);
    var tempBIndex = Math.min(bIndex, eIndex);
    var tempEIndex = Math.max(bIndex, eIndex);
    bIndex = tempBIndex;
    eIndex = tempEIndex;
    var upList = new Array();
    var downList = new Array();
    for (var i = bIndex; i <= eIndex; i++) {
        var high = chart.m_data[i].m_high;
        var low = chart.m_data[i].m_low;
        var midValue = (i - bIndex + 1) * a + b;
        upList.push(high - midValue);
        downList.push(midValue - low);
    }
    m_upSubValue = maxValue(upList);
    m_downSubValue = maxValue(downList);
};

/*
* 根据位置计算索引
* chart:K线
* mp:坐标
*/
var getChartIndex = function(chart, mp) {
    if (chart.m_data && chart.m_data.length == 0){
		return -1;
	}
	if(mp.x <= 0) {
		return 0;
	}
	var intX = parseInt(mp.x - chart.m_leftVScaleWidth - chart.m_hScalePixel);
	var index = parseInt(chart.m_firstVisibleIndex + intX / chart.m_hScalePixel);
	if(intX % chart.m_hScalePixel != 0){
		index++;
	}
	if(index < 0){
		 index = 0;
    } else if (chart.m_data && index > chart.m_data.length - 1){
		 index = chart.m_data.length - 1;
	}	
	return index;
};

/*
* 获取最大显示记录条数
* chart:K线
* hScalePixel:间隔
* pureH:横向距离
*/
var getChartMaxVisibleCount = function(chart, hScalePixel, pureH){
    var count = parseInt((pureH - hScalePixel) / hScalePixel);
    if(count < 0){
        count = 0;
    }
    return count;
};

/*
* 获取K线层的高度
* chart:K线
*/
var getCandleDivHeight = function(chart){
	var height = chart.m_size.cy - chart.m_hScaleHeight;
	if(height > 0){
		return height * chart.m_candleDivPercent;
	}else{
		return 0;
	}
};

/*
* 获取成交量层的高度
* chart:K线
*/
var getVolDivHeight = function(chart){
    var height = chart.m_size.cy - chart.m_hScaleHeight;
	if(height > 0){
		return height * chart.m_volDivPercent;
	}else{
		return 0;
	}
};

/*
* 获取指标层的高度
* chart:K线
*/
var getIndDivHeight = function(chart){
    var height = chart.m_size.cy - chart.m_hScaleHeight;
	if(height > 0){
		return height * chart.m_indDivPercent;
	}else{
		return 0;
	}
};

/*
* 获取指标层2的高度
* chart:K线
*/
var getIndDivHeight2 = function (chart) {
    var height = chart.m_size.cy - chart.m_hScaleHeight;
    if (height > 0) {
        return height * chart.m_indDivPercent2;
    } else {
        return 0;
    }
};

/*
* 获取横向工作区
* chart:K线
*/
var getChartWorkAreaWidth = function(chart){
    return chart.m_size.cx - chart.m_leftVScaleWidth - chart.m_rightVScaleWidth - chart.m_rightSpace;
};

/*
* 根据索引获取横坐标
* chart:K线
* index:索引
*/
var getChartX = function(chart, index){
    return chart.m_leftVScaleWidth + (index - chart.m_firstVisibleIndex) * chart.m_hScalePixel + chart.m_hScalePixel;
};

/*
* 根据日期获取索引
* chart:K线
* date:日期
*/
var getChartIndexByDate = function(chart, date){
    var index = -1;
    for(var i = 0; i < chart.m_data.length; i++){
        if(chart.m_data[i].m_date == date){
            index = i;
            break;
        }
    }
    return index;
};

/*
* 根据索引获取日期
* chart:K线
* index:索引
*/
var getChartDateByIndex = function(chart, index){
    var date = "";
    if(index >= 0 && index < chart.m_data.length){
        date = chart.m_data[index].m_date;
    }
    return date;
};

/*
* 计算数值在层中的位置
* chart:K线
* divIndex:所在层
* chart:数值
*/
var getChartY = function(chart, divIndex, value){
    if(divIndex == 0){
        if(chart.m_candleMax > chart.m_candleMin){
            var cValue = value, cMax = chart.m_candleMax, cMin = chart.m_candleMin;
            if(chart.m_vScaleType != "standard"){
                if (cValue > 0) {
                    cValue = Math.log10(cValue);
                } else if (cValue < 0) {
                    cValue = -Math.log10(Math.abs(cValue));
                }
                if (cMax > 0) {
                    cMax = Math.log10(cMax);
                } else if (cMax < 0) {
                    cMax = -Math.log10(Math.abs(cMax));
                }
                if (cMin > 0) {
                    cMin = Math.log10(cMin);
                } else if (cMin < 0) {
                    cMin = -Math.log10(Math.abs(cMin));
                }
            }
            var rate = (cValue - cMin) / (cMax - cMin);
            var divHeight = getCandleDivHeight(chart);
            return divHeight - chart.m_candlePaddingBottom - (divHeight - chart.m_candlePaddingTop - chart.m_candlePaddingBottom) * rate;
        }else{
            return 0;
        }
    }else if(divIndex == 1){
        if(chart.m_volMax > chart.m_volMin){
            var rate = (value - chart.m_volMin) / (chart.m_volMax - chart.m_volMin);
            var candleHeight = getCandleDivHeight(chart);
            var volHeight = getVolDivHeight(chart);
            return candleHeight + volHeight - chart.m_volPaddingBottom - (volHeight - chart.m_volPaddingTop - chart.m_volPaddingBottom) * rate;
        }else{
            return 0;
        }
    }else if(divIndex == 2){
        if(chart.m_indMax > chart.m_indMin){
            var rate = (value - chart.m_indMin) / (chart.m_indMax - chart.m_indMin);
            var candleHeight = getCandleDivHeight(chart);
            var volHeight = getVolDivHeight(chart);
            var indHeight = getIndDivHeight(chart);
            return candleHeight + volHeight + indHeight - chart.m_indPaddingBottom - (indHeight - chart.m_indPaddingTop - chart.m_indPaddingBottom) * rate;
        }else{
            return 0;
        }
    }
    else if (divIndex == 3) {
        if (chart.m_indMax2 > chart.m_indMin2) {
            var rate = (value - chart.m_indMin2) / (chart.m_indMax2 - chart.m_indMin2);
            var candleHeight = getCandleDivHeight(chart);
            var volHeight = getVolDivHeight(chart);
            var indHeight = getIndDivHeight(chart);
            var indHeight2 = getIndDivHeight2(chart);
            return candleHeight + volHeight + indHeight + indHeight2 - chart.m_indPaddingBottom2 - (indHeight2 - chart.m_indPaddingTop2 - chart.m_indPaddingBottom2) * rate;
        } else {
            return 0;
        }
    }
    return 0;
};

/*
* 根据坐标获取对应的值
* chart:K线
* point:坐标
*/
var getChartValue = function(chart, point){
    var candleHeight = getCandleDivHeight(chart);
    var volHeight = getVolDivHeight(chart);
    var indHeight = getIndDivHeight(chart);
    var indHeight2 = getIndDivHeight(chart);
    if(point.y <= candleHeight){
        var rate = (candleHeight - chart.m_candlePaddingBottom - point.y) / (candleHeight - chart.m_candlePaddingTop - chart.m_candlePaddingBottom);
        var cMin = chart.m_candleMin, cMax = chart.m_candleMax;
        if(chart.m_vScaleType != "standard"){
            if (cMax > 0) {
                cMax = Math.log10(cMax);
            } else if (cMax < 0) {
                cMax = -Math.log10(Math.abs(cMax));
            }
            if (cMin > 0) {
                cMin = Math.log10(cMin);
            } else if (cMin < 0) {
                cMin = -Math.log10(Math.abs(cMin));
            }
        }
        var result = cMin + (cMax - cMin) * rate;
        if(chart.m_vScaleType != "standard"){
            return Math.pow(10, result);
        }else{
            return result;
        }
    }
    else if(point.y > candleHeight && point.y <= candleHeight + volHeight){
        var rate = (volHeight - chart.m_volPaddingBottom - (point.y - candleHeight)) / (volHeight - chart.m_volPaddingTop - chart.m_volPaddingBottom);
        return chart.m_volMin + (chart.m_volMax - chart.m_volMin) * rate;
    }else if(point.y > candleHeight + volHeight && point.y <= candleHeight + volHeight + indHeight){
        var rate = (indHeight - chart.m_indPaddingBottom - (point.y - candleHeight - volHeight)) / (indHeight - chart.m_indPaddingTop - chart.m_indPaddingBottom);
        return chart.m_indMin + (chart.m_indMax - chart.m_indMin) * rate;
    } else if (point.y > candleHeight + volHeight + indHeight && point.y <= candleHeight + volHeight + indHeight + indHeight2) {
        var rate = (indHeight2 - chart.m_indPaddingBottom2 - (point.y - candleHeight - volHeight - indHeight)) / (indHeight2 - chart.m_indPaddingTop2 - chart.m_indPaddingBottom2);
        return chart.m_indMin2 + (chart.m_indMax2 - chart.m_indMin2) * rate;
    }
    return 0;
}

/*
* 根据坐标获取对应的值
* chart:K线
* point:坐标
*/
var getCandleDivValue = function (chart, point) {
    var candleHeight = getCandleDivHeight(chart);
    var rate = (candleHeight - chart.m_candlePaddingBottom - point.y) / (candleHeight - chart.m_candlePaddingTop - chart.m_candlePaddingBottom);
    var cMin = chart.m_candleMin, cMax = chart.m_candleMax;
    if (chart.m_vScaleType != "standard") {
        if (cMax > 0) {
            cMax = Math.log10(cMax);
        } else if (cMax < 0) {
            cMax = -Math.log10(Math.abs(cMax));
        }
        if (cMin > 0) {
            cMin = Math.log10(cMin);
        } else if (cMin < 0) {
            cMin = -Math.log10(Math.abs(cMin));
        }
    }
    var result = cMin + (cMax - cMin) * rate;
    if (chart.m_vScaleType != "standard") {
        return Math.pow(10, result);
    } else {
        return result;
    }
}

/*
* 检查最后可见索引
* chart:K线
*/
var checkChartLastVisibleIndex = function(chart){
    if (chart.m_lastVisibleIndex > chart.m_data.length - 1) {
        chart.m_lastVisibleIndex = chart.m_data.length - 1;
    }
    if (chart.m_data.length > 0) {
        chart.m_lastVisibleKey = chart.m_data[chart.m_lastVisibleIndex].m_date;
        if (chart.m_lastVisibleIndex == chart.m_data.length - 1) {
            chart.m_lastRecordIsVisible = true;
        } else {
            chart.m_lastRecordIsVisible = false;
        }
    } else {
        chart.m_lastVisibleKey = 0;
        chart.m_lastRecordIsVisible = true;
    }
};

/*
* 自动设置首先可见和最后可见的记录号
* chart:K线
*/ 
var resetChartVisibleRecord = function(chart){
    var rowsCount = chart.m_data.length;
    var workingAreaWidth = getChartWorkAreaWidth(chart);
    if (chart.m_autoFillHScale) {
        if (workingAreaWidth > 0 && rowsCount > 0) {
            chart.m_hScalePixel = workingAreaWidth / rowsCount;
            chart.m_firstVisibleIndex = 0;
            chart.m_lastVisibleIndex = rowsCount - 1;
        }
    } else {
        var maxVisibleRecord = getChartMaxVisibleCount(chart, chart.m_hScalePixel, workingAreaWidth);
        //没数据时重置
        if (rowsCount == 0) {
            chart.m_firstVisibleIndex = -1;
            chart.m_lastVisibleIndex = -1;
        } else {
            //数据不足一屏时
            if (rowsCount < maxVisibleRecord) {
                chart.m_lastVisibleIndex = rowsCount - 1;
                chart.m_firstVisibleIndex = 0;
            }
            //数据超过一屏时
            else {
                //显示中间的数据时
                if (chart.m_firstVisibleIndex != -1 && chart.m_lastVisibleIndex != -1 && !chart.m_lastRecordIsVisible) {
                    var index = getChartIndexByDate(chart, chart.m_lastVisibleKey);
                    if (index != -1) {
                        chart.m_lastVisibleIndex = index;
                    }
                    chart.m_firstVisibleIndex = chart.m_lastVisibleIndex - maxVisibleRecord + 1;
                    if (chart.m_firstVisibleIndex < 0) {
                        chart.m_firstVisibleIndex = 0;
                        chart.m_lastVisibleIndex = chart.m_firstVisibleIndex + maxVisibleRecord;
                        checkChartLastVisibleIndex(chart);
                    }
                } else {
                    //第一条或最后一条数据被显示时
                    chart.m_lastVisibleIndex = rowsCount - 1;
                    chart.m_firstVisibleIndex = chart.m_lastVisibleIndex - maxVisibleRecord + 1;
                    if (chart.m_firstVisibleIndex > chart.m_lastVisibleIndex) {
                        chart.m_firstVisibleIndex = chart.m_lastVisibleIndex;
                    }
                }
            }
        }
    }
};

/*
* 设置可见索引
* chart:K线
* firstVisibleIndex:起始索引
* lastVisibleIndex:结束索引
*/
var setChartVisibleIndex = function(chart, firstVisibleIndex, lastVisibleIndex){
    var xScalePixel = getChartWorkAreaWidth(chart) / (lastVisibleIndex - firstVisibleIndex + 1);
    if (xScalePixel < 1000000) {
        chart.m_firstVisibleIndex = firstVisibleIndex;
        chart.m_lastVisibleIndex = lastVisibleIndex;
        //设置最后一条记录是否可见
        if (lastVisibleIndex != chart.m_data.length - 1) {
            chart.m_lastRecordIsVisible = false;
        } else {
            chart.m_lastRecordIsVisible = true;
        }
        chart.m_hScalePixel = xScalePixel;
        checkChartLastVisibleIndex(chart);
    }
};

/*
* 清除图形
* chart:K线
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawChart = function (chart, paint, clipRect) {
    try {
        if (chart.m_backColor) {
            paint.fillRect(chart.m_backColor, 0, 0, chart.m_size.cx, chart.m_size.cy);
        }
        if(paint.onPaintChartScale){
            paint.onPaintChartScale(chart, paint, clipRect);
        }else{
            drawChartScale(chart, paint, clipRect);
        }
        if(paint.onPaintChartStock){
            paint.onPaintChartStock(chart, paint, clipRect);
        } else {
            drawChartStock(chart, paint, clipRect);
        }
        if(paint.onPaintChartPlot){
             paint.onPaintChartPlot(chart, paint, clipRect);
        }else{
            drawChartPlot(chart, paint, clipRect);
        }
        if(paint.onPaintChartCrossLine){
            paint.onPaintChartCrossLine(chart, paint, clipRect);
        }else{
            drawChartCrossLine(chart, paint, clipRect); 
        }
        if (chart.m_borderColor) {
            paint.drawRect(chart.m_borderColor, m_lineWidth_Chart, 0, 0, 0, chart.m_size.cx, chart.m_size.cy);
        }
    } catch (err) {
    }
};

/*
* 计算坐标轴
* min:最小值
* max:最大值
* yLen:长度
* maxSpan:最大间隔
* minSpan:最小间隔
* defCount:数量
*/
var chartGridScale = function(min, max, yLen, maxSpan, minSpan, defCount){
    var sub = max - min;
    var nMinCount = parseInt(Math.ceil(yLen / maxSpan));
    var nMaxCount = parseInt(Math.floor(yLen / minSpan));
    var nCount = defCount;
    var logStep = sub / nCount;
    var start = false;
    var divisor = 0;
    var i = 0, nTemp = 0;
    m_gridStep_Chart = 0;
    m_gridDigit_Chart = 0;
    nCount = Math.max(nMinCount, nCount);
    nCount = Math.min(nMaxCount, nCount);
    nCount = Math.max(nCount, 1);
    for (i = 15; i >= -6; i--) {
        divisor = Math.pow(10.0, i);
        if (divisor < 1) {
            m_gridDigit_Chart++;
        }
        nTemp = parseInt(Math.floor(logStep / divisor));
        if (start) {
            if (nTemp < 4) {
                if (m_gridDigit_Chart > 0) {
                    m_gridDigit_Chart--;
                }
            } else if (nTemp >= 4 && nTemp <= 6) {
                nTemp = 5;
                m_gridStep_Chart += nTemp * divisor;
            } else {
                m_gridStep_Chart += 10 * divisor;
                if (m_gridDigit_Chart > 0) {
                    m_gridDigit_Chart--;
                }
            }
            break;
        } else if (nTemp > 0) {
            m_gridStep_Chart = nTemp * divisor + m_gridStep_Chart;
            logStep -= m_gridStep_Chart;
            start = true;
        }
    }
    return 0;
};

/*
* 缩小
* chart:K线
*/
var zoomOutChart = function(chart){
    if (!chart.m_autoFillHScale) {
        var hScalePixel = chart.m_hScalePixel;
        var oldX = getChartX(chart, chart.m_crossStopIndex);
        var pureH = getChartWorkAreaWidth(chart);
        var oriMax = -1, max = -1, deal = 0;
        var dataCount = chart.m_data.length;
        var findex = chart.m_firstVisibleIndex, lindex = chart.m_lastVisibleIndex;
        if (hScalePixel < 500) {
            oriMax = getChartMaxVisibleCount(chart, hScalePixel, pureH);
            if (dataCount < oriMax) {
                deal = 1;
            }
            if (hScalePixel > 3) {
                hScalePixel += 1;
            } else {
                if (hScalePixel == 1) {
                    hScalePixel = 2;
                } else {
                    hScalePixel = hScalePixel * 1.5;
                    if (hScalePixel > 3) {
                        hScalePixel = parseInt(hScalePixel);
                    }
                }
            }
            max = getChartMaxVisibleCount(chart, hScalePixel, pureH);
            if (dataCount >= max) {
                if (deal == 1) {
                    lindex = dataCount - 1;
                }
                findex = lindex - max + 1;
                if (findex < 0) {
                    findex = 0;
                }
            }
        }
        chart.m_hScalePixel = hScalePixel;
        chart.m_firstVisibleIndex = findex;
        chart.m_lastVisibleIndex = lindex;
        if (chart.m_showCrossLine){
            var newX = getChartX(chart, chart.m_crossStopIndex);
            if (newX > oldX) {
                while (chart.m_lastVisibleIndex < chart.m_data.length - 1){
                    chart.m_firstVisibleIndex++;
                    chart.m_lastVisibleIndex++;
                    newX = getChartX(chart, chart.m_crossStopIndex);
                    if (newX <= oldX){
                        break;
                    }
                }

            }
            else if (newX < oldX){
                while (chart.m_firstVisibleIndex > 0){
                    chart.m_firstVisibleIndex--;
                    chart.m_lastVisibleIndex--;
                    newX = getChartX(chart, chart.m_crossStopIndex);
                    if (newX >= oldX){
                        break;
                    }
                }
            }
        }
        checkChartLastVisibleIndex(chart);
        if(chart.onCalculateChartMaxMin){
            chart.onCalculateChartMaxMin(chart);
        }else{
            calculateChartMaxMin(chart);
        }
    }
};

/*
* 放大
* chart:K线
*/
var zoomInChart = function(chart){
    if (!chart.m_autoFillHScale) {
        var hScalePixel = chart.m_hScalePixel;
        var oldX = getChartX(chart, chart.m_crossStopIndex);
        var pureH = getChartWorkAreaWidth(chart);
        var max = -1;
        var dataCount = chart.m_data.length;
        var findex = chart.m_firstVisibleIndex, lindex = chart.m_lastVisibleIndex;
        if (hScalePixel > 3) {
            hScalePixel -= 1;
        } else {
            hScalePixel = hScalePixel * 2 / 3;
            if (hScalePixel > 3) {
                hScalePixel = parseInt(hScalePixel);
            }
        }
        max = getChartMaxVisibleCount(chart, hScalePixel, pureH);
        if (max >= dataCount) {
            if (hScalePixel < 1) {
                hScalePixel = pureH / max;
            }
            findex = 0;
            lindex = dataCount - 1;
        } else {
            findex = lindex - max + 1;
            if (findex < 0) {
                findex = 0;
            }
        }
        chart.m_hScalePixel = hScalePixel;
        chart.m_firstVisibleIndex = findex;
        chart.m_lastVisibleIndex = lindex;
        if (chart.m_showCrossLine){
            var newX = getChartX(chart, chart.m_crossStopIndex);
            if (newX > oldX){
                while (chart.m_lastVisibleIndex < chart.m_data.length - 1){
                    chart.m_firstVisibleIndex++;
                    chart.m_lastVisibleIndex++;
                    newX = getChartX(chart, chart.m_crossStopIndex);
                    if (newX <= oldX)
                    {
                        break;
                    }
                }

            }
            else if (newX < oldX){
                while (chart.m_firstVisibleIndex > 0){
                    chart.m_firstVisibleIndex--;
                    chart.m_lastVisibleIndex--;
                    newX = getChartX(chart, chart.m_crossStopIndex);
                    if (newX >= oldX){
                        break;
                    }
                }
            }
        }
        checkChartLastVisibleIndex(chart);
       if(chart.onCalculateChartMaxMin){
            chart.onCalculateChartMaxMin(chart);
        }else{
            calculateChartMaxMin(chart);
        }
    }
};

/*
* 绘制刻度
* chart:K线
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawChartScale = function(chart, paint, clipRect) {
    if(chart.m_leftVScaleWidth > 0){
        paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth, 0, chart.m_leftVScaleWidth, chart.m_size.cy - chart.m_hScaleHeight);
    }
    if(chart.m_rightVScaleWidth > 0){
        paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_size.cx - chart.m_rightVScaleWidth, 0, chart.m_size.cx - chart.m_rightVScaleWidth, chart.m_size.cy - chart.m_hScaleHeight);
    }
    if(chart.m_hScaleHeight > 0){
        paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, 0, chart.m_size.cy - chart.m_hScaleHeight, chart.m_size.cx, chart.m_size.cy - chart.m_hScaleHeight);
    }
    var candleDivHeight = getCandleDivHeight(chart);
    var volDivHeight = getVolDivHeight(chart);
    var indDivHeight = getIndDivHeight(chart);
    var indDivHeight2 = getIndDivHeight2(chart);
    if(volDivHeight > 0){
        paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth, candleDivHeight, chart.m_size.cx - chart.m_rightVScaleWidth, candleDivHeight);
    }
    if(indDivHeight > 0){
        paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth, candleDivHeight + volDivHeight, chart.m_size.cx - chart.m_rightVScaleWidth, candleDivHeight + volDivHeight);
    }
    if(indDivHeight2 > 0) {
        paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth, candleDivHeight + volDivHeight + indDivHeight, chart.m_size.cx - chart.m_rightVScaleWidth, candleDivHeight + volDivHeight + indDivHeight);
    }
    chartGridScale(chart.m_candleMin, chart.m_candleMax,  (candleDivHeight - chart.m_candlePaddingTop - chart.m_candlePaddingBottom) / 2, chart.m_vScaleDistance, chart.m_vScaleDistance / 2, parseInt((candleDivHeight - chart.m_candlePaddingTop - chart.m_candlePaddingBottom) / chart.m_vScaleDistance)); 
    if(m_gridStep_Chart > 0){
        var drawValues = new Array();
        var isTrend = chart.m_cycle == "trend";
        var firstOpen = 0;
        if(isTrend){
            firstOpen = chart.m_data[chart.m_firstVisibleIndex].m_close;
            var subValue = (chart.m_candleMax - chart.m_candleMin);
            var count = parseInt((candleDivHeight - chart.m_candlePaddingTop - chart.m_candlePaddingBottom) / chart.m_vScaleDistance);
            if(count > 0){
                subValue /= count;
            }
            var start = firstOpen;
            while(start < chart.m_candleMax){
                start += subValue;
                if(start <= chart.m_candleMax){
                    drawValues.push(start);
                }
            }
            start = firstOpen;
            while(start > chart.m_candleMin){
                start -= subValue;
                if(start >= chart.m_candleMin){
                    drawValues.push(start);
                }
            }
        }else{
            var start = 0;
            if (chart.m_candleMin >= 0) {
                while (start + m_gridStep_Chart < chart.m_candleMin) {
                    start += m_gridStep_Chart;
                }
            } else {
                while (start - m_gridStep_Chart > chart.m_candleMin) {
                    start -= m_gridStep_Chart;
                }
            }

            while (start <= chart.m_candleMax) {
                if(start > chart.m_candleMin){
                    drawValues.push(start);
                }
                start += m_gridStep_Chart;
            }
        }
        drawValues.push(firstOpen);
        for(var i = 0; i < drawValues.length; i++){
            var start = drawValues[i];
            var hAxisY = getChartY(chart, 0, start);
            paint.drawLine(chart.m_gridColor, m_lineWidth_Chart, [1,1], chart.m_leftVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY));
            paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth - 8, parseInt(hAxisY), chart.m_leftVScaleWidth, parseInt(hAxisY));
            paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth + 8, parseInt(hAxisY));
            var tSize = paint.textSize(start.toFixed(chart.m_candleDigit), chart.m_font);
            if(isTrend){
                var diffRange = ((start - firstOpen) / firstOpen * 100);
                var diffRangeStr = diffRange.toFixed(2) + "%";
                if(diffRange >= 0){
                    paint.drawText(diffRangeStr, chart.m_upColor, chart.m_font, chart.m_size.cx - chart.m_rightVScaleWidth + 10, parseInt(hAxisY));
                }else{
                    paint.drawText(diffRangeStr, chart.m_downColor, chart.m_font, chart.m_size.cx - chart.m_rightVScaleWidth + 10, parseInt(hAxisY));
                }
            }else{
                paint.drawText(start.toFixed(chart.m_candleDigit), chart.m_textColor, chart.m_font, chart.m_size.cx - chart.m_rightVScaleWidth + 10, parseInt(hAxisY));
            }
            paint.drawText(start.toFixed(chart.m_candleDigit), chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth - tSize.cx - 10, parseInt(hAxisY));
        }
    }
    chartGridScale(chart.m_volMin, chart.m_volMax,  (volDivHeight - chart.m_volPaddingTop - chart.m_volPaddingBottom) / 2, chart.m_vScaleDistance, chart.m_vScaleDistance / 2, parseInt((volDivHeight - chart.m_volPaddingTop - chart.m_volPaddingBottom) / chart.m_vScaleDistance)); 
    if(m_gridStep_Chart > 0){
        var start = 0;
        if (chart.m_volMin >= 0) {
            while (start + m_gridStep_Chart < chart.m_volMin) {
                start += m_gridStep_Chart;
            }
        } else {
            while (start - m_gridStep_Chart > chart.m_volMin) {
                start -= m_gridStep_Chart;
            }
        }
        while (start <= chart.m_volMax) {
            if(start > chart.m_volMin){
                var hAxisY = getChartY(chart, 1, start);
                paint.drawLine(chart.m_gridColor, m_lineWidth_Chart, [1,1], chart.m_leftVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY));
                paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth - 8, parseInt(hAxisY), chart.m_leftVScaleWidth, parseInt(hAxisY));
                paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth + 8, parseInt(hAxisY));
	            var tSize = paint.textSize((start/chart.m_magnitude).toFixed(chart.m_volDigit), chart.m_font);
	            paint.drawText((start/chart.m_magnitude).toFixed(chart.m_volDigit), chart.m_textColor, chart.m_font, chart.m_size.cx - chart.m_rightVScaleWidth + 10, parseInt(hAxisY));
	            paint.drawText((start/chart.m_magnitude).toFixed(chart.m_volDigit), chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth - tSize.cx - 10, parseInt(hAxisY));
	        }
            start += m_gridStep_Chart;
        }
    }
    if(indDivHeight > 0){
        chartGridScale(chart.m_indMin, chart.m_indMax, (indDivHeight - chart.m_indPaddingTop - chart.m_indPaddingBottom) / 2, chart.m_vScaleDistance, chart.m_vScaleDistance / 2, parseInt((indDivHeight - chart.m_indPaddingTop - chart.m_indPaddingBottom) / chart.m_vScaleDistance)); 
        if(m_gridStep_Chart > 0){
            var start = 0;
            if (chart.m_indMin >= 0) {
                while (start + m_gridStep_Chart < chart.m_indMin) {
                    start += m_gridStep_Chart;
                }
            } else {
                while (start - m_gridStep_Chart > chart.m_indMin) {
                    start -= m_gridStep_Chart;
                }
            }
  
            while (start <= chart.m_indMax) {
                if(start > chart.m_indMin){
                    var hAxisY = getChartY(chart, 2, start);
                    paint.drawLine(chart.m_gridColor, m_lineWidth_Chart, [1,1], chart.m_leftVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY));
                    paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth - 8, parseInt(hAxisY), chart.m_leftVScaleWidth, parseInt(hAxisY));
                    paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth + 8, parseInt(hAxisY));
	                var tSize = paint.textSize(start.toFixed(chart.m_indDigit), chart.m_font);
	                paint.drawText(start.toFixed(chart.m_indDigit), chart.m_textColor, chart.m_font, chart.m_size.cx - chart.m_rightVScaleWidth + 10, parseInt(hAxisY));
	                paint.drawText(start.toFixed(chart.m_indDigit), chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth - tSize.cx - 10, parseInt(hAxisY));
	            }
                start += m_gridStep_Chart;
            }
        }  
    }
    if (indDivHeight2 > 0) {
        chartGridScale(chart.m_indMin2, chart.m_indMax2, (indDivHeight2 - chart.m_indPaddingTop2 - chart.m_indPaddingBottom2) / 2, chart.m_vScaleDistance, chart.m_vScaleDistance / 2, parseInt((indDivHeight2 - chart.m_indPaddingTop2 - chart.m_indPaddingBottom2) / chart.m_vScaleDistance));
        if (m_gridStep_Chart > 0) {
            var start = 0;
            if (chart.m_indMin2 >= 0) {
                while (start + m_gridStep_Chart < chart.m_indMin2) {
                    start += m_gridStep_Chart;
                }
            } else {
                while (start - m_gridStep_Chart > chart.m_indMin2) {
                    start -= m_gridStep_Chart;
                }
            }

            while (start <= chart.m_indMax2) {
                if (start > chart.m_indMin2) {
                    var hAxisY = getChartY(chart, 3, start);
                    paint.drawLine(chart.m_gridColor, m_lineWidth_Chart, [1, 1], chart.m_leftVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY));
                    paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth - 8, parseInt(hAxisY), chart.m_leftVScaleWidth, parseInt(hAxisY));
                    paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, chart.m_size.cx - chart.m_rightVScaleWidth, parseInt(hAxisY), chart.m_size.cx - chart.m_rightVScaleWidth + 8, parseInt(hAxisY));
                    var tSize = paint.textSize(start.toFixed(chart.m_indDigit), chart.m_font);
                    paint.drawText(start.toFixed(chart.m_indDigit), chart.m_textColor, chart.m_font, chart.m_size.cx - chart.m_rightVScaleWidth + 10, parseInt(hAxisY));
                    paint.drawText(start.toFixed(chart.m_indDigit), chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth - tSize.cx - 10, parseInt(hAxisY));
                }
                start += m_gridStep_Chart;
            }
        }
    }
    if(chart.m_data && chart.m_data.length > 0 && chart.m_hScaleHeight > 0){
        var dLeft = chart.m_leftVScaleWidth + 10;
        for(var i = chart.m_firstVisibleIndex; i <= chart.m_lastVisibleIndex; i++){
            var date = new Date();
		    date.setTime(chart.m_data[i].m_date);
            var xText = "";
            if (chart.m_cycle == "day"){
                xText = dateFormat("YYYY-mm-dd", date);
            } else if (chart.m_cycle == "minute"){
                xText = dateFormat("YYYY-mm-dd HH:MM", date);
            }else if (chart.m_cycle == "trend"){
                xText = dateFormat("HH:MM", date);
            }
             else if (chart.m_cycle == "second"){
                xText = dateFormat("HH:MM:SS", date);
            }
             else if (chart.m_cycle == "tick"){
                xText = i + 1;
            }
            var tSize = paint.textSize(xText, chart.m_font);
            var x = getChartX(chart, i);
            var dx = x - tSize.cx / 2;
            if(dx > dLeft && dx < chart.m_size.cx - chart.m_rightVScaleWidth - 10){
                paint.drawLine(chart.m_scaleColor, m_lineWidth_Chart, 0, x, chart.m_size.cy - chart.m_hScaleHeight, x, chart.m_size.cy - chart.m_hScaleHeight + 8);
                paint.drawText(xText, chart.m_textColor, chart.m_font, dx, chart.m_size.cy - chart.m_hScaleHeight + 8 + tSize.cy / 2);
                dLeft = x + tSize.cx;
            }
        }
    }
};

/*
* 绘制十字线
* chart:K线
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawChartCrossLine = function (chart, paint, clipRect) {
    if(!chart.m_data || chart.m_data.length == 0){
        return;
    }
    var candleDivHeight = getCandleDivHeight(chart);
    var volDivHeight = getVolDivHeight(chart);
    var indDivHeight = getIndDivHeight(chart);
    var indDivHeight2 = getIndDivHeight2(chart);
    var crossLineIndex = chart.m_crossStopIndex;
    if (crossLineIndex == -1) {
        crossLineIndex = chart.m_lastVisibleIndex;
    }
    var str = "A" + crossLineIndex;
    if (str == "ANaN") {
        crossLineIndex = chart.m_lastVisibleIndex;
    }
    if (volDivHeight > 0) {
        var drawTitles = new Array();
        var drawColors = new Array();
        drawTitles.push("VOL " + chart.m_data[crossLineIndex].m_volume.toFixed(chart.m_volDigit));
        drawColors.push(chart.m_textColor);
        if (chart.m_shapes.length > 0) {
            for (var i = 0; i < chart.m_shapes.length; i++) {
                shape = chart.m_shapes[i]
                if (shape.m_divIndex == 1) {
                    drawTitles.push(shape.m_title + " " + shape.m_datas[crossLineIndex].toFixed(chart.m_volDigit));
                    drawColors.push(shape.m_color)
                    if (shape.m_datas2.length > 0) {
                        drawTitles.push(shape.m_title2 + " " + shape.m_datas2[crossLineIndex].toFixed(chart.m_volDigit));
                        drawColors.push(shape.m_color2)
                    }
                }
            }
        }
        var iLeft = chart.m_leftVScaleWidth + 5;
        for (var i = 0; i < drawTitles.length; i++) {
            var tSize = paint.textSize(drawTitles[i], chart.m_font);
            paint.drawText(drawTitles[i], drawColors[i], chart.m_font, iLeft, candleDivHeight + 5 + tSize.cy / 2);
            iLeft += tSize.cx + 5;
        }
    }
    //上面显示数据  高开低收
    if (chart.m_cycle == "trend"){
        var drawTitles = new Array();
        var drawColors = new Array();
        drawTitles.push("CLOSE " + chart.m_data[crossLineIndex].m_close.toFixed(chart.m_candleDigit));
        drawColors.push(chart.m_textColor);
        if (chart.m_shapes.length > 0) {
            for (var i = 0; i < chart.m_shapes.length; i++) {
                shape = chart.m_shapes[i]
                if (shape.m_divIndex == 0) {
                    drawTitles.push(shape.m_title + " " + shape.m_datas[crossLineIndex].toFixed(chart.m_candleDigit));
                    drawColors.push(shape.m_color)
                    if (shape.m_datas2.length > 0) {
                        drawTitles.push(shape.m_title2 + " " + shape.m_datas2[crossLineIndex].toFixed(chart.m_candleDigit));
                        drawColors.push(shape.m_color2)
                    }
                }
            }
        }
        var iLeft = chart.m_leftVScaleWidth + 5;
        for (var i = 0; i < drawTitles.length; i++) {
            var tSize = paint.textSize(drawTitles[i], chart.m_font);
            paint.drawText(drawTitles[i], drawColors[i], chart.m_font, iLeft, 5 + tSize.cy / 2);
            iLeft += tSize.cx + 5;
        }
    }else{
        var drawTitles = new Array();
        var drawColors = new Array();
        if (chart.m_mainIndicator == "MA") {
            drawTitles.push("MA5 " + chart.m_maMap.ma5[crossLineIndex].toFixed(chart.m_candleDigit));
            drawTitles.push("MA10 " + chart.m_maMap.ma10[crossLineIndex].toFixed(chart.m_candleDigit));
            drawTitles.push("MA20 " + chart.m_maMap.ma20[crossLineIndex].toFixed(chart.m_candleDigit));
            drawTitles.push("MA30 " + chart.m_maMap.ma30[crossLineIndex].toFixed(chart.m_candleDigit));
            drawTitles.push("MA120 " + chart.m_maMap.ma120[crossLineIndex].toFixed(chart.m_candleDigit));
            drawTitles.push("MA250 " + chart.m_maMap.ma250[crossLineIndex].toFixed(chart.m_candleDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
            drawColors.push(m_indicatorColors[2]);
            drawColors.push(m_indicatorColors[5]);
            drawColors.push(m_indicatorColors[4]);
            drawColors.push(m_indicatorColors[3]);
        } else if (chart.m_mainIndicator == "BOLL") {
            drawTitles.push("MID " + chart.m_bollMap.mid[crossLineIndex].toFixed(chart.m_candleDigit));
            drawTitles.push("UP " + chart.m_bollMap.upper[crossLineIndex].toFixed(chart.m_candleDigit));
            drawTitles.push("LOW " + chart.m_bollMap.lower[crossLineIndex].toFixed(chart.m_candleDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
            drawColors.push(m_indicatorColors[2]);
        }
        if (chart.m_shapes.length > 0) {
            for (var i = 0; i < chart.m_shapes.length; i++) {
                shape = chart.m_shapes[i]
                if (shape.m_divIndex == 0) {
                    drawTitles.push(shape.m_title + " " + shape.m_datas[crossLineIndex].toFixed(chart.m_candleDigit));
                    drawColors.push(shape.m_color)
                    if (shape.m_datas2.length > 0) {
                        drawTitles.push(shape.m_title2 + " " + shape.m_datas2[crossLineIndex].toFixed(chart.m_candleDigit));
                        drawColors.push(shape.m_color2)
                    }
                }
            }
        }
        var iLeft = chart.m_leftVScaleWidth + 5;
        for (var i = 0; i < drawTitles.length; i++) {
            var tSize = paint.textSize(drawTitles[i], chart.m_font);
            paint.drawText(drawTitles[i], drawColors[i], chart.m_font, iLeft, 5 + tSize.cy / 2);
            iLeft += tSize.cx + 5;
        }
    }
    if(indDivHeight > 0){
        var drawTitles = new Array();
        var drawColors = new Array();
        if(chart.m_showIndicator == "MACD"){
            drawTitles.push("DIF " + chart.m_alldifarr[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("DEA " + chart.m_alldeaarr[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("MACD " + chart.m_allmacdarr[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
            drawColors.push(m_indicatorColors[4]);
        }else if(chart.m_showIndicator == "KDJ"){
            drawTitles.push("K " + chart.m_kdjMap.k[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("D " + chart.m_kdjMap.d[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("J " + chart.m_kdjMap.j[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
            drawColors.push(m_indicatorColors[2]);
        }else if(chart.m_showIndicator == "RSI"){
            drawTitles.push("RSI6 " + chart.m_rsiMap.rsi6[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("RSI12 " + chart.m_rsiMap.rsi12[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("RSI24 " + chart.m_rsiMap.rsi24[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[5]);
            drawColors.push(m_indicatorColors[1]);
            drawColors.push(m_indicatorColors[2]);
        }
        else if(chart.m_showIndicator == "BIAS"){
            drawTitles.push("BIAS6 " + chart.m_biasMap.bias1[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("BIAS12 " + chart.m_biasMap.bias2[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("BIAS24 " + chart.m_biasMap.bias3[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[5]);
            drawColors.push(m_indicatorColors[1]);
            drawColors.push(m_indicatorColors[2]);
        }
        else if(chart.m_showIndicator == "ROC"){
            drawTitles.push("ROC " + chart.m_rocMap.roc[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("ROCMA " + chart.m_rocMap.maroc[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
        }        
        else if(chart.m_showIndicator == "WR"){
            drawTitles.push("WR5 " + chart.m_wrMap.wr1[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("WR10 " + chart.m_wrMap.wr2[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
        }
         else if(chart.m_showIndicator == "CCI"){
            drawTitles.push("CCI " + chart.m_cciArr[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
        }else if(chart.m_showIndicator == "BBI"){
            drawTitles.push("BBI " + chart.m_bbiMap.bbi[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
        }else if(chart.m_showIndicator == "TRIX"){
            drawTitles.push("TRIX " + chart.m_trixMap.trix[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("TRIXMA " + chart.m_trixMap.matrix[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
        }
        else if(chart.m_showIndicator == "DMA"){
            drawTitles.push("MA10 " + chart.m_dmaMap.dif[crossLineIndex].toFixed(chart.m_indDigit));
            drawTitles.push("MA50 " + chart.m_dmaMap.difma[crossLineIndex].toFixed(chart.m_indDigit));
            drawColors.push(m_indicatorColors[0]);
            drawColors.push(m_indicatorColors[1]);
        }
        if (chart.m_shapes.length > 0) {
            for (var i = 0; i < chart.m_shapes.length; i++) {
                shape = chart.m_shapes[i]
                if (shape.m_divIndex == 2) {
                    drawTitles.push(shape.m_title + " " + shape.m_datas[crossLineIndex].toFixed(chart.m_indDigit));
                    drawColors.push(shape.m_color)
                    if (shape.m_datas2.length > 0) {
                        drawTitles.push(shape.m_title2 + " " + shape.m_datas2[crossLineIndex].toFixed(chart.m_indDigit));
                        drawColors.push(shape.m_color2)
                    }
                }
            }
        }
        var iLeft = chart.m_leftVScaleWidth + 5;
        for(var i = 0; i < drawTitles.length; i++){
            var tSize = paint.textSize(drawTitles[i], chart.m_font);
            paint.drawText(drawTitles[i], drawColors[i], chart.m_font, iLeft, candleDivHeight + volDivHeight + 5 + tSize.cy / 2);
            iLeft += tSize.cx + 5;
        }
    }
    if (indDivHeight2 > 0) {
        var drawTitles = new Array();
        var drawColors = new Array();
        if (chart.m_shapes.length > 0) {
            for (var i = 0; i < chart.m_shapes.length; i++) {
                shape = chart.m_shapes[i]
                if (shape.m_divIndex == 3) {
                    drawTitles.push(shape.m_title + " " + shape.m_datas[crossLineIndex].toFixed(chart.m_indDigit2));
                    drawColors.push(shape.m_color)
                    if (shape.m_datas2.length > 0) {
                        drawTitles.push(shape.m_title2 + " " + shape.m_datas2[crossLineIndex].toFixed(chart.m_indDigit2));
                        drawColors.push(shape.m_color2)
                    }
                }
            }
        }
        if (drawTitles.length > 0) {
            var iLeft = chart.m_leftVScaleWidth + 5;
            for (var i = 0; i < drawTitles.length; i++) {
                var tSize = paint.textSize(drawTitles[i], chart.m_font);
                paint.drawText(drawTitles[i], drawColors[i], chart.m_font, iLeft, candleDivHeight + volDivHeight + indDivHeight + 5 + tSize.cy / 2);
                iLeft += tSize.cx + 5;
            }
        }
    }
    
    if(chart.m_showCrossLine){
        var rightText = "";
        if(chart.m_mousePosition.y < candleDivHeight) {
            rightText = getChartValue(chart, chart.m_mousePosition).toFixed(chart.m_candleDigit);	
        }
        else if(chart.m_mousePosition.y > candleDivHeight && chart.m_mousePosition.y < candleDivHeight + volDivHeight) {
            rightText = getChartValue(chart, chart.m_mousePosition).toFixed(chart.m_volDigit);
        }else if(chart.m_mousePosition.y > candleDivHeight + volDivHeight && chart.m_mousePosition.y < candleDivHeight + volDivHeight + indDivHeight){
            rightText = getChartValue(chart, chart.m_mousePosition).toFixed(chart.m_indDigit);
        } else if (chart.m_mousePosition.y > candleDivHeight + volDivHeight + indDivHeight && chart.m_mousePosition.y < candleDivHeight + volDivHeight + indDivHeight + indDivHeight2) {
            rightText = getChartValue(chart, chart.m_mousePosition).toFixed(chart.m_indDigit2);
        }

        var drawY = chart.m_mousePosition.y;
        if(drawY > chart.m_size.cy - chart.m_hScaleHeight){
            drawY = chart.m_size.cy - chart.m_hScaleHeight;
        }
        var tSize = paint.textSize(rightText, chart.m_font);
        if(chart.m_leftVScaleWidth > 0){
            paint.fillRect(chart.m_crossTipColor, chart.m_leftVScaleWidth - tSize.cx, drawY - tSize.cy / 2 - 4, chart.m_leftVScaleWidth, drawY + tSize.cy / 2 + 3);
            paint.drawText(rightText, chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth - tSize.cx, drawY);
        }
        if(chart.m_rightVScaleWidth > 0){
            paint.fillRect(chart.m_crossTipColor, chart.m_size.cx - chart.m_rightVScaleWidth, drawY - tSize.cy / 2 - 4, chart.m_size.cx - chart.m_rightVScaleWidth + tSize.cx, drawY + tSize.cy / 2 + 3);
            paint.drawText(rightText, chart.m_textColor, chart.m_font, chart.m_size.cx - chart.m_rightVScaleWidth, drawY);
        }
        //绘制十字线
        var drawX = chart.m_mousePosition.x;
        if(drawX < chart.m_leftVScaleWidth){
            drawX = chart.m_leftVScaleWidth;
        }
        if(drawX > chart.m_size.cx - chart.m_rightVScaleWidth){
            drawX = chart.m_size.cx - chart.m_rightVScaleWidth;
        }
	    if(!chart.m_sPlot && chart.m_selectShape == ""){
	        paint.drawLine(chart.m_crossLineColor, m_lineWidth_Chart, 0, chart.m_leftVScaleWidth, drawY, chart.m_size.cx - chart.m_rightVScaleWidth, drawY);
            paint.drawLine(chart.m_crossLineColor, m_lineWidth_Chart, 0, drawX, 0, drawX, chart.m_size.cy - chart.m_hScaleHeight);
        }
        var str = "A" + chart.m_crossStopIndex;
        if (chart.m_crossStopIndex != -1 && str != "ANaN"){
            var date = new Date();
            date.setTime(chart.m_data[chart.m_crossStopIndex].m_date);
            var xText = "";
            if (chart.m_cycle == "day"){
                xText = dateFormat("YYYY-mm-dd", date);
            } else if (chart.m_cycle == "minute"){
                xText = dateFormat("YYYY-mm-dd HH:MM", date);
            } else if (chart.m_cycle == "trend"){
                xText = dateFormat("HH:MM", date);
            }
             else if (chart.m_cycle == "second"){
                xText = dateFormat("HH:MM:SS", date);
            }
            else if (chart.m_cycle == "tick"){
                xText = chart.m_crossStopIndex + 1;
            }
            var xSize = paint.textSize(xText, chart.m_font);
            paint.fillRect(chart.m_crossTipColor, drawX - xSize.cx / 2 - 2, candleDivHeight + volDivHeight + indDivHeight, drawX + xSize.cx / 2 + 2, candleDivHeight + volDivHeight + indDivHeight + xSize.cy + 6);
            paint.drawText(xText, chart.m_textColor, chart.m_font, drawX - xSize.cx / 2, candleDivHeight + volDivHeight + indDivHeight + 3 + xSize.cy / 2);
        }
    }
};

/*
* 计算最大最小值
* chart:K线
*/
var calculateChartMaxMin = function (chart) {
    chart.m_candleMax = 0;
    chart.m_candleMin = 0;
    chart.m_volMax = 0;
    chart.m_volMin = 0;
    chart.m_indMin = 0;
    chart.m_indMin = 0;
    var load1 = false;
    var load2 = false;
    var load3 = false;
    var load4 = false;
    var isTrend = chart.m_cycle == "trend";
    var firstOpen = 0;
    if (chart.m_data && chart.m_data.length > 0) {
        var lastValidIndex = chart.m_lastVisibleIndex;
        if(chart.m_lastValidIndex != -1){
            lastValidIndex = chart.m_lastValidIndex;
        }
        for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
            if (i == chart.m_firstVisibleIndex) {
                if (isTrend) {
                    chart.m_candleMax = chart.m_data[i].m_close;
                    chart.m_candleMin = chart.m_data[i].m_close;
                    firstOpen = chart.m_data[i].m_close;
                } else {
                    chart.m_candleMax = chart.m_data[i].m_high;
                    chart.m_candleMin = chart.m_data[i].m_low;
                }
                chart.m_volMax = chart.m_data[i].m_volume;
                load1 = true;
                load2 = true;
                if (chart.m_showIndicator == "MACD") {
                    chart.m_indMax = chart.m_alldifarr[i];
                    chart.m_indMin = chart.m_alldifarr[i];
                    load3 = true;
                }
                else if (chart.m_showIndicator == "KDJ") {
                    chart.m_indMax = chart.m_kdjMap.k[i];
                    chart.m_indMin = chart.m_kdjMap.k[i];
                    load3 = true;
                }
                else if (chart.m_showIndicator == "RSI") {
                    chart.m_indMax = chart.m_rsiMap.rsi6[i];
                    chart.m_indMin = chart.m_rsiMap.rsi6[i];
                    load3 = true;
                }
                else if (chart.m_showIndicator == "BIAS") {
                    chart.m_indMax = chart.m_biasMap.bias1[i];
                    chart.m_indMin = chart.m_biasMap.bias1[i];
                    load3 = true;
                }
                else if (chart.m_showIndicator == "ROC") {
                    chart.m_indMax = chart.m_rocMap.roc[i];
                    chart.m_indMin = chart.m_rocMap.roc[i];
                    load3 = true;
                }
                else if (chart.m_showIndicator == "WR") {
                    chart.m_indMax = chart.m_wrMap.wr1[i];
                    chart.m_indMin = chart.m_wrMap.wr1[i];
                    load3 = true;
                } else if (chart.m_showIndicator == "CCI") {
                    chart.m_indMax = chart.m_cciArr[i];
                    chart.m_indMin = chart.m_cciArr[i];
                    load3 = true;
                } else if (chart.m_showIndicator == "BBI") {
                    chart.m_indMax = chart.m_bbiMap.bbi[i];
                    chart.m_indMin = chart.m_bbiMap.bbi[i];
                    load3 = true;
                }
                else if (chart.m_showIndicator == "TRIX") {
                    chart.m_indMax = chart.m_trixMap.trix[i];
                    chart.m_indMin = chart.m_trixMap.trix[i];
                    load3 = true;
                }
                else if (chart.m_showIndicator == "DMA") {
                    chart.m_indMax = chart.m_dmaMap.dif[i];
                    chart.m_indMin = chart.m_dmaMap.dif[i];
                    load3 = true;
                }
            } else {
                if (isTrend) {
                    if (chart.m_candleMax < chart.m_data[i].m_close) {
                        chart.m_candleMax = chart.m_data[i].m_close;
                    }
                    if (chart.m_candleMin > chart.m_data[i].m_close) {
                        chart.m_candleMin = chart.m_data[i].m_close;
                    }
                } else {
                    if (chart.m_candleMax < chart.m_data[i].m_high) {
                        chart.m_candleMax = chart.m_data[i].m_high;
                    }
                    if (chart.m_candleMin > chart.m_data[i].m_low) {
                        chart.m_candleMin = chart.m_data[i].m_low;
                    }
                }
                if (chart.m_volMax < chart.m_data[i].m_volume) {
                    chart.m_volMax = chart.m_data[i].m_volume;
                }
            }
            if (chart.m_showIndicator == "MACD") {
                if (chart.m_indMax < chart.m_alldifarr[i]) {
                    chart.m_indMax = chart.m_alldifarr[i];
                }
                if (chart.m_indMax < chart.m_alldeaarr[i]) {
                    chart.m_indMax = chart.m_alldeaarr[i];
                }
                if (chart.m_indMax < chart.m_allmacdarr[i]) {
                    chart.m_indMax = chart.m_allmacdarr[i];
                }
                if (chart.m_indMin > chart.m_alldifarr[i]) {
                    chart.m_indMin = chart.m_alldifarr[i];
                }
                if (chart.m_indMin > chart.m_alldeaarr[i]) {
                    chart.m_indMin = chart.m_alldeaarr[i];
                }
                if (chart.m_indMin > chart.m_allmacdarr[i]) {
                    chart.m_indMin = chart.m_allmacdarr[i];
                }
            } else if (chart.m_showIndicator == "KDJ") {
                if (chart.m_indMax < chart.m_kdjMap.k[i]) {
                    chart.m_indMax = chart.m_kdjMap.k[i];
                }
                if (chart.m_indMax < chart.m_kdjMap.d[i]) {
                    chart.m_indMax = chart.m_kdjMap.d[i];
                }
                if (chart.m_indMax < chart.m_kdjMap.j[i]) {
                    chart.m_indMax = chart.m_kdjMap.j[i];
                }
                if (chart.m_indMin > chart.m_kdjMap.k[i]) {
                    chart.m_indMin = chart.m_kdjMap.k[i];
                }
                if (chart.m_indMin > chart.m_kdjMap.d[i]) {
                    chart.m_indMin = chart.m_kdjMap.d[i];
                }
                if (chart.m_indMin > chart.m_kdjMap.j[i]) {
                    chart.m_indMin = chart.m_kdjMap.j[i];
                }
            } else if (chart.m_showIndicator == "RSI") {
                if (chart.m_indMax < chart.m_rsiMap.rsi6[i]) {
                    chart.m_indMax = chart.m_rsiMap.rsi6[i];
                }
                if (chart.m_indMax < chart.m_rsiMap.rsi12[i]) {
                    chart.m_indMax = chart.m_rsiMap.rsi12[i];
                }
                if (chart.m_indMax < chart.m_rsiMap.rsi24[i]) {
                    chart.m_indMax = chart.m_rsiMap.rsi24[i];
                }
                if (chart.m_indMin > chart.m_rsiMap.rsi6[i]) {
                    chart.m_indMin = chart.m_rsiMap.rsi6[i];
                }
                if (chart.m_indMin > chart.m_rsiMap.rsi12[i]) {
                    chart.m_indMin = chart.m_rsiMap.rsi12[i];
                }
                if (chart.m_indMin > chart.m_rsiMap.rsi24[i]) {
                    chart.m_indMin = chart.m_rsiMap.rsi24[i];
                }
            } else if (chart.m_showIndicator == "BIAS") {
                if (chart.m_indMax < chart.m_biasMap.bias1[i]) {
                    chart.m_indMax = chart.m_biasMap.bias1[i];
                }
                if (chart.m_indMax < chart.m_biasMap.bias2[i]) {
                    chart.m_indMax = chart.m_biasMap.bias2[i];
                }
                if (chart.m_indMax < chart.m_biasMap.bias3[i]) {
                    chart.m_indMax = chart.m_biasMap.bias3[i];
                }
                if (chart.m_indMin > chart.m_biasMap.bias1[i]) {
                    chart.m_indMin = chart.m_biasMap.bias1[i];
                }
                if (chart.m_indMin > chart.m_biasMap.bias2[i]) {
                    chart.m_indMin = chart.m_biasMap.bias2[i];
                }
                if (chart.m_indMin > chart.m_biasMap.bias3[i]) {
                    chart.m_indMin = chart.m_biasMap.bias3[i];
                }
            } else if (chart.m_showIndicator == "ROC") {
                if (chart.m_indMax < chart.m_rocMap.roc[i]) {
                    chart.m_indMax = chart.m_rocMap.roc[i];
                }
                if (chart.m_indMax < chart.m_rocMap.maroc[i]) {
                    chart.m_indMax = chart.m_rocMap.maroc[i];
                }
                if (chart.m_indMin > chart.m_rocMap.roc[i]) {
                    chart.m_indMin = chart.m_rocMap.roc[i];
                }
                if (chart.m_indMin > chart.m_rocMap.maroc[i]) {
                    chart.m_indMin = chart.m_rocMap.maroc[i];
                }
            }
            else if (chart.m_showIndicator == "WR") {
                if (chart.m_indMax < chart.m_wrMap.wr1[i]) {
                    chart.m_indMax = chart.m_wrMap.wr1[i];
                }
                if (chart.m_indMax < chart.m_wrMap.wr2[i]) {
                    chart.m_indMax = chart.m_wrMap.wr2[i];
                }
                if (chart.m_indMin > chart.m_wrMap.wr1[i]) {
                    chart.m_indMin = chart.m_wrMap.wr1[i];
                }
                if (chart.m_indMin > chart.m_wrMap.wr2[i]) {
                    chart.m_indMin = chart.m_wrMap.wr2[i];
                }
            } else if (chart.m_showIndicator == "CCI") {
                if (chart.m_indMax < chart.m_cciArr[i]) {
                    chart.m_indMax = chart.m_cciArr[i];
                }
                if (chart.m_indMin > chart.m_cciArr[i]) {
                    chart.m_indMin = chart.m_cciArr[i];
                }
            } else if (chart.m_showIndicator == "BBI") {
                if (chart.m_indMax < chart.m_bbiMap.bbi[i]) {
                    chart.m_indMax = chart.m_bbiMap.bbi[i];
                }
                if (chart.m_indMin > chart.m_bbiMap.bbi[i]) {
                    chart.m_indMin = chart.m_bbiMap.bbi[i];
                }
            } else if (chart.m_showIndicator == "TRIX") {
                if (chart.m_indMax < chart.m_trixMap.trix[i]) {
                    chart.m_indMax = chart.m_trixMap.trix[i];
                }
                if (chart.m_indMax < chart.m_trixMap.matrix[i]) {
                    chart.m_indMax = chart.m_trixMap.matrix[i];
                }
                if (chart.m_indMin > chart.m_trixMap.trix[i]) {
                    chart.m_indMin = chart.m_trixMap.trix[i];
                }
                if (chart.m_indMin > chart.m_trixMap.matrix[i]) {
                    chart.m_indMin = chart.m_trixMap.matrix[i];
                }
            } else if (chart.m_showIndicator == "DMA") {
                if (chart.m_indMax < chart.m_dmaMap.dif[i]) {
                    chart.m_indMax = chart.m_dmaMap.dif[i];
                }
                if (chart.m_indMax < chart.m_dmaMap.difma[i]) {
                    chart.m_indMax = chart.m_dmaMap.difma[i];
                }
                if (chart.m_indMin > chart.m_dmaMap.dif[i]) {
                    chart.m_indMin = chart.m_dmaMap.dif[i];
                }
                if (chart.m_indMin > chart.m_dmaMap.difma[i]) {
                    chart.m_indMin = chart.m_dmaMap.difma[i];
                }
            }
        }
    }
    if (chart.m_shapes.length > 0) {
        var lastValidIndex = chart.m_lastVisibleIndex;
        if (chart.m_lastValidIndex != -1) {
            lastValidIndex = chart.m_lastValidIndex;
        }
        for (var s = 0; s < chart.m_shapes.length; s++) {
            shape = chart.m_shapes[s];
            if (shape.m_datas.length > 0) {
                for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
                    if (shape.m_divIndex == 0) {
                        if (!load1 && i == chart.m_firstVisibleIndex) {
                            chart.m_candleMax = shape.m_datas[i];
                            chart.m_candleMin = shape.m_datas[i];
                            load1 = true;
                        } else {
                            if (shape.m_datas[i] > chart.m_candleMax) {
                                chart.m_candleMax = shape.m_datas[i];
                            }
                            if (shape.m_datas[i] < chart.m_candleMin) {
                                chart.m_candleMin = shape.m_datas[i];
                            }
                        }
                    } else if (shape.m_divIndex == 1) {
                        if (!load2 && i == chart.m_firstVisibleIndex) {
                            chart.m_volMax = shape.m_datas[i];
                            chart.m_volMin = shape.m_datas[i];
                            load2 = true;
                        } else {
                            if (shape.m_datas[i] > chart.m_volMax) {
                                chart.m_volMax = shape.m_datas[i];
                            }
                            if (shape.m_datas[i] < chart.m_volMin) {
                                chart.m_volMin = shape.m_datas[i];
                            }
                        }
                    } else if (shape.m_divIndex == 2) {
                        if (!load3 && i == chart.m_firstVisibleIndex) {
                            chart.m_indMax = shape.m_datas[i];
                            chart.m_indMin = shape.m_datas[i];
                            load3 = true;
                        } else {
                            if (shape.m_datas[i] > chart.m_indMax) {
                                chart.m_indMax = shape.m_datas[i];
                            }
                            if (shape.m_datas[i] < chart.m_indMin) {
                                chart.m_indMin = shape.m_datas[i];
                            }
                        }
                    } else if (shape.m_divIndex == 3) {
                        if (!load4 && i == chart.m_firstVisibleIndex) {
                            chart.m_indMax2 = shape.m_datas[i];
                            chart.m_indMin2 = shape.m_datas[i];
                            load4 = true;
                        } else {
                            if (shape.m_datas[i] > chart.m_indMax2) {
                                chart.m_indMax2 = shape.m_datas[i];
                            }
                            if (shape.m_datas[i] < chart.m_indMin2) {
                                chart.m_indMin2 = shape.m_datas[i];
                            }
                        }
                    }
                }
            }
            if (shape.m_datas2.length > 0) {
                for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
                    if (shape.m_divIndex == 0) {
                        if (shape.m_datas2[i] > chart.m_candleMax) {
                            chart.m_candleMax = shape.m_datas2[i];
                        }
                        if (shape.m_datas2[i] < chart.m_candleMin) {
                            chart.m_candleMin = shape.m_datas2[i];
                        }
                    } else if (shape.m_divIndex == 1) {
                        if (shape.m_datas2[i] > chart.m_volMax) {
                            chart.m_volMax = shape.m_datas2[i];
                        }
                        if (shape.m_datas2[i] < chart.m_volMin) {
                            chart.m_volMin = shape.m_datas2[i];
                        }
                    } else if (shape.m_divIndex == 2) {
                        if (shape.m_datas2[i] > chart.m_indMax) {
                            chart.m_indMax = shape.m_datas2[i];
                        }
                        if (shape.m_datas2[i] < chart.m_indMin) {
                            chart.m_indMin = shape.m_datas2[i];
                        }
                    } else if (shape.m_divIndex == 3) {
                        if (shape.m_datas2[i] > chart.m_indMax2) {
                            chart.m_indMax2 = shape.m_datas2[i];
                        }
                        if (shape.m_datas2[i] < chart.m_indMin2) {
                            chart.m_indMin2 = shape.m_datas2[i];
                        }
                    }
                }
            }
        }
    }
    if (isTrend) {
        var subMax = Math.max(Math.abs(chart.m_candleMax - firstOpen), Math.abs(chart.m_candleMin - firstOpen));
        chart.m_candleMax = firstOpen + subMax;
        chart.m_candleMin = firstOpen - subMax;
    }
};

/*
* 绘制线条
* chart:K线
* paint:绘图对象
* clipRect:裁剪区域
* divIndex:图层
* datas:数据
* color:颜色
* selected:是否选中
*/
var drawChartLines = function (chart, paint, clipRect, divIndex, datas, color, selected) {
    paint.beginPath();
    var lastX = 0, lastY = 0;
    var maxVisibleRecord = getChartMaxVisibleCount(chart, chart.m_hScalePixel, getChartWorkAreaWidth(chart));
    var lastValidIndex = chart.m_lastVisibleIndex;
    if(chart.m_lastValidIndex != -1){
        lastValidIndex = chart.m_lastValidIndex;
    }
    for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
        var x = getChartX(chart, i);
        var value = datas[i];
        var y = getChartY(chart, divIndex, value);
        if (i > chart.m_firstVisibleIndex) {
            paint.addLine(lastX, lastY, x, y)
        }
        lastX = x;
        lastY = y;
        if (selected) {
            var kPInterval = parseInt(maxVisibleRecord / 30);
            if (kPInterval < 2) {
                kPInterval = 3;
            }
            if (i % kPInterval == 0) {
                paint.fillRect(color, x - 3, y - 3, x + 3, y + 3);
            }
        }
    }
    paint.drawPath(color, m_lineWidth_Chart, 0);
    paint.closePath();
};

/*
* 绘制画线工具
* chart:K线
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawChartPlot = function(chart, paint, clipRect) {
    paint.save();
    var divHeight = getCandleDivHeight(chart);
    paint.setClip(chart.m_leftVScaleWidth, 20, chart.m_size.cx - chart.m_rightVScaleWidth, divHeight);
    for(var i = 0; i < chart.m_plots.length; i++){
        var plot = chart.m_plots[i];
        var m_index1 = 0, m_index2 = 0, m_index3 = 0;
        var mpx1 = 0, mpy1 = 0, mpx2 = 0, mpy2 = 0, mpx3 = 0, mpy3 = 0;
        if(plot.m_plotType == "LRLine" || plot.m_plotType == "LRChannel" || plot.m_plotType == "LRBand"){
            var list = new Array();
            m_index1 = getChartIndexByDate(chart, plot.m_key1);
            m_index2 = getChartIndexByDate(chart, plot.m_key2);
            var minIndex = Math.min(m_index1, m_index2);
            var maxIndex = Math.max(m_index1, m_index2);
            for(var j = minIndex; j <= maxIndex; j++){
                list.push(chart.m_data[j].m_close);
            }
            linearRegressionEquation(list);
            plot.m_value1 = m_b_Chart;
            plot.m_value2 = m_k_Chart * (maxIndex - minIndex + 1) + m_b_Chart;
        }
        else if(plot.m_plotType == "BoxLine" || plot.m_plotType == "TironeLevels" || plot.m_plotType == "QuadrantLines"){
            getCandleRange(chart, plot);
            var nHigh = m_nHigh_Chart, nLow = m_nLow_Chart;
            m_index1 = getChartIndexByDate(chart, plot.m_key1);
            m_index2 = getChartIndexByDate(chart, plot.m_key2);
            plot.m_key1 = getChartDateByIndex(chart, Math.min(m_index1, m_index2));
            plot.m_key2 = getChartDateByIndex(chart, Math.max(m_index1, m_index2));
            plot.m_value1 = nHigh;
            plot.m_value2 = nLow;
        }
        if(plot.m_key1){
            m_index1 = getChartIndexByDate(chart, plot.m_key1);
            mpx1 = getChartX(chart, m_index1);
            mpy1 = getChartY(chart, 0, plot.m_value1);
            if (chart.m_sPlot == plot){
                paint.fillEllipse(plot.m_pointColor, mpx1 - m_plotPointSize_Chart, mpy1 - m_plotPointSize_Chart, mpx1 + m_plotPointSize_Chart, mpy1 + m_plotPointSize_Chart);
            }
        }
        if(plot.m_key2){
            m_index2 = getChartIndexByDate(chart, plot.m_key2);
            mpx2 = getChartX(chart, m_index2);
            mpy2 = getChartY(chart, 0, plot.m_value2);
            if (chart.m_sPlot == plot){
                paint.fillEllipse(plot.m_pointColor, mpx2 - m_plotPointSize_Chart, mpy2 - m_plotPointSize_Chart, mpx2 + m_plotPointSize_Chart, mpy2 + m_plotPointSize_Chart);
            }
        }
        if(plot.m_key3){
            m_index3 = getChartIndexByDate(chart, plot.m_key3);
            mpx3 = getChartX(chart, m_index3);
            mpy3 = getChartY(chart, 0, plot.m_value3);
            if (chart.m_sPlot == plot){
                paint.fillEllipse(plot.m_pointColor, mpx3 - m_plotPointSize_Chart, mpy3 - m_plotPointSize_Chart, mpx3 + m_plotPointSize_Chart, mpy3 + m_plotPointSize_Chart);
            }
        }
        if(plot.m_plotType == "Line"){
            lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
            if(mpx2 == mpx1){
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, 0, mpx1, divHeight);
            }else{
                var newX1 = chart.m_leftVScaleWidth;
                var newY1 = newX1 * m_k_Chart + m_b_Chart;
                var newX2 = chart.m_size.cx - chart.m_rightVScaleWidth;
                var newY2 = newX2 * m_k_Chart + m_b_Chart;
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, newX1, newY1, newX2, newY2);
            }
        }
        else if (plot.m_plotType == "ArrowSegment") {
            var ARROW_Size = 24;
            var slopy, cosy, siny;
            slopy = Math.atan2(mpy1 - mpy2, mpx1 - mpx2);
            cosy = Math.cos(slopy);
            siny = Math.sin(slopy);
            var ptPoint = new FCPoint();
            ptPoint.x = mpx2;
            ptPoint.y = mpy2;
            var pts = new Array();
            pts.push(new FCPoint());
            pts.push(new FCPoint());
            pts.push(new FCPoint());
            pts[0] = ptPoint;
            pts[1].x = ptPoint.x + (ARROW_Size * cosy - (ARROW_Size / 2.0 * siny) + 0.5);
            pts[1].y = ptPoint.y + (ARROW_Size * siny + (ARROW_Size / 2.0 * cosy) + 0.5);
            pts[2].x = ptPoint.x + (ARROW_Size * cosy + ARROW_Size / 2.0 * siny + 0.5);
            pts[2].y = ptPoint.y - (ARROW_Size / 2.0 * cosy - ARROW_Size * siny + 0.5);
            ARROW_Size = 20;
            var ptPoint2 = new FCPoint();
            ptPoint2.x = mpx2;
            ptPoint2.y = mpy2;
            var pts2 = new Array();
            pts2.push(new FCPoint());
            pts2.push(new FCPoint());
            pts2.push(new FCPoint());
            pts2[0] = ptPoint2;
            pts2[1].x = ptPoint2.x + (ARROW_Size * cosy - (ARROW_Size / 2.0 * siny) + 0.5);
            pts2[1].y = ptPoint2.y + (ARROW_Size * siny + (ARROW_Size / 2.0 * cosy) + 0.5);
            pts2[2].x = ptPoint2.x + (ARROW_Size * cosy + ARROW_Size / 2.0 * siny + 0.5);
            pts2[2].y = ptPoint2.y - (ARROW_Size / 2.0 * cosy - ARROW_Size * siny + 0.5);
            lineXY(pts2[1].x, pts2[1].y, pts2[2].x, pts2[2].y, 0, 0);
            var newX1 = 0, newY1 = 0, newX2 = 0, newY2 = 0;
            if (pts2[1].x > pts2[2].x) {
                newX1 = pts2[2].x + (pts2[1].x - pts2[2].x) / 3;
                newX2 = pts2[2].x + (pts2[1].x - pts2[2].x) * 2 / 3;
            } else {
                newX1 = pts2[1].x + (pts2[2].x - pts2[1].x) / 3;
                newX2 = pts2[1].x + (pts2[2].x - pts2[1].x) * 2 / 3;
            }
            if (m_k_Chart == 0 && m_b_Chart == 0) {
                if (pts2[1].y > pts2[2].y) {
                    newY1 = pts2[2].y + (pts2[1].y - pts2[2].y) / 3;
                    newY2 = pts2[2].y + (pts2[1].y - pts2[2].y) * 2 / 3;
                } else {
                    newY1 = pts2[1].y + (pts2[2].y - pts2[1].y) / 3;
                    newY2 = pts2[1].y + (pts2[2].y - pts2[1].y) * 2 / 3;
                }
            } else {
                newY1 = (m_k_Chart * newX1) + m_b_Chart;
                newY2 = (m_k_Chart * newX2) + m_b_Chart;
            }
            pts2[1].x = newX1;
            pts2[1].y = newY1;
            pts2[2].x = newX2;
            pts2[2].y = newY2;
            var drawPoints = new Array();
            drawPoints.push(new FCPoint());
            drawPoints.push(new FCPoint());
            drawPoints.push(new FCPoint());
            drawPoints.push(new FCPoint());
            drawPoints.push(new FCPoint());
            drawPoints.push(new FCPoint());
            drawPoints[0].x = ptPoint.x;
            drawPoints[0].y = ptPoint.y;
            drawPoints[1].x = pts[1].x;
            drawPoints[1].y = pts[1].y;
            if (mpy1 >= mpy2) {
                drawPoints[2].x = pts2[1].x;
                drawPoints[2].y = pts2[1].y;
            } else {
                drawPoints[2].x = pts2[2].x;
                drawPoints[2].y = pts2[2].y;
            }
            drawPoints[3].x = mpx1;
            drawPoints[3].y = mpy1;
            if (mpy1 >= mpy2) {
                drawPoints[4].x = pts2[2].x;
                drawPoints[4].y = pts2[2].y;
            } else {
                drawPoints[4].x = pts2[1].x;
                drawPoints[4].y = pts2[1].y;
            }
            drawPoints[5].x = pts[2].x;
            drawPoints[5].y = pts[2].y;

            paint.beginPath();
            for (var j = 0; j < 6; j++) {
                if (j > 0) {
                    paint.addLine(drawPoints[j - 1].x, drawPoints[j - 1].y, drawPoints[j].x, drawPoints[j].y);
                }
            }
            paint.fillPath(plot.m_lineColor);
            paint.closePath();
        }
        else if(plot.m_plotType == "AngleLine"){
            lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
            if(mpx2 == mpx1){
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, 0, mpx1, divHeight);
            }else{
                var newX1 = chart.m_leftVScaleWidth;
                var newY1 = newX1 * m_k_Chart + m_b_Chart;
                var newX2 = chart.m_size.cx - chart.m_rightVScaleWidth;
                var newY2 = newX2 * m_k_Chart + m_b_Chart;
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, newX1, newY1, newX2, newY2);
            }
            lineXY(mpx1, mpy1, mpx3, mpy3, 0, 0);
            if(mpx3 == mpx1){
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, 0, mpx1, divHeight);
            }else{
                var newX1 = chart.m_leftVScaleWidth;
                var newY1 = newX1 * m_k_Chart + m_b_Chart;
                var newX2 = chart.m_size.cx - chart.m_rightVScaleWidth;
                var newY2 = newX2 * m_k_Chart + m_b_Chart;
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, newX1, newY1, newX2, newY2);
            }
        }
         else if(plot.m_plotType == "Parallel"){
            lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
            if(mpx2 == mpx1){
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, 0, mpx1, divHeight);
            }else{
                var newX1 = chart.m_leftVScaleWidth;
                var newY1 = newX1 * m_k_Chart + m_b_Chart;
                var newX2 = chart.m_size.cx - chart.m_rightVScaleWidth;
                var newY2 = newX2 * m_k_Chart + m_b_Chart;
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, newX1, newY1, newX2, newY2);
            }
            var newB = mpy3 - m_k_Chart * mpx3;
            if(mpx2 == mpx1){
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx3, 0, mpx3, divHeight);
            }else{
                var newX1 = chart.m_leftVScaleWidth;
                var newY1 = newX1 * m_k_Chart + newB;
                var newX2 = chart.m_size.cx - chart.m_rightVScaleWidth;
                var newY2 = newX2 * m_k_Chart + newB;
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, newX1, newY1, newX2, newY2);
            }
        }
        else if(plot.m_plotType == "Percent"){
            var list = getPercentParams(mpy1, mpy2);
            var texts = new Array();
            texts.push("0%");
            texts.push("25%");
            texts.push("50%");
            texts.push("75%");
            texts.push("100%");
            for(var j = 0; j < list.length; j++){
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, chart.m_leftVScaleWidth, list[j], chart.m_size.cx - chart.m_rightVScaleWidth, list[j]);
                var tSize = paint.textSize(texts[j], chart.m_font);
                paint.drawText(texts[j], chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth + 5, list[j] - tSize.cy / 2 - 2);
            }
        }
        else if(plot.m_plotType == "FiboTimezone"){
            var fValue = 1;
            var aIndex = m_index1;
            var pos = 1;
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, 0, mpx1, divHeight);
            tSize = paint.textSize("1", chart.m_font);
            paint.drawText("1", chart.m_textColor, chart.m_font, mpx1, divHeight - tSize.cy / 2);
            while (aIndex + fValue <= chart.m_lastVisibleIndex){
                fValue = fibonacciValue(pos);
                var newIndex = aIndex + fValue;
                var newX = getChartX(chart, newIndex);
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, newX, 0, newX, divHeight);
                var tSize = paint.textSize(fValue, chart.m_font);
                paint.drawText(fValue, chart.m_textColor, chart.m_font, newX, divHeight - tSize.cy / 2);
                pos++;
            }
        }
        else if(plot.m_plotType == "SpeedResist"){
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
            if (mpx1 != mpx2 && mpy1 != mpy2){
                var firstP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) / 3);
                var secondP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 2 / 3);
                var startP = new FCPoint(mpx1, mpy1);
                var fK = 0, fB = 0, sK = 0, sB = 0;
                lineXY(startP.x, startP.y, firstP.x, firstP.y, 0, 0);
                fK = m_k_Chart;
                fb = m_b_Chart;
                lineXY(startP.x, startP.y, secondP.x, secondP.y, 0, 0);
                sK = m_k_Chart;
                sB = m_b_Chart;
                var newYF = 0, newYS = 0;
                var newX = 0;
                if (mpx2 > mpx1){
                    newYF = fK * (chart.m_size.cx - chart.m_rightVScaleWidth) + fB;
                    newYS = sK * (chart.m_size.cx - chart.m_rightVScaleWidth) + sB;
                    newX = (chart.m_size.cx - chart.m_rightVScaleWidth);
                }
                else{
                    newYF = fB;
                    newYS = sB;
                    newX = chart.m_leftVScaleWidth;
                }
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, startP.x, startP.y, newX, newYF);
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, startP.x, startP.y, newX, newYS);
            }
        }
        else if(plot.m_plotType == "FiboFanline"){
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
            if (mpx1 != mpx2 && mpy1 != mpy2){
                var firstP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 0.382);
                var secondP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 0.5);
                var thirdP = new FCPoint(mpx2, mpy2 - (mpy2 - mpy1) * 0.618);
                var startP = new FCPoint(mpx1, mpy1);
                var listP = new Array();
                listP.push(firstP);
                listP.push(secondP);
                listP.push(thirdP);
                var listSize = listP.length;
                for (var j = 0; j < listSize; j++){
                    //获取直线参数
                    lineXY(startP.x, startP.y, listP[j].x, listP[j].y, 0, 0);
                    var newX = 0;
                    var newY = 0;
                    if (mpx2 > mpx1){
                        newY = m_k_Chart * (chart.m_size.cx - chart.m_rightVScaleWidth) + m_b_Chart;
                        newX = (chart.m_size.cx - chart.m_rightVScaleWidth);
                    }
                    else{
                        newY = m_b_Chart;
                        newX = chart.m_leftVScaleWidth;
                    }
                    paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, startP.x, startP.y, newX, newY);
                }
            }
        }
        else if(plot.m_plotType == "LRLine"){
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
        }
        else if(plot.m_plotType == "LRBand"){
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
            getLRBandRange(chart, plot, m_k_Chart, m_b_Chart);
            mpy1 = getChartY(chart, 0, plot.m_value1 + m_upSubValue);
            mpy2 = getChartY(chart, 0, plot.m_value2 + m_upSubValue);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
            mpy1 = getChartY(chart, 0, plot.m_value1 - m_downSubValue);
            mpy2 = getChartY(chart, 0, plot.m_value2 - m_downSubValue);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
        }
        else if(plot.m_plotType == "LRChannel"){
            getLRBandRange(chart, plot, m_k_Chart, m_b_Chart);
            lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
            var rightX = chart.m_size.cx - chart.m_rightVScaleWidth;
            var rightY = rightX * m_k_Chart + m_b_Chart;
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, rightX, rightY);
            mpy1 = getChartY(chart, 0, plot.m_value1 + m_upSubValue);
            mpy2 = getChartY(chart, 0, plot.m_value2 + m_upSubValue);
            lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
            rightY = rightX * m_k_Chart + m_b_Chart;
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, rightX, rightY);
            mpy1 = getChartY(chart, 0, plot.m_value1 - m_downSubValue);
            mpy2 = getChartY(chart, 0, plot.m_value2 - m_downSubValue);
            lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
            rightY = rightX * m_k_Chart + m_b_Chart;
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, rightX, rightY);
        }
        else if(plot.m_plotType == "Segment"){
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
        }else if(plot.m_plotType == "Ray"){
            lineXY(mpx1, mpy1, mpx2, mpy2, 0, 0);
            if (m_k_Chart != 0 || m_b_Chart != 0) {
                var leftX = chart.m_leftVScaleWidth;
                var leftY = leftX * m_k_Chart + m_b_Chart;
                var rightX = chart.m_size.cx - chart.m_rightVScaleWidth;
                var rightY = rightX * m_k_Chart + m_b_Chart;
                if (mpx1 >= mpx2) {
                    paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, leftX, leftY, mpx1, mpy1);
                } else {
                    paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, rightX, rightY);
                }
            }
            //垂直时
            else {
                if (mpy1 >= mpy2) {
                    paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx1, 0);
                } else {
                    paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx1, divHeight);
                }
            }
        }else if(plot.m_plotType == "Triangle"){
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx2, mpy2, mpx3, mpy3);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx3, mpy3);
        }
        else if (plot.m_plotType == "SymmetricTriangle") {
            if (mpx2 != mpx1) {
                a = (mpy2 - mpy1) / (mpx2 - mpx1);
                b = mpy1 - a * mpx1;
                c = -a;
                d = mpy3 - c * mpx3;
                leftX = chart.m_leftVScaleWidth;
                leftY = leftX * a + b;
                rightX = chart.m_size.cx - chart.m_rightVScaleWidth;
                rightY = rightX * a + b;
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, leftX, leftY, rightX, rightY);
                leftY = leftX * c + d;
                rightY = rightX * c + d;
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, leftX, leftY, rightX, rightY);
            } else {
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, 0, mpx1, divHeight);
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx3, 0, mpx3, divHeight);
            }
        }
        else if (plot.m_plotType == "Rect") {
            var sX1 = Math.min(mpx1, mpx2);
            var sY1 = Math.min(mpy1, mpy2);
            var sX2 = Math.max(mpx1, mpx2);
            var sY2 = Math.max(mpy1, mpy2);
            paint.drawRect(plot.m_lineColor, plot.m_lineWidth, 0, sX1, sY1, sX2, sY2);
        }else if(plot.m_plotType == "Cycle"){
            var r = Math.sqrt(Math.abs((mpx2 - mpx1) * (mpx2 - mpx1) + (mpy2 - mpy1) * (mpy2 - mpy1)));
            paint.drawEllipse(plot.m_lineColor, plot.m_lineWidth, 0, mpx1 - r, mpy1 - r, mpx1 + r, mpy1 + r);
        }else if(plot.m_plotType == "CircumCycle"){
            ellipseOR(mpx1, mpy1, mpx2, mpy2, mpx3, mpy3);
            paint.drawEllipse(plot.m_lineColor, plot.m_lineWidth, 0, m_oX_Chart - m_r_Chart, m_oY_Chart - m_r_Chart, m_oX_Chart + m_r_Chart, m_oY_Chart + m_r_Chart);
        }else if(plot.m_plotType == "Ellipse"){
            var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
            if(mpx1 <= mpx2){
                x1 = mpx2;
                y1 = mpy2;
                x2 = mpx1;
                y2 = mpy1;
            }else{
                x1 = mpx1;
                y1 = mpy1;
                x2 = mpx2;
                y2 = mpy2;
            }
            var x = x1 - (x1 - x2);
            var y = 0;
            var width = (x1 - x2) * 2;
            var height = 0;
            if (y1 >= y2){
                height = (y1 - y2) * 2;
            }
            else{
                height = (y2 - y1) * 2;
            }
            y = y2 - height / 2;
            paint.drawEllipse(plot.m_lineColor, plot.m_lineWidth, 0, x, y, x + width, y + height);
        }else if(plot.m_plotType == "ParalleGram"){
            parallelogram(mpx1, mpy1, mpx2, mpy2, mpx3, mpy3);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx1, mpy1, mpx2, mpy2);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx2, mpy2, mpx3, mpy3);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, mpx3, mpy3, m_x4_Chart, m_y4_Chart);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, m_x4_Chart, m_y4_Chart, mpx1, mpy1);
        }else if(plot.m_plotType == "BoxLine"){
            var sX1 = Math.min(mpx1, mpx2);
            var sY1 = Math.min(mpy1, mpy2);
            var sX2 = Math.max(mpx1, mpx2);
            var sY2 = Math.max(mpy1, mpy2);
            paint.drawRect(plot.m_lineColor, plot.m_lineWidth, 0, sX1, sY1, sX2, sY2);
            var bSize = paint.textSize("COUNT:" + Math.abs(m_index2 - m_index1) + 1, chart.m_font);
            paint.drawText("COUNT:" + Math.abs(m_index2 - m_index1) + 1, chart.m_textColor, chart.m_font, sX1 + 2, sY1 + 2 + bSize.cy / 2);
            var closeList = new Array();
            for(var j = m_index1; j <= m_index2; j++){
                closeList.push(chart.m_data[j].m_close);
            }
            var avgClose = avgValue(closeList);
            var closeY = getChartY(chart, 0, avgClose);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, [5,5], sX1, closeY, sX2, closeY);
            var drawAvg = "AVG:" + avgClose.toFixed(chart.m_candleDigit);
            var tSize = paint.textSize(drawAvg, chart.m_font);
            paint.drawText(drawAvg, chart.m_textColor, chart.m_font, sX1 + 2, closeY - tSize.cy / 2 - 2);
        }
        else if(plot.m_plotType == "TironeLevels"){
            var sX1 = Math.min(mpx1, mpx2);
            var sY1 = Math.min(mpy1, mpy2);
            var sX2 = Math.max(mpx1, mpx2);
            var sY2 = Math.max(mpy1, mpy2);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, sX1, sY1, sX2, sY1);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, sX1, sY2, sX2, sY2);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, [5, 5], sX1 + (sX2 - sX1) / 2, sY1, sX1 + (sX2 - sX1) / 2, sY2);
            var t1 = m_nHigh_Chart, t2 = m_nHigh_Chart - (m_nHigh_Chart - m_nLow_Chart) / 3, t3 = m_nHigh_Chart - (m_nHigh_Chart - m_nLow_Chart) / 2, t4 = m_nHigh_Chart - 2 * (m_nHigh_Chart - m_nLow_Chart) / 3, t5 = m_nLow_Chart;
            var tList = new Array();
            tList.push(t2);
            tList.push(t3);
            tList.push(t4);
            for(j = 0; j < tList.length; j++){
                var y = getChartY(chart, 0, tList[j]);
                //画直线
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, [5,5], chart.m_leftVScaleWidth, y, chart.m_size.cx - chart.m_rightVScaleWidth, y);
                var str = tList[j].toFixed(chart.m_candleDigit);
                var tSize = paint.textSize(str, chart.m_font);
                paint.drawText(str, chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth + 2, y - tSize.cy / 2 - 2);
            }
        }
        else if(plot.m_plotType == "QuadrantLines"){
            var sX1 = Math.min(mpx1, mpx2);
            var sY1 = Math.min(mpy1, mpy2);
            var sX2 = Math.max(mpx1, mpx2);
            var sY2 = Math.max(mpy1, mpy2);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, sX1, sY1, sX2, sY1);
            paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, sX1, sY2, sX2, sY2);
            var t1 = m_nHigh_Chart, t2 = m_nHigh_Chart - (m_nHigh_Chart - m_nLow_Chart) / 4, t3 = m_nHigh_Chart - (m_nHigh_Chart - m_nLow_Chart) / 2, t4 = m_nHigh_Chart - 3 * (m_nHigh_Chart - m_nLow_Chart) / 4, t5 = m_nLow_Chart;
            var tList = new Array();
            tList.push(t2);
            tList.push(t3);
            tList.push(t4);
            for(j = 0; j < tList.length; j++){
                var y = getChartY(chart, 0, tList[j]);
                //画直线
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, sX1, y, sX2, y);
            }
        }
        else if(plot.m_plotType == "GoldenRatio"){
            var sX1 = Math.min(mpx1, mpx2);
            var sY1 = Math.min(mpy1, mpy2);
            var sX2 = Math.max(mpx1, mpx2);
            var sY2 = Math.max(mpy1, mpy2);
            var ranges = new Array();
            ranges.push(0);
            ranges.push(0.236);
            ranges.push(0.382);
            ranges.push(0.5);
            ranges.push(0.618);
            ranges.push(0.809);
            ranges.push(1);
            ranges.push(1.382);
            ranges.push(1.618);
            ranges.push(2);
            ranges.push(2.382);
            ranges.push(2.618);
            var minValue = Math.min(plot.m_value1, plot.m_value2);
            var maxValue = Math.max(plot.m_value1, plot.m_value2);
            for(var j = 0; j < ranges.length; j++){
                var newY = sY1 <= sY2 ? sY1 + (sY2 - sY1) * ranges[j] : sY2 + (sY1 - sY2) * (1 - ranges[j]);
                paint.drawLine(plot.m_lineColor, plot.m_lineWidth, 0, chart.m_leftVScaleWidth, newY, chart.m_size.cx - chart.m_rightVScaleWidth, newY);
                var newPoint = new FCPoint(0, newY);
                var value = getCandleDivValue(chart, newPoint);
                var str = value.toFixed(chart.m_candleDigit);
                var tSize = paint.textSize(str, chart.m_font);
                paint.drawText(str, chart.m_textColor, chart.m_font, chart.m_leftVScaleWidth + 2, newY - tSize.cy / 2 - 2);
            }
        }
    }
    
    paint.restore();
};

/*
* 绘制K线
* chart:K线
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawChartStock = function(chart, paint, clipRect) {
    if (chart.m_data && chart.m_data.length > 0) {   
        var candleHeight = getCandleDivHeight(chart);
        var volHeight = getVolDivHeight(chart);
        var indHeight = getIndDivHeight(chart);
        var isTrend = chart.m_cycle == "trend";
        var cWidth = parseInt(chart.m_hScalePixel - 3) / 2;
        if (cWidth < 0) {
            cWidth = 0;
        }
        var lastValidIndex = chart.m_lastVisibleIndex;
        if(chart.m_lastValidIndex != -1){
            lastValidIndex = chart.m_lastValidIndex;
        }
        var maxVisibleRecord = getChartMaxVisibleCount(chart, chart.m_hScalePixel, getChartWorkAreaWidth(chart));
        if (isTrend) {
            paint.beginPath();
            var lastX = 0, lastY = 0;
            for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
                var x = getChartX(chart, i);
                var close = chart.m_data[i].m_close;
                var closeY = getChartY(chart, 0, close);
                if (i > chart.m_firstVisibleIndex) {
                    paint.addLine(lastX, lastY, x, closeY)
                }
                lastX = x;
                lastY = closeY;
            }
            paint.drawPath(m_indicatorColors[7], m_lineWidth_Chart, 0);
            paint.closePath();
        }
        var hasMinTag = false, hasMaxTag = false;
        for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
            var x = getChartX(chart, i);
            var open = chart.m_data[i].m_open;
            var close = chart.m_data[i].m_close;
            var high = chart.m_data[i].m_high;
            var low = chart.m_data[i].m_low;
            var openY = getChartY(chart, 0, open);
            var closeY = getChartY(chart, 0, close);
            var highY = getChartY(chart, 0, high);
            var lowY = getChartY(chart, 0, low);
            var volY = 0;
            var zeroY = 0; 
            if (volHeight > 0) {
                var volume = chart.m_data[i].m_volume;
                volY = getChartY(chart, 1, volume);
                zeroY = getChartY(chart, 1, 0);
            }
            if (close >= open) {
                if (isTrend) {
                    if (volHeight > 0) {
                        paint.drawLine(m_indicatorColors[6], m_lineWidth_Chart, 0, x, volY, x, zeroY);
                    }
                } else {
                    paint.drawLine(chart.m_upColor, m_lineWidth_Chart, 0, x, highY, x, lowY);
                    if (cWidth > 0) {
                        if (close == open) {
                            paint.drawLine(chart.m_upColor, m_lineWidth_Chart, 0, x - cWidth, closeY, x + cWidth, closeY);
                        }
                        else {
                            paint.fillRect(chart.m_upColor, x - cWidth, closeY, x + cWidth, openY);
                        }
                        if (volHeight > 0) {
                            paint.fillRect(chart.m_upColor, x - cWidth, volY, x + cWidth, zeroY);
                        }
                    } else {
                        if (volHeight > 0) {
                            paint.drawLine(chart.m_upColor, m_lineWidth_Chart, 0, x - cWidth, volY, x + cWidth, zeroY);
                        }
                    }
                }
            } else {
                if (isTrend) {
                    if (volHeight > 0) {
                        paint.drawLine(m_indicatorColors[6], m_lineWidth_Chart, 0, x, volY, x, zeroY);
                    }
                } else {
                    paint.drawLine(chart.m_downColor, m_lineWidth_Chart, 0, x, highY, x, lowY);
                    if (cWidth > 0) {
                        paint.fillRect(chart.m_downColor, x - cWidth, openY, x + cWidth, closeY);
                        if (volHeight > 0) {
                            paint.fillRect(chart.m_downColor, x - cWidth, volY, x + cWidth, zeroY);
                        }
                    } else {
                        if (volHeight > 0) {
                            paint.drawLine(chart.m_downColor, m_lineWidth_Chart, 0, x - cWidth, volY, x + cWidth, zeroY);
                        }
                    }
                }
            }
            if (chart.m_selectShape == "CANDLE") {
                var kPInterval = parseInt(maxVisibleRecord / 30);
                if (kPInterval < 2) {
                    kPInterval = 3;
                }
                if (i % kPInterval == 0) {
                    if (isTrend) {
                    } else {
                        paint.fillRect(m_indicatorColors[0], x - 3, closeY - 3, x + 3, closeY + 3);
                    }
                }
            } else if (chart.m_selectShape == "VOL") {
                var kPInterval = parseInt(maxVisibleRecord / 30);
                if (kPInterval < 2) {
                    kPInterval = 3;
                }
                if (i % kPInterval == 0) {
                    paint.fillRect(m_indicatorColors[0], x - 3, volY - 3, x + 3, volY + 3);
                }
            }
            if (!isTrend) {
                if (!hasMaxTag) {
                    if (high == chart.m_candleMax) {
                        var tag = high.toFixed(chart.m_candleDigit);
                        var tSize = paint.textSize(tag, chart.m_font);
                        paint.drawText(tag, chart.m_textColor, chart.m_font, x - tSize.cx / 2, highY - tSize.cy / 2 - 2);
                        hasMaxTag = true;
                    }
                }
                if (!hasMinTag) {
                    if (low == chart.m_candleMin) {
                        var tag = low.toFixed(chart.m_candleDigit);
                        var tSize = paint.textSize(tag, chart.m_font);
                        paint.drawText(tag, chart.m_textColor, chart.m_font, x - tSize.cx / 2, lowY + 2 + tSize.cy / 2);
                        hasMinTag = true;
                    }
                }
            }
        }
        if (!isTrend) {
            paint.save();
            paint.setClip(chart.m_leftVScaleWidth, 20, chart.m_size.cx - chart.m_rightVScaleWidth, candleHeight);
            if (chart.m_mainIndicator == "BOLL") {
                drawChartLines(chart, paint, clipRect, 0, chart.m_bollMap.mid, m_indicatorColors[0], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "MID") ? true : false);
                drawChartLines(chart, paint, clipRect, 0, chart.m_bollMap.upper, m_indicatorColors[1], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "UP") ? true : false);
                drawChartLines(chart, paint, clipRect, 0, chart.m_bollMap.lower, m_indicatorColors[2], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "DOWN") ? true : false);
            } else if (chart.m_mainIndicator == "MA") {
                drawChartLines(chart, paint, clipRect, 0, chart.m_maMap.ma5, m_indicatorColors[0], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "5") ? true : false);
                drawChartLines(chart, paint, clipRect, 0, chart.m_maMap.ma10, m_indicatorColors[1], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "10") ? true : false);
                drawChartLines(chart, paint, clipRect, 0, chart.m_maMap.ma20, m_indicatorColors[2], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "20") ? true : false);
                drawChartLines(chart, paint, clipRect, 0, chart.m_maMap.ma30, m_indicatorColors[5], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "30") ? true : false);
                drawChartLines(chart, paint, clipRect, 0, chart.m_maMap.ma120, m_indicatorColors[4], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "120") ? true : false);
                drawChartLines(chart, paint, clipRect, 0, chart.m_maMap.ma250, m_indicatorColors[3], (chart.m_selectShape == chart.m_mainIndicator && chart.m_selectShapeEx == "250") ? true : false);
            }
            paint.restore();
        }
        if (indHeight > 0) {
            if (chart.m_showIndicator == "MACD") {
                var zeroY = getChartY(chart, 2, 0);
                paint.drawLine(m_indicatorColors[4], m_lineWidth_Chart, 0, chart.m_leftVScaleWidth, zeroY, getChartX(chart, chart.m_lastVisibleIndex), zeroY);
                for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
                    var x = getChartX(chart, i);
                    var macd = chart.m_allmacdarr[i];
                    var macdY = getChartY(chart, 2, macd);
                    if (macdY < zeroY) {
                        paint.drawLine(m_indicatorColors[3], m_lineWidth_Chart, 0, x, macdY, x, zeroY);
                    } else {
                        paint.drawLine(m_indicatorColors[4], m_lineWidth_Chart, 0, x, macdY, x, zeroY);
                    }
                    if (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "MACD") {
                        var kPInterval = parseInt(maxVisibleRecord / 30);
                        if (kPInterval < 2) {
                            kPInterval = 3;
                        }
                        if (i % kPInterval == 0) {
                            paint.fillRect(m_indicatorColors[4], x - 3, macdY - 3, x + 3, macdY + 3);
                        }
                    }
                }
                drawChartLines(chart, paint, clipRect, 2, chart.m_alldifarr, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "DIF") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_alldeaarr, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "DEA") ? true : false);
            } else if (chart.m_showIndicator == "KDJ") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_kdjMap.k, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "K") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_kdjMap.d, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "D") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_kdjMap.j, m_indicatorColors[2], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "J") ? true : false);
            } else if (chart.m_showIndicator == "RSI") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_rsiMap.rsi6, m_indicatorColors[5], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "6") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_rsiMap.rsi12, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "12") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_rsiMap.rsi24, m_indicatorColors[2], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "24") ? true : false);
            }
            else if (chart.m_showIndicator == "BIAS") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_biasMap.bias1, m_indicatorColors[5], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "1") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_biasMap.bias2, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "2") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_biasMap.bias3, m_indicatorColors[2], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "3") ? true : false);
            }
            else if (chart.m_showIndicator == "ROC") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_rocMap.roc, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "ROC") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_rocMap.maroc, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "ROCMA") ? true : false);
            } else if (chart.m_showIndicator == "WR") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_wrMap.wr1, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "1") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_wrMap.wr2, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "2") ? true : false);
            } else if (chart.m_showIndicator == "CCI") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_cciArr, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator) ? true : false);
            } else if (chart.m_showIndicator == "BBI") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_bbiMap.bbi, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator) ? true : false);
            } else if (chart.m_showIndicator == "TRIX") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_trixMap.trix, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "TRIX") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_trixMap.matrix, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "TRIXMA") ? true : false);
            } else if (chart.m_showIndicator == "DMA") {
                drawChartLines(chart, paint, clipRect, 2, chart.m_dmaMap.dif, m_indicatorColors[0], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "DIF") ? true : false);
                drawChartLines(chart, paint, clipRect, 2, chart.m_dmaMap.difma, m_indicatorColors[1], (chart.m_selectShape == chart.m_showIndicator && chart.m_selectShapeEx == "DIFMA") ? true : false);
            }
        }
    }
    //绘制扩展线条
    if (chart.m_shapes.length > 0) {
        for (var i = 0; i < chart.m_shapes.length; i++) {
            shape = chart.m_shapes[i]
            if (shape.m_type == "bar") {
                for (var i = chart.m_firstVisibleIndex; i <= lastValidIndex; i++) {
                    var x = getChartX(chart, i);
                    var y1 = getChartY(chart, shape.m_divIndex, shape.m_datas[i]);
                    var y2 = getChartY(chart, shape.m_divIndex, shape.m_datas2[i]);
                    if (y1 >= y2) {
                        paint.fillRect(shape.m_color, x - cWidth, y2, x + cWidth, y1);
                    }
                    else {
                        paint.fillRect(shape.m_color, x - cWidth, y1, x + cWidth, y2);
                    }
                }
            } else {
                drawChartLines(chart, paint, clipRect, shape.m_divIndex, shape.m_datas, shape.m_color, (chart.m_selectShape == shape.m_name) ? true : false);
            }
        }
    }
};

/*
* 获取数据
* chart:K线
*/
var calcChartIndicator = function(chart) {
	//清除数组原有数据
	clearDataArr(chart);
	//存储数据
	//创建 一个二维数组
	var ticks = new Array();
	if(chart.m_data && chart.m_data.length > 0) {
		for(var i = 0; i < chart.m_data.length; i++) {
			chart.m_closearr.push(chart.m_data[i].m_close);
			ticks[i] = new Array();
			ticks[i][0] = chart.m_data[i].m_close;
			ticks[i][1] = chart.m_data[i].m_high;
			ticks[i][2] = chart.m_data[i].m_low;

		}
    }
    if (chart.m_mainIndicator == "BOLL") {
        //缓存布林带数据
        chart.m_bollMap = getBollData(chart.m_closearr);
    } else if (chart.m_mainIndicator == "MA") {
        chart.m_maMap = getMultiMAData(chart.m_closearr);
    }
    if (chart.m_showIndicator == "BIAS") {
	    //缓存BIAS数据
        chart.m_biasMap = getBIASData(chart.m_closearr);
	}
	else if(chart.m_showIndicator == "DMA"){
	    //缓存DMA数据
        chart.m_dmaMap = getDMAData(chart.m_closearr);
	}
	else if(chart.m_showIndicator == "BBI"){
	    //缓存BBI数据
        chart.m_bbiMap = getBBIData(chart.m_closearr);
	}
	else if(chart.m_showIndicator == "RSI"){
	    //缓存RSI数据
        chart.m_rsiMap = getRSIData(chart.m_closearr);
	}
	else if(chart.m_showIndicator == "ROC"){
	    //缓存roc数据
        chart.m_rocMap = getRocData(chart.m_closearr);
	}
	else if(chart.m_showIndicator == "TRIX"){
	    //缓存TRIX数据
        chart.m_trixMap = getTRIXData(chart.m_closearr);
	}
	else if(chart.m_showIndicator == "KDJ"){
	    //缓存kdj数据
        chart.m_kdjMap = getKDJData(ticks);
	}
	else if(chart.m_showIndicator == "WR"){
	    //缓存WR数据
        chart.m_wrMap = getWRData(ticks);
	}
	else if(chart.m_showIndicator == "CCI"){
	    //缓存CCI数据
        chart.m_cciArr = getCCIData(ticks);
	}
	else if(chart.m_showIndicator == "MACD"){
	    //缓存MACD数据
        chart.m_allema12.push(chart.m_closearr[0]);
        chart.m_allema26.push(chart.m_closearr[0]);
	    chart.m_alldeaarr.push(0);
        for (var i = 1; i < chart.m_closearr.length; i++) {
            chart.m_allema12.push(getEMA(12, chart.m_closearr[i], chart.m_allema12[i - 1]));
            chart.m_allema26.push(getEMA(26, chart.m_closearr[i], chart.m_allema26[i - 1]));
	    }
        chart.m_alldifarr = getDIF(chart.m_allema12, chart.m_allema26);
        for (var i = 1; i < chart.m_alldifarr.length; i++) {
            chart.m_alldeaarr.push(chart.m_alldeaarr[i - 1] * 8 / 10 + chart.m_alldifarr[i] * 2 / 10);
	    }
        chart.m_allmacdarr = getMACD(chart.m_alldifarr, chart.m_alldeaarr);
	}
	if(chart.onCalculateChartMaxMin){
        chart.onCalculateChartMaxMin(chart);
    }else{
        calculateChartMaxMin(chart);
    }
};

/*
* 计算EMA
* n:周期
* value:当前数据
* lastEMA:上期数据
*/
var getEMA = function(n, value, lastEMA) {
	return(value * 2 + lastEMA * (n - 1)) / (n + 1);
};

/*
* 计算MACD
* dif:DIF数据
* dea:DEA数据
*/
var getMACD = function(dif, dea) {
	var result = new Array();
	if(dif != "" && dea != "") {
		for(var i = 0; i < dif.length; i++) {
			result.push((dif[i] - dea[i]) * 2);
		}
	}
	return result;
};

/*
* 计算DIF
* close12:12日数据
* close26:26日数据
*/
var getDIF = function(close12, close26) {
	var result = new Array();
	if(close12 != "" && close26 != "") {
		for(var i = 0; i < close12.length; i++) {
			result.push(close12[i] - close26[i]);
		}
	}
	return result;
};

/*
* 清除缓存数据方法
* chart:K线
*/
var clearDataArr = function(chart) {
	chart.m_closearr = new Array();
	chart.m_allema12 = new Array();
	chart.m_allema26 = new Array();
	chart.m_alldifarr = new Array();
	chart.m_alldeaarr = new Array();
	chart.m_allmacdarr = new Array();

    chart.m_bollMap = {};
	chart.m_biasMap = {};
    chart.m_dmaMap = {};
    chart.m_kdjMap = {};
    chart.m_bbiMap = {};
    chart.m_rocMap = {};
    chart.m_rsiMap = {};
	chart.m_wrMap = {};
	chart.m_trixMap = {};
	chart.m_cciArr = [];
};

/**
 *
 * 计算boll指标,ma的周期为20日
 *
 * @method BOLL
 * @param {Array} ticks
 * 一维数组类型，每个元素为当前Tick的收盘价格
 * @return {Object} 返回一个包含upper mid lower属性的对象,每个属性对应的类型为{Array[Number]}
 */
var getBollData = function(ticks) {
	//移动平均线周期为20
	var maDays = 20,
		tickBegin = maDays - 1,
		maSum = 0,
		p = 0;
	var ups = [],
		mas = [],
		lows = [];
	for(var i = 0; i < ticks.length; i++) {
		var c = ticks[i],
			ma, md, bstart, mdSum;
		maSum += c;
		if(i >= tickBegin) {
			maSum = maSum - p;
			ma = maSum / maDays;
			bstart = i - tickBegin;
			p = ticks[bstart];
			mas.push(ma);
			bstart = i - tickBegin;
			p = ticks[bstart];
			mdSum = ticks.slice(bstart, bstart + maDays).reduce(function(a, b) {
				return a + Math.pow(b - ma, 2);
			}, 0);
			md = Math.sqrt(mdSum / maDays);
			ups.push(ma + 2 * md);
			lows.push(ma - 2 * md);
		} else {
			//ugly constant, just keep the same type for client
			ma = maSum / (i + 1);
			mas.push(ma);
			mdSum = ticks.slice(0, i).reduce(function(a, b) {
				return a + Math.pow(b - ma, 2);
			}, 0);
			md = Math.sqrt(mdSum / (i + 1));
			ups.push(ma + 2 * md);
			lows.push(ma - 2 * md);

			//			mas.push(-1);
			//			ups.push(-1);
			//			lows.push(-1);
		}
	}
	return {
		"upper": ups,
		"mid": mas,
		"lower": lows
	};
};

/**
 *
 * 计算kdj指标,rsv的周期为9日
 *
 * @method KDJ
 * @param {Array} ticks
 * 二维数组类型，其中内层数组包含三个元素值，第一个值表示当前Tick的最高价格，第二个表示当前Tick的最低价格，第三个表示当前Tick的收盘价格
 * @return {Object} 返回一个包含k d j属性的对象,每个属性对应的类型为{Array[Number]}
 */
var getKDJData = function(ticks) {
	var nineDaysTicks = [],
		days = 9,
		rsvs = [];
	var ks = [],
		ds = [],
		js = [];
	var lastK, lastD, curK, curD;
	var maxAndMin, max, min;
	for(var i = 0; i < ticks.length; i++) {
		var t = ticks[i],
			close = t[2];
		nineDaysTicks.push(t);
		maxAndMin = getMaxHighAndMinLow(nineDaysTicks);
		max = maxAndMin[0];
		min = maxAndMin[1];
		if(max == min) {
			rsvs.push(0);
		} else {
			rsvs.push((close - min) / (max - min) * 100);
		}
		if(nineDaysTicks.length == days) {
			nineDaysTicks.shift();
		}
		if(i == 0) {
            lastK = rsvs[i];
            lastD = rsvs[i];
		}
		curK = 2 / 3 * lastK + 1 / 3 * rsvs[i];
		ks.push(curK);
		lastK = curK;

		curD = 2 / 3 * lastD + 1 / 3 * curK;
		ds.push(curD);
		lastD = curD;

		js.push(3 * curK - 2 * curD);
	}
	return {
		"k": ks,
		"d": ds,
		"j": js
	};
};

/*
* 获取最大最小值区间
* ticks:数据
*/
var getMaxHighAndMinLow = function(ticks) {
	var maxHigh = ticks[0][0],
		minLow = ticks[0][1];
	for(var i = 0; i < ticks.length; i++) {
		var t = ticks[i],
			high = t[0],
			low = t[1];
		if(high > maxHigh) {
			maxHigh = high;
		}
		if(low < minLow) {
			minLow = low;
		}
	}
	return [maxHigh, minLow];
};

/**
 *
 * 计算rsi指标,分别返回以6日，12日，24日为参考基期的RSI值
 *
 * @method RSI
 * @param {Array} ticks
 * 一维数组类型，每个元素为当前Tick的收盘价格
 * @return {Object} 返回一个包含rsi6 rsi12 rsi24属性的对象,每个属性对应的类型为{Array[Number]}
 */
var getRSIData = function(ticks) {
	var lastClosePx = ticks[0];
	var days = [6, 12, 24],
		result = {};
	for(var i = 0; i < ticks.length; i++) {
		var c = ticks[i];
		var m = Math.max(c - lastClosePx, 0),
			a = Math.abs(c - lastClosePx);
		for(var di = 0; di < days.length; di++) {
			var d = days[di];
			if(!result.hasOwnProperty("rsi" + d)) {
				result["lastSm" + d] = result["lastSa" + d] = 0;
				result["rsi" + d] = [0];
			} else {
				result["lastSm" + d] = (m + (d - 1) * result["lastSm" + d]) / d;
				result["lastSa" + d] = (a + (d - 1) * result["lastSa" + d]) / d;
				if(result["lastSa" + d] != 0) {
					result["rsi" + d].push(result["lastSm" + d] / result["lastSa" + d] * 100);
				} else {
					result["rsi" + d].push(0);
				}
			}
		}
		lastClosePx = c;
	}
	return {
		"rsi6": result["rsi6"],
		"rsi12": result["rsi12"],
		"rsi24": result["rsi24"]
	};
};

/**
 * MA数据计算
 * @param {Object} ticks 收盘价数组
 * @param {Object} days 天数
 */
var MA = function(ticks, days) {
	var maSum = 0;
	var mas = [];
	var last = 0;
	for(var i = 0; i < ticks.length; i++) {
		var ma;
		if(i >= days) {
			last = ticks[i - days];
			maSum = maSum + ticks[i] - last;
			ma = maSum / days;
		} else {
			maSum += ticks[i];
			ma = maSum / (i + 1);
		}
		mas.push(ma);
	}
	return mas;
};

/**
 * 计算ROC数据
 * @param {Object} ticks 收盘价数组
 */
var getRocData = function(ticks) {
	var n = 12,
		m = 6;
	var roc = [],
		maroc = [];

	for(var i = 0; i < ticks.length; i++) {
		var currRoc;
		if(i >= n) {
			currRoc = 100 * (ticks[i] - ticks[i - n]) / ticks[i - n];
			roc.push(currRoc);
		} else {
			currRoc = 100 * (ticks[i] - ticks[0]) / ticks[0];
			roc.push(currRoc);
		}
	}
	maroc = MA(roc, m);
	return {
		"roc": roc,
		"maroc": maroc
	}
};

/**
 * 获取BIAS的数据
 * @param {Array} ticks 收盘价数组
 * @return 
 */
var getBIASData = function(ticks) {
	var n1 = 6,
		n2 = 12,
		n3 = 24;
	var bias1Arr = [],
		bias2Arr = [],
		bias3Arr = [];
	var ma1 = MA(ticks, n1);
	var ma2 = MA(ticks, n2);
	var ma3 = MA(ticks, n3);
	for(var i = 0; i < ticks.length; i++) {
		var b1, b2, b3;
		b1 = (ticks[i] - ma1[i]) / ma1[i] * 100;
		b2 = (ticks[i] - ma2[i]) / ma2[i] * 100;
		b3 = (ticks[i] - ma3[i]) / ma3[i] * 100;
		bias1Arr.push(b1);
		bias2Arr.push(b2);
		bias3Arr.push(b3);
	}
	return {
		"bias1": bias1Arr,
		"bias2": bias2Arr,
		"bias3": bias3Arr
	}
};

/**
 * 计算DMA（平均差）
 * @param {Object} ticks 收盘价数组
 */
var getDMAData = function(ticks) {
	var difArr = [],
		difmaArr = [];
	var n1 = 10,
		n2 = 50;
	var ma10 = MA(ticks, n1);
	var ma50 = MA(ticks, n2);
	var length = ticks.length;
	for(var i = 0; i < length; i++) {
		var dif = ma10[i] - ma50[i];
		difArr.push(dif);
	}
	difmaArr = MA(difArr, n1);
	return {
		"dif": difArr,
		"difma": difmaArr
	};
};

/**
 * 计算BBI(多空指标)
 * @param {Object} ticks
 */
var getBBIData = function(ticks) {
	var bbiArr = [];
	var ma3 = MA(ticks, 3);
	var ma6 = MA(ticks, 6);
	var ma12 = MA(ticks, 12);
	var ma24 = MA(ticks, 24);
	for(var i = 0; i < ticks.length; i++) {
		var bbi = (ma3[i] + ma6[i] + ma12[i] + ma24[i]) / 4;
		bbiArr.push(bbi);
	}
	return {
		"bbi": bbiArr
	};
};

/**
 * 计算最大值
 * @param {Object} ticks 最高价数组
 * @param {Object} days
 */
var HHV = function(ticks, days) {
	var hhv = [];
	var max = ticks[0];
	for(var i = 0; i < ticks.length; i++) {
		if(i >= days) {
			max = ticks[i];
			for(var j = i; j > i - days; j--) {
				if(max < ticks[j]) {
					max = ticks[j];
				}
			}
			hhv.push(max);
		} else {
			if(max < ticks[i]) {
				max = ticks[i];
			}
			hhv.push(max);
		}
	}
	return hhv;
};

/**
 * 计算最小值
 * @param {Object} ticks 最低价数组
 * @param {Object} days
 */
var LLV = function(ticks, days) {
	var llv = [];
	var min = ticks[0];
	for(var i = 0; i < ticks.length; i++) {
		if(i >= days) {
			min = ticks[i];
			for(var j = i; j > i - days; j--) {
				if(min > ticks[j]) {
					min = ticks[j];
				}
			}
			llv.push(min);
		} else {
			if(min > ticks[i]) {
				min = ticks[i];
			}
			llv.push(min);
		}
	}
	return llv;
};

/**
 * 计算WR(威廉指标)
 * @param {Array} ticks 含最高价,最低价, 收盘价的二维数组
 * @param {Object} days
 */
var getWRData = function(ticks) {
	var n1 = 5,
		n2 = 10;
	var wr1Arr = [],
		wr2Arr = [];
	var highArr = [],
		lowArr = [],
		closeArr = [];
	var length = ticks.length;
	for(var i = 0; i < length; i++) {
		var t = ticks[i];
		highArr.push(t[1]);
		lowArr.push(t[2]);
		closeArr.push(t[0])
	}
	var highArr1 = HHV(highArr, n1);
	var highArr2 = HHV(highArr, n2);
	var lowArr1 = LLV(lowArr, n1);
	var lowArr2 = LLV(lowArr, n2);
	for(var i = 0; i < length; i++) {
		var high1 = highArr1[i];
		var low1 = lowArr1[i];
		var high2 = highArr2[i];
		var low2 = lowArr2[i];
		var close = closeArr[i];
		var wr1 = 100 * (high1 - close) / (high1 - low1);
		var wr2 = 100 * (high2 - close) / (high2 - low2);
		wr1Arr.push(wr1);
		wr2Arr.push(wr2);
	}
	return {
		"wr1": wr1Arr,
		"wr2": wr2Arr
	};
};

/**
 * CCI(顺势指标)计算  CCI（N日）=（TP－MA）÷MD÷0.015
 * @param {Object} ticks 带最高价，最低价，收盘价的二维数组
 */
var getCCIData = function(ticks) {
	var n = 14;
	var cciArr = [],
		tpArr = [],
		closeArr = [];
	var length = ticks.length;
	for(var i = 0; i < length; i++) {
		var t = ticks[i];
		tpArr.push((t[0] + t[1] + t[2]) / 3);
		closeArr.push(t[0]);
	}
	var maClose = MA(closeArr, n);

	var mdArr = [];
	for(var i = 0; i < length; i++) {
		mdArr.push(maClose[i] - closeArr[i]);
	}

	var maMD = MA(mdArr, n);
	for(var i = 0; i < length; i++) {
		var cci = (tpArr[i] - maClose[i]) / (maMD[i] * 0.015);
		cciArr.push(cci);
	}
	return cciArr;
};

/*
* REF函数
* ticks:数据
* days:日数
*/
var REF = function(ticks, days) {
	var refArr = [];
	var length = ticks.length;
	for(var i = 0; i < length; i++) {
		var ref;
		if(i >= days) {
			ref = ticks[i - days];
		} else {
			ref = ticks[0];
		}
		refArr.push(ref);
	}
	return refArr;
};

/*
* 获取TRIX的数据
* ticks:数据
*/
var getTRIXData = function(ticks) {
	var mtrArr = [],
		trixArr = [],
		matrixArr = [];
	var n = 12,
		m = 9;

    var length = ticks.length;
	var emaArr1 = [];
	emaArr1.push(ticks[0]);
	for(var i = 1; i < length; i++) {
        emaArr1.push(getEMA(12, ticks[i], emaArr1[i - 1]));
	}

	var emaArr2 = [];
	emaArr2.push(emaArr1[0]);
	for(var i = 1; i < length; i++) {
		emaArr2.push(getEMA(12, emaArr1[i], emaArr2[i - 1]));
	}

	mtrArr.push(emaArr2[0]);
	for(var i = 1; i < length; i++) {
		mtrArr.push(getEMA(12, emaArr2[i], mtrArr[i - 1]));
	}

	var ref = REF(mtrArr, 1);
	for(var i = 0; i < length; i++) {
		var trix = 100 * (mtrArr[i] - ref[i]) / ref[i];
		trixArr.push(trix);
	}

	matrixArr = MA(trixArr, m);
	return {
		"trix": trixArr,
		"matrix": matrixArr
	};
};

/*
 * 计算多个MA的数据
 * ticks:数据
 */
var getMultiMAData = function (ticks) {
    var ma5 = MA(ticks, 5);
    var ma10 = MA(ticks, 10);
    var ma20 = MA(ticks, 20);
    var ma30 = MA(ticks, 30);
    var ma120 = MA(ticks, 120);
    var ma250 = MA(ticks, 250);
    return {
        "ma5": ma5,
        "ma10": ma10,
        "ma20": ma20,
        "ma30": ma30,
        "ma120": ma120,
        "ma250": ma250
    };
};

/*
* 判断是否选中线条
* chart:K线
* mp:坐标
* divIndex:层索引
* datas:数据
* curIndex:当前索引
*/
var selectLines = function (chart, mp, divIndex, datas, curIndex) {
    var topY = getChartY(chart, divIndex, datas[curIndex]);
    if (chart.m_hScalePixel <= 1) {
        if(mp.y >= topY - 8 && mp.y <= topY + 8) {
            return true;
        }
    } else {
        var index = curIndex;
        var scaleX = getChartX(chart, index);
        var judgeTop = 0;
        var judgeScaleX = scaleX;
        if (mp.x >= scaleX) {
            var leftIndex = curIndex + 1;
            if (curIndex < chart.m_lastVisibleIndex) {
                var rightValue = datas[leftIndex];
                judgeTop = getChartY(chart, divIndex, rightValue);
            }
            else {
                judgeTop = topY;
            }
        }
        else {
            judgeScaleX = scaleX - chart.m_hScalePixel;
            var rightIndex = curIndex - 1;
            if (curIndex > 0) {
                var leftValue = datas[rightIndex];
                judgeTop = getChartY(chart, divIndex, leftValue);
            }else {
                judgeTop = topY;
            }
        }
        var lineWidth = 4;
        var judgeX = 0, judgeY = 0, judgeW = 0, judgeH = 0;
        if (judgeTop >= topY) {
            judgeX = judgeScaleX;
            judgeY = topY - 2 - lineWidth;
            judgeW = chart.m_hScalePixel;
            judgeH = judgeTop - topY + lineWidth < 4 ? 4 : judgeTop - topY + 4 + lineWidth;
        }
        else {
            judgeX = judgeScaleX;
            judgeY = judgeTop - 2 - lineWidth / 2;
            judgeW = chart.m_hScalePixel;
            judgeH = topY - judgeTop + lineWidth < 4 ? 4 : topY - judgeTop + 4 + lineWidth;
        }
       
        if (mp.x >= judgeX && mp.x <= judgeX + judgeW && mp.y >= judgeY && mp.y <= judgeY + judgeH) {
           
            return true;
        }
    }
    return false;
};

/*
* 判断是否选中图形
* chart:K线
* mp:坐标
*/
var selectShape = function (chart, mp) {
    chart.m_selectShape = "";
    chart.m_selectShapeEx = "";
    var candleHeight = getCandleDivHeight(chart);
    var volHeight = getVolDivHeight(chart);
    var indHeight = getIndDivHeight(chart);
    var index = getChartIndex(chart, mp);
    if (mp.y >= candleHeight + volHeight && mp.y <= candleHeight + volHeight + indHeight) {
        if (chart.m_showIndicator == "MACD") {
            var macdY = getChartY(chart, 2, chart.m_allmacdarr[index]);
            var zeroY = getChartY(chart, 2, 0);
            if (selectLines(chart, mp, 2, chart.m_allmacdarr, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "MACD";
            }
            if (selectLines(chart, mp, 2, chart.m_alldifarr, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "DIF";
            }
            else if (selectLines(chart, mp, 2, chart.m_alldeaarr, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "DEA";
            }
        } else if (chart.m_showIndicator == "KDJ") {
            if (selectLines(chart, mp, 2, chart.m_kdjMap.k, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "K";
            }
            else if (selectLines(chart, mp, 2, chart.m_kdjMap.d, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "D";
            } else if (selectLines(chart, mp, 2, chart.m_kdjMap.j, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "J";
            }
        } else if (chart.m_showIndicator == "RSI") {
            if (selectLines(chart, mp, 2, chart.m_rsiMap.rsi6, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "6";
            }
            else if (selectLines(chart, mp, 2, chart.m_rsiMap.rsi12, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "12";
            } else if (selectLines(chart, mp, 2, chart.m_rsiMap.rsi24, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "24";
            }
        }
        else if (chart.m_showIndicator == "BIAS") {
            if (selectLines(chart, mp, 2, chart.m_biasMap.bias1, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "1";
            }
            else if (selectLines(chart, mp, 2, chart.m_biasMap.bias2, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "2";
            } else if (selectLines(chart, mp, 2, chart.m_biasMap.bias3, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "3";
            }
        }
        else if (chart.m_showIndicator == "ROC") {
            if (selectLines(chart, mp, 2, chart.m_rocMap.roc, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "ROC";
            }
            else if (selectLines(chart, mp, 2, chart.m_rocMap.maroc, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "ROCMA";
            }
        } else if (chart.m_showIndicator == "WR") {
            if (selectLines(chart, mp, 2, chart.m_wrMap.wr1, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "1";
            }
            else if (selectLines(chart, mp, 2, chart.m_wrMap.wr2, index)) {
                chart.m_selectShape = "WR";
                chart.m_selectShapeEx = "2";
            }
        } else if (chart.m_showIndicator == "CCI") {
            if (selectLines(chart, mp, 2, chart.m_cciArr, index)) {
                chart.m_selectShape = chart.m_showIndicator;
            }
        } else if (chart.m_showIndicator == "BBI") {
            if (selectLines(chart, mp, 2, chart.m_bbiMap.bbi, index)) {
                chart.m_selectShape = chart.m_showIndicator;
            }
        } else if (chart.m_showIndicator == "TRIX") {
            if (selectLines(chart, mp, 2, chart.m_trixMap.trix, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "TRIX";
            }
            else if (selectLines(chart, mp, 2, chart.m_trixMap.matrix, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "TRIXMA";
            }
        } else if (chart.m_showIndicator == "DMA") {
            if (selectLines(chart, mp, 2, chart.m_dmaMap.dif, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "DIF";
            }
            else if (selectLines(chart, mp, 2, chart.m_dmaMap.difma, index)) {
                chart.m_selectShape = chart.m_showIndicator;
                chart.m_selectShapeEx = "DIFMA";
            }
        }
    }
    else if (mp.y >= candleHeight && mp.y <= candleHeight + volHeight) {
        var volY = getChartY(chart, 1, chart.m_data[index].m_volume);
        var zeroY = getChartY(chart, 1, 0); 
        if (mp.y >= Math.min(volY, zeroY) && mp.y <= Math.max(volY, zeroY)) {
            chart.m_selectShape = "VOL";
        }
    }
    else if (mp.y >= 0 && mp.y <= candleHeight) {
        var isTrend = chart.m_cycle == "trend";
        if (!isTrend) {
            if (chart.m_mainIndicator == "BOLL") {
                if (selectLines(chart, mp, 0, chart.m_bollMap.mid, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "MID";
                }
                else if (selectLines(chart, mp, 0, chart.m_bollMap.upper, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "UP";
                } else if (selectLines(chart, mp, 0, chart.m_bollMap.lower, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "DOWN";
                }
            } else if (chart.m_mainIndicator == "MA") {
                if (selectLines(chart, mp, 0, chart.m_maMap.ma5, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "5";
                }
                else if (selectLines(chart, mp, 0, chart.m_maMap.ma10, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "10";
                }
                else if (selectLines(chart, mp, 0, chart.m_maMap.ma20, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "20";
                }
                else if (selectLines(chart, mp, 0, chart.m_maMap.ma30, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "30";
                }
                else if (selectLines(chart, mp, 0, chart.m_maMap.ma120, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "120";
                }
                else if (selectLines(chart, mp, 0, chart.m_maMap.ma250, index)) {
                    chart.m_selectShape = chart.m_mainIndicator;
                    chart.m_selectShapeEx = "250";
                }
            }
        }
        if (chart.m_selectShape == "") {
            var highY = getChartY(chart, 0, chart.m_data[index].m_high);
            var lowY = getChartY(chart, 0, chart.m_data[index].m_low);
            if (isTrend) {
                if (selectLines(chart, mp, 0, chart.m_closearr, index)) {
                    chart.m_selectShape = "CANDLE";
                } 
            }
            else {
                if (mp.y >= Math.min(lowY, highY) && mp.y <= Math.max(lowY, highY)) {
                    chart.m_selectShape = "CANDLE";
                }
            }
        }
    }
    if (chart.m_shapes.length > 0) {
        for (var i = 0; i < chart.m_shapes.length; i++) {
            shape = chart.m_shapes[i]
            if (selectLines(chart, mp, shape.m_divIndex, shape.m_datas, index)) {
                chart.m_selectShape = shape.m_name;
                break;  
            }
        }
    }
};
