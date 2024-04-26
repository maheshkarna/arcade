app.database.tables.newCard = {

    saveRegData: (username,contact,email,UID) => {
        return $.Deferred(function (deferred) {
          let sql =`INSERT INTO tbl_register (candName,contactNo,email,UID,createdBy) VALUES 
          ('${username}', '${contact}', '${email}','${UID}',1)`;
          var params = [];
            app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("task saved successfully.");
              deferred.resolve();
            },
            function () {
             
              app.log("task save error.");
              deferred.reject();
            }
          );
        }).promise();
      },

      savePointsTbl: (UID,totalCreditPoints) => {
        return $.Deferred(function (deferred) {
          let sql =`INSERT INTO tbl_points (UID,totalRecharges,totalPoints,totalGames,totalPoints_spent,totalPoints_balance) VALUES 
          ('${UID}',1, '${totalCreditPoints}',0,0,'${totalCreditPoints}')`;
          var params = [];
            app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("task saved successfully.");
              deferred.resolve();
            },
            function () {
             
              app.log("task save error.");
              deferred.reject();
            }
          );
        }).promise();
      },

      rechargeDetails: (UID,planType) => {
        return $.Deferred(function (deferred) {
          let sql =`INSERT INTO tbl_recharge (UID,planId,rechargeType) VALUES 
          ('${UID}','${planType}','New Card')`;
            var params = [];
            app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
              app.log("task saved successfully.");
              deferred.resolve();
            },
            function () {
             
              app.log("task save error.");
              deferred.reject();
            }
          );
        }).promise();
      },

      

      
      checking_UID: function (cardID) {
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM tbl_register where UID = '"+cardID+"'";
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

      loadPlansData: function () {
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

      
      checkUID: function (uid) {
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM tbl_register where UID = '"+uid+"'";
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
      }
      
}