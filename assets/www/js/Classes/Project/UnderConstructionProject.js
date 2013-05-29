var UnderConstructionProject = Class.create({
	
	//Constructor Method
	initialize: function(){
		
	},
	
	//Properties:
	id:0,
	name:null,
	baseProjectId:0,
	baseProject:null,
	companyId:null,
	currentEmployeesCount:0,
	imageId:0,
	image:null, //object of image
	//Methods:
	
	myMethod:function(){
	
	},
	 
	 //Insert - update - delete
	 	 insert:function(callback)
     {
	      new ProjectHelper().insertUnderconstructionProject(this,callback);
     }, 
	 
	 update:function()
	 {
	    new ProjectHelper().updateUnderconstructionProject(this.id, this.name,this.companyId,this.currentEmployeesCount,this.baseProjectId,this.imageId);
	 },
	 
	 remove:function()
	 {
	    new ProjectHelper().removeUnderconstructionProject(this.id);
	 },
	 
	
	
	//Omnia's Methods
		//Omnia's Methods 
	
	insert:function(callback)
	{
		var self = this;
		new ProjectHelper().insertUCProject(self,callback);
	},

	
	
	map:function(result,callback)
	{
		
		var arr = new Array();
		var count =0;
		if(result.rows.length==0)
		{
			callback(new Array());
		}
		else
		{
			for (var i=0;i<result.rows.length;i++)
			{
				var UCProject = new UnderConstructionProject();
				var row = result.rows.item(i);
				UCProject.id = row.Id;
				UCProject.name = row.Name;
				UCProject.baseProjectId = row.BaseProjectId;
				UCProject.companyId = row.CompanyId;
				UCProject.currentEmployeesCount = row.CurrentEmployeesCount;
				UCProject.imageId = row.ImageId;
				arr.push(UCProject);
				
					//console.log(UCProject);
					
				new ProjectHelper().getBaseProject(UCProject.baseProjectId,function(base){
				
				//console.log(base);
				if(base.length>0)
				{
					for(var j=0;j<arr.length;j++)
					{
						
						if(arr[j].baseProjectId == base[0].id)
						{
							arr[j].baseProject = base[0];
							
							break;
						}
					}
				}	
				new ImageHelper().getUCProjectImage(arr[count].imageId,function(img){
				
					if(img.length>0)
					{
						for(var k=0 ; k<arr.length ; k++)
						{
							if(arr[k].imageId == img[0].Id)
							{
							
								arr[k].image = img[0];
								
								break;
							}
						}
					}
					count++;
					if(count == result.rows.length)
					{
						
						callback(arr);
					}

				});
									
				});
			}
		}
	}
	
	

});