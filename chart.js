
  /***    Data Points ***/
  var colorData = new Array();
  var red = { image: "images/red.jpg", label: "red", x: 1, y: 18 };
  var orange = { image: "images/orange.jpg", label: "orange", x: 2, y: 29 };
  var yellow = { image: "images/yellow.jpg", label: "yellow", x: 3, y: 40 };
  var green = { image: "images/green.jpg", label: "green", x: 4, y: 34 };
  var blue = { image: "images/blue.jpg", label: "blue", x: 5, y: 24 };
  var indigo = { image: "images/indigo.jpg", label: "indigo", x: 6, y: 24 };
  var violet = { image: "images/violet.jpg", label: "violet", x: 7, y: 24 };
  var black = { image: "images/black.jpg", label: "black", x: 8, y: 24 };
  var white = { image: "images/white.jpg", label: "white", x: 9, y: 24 };
  var gray = { image: "images/gray.jpg", label: "gray", x: 10, y: 24 };
  colorData.push(red, orange, yellow, green, blue, indigo, violet, black, white, gray);
  /***    Chart Object ***/
  var chart = null;

  function vote(index) {
    colorData[index].y++;
    chart.render();
    newChoices();

  }

  function newChoices() {
    /***Generate two random numbers***/
      var randomNum1 = Math.floor(Math.random() * colorData.length);
      var randomNum2 =  Math.floor(Math.random() * colorData.length);

    /***Check to make sure the two numbers aren't the same***/
       while (randomNum1 == randomNum2) {
         randomNum1 = Math.floor(Math.random() * colorData.length);
         randomNum2 =  Math.floor(Math.random() * colorData.length);
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

  /***Hide/Show Colors in the Chart***/
  function toggleColor(color) {
    var selectedItem = document.getElementById(color);
    var selectedArrayItem;
    //console.log("You picked "+ color +". It is "+ isItChecked.checked);
    for(index=0; index<colorData.length; index++){
      if(selectedItem.id == colorData[index].label){
        //console.log(colorData[index]);
        selectedArrayItem = colorData[index];
      }
    }
    if (selectedItem.checked == false) {
       console.log(color +" is unchecked");
       console.log(colorData.indexOf(selectedArrayItem));
       colorData.splice(colorData.indexOf(selectedArrayItem), 1);
       console.log(colorData);
       chart.render();
     }
     else {
       console.log(color + " is checked");
     }
    //If false - remove from array/redraw chart
    //if true - keep it in the array/redraw chart

  }

  window.onload = function () {
    CanvasJS.addColorSet("multiColor",
      [//colorSet Array

        // "red",
        // "orange",
        // "yellow",
        // "green",
        // "blue",
        // "indigo",
        // "violet",
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



