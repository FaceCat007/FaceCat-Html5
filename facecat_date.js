/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
* 日期按钮
*/
function DayButton() {
	this.m_bounds = new FCRect(0,0,0,0); //显示区域
	this.m_calendar = null; //日历视图
	this.m_day = null; //日
	this.m_inThisMonth = false; //是否在本月
	this.m_visible = true; //是否可见
	this.m_selected = false; //是否被选中
	this.m_font = "16px Arial"; //字体
	this.m_textColor = "rgb(255,255,255)"; //文字颜色
	this.m_backColor = null; //背景颜色
	this.m_textColor2 = "rgb(200,200,200)"; //第二个文字颜色
	this.m_borderColor = "rgb(100,100,100)"; //文字颜色 
};

/*
* 月的按钮
*/
function MonthButton() {
	this.m_bounds = new FCRect(0,0,0,0); //显示区域
	this.m_calendar = null; //日历视图
	this.m_month = 0; //月
	this.m_year = 0; //年
	this.m_visible = true; //是否可见
	this.m_textColor = "rgb(255,255,255)"; //文字颜色
	this.m_backColor = null; //背景颜色
	this.m_font = "16px Arial"; //字体
	this.m_borderColor = "rgb(100,100,100)"; //文字颜色 
};

/*
* 年的按钮
*/
function YearButton() {
	this.m_bounds = new FCRect(0,0,0,0); //显示区域
	this.m_calendar = null; //日历视图
	this.m_year = 0; //年
	this.m_visible = true; //是否可见
	this.m_textColor = "rgb(255,255,255)"; //文字颜色
	this.m_backColor = null; //背景颜色
	this.m_font = "16px Arial"; //字体
	this.m_borderColor = "rgb(100,100,100)"; //文字颜色 
};

/*
* 日期层
*/
function DayDiv() {
	this.m_am_ClickRowFrom = 0; //点击时的上月的行
	this.m_am_ClickRowTo = 0; //点击时的当月的行
	this.m_am_Direction = 0; //动画的方向
	this.m_am_Tick = 0; //动画当前帧数
	this.m_am_TotalTick = 40; //动画总帧数
	this.m_calendar = null; //日历视图
	this.m_dayButtons = new Array(); //日期的集合
	this.m_dayButtons_am = new Array();  //动画日期的集合
};

/*
* 月层
*/
function MonthDiv() {
	this.m_am_Direction = 0; //动画的方向
	this.m_am_Tick = 0; //动画当前帧数
	this.m_am_TotalTick = 40; //动画总帧数
	this.m_calendar = null; //日历视图
	this.m_year = 0; //年份
	this.m_monthButtons = new Array(); //月的按钮
	this.m_monthButtons_am = new Array(); //月的动画按钮
};

/*
* 年层
*/
function YearDiv() {
	this.m_am_Direction = 0; //动画的方向
	this.m_am_Tick = 0; //动画当前帧数
	this.m_am_TotalTick = 40; //动画总帧数
	this.m_calendar = null; //日历视图
	this.m_startYear = 0; //开始年份
	this.m_yearButtons = new Array(); //月的按钮
	this.m_yearButtons_am = new Array(); //月的动画按钮
};

/*
* 头部层
*/
function HeadDiv() {
	this.m_calendar = null; //日历视图
	this.m_bounds = new FCRect(0,0,0,0); //显示区域
	this.m_titleFont = "20px Arial"; //标题字体
	this.m_weekFont = "14px Arial"; //星期字体
	this.m_arrowColor = "rgb(100,100,100)"; //箭头颜色
	this.m_backColor = "rgb(0,0,0)"; //箭头颜色
	this.m_textColor = "rgb(255,255,255)"; //文字颜色
};

/*
* 时间层
*/
function TimeDiv() {
	this.m_calendar = null; //日历视图
	this.m_bounds = new FCRect(0,0,0,0); //显示区域
};

/*
* 年的结构
*/
function CYear() {
	this.m_year = 0; //年
	this.m_months = new Map(); //月的集合
};

/*
* 月的结构
*/
function CMonth() {
	this.m_month = 0; //月
	this.m_year = 0; //年
	this.m_days = new Map(); //日的集合
};

/*
* 日的结构
*/
function CDay() {
	this.m_day = 0; //日
	this.m_month = 0; //月
	this.m_year = 0; //年
};

/*
* 日历
*/
function FCCalendar() {
	this.m_useAnimation = false; //是否使用动画
	this.m_dayDiv = new DayDiv(); //日层
	this.m_headDiv = new HeadDiv(); //头部层
	this.m_monthDiv = new MonthDiv(); //月层
	this.m_yearDiv = new YearDiv(); //年层
	this.m_years = new Map(); //日历
	this.m_timeDiv = new TimeDiv(); //时间层
	this.m_selectedDay = null; //选中日
	this.m_mode = "day"; //模式
	this.m_type = "calendar"; //类型
	this.m_visible = true; //是否可见
};

FCCalendar.prototype = FCView;

/*
* 获取月的日数
* year:年
* month:月
*/
var getDaysInMonth = function (year, month) {
	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31;
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		case 2:
			if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
				return 29;
			else
				return 28;
	}
	return 0;
};

