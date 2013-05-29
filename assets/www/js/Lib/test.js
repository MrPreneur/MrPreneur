var test = Class.create({

	initialize:function()
	{
		this.name="Omnia"
	},

	name:"",
	
	testMethod:function(ref){
		this.callBack=ref;
	},
	
	testExec:function()
	{
		this.testExec2();
	},
	
	testOver:function()
	{
		console.log(this);
		alert(this.name);
	},
	
	
	testExec2:function()
	{
		this.callBack();
	}
	

});