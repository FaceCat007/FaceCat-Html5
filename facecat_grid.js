/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
 * 表格列
 */
function FCGridColumn() {
	this.m_name = ""; //名称
	this.m_text = ""; //文字
	this.m_type = ""; //类型
	this.m_width = 120; //宽度
	this.m_font = "12px Arial"; //字体
	this.m_backColor = "rgb(50,50,50)"; //背景色
	this.m_borderColor = "rgb(100,100,100)"; //边线颜色
	this.m_textColor = "rgb(200,200,200)"; //文字颜色
	this.m_frozen = false; //是否冻结
	this.m_sort = "none"; //排序模式
	this.m_allowSort = true; //是否允许排序
	this.m_visible = true; //是否可见
	this.m_index = -1; //索引
	this.m_bounds = new FCRect(); //区域
};

/*
 * 单元格
 */
function FCGridCell(){
	this.m_value = null; //值
	this.m_backColor = "rgb(0,0,0)"; //背景色
	this.m_borderColor = "rgb(100,100,100)"; //边线颜色
	this.m_textColor = "rgb(255,255,255)"; //文字颜色
	this.m_font = "12px Arial"; //字体
	this.m_colSpan = 1; //列距
	this.m_rowSpan = 1; //行距
	this.m_column = null; //所在列
};

/*
 * 表格行
 */
function FCGridRow() {
	this.m_cells = new Array(); //单元格
	this.m_selected = false; //是否选中
	this.m_visible = true; //是否可见
};

/*
* 表格
*/
function FCGrid() {
	this.m_columns = new Array(); //列
	this.m_rows = new Array(); //行
	this.m_rowHeight = 30; //行高
	this.m_headerHeight = 30; //头部高度
	this.m_scrollV = 0; //纵向滚动
	this.m_scrollH = 0; //横向滚动
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
	this.m_type = "grid"; //类型
	this.m_scrollSize = 10; //滚动条大小
	this.m_visible = true; //是否可见
	this.m_selectedRowColor = "rgb(125,125,125)"; //选中行的颜色
};

FCGrid.prototype = FCView;

/*
* 绘制单元格
* grid:表格
* row:行
* column:列
* cell:单元格
* paint:绘图对象
* left:左侧坐标
* top:上方坐标
* right:右侧坐标
* bottom:下方坐标
*/
var drawGridCell = function (grid, row, column, cell, paint, left, top, right, bottom) {
	if (cell.m_backColor) {
		paint.fillRect(cell.m_backColor, left, top, right, bottom);
	}
	if (row.m_selected) {
		if (grid.m_selectedRowColor) {
			paint.fillRect(grid.m_selectedRowColor, left, top, right, bottom);
        }
    }
	if (cell.m_borderColor) {
		paint.drawRect(cell.m_borderColor, 1, 0, left, top, right, bottom);
	}
	if (cell.m_value) {
		var tSize = paint.textSize(cell.m_value, cell.m_font);
		if (tSize.cx > column.m_width) {
			paint.drawTextAutoEllipsis(cell.m_value, cell.m_textColor, cell.m_font, left + 2, top + grid.m_rowHeight / 2, left + 2 + column.m_width, top + grid.m_rowHeight / 2);
		} else {
			paint.drawText(cell.m_value, cell.m_textColor, cell.m_font, left + 2, top + grid.m_rowHeight / 2);
		}
	}
};