/*
* 根据字符获取月份
* month:月
*/
var getMonthStr = function (month) {
	switch (month) {
		case 1:
			return "一月";
		case 2:
			return "二月";
		case 3:
			return "三月";
		case 4:
			return "四月";
		case 5:
			return "五月";
		case 6:
			return "六月";
		case 7:
			return "七月";
		case 8:
			return "八月";
		case 9:
			return "九月";
		case 10:
			return "十月";
		case 11:
			return "十一月";
		case 12:
			return "十二月";
		default:
			return "";
	}
};

/*
* 获取年
* years:年的集合
* year:年
*/
var getYear = function(years, year) {
	var cy = null;
	if (!years.has(year)) {
		cy = new CYear();
		cy.m_year = year;
		years.set(year, cy);
		for (var i = 1; i <= 12; i++) {
			var cMonth = new CMonth();
			cMonth.m_year = year;
			cMonth.m_month = i;
			cy.m_months.set(i, cMonth);
			var daysInMonth = getDaysInMonth(year, i);
			for (var j = 1; j <= daysInMonth; j++) {
				var cDay = new CDay();
				cDay.m_year = year;
				cDay.m_month = i;
				cDay.m_day = j;
				cMonth.m_days.set(j, cDay);
            }
		}
	}
	else {
		cy = years.get(year);
	}
	return cy;
};

/*
* 显示隐藏日期层
* dayDiv:日期层
* visible:是否可见
*/
var showOrHideDayDiv = function (dayDiv, visible) {
	var dayButtonSize = dayDiv.m_dayButtons.length;
	for (var i = 0; i < dayButtonSize; i++) {
		var dayButton = dayDiv.m_dayButtons[i];
		dayButton.m_visible = visible;
	}
};

/*
* 显示隐藏月层
* monthDiv:月层
* visible:是否可见
*/
var showOrHideMonthDiv = function (monthDiv, visible) {
	var monthButtonSize = monthDiv.m_monthButtons.length;
	for (var i = 0; i < monthButtonSize; i++) {
		var monthButton = monthDiv.m_monthButtons[i];
		monthButton.m_visible = visible;
	}
};

/*
* 显示隐藏年层
* m_yearButtons:年层
* visible:是否可见
*/
var showOrHideYearDiv = function (yearDiv, visible) {
	var yearButtonSize = yearDiv.m_yearButtons.length;
	for (var i = 0; i < yearButtonSize; i++) {
		var yearButton = yearDiv.m_yearButtons[i];
		yearButton.m_visible = visible;
	}
};

/*
* 初始化日历
* calendar:日历
*/
var initCalendar = function (calendar) {
	calendar.m_dayDiv.m_calendar = calendar;
	calendar.m_monthDiv.m_calendar = calendar;
	calendar.m_yearDiv.m_calendar = calendar;
	for (var i = 0; i < 42; i++) {
		var dayButton = new DayButton();
		dayButton.m_calendar = calendar;
		calendar.m_dayDiv.m_dayButtons.push(dayButton);
		var dayFCButtonm = new DayButton();
		dayFCButtonm.m_calendar = calendar;
		dayFCButtonm.m_visible = false;
		calendar.m_dayDiv.m_dayButtons_am.push(dayFCButtonm);
	}
	for (var i = 0; i < 12; i++) {
		var monthButton = new MonthButton();
		monthButton.m_calendar = calendar;
		monthButton.m_month = (i + 1);
		calendar.m_monthDiv.m_monthButtons.push(monthButton);
		var monthButtonAm = new MonthButton();
		monthButtonAm.m_calendar = calendar;
		monthButtonAm.m_visible = false;
		monthButtonAm.m_month = (i + 1);
		calendar.m_monthDiv.m_monthButtons_am.push(monthButtonAm);
	}

	for (var i = 0; i < 12; i++) {
		var yearButton = new YearButton();
		yearButton.m_calendar = calendar;
		calendar.m_yearDiv.m_yearButtons.push(yearButton);
		var yearButtonAm = new YearButton();
		yearButtonAm.m_calendar = calendar;
		yearButtonAm.m_visible = false;
		calendar.m_yearDiv.m_yearButtons_am.push(yearButtonAm);
	}
	calendar.m_headDiv.m_calendar = calendar;
	calendar.m_timeDiv.m_calendar = calendar;
};

/*
* 获取星期
* y:年
* m:月
* d:日
*/
var dayOfWeek = function (y, m, d) {
	if (m == 1 || m == 2) {
		m += 12;
		y--;
	}
	return parseInt(((d + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400) + 1) % 7);
};

/*
* 获取当月
* calendar:日历
*/
var getMonth = function (calendar) {
	return getYear(calendar.m_years, calendar.m_selectedDay.m_year).m_months.get(calendar.m_selectedDay.m_month);
};

/*
* 获取下个月
* calendar:日历
* year:年
* month:月
*/
var getNextMonth = function (calendar, year, month) {
	var nextMonth = month + 1;
    var nextYear = year;
	if (nextMonth == 13) {
		nextMonth = 1;
		nextYear += 1;
	}
	return getYear(calendar.m_years, nextYear).m_months.get(nextMonth);
};

/*
* 获取上个月
* calendar:日历
* year:年
* month:月
*/
var getLastMonth = function (calendar, year, month) {
	var lastMonth = month - 1;
    var lastYear = year;
	if (lastMonth == 0) {
		lastMonth = 12;
		lastYear -= 1;
	}
	return getYear(calendar.m_years, lastYear).m_months.get(lastMonth);
};

