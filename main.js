var data = rawData.results;
console.log(data);

var tbody = document.getElementById("tbody");

for (var i = 0; i < data.length; i++) {
  var tr = document.createElement("tr");
  var image = document.createElement("img");
  var imageUrl = data[i].cover_image;
  image.src = imageUrl;
  image.className = "rounded";
  image.style.height = "80px";
  image.style.width = "auto";
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  td2.innerHTML = data[i].title;
  var td3 = document.createElement("td");
  td3.innerHTML = data[i].type;

  td1.appendChild(image);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tbody.appendChild(tr);
}
