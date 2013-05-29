var BaseGrid = function(canv)
{
	
	//the actual horizontal width of the tile on the screen. the tile height will be half of it
	this.tileWidth = 128;
	//origin where to start the canvas
	this.origin = {x:400 , y:0};
	//number of the grids in both x and y (Isometric view)
	this.gridsCount={x:20 , y:20};
	this.canvas = canv;
	this.canvasWidth=canv.width;
	this.canvasHeight=canv.height;
	this.canvasContext=canv.getContext("2d");
	
	this.mouseDownFlag=false;
	this.mousePreviousCoords={x:0,y:0};
	this.mouseCurrentCoords={x:0,y:0};
	
	var _self=this;
	var img = new Image();
	img.src="building.png";
	this.drawGrid = function(){
		
		_self.canvasContext.clearRect(0,0,_self.canvasWidth,_self.canvasHeight);
		
		var startXGrid= Math.floor(((-2/(_self.tileWidth))*(_self.origin.y + (_self.origin.x/2))));
		if(startXGrid<0)
		{
			startXGrid=0;
		}
		var startYGrid=Math.floor(((-2/(_self.tileWidth))*(_self.origin.y - (_self.origin.x/2) + (_self.canvasWidth/2))));
		if(startYGrid<0)
		{
			startYGrid=0;
		}
		
		//the maximum grids count that can be drawn given the canvas size. we add two to fill the gaps.
		var maxGridsToDraw=Math.round(_self.canvasWidth/(_self.tileWidth/2))+2;
		
		//
		var maxXGridsToDraw = (startXGrid+maxGridsToDraw)>_self.gridsCount.x?_self.gridsCount.x:(startXGrid+maxGridsToDraw);
		
		var maxYGridsToDraw = (startYGrid+maxGridsToDraw)>_self.gridsCount.y?_self.gridsCount.y:(startYGrid+maxGridsToDraw);
		
		/*
		//drawing the grid affects the fps
		
		// the width to be drawn by the canvas context
		
		var gridWidth=_self.tileWidth*Math.sqrt(2)/2; 
		//we didn't modify the height here because the canvas context will later scale it by half
		var gridHeight=gridWidth;
		var xOffset = 0, yOffset = 0; //offsets
		var ctx =_self.canvasContext; 
		ctx.save();
		// change projection to isometric view
		ctx.translate(_self.origin.x, _self.origin.y);
		//scales the height to half and rotate 45 degree clockwise to give isometric view
		ctx.scale(1, 0.5);
		ctx.rotate(45 * Math.PI /180);
		//draw the grid
		
		
		
		
		
		for (var y = startYGrid; y < maxGridsToDraw; y++) {
			for (var x = startXGrid; x < maxGridsToDraw; x++) {
				ctx.strokeRect(xOffset, yOffset, gridWidth, gridHeight);
				xOffset += gridWidth;
			}
			xOffset = 0;
			yOffset += gridHeight;
		}
		ctx.restore(); // back to orthogonal projection
		*/
		
		
		
		for (var y = startYGrid; y < maxYGridsToDraw; y++) {
			for (var x = startXGrid; x <maxXGridsToDraw; x++) {
				_self.drawImage({xGrid:x,yGrid:y},1,img);
			}
		}
		
		_self.drawImage({xGrid:0,yGrid:0},2,img);
		
		
		/*
		for (var y = 0; y < _self.gridsCount.y; y++) {
			for (var x = 0; x < _self.gridsCount.x; x++) {
				_self.drawImage({xGrid:x,yGrid:y},img);
			}
		}
		*/
	
	}
	
	this.drawImage=function(tilePos,tilesNo,img)
	{
		
		var imgCoords = {
			x: ((tilePos.xGrid-tilePos.yGrid)*(_self.tileWidth/2)) + _self.origin.x - (tilesNo*_self.tileWidth/2) ,
			y: ((tilePos.xGrid+tilePos.yGrid)*_self.tileWidth/4)+_self.origin.y
			}
			
			
			_self.canvasContext.drawImage(img,imgCoords.x,imgCoords.y,tilesNo*_self.tileWidth,tilesNo*_self.tileWidth/2);
			
	}
	
	this.getMouseCoords=function(event,sender){
		var totalOffsetX = 0;
		var totalOffsetY = 0;
		var canvasX = 0;
		var canvasY = 0;
		var currentElement = sender;
		do{
			totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
			totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
		}
		while(currentElement = currentElement.offsetParent)

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY ;
	
		return({x:canvasX, y:canvasY});
	}
	
	
	this.gridClick=function(event){
		
		//get the cooredinates of the event
		var mouseCoords = _self.getMouseCoords(event,this);
		var tilePos=_self.posInGrid(mouseCoords.x-(_self.origin.x+(_self.tileWidth/2)),mouseCoords.y-(_self.origin.y));
		//console.log("x: "+mouseCoords.x + " y: " + mouseCoords.y);
		//console.log("x: "+ tilePos.xGrid +" y: "+tilePos.yGrid);
		//_self.moveToTile(tilePos);
		_self.mouseDownFlag=true;
		_self.mouseCurrentCoords=mouseCoords;
	}
	
		
	this.posInGrid=function (canvasX, canvasY) {
		
		var xx =Math.floor((canvasY/(_self.tileWidth/2)) + (1*canvasX/_self.tileWidth) +0.5);
		var yy = Math.floor((canvasY/(_self.tileWidth/2)) - (1*canvasX/_self.tileWidth)-0.5);
		//console.log("x: "+canvasX + "  y: "+ canvasY);
		//console.log("tilex: "+xx + "  tiley: "+ yy);
		return({xGrid:xx, yGrid:yy});
		
	}
	
	this.moveToTile=function(tilePos)
	{
		_self.origin={
			x: (_self.canvasWidth/2)-((tilePos.xGrid - tilePos.yGrid) * _self.tileWidth/2),
			y: (_self.canvasHeight/2)-((tilePos.xGrid+tilePos.yGrid ) * _self.tileWidth/4)- (_self.tileWidth/4),
		}
	}
	
	this.mouseMove=function(event){
		if(_self.mouseDownFlag==true)
		{
			var newMouseCoords = _self.getMouseCoords(event,this);
			_self.origin= {
				x: _self.origin.x + (newMouseCoords.x - _self.mouseCurrentCoords.x),
				y: _self.origin.y + (newMouseCoords.y - _self.mouseCurrentCoords.y)
				}
			_self.mouseCurrentCoords = newMouseCoords
				//console.log(_self.origin.y+(_self.tileWidth/4) +(0.5*(_self.origin.x + (_self.tileWidth/2) )));
				//console.log("originx: "+_self.origin.x + " originy: "+_self.origin.y);
				//console.log ("unknown:"+(((-2/(_self.tileWidth))*(_self.origin.y + (_self.origin.x/2)))));
			//	console.log ("unknown2:"+(((-2/(_self.tileWidth))*(_self.origin.y - (_self.origin.x/2) + (_self.canvasWidth/2)))));
				
			 event.preventDefault();
		}
	}
	
	this.mouseUp = function(event){
		_self.mouseDownFlag=false;
		event.preventDefault();
	}
	
	this.touchMove=function(event){
		//_self.origin=_self.getMouseCoords(event.touches[0],this);
		
		var newMouseCoords = _self.getMouseCoords(event.touches[0],this);
			_self.origin= {
				x: _self.origin.x + (newMouseCoords.x - _self.mouseCurrentCoords.x),
				y: _self.origin.y + (newMouseCoords.y - _self.mouseCurrentCoords.y)
				}
			_self.mouseCurrentCoords = newMouseCoords
		
		event.touches[0].preventDefault();
	}
	
	this.addEvents=(function()
	{
		_self.canvas.onmousedown=_self.gridClick;
		_self.canvas.onmousemove=_self.mouseMove;
		_self.canvas.onmouseup=_self.mouseUp;
		_self.canvas.ontouchmove=_self.touchMove;
	})();
	
	
}
