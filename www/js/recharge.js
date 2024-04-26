$(document).ready(() => {
    app.database.createDB();
    app.rechargeCard.getPorts();

    $("#updateRecharge").click(function () {
        app.rechargeCard.planDetails();
    });
});


app.rechargeCard = {

    getPorts : () => {
        $.when(app.database.tables.ports.getCompPorts()).done(function(data){ 
            if(data != null){      
                let comPort = data[0].port;
                let baudrate = data[0].baudrate;
                app.rechargeCard.portStatusCheking(comPort,baudrate);            
                // console.log(data); 
            }
        }); 
    },

    portStatusCheking:(com,baudrate)=>{
        // CLOSE PORT METHOD
        $.ajax({
            url: "http://localhost:8686/closePort",
            type: "GET",
            data : {},
            cache: false,
                success: function (res) {
                console.log(res);
            },
        });


        // OPEN AND READ PORT METHOD
        const serialDataInput = document.getElementById("UID");
        const url = `/SPconnection?path=${encodeURIComponent(com)}&baudRate=${baudrate}`;
        const eventSource = new EventSource(url);

        eventSource.onmessage = function(event) {
            let cardId = event.data.trim();
            // console.log(cardId);
        if(/^[a-zA-Z0-9]+$/.test(cardId) && !/^0+$/.test(cardId)){
            // alert(cardId);
            serialDataInput.value = cardId;
            $('#waitingText').css('display', 'none');
            $('#scansuccessTesxt').css('display', 'block');
          
            setInterval(() => {
                $('#scansuccessTesxt').css('display', 'none');
                $('#choosplaneBlock').css('display', 'block');
            }, 1000);
            // CLOSE PORT
            $.ajax({
                url: "http://localhost:8686/closePort",
                type: "GET",
                data : {},
                cache: false,
                    success: function (res) {
                    console.log(res);
                },
            });
        }
        };
    },


   

    choosenPlan: (plane) => {
        for(let i=1; i <= 4; i++){
        $('#P'+i).css('background-color', '#3768c3');
        }

        $('#'+plane).css('background-color', 'green');
        $('#plane').val(plane);
    },

    planDetails: () => {
        let uid = $("#UID").val();
        let plane = $("#plane").val();

        $.when(app.database.tables.recharge.getplanDetails(plane)).done(function(data){ 
             let  total_recharge_points = 0;
             let recharge_bonus = data[0]['recharge_bonus'];
             let recharge_points = data[0]['recharge_points'];
             total_recharge_points = recharge_bonus+recharge_points;
             app.rechargeCard.saveRecharge(total_recharge_points,uid,plane);
          });
          
         // app.database.tables.recharge.saveRecharge(uid, plane);
    },

   saveRecharge: async (total_recharge_points, uid, plane) => {
    try {
        const data = await app.database.tables.recharge.getpointsDetailsbyUID(uid);
        console.log(data);
        
        const totalRecharges = data[0]['totalRecharges'] + 1;
        const totalPoints_balance = data[0]['totalPoints_balance'] + total_recharge_points;
        const totalPoints = data[0]['totalPoints'] + total_recharge_points;
        const planId = plane;

        await app.database.tables.recharge.updateRechargeTbl(totalRecharges, totalPoints_balance, totalPoints, planId, uid);
        await app.database.tables.recharge.saveRecharge(planId, uid);
        
        alert('Recharge Completed Successfully...');
        location.href = "index.html";
    } catch (error) {
        console.error('Error saving recharge:', error);
        // Handle error if needed
    }
}

    
}