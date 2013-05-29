var BaseBoardMember = Class.create({
	
	//Constructor Method
	initialize: function(){
	
	},
	
	//Properties:
	id:0,
	name:null,
	skillID:0,
	imageID:0,
	image:null,
	baseSalary:0,
	rating:0,
	skill:null,
	
	
	//Methods:
	
	myMethod:function(){
	
	},
	map:function(result,callback)
		{ 
		
			var self = this;
			var BaseBMAry =  new Array();
			var count=0;
			var mappedSkillsCount=0;
			if(result.rows.length==0)
			{
				callback(new Array());
			}
			else
			{
			
				for(var i=0;i<result.rows.length;i++)
				{
					var BaseBM = new BaseBoardMember();
					
					
					BaseBM.id = result.rows.item(i).Id;
				//	console.log(i);
					BaseBM.name = result.rows.item(i).Name;
					BaseBM.skillID = result.rows.item(i).BaseSkillsId;
					BaseBM.imageID=result.rows.item(i).ImageId
					BaseBMAry.push(BaseBM);
					
					new ImageHelper().getBaseBMImage(result.rows.item(i).Id,function(img){
					
						if(img.length>0)
						{
							for(j=0;j<BaseBMAry.length;j++)
							{
								if (BaseBMAry[j].imageID==img[0].Id)
								{
									BaseBMAry[j].image=img[0];
									
								
								}
							}
						}
					
						new BoardMemberHelper().getBaseSkills(BaseBMAry[mappedSkillsCount].id,function(skl){
						
							if(skl.length>0)
							{
								for(var k=0;k<BaseBMAry.length;k++)
								{
								
									if(BaseBMAry[k].skillID==skl[0].id)
									{
									
										BaseBMAry[k].skill = skl[0];
										
										break;
									}
								}
							}
							count++;
							//console.log(count + "/" + result.rows.length);
							if(count==result.rows.length)
							{
								callback(BaseBMAry);
							}
					
						});
						mappedSkillsCount++;

					});
					
					
				
				
				}
				
			}
		}


});