/*
* FaceCat的HTML5框架(开源)
* 上海卷卷猫信息技术有限公司
*/ 

/*
 * 表格列
 */
function FCTreeColumn() {
	this.m_width = 120; //宽度
	this.m_visible = true; //是否可见
	this.m_index = -1; //索引
	this.m_bounds = new FCRect(); //区域
};

/*
 * 单元格
 */
function FCTreeNode(){
	this.m_value = null; //值
	this.m_backColor = "rgb(255,255,255)"; //背景色
	this.m_textColor = "rgb(0,0,0)"; //文字颜色
	this.m_font = "14px Arial"; //字体
	this.m_column = null; //所在列
	this.m_allowCollapsed = true; //是否允许折叠
	this.m_collapsed = false; //是否折叠
	this.m_parentNode = null; //父节点
	this.m_childNodes = new Array(); //子节点
	this.m_indent = 0; //缩进
	this.m_row = null; //所在行
	this.m_checked = false; //是否选中
};

/*
 * 表格行
 */
function FCTreeRow() {
	this.m_cells = new Array(); //单元格
	this.m_selected = false; //是否选中
	this.m_visible = true; //是否可见
	this.m_index = -1; //索引
};

/*
* 树
*/
function FCTree() {
	this.m_scrollV = 0; //纵向滚动
	this.m_scrollH = 0; //横向滚动
	this.m_columns = new Array(); //列
	this.m_rows = new Array(); //行
	this.m_rowHeight = 30; //行高
	this.m_headerHeight = 0; //头部高度
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
	this.m_childNodes = new Array(); //子节点
	this.m_indent = 20; //缩进
	this.m_showCheckBox = false; //是否显示复选框
	this.m_checkBoxWidth = 25; //复选框占用的宽度
	this.m_collapsedWidth = 25; //折叠按钮占用的宽度
	this.m_type = "tree"; //类型
	this.m_scrollSize = 10; //滚动条大小
	this.m_visible = true; //是否可见
};

FCTree.prototype = FCView;

/*
 * 获取总的偏移量
 * node:树节点
 */
var getTotalIndent = function(node) {
	if (node.m_parentNode) {
		return node.m_indent + getTotalIndent(node.m_parentNode);
	} else {
		return node.m_indent;
	}
};

/*
* 绘制单元格
* tree:树
* row:行
* column:列
* node:节点
* paint:绘图对象
* left:左侧坐标
* top:上方坐标
* right:右侧坐标
* bottom:下方坐标
*/
var drawTreeNode = function (tree, row, column, node, paint, left, top, right, bottom) {
	if (node.m_backColor) {
		paint.fillRect(node.m_backColor, left, top, right, bottom);
	}
	if (node.m_value) {
		var tSize = paint.textSize(node.m_value, node.m_font);
		var tLeft = left + 2 + getTotalIndent(node);

		var wLeft = tLeft;
		var cR = tree.m_checkBoxWidth / 3;
		if (tree.m_showCheckBox) {
			wLeft += tree.m_checkBoxWidth;
			if (node.m_checked) {
				paint.fillRect(node.m_textColor, tLeft + (tree.m_checkBoxWidth - cR) / 2, top + (tree.m_rowHeight - cR) / 2, tLeft + (tree.m_checkBoxWidth + cR) / 2, top + (tree.m_rowHeight + cR) / 2);
			} else {
				paint.drawRect(node.m_textColor, 1, 0, tLeft + (tree.m_checkBoxWidth - cR) / 2, top + (tree.m_rowHeight - cR) / 2, tLeft + (tree.m_checkBoxWidth + cR) / 2, top + (tree.m_rowHeight + cR) / 2);
			}
		}
		if (node.m_childNodes.length > 0) {
			paint.beginPath();
			if (node.m_collapsed) {
				paint.addLine(wLeft + (tree.m_collapsedWidth + cR) / 2, top + tree.m_rowHeight / 2, wLeft + (tree.m_collapsedWidth - cR) / 2, top + (tree.m_rowHeight - cR) / 2);
				paint.addLine(wLeft + (tree.m_collapsedWidth - cR) / 2, top + (tree.m_rowHeight - cR) / 2, wLeft + (tree.m_collapsedWidth - cR) / 2, top + (tree.m_rowHeight + cR) / 2);
				paint.addLine(wLeft + (tree.m_collapsedWidth - cR) / 2, top + (tree.m_rowHeight + cR) / 2, wLeft + (tree.m_collapsedWidth + cR) / 2, top + tree.m_rowHeight / 2);
			} else {
				paint.addLine(wLeft + (tree.m_collapsedWidth - cR) / 2, top + (tree.m_rowHeight - cR) / 2, wLeft + (tree.m_collapsedWidth + cR) / 2, top + (tree.m_rowHeight - cR) / 2);
				paint.addLine(wLeft + (tree.m_collapsedWidth + cR) / 2, top + (tree.m_rowHeight - cR) / 2, wLeft + tree.m_collapsedWidth / 2, top + (tree.m_rowHeight + cR) / 2);
				paint.addLine(wLeft + tree.m_collapsedWidth / 2, top + (tree.m_rowHeight + cR) / 2, wLeft + (tree.m_collapsedWidth - cR) / 2, top + (tree.m_rowHeight - cR) / 2);
			}
			paint.fillPath(node.m_textColor);
			paint.closePath();
			wLeft += tree.m_collapsedWidth;
		}
		if (tSize.cx > column.m_width) {
			paint.drawTextAutoEllipsis(node.m_value, node.m_textColor, node.m_font, wLeft, top + tree.m_rowHeight / 2, wLeft + column.m_width, top + tree.m_rowHeight / 2);
		} else {
			paint.drawText(node.m_value, node.m_textColor, node.m_font, wLeft, top + tree.m_rowHeight / 2);
		}
	}
};

