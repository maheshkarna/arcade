$(document).ready(() => {
    app.database.createDB();
    app.ports.getComports(); 
  });
  
  app.ports = {
      getComports: () => {
    
            // app.serialHelper.readFromSerialPort();
            $.ajax({
              url: "/readPort",
              type: "GET",
              cache: false,
              //   dataType: "json", // added data type
              success: function (res) {
               //alert("test")
                //  console.log(res);
                let listOfPorts = "";
                for(let i = 0; i < res.length; i++){
                    listOfPorts +=`<option value='${res[i].path}'> ${res[i].path}</option>`;
                }
                // console.log(listOfPorts);
                $('#comPortSelect').html(listOfPorts);
              },
            });
      },


      savePorts: () => {
        let COMport = $('#comPortSelect').val();
        let baudRate = $('#baudRateSelect').val();
        app.database.tables.ports.savePortsConfig(COMport,baudRate)
      }
  };
  