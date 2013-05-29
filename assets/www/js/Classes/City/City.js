var City = Class.create({
	
	//Constructor Method
	initialize: function(){
	
	},
	
	//Properties:
	id:0,
	name:null,
	tilesCount:{x:0 ,y:0}, //string
	population:0,
	baseTilePrice:0,
	isBaseCity:0,
	baseCityID:0,
	imageID:0,
	image:null,
	tiles:[], //array of objects of tile
	companies:[],
	
	//Methods:
	
	insert:function(callback)
	{
	    new CityHelper().insert(this,callback);
	},
	
	update:function()
	{
	    new CityHelper().update(this.id, this.name, this.tileCount.x, this.tileCount.y, this.baseTilePrice, this.population,this.isBaseCity ,this.baseCityID,this.imageID);
	},
	
	remove:function()
	{
	   new CityHelper().remove(this.id);
	},
	
	
	map:function(result,callback){
	 var cityarr = new Array();
		var count=0;
	
		if(result.rows.length==0)
		{
			callback(new Array());
		}
		else
		{
			 for (var i =0; i<result.rows.length; i++)
			 {
					var cityrow = result.rows.item(i);
					var c = new City();
					c.id = cityrow.Id;
					c.name = cityrow.Name;
					c.tilesCount = {x:cityrow.TileCountX ,y:cityrow.TileCountY};
					c.population = cityrow.Popualtion;
					c.basTilePrice = cityrow.BaseTilePrice;
					c.isBaseCity = cityrow.IsBaseCity;   //
					c.baseCityID  = cityrow.BaseCityId;  //
					c.imageID = cityrow.ImageId;        //
					c.companies=new Array();
					c.tiles=new Array();
					cityarr.push(c);
								
					callback(cityarr);

					
					
					
					
			 }
				
		}
		
	}

	
	
});