app.database.tables.task = {
  
  loadplansData: function () {
    return $.Deferred(function (deferred) {
      var sql = "SELECT * FROM tbl_plannames ";
      var params = [];
      app.database.commands.executeReader(
        sql,
        params,
        function (ex, data) {
          app.log("data select successful");
          if (data.rows.length > 0) {
            deferred.resolve(data.rows);
          } else {
            deferred.resolve(null);
          }
        },
        function () {
          app.log("data select failed");
          deferred.reject();
        }
      );
    }).promise();
  },

  savePlans: () => {
    return $.Deferred(function (deferred) {
      let sql = `INSERT INTO tbl_plannames (planId, recharge_points, new_card_bonus, recharge_bonus) VALUES 
                 ('P1', 500, 50, 10),
                 ('P2', 1000, 75, 15),
                 ('P3', 1500, 100, 20),
                 ('P4', 2000, 125, 25)`;
                 
      var params = [];
      app.database.commands.executeNonQuery(
        sql,
        params,
        function () {
          app.log("Plans saved successfully.");
          deferred.resolve();
        },
        function () {
          app.log("Error saving plans.");
          deferred.reject();
        }
      );
    }).promise();
  },
  

  deleteTaskById: function (id) {
    return $.Deferred(function (deferred) {
      let sql = "DELETE FROM todolist WHERE ID = ?";
      let params = [id];
      app.database.commands.executeNonQuery(
        sql,
        params,
        function () {
          app.log("task have been successfully deleted");
          deferred.resolve();
        },
        function () {
          app.log("task have NOT been deleted");
          deferred.reject();
        }
      );
    }).promise();
  },
};
