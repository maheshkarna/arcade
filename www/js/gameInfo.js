$(document).ready(() => {
    app.database.createDB();
    app.gameInfo.loadgameInfo(); 
    $('#addGame').click(function(){
      app.gameInfo.addgame()
    });
    $('#backBtn').click(function(){
      location.reload();
    });
  });
  
  app.gameInfo = {

      loadgameInfo: () => {
          $.when(app.database.tables.gameInfo.loadgameInfoData()).done(function(data){
            console.log(data);
            let tableData = "";
            for (let i = 0; i < data.length; i++) {
                tableData +=`<tr>
                <th scope="row">${i+1}</th>
                <td>${data[i]['gameName']}</td>
                <td style="text-align:center;" id="rch_bonus${i}" >${data[i]['gameId']}</td>
                <td style="text-align:center;" id="newcard_bonus${i}" >${data[i]['cost']}</td>
                <td style="text-align:center;" id="newcard_bonus${i}" >${data[i]['gamePeriod']}</td>
                <td style="text-align:center;" id="newcard_bonus${i}" >${data[i]['GameType']}</td>
                <td>
                <input type='hidden' class="form-control" id='hidenId${i}' value='${data[i]['id']}' >
                <button onclick="app.gameInfo.changeStatus(${data[i].status},'${data[i].gameId}')" id="changeStatus" class="btn btn-${data[i].status == 1 ?"success":"danger" }">${data[i].status == 1 ?"Active":"Inactive" } </button> 
                </td>
                <td>
                <button onclick="app.gameInfo.editGameId('${data[i]['gameId']}')" id="btnEdit${i}" class="btn btn-primary">Edit</button> 
                </td>
              </tr>`; 
            }
            $('#GameInfoBody').append(tableData);
          }); 
      },

      changeStatus :async (status,gid)=>{;
        let st = 0;
          if(status == 1){
            st = 0;
          }else{
            st = 1;
          }
        await app.database.tables.gameInfo.changeStatus(st,gid);
        location.reload();
      },

      saveGameInfo: async () => {
        // alert();
        let gameName   = $('#gameName').val();
        let gameId     = $('#gameId').val();
        let gameCost   = $('#gameCost').val(); // Corrected variable name
        let gameStatus = $('#status').val(); // Corrected variable name
        let typeOfGame  = $('#typeOfGame').val();
        let time_period  = $('#time_period').val() * 60 ;
        try {
            await app.database.tables.gameInfo.saveGameInfo(gameName, gameId, gameCost,gameStatus,typeOfGame,time_period);
            alert('Game Data Saved Successfully');
            location.href = "gameInfo.html"; // Uncomment this line if you want to redirect after the update
        } catch (error) {
            console.error('Error updating plane:', error);
            // Handle error if needed
        }
      },

      addgame: async () => {
        try {
          $('#addGameBlok').css('display', 'block');
          $('#gameViewTable').css('display', 'none');
          $.when(app.database.tables.gameInfo.getMaxGID()).done(function(data){
           console.log(data);
           if(data.GID != null || data[0].GID != null){
              // $('#gameId').val(data[0].GID);
              var maxGameId = parseInt(data[0].GID.replace('G', '')) + 1; 
              console.log(maxGameId);
              $('#gameId').val('G' + maxGameId);
           }else{
            $('#gameId').val('G1');
           }
          });
        } catch (error) {
            console.error('Error updating plane:', error);
            // Handle error if needed
        }
      },


      editGameId: async(GID) => {
        $('#addGameBlok').css('display', 'block');
            $('#gameViewTable').css('display', 'none');
            $('#updateBtn').css('display', 'block');
            $('#saveBtn').css('display', 'none');
            $('#cardTitle').text('Edit Game Details');

        $.when(app.database.tables.gameInfo.getGameDataById(GID)).done(function(data){
          // console.log(data);
          if(data != null || data != ""){
            $('#gameName').val(data[0].gameName);
            $('#gameId').val(data[0].gameId);
            $('#gameCost').val(data[0].cost); 
            $('#status').val(data[0].status); 
            $('#typeOfGame').val(data[0].GameType);
            $('#time_period').val(data[0].gamePeriod / 60000);
          }
        })
      },

      updateGameInfo: async() => {
        let gameName   = $('#gameName').val();
        let gameId     = $('#gameId').val();
        let gameCost   = $('#gameCost').val(); // Corrected variable name
        let gameStatus = $('#status').val(); // Corrected variable name
        let typeOfGame  = $('#typeOfGame').val();
        let time_period  = $('#time_period').val() * 60;
        try {
            await app.database.tables.gameInfo.updateGameInfo(gameName, gameId, gameCost,gameStatus,typeOfGame,time_period);
            alert('Game Data Saved Successfully');
            location.href = "gameInfo.html"; // Uncomment this line if you want to redirect after the update
        } catch (error) {
            console.error('Error updating plane:', error);
            // Handle error if needed
        }
      }


      

  };
  