/*
* 绘制树
* tree:树
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawTree = function (tree, paint, clipRect) {
	var cLeft = -tree.m_scrollH;
	var cTop = -tree.m_scrollV + tree.m_headerHeight;
	//绘制行
	var colLeft = 0;
	for (var i = 0; i < tree.m_columns.length; i++) {
		var colRect = new FCRect(colLeft, 0, colLeft + tree.m_columns[i].m_width, tree.m_headerHeight);
		tree.m_columns[i].m_bounds = colRect;
		tree.m_columns[i].m_index = i;
		colLeft += tree.m_columns[i].m_width;
	}
	updateTreeRowIndex(tree);
	for (i = 0; i < tree.m_rows.length; i++) {
		var row = tree.m_rows[i];
		if (row.m_visible) {
			var rTop = cTop, rBottom = cTop + tree.m_rowHeight;
			if (rBottom >= 0 && cTop <= tree.m_size.cy) {
				for (j = 0; j < row.m_cells.length; j++) {
					var node = row.m_cells[j];
					var treeColumn = node.m_column;
					if (!treeColumn) {
						treeColumn = tree.m_columns[j];
					}
					if (treeColumn.m_visible) {
						var nodeWidth = treeColumn.m_width;
						var nodeHeight = tree.m_rowHeight;
						var cRect = new FCRect(treeColumn.m_bounds.left - tree.m_scrollH, rTop, treeColumn.m_bounds.left + nodeWidth - tree.m_scrollH, rTop + nodeHeight);
						if (cRect.right >= 0 && cRect.left < tree.m_size.cx) {
						    if(paint.onPaintTreeNode){
						        paint.onPaintTreeNode(tree, row, treeColumn, node, paint, cRect.left, cRect.top, cRect.right, cRect.bottom);
						    }else{
							    drawTreeNode(tree, row, treeColumn, node, paint, cRect.left, cRect.top, cRect.right, cRect.bottom);
							}
						}
					}
				}
			}
			if (cTop > tree.m_size.cy) {
				break;
			}
			cTop += tree.m_rowHeight;
		}
	}
};

/*
* 绘制滚动条
* tree:树
* paint:绘图对象
* clipRect:裁剪区域
*/
var drawTreeScrollBar = function (tree, paint, clipRect) {
      if(m_isMobile){
        if(m_mouseDownView == tree){
        }else if(m_dragScrollView_Tree == tree && m_scrollAddSpeed_Tree != 0){
        }else{
            return;
        }
    }
	if (tree.m_showHScrollBar) {
		var contentWidth = getTreeContentWidth(tree);
		if (contentWidth > tree.m_size.cx) {
			var sLeft = tree.m_scrollH / contentWidth * tree.m_size.cx;
			var sRight = (tree.m_scrollH + tree.m_size.cx) / contentWidth * tree.m_size.cx;
			if (sRight - sLeft < tree.m_scrollSize) {
				sRight = sLeft + tree.m_scrollSize;
			}
			paint.fillRect(tree.m_scrollBarColor, sLeft, tree.m_size.cy - tree.m_scrollSize, sRight, tree.m_size.cy);
		}
	}
	if(tree.m_showVScrollBar){
		var contentHeight = getTreeContentHeight(tree);		
		if (contentHeight > tree.m_size.cy) {
			var sTop = tree.m_headerHeight + tree.m_scrollV / contentHeight * (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize);
			var sBottom = sTop + ((tree.m_size.cy - tree.m_headerHeight)) / contentHeight * (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize);
			if (sBottom - sTop < tree.m_scrollSize) {
				sBottom = sTop + tree.m_scrollSize;
			}
			paint.fillRect(tree.m_scrollBarColor, tree.m_size.cx - tree.m_scrollSize, sTop, tree.m_size.cx, sBottom);
		}
	}
};