/*
* 绘制列
* grid:表格
* column:列
* paint:绘图对象
* left:左侧坐标
* top:上方坐标
* right:右侧坐标
* bottom:下方坐标
*/
var drawGridColumn = function (grid, column, paint, left, top, right, bottom) {
	var tSize = paint.textSize(column.m_text, column.m_font);
	if (column.m_backColor) {
		paint.fillRect(column.m_backColor, left, top, right, bottom);
	}
	if (column.m_borderColor) {
		paint.drawRect(column.m_borderColor, 1, 0, left, top, right, bottom);
	}
	paint.drawText(column.m_text, column.m_textColor, column.m_font, left + (column.m_width - tSize.cx) / 2, top + grid.m_headerHeight / 2);
	if (column.m_sort == "asc") {
		paint.beginPath();
		var cR = (bottom - top) / 4
		var oX = right - cR * 2, oY = top + (bottom - top) / 2
		paint.addLine(oX, oY - cR, oX - cR, oY + cR);
		paint.addLine(oX - cR, oY + cR, oX + cR, oY + cR);
		paint.addLine(oX + cR, oY + cR, oX, oY - cR);
		paint.fillPath(column.m_textColor);
		paint.closePath();
	}
	else if (column.m_sort == "desc") {
		paint.beginPath();
		var cR = (bottom - top) / 4
		var oX = right - cR * 2, oY = top + (bottom - top) / 2
		paint.addLine(oX, oY + cR, oX - cR, oY - cR);
		paint.addLine(oX - cR, oY - cR, oX + cR, oY - cR);
		paint.addLine(oX + cR, oY - cR, oX, oY + cR);
		paint.fillPath(column.m_textColor);
		paint.closePath();
    }
};

