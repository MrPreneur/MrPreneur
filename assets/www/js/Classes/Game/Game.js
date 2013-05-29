var Game = Class.create({
	
	//Constructor Method
	initialize: function(){
		this.helper=new GameHelper();
	},
	
	//Properties:
	id:0,
	currentMonth:-1,
//	date:null, //this object contains month name/ which year / season
	cities:[],
	players:[],
	baseBoardMembers:[],
	
	//Methods:
	
	myMethod:function(){
	
	},
	
	insert:function(callback)
	{ 
	  new GameHelper().insert(this,callback);
	},
	
	update:function(callback)
	{
	  new GameHelper().update(this.id,this.currentMonth,callback);
	},
	
	remove:function(callback)
	{
	   new GameHelper().remove(this.id, callback);
	},
	
	map:function(result,callback){
		
		var arr=new Array();
		var count=0;
		var mappedGamesCount=0;
		var self=this;
		if(result.rows.length==0)
		{
			callback(new Array());
		}
		else
		{
			for(var i=0;i<result.rows.length;i++)
			{
				
				var g=new Game();
				var row=result.rows.item(i);
				g.id=row.Id;
				g.currentMonth=row.CurrentMonth;
				arr.push(g);
				
				new GameHelper().getAllCities(g.id,function(cityar){
					
					if(cityar.length>0)
					{
						for(var j=0;j<arr.length;j++)
						{
							arr[j].cities=cityar;
							
						}
					}
					
					
					new GameHelper().getAllPlayers(arr[count].id,function(plar){
					
					if(plar.length>0)
					{
						
						for(var k=0;k<arr.length;k++)
						{
							
							if(arr[k].id==plar[0].GameID)
							{
							//alert("da5al");
								arr[k].players=plar;
								
								break;
							}
						}
						
						//assign the same company that the player has to the its corresponding city (same object)
						//assign the same tiles that each company has to its corresponding city (same object)
						for(var z=0;z<plar.length;z++)
						{
							
								var comp = plar[z].company;
								
								for(zz=0;zz<arr[count].cities.length;zz++)
								{
								
									if(comp.mainCityID==arr[count].cities[zz].id)
									{
										
										arr[count].cities[zz].companies.push(comp);
										
										for(var zzz=0;zzz<comp.tiles.length;zzz++)
										{
											
											arr[count].cities[zz].tiles.push(comp.tiles[zzz]);
										}	
									}
								}
							
						}
						
					}	
							new GameHelper().getAllBaseBoardMembers(arr[count].id,function(bmar){
							
							if(bmar.length>0)
							{
								for(var l=0;l<arr.length;l++)
								{	
									arr[l].baseBoardMembers=bmar;
								
								}
							}
							
								new GameHelper().getAllBaseProjects(arr[count].id,function(bpar){
									
										if(bpar.length>0)
										{
											for(var v=0;v<arr.length;v++)
											{
												arr[v].baseProjects=bpar;
											}
										
										}
										
										count++;
										if(count==result.rows.length)
										{
											console.log("returned ");
											callback(arr);
										}
									
									});
							});
						
		
					});
					
					
				mappedGamesCount++;
				});
			
			
			}
			
		}

	}
	
	
	/*getCompaniesData:function(callback)
	{
		var self=this;
		var compHelper= new CompanyHelper();
		compHelper.getAllCompanies(self.id,function(result){console.log(result);});
	}*/

});

