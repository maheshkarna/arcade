$(document).ready(() => {
    app.database.createDB();
    app.plans.loadPlans(); 
  });
  
  
  app.plans = {
      loadPlans: () => {
              $.when(app.database.tables.plans.loadplansData()).done(function(data){
                console.log(data);
                let tableData = "";
                for (let i = 0; i < data.length; i++) {
                    tableData +=`<tr>
                    <th scope="row">${i+1}</th>
                    <td style="text-align:center;" >
                    ₹ ${data[i]['recharge_points']}</td>
                    <td style="text-align:center;" id="rch_bonus${i}" >${data[i]['recharge_bonus']}</td>
                    <td style="text-align:center;" id="newcard_bonus${i}" >${data[i]['new_card_bonus']}</td>
                    <td>
                    <input type='hidden' class="form-control" id='hidenId${i}' value='${data[i]['id']}' >
                    <button onclick="app.plans.editMode(${i},${data[i]['new_card_bonus']},${data[i]['recharge_bonus']})" id="btnEdit${i}" class="btn btn-primary">edit</button> 
                    <button onclick="app.plans.updateVal(${i})" id="btnupdate${i}" style="display :none;" class="btn btn-primary">Update</button>
                    </td>
                  </tr>`; 
                }
                 $('#plansBody').append(tableData);
              }); 
      },

      editMode: (i,newCard,rchCard)=> {
        $('#btnupdate'+i).css('display' ,'block');
        $('#btnEdit'+i).css('display' ,'none');
        let newCardInput = `<input type='number' class="form-control" id='newCardId${i}' value='${newCard}' >`;
        let rchCardInput = `<input type='number' class="form-control" id='rchCardId${i}'  value='${rchCard}' >`;
        $('#newcard_bonus'+i).html(newCardInput);
        $('#rch_bonus'+i).html(rchCardInput);
      },

      updateVal: async (x) => {
        let newCardVal = $('#newCardId' + x).val();
        let rchCardVal = $('#rchCardId' + x).val();
        let hiddenId = $('#hidenId' + x).val(); // Corrected variable name
        // alert(hiddenId);
    
        try {
            await app.database.tables.plans.updatePlane(newCardVal, rchCardVal, hiddenId);
            alert('Plane Updated Successfully');
            location.href = "plans.html"; // Uncomment this line if you want to redirect after the update
        } catch (error) {
            console.error('Error updating plane:', error);
            // Handle error if needed
        }
    }
    
     

  };
  