/*
* 绘制表格
* grid:表格
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawGrid = function (grid, paint, clipRect) {
	var cLeft = -grid.m_scrollH;
	var cTop = -grid.m_scrollV + grid.m_headerHeight;
	//绘制行
	var colLeft = 0;
	for (var i = 0; i < grid.m_columns.length; i++) {
		var colRect = new FCRect(colLeft, 0, colLeft + grid.m_columns[i].m_width, grid.m_headerHeight);
		grid.m_columns[i].m_bounds = colRect;
		grid.m_columns[i].m_index = i;
		colLeft += grid.m_columns[i].m_width;
    }
	for (i = 0; i < grid.m_rows.length; i++) {
		var row = grid.m_rows[i];
		if (row.m_visible) {
			var rTop = cTop, rBottom = cTop + grid.m_rowHeight;
			if (rBottom >= 0 && cTop <= grid.m_size.cy) {
				for (j = 0; j < row.m_cells.length; j++) {
					var cell = row.m_cells[j];
					var gridColumn = cell.m_column;
					if (!gridColumn) {
						gridColumn = grid.m_columns[j];
                    }
					if (gridColumn.m_visible) {
						if (!gridColumn.m_frozen) {
							var cellWidth = gridColumn.m_width;
							var colSpan = cell.m_colSpan;
							if (colSpan > 1) {
								for (var n = 1; n < colSpan; n++) {
									var spanColumn = grid.m_columns[gridColumn.m_index + n];
									if (spanColumn && spanColumn.m_visible) {
										cellWidth += spanColumn.m_width;
									}
								}
							}
							var cellHeight = grid.m_rowHeight;
							var rowSpan = cell.m_rowSpan;
							if (rowSpan > 1) {
								for (var n = 1; n < rowSpan; n++) {
									var spanRow = grid.m_rows[i + n];
									if (spanRow && spanRow.m_visible) {
										cellHeight += grid.m_rowHeight;
									}
								}
							}
							var cRect = new FCRect(gridColumn.m_bounds.left - grid.m_scrollH, rTop, gridColumn.m_bounds.left + cellWidth - grid.m_scrollH, rTop + cellHeight);
							if (cRect.right >= 0 && cRect.left < grid.m_size.cx) {
							    if(paint.onPaintGridCell){
							        paint.onPaintGridCell(grid, row, gridColumn, cell, paint, cRect.left, cRect.top, cRect.right, cRect.bottom);
							    }else{
								    drawGridCell(grid, row, gridColumn, cell, paint, cRect.left, cRect.top, cRect.right, cRect.bottom);
								}
							}
						}
					}
				}
			}
			if (rBottom >= 0 && cTop <= grid.m_size.cy) {
				for (j = 0; j < row.m_cells.length; j++) {
					var cell = row.m_cells[j];
					var gridColumn = cell.m_column;
					if (!gridColumn) {
						gridColumn = grid.m_columns[j];
					}
					if (gridColumn.m_visible) {
						if (gridColumn.m_frozen) {
							var cellWidth = gridColumn.m_width;
							var colSpan = cell.m_colSpan;
							if (colSpan > 1) {
								for (var n = 1; n < colSpan; n++) {
									var spanColumn = grid.m_columns[gridColumn.m_index + n];
									if (spanColumn && spanColumn.m_visible) {
										cellWidth += spanColumn.m_width;
									}
								}
							}
							var cellHeight = grid.m_rowHeight;
							var rowSpan = cell.m_rowSpan;
							if (rowSpan > 1) {
								for (var n = 1; n < rowSpan; n++) {
									var spanRow = grid.m_rows[i + n];
									if (spanRow && spanRow.m_visible) {
										cellHeight += grid.m_rowHeight;
									}
								}
							}
							var cRect = new FCRect(gridColumn.m_bounds.left, rTop, gridColumn.m_bounds.left + cellWidth, rTop + cellHeight);
							if (cRect.right >= 0 && cRect.left < grid.m_size.cx) {
							    if(paint.onPaintGridCell){
							        paint.onPaintGridCell(grid, row, gridColumn, cell, paint, cRect.left, cRect.top, cRect.right, cRect.bottom);
							    }else{
							        drawGridCell(grid, row, gridColumn, cell, paint, cRect.left, cRect.top, cRect.right, cRect.bottom);
							    }
							}
						}
					}
				}
			}
			if (cTop > grid.m_size.cy) {
				break;
            }
			cTop += grid.m_rowHeight;
		}
	}
	if (grid.m_headerHeight > 0) {
		//绘制列
		for (i = 0; i < grid.m_columns.length; i++) {
			var gridColumn = grid.m_columns[i];
			if (grid.m_columns[i].m_visible) {
				if (!gridColumn.m_frozen) {
				    if(paint.onPaintGridColumn){
				        paint.onPaintGridColumn(grid, grid.m_columns[i], paint, cLeft, 0, cLeft + gridColumn.m_width, grid.m_headerHeight);
				    }else{
					    drawGridColumn(grid, grid.m_columns[i], paint, cLeft, 0, cLeft + gridColumn.m_width, grid.m_headerHeight);
					}
				}
				cLeft += gridColumn.m_width;
			}
		}
		cLeft = 0;
		for (i = 0; i < grid.m_columns.length; i++) {
			var gridColumn = grid.m_columns[i];
			if (grid.m_columns[i].m_visible) {
				if (gridColumn.m_frozen) {
				    if(paint.onPaintGridColumn){
				        paint.onPaintGridColumn(grid, grid.m_columns[i], paint, cLeft, 0, cLeft + gridColumn.m_width, grid.m_headerHeight);
				    }else{
					    drawGridColumn(grid, grid.m_columns[i], paint, cLeft, 0, cLeft + gridColumn.m_width, grid.m_headerHeight);
					}
				}
				cLeft += gridColumn.m_width;
			}
		}
	}
};

/*
* 绘制表格的滚动条
* grid:表格
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawGridScrollBar = function(grid, paint, clipRect){
   if(m_isMobile){
        if(m_mouseDownView == grid){
        }else if(m_dragScrollView_Grid == grid && m_scrollAddSpeed_Grid != 0){
        }else{
            return;
        }
    }
    if (grid.m_showHScrollBar) {
		var contentWidth = getGridContentWidth(grid);
		if (contentWidth > grid.m_size.cx) {
			var sLeft = grid.m_scrollH / contentWidth * grid.m_size.cx;
			var sRight = (grid.m_scrollH + grid.m_size.cx) / contentWidth * grid.m_size.cx;
			if (sRight - sLeft < grid.m_scrollSize) {
				sRight = sLeft + grid.m_scrollSize;
			}
			paint.fillRect(grid.m_scrollBarColor, sLeft, grid.m_size.cy - grid.m_scrollSize, sRight, grid.m_size.cy);
		}
	}
	if(grid.m_showVScrollBar){
	    var contentHeight = getGridContentHeight(grid);
		if (contentHeight > grid.m_size.cy - grid.m_headerHeight) {
			var sTop = grid.m_headerHeight + grid.m_scrollV / contentHeight * (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize);
			var sBottom = sTop + ((grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize)) / contentHeight * (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize);
			if (sBottom - sTop < grid.m_scrollSize) {
				sBottom = sTop + grid.m_scrollSize;
			}
			paint.fillRect(grid.m_scrollBarColor, grid.m_size.cx - grid.m_scrollSize, sTop, grid.m_size.cx, sBottom);
		}
	}
};

/*
* 获取内容的宽度
* grid:表格
*/
var getGridContentWidth = function (grid) {
	var cWidth = 0;
	for (var i = 0; i < grid.m_columns.length; i++) {
		if (grid.m_columns[i].m_visible) {
			cWidth += grid.m_columns[i].m_width;
		}
	}
	return cWidth;
};

