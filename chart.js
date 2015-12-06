
  /***    Data Points ***/
  var colorData = new Array();
  var colorObject = {};
  colorObject.red = { image: "images/red.jpg", label: "red", x: 1, y: 18 };
  colorObject.orange = { image: "images/orange.jpg", label: "orange", x: 2, y: 29 };
  colorObject.yellow = { image: "images/yellow.jpg", label: "yellow", x: 3, y: 40 };
  colorObject.green = { image: "images/green.jpg", label: "green", x: 4, y: 34 };
  colorObject.blue = { image: "images/blue.jpg", label: "blue", x: 5, y: 24 };
  colorObject.indigo = { image: "images/indigo.jpg", label: "indigo", x: 6, y: 24 };
  colorObject.violet = { image: "images/violet.jpg", label: "violet", x: 7, y: 24 };
  colorObject.black = { image: "images/black.jpg", label: "black", x: 8, y: 24 };
  colorObject.white = { image: "images/white.jpg", label: "white", x: 9, y: 24 };
  colorObject.gray = { image: "images/gray.jpg", label: "gray", x: 10, y: 24 };
  colorData.push(colorObject.red, colorObject.orange, colorObject.yellow, colorObject.green, colorObject.blue, colorObject.indigo, colorObject.violet, colorObject.black, colorObject.white, colorObject.gray);

  /*** Master List to hold references to positions ***/
  var masterList = colorData.slice(0, colorData.length);

  /***    Chart Object ***/
  var chart = null;

  function vote(index) {
    colorData[index].y++;
    chart.render();
    newChoices();

  }

  function drawCheckBox() {
    var toggleArea = document.getElementById("toggle");
    toggleArea.innerHTML = "";
    for(index=0; index<colorData.length; index++){
      var colorItem = colorData[index];
      var checkBox = "<label for='"+colorItem.label+"' draggable='true' class='normal' data-index="+index+"><input type='checkbox' id='"+colorItem.label+"' checked='true'>"+colorItem.label+"</label>";
      toggleArea.innerHTML += checkBox;
    }
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
  var priorItemsHidden = new Array();

  function toggleColor(color) {
    var selectedItem = document.getElementById(color);
    var selectedArrayItem;

    if (selectedItem.checked == false) {
      //console.log(color +" is unchecked");
      selectedItem.setAttribute("checked", "false");
      for(var index=0; index<colorData.length; index++){
        if(selectedItem.id == colorData[index].label){
          selectedArrayItem = colorData[index];
        }
      }

      for(var index=0; index<colorData.length; index++) {
         if (colorData[index].x > selectedArrayItem.x){
           colorData[index].x = colorData[index].x-1;
         }
       }
       /**Pull selected item from colorData and store in currentHideItem**/
       var currentHideItem = new Array();
       currentHideItem = colorData.slice(colorData.indexOf(selectedArrayItem), colorData.indexOf(selectedArrayItem)+1 );
       priorItemsHidden = priorItemsHidden.concat(currentHideItem);
       colorData.splice(colorData.indexOf(selectedArrayItem), 1);
       chart.render();
     }
     else {
       //console.log(color + " is checked");
      selectedItem.setAttribute("checked", "true");
      for(var index=0; index<priorItemsHidden.length; index++){
        if(selectedItem.id == priorItemsHidden[index].label) {
          selectedArrayItem = priorItemsHidden[index];
          selectedArrayItem.x = getLocation(selectedArrayItem);
        }
      }

      for(var index=0; index<colorData.length; index++) {
        if (colorData[index].x >= selectedArrayItem.x ) {
           colorData[index].x = colorData[index].x+1;
        }
      }
      var putBackIndex = selectedArrayItem.x-1;
      colorData.splice(putBackIndex, 0, selectedArrayItem)
      //colorData.push(selectedArrayItem);
      chart.render();
      priorItemsHidden.splice(priorItemsHidden.indexOf(selectedArrayItem), 1);
     }

  }

  function getLocation(selectedArrayItem) {
    for(var index=0; index<masterList.length; index++){
      console.log("checking Master List "+ index);
      if(masterList[index] == selectedArrayItem){
        console.log("found item");
        if(masterList[index-1]) {
          console.log("there is an item before");
          itemBefore = masterList[index-1];
          console.log("item before is "+itemBefore.label);
          for(var counter=0; counter<colorData.length; counter++){
            console.log("checking colorData "+ counter);
            if(colorData[counter] == itemBefore) {
              console.log("item is showing");
              var xValue = colorData[counter].x;
              return xValue+1;
              /**getting incorrect placement here originally index+1**/
            }
          }
          console.log("hidden item");
          return getLocation(itemBefore);

        }
        else{
          console.log("there is not an item before");
          return 1;
        }
      }
    }
  }
  /***Drag and Drop Stuff***/

  window.addEventListener("load", initializeDragItems);

  function initializeDragItems() {
    var list = document.getElementById("toggle");
    list.addEventListener("dragstart", startDrag);
    list.addEventListener("dragover", dragOverItem);
    list.addEventListener("drop", dropItem);
    list.addEventListener("dragleave", resetStyle);
    drawCheckBox();
    newChoices();
    /***Event Listener for color checkboxes***/
    var inputs = document.getElementsByTagName("label");
    for(index=0; index<inputs.length; index++) {
      document.getElementsByTagName("input")[index].addEventListener("change", function(){toggleColor(this.id)});
    }
  }

  function startDrag(event){
    event.dataTransfer.setData("text/plain", event.target.getAttribute("data-index"));
  }

  function dragOverItem(event) {
    event.preventDefault();
    event.target.setAttribute("class", "droppable");
  }

  function dropItem(event) {
    event.preventDefault();
    var movedIndex = parseInt(event.dataTransfer.getData("text"));
    var movedColor = colorData[movedIndex];
    var droppedIndex = parseInt(event.target.getAttribute("data-index"));
    colorData.splice(droppedIndex, 0, movedColor);
    if(movedIndex > droppedIndex){
      colorData.splice(movedIndex+1, 1);
    }
    else {
      colorData.splice(movedIndex, 1);
    }
    for(index=0; index<colorData.length; index++){
      colorData[index].x = index+1;
    }
    drawCheckBox();
    var inputs = document.getElementsByTagName("label");
    for(index=0; index<inputs.length; index++) {
      document.getElementsByTagName("input")[index].addEventListener("change", function(){toggleColor(this.id)});
    }
    chart.render();
    newChoices();
  }

  function resetStyle(event) {
    event.target.setAttribute("class", "normal");

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

      axisX:{interval: 1,},

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



