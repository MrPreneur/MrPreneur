var Player = Class.create({
	
	//Constructor Method
	initialize: function(){
	
	},
	
	//Properties:
	id:0,
	name:null,
	age:0,
	imageID:null,
	GameID:0,
	isComputer:false,
	image:null,
	company:null,
	
	//Methods:
	
	myMethod:function(){
	
	},
	// insert - update - delete
	insert:function(callback)
	{
	   new PlayerHelper().insert(this, callback);
	},
	
	update:function()
	{
	  new PlayerHelper().update(this.id,this.name,this.age,this.imageID,this.isComputer);
	},
	
	remove:function()
	{
	  new PlayerHelper().remove(this.id);
	},
		
	map:function(result,callback)
	{
	
		var arr=new Array();
		var count=0;
		var mappedCompanies=0;
		if(result.rows.length==0)
		{
			callback(new Array());
		}
		else
		{
			for(var i=0;i<result.rows.length;i++)
			{
				var pl=new Player();
				var row=result.rows.item(i);
				pl.id=row.Id;
				pl.name=row.Name;
				pl.age=row.Age;
				pl.imageID=row.ImageId;
				pl.isComputer = row.IsComputer;
				pl.GameID=row.GameId;
				
				arr.push(pl);
				
				new ImageHelper().getPlayerImage(pl.imageID,function(img){
				
					if(img.length>0)
					{
						for (var i=0;i<arr.length;i++)
						{
						
							if(arr[i].imageID==img[0].Id)
							{
								arr[i].image=img[0]
								break;
							}
						}
					}	
					//alert("Player"  + count);
					new PlayerHelper().getCompanyByPlayerId(arr[mappedCompanies].id,function(comp){
					
						if(comp.length>0)
						{
						
							for (var k=0;k<arr.length;k++)
							{
								if(arr[k].id==comp[0].ownerID)
								{
									arr[k].company=comp[0];
									
									
									break;
								}
							}
						}
						count++;
						
						
						if(count==result.rows.length)
						{
							
							callback(arr);
						}
					
					});
					
					mappedCompanies++;
				
				});
				
			
			}
			
		}
	
	
	}

});