app.database.tables.recharge = {


    getplanDetails: function (planId) {
        return $.Deferred(function (deferred) {
          var sql = "SELECT * FROM tbl_plannames where planId = '"+planId+"'";
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

      getpointsDetailsbyUID: function (uid) {
        return $.Deferred(function (deferred) {
          var sql = "SELECT * from tbl_recharge as rch left join tbl_points points on rch.UID = points.UID  where rch.UID ='"+uid+"'";
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


    updateRechargeTbl: (totalRecharges,totalPoints_balance,totalPoints,planId,uid) => {
        return $.Deferred(function (deferred) {
          let sql =`update tbl_points set totalRecharges=${totalRecharges},totalPoints = ${totalPoints},totalPoints_balance =${totalPoints_balance}  where UID = '${uid}'`;
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

      saveRecharge: (planId,uid) => {
        return $.Deferred(function (deferred) {
          let sql =`INSERT INTO tbl_recharge (UID,planId,rechargeType) VALUES 
          ('${uid}','${planId}','Recharge')`;
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
      }
    
    }