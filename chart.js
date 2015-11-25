
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

  function vote(index) {
    colorData[index].y++;
    chart.render();
    newChoices();

  }

  function newChoices() {
    /***Generate two random numbers***/
      var randomNum1 = Math.floor((Math.random() * 10) + 1);
      var randomNum2 =  Math.floor((Math.random() * 10) + 1);

    /***Check to make sure the two numbers aren't the same***/
      while (randomNum1 == randomNum2) {
        randomNum1 = Math.floor((Math.random() * 10) + 1);
        randomNum2 =  Math.floor((Math.random() * 10) + 1);
      }
    /***Write the two choices to the page**/
      var choice1 = document.getElementById("choice1");
      choice1.innerHTML = "<p>" + colorData[randomNum1].label + "</p>";
      choice1.innerHTML+= "<button onclick='vote("+randomNum1+")'>Pick me</button>";

      var choice2 = document.getElementById("choice2");
      choice2.innerHTML = "<p>" + colorData[randomNum2].label + "</p>";
      choice2.innerHTML+= "<button onclick='vote("+randomNum2+")'>Pick me</button>";
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



