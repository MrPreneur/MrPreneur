var Skills = Class.create({
	
	//Constructor Method
	initialize: function(){
	
	},
	
	//Properties:
	
	//skills levels and experience
	id:0,
	construction:0,
	constructionExp:0,
	
	recruitment:0,
	recruitmentExp:0,
	
	negotiation:0,
	negotiationExp:0,
	
	marketing:0,
	marketingExp:0,
	
	//Methods:
	
	myMethod:function(){
	
	},
	// Insert - Update -Delete 
	insert:function(callback)
    {
	   new SkillsHelper().insert(this,callback);
    },	
	
	update:function()
	{
	   new SkillsHelper().update(this.id, this.construction, this.negotiation, this.recruitment, this.marketing, this.constructionExp, this.negotiationExp, this.recruitmentExp, this.marketingExp);
	},
	
	remove:function()
	{
	  new SkillsHelper().remove(this.id);
	},
	
	
	map : function(result,callback){
	
		var arr = new Array();
		if(result.rows.length==0)
		{
			callback(new Array());
		}
		else
		{
			for(var i=0;i<result.rows.length;i++)
			{
				var row = result.rows.item(i);
				var sk = new Skills();
				sk.id=row.Id;
				sk.construction = row.Construction;
				sk.negotiation = row.Negotiation;
				sk.recruitment = row.Recruitment;
				sk.marketing = row.Marketing;
				sk.constructionExp = row.ConstructionExp;
				sk.negotiationExp = row.NegotiationExp;
				sk.recruitmentExp = row.RecruitmentExp;
				sk.marketingExp = row.MarketingExp;
				
				arr.push(sk);
				
			}
			
			callback(arr);
		}
	}

});