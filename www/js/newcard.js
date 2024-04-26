$(document).ready(() => {
    app.database.createDB();
    app.newCard.getPorts();

    $("#saveRegistartionData").click(function () {
        app.newCard.saveRegData();
    });

    $("#cardDetailsBlockOpen").click(function () {
        $('#scansuccessTesxt').css('display', 'none');
        $('#cardDetailsblock').css('display', 'block');
    });
});


app.newCard = {

    getPorts : () => {
        $.when(app.database.tables.ports.getCompPorts()).done(function(data){ 
            if(data != null){      
                let comPort = data[0].port;
                let baudrate = data[0].baudrate;
                app.newCard.portStatusCheking(comPort,baudrate);  
            }
        }); 
    },

    portStatusCheking: async (com,baudrate)=>{
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
        // const eventSource = new EventSource("/SPconnection");
        eventSource.onmessage = function(event) {
            let cardId = event.data.trim();
            // console.log(cardId);
        if(/^[a-zA-Z0-9]+$/.test(cardId) && !/^0+$/.test(cardId)){
            // alert(cardId);
            serialDataInput.value = cardId;
            $.when(app.database.tables.newCard.checkUID(cardId)).done(function(uiddata){
                if(uiddata != null){
                if(uiddata.length > 0){
                        // CLOSE PORT
                        alert("Card is already Existed");
                }
                }else{
                
                $('#waitingText').css('display', 'none');
                $('#scansuccessTesxt').css('display', 'block');
                $("#name").focus();

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
            });
           

           
          
        }
        // console.log(event);
        };
    },



    saveRegData: async () => {
        let username = $('#name').val();
        let contact = $('#contact').val();
        let email = $('#email').val();
        let UID = $('#UID').val();
        let planType = $('#plan').val();
        let recharge_points = 0;
        let bonusCredits = 0;
        let totalCreditPoints = 0;
    
        try {
            if (UID == "") {
                alert("please Select Recharge Plan");
                return;
            }
            
            let uidData = await app.database.tables.newCard.checking_UID(UID);
            if (uidData != null && uidData.length > 0) {
                alert("This Card Already Exists");
                return;
            }
    
            let plansData = await app.database.tables.newCard.loadPlansData();
            if (plansData != null) {
                for (let i = 0; i < plansData.length; i++) {
                    if (planType == plansData[i]['planId']) {
                        recharge_points = plansData[i]['recharge_points'];
                        bonusCredits = plansData[i]['new_card_bonus'];
                        totalCreditPoints = recharge_points + bonusCredits;
                        await app.database.tables.newCard.saveRegData(username, contact, email, UID);
                        await app.database.tables.newCard.savePointsTbl(UID, totalCreditPoints);
                        await app.database.tables.newCard.rechargeDetails(UID, planType);
    
                        alert('Registered Successfully');
                        location.reload();
                        return; // Exiting the function after successful registration
                    }
                }
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle errors appropriately
        }
    },
    


    choosenPlan: (plan) => {
        $('#P1').css('background-color', '#3768c3');
        $('#P2').css('background-color', '#224b95');
        $('#P3').css('background-color', '#123577');
        $('#P4').css('background-color', '#031c4a');
        $('#'+plan).css('background-color', 'green');
        $('#plan').val(plan);
    }

};
    