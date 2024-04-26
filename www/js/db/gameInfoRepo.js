app.database.tables.gameInfo = {

    loadgameInfoData: function () {
    return $.Deferred(function (deferred) {
        var sql = "SELECT * FROM tbl_gameinfo ORDER BY ID DESC";
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


    getGameDataById: function (GID) {
        return $.Deferred(function (deferred) {
            var sql = "SELECT * FROM tbl_gameinfo where gameId ='"+GID+"'";
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


    getMaxGID: function () {
        return $.Deferred(function (deferred) {
            var sql = "SELECT max(gameId) as GID FROM tbl_gameinfo";
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

        updateGameInfo: (gameName, gameId, gameCost,gameStatus,typeOfGame,time_period) => {
            return $.Deferred(function (deferred) {
                let sql =`update tbl_gameinfo set gameName = '${gameName}',cost = ${gameCost},status = '${gameStatus}',GameType='${typeOfGame}',gamePeriod = '${time_period}' where gameId = '${gameId}'`;
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
        
        
        changeStatus: (ststus,gid) => {
            return $.Deferred(function (deferred) {
                let sql =`update tbl_gameinfo set status = ${ststus} where gameId = '${gid}'`;
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

        saveGameInfo: (gameName, gameId, gameCost,gameStatus,typeOfGame,time_period) => {
        return $.Deferred(function (deferred) {
            let sql =`insert into tbl_gameinfo(gameName,gameId,cost,status,createdBy,GameType,gamePeriod) values('${gameName}','${gameId}',${gameCost},${gameStatus},'Admin','${typeOfGame}',${time_period})`;
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