/*
* 重置日期层布局
* dayDiv:日期层
* state:状态
*/
var resetDayDiv = function (dayDiv, state) {
	var calendar = dayDiv.m_calendar;
	var thisMonth = getMonth(calendar);
	var lastMonth = getLastMonth(calendar, thisMonth.m_year, thisMonth.m_month);
	var nextMonth = getNextMonth(calendar, thisMonth.m_year, thisMonth.m_month);
	var left = 0;
	var headHeight = calendar.m_headDiv.m_bounds.bottom;
	var top = headHeight;
	var width = calendar.m_size.cx;
	var height = calendar.m_size.cy;
	height -= calendar.m_timeDiv.m_bounds.bottom - calendar.m_timeDiv.m_bounds.top;
    var dayButtonHeight = height - headHeight;
	if (dayButtonHeight < 1) {
		dayButtonHeight = 1;
	}
	var toY = 0;
	if (dayDiv.m_am_Direction == 1) {
		toY = dayButtonHeight * dayDiv.m_am_Tick / dayDiv.m_am_TotalTick;
		if (state == 1) {
			thisMonth = nextMonth;
			var month = thisMonth.m_month;
			lastMonth = getLastMonth(calendar, thisMonth.m_year, month);
			nextMonth = getNextMonth(calendar, thisMonth.m_year, month);
		}
	}
	else if (dayDiv.m_am_Direction == 2) {
		toY = -dayButtonHeight * dayDiv.m_am_Tick / dayDiv.m_am_TotalTick;
		if (state == 1) {
			thisMonth = lastMonth;
			var month = thisMonth.m_month;
			lastMonth = getLastMonth(calendar, thisMonth.m_year, month);
			nextMonth = getNextMonth(calendar, thisMonth.m_year, month);
		}
	}
    var buttonSize = 0;
	if (state == 0) {
		buttonSize = dayDiv.m_dayButtons.length;
	}
	else if (state == 1) {
		buttonSize = dayDiv.m_dayButtons_am.length;
	}
	var dheight = dayButtonHeight / 6;
	var days = thisMonth.m_days;
	var firstDay = days.get(1);
	var startDayOfWeek = dayOfWeek(firstDay.m_year, firstDay.m_month, firstDay.m_day);
	for (var i = 0; i < buttonSize; i++) {
		var dayButton = null;
		if (state == 0) {
			dayButton = dayDiv.m_dayButtons[i];
			buttonSize = dayDiv.m_dayButtons.length;
		}
		else if (state == 1) {
			dayButton = dayDiv.m_dayButtons_am[i];
			buttonSize = dayDiv.m_dayButtons_am.length;
		}
		if (i == 35) {
			dheight = height - top;
		}
        var vOffset = 0;
		if (state == 1) {
			if (dayDiv.m_am_Tick > 0) {
				dayButton.m_visible = true;
				if (dayDiv.m_am_Direction == 1) {
					vOffset = toY - dayButtonHeight;
				}
				else if (dayDiv.m_am_Direction == 2) {
					vOffset = toY + dayButtonHeight;
					
				}
			}
			else {
				dayButton.m_visible = false;
				continue;
			}
		}
		else {
			vOffset = toY;
		}
		if ((i + 1) % 7 == 0) {
            var dp = new FCPoint(left, top + vOffset);
			var ds = new FCSize(width - left, dheight);
			var bounds = new FCRect(dp.x, dp.y, dp.x + ds.cx, dp.y + ds.cy);
			dayButton.m_bounds = bounds;
			left = 0;
			if (i != 0 && i != buttonSize - 1) {
				top += dheight;
			}
        }
        else {
			var dp = new FCPoint(left, top + vOffset);
			var ds = new FCSize(width / 7 + ((i + 1) % 7) % 2, dheight);
			var bounds = new FCRect(dp.x, dp.y, dp.x + ds.cx, dp.y + ds.cy);
			dayButton.m_bounds = bounds;
			left += ds.cx;
		}
		var cDay = null;
		dayButton.m_inThisMonth = false;
		if (i >= startDayOfWeek && i <= startDayOfWeek + days.size - 1) {
			cDay = days.get(i - startDayOfWeek + 1);
			dayButton.m_inThisMonth = true;
		}
		else if (i < startDayOfWeek) {
			cDay = lastMonth.m_days.get(lastMonth.m_days.size - startDayOfWeek + i + 1);
		}
		else if (i > startDayOfWeek + days.size - 1) {
			cDay = nextMonth.m_days.get(i - startDayOfWeek - days.size + 1);
		}
		dayButton.m_day = cDay;
		if (state == 0 && dayButton.m_day && dayButton.m_day == calendar.m_selectedDay) {
			dayButton.m_selected = true;
		}
		else {
			dayButton.m_selected = false;
		}
    }
};

