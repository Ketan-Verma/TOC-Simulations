function createTable(data, containerId) {
  var table = document.createElement("table");
  var container = document.getElementById(containerId);
  container.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var row = document.createElement("tr");

    var cellType = i === 0 ? "th" : "td";

    for (var j = 0; j < data[i].length; j++) {
      var cell = document.createElement(cellType);
      cell.textContent = data[i][j] == "" ? "-" : data[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
  makeNetwork("myNfaNetwork", data);
}
function myToggleFunction(tempdiv, displaytype) {
  var temp_x = document.getElementById(tempdiv);
  if (temp_x.style.display === "none") {
    temp_x.style.display = displaytype;
  } else {
    temp_x.style.display = "none";
  }
}
