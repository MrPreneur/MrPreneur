var ProjectHelper = Class.create({	initialize:function()	{		//this.DALHelper=new DAL("MrPreneur","1.0",100000);	},	DALHelper:null,			testMethod:function()	{		var self=this;		new DAL().executeQuery("write query here",function(result){self.successCreate(result);});	},	testSuccess:function(result)	{		//result.rows.item(i).columnname --> where i is row number	},		//Mona's Methods	//Insert - Update -Delete	insertCompletedProject:function(cpro,callback)		 {	      ID = cpro.id;		  Name = cpro.name;		  CompanyID = cpro.companyID;		  Revenue = cpro.revenue;		  Quality = cpro.quality;		  RunningCost = cpro.runningCosts;		  Advertise = cpro.advertising;		  Price = cpro.price;		  baseProID = cpro.baseProjectID;		new DAL().executeQuery("Insert into CompletedProject (Name,CompanyId,Revenue,Quality,RunningCosts,Advertising,Price,BaseProjectId) values ('"+Name+"',"+CompanyID+","+Revenue+","+Quality+","+RunningCost+","+Advertise+","+Price+","+baseProID+")",function(result)					{		  cpro.id=result.insertId;			if(typeof(callback)!='undefined')			{				callback(cpro);			}		});	 },	 	 updateCompletedProject:function(ID,name,companyId,revenue,quality,runningcost,advertising,price,baseproID)	 {			     new DAL().executeQuery("Update CompletedProject set Name='"+name+"',CompanyId="+companyId+",Revenue="+revenue+",Quality="+quality+",RunningCosts="+runningcost+",Advertising="+advertising+",Price="+price+",BaseProjectId="+baseproID+" Where Id="+ID,function(result){});	 },	 removeCompletedProject:function(ID)	 {	     new DAL().executeQuery("Delete from CompletedProject where Id="+ID, function(result){});	 },			 insertUnderconstructionProject:function(ucpro,callback)	 {	     ID = ucpro.id;		 name = ucpro.name;		 companyID = ucpro.companyId;		 currentEmpCount = ucpro.currentEmployeesCount;		 baseProID = ucpro.baseProjectId;		 ImageId = ucpro.imageId;		 new DAL().executeQuery("Insert into UnderConstructionProject (Name,CompanyId,CurrentEmployeesCount,BaseProjectId,ImageId) values ("+name+","+companyID+","+currentEmpCount+","+baseProID+","+ImageId+")",function(result)					{		  ucpro.id=result.insertId;			if(typeof(callback)!='undefined')			{				callback(ucpro);			}		});	 },	 	  updateUnderconstructionProject:function(ID,name,companyID,currentEmpCount,baseProID,ImageId)	  {	     new DAL().executeQuery("Update UnderConstructionProject set Name='"+name+"',CompanyId="+companyID+",CurrentEmployeesCount="+currentEmpCount+",BaseProjectId="+baseProID+",ImageId="+ImageId+" where Id="+ID,function(result){});	  },	  	  removeUnderconstructionProject:function(ID)	  {	    new DAL().executeQuery("Delete from UnderConstructionProject where Id="+ID,function(result){});	  },					//Omnia's Methods		insertUCProject:function(UCPr,callback)//insert new under construction project by  under construction project object 	{		var self = this;		new DAL().executeQuery("insert into UnderConstructionProject (Name,CompanyId,CurrentEmployeesCount,BaseProjectId,ImageId) values ("+'"'+UCPr.name+'"'+","+UCPr.companyId+",0,"+UCPr.baseProjectId+",1)"		,function(result){			UCPr.id = result.insertId;			new ImageHelper().getUCProjectImage(1,				function(img){					UCPr.image = img[0];				}								)						callback(UCPr);		}		,function(err){console.log(err);})	},			getBaseProject:function(BaseId,callback)	{		var self = this;		new DAL().executeQuery("select * from BaseProject as b where b.Id ="+BaseId,function(result){new BaseProject().map(result,callback);},function(err){console.log(err);});	},				//Moamen's Methods		getUnerConstructionProjectById: function (Id,callBack)	{	    new DAL().executeQuery("Select * from UnderConstructionProject where Id=" + Id, function (result) {				        new UnderConstructionProject().map(result, callBack);	    });	},		getCompletedProjectByID: function (Id, callBack)	{	    new DAL().executeQuery("Select * from CompletedProject where Id=" + Id, function (result) {      	        new CompletedProject().map(result, callBack);	    });	}				//Adel's Methods					//Joe's Methods					//Oss's Methods		});