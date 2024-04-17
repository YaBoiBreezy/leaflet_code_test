//Initialize Leaflet map, set to Alberta
var map = L.map('mapid', {editable: true}).setView([53.5, -115], 6);

//Add OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Initialize feature group for editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var tool = ""; //the tool currently selected
var selEle = null; //selectedElement, the element currently being handled, for lines/areas
var comments = []; //comments for searching, [{str:"", ele:e}]

//demo marker
var m = L.marker([53.5, -115], {draggable:true}).addTo(editableLayers);
m.bindTooltip("Demo comment</br>Pretty cool right?").openTooltip();
comments.push({"str":"demo comment pretty cool right?", "ele":m});

//initializes all tool buttons in one go, very smart :)
document.querySelectorAll('.tool').forEach(function(ele) {
  ele.addEventListener('click', function() {
    tool = ele.id;
    selEle=null;
  });
});

//detects clicks on the map
function onMapClick(e) {
  switch(tool){   //switch for O(1) access
    case "pointTool":
      var marker = L.marker(e.latlng, {draggable:true}).addTo(editableLayers);  //adds marker, draggable allows for editing
      break;
    case "lineTool":
      if (selEle==null){
        var polyline = L.polyline([[e.latlng.lat,e.latlng.lng]], {color: 'red'}).addTo(editableLayers);  //if no line, starts line, else adds to current line
        selEle=polyline;
      } else {
        console.log("nul");
        selEle.addLatLng(e.latlng);
      }
      break;
    case "areaTool":
      if (selEle==null){
        var polygon = L.polygon([e.latlng], {color: 'red'}).addTo(editableLayers);  //if no polygon, adds polygon, else adds to current one
        selEle=polygon;
      } else {
        selEle.addLatLng(e.latlng);
      }
      break;
    case "commentTool": //comment and trash are handled in the "clicked on element" detector below
      break;
    case "trashTool":
      break;
  }
}
map.on('click', onMapClick);

//handlers for enter/esc, as well as hotkeys for tools
document.addEventListener('keydown', function(event) {
  //enter handler happens by default at end, so this is unnecessary (but proper)
  if (event.key === 'Enter') {
    if (selEle && (selEle instanceof L.Polygon || selEle instanceof L.Polyline)) { //if line/area, enable editing
      selEle.enableEdit();
    }
    selEle = null; //confirming element placement, so remove it from selEle so it isn't altered by further clicks
  } else if (event.key === 'Escape' && selEle !== null) {
    editableLayers.removeLayer(selEle);  //esc means don't place it, so delete element before setting to null
    selEle = null;
  }
  switch(event.key){
    case "m":
      tool="pointTool";
      break;
    case "l":
      tool="lineTool";
      break;
    case "a":
      tool="areaTool";
      break;
    case "c":
      tool="commentTool";
      break;
    case "d":
      tool="trashTool";
      break;
    case "t":
      tool="trashTool";
      break;
  }
  if (selEle && (selEle instanceof L.Polygon || selEle instanceof L.Polyline)) { //if line/area, enable editing
    selEle.enableEdit();
  }
  selEle = null;
});

// Event listener for clicks on placed elements (not just the map in general)
editableLayers.on('click', function(event) {
  var ele = event.layer;
  switch(tool){
    case "pointTool":
      break;
    case "lineTool":
      break;
    case "areaTool":
      break;
    case "commentTool":
      //get user input, place comment, add to list for searching
      var userInput = prompt("Enter comment:");
      if (userInput !== null) {
        var tooltip = L.tooltip({permanent: true, direction: 'top',}).setContent(userInput);     //.setLatLng(ele.getLatLng()).addTo(map);
        comments.push({"str": userInput.toLowerCase(), "ele": tooltip}); //store the tooltip in the comments array, so I can pan to it on complex elements
        ele.bindTooltip(tooltip);
      }
      break;
    case "trashTool": //have to find and remove the comment (if it exists) from the comments list before removing the element itself
      if (ele.getTooltip()) {
        var tooltipContent = ele.getTooltip().getContent(); // Get the content of the tooltip
        for (var i = 0; i < comments.length; i++) {
          var commentText = comments[i].str; // Get the text of the comment
          if (tooltipContent === commentText) { // Compare the tooltip content with the comment text
            comments.splice(i, 1); // Remove the comment from the array
            break; // Stop searching once the comment is found and removed
          }
        }
      }
      editableLayers.removeLayer(ele); //remove the clicked element
      break;
  }
});

//gets results for search bar
function searchHandler() {
  var searchTerm = document.getElementById('searchInput').value.toLowerCase();
  var searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  //note for future: limit to x results, then break
  comments.forEach(function(com, index){
    console.log(com);
    if (com.str.includes(searchTerm)) {
      var option = document.createElement('option');
      option.value = index;
      option.textContent = com.str;
      searchResults.appendChild(option);  //DOM manipulation to create results
    }
  });
}
document.getElementById('searchInput').addEventListener('input', searchHandler); //generates search results whenever search text changes

//when search result clicked, go there in map
document.getElementById('searchResults').addEventListener('click', function(event) {
  var selectedIndex = event.target.value;
  var selectedEle = comments[selectedIndex].ele;
  map.panTo(selectedEle.getLatLng()); // Assuming marker is a Leaflet marker
  selectedEle.openTooltip();
});