/*
* 获取内容的高度
* grid:表格
*/
var getGridContentHeight = function (grid) {
	var cHeight = 0;
	for (var i = 0; i < grid.m_rows.length; i++) {
		if (grid.m_rows[i].m_visible) {
			cHeight += grid.m_rowHeight;
        }
	}
	return cHeight;
};

/*
* 表格的鼠标移动方法
* grid: 表格
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseMoveGrid = function (grid, firstTouch, secondTouch, firstPoint, secondPoint) {
	if (firstTouch) {
		var mp = firstPoint;
		if (grid.m_showHScrollBar || grid.m_showVScrollBar){
			if (grid.m_downScrollHButton) {
				var contentWidth = getGridContentWidth(grid);
				var subX = (mp.x - grid.m_startPoint.x) / grid.m_size.cx * contentWidth;
				var newScrollH = grid.m_startScrollH + subX;
				if (newScrollH < 0) {
					newScrollH = 0;
				} else if (newScrollH > contentWidth - grid.m_size.cx) {
					newScrollH = contentWidth - grid.m_size.cx;
				}
				grid.m_scrollH = newScrollH;
				m_cancelClick = true;
				return;

			} else if (grid.m_downScrollVButton) {
				var contentHeight = getGridContentHeight(grid);
				var subY = (mp.y - grid.m_startPoint.y) / (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize) * contentHeight;
				var newScrollV = grid.m_startScrollV + subY;
				if (newScrollV < 0) {
					newScrollV = 0;
				} else if (newScrollV > contentHeight - (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize)) {
					newScrollV = contentHeight - (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize);
				}
				grid.m_scrollV = newScrollV;
				m_cancelClick = true;
				return;
			}
		}
		if (grid.m_allowDragScroll) {
			var contentWidth = getGridContentWidth(grid);
			if (contentWidth > grid.m_size.cx - grid.m_scrollSize) {
				var subX = grid.m_startPoint.x - mp.x;
				var newScrollH = grid.m_startScrollH + subX;
				if (newScrollH < 0) {
					newScrollH = 0;
				} else if (newScrollH > contentWidth - grid.m_size.cx) {
					newScrollH = contentWidth - grid.m_size.cx;
				}
				grid.m_scrollH = newScrollH;
				if(Math.abs(subX) > 5){
				    m_cancelClick = true;
				}
			}
			var contentHeight = getGridContentHeight(grid);
			if (contentHeight > grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize) {
				var subY = grid.m_startPoint.y - mp.y;
				var newScrollV = grid.m_startScrollV + subY;
				if (newScrollV < 0) {
					newScrollV = 0;
				} else if (newScrollV > contentHeight - (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize)) {
					newScrollV = contentHeight - (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize);
				}
				grid.m_scrollV = newScrollV;
				if(Math.abs(subY) > 5){
				    m_cancelClick = true;
				}
			}
		}
	}
};

/*
* 表格的鼠标按下方法
* grid: 表格
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseDownGrid = function (grid, firstTouch, secondTouch, firstPoint, secondPoint) {
	var mp = firstPoint;
	grid.m_mouseDownTime = new Date().getTime()
	grid.m_startPoint = mp;
	grid.m_downScrollHButton = false;
	grid.m_downScrollVButton = false;
	if (grid.m_showHScrollBar){
		var contentWidth = getGridContentWidth(grid);
		if (contentWidth > grid.m_size.cx - grid.m_scrollSize) {
		    var sLeft = grid.m_scrollH / contentWidth * grid.m_size.cx;
		    var sRight = (grid.m_scrollH + grid.m_size.cx) / contentWidth * grid.m_size.cx;
		    if (sRight - sLeft < grid.m_scrollSize) {
			    sRight = sLeft + grid.m_scrollSize;
		    }
		    if (mp.x >= sLeft && mp.x <= sRight && mp.y >= grid.m_size.cy - grid.m_scrollSize && mp.y <= grid.m_size.cy) {
			    grid.m_downScrollHButton = true;
			    grid.m_startScrollH = grid.m_scrollH;
			    return;
		    }
		}
	}
	if(grid.m_showVScrollBar){
	    var contentHeight = getGridContentHeight(grid);
		if (contentHeight > grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize) {
			var sTop = grid.m_headerHeight + grid.m_scrollV / contentHeight * (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize);
			var sBottom = grid.m_headerHeight + (grid.m_scrollV + (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize)) / contentHeight * (grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize);
			if (sBottom - sTop < grid.m_scrollSize) {
				sBottom = sTop + grid.m_scrollSize;
			}
			if (mp.x >= grid.m_size.cx - grid.m_scrollSize && mp.x <= grid.m_size.cx && mp.y >= sTop && mp.y <= sBottom) {
				grid.m_downScrollVButton = true;
				grid.m_startScrollV = grid.m_scrollV;
				return;
			}
		}
	}
	if (grid.m_allowDragScroll) {
		grid.m_startScrollH = grid.m_scrollH;
		grid.m_startScrollV = grid.m_scrollV;
	}
};

var m_dragScrollView_Grid = null;//正在滚动的表格
var m_scrollAddSpeed_Grid = 0;//滚动加速
var m_scrollDirection_Grid = 0; //滚动方向

/*
* 检查拖动滚动
*/
var checkGridDragScroll = function () {
	if (m_dragScrollView_Grid) {
		var sub = parseInt(m_scrollAddSpeed_Grid / 10);
		m_scrollAddSpeed_Grid -= sub;
		if (sub == 0) {
		    var viewCache = m_dragScrollView_Grid;
			m_dragScrollView_Grid = null;
			m_scrollAddSpeed_Grid = 0;
			if(viewCache.m_paint){
			    invalidateView(viewCache, viewCache.m_paint);
			}
		} else {
			var oldScrollV = parseInt(m_dragScrollView_Grid.m_scrollV + m_scrollAddSpeed_Grid);
			var oldScrollH = parseInt(m_dragScrollView_Grid.m_scrollH + m_scrollAddSpeed_Grid);
			if(m_scrollDirection_Grid == 0){
			    var contentHeight = getGridContentHeight(m_dragScrollView_Grid);
				if (contentHeight < m_dragScrollView_Grid.m_size.cy - m_dragScrollView_Grid.m_scrollSize) {
				    m_dragScrollView_Grid.m_scrollV = 0;
			    } else {
				    if (oldScrollV < 0) {
					    oldScrollV = 0;
				    } else if (oldScrollV > contentHeight - m_dragScrollView_Grid.m_size.cy + m_dragScrollView_Grid.m_headerHeight + m_dragScrollView_Grid.m_scrollSize) {
					    oldScrollV = contentHeight - m_dragScrollView_Grid.m_size.cy + m_dragScrollView_Grid.m_headerHeight + m_dragScrollView_Grid.m_scrollSize;
				    }
				    m_dragScrollView_Grid.m_scrollV = oldScrollV;
			    }
			}else{
			    var contentWidth = getGridContentWidth(m_dragScrollView_Grid);
				if (contentWidth < m_dragScrollView_Grid.m_size.cx - m_dragScrollView_Grid.m_headerHeight - m_dragScrollView_Grid.m_scrollSize) {
				    m_dragScrollView_Grid.m_scrollH = 0;
			    } else {
				    if (oldScrollH < 0) {
					    oldScrollH = 0;
				    } else if (oldScrollH > contentWidth - m_dragScrollView_Grid.m_size.cx) {
					    oldScrollH = contentWidth - m_dragScrollView_Grid.m_size.cx;
				    }
				    m_dragScrollView_Grid.m_scrollH = oldScrollH;
			    }
			}
			if(m_dragScrollView_Grid.m_paint){
			    invalidateView(m_dragScrollView_Grid, m_dragScrollView_Grid.m_paint);
			}
		}
    }
};

