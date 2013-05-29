var DAL = Class.create({
	
	//constructor
	initialize:function(dbname,ver,size){
		
		this.databaseName="MrPreneur";
		this.version="1.0";
		this.databaseSize=10000000;
		this.database = window.openDatabase(this.databaseName, this.version, this.databaseName, this.databaseSize);
		this.query="";
	},	
	
	//Method that takes the query as a string and a call back function to execute when calling is successfull.
	executeQuery:function(qry,success,error){
		
		  this.query=qry;
		  this.onSuccess=success;
		  this.onError=error;
		  //We must hold the value of this in another variable "self" because in the callback function, the value of "this"
		  //will change according to the context that will call the function. So we use "self" instead of this to refer to
		  //the current object
		  var self=this;
		  this.database.transaction(function(tx){self.exec(tx);});
		  
	},
	executeTransaction:function(qries,success,error)
	{	
		var self=this;
		this.onSuccess=success;
		this.onError=error;
		self.queries=qries;
		this.database.transaction(function(tx){self.execTrans(tx);},function(err){self.onError(err);},function(){self.onSuccess();});
	},
	execTrans:function(tx)
	{
		var self=this;
		for (var i=0;i<this.queries.length;i++)
		{
			tx.executeSql(self.queries[i]);
		}
	},
	//actual execution of query.
	exec:function(tx){
		var self=this;
		tx.executeSql(self.query,[],function(tx,results){self.successCB(tx,results);},function(tx,err){self.errorCB(tx,err);});
	},
	
	//Method to call the error callback function
	errorCB:function(tx, err){
		//check if the onerror callback has been defined
		if(typeof(this.onError) != "undefined")
		{
			this.onError(err);
		}
		else
		{
			console.log(err.message);
			console.log(this.query);
		}
	},
	
	//Method to call the success callback function
	successCB:function(tx,results){
		this.onSuccess(results);
	}
		

});