/*
* 重置月层布局
* monthDiv:月层
* state:状态
*/
var resetMonthDiv = function (monthDiv, state) {
	var calendar = monthDiv.m_calendar;
	var thisYear = monthDiv.m_year;
	var lastYear = monthDiv.m_year - 1;
    var nextYear = monthDiv.m_year + 1;
	var left = 0;
	var headHeight = calendar.m_headDiv.m_bounds.bottom;
    var top = headHeight;
	var width = calendar.m_size.cx;
	var height = calendar.m_size.cy;
	height -= calendar.m_timeDiv.m_bounds.bottom - calendar.m_timeDiv.m_bounds.top;
    var monthButtonHeight = height - top;
	if (monthButtonHeight < 1) {
		monthButtonHeight = 1;
	}
    var toY = 0;
	var monthButtons;
	if (monthDiv.m_am_Direction == 1) {
		toY = monthButtonHeight * monthDiv.m_am_Tick / monthDiv.m_am_TotalTick;
		if (state == 1) {
			thisYear = nextYear;
			lastYear = thisYear - 1;
			nextYear = thisYear + 1;
		}
	}
	else if (monthDiv.m_am_Direction == 2) {
		toY = -monthButtonHeight * monthDiv.m_am_Tick / monthDiv.m_am_TotalTick;
		if (state == 1) {
			thisYear = lastYear;
			lastYear = thisYear - 1;
			nextYear = thisYear + 1;
		}
	}
	if (state == 0) {
		monthButtons = monthDiv.m_monthButtons;
	}
	else if (state == 1) {
		monthButtons = monthDiv.m_monthButtons_am;
	}
    var dheight = monthButtonHeight / 3;
	var buttonSize = monthButtons.length;
	for (var i = 0; i < buttonSize; i++) {
		if (i == 8) {
			dheight = height - top;
		}
		var monthButton = monthButtons[i];
		monthButton.m_year = thisYear;
        var vOffSet = 0;
		if (state == 1) {
			if (monthDiv.m_am_Tick > 0) {
				monthButton.m_visible = true;
				if (monthDiv.m_am_Direction == 1) {
					vOffSet = toY - monthButtonHeight;
				}
				else if (monthDiv.m_am_Direction == 2) {
					vOffSet = toY + monthButtonHeight;
				}
			}
			else {
				monthButton.m_visible = false;
				continue;
			}
		}
		else {
			vOffSet = toY;
		}
		if ((i + 1) % 4 == 0) {
            var dp = new FCPoint(left, top + vOffSet);
			var ds = new FCSize(width - left, dheight);
			var bounds = new FCRect(dp.x, dp.y, dp.x + ds.cx, dp.y + ds.cy);
			monthButton.m_bounds = bounds;
			left = 0;
			if (i != 0 && i != buttonSize - 1) {
				top += dheight;
			}
		}
        else {
			var dp = new FCPoint(left, top + vOffSet);
			var ds = new FCSize( width / 4 + ((i + 1) % 4) % 2, dheight);
			var bounds = new FCRect(dp.x, dp.y, dp.x + ds.cx, dp.y + ds.cy);
			monthButton.m_bounds = bounds;
			left += ds.cx;
		}
    }
};

/*
* 重置年层布局
* yearDiv:年层
* state:状态
*/
var resetYearDiv = function (yearDiv, state) {
	var calendar = yearDiv.m_calendar;
	var thisStartYear = yearDiv.m_startYear;
	var lastStartYear = yearDiv.m_startYear - 12;
    var nextStartYear = yearDiv.m_startYear + 12;
    var left = 0;
	var headHeight = calendar.m_headDiv.m_bounds.bottom;
    var top = headHeight;
	var width = calendar.m_size.cx;
	var height = calendar.m_size.cy;
	height -= calendar.m_timeDiv.m_bounds.bottom - calendar.m_timeDiv.m_bounds.top;
    var yearButtonHeight = height - top;
	if (yearButtonHeight < 1) {
		yearButtonHeight = 1;
	}
    var toY = 0;
	var yearButtons;
	if (yearDiv.m_am_Direction == 1) {
		toY = yearButtonHeight * yearDiv.m_am_Tick / yearDiv.m_am_TotalTick;
		if (state == 1) {
			thisStartYear = nextStartYear;
			lastStartYear = thisStartYear - 12;
			nextStartYear = thisStartYear + 12;
		}
	}
	else if (yearDiv.m_am_Direction == 2) {
		toY = -yearButtonHeight * yearDiv.m_am_Tick / yearDiv.m_am_TotalTick;
		if (state == 1) {
			thisStartYear = lastStartYear;
			lastStartYear = thisStartYear - 12;
			nextStartYear = thisStartYear + 12;
		}
	}
	if (state == 0) {
		yearButtons = yearDiv.m_yearButtons;
	}
	else if (state == 1) {
		yearButtons = yearDiv.m_yearButtons_am;
	}
	var dheight = yearButtonHeight / 3;
	var buttonSize = yearDiv.m_yearButtons.length;
	for (var i = 0; i < buttonSize; i++) {
		if (i == 8) {
			dheight = height - top;
		}
		var yearButton = yearButtons[i];
		yearButton.m_year = thisStartYear + i;
        var vOffSet = 0;
		if (state == 1) {
			if (yearDiv.m_am_Tick > 0) {
				yearButton.m_visible = true;
				if (yearDiv.m_am_Direction == 1) {
					vOffSet = toY - yearButtonHeight;
				}
				else if (yearDiv.m_am_Direction == 2) {
					vOffSet = toY + yearButtonHeight;
				}
			}
			else {
				yearButton.m_visible = false;
				continue;
			}
		}
		else {
			vOffSet = toY;
		}
		if ((i + 1) % 4 == 0) {
            var dp = new FCPoint(left, top + vOffSet);
			var ds = new FCSize(width - left, dheight);
			var bounds = new FCRect(dp.x, dp.y, dp.x + ds.cx, dp.y + ds.cy);
			yearButton.m_bounds = bounds;
			left = 0;
			if (i != 0 && i != buttonSize - 1) {
				top += dheight;
			}
		}
        else {
            var dp = new FCPoint(left, top + vOffSet);
			var ds = new FCSize(width / 4 + ((i + 1) % 4) % 2, dheight);
			var bounds = new FCRect(dp.x, dp.y, dp.x + ds.cx, dp.y + ds.cy);
			yearButton.m_bounds = bounds;
			left += ds.cx;
		}
    }
};

