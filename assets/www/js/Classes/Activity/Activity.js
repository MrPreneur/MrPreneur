var Activity = Class.create({
	
	//Constructor Method
	initialize: function(){
		this.helper=new ActivityHelper();
	},
	
	//Properties:
	id:0,
	workingBoardMemberID:0,
	typeID:0,
	targetID:0,
	startMonth:0,
	endMonth:0,
	workingBoardMember:null,
	target:null,
	companyID:0,
	//Methods:
	
	myMethod:function(){
	
	},
	
//Omnia's Methods
//----------------
	calculateBuldingActvityDuration:function()
	{
	   var self = this;
	   var duration = 0;
	   var skillLevel = self.workingBoardMember.skill.construction;
	   var Max = self.target.baseProject.maxBuildingTime;
	   var Min = self.target.baseProject.minBuildingTime;
	   var x = ((Max-Min)/10)*skillLevel;
	   duration = Max - x;
	   duration = Math.round(duration);
	   self.endMonth = duration - self.startMonth; 	
	},


//-----------------------------------------------------------------

insert:function(callback)
	{
		new ActivityHelper().insert(this,callback);
	},
	
	
	update:function()
	{
	   new ActivityHelper().update(this.id,this.typeID,this.companyID,this.targetID,this.workingBoardMemberID,this.startMonth,this.endMonth);
	},
	
	remove:function()
	{
	   new ActivityHelper().remove(this.id);
	},
	
	map:function(result,callback)
	{
		var ActAry = new Array();
		var count=0;
		if(result.rows.length==0)
		{
			callback(new Array());
		}
		else
		{
			for(var i=0;i<result.rows.length;i++)
			{
				var act = new Activity();
				act.id = result.rows.item(i).Id;
				
				act.workingBoardMemberID = result.rows.item(i).WorkingBoardMemberId;
				act.typeID = result.rows.item(i).TypeId ;
				act.targetID= result.rows.item(i).TargetId ;
				act.startMonth = result.rows.item(i).StartMonth ;
				act.endMonth = result.rows.item(i).EndMonth;
				act.companyID=result.rows.item(i).CompanyId;
				ActAry.push(act);
				
				this.helper.getWorkingBoardMembersByActId(ActAry[i].id,function(bm){
					
					
					if(bm.length>0)
					{					
						for(var j=0;j<ActAry.length;j++)
						{
							
							if(ActAry[j].workingBoardMemberID==bm[0].id)
							{
								ActAry[j].workingBoardMember=bm[0];
								break;
							}
						}
					}
					// 1 -> construction
					// 2 -> land negotiation
					// 3 -> Project Negotiation
					// 4 -> Recruitment
					// 5 -> Marketing
					
					if(ActAry[j].typeID==1)
					{
						
						new ProjectHelper().getUnerConstructionProjectById(ActAry[j].targetID,function(uc){
						
							if(uc.length>0)
							{
								for(var k=0;k<ActAry.length;k++)
								{	
									if(ActAry[k].targetID==uc[0].id && ActAry[k].typeID==1)
									{
								
										ActAry[k].target=uc[0];
										
									
										break;
									}
								}
							}
							count++;
							if(count==result.rows.length)
							{
								
								callback(ActAry);
							}
						
						});
					}
					else if (ActAry[j].typeID==2)
					{
						new TileHelper().getTileById(ActAry[count].targetID,function(til){
							if(til.length>0)
							{
								for(var k=0;k<ActAry.length;k++)
								{
									if(ActAry[k].targetID==til[0].id && ActAry[k].typeID==2)
									{
										ActAry[k].target=til[0];
										count++;
										break;
									}
								}
							}
							if(count==result.rows.length)
							{
								callback(ActAry);
							}
						
						});
					}
					else if (ActAry[j].typeID==3)
					{
					
						new ProjectHelper().getCompletedProjectByID(ActAry[j].targetID,function(cp){
						
							if(cp.length>0)
							{
								for(var k=0;k<ActAry.length;k++)
								{
									if(ActAry[k].targetID==cp[0].id && ActAry[k].typeID==3)
									{
										ActAry[k].target=cp[0];
										count++;
										break;
									}
								}
							}
							
							if(count==result.rows.length)
							{
								callback(ActAry);
							}
						
						});
					
					}
					else if (ActAry[j].typeID==4)
					{
						new ProjectHelper().getUnerConstructionProjectById(ActAry[count].targetID,function(uc){
						
							if(uc.length>0)
							{
								for(var k=0;k<ActAry.length;k++)
								{
									if(ActAry[k].targetID==uc[0].id && ActAry[k].typeID==4)
									{
										ActAry[k].target=uc[0];
										count++;
										break;
									}
								}
							}
							if(count==result.rows.length)
							{
								callback(ActAry);
							}
						
						});
					}
					else if (ActAry[j].typeID==5)
					{
						new ProjectHelper().getCompletedProjectByID(ActAry[count].targetID,function(cp){
							if(cp.length>0)
							{
								for(var k=0;k<ActAry.length;k++)
								{
									if(ActAry[k].targetID==cp[0].id && ActAry[k].typeID==5)
									{
										ActAry[k].target=cp[0];
										count++;
										break;
									}
								}
							}
							if(count==result.rows.length)
							{
								callback(ActAry);
							}
						
						});
					}
				});
				
			}
		
		}	
	}

});