/*
* 获取内容的宽度
* tree:树
*/
var getTreeContentWidth = function (tree) {
	var cWidth = 0;
	for (var i = 0; i < tree.m_columns.length; i++) {
		if (tree.m_columns[i].m_visible) {
			cWidth += tree.m_columns[i].m_width;
		}
	}
	return cWidth;
};

/*
* 获取内容的高度
* tree:树
*/
var getTreeContentHeight = function (tree) {
	var cHeight = 0;
	for (var i = 0; i < tree.m_rows.length; i++) {
		if (tree.m_rows[i].m_visible) {
			cHeight += tree.m_rowHeight;
		}
	}
	return cHeight;
};

/*
* 树的鼠标移动方法
* tree: 树
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseMoveTree = function (tree, firstTouch, secondTouch, firstPoint, secondPoint) {
	if (firstTouch) {
		var mp = firstPoint;
		if (tree.m_showHScrollBar || tree.m_showVScrollBar) {
			if (tree.m_downScrollHButton) {
				var contentWidth = getTreeContentWidth(tree);
				var subX = (mp.x - tree.m_startPoint.x) / tree.m_size.cx * contentWidth;
				var newScrollH = tree.m_startScrollH + subX;
				if (newScrollH < 0) {
					newScrollH = 0;
				} else if (newScrollH > contentWidth - tree.m_size.cx) {
					newScrollH = contentWidth - tree.m_size.cx;
				}
				tree.m_scrollH = newScrollH;
				m_cancelClick = true; 
				return;

			} else if (tree.m_downScrollVButton) {
				var contentHeight = getTreeContentHeight(tree);
				var subY = (mp.y - tree.m_startPoint.y) / (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize) * contentHeight;
				var newScrollV = tree.m_startScrollV + subY;
				if (newScrollV < 0) {
					newScrollV = 0;
				} else if (newScrollV > contentHeight - (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize)) {
					newScrollV = contentHeight - (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize);
				}
				tree.m_scrollV = newScrollV;
				m_cancelClick = true;
				return;
			}
		}
		if (tree.m_allowDragScroll) {
			var contentWidth = getTreeContentWidth(tree);
			if (contentWidth > tree.m_size.cx) {
				var subX = tree.m_startPoint.x - mp.x;
				var newScrollH = tree.m_startScrollH + subX;
				if (newScrollH < 0) {
					newScrollH = 0;
				} else if (newScrollH > contentWidth - tree.m_size.cx) {
					newScrollH = contentWidth - tree.m_size.cx;
				}
				tree.m_scrollH = newScrollH;
				if(Math.abs(subX) > 5){
				    m_cancelClick = true;
				}
			}
			var contentHeight = getTreeContentHeight(tree);
			if (contentHeight > tree.m_size.cy) {
				var subY = tree.m_startPoint.y - mp.y;
				var newScrollV = tree.m_startScrollV + subY;
				if (newScrollV < 0) {
					newScrollV = 0;
				} else if (newScrollV > contentHeight - (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize)) {
					newScrollV = contentHeight - (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize);
				}
				tree.m_scrollV = newScrollV;
				if(Math.abs(subY) > 5){
				    m_cancelClick = true;
				}
			}
		}
	}
};

/*
* 树的鼠标按下方法
* tree: 树
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseDownTree = function (tree, firstTouch, secondTouch, firstPoint, secondPoint) {
	var mp = firstPoint;
	tree.m_mouseDownTime = new Date().getTime()
	tree.m_startPoint = mp;
	tree.m_downScrollHButton = false;
	tree.m_downScrollVButton = false;
	if (tree.m_showHScrollBar) {
		var contentWidth = getTreeContentWidth(tree);
		if (contentWidth > tree.m_size.cx) {
		var sLeft = tree.m_scrollH / contentWidth * tree.m_size.cx;
			var sRight = (tree.m_scrollH + tree.m_size.cx) / contentWidth * tree.m_size.cx;
			if (sRight - sLeft < tree.m_scrollSize) {
				sRight = sLeft + tree.m_scrollSize;
			}
			if (mp.x >= sLeft && mp.x <= sRight && mp.y >= tree.m_size.cy - tree.m_scrollSize && mp.y <= tree.m_size.cy) {
				tree.m_downScrollHButton = true;
				tree.m_startScrollH = tree.m_scrollH;
				return;
			}
		}
	}
	if (tree.m_showVScrollBar) {
		var contentHeight = getTreeContentHeight(tree);
		if (contentHeight > tree.m_size.cy) {
			var sTop = tree.m_headerHeight + tree.m_scrollV / contentHeight * (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize);
			var sBottom = tree.m_headerHeight + (tree.m_scrollV + (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize)) / contentHeight * (tree.m_size.cy - tree.m_headerHeight - tree.m_scrollSize);
			if (sBottom - sTop < tree.m_scrollSize) {
				sBottom = sTop + tree.m_scrollSize;
			}
			if (mp.x >= tree.m_size.cx - tree.m_scrollSize && mp.x <= tree.m_size.cx && mp.y >= sTop && mp.y <= sBottom) {
				tree.m_downScrollVButton = true;
				tree.m_startScrollV = tree.m_scrollV;
				return;
			}
		}
	}
	if (tree.m_allowDragScroll) {
		tree.m_startScrollH = tree.m_scrollH;
		tree.m_startScrollV = tree.m_scrollV;
	}
};

var m_dragScrollView_Tree = null;//正在滚动的表格
var m_scrollAddSpeed_Tree = 0;//滚动加速
var m_scrollDirection_Tree = 0; //滚动方向

/*
* 检查拖动滚动
*/
var checkDragScroll_Tree = function () {
	if (m_dragScrollView_Tree) {
		var sub = parseInt(m_scrollAddSpeed_Tree / 10);
		m_scrollAddSpeed_Tree -= sub;
		if (sub == 0) {
		    var viewCache = m_dragScrollView_Tree;
		    m_scrollAddSpeed_Tree = 0;
		    m_dragScrollView_Tree = null;
		    if(viewCache.m_paint){
				invalidateView(viewCache, viewCache.m_paint);
			}

		} else {
			var oldScrollV = parseInt(m_dragScrollView_Tree.m_scrollV + m_scrollAddSpeed_Tree);
			var oldScrollH = parseInt(m_dragScrollView_Tree.m_scrollH + m_scrollAddSpeed_Tree);
			if(m_scrollDirection_Tree == 0){
			    var contentHeight = getTreeContentHeight(m_dragScrollView_Tree);
			    if (contentHeight < m_dragScrollView_Tree.m_size.cy) {
				    m_dragScrollView_Tree.m_scrollV = 0;
			    } else {
				    if (oldScrollV < 0) {
					    oldScrollV = 0;
				    } else if (oldScrollV > contentHeight - m_dragScrollView_Tree.m_size.cy + m_dragScrollView_Tree.m_headerHeight + m_dragScrollView_Tree.m_scrollSize) {
					    oldScrollV = contentHeight - m_dragScrollView_Tree.m_size.cy + m_dragScrollView_Tree.m_headerHeight + m_dragScrollView_Tree.m_scrollSize;
				    }
				    m_dragScrollView_Tree.m_scrollV = oldScrollV;
			    }
			}else
			{
			    var contentWidth = getTreeContentWidth(m_dragScrollView_Tree);
			    if (contentWidth < m_dragScrollView_Tree.m_size.cx) {
				    m_dragScrollView_Tree.m_scrollH = 0;
			    } else {
				    if (oldScrollH < 0) {
					    oldScrollH = 0;
				    } else if (oldScrollH > contentWidth - m_dragScrollView_Tree.m_size.cx) {
					    oldScrollH = contentWidth - m_dragScrollView_Tree.m_size.cx;
				    }
				    m_dragScrollView_Tree.m_scrollH = oldScrollH;
			    }
			}
			if(m_dragScrollView_Tree.m_paint){
				invalidateView(m_dragScrollView_Tree, m_dragScrollView_Tree.m_paint);
			}
		}
	}
};