/*
* 选择开始年份
* yearDiv:年层
* startYear:开始年
*/
var selectStartYear = function (yearDiv, startYear) {
	if (yearDiv.m_startYear != startYear) {
		if (startYear > yearDiv.m_startYear) {
			yearDiv.m_am_Direction = 1;
		}
		else {
			yearDiv.m_am_Direction = 2;
		}
		if (yearDiv.m_calendar.m_useAnimation) {
			yearDiv.m_am_Tick = yearDiv.m_am_TotalTick;
		}
		yearDiv.m_startYear = startYear;
	}
};

/*
* 选择年份
* monthDiv:月层
* year:年
*/
var selectYear = function (monthDiv, year) {
	if (monthDiv.m_year != year) {
		if (year > monthDiv.m_year) {
			monthDiv.m_am_Direction = 1;
		}
		else {
			monthDiv.m_am_Direction = 2;
		}
		if (monthDiv.m_calendar.m_useAnimation) {
			monthDiv.m_am_Tick = monthDiv.m_am_TotalTick;
		}
		monthDiv.m_year = year;
	}
};

/*
* 选中日期
* dayDiv:日期层
* selectedDay:选中日
* lastDay:上一日
*/
var selectDay = function (dayDiv, selectedDay, lastDay) {
	var calendar = dayDiv.m_calendar;
	var m = getYear(calendar.m_years, selectedDay.m_year).m_months.get(selectedDay.m_month);
	var thisMonth = getYear(calendar.m_years, lastDay.m_year).m_months.get(lastDay.m_month);
	if (m != thisMonth) {
		if (thisMonth.m_year * 12 + thisMonth.m_month > m.m_year * 12 + m.m_month) {
			dayDiv.m_am_Direction = 2;
		}
		else {
			dayDiv.m_am_Direction = 1;
		}
		var i = 0;
		var buttonSize = dayDiv.m_dayButtons.length;
		for (i = 0; i < buttonSize; i++) {
			var dayButton = dayDiv.m_dayButtons[i];
			if ((dayDiv.m_am_Direction == 1 && dayButton.m_day == thisMonth.m_days.get(0))
				|| (dayDiv.m_am_Direction == 2 && dayButton.m_day == thisMonth.m_days.get(thisMonth.m_days.size - 1))) {
				dayDiv.m_am_ClickRowFrom = i / 7;
				if (i % 7 != 0) {
					dayDiv.m_am_ClickRowFrom += 1;
				}
			}
		}
		resetDayDiv(dayDiv, 0)
		buttonSize = dayDiv.m_dayButtons_am.length;
		for (i = 0; i < buttonSize; i++) {
			var dayFCButtonm = dayDiv.m_dayButtons_am[i];
			if ((dayDiv.m_am_Direction == 1 && dayFCButtonm.m_day == m.m_days.get(0))
				|| (dayDiv.m_am_Direction == 2 && dayFCButtonm.m_day == m.m_days.get(m.m_days.size - 1))) {
				dayDiv.m_am_ClickRowTo = i / 7;
				if (i % 7 != 0) {
					dayDiv.m_am_ClickRowTo += 1;
				}
			}
		}

		if (calendar.m_useAnimation) {
			dayDiv.m_am_Tick = dayDiv.m_am_TotalTick;
		}
	} else {
		var dayButtonsSize = dayDiv.m_dayButtons.length;
		for (var i = 0; i < dayButtonsSize; i++) {
			var dayButton = dayDiv.m_dayButtons[i];
			if (dayButton.m_day != selectedDay) {
				dayButton.m_selected = false;
			}
		}
    }
};

/*
* 日历的秒表
* calendar:日历
*/
var calendarTimer = function (calendar) {
	var paint = false;
	if (calendar.m_dayDiv.m_am_Tick > 0) {
		calendar.m_dayDiv.m_am_Tick = parseInt(calendar.m_dayDiv.m_am_Tick * 2 / 3);
		paint = true;
	}
	if (calendar.m_monthDiv.m_am_Tick > 0) {
		calendar.m_monthDiv.m_am_Tick = parseInt(calendar.m_monthDiv.m_am_Tick * 2 / 3);
		paint = true;
	}
	if (calendar.m_yearDiv.m_am_Tick > 0) {
		calendar.m_yearDiv.m_am_Tick = parseInt(calendar.m_yearDiv.m_am_Tick * 2 / 3);
		paint = true;
	}
	if (paint) {
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	}
};

/*
* 更新日历的布局
* calendar:日历
*/
var updateCalendar = function (calendar) {
	calendar.m_headDiv.m_bounds = new FCRect(0, 0, calendar.m_size.cx, 80);
	if (calendar.m_mode == "day") {
		resetDayDiv(calendar.m_dayDiv, 0);
		resetDayDiv(calendar.m_dayDiv, 1);
	} else if (calendar.m_mode == "month") {
		resetMonthDiv(calendar.m_monthDiv, 0);
		resetMonthDiv(calendar.m_monthDiv, 1);
	}
	else if (calendar.m_mode == "year") {
		resetYearDiv(calendar.m_yearDiv, 0);
		resetYearDiv(calendar.m_yearDiv, 1);
	}
};

