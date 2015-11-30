  /*** Data Points for Graph ***/
  var colorData = loadColors();
    if (!colorData) {
      colorData = new Array();
      colorData.push({ image: "images/red.jpg", label: "red", y: 0 });
      colorData.push({ image: "images/orange.jpg", label: "orange", y: 0 });
      colorData.push({ image: "images/yellow.jpg", label: "yellow", y: 0 });
      colorData.push({ image: "images/green.jpg", label: "green", y: 0 });
      colorData.push({ image: "images/blue.jpg", label: "blue", y: 0 });
      colorData.push({ image: "images/indigo.jpg", label: "indigo", y: 0 });
      colorData.push({ image: "images/violet.jpg", label: "violet", y: 0 });
      colorData.push({ image: "images/black.jpg", label: "black", y: 0 });
      colorData.push({ image: "images/white.jpg", label: "white", y: 0 });
      colorData.push({ image: "images/gray.jpg", label: "gray", y: 0 });
    }

  /*** Store Color Data on browser close ***/
  window.addEventListener("beforeunload", storeColors);

  function storeColors(event) {
    localStorage.setItem("colorData", JSON.stringify(colorData));
  }

  function loadColors(event) {
    //var localColors = new Array();
    var localColors = JSON.parse(localStorage.getItem("colorData"));
    if (localColors == null) {
      return null;
    }
    else {
      return localColors;
    }
  }

  /***    Chart Object ***/
  var chart = null;

  function vote(index) {
    colorData[index].y++;
    chart.render();
    newChoices();

  }

  function newChoices() {
    /***Generate two random numbers***/
      var randomNum1 = Math.floor(Math.random() * 10);
      var randomNum2 =  Math.floor(Math.random() * 10);

    /***Check to make sure the two numbers aren't the same***/
       while (randomNum1 == randomNum2) {
         randomNum1 = Math.floor(Math.random() * 10);
         randomNum2 =  Math.floor(Math.random() * 10);
       }
    /***Write the two choices to the page**/
      var choice1 = document.getElementById("choice1");
      choice1.innerHTML= "";
      choice1.innerHTML+= "<div><img src=' "+ colorData[randomNum1].image +" ' ></div>";
      choice1.innerHTML+= "<button>"+colorData[randomNum1].label+"</button>";

      var choice2 = document.getElementById("choice2");
      choice2.innerHTML= "";
      choice2.innerHTML+= "<div><img src=' "+ colorData[randomNum2].image +" ' ></div>";
      choice2.innerHTML+= "<button>"+colorData[randomNum2].label+"</button>";

    /***Add Event Listeners to Buttons***/
      document.getElementsByTagName("button")[0].addEventListener("click", function(){vote(randomNum1)});
      document.getElementsByTagName("button")[1].addEventListener("click", function(){vote(randomNum2)});
  }

  window.onload = function () {
    CanvasJS.addColorSet("multiColor",
      [//colorSet Array

        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet",
        "black",
        "white",
        "gray"
      ]);

    chart = new CanvasJS.Chart("chartContainer", {
      colorSet: "multiColor",

      backgroundColor: "#F5DEB3",

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



