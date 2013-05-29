var WorkingBoardMember = Class.create({
	
	//Constructor Method
	initialize: function(){
		
	},
	
	//Properties:
	id:0,
	companyID:null,
	skillID:0,
	hiringMonth:0,
	satisfaction:0, //percentage
	salary:0,
	skill:null,
	baseBoardMemberID:0,
	baseBoardMember:null,
	//Methods:
	
	myMethod:function(){
	
	},
	
	//Mona Methods .. 
	calcNegotiationDuration: function()
	{
		var dur=0;
	 if (this.Skill.negotiation > 5)		 
		   {
		      dur=1;
		   }
		   
		   else 
		   {
		      dur=0;
		   }
		   
		   return dur;
	},
	

	map:function(result,callback)
	{
		
			var self = this;
			var WorkingBMAry =  new Array();
			var count=0;
			var mappedWbmCount=0;
			if(result.rows.length==0)
			{
				callback(new Array());
			}
			else
			{
				
				
				for(var i=0;i<result.rows.length;i++)
				{
					var WorkingBM = new WorkingBoardMember();
					WorkingBM.id = result.rows.item(i).Id;
					WorkingBM.companyID = result.rows.item(i).CompanyID;
					WorkingBM.hiringMonth = result.rows.item(i).HiringMonth ;
					WorkingBM.satisfaction = result.rows.item(i).Satisfaction;
					WorkingBM.salary = result.rows.item(i).Salary ;
					WorkingBM.skillID = result.rows.item(i).SkillsId;
					WorkingBM.baseBoardMemberID = result.rows.item(i).BaseBoardMemberId;
					
					WorkingBMAry.push(WorkingBM);
					
					
					new BoardMemberHelper().getWorkingSkills(WorkingBM.id,function(skl){
						
						if(skl.length>0)
						{
							for(var k=0;k<WorkingBMAry.length;k++)
							{
							
								if(WorkingBMAry[k].skillID==skl[0].id)
								{
									WorkingBMAry[k].skill = skl[0];
								}
							}
						}
						
					new BoardMemberHelper().getBaseBoardMember(WorkingBMAry[mappedWbmCount].baseBoardMemberID,function(base){
					
						if(base.length>0)
						{
							for (var j=0;j<WorkingBMAry.length;j++)
							{
								if(WorkingBMAry[j].baseBoardMemberID==base[0].id)
								{
									WorkingBMAry[j].baseBoardMember = base[0];
									
									
									break;
								}
							
							}
						}	
						count++;
						
						if(count==result.rows.length)
						{
							
							callback(WorkingBMAry);
						}
						
						
					});
						//console.log(count + "/" + result.rows.length);
						mappedWbmCount++;
						
				
					});
					
				}
		
			}
	},
	
	////////////////////////////////
	//Adel Methods
	
	calculateMarketingImpact:function(baseProject)
	{
		var impact=0;
		//TODO: calculate impact
		
		return imapct;
	}
	
	
	
	////////////////////////////////

	

});