/*
* 绘制头部层
* headDiv:头部层
* paint:绘图对象
*/
var drawHeadDiv = function (headDiv, paint) {
	var calendar = headDiv.m_calendar;
	var bounds = headDiv.m_bounds;
	if (headDiv.m_backColor) {
		paint.fillRect(headDiv.m_backColor, bounds.left, bounds.top, bounds.right, bounds.bottom);
	}
	var m_weekStrings = new Array();
	m_weekStrings.push("周日");
	m_weekStrings.push("周一");
	m_weekStrings.push("周二");
	m_weekStrings.push("周三");
	m_weekStrings.push("周四");
	m_weekStrings.push("周五");
	m_weekStrings.push("周六");
	var w = bounds.right - bounds.left;
	var left = bounds.left;
	for (var i = 0; i < 7; i++) {
		var weekDaySize = paint.textSize(m_weekStrings[i], headDiv.m_weekFont);
		var textX = left + (w / 7) / 2 - weekDaySize.cx / 2;
		var textY = bounds.bottom - weekDaySize.cy / 2 - 2;
		paint.drawText(m_weekStrings[i], headDiv.m_textColor, headDiv.m_weekFont, textX, textY);
		left += w / 7;
	}
	var drawTitle = "";
	if (calendar.m_mode == "day") {
		drawTitle = calendar.m_selectedDay.m_year + "年" + calendar.m_selectedDay.m_month + "月";
	} else if (calendar.m_mode == "month") {
		drawTitle = calendar.m_monthDiv.m_year + "年";
	} else {
		drawTitle = calendar.m_yearDiv.m_startYear + "年-" + (calendar.m_yearDiv.m_startYear + 11) + "年";
    }
	var tSize = paint.textSize(drawTitle, headDiv.m_titleFont);
	paint.drawText(drawTitle, headDiv.m_textColor, headDiv.m_titleFont, bounds.left + (w - tSize.cx) / 2, 30);
	var tR = 10;
	//画左右三角
	paint.beginPath();
	paint.addLine(5, bounds.top + (bounds.bottom - bounds.top) / 2, 5 + tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 - tR);
	paint.addLine(5 + tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 - tR, 5 + tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 + tR);
	paint.addLine(5 + tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 + tR, 5, bounds.top + (bounds.bottom - bounds.top) / 2);
	paint.fillPath(headDiv.m_arrowColor);
	paint.closePath();

	paint.beginPath();
	paint.addLine(bounds.right - 5, bounds.top + (bounds.bottom - bounds.top) / 2, bounds.right - 5 - tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 - tR);
	paint.addLine(bounds.right - 5 - tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 - tR, bounds.right - 5 - tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 + tR);
	paint.addLine(bounds.right - 5 - tR * 2, bounds.top + (bounds.bottom - bounds.top) / 2 + tR, bounds.right - 5, bounds.top + (bounds.bottom - bounds.top) / 2);
	paint.fillPath(headDiv.m_arrowColor);
	paint.closePath();
};

/*
* 绘制日的按钮
* dayButton:日期按钮
* paint:绘图对象
*/
var drawDayButton = function (dayButton, paint) {
    if (dayButton.m_day) {
	    var calendar = dayButton.m_calendar;
	    var bounds = dayButton.m_bounds;
	    var text = dayButton.m_day.m_day;
	    var tSize = paint.textSize(text, dayButton.m_font);
	    if(dayButton.m_backColor){
	        paint.fillRect(dayButton.m_backColor, bounds.left + 2, bounds.top + 2, bounds.right - 2, bounds.bottom - 2);
	    }
	    if (dayButton.m_inThisMonth) {
	        paint.drawText(text, dayButton.m_textColor, dayButton.m_font, bounds.left + 5, bounds.top + 7 + tSize.cy / 2);
        } else {
	        paint.drawText(text, dayButton.m_textColor2, dayButton.m_font, bounds.left + 5, bounds.top + 7 + tSize.cy / 2);
        }
	    if(dayButton.m_borderColor){
            paint.drawRect(dayButton.m_borderColor, 1, 0, bounds.left + 2, bounds.top + 2, bounds.right - 2, bounds.bottom - 2);
        }
    }
};

/*
* 绘制月的按钮
* monthButton:月按钮
* paint:绘图对象
*/
var drawMonthButton = function (monthButton, paint) {
    var calendar = monthButton.m_calendar;
    var bounds = monthButton.m_bounds;
    var text = getMonthStr(monthButton.m_month);
    var tSize = paint.textSize(text, monthButton.m_font);
    if(monthButton.m_backColor){
        paint.fillRect(monthButton.m_backColor, bounds.left + 2, bounds.top + 2, bounds.right - 2, bounds.bottom - 2);
    }
    paint.drawText(text, monthButton.m_textColor, monthButton.m_font, bounds.left + 5, bounds.top + 7 + tSize.cy / 2);
    if(monthButton.m_borderColor){
        paint.drawRect(monthButton.m_borderColor, 1, 0, bounds.left + 2, bounds.top + 2, bounds.right - 2, bounds.bottom - 2);
    }
};

