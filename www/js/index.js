$(document).ready(() => {
  app.database.createDB();

  app.index.loadPlans(); 
  app.index.loadPorts(); 

  $("#newCardPage").click(function () {
    location.href="newcard.html";
  });

});


app.index = {
    loadPlans: () => {
      $.when(app.database.tables.task.loadplansData()).done(function(data){ 
        if(data == null){      
            $.when(app.database.tables.task.savePlans()).done(function(){}); 
        }
      });
    },

    loadPorts: () => {
      $.when(app.database.tables.ports.getCompPorts()).done(function(data){ 
        if(data == null){      
            $.when(app.database.tables.ports.insertPorts()).done(function(){}); 
        }
      });
    }
};