setInterval(checkDragScroll_Tree, 20);

/*
* 表格的鼠标抬起方法
* tree: 树
* firstTouch:是否第一次触摸
* secondTouch:是否第二次触摸
* firstPoint:第一次触摸的坐标
* secondPoint:第二次触摸的坐标
*/
var mouseUpTree = function (tree, firstTouch, secondTouch, firstPoint, secondPoint) {
	if (firstTouch && firstPoint && tree.m_startPoint && !tree.m_downScrollHButton && !tree.m_downScrollVButton) {
		if (tree.m_allowDragScroll) {
			var mouseUpTime = new Date().getTime();
			var diff = mouseUpTime - tree.m_mouseDownTime;
			//加速滚动
			if (diff < 500) {
				var sub1 = 30 * ((Math.abs(firstPoint.y - tree.m_startPoint.y)) / 20) / diff * 10;
				var sub2 =  30 * ((Math.abs(firstPoint.x - tree.m_startPoint.x)) / 20) / diff * 10;
				if("A:" + sub1 != "A:NaN" && "A:" + sub2 != "A:NaN"){
				    if(Math.abs(sub1) > Math.abs(sub2)){
				        if (firstPoint.y < tree.m_startPoint.y) {
					        m_scrollAddSpeed_Tree += sub1;
				        } else {
					        m_scrollAddSpeed_Tree -= sub1;
				        }
				        m_scrollDirection_Tree = 0;
				    }else{
				        if (firstPoint.x < tree.m_startPoint.x) {
					        m_scrollAddSpeed_Tree += sub2;
				        } else {
					        m_scrollAddSpeed_Tree -= sub2;
				        }
				        m_scrollDirection_Tree = 1;
				    }
				    m_dragScrollView_Tree = tree;
				    if(Math.abs(m_scrollAddSpeed_Tree) > 0){
				        m_cancelClick = true;
				    }
				}
			}
		}
	}
	tree.m_downScrollHButton = false;
	tree.m_downScrollVButton = false;
	if(m_cancelClick){
	    return;
	}
	var cLeft = -tree.m_scrollH;
	var cTop = -tree.m_scrollV + tree.m_headerHeight;
	for (var i = 0; i < tree.m_rows.length; i++) {
		var row = tree.m_rows[i];
		if (row.m_visible) {
			if (firstPoint.y >= cTop && firstPoint.y <= cTop + tree.m_rowHeight) {
				var node = row.m_cells[0];
				var tLeft = cLeft + 2 + getTotalIndent(node);
				var wLeft = tLeft;
				if (tree.m_showCheckBox) {
					wLeft += tree.m_checkBoxWidth;
					if (firstPoint.x < wLeft) {
						checkOrUnCheckTreeNode(node, !node.m_checked);
						if (tree.m_paint) {
							invalidateView(tree, tree.m_paint);
						}
						break;
					}
				}
				if (node.m_childNodes.length > 0) {
					wLeft += tree.m_collapsedWidth;
					if (firstPoint.x < wLeft) {
						node.m_collapsed = !node.m_collapsed;
						hideOrShowTreeNode(node, !node.m_collapsed);
						if (tree.m_paint) {
							invalidateView(tree, tree.m_paint);
						}
						break;
					}
				}
				if (tree.m_paint && tree.m_paint.onClickTreeNode) {
					tree.m_paint.onClickTreeNode(tree, node, firstTouch, secondTouch, firstPoint, secondPoint);
				}
			}
			cTop += tree.m_rowHeight;
		}
	}
};

