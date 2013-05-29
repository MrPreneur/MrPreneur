var Company = Class.create({
	
	//Constructor Method
	initialize: function(){
		this.helper=new CompanyHelper();
	},
	
	//Properties:
	id:0,
	name:null,
	logo:null,
	mainCityID:0,
	ownerID:0,
	logoId:0,
	cash:0,
	rating:0,
	stockPrice:0,
	workingBM :new Array(), 
	completedProj:new Array(),
	uCProj:new Array(),
	tiles:new Array(),
	activities:new Array(),
	//Methods:
	
	myMethod:function(){
	
	},
	 // Insert - Update - Remove 
	 insert:function(callback)
	{
	   new CompanyHelper().insert(this,callback );
	},
	
	update:function()
	{
	    new CompanyHelper().update(this.id, this.name, this.stockPrice, this.rating, this.cash, this.ownerID, this.mainCityID, this.logoId);
	},
	
	remove:function()
	{
	   new CompanyHelper().remove(this.id);
	},
	 
	 // Mona Methods 
	 BuyTile:function(Tile, WBM)
	{
	     var Act = new Activity();
		 var start = Act.startMonth;
		 var end = Act.endMonth;
		 Act.companyID = this.id;
		 Act.targetID = Tile.id;
		 Act.target = Tile;
		 Act.workingBoardMember = WBM;
		  start = 0;
		var dur = WBM.calcNegotiationDuration();
		end=start+dur;	  
		Act.insert(callback);		  
	},
	
	map:function(result,callback)
	{
	// console.log(result.rows);
		var self = this;
		var companyAry = new Array();
		var count = 0;
		var mappedCompaniesCount=0;
		if(result.rows.length==0)
		{
			callback(new Array());
		}
		for (var i=0;i<result.rows.length;i++)
		{
			
			var Com = new Company();
			Com.id = result.rows.item(i).Id;
			Com.name = result.rows.item(i).Name;
			Com.ownerID = result.rows.item(i).PlayerId;
			Com.mainCityID = result.rows.item(i).MainCityId;
			Com.cash = result.rows.item(i).Cash;
			Com.rating = result.rows.item(i).Rating;
			Com.stockPrice = result.rows.item(i).StockPrice;
			Com.logoId=result.rows.item(i).logoId;
			Com.workingBM = new Array();
			Com.completedProj = new Array();
			Com.uCProj = new Array();
			Com.tiles = new Array();
			Com.activities = new Array();
			companyAry.push(Com);
			
			new ImageHelper().getCompanyLogo(result.rows.item(i).logoId ,function(img){
			
				if(img.length>0)
				{
					for(var j=0;j<companyAry.length;j++)
					{
						
						if(companyAry[j].logoId==img[0].Id)
						{
							companyAry[j].logo=img[0];
							
						}
					}
				}
				//console.log("mapping working board members");
				new CompanyHelper().getAllWorkingBM(companyAry[mappedCompaniesCount].id,function(BMS){
				
				if(BMS.length>0)
				{
					for(var k=0;k<companyAry.length;k++)
					{
					
						if(companyAry[k].id == BMS[0].companyID)
						{
							companyAry[k].workingBM=BMS;
						}
					}
				}
				
				new CompanyHelper().getCompletedProjects(companyAry[count].id,function(ComProj){
				
				if(ComProj.length>0)
				{				
					for(var h=0;h<companyAry.length;h++)
					{	
						if(companyAry[h].id == ComProj[0].companyID)
						{
							companyAry[h].completedProj=ComProj;
							
						}
					}
				}
				
				new CompanyHelper().getUCProjects(companyAry[count].id,function(UCProj){
				
				if(UCProj.length>0)
				{
					for(var l=0;l<companyAry.length;l++)
					{
						
						
						if(companyAry[l].id == UCProj[0].companyId)
						{
							companyAry[l].uCProj=UCProj;
						}
					}
				}
				
				new CompanyHelper().getTiles(companyAry[count].id,function(ts){
				
				if(ts.length>0)
				{
					for(var f=0;f<companyAry.length;f++)
					{
						if(companyAry[f].id == ts[0].companyId)
						{
							companyAry[f].tiles=ts;
													
						}
					}
				}
				
				new CompanyHelper().getCompanyActivities(companyAry[count].id,function(Act){
				
				if(Act.length>0)
				{
					for(var n=0;n<companyAry.length;n++)
					{	
						 if(companyAry[n].id == Act[0].companyID)
						{
							
							companyAry[n].activities=Act;
													
						}
					}
				}
				
				count++;
				
				if(count==result.rows.length)
					{
					
						callback(companyAry);
						
					}
	
			});					
			});	//	console.log(count);
			});		
			});
			});
			mappedCompaniesCount++;
			});
		}
	},
	
	
	getAllCompanies:function(gameID,callback)
	{
		var self=this;
		self.helper.getAllCompanies(gameID,callback);
	},
	
	createMarketingActivity:function(completedProject,workingBoardMember,duration)
	{
		var act = new Activity();
		act.workingBoardMemberID=workingBoardMember.id;
		act.workingBoardMember=workingBoardMember;
		act.typeID=5;
		act.targetID=completedProject.id;
		act.target=completedProject;
		act.companyID=this.id
		startMonth=g.currentMonth;
		endMonth=g.currentMonth + duration;
		
		
		act.insert();
		this.activities.push(act);
	},
	
	///////////////////////////////
		//Omnia's Methods 
	//--------------
	//create Project
		createNewUCProject:function(name,baseProject,callback)
	{
		var self = this;
		var UCPrj = new UnderConstructionProject();
		UCPrj.name = name;
		UCPrj.companyId = self.id;
		UCPrj.baseProject = baseProject;
		UCPrj.baseProjectId = baseProject.id;
		UCPrj.imageId = 1;
		UCPrj.currentEmployeesCount = 0;
		UCPrj.insert(callback);
		//console.log(UCPrj);
		
		
	},
	
		buildProject:function(name,tile,baseProject,wBM)
		{
			var self = this;
			self.createNewUCProject(name,baseProject,function(UcProj){
				console.log(self);
			self.uCProj.push(UcProj);
			for(var i=0;i<self.tiles.length;i++)
			{
				if(self.tiles[i].id == tile.id)
				{
					self.tiles[i].underconstructionProject = UcProj;
					console.log("an ha"+UcProj);
					self.tiles[i].upDate();
				}
			}
			self.cash = self.cash - UcProj.baseProject.cost;
			self.update();
			var Act = new Activity();
			Act.target = UcProj;
	        Act.workingBoardMemberID=wBM.id;
	        Act.typeID = 1;
	        Act.targetID = UcProj.id;
	        Act.workingBoardMember=wBM,
	        Act.companyID = self.id;
			Act.startMonth = 0;
	        Act.calculateBuldingActvityDuration();
	        Act.insert(function(s){self.activities.push(Act);console.log(s);});

				
			});
			
	       
		},
	//===============================================
	//recruitment employees 	
	
	RecruitmentProject:function(UCproj,wBM)
	{
		var self = this;
		alert(UCproj.id);
		var Act = new Activity();
	    	Act.target = UCproj;
	        Act.workingBoardMemberID=wBM.id;
	        Act.typeID =4;
	        Act.targetID = UCproj.id;
	        Act.workingBoardMember=wBM,
	        Act.companyID = self.id;
			Act.startMonth = 0;
			Act.endMonth = Act.startMonth + 1;
	        Act.insert(function(s){self.activities.push(Act);console.log(s);});
	}
	
//===============================================================================
	
	
	

});