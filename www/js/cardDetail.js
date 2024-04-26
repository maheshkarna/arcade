$(document).ready(() => {
    app.database.createDB();
  
    app.cardDetails.loadcardDetails(); 
    // $("#newCardPage").click(function () {
    //   location.href="newcard.html";
    // });
  
  });
  
  
  app.cardDetails = {
      loadcardDetails: () => {
              $.when(app.database.tables.cardDetail.loadcardDetailData()).done(function(data){
                console.log(data);

                let tableData = "";
                for (let i = 0; i < data.length; i++) {
                    tableData +=`<tr>
                    <th scope="row">${i+1}</th>
                    <td >${data[i]['UID']}</td>
                    <td id="candName${i}" >${data[i]['candName'] == "" ? "-" : data[i]['candName'] }</td>
                    <td id="contactNo${i}" >${data[i]['contactNo'] == "" ? "-" : data[i]['contactNo'] }</td>
                    <td id="email${i}" >${data[i]['email'] == ""? "-":data[i]['email']}</td>
                    <td>
                    <input type='hidden' class="form-control" id='hidenId${i}' value='${data[i]['id']}' >
                    <button onclick="app.cardDetails.view(${data[i]['id']},'${data[i]['UID']}')" id="btnupdate${i}"  class="btn btn-primary">view</button>
                    </td>
                  </tr>`; 
                }
                 $('#plansBody').append(tableData);
              }); 
        },

        view : (id,uid) => {

            $.when(app.database.tables.cardDetail.getcardData(id,uid)).done(function(data){
              console.log(data);
              $('#cardDetailsblock').css('display','none');
              $('#viewBlock').css('display','block');
             
              $('#uid').val(data[0]['UID'] !== "" ?data[0]['UID'] : "-");
              $('#name').val(data[0]['candName'] !=="" ? data[0]['candName'] : "-" );
              $('#contact').val(data[0]['contactNo'] !=="" ? data[0]['contactNo'] : "-" );
              $('#email').val(data[0]['email'] !==""? data[0]['email'] : "-" );
              $('#rechargedCredits').val(data[0]['totalRecharges'] !== ""? data[0]['totalRecharges']: "-");
              $('#balnceCredits').val(data[0]['totalPoints_balance'] !=="" ? data[0]['totalPoints_balance'] : "-");
              $('#totalPlayedGames').val(data[0]['totalGames'] !== "" ? data[0]['totalGames'] : "-");
              $('#spentCredits').val(data[0]['totalPoints_spent'] !== "" ? data[0]['totalPoints_spent']: "-");
               

            });


        }
     

    

     

  };
  