/*
 * 更新行的索引
 * tree:树
 */ 
var updateTreeRowIndex = function (tree) {
	for (var i = 0; i < tree.m_rows.length; i++) {
		tree.m_rows[i].m_index = i;
	}
};

/*
 * 获取最后一行的索引 
 * node:树节点
 */
var getTreeLastNodeRowIndex = function (node) {
	var rowIndex = node.m_row.m_index;
	for (var i = 0; i < node.m_childNodes.length; i++) {
		var rIndex = getTreeLastNodeRowIndex(node.m_childNodes[i]);
		if (rowIndex < rIndex) {
			rowIndex = rIndex;
		}
	}
	return rowIndex;
};
 
/*
 * 添加节点
 * tree:树
 * node:要添加的节点
 * parentNode:父节点
 */ 
var appendTreeNode = function (tree, node, parentNode) {
	if (!parentNode) {
		var newRow = new FCTreeRow();
		tree.m_rows.push(newRow);
		node.m_row = newRow;
		newRow.m_cells.push(node)
		tree.m_childNodes.push(node);
	} else {
		var newRow = new FCTreeRow();
		if (parentNode.m_childNodes.length == 0) {
			tree.m_rows.splice(parentNode.m_row.m_index + 1, 0, newRow);
		} else {
			tree.m_rows.splice(getTreeLastNodeRowIndex(parentNode) + 1, 0, newRow);
		}
		node.m_parentNode = parentNode;
		node.m_indent = tree.m_indent;
		node.m_row = newRow;
		newRow.m_cells.push(node);
		parentNode.m_childNodes.push(node);
		if (parentNode.m_collapsed) {
			newRow.m_visible = false;
		}
	}
	updateTreeRowIndex(tree);
};

