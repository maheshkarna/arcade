app.database.tables.plans = {

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


        
    updatePlane: (newCardVal,rchCardVal,hidenId) => {
        
        return $.Deferred(function (deferred) {
            let sql =`update tbl_plannames set new_card_bonus= ${newCardVal},recharge_bonus= ${rchCardVal} where id = ${hidenId}`;
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