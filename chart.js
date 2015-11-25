
  /***    Data Points ***/
  var colorData = new Array();
  colorData.push({ image: "images/red.jpg", label: "red", y: 18 });
  colorData.push({ image: "images/orange.jpg", label: "orange", y: 29 });
  colorData.push({ image: "images/yellow.jpg", label: "yellow", y: 40 });
  colorData.push({ image: "images/green.jpg", label: "green", y: 34 });
  colorData.push({ image: "images/blue.jpg", label: "blue", y: 24 });
  colorData.push({ image: "images/indigo.jpg", label: "indigo", y: 24 });
  colorData.push({ image: "images/violet.jpg", label: "violet", y: 24 });
  colorData.push({ image: "images/black.jpg", label: "black", y: 24 });
  colorData.push({ image: "images/white.jpg", label: "white", y: 24 });
  colorData.push({ image: "images/gray.jpg", label: "gray", y: 24 });
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
      choice1.innerHTML= "";
      choice1.innerHTML+= "<div><img src=' "+ colorData[randomNum1].image +" ' ></div>";
      choice1.innerHTML+= "<button onclick='vote("+randomNum1+")'>"+colorData[randomNum1].label+"</button>";

      var choice2 = document.getElementById("choice2");
      choice2.innerHTML= "";
      choice2.innerHTML+= "<div><img src=' "+ colorData[randomNum2].image +" ' ></div>";
      choice2.innerHTML+= "<button onclick='vote("+randomNum2+")'>"+colorData[randomNum2].label+"</button>";
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