/*
 * 移除节点
 * tree:树
 * node:要添加的节点
 */ 
var removeTreeNode = function (tree, node) {
	//移除相互关系
	if (!node.m_parentNode) {
		var nodesSize = tree.m_childNodes.length;
		for (var i = 0; i < nodesSize; i++) {
			if (tree.m_childNodes[i] == node) {
				tree.m_childNodes.splice(i, 1);
				break;
			}
		}
	} else {
		var nodesSize = node.m_parentNode.m_childNodes.length;
		for (var i = 0; i < nodesSize; i++) {
			if (node.m_parentNode.m_childNodes[i] == node) {
				node.m_parentNode.m_childNodes.splice(i, 1);
				break;
			}
		}
	}
	//移除行
	tree.m_rows.splice(node.m_row.m_index, 1);
	updateTreeRowIndex(tree);
};

/*
 * 展开或折叠节点
 * node:节点
 * visible:是否可见
 */ 
var hideOrShowTreeNode = function (node, visible) {
	if (node.m_childNodes.length > 0) {
		for (var i = 0; i < node.m_childNodes.length; i++) {
			node.m_childNodes[i].m_row.m_visible = visible;
			hideOrShowTreeNode(node.m_childNodes[i], visible);
		}
	}
};

/*
 * 展开或折叠节点
 * node:节点
 * checked:是否选中
 */
var checkOrUnCheckTreeNode = function (node, checked) {
	node.m_checked = checked;
	if (node.m_childNodes.length > 0) {
		for (var i = 0; i < node.m_childNodes.length; i++) {
			checkOrUnCheckTreeNode(node.m_childNodes[i], checked);
		}
	}
};

/*
* 树的鼠标滚轮方法
* tree:树
* delta:滚轮值
*/
var mouseWheelTree = function(tree, delta){
    var oldScrollV = tree.m_scrollV;
    if (delta > 0) {
	    oldScrollV -= tree.m_rowHeight;
    } else if (delta < 0) {
	    oldScrollV += tree.m_rowHeight;
    }
    var contentHeight = getTreeContentHeight(tree);
    if (contentHeight < tree.m_size.cy) {
        tree.m_scrollV = 0;
    } else {
        if (oldScrollV < 0) {
	        oldScrollV = 0;
	    } else if (oldScrollV > contentHeight - tree.m_size.cy + tree.m_headerHeight + tree.m_scrollSize) {
		    oldScrollV = contentHeight - tree.m_size.cy + tree.m_headerHeight + tree.m_scrollSize;
        }
        tree.m_scrollV = oldScrollV;
    }
};


