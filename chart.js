
  /***    Data Points ***/
  var colorData = new Array();
  colorData.push({ label: "red", y: 18 });
  colorData.push({ label: "orange", y: 29 });
  colorData.push({ label: "yellow", y: 40 });
  colorData.push({ label: "green", y: 34 });
  colorData.push({ label: "blue", y: 24 });
  colorData.push({ label: "indigo", y: 24 });
  colorData.push({ label: "violet", y: 24 });
  colorData.push({ label: "black", y: 24 });
  colorData.push({ label: "white", y: 24 });
  colorData.push({ label: "gray", y: 24 });
  /***    Chart Object ***/
  var chart = null;

  function changeRed() {
    colorData[2].y++;
    chart.render();
  }

  window.onload = function () {

    chart = new CanvasJS.Chart("chartContainer", {

      title: {text: "Totals"},
      data: [//array of dataSeries
        /*** Change type "column" to "bar", "area", "line" or "pie"***/
              {
               type: "column",
               dataPoints: colorData
              }
            ]
     });

    chart.render();
  }