/*
* 绘制年的按钮
* yearButton:年按钮
* paint:绘图对象
*/
var drawYearButton = function (yearButton, paint) {
    var calendar = yearButton.m_calendar;
    var bounds = yearButton.m_bounds;
    var text = yearButton.m_year;
    var tSize = paint.textSize(text, yearButton.m_font);
    if(yearButton.m_backColor){
        paint.fillRect(yearButton.m_backColor, bounds.left + 2, bounds.top + 2, bounds.right - 2, bounds.bottom - 2);
    }
    paint.drawText(text, yearButton.m_textColor, yearButton.m_font, bounds.left + 5, bounds.top + 7 + tSize.cy / 2);
    if(yearButton.m_borderColor){
        paint.drawRect(yearButton.m_borderColor, 1, 0, bounds.left + 2, bounds.top + 2, bounds.right - 2, bounds.bottom - 2);
    }
};

/*
* 绘制日历
* calendar:日历
* paint:绘图对象
*/
var drawCalendar = function (calendar, paint) {
	if (calendar.m_backColor) {
		paint.fillRect(calendar.m_backColor, 0, 0, calendar.m_size.cx, calendar.m_size.cy);
	}
	if (calendar.m_mode == "day") {
		var dayButtonsSize = calendar.m_dayDiv.m_dayButtons.length;
		for (var i = 0; i < dayButtonsSize; i++) {
			var dayButton = calendar.m_dayDiv.m_dayButtons[i];
			if (dayButton.m_visible) {
			    if(paint.onPaintCalendarDayButton){
			        paint.onPaintCalendarDayButton(dayButton, paint);
			    }else{
				    drawDayButton(dayButton, paint);
				}
			}
		}
		var dayFCButtonmSize = calendar.m_dayDiv.m_dayButtons_am.length;
		for (var i = 0; i < dayFCButtonmSize; i++) {
			var dayButton = calendar.m_dayDiv.m_dayButtons_am[i];
			if (dayButton.m_visible) {
				if(paint.onPaintCalendarDayButton){
			        paint.onPaintCalendarDayButton(dayButton, paint);
			    }else{
				    drawDayButton(dayButton, paint);
				}
			}
		}
	}
	else if (calendar.m_mode == "month") {
		var monthButtonsSize = calendar.m_monthDiv.m_monthButtons.length;
		for (var i = 0; i < monthButtonsSize; i++) {
			var monthButton = calendar.m_monthDiv.m_monthButtons[i];
			if (monthButton.m_visible) {
			    if(paint.onPaintCalendarMonthButton){
		            paint.onPaintCalendarMonthButton(monthButton, paint);
		        }else{
			        drawMonthButton(monthButton, paint);
			    }
			}
		}
		var monthFCButtonmSize = calendar.m_monthDiv.m_monthButtons_am.length;
		for (var i = 0; i < monthFCButtonmSize; i++) {
			var monthButton = calendar.m_monthDiv.m_monthButtons_am[i];
			if (monthButton.m_visible) {
				if(paint.onPaintCalendarMonthButton){
		            paint.onPaintCalendarMonthButton(monthButton, paint);
		        }else{
			        drawMonthButton(monthButton, paint);
			    }
			}
		}
	} else if (calendar.m_mode == "year") {
		var yearButtonsSize = calendar.m_yearDiv.m_yearButtons.length;
		for (var i = 0; i < yearButtonsSize; i++) {
			var yearButton = calendar.m_yearDiv.m_yearButtons[i];
			if (yearButton.m_visible) {
			    if(paint.onPaintCalendarYearButton){
		            paint.onPaintCalendarYearButton(yearButton, paint);
		        }else{
			        drawYearButton(yearButton, paint);
			    }
			}
		}
		var yearFCButtonmSize = calendar.m_yearDiv.m_yearButtons_am.length;
		for (var i = 0; i < yearFCButtonmSize; i++) {
			var yearButton = calendar.m_yearDiv.m_yearButtons_am[i];
			if (yearButton.m_visible) {
			    if(paint.onPaintCalendarYearButton){
		            paint.onPaintCalendarYearButton(yearButton, paint);
		        }else{
			        drawYearButton(yearButton, paint);
			    }
			}
		}
	}
	if(paint.onPaintHeadDiv){
	    paint.onPaintHeadDiv(calendar.m_headDiv, paint);
	}else{
	    drawHeadDiv(calendar.m_headDiv, paint);
	}
	if (calendar.m_borderColor) {
		paint.drawRect(calendar.m_borderColor, 1, 0, 0, 0, calendar.m_size.cx, calendar.m_size.cy);
	}
};

/*
* 点击日的按钮
* mp:坐标
* dayButton:日期按钮
*/
var clickDayButton = function(mp, dayButton){
	var calendar = dayButton.m_calendar;
	var lastDay = calendar.m_selectedDay;
	calendar.m_selectedDay = dayButton.m_day;
	selectDay(calendar.m_dayDiv, calendar.m_selectedDay, lastDay);
	updateCalendar(calendar);
	if(calendar.m_paint){
	    invalidateView(calendar, calendar.m_paint);
	}
};

/*
* 点击月的按钮
* mp:坐标
* monthButton:月按钮
*/
var clickMonthButton = function (mp, monthButton) {
	var calendar = monthButton.m_calendar;
	var month = getYear(calendar.m_years, monthButton.m_year).m_months.get(monthButton.m_month);
	calendar.m_mode = "day";
	var lastDay = calendar.m_selectedDay;
	calendar.m_selectedDay = month.m_days.get(1);
	selectDay(calendar.m_dayDiv, calendar.m_selectedDay, lastDay);
	updateCalendar(calendar);
	if(calendar.m_paint){
	    invalidateView(calendar, calendar.m_paint);
	}
};

