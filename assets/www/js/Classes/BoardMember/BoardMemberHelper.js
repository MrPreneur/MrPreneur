var BoardMemberHelper = Class.create({	initialize:function()	{		//this.DALHelper=new DAL("MrPreneur","1.0",100000);	},	DALHelper:null,			testMethod:function()	{		var self=this;		new DAL().executeQuery("write query here",function(result){self.successCreate(result);});	},	testSuccess:function(result)	{		//result.rows.item(i).columnname --> where i is row number	},		//Mona's Methods						//Omnia's Methods					//Moamen's Methods					//Adel's Methods		getBaseSkills:function(id,callback)	{			new DAL().executeQuery("select s.* from Skills as s, BaseBoardMember as b where b.BaseSkillsId=s.Id and b.Id="+id,function(result){new Skills().map(result,callback);},function(err){console.log(err)});	},		getWorkingSkills:function(id,callback)	{		new DAL().executeQuery("select s.* from Skills as s, WorkingBoardMember as b where b.SkillsId=s.Id and b.Id="+id,function(result){new Skills().map(result,callback);});	},		getBaseBoardMember:function(id,callback)	{		new DAL().executeQuery("select * from BaseBoardMember as b where b.Id="+id,function(result){new BaseBoardMember().map(result,callback);});	}			//Joe's Methods					//Oss's Methods		});