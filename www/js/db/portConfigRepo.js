app.database.tables.ports = {

    savePortsConfig: (COM,baudRate) => {
        
        return $.Deferred(function (deferred) {
            let sql =`update tbl_ports set port= '${COM}',baudrate= ${baudRate} where id = 1`;
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

    getCompPorts: function () {
        return $.Deferred(function (deferred) {
            var sql = "SELECT * FROM tbl_ports ";
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

    insertPorts: () => {
        return $.Deferred(function (deferred) {
            let sql =`insert into tbl_ports (port,baudrate) values('COM7',9600)`;
            var params = [];
            app.database.commands.executeNonQuery(
            sql,
            params,
            function () {
                app.log("Port Details saved successfully.");
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