/*
* 点击年的按钮
* mp:坐标
* yearButton:年按钮
*/
var clickYearButton = function (mp, yearButton) {
	var calendar = yearButton.m_calendar;
	calendar.m_mode = "month";
	selectYear(calendar.m_monthDiv, yearButton.m_year);
	updateCalendar(calendar);
	if(calendar.m_paint){
	    invalidateView(calendar, calendar.m_paint);
	}
};

/*
* 点击左侧的按钮
* mp:坐标
* headDiv:头部层
*/
var clickLastButton = function (mp, headDiv) {
	var calendar = headDiv.m_calendar;
	if (calendar.m_mode == "day") {
		var lastMonth = getLastMonth(calendar, calendar.m_selectedDay.m_year, calendar.m_selectedDay.m_month);
		var lastDay = calendar.m_selectedDay;
		calendar.m_selectedDay = lastMonth.m_days.get(1);
		selectDay(calendar.m_dayDiv, calendar.m_selectedDay, lastDay);
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	} else if (calendar.m_mode == "month") {
		var year = calendar.m_monthDiv.m_year;
		year -= 1;
		selectYear(calendar.m_monthDiv, year);
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	} else if (calendar.m_mode == "year") {
		var year = calendar.m_yearDiv.m_startYear;
		year -= 12;
		selectStartYear(calendar.m_yearDiv, year);
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	}
};

/*
* 点击右侧的按钮
* mp:坐标
* headDiv:头部层
*/
var clickNextButton = function (mp, headDiv) {
	var calendar = headDiv.m_calendar;
	if (calendar.m_mode == "day") {
		var nextMonth = getNextMonth(calendar, calendar.m_selectedDay.m_year, calendar.m_selectedDay.m_month);
		var lastDay = calendar.m_selectedDay;
		calendar.m_selectedDay = nextMonth.m_days.get(1);
		selectDay(calendar.m_dayDiv, calendar.m_selectedDay, lastDay);
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	} else if (calendar.m_mode == "month") {
		var year = calendar.m_monthDiv.m_year;
		year += 1;
		selectYear(calendar.m_monthDiv, year);
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	} else if (calendar.m_mode == "year") {
		var year = calendar.m_yearDiv.m_startYear;
		year += 12;
		selectStartYear(calendar.m_yearDiv, year);
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	}
};

/*
* 改变模式的按钮
* mp:坐标
* headDiv:头部层
*/
var clickModeButton = function (mp, headDiv) {
	var calendar = headDiv.m_calendar;
	if (calendar.m_mode == "day") {
		calendar.m_mode = "month";
		calendar.m_monthDiv.m_month = calendar.m_selectedDay.m_month;
		calendar.m_monthDiv.m_year = calendar.m_selectedDay.m_year;
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	}
	else if (calendar.m_mode == "month") {
		calendar.m_mode = "year";
		selectStartYear(calendar.m_yearDiv, calendar.m_monthDiv.m_year);
		updateCalendar(calendar);
		if(calendar.m_paint){
		    invalidateView(calendar, calendar.m_paint);
		}
	}
};

/*
* 点击日历
* mp:坐标
* calendar:日历
*/
var clickCalendar = function (mp, calendar) {
	var headBounds = calendar.m_headDiv.m_bounds;
	if (mp.x >= headBounds.left && mp.x <= headBounds.right && mp.y >= headBounds.top && mp.y <= headBounds.bottom) {
		var tR = 10;
		if (mp.x < headBounds.left + tR * 3) {
			clickLastButton(mp, calendar.m_headDiv);
			return;
		} else if (mp.x > headBounds.right - tR * 3) { 
			clickNextButton(mp, calendar.m_headDiv);
			return;
		} else {
			clickModeButton(mp, calendar.m_headDiv);
			return;
        }
	}
	if (calendar.m_mode == "day") {
		var dayButtonsSize = calendar.m_dayDiv.m_dayButtons.length;
		for (var i = 0; i < dayButtonsSize; i++) {
			var dayButton = calendar.m_dayDiv.m_dayButtons[i];
			if (dayButton.m_visible) {
				var bounds = dayButton.m_bounds;
				if (mp.x >= bounds.left && mp.x <= bounds.right && mp.y >= bounds.top && mp.y <= bounds.bottom) {
					clickDayButton(mp, dayButton);
					return;
                }
			}
		}
	}
	else if (calendar.m_mode == "month") {
		var monthButtonsSize = calendar.m_monthDiv.m_monthButtons.length;
		for (var i = 0; i < monthButtonsSize; i++) {
			var monthButton = calendar.m_monthDiv.m_monthButtons[i];
			if (monthButton.m_visible) {
				var bounds = monthButton.m_bounds;
				if (mp.x >= bounds.left && mp.x <= bounds.right && mp.y >= bounds.top && mp.y <= bounds.bottom) {
					clickMonthButton(mp, monthButton);
					return;
				}
			}
		}
	} else if (calendar.m_mode == "year") {
		var yearButtonsSize = calendar.m_yearDiv.m_yearButtons.length;
		for (var i = 0; i < yearButtonsSize; i++) {
			var yearButton = calendar.m_yearDiv.m_yearButtons[i];
			if (yearButton.m_visible) {
				var bounds = yearButton.m_bounds;
				if (mp.x >= bounds.left && mp.x <= bounds.right && mp.y >= bounds.top && mp.y <= bounds.bottom) {
					clickYearButton(mp, yearButton);
					return;
				}
			}
		}
	}
};