setInterval(checkGridDragScroll, 20);

/*
* 表格的鼠标抬起方法
* grid: 表格
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseUpGrid = function (grid, firstTouch, secondTouch, firstPoint, secondPoint) {
	if (firstTouch && firstPoint && grid.m_startPoint && !grid.m_downScrollHButton && !grid.m_downScrollVButton) {
		if (grid.m_allowDragScroll) {
			var mouseUpTime = new Date().getTime();
			var diff = mouseUpTime - grid.m_mouseDownTime;
			//加速滚动
			if (diff < 500) {
				var sub1 = 30 * ((Math.abs(firstPoint.y - grid.m_startPoint.y)) / 20) / diff * 10;
				var sub2 =  30 * ((Math.abs(firstPoint.x - grid.m_startPoint.x)) / 20) / diff * 10;
				if("A:" + sub1 != "A:NaN" && "A:" + sub2 != "A:NaN"){
				    if(Math.abs(sub1) > Math.abs(sub2)){
				        if (firstPoint.y < grid.m_startPoint.y) {
					        m_scrollAddSpeed_Grid += sub1;
				        } else {
					        m_scrollAddSpeed_Grid -= sub1;
				        }
				        m_scrollDirection_Grid = 0;
				    }else{
				        if (firstPoint.x < grid.m_startPoint.x) {
					        m_scrollAddSpeed_Grid += sub2;
				        } else {
					        m_scrollAddSpeed_Grid -= sub2;
				        }
				        m_scrollDirection_Grid = 1;
				    }
				    if(Math.abs(m_scrollAddSpeed_Grid) > 0){
				        m_cancelClick = true;
				    }
				    m_dragScrollView_Grid = grid;
				}
			}
		}
	}
	grid.m_downScrollHButton = false;
	grid.m_downScrollVButton = false;
	if(m_cancelClick){
	    return;
	}
	
	var cLeft = -grid.m_scrollH;
	var cTop = -grid.m_scrollV + grid.m_headerHeight;
	//绘制行
	var colLeft = 0;
	for (var i = 0; i < grid.m_columns.length; i++) {
		var colRect = new FCRect(colLeft, 0, colLeft + grid.m_columns[i].m_width, grid.m_headerHeight);
		grid.m_columns[i].m_bounds = colRect;
		grid.m_columns[i].m_index = i;
		colLeft += grid.m_columns[i].m_width;
    }
	for (i = 0; i < grid.m_rows.length; i++) {
		var row = grid.m_rows[i];
		if (row.m_visible) {
			var rTop = cTop, rBottom = cTop + grid.m_rowHeight;
			if (rBottom >= 0 && cTop <= grid.m_size.cy) {
				for (j = 0; j < row.m_cells.length; j++) {
					var cell = row.m_cells[j];
					var gridColumn = cell.m_column;
					if (!gridColumn) {
						gridColumn = grid.m_columns[j];
                    }
					if (gridColumn.m_visible) {
						if (!gridColumn.m_frozen) {
							var cellWidth = gridColumn.m_width;
							var colSpan = cell.m_colSpan;
							if (colSpan > 1) {
								for (var n = 1; n < colSpan; n++) {
									var spanColumn = grid.m_columns[gridColumn.m_index + n];
									if (spanColumn && spanColumn.m_visible) {
										cellWidth += spanColumn.m_width;
									}
								}
							}
							var cellHeight = grid.m_rowHeight;
							var rowSpan = cell.m_rowSpan;
							if (rowSpan > 1) {
								for (var n = 1; n < rowSpan; n++) {
									var spanRow = grid.m_rows[i + n];
									if (spanRow && spanRow.m_visible) {
										cellHeight += grid.m_rowHeight;
									}
								}
							}
							
							var cRect = new FCRect(gridColumn.m_bounds.left - grid.m_scrollH, rTop, gridColumn.m_bounds.left + cellWidth - grid.m_scrollH, rTop + cellHeight);
							if (cRect.right >= 0 && cRect.left < grid.m_size.cx) {
							    if(firstPoint.x >= cRect.left && firstPoint.x <= cRect.right && firstPoint.y >= cRect.top && firstPoint.y <= cRect.bottom){
									for (r = 0; r < grid.m_rows.length; r++) {
										var subRow = grid.m_rows[r];
										if (subRow == row) {
											subRow.m_selected = true
										} else {
											subRow.m_selected = false
										}
									}
									if (grid.m_paint && grid.m_paint.onClickGridCell) {
										grid.m_paint.onClickGridCell(grid, row, gridColumn, cell, firstTouch, secondTouch, firstPoint, secondPoint);
							        }
							        return;
							    }
							}
						}
					}
				}
			}
			if (rBottom >= 0 && cTop <= grid.m_size.cy) {
				for (j = 0; j < row.m_cells.length; j++) {
					var cell = row.m_cells[j];
					var gridColumn = cell.m_column;
					if (!gridColumn) {
						gridColumn = grid.m_columns[j];
					}
					if (gridColumn.m_visible) {
						if (gridColumn.m_frozen) {
							var cellWidth = gridColumn.m_width;
							var colSpan = cell.m_colSpan;
							if (colSpan > 1) {
								for (var n = 1; n < colSpan; n++) {
									var spanColumn = grid.m_columns[gridColumn.m_index + n];
									if (spanColumn && spanColumn.m_visible) {
										cellWidth += spanColumn.m_width;
									}
								}
							}
							var cellHeight = grid.m_rowHeight;
							var rowSpan = cell.m_rowSpan;
							if (rowSpan > 1) {
								for (var n = 1; n < rowSpan; n++) {
									var spanRow = grid.m_rows[i + n];
									if (spanRow && spanRow.m_visible) {
										cellHeight += grid.m_rowHeight;
									}
								}
							}
							var cRect = new FCRect(gridColumn.m_bounds.left, rTop, gridColumn.m_bounds.left + cellWidth, rTop + cellHeight);
							if (cRect.right >= 0 && cRect.left < grid.m_size.cx) {
							    if(firstPoint.x >= cRect.left && firstPoint.x <= cRect.right && firstPoint.y >= cRect.top && firstPoint.y <= cRect.bottom){
									for (r = 0; r < grid.m_rows.length; r++) {
										var subRow = grid.m_rows[r];
										if (subRow == row) {
											subRow.m_selected = true
										} else {
											subRow.m_selected = false
										}
									}
									if (grid.m_paint && grid.m_paint.onClickGridCell) {
										grid.m_paint.onClickGridCell(grid, row, gridColumn, cell, firstTouch, secondTouch, firstPoint, secondPoint);
							        }
							        return;
							    }
							}
						}
					}
				}
			}
			if (cTop > grid.m_size.cy) {
				break;
            }
			cTop += grid.m_rowHeight;
		}
	}
	if (grid.m_headerHeight > 0 && firstPoint.y <= grid.m_headerHeight) {
		//绘制列
		for (i = 0; i < grid.m_columns.length; i++) {
			var gridColumn = grid.m_columns[i];
			if (grid.m_columns[i].m_visible) {
				if (gridColumn.m_frozen) {
					if (firstPoint.x >= cLeft && firstPoint.x <= cLeft + gridColumn.m_width) {
						for (j = 0; j < grid.m_columns.length; j++) {
							tColumn = grid.m_columns[j]
							if (tColumn == gridColumn) {
								if (tColumn.m_allowSort) {
									if (tColumn.m_sort == "none" || tColumn.m_sort == "desc") {
										tColumn.m_sort = "asc";
										grid.m_rows.sort((m, n) => {
											if (m.m_cells.length > j && n.m_cells.length > j) {
												if (m.m_cells[j].m_value < n.m_cells[j].m_value) {
													return -1;
												}
												else if (m.m_cells[j].m_value > n.m_cells[j].m_value) {
													return 1;
												}
												else return 0;
											}
											else {
												return 0;
											}
										});
									} else {
										tColumn.m_sort = "desc";
										grid.m_rows.sort((m, n) => {
											if (m.m_cells.length > j && n.m_cells.length > j) {
												if (m.m_cells[j].m_value > n.m_cells[j].m_value) {
													return -1;
												}
												else if (m.m_cells[j].m_value < n.m_cells[j].m_value) {
													return 1;
												}
												else return 0;
											} else {
												return 0;
											}
										});
									}
								} else {
									tColumn.m_sort = "none";
                                }
							} else {
								tColumn.m_sort = "none";
							}
						}
						if (grid.m_paint && grid.m_paint.onClickGridColumn) {
							grid.m_paint.onClickGridColumn(grid, gridColumn, firstTouch, secondTouch, firstPoint, secondPoint);
						}
				        return;
				    }
				}
				cLeft += gridColumn.m_width;
			}
		}
		cLeft = 0;
		for (i = 0; i < grid.m_columns.length; i++) {
			var gridColumn = grid.m_columns[i];
			if (grid.m_columns[i].m_visible) {
				if (!gridColumn.m_frozen) {
					if (firstPoint.x >= cLeft && firstPoint.x <= cLeft + gridColumn.m_width) {
						for (j = 0; j < grid.m_columns.length; j++) {
							tColumn = grid.m_columns[j]
							if (tColumn == gridColumn) {
								if (tColumn.m_allowSort) {
									if (tColumn.m_sort == "none" || tColumn.m_sort == "desc") {
										tColumn.m_sort = "asc";
										grid.m_rows.sort((m, n) => {
											if (m.m_cells.length > j && n.m_cells.length > j) {
												if (m.m_cells[j].m_value < n.m_cells[j].m_value) {
													return -1;
												}
												else if (m.m_cells[j].m_value > n.m_cells[j].m_value) {
													return 1;
												}
												else return 0;
											} else {
												return 0;
                                            }
										});
									} else {
										tColumn.m_sort = "desc";
										grid.m_rows.sort((m, n) => {
											if (m.m_cells.length > j && n.m_cells.length > j) {
												if (m.m_cells[j].m_value > n.m_cells[j].m_value) {
													return -1;
												}
												else if (m.m_cells[j].m_value < n.m_cells[j].m_value) {
													return 1;
												}
												else return 0;
											} else {
												return 0;
											}
										});
									}
								} else {
									tColumn.m_sort = "none";
								}
							} else {
								tColumn.m_sort = "none";
							}
						}
						if (grid.m_paint && grid.m_paint.onClickGridColumn) {
							grid.m_paint.onClickGridColumn(grid, gridColumn, firstTouch, secondTouch, firstPoint, secondPoint);
						} 
				        return;
				    }
				}
				cLeft += gridColumn.m_width;
			}
		}
	}
};

/*
* 表格的鼠标滚轮方法
* grid:表格
* delta:滚轮值
*/
var mouseWheelGrid = function(grid, delta){
    var oldScrollV = grid.m_scrollV;
    if (delta > 0) {
	    oldScrollV -= grid.m_rowHeight;
    } else if (delta < 0) {
	    oldScrollV += grid.m_rowHeight;
    }
    var contentHeight = getGridContentHeight(grid);
	if (contentHeight < grid.m_size.cy - grid.m_headerHeight - grid.m_scrollSize) {
        grid.m_scrollV = 0;
    } else {
        if (oldScrollV < 0) {
	        oldScrollV = 0;
	    } else if (oldScrollV > contentHeight - grid.m_size.cy + grid.m_headerHeight + grid.m_scrollSize) {
		    oldScrollV = contentHeight - grid.m_size.cy + grid.m_headerHeight + grid.m_scrollSize;
        }
        grid.m_scrollV = oldScrollV;
    }
};
