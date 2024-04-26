app.database.tables.cardDetail = {

    loadcardDetailData: function () {
    return $.Deferred(function (deferred) {
        var sql = "SELECT * FROM tbl_register ";
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

    getcardData: function (id,uid) {
        return $.Deferred(function (deferred) {
            var sql = `SELECT * FROM tbl_register as reg left join tbl_points as pts on reg.UID = pts.UID where pts.UID = '${uid}'`;
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