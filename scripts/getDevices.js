let devices = {};

let check = 0;

const base = document.querySelector("#devices");

fetch(
  "https://raw.githubusercontent.com/Project-Kizashi/OTA/relay/devices/list.json"
)
  .then((response) => response.json())
  .then((device) => {
    device.devices.forEach((element) => {
      fetch(
        `https://raw.githubusercontent.com/Project-Kizashi/OTA/relay/gapps/${element}.json`
      )
        .then((resp) => resp.json())
        .then((val) => {
          if (!devices[val["response"][0]["manufacturer"]]) {
            devices[val["response"][0]["manufacturer"]] = [];
          }
          devices[val["response"][0]["manufacturer"]].push(val.response[0]);
          check += 1;
          if (check == device.devices.length) {
            //console.log(devices);
            initDevices();
          }
        });
    });
  });

function initDevices() {
  for (let manufacturer in devices) {
    const manufact = document.createElement("div");
    manufact.className = "manufacturer";

    const title = document.createElement("h3");
    title.innerText = manufacturer;

    const deviceContainer = document.createElement("div");
    deviceContainer.className = "deviceContainer";

    manufact.appendChild(title);
    manufact.appendChild(deviceContainer);
    
    base.appendChild(manufact);
    addDevice(devices[manufacturer],deviceContainer)
  }
}

function addDevice(devices,deviceContainer) {
    devices.forEach(element => {
    const device = document.createElement("div");
    device.className = "phone";

    const image = document.createElement('img');
    image.src = element["imageURL"];

    const h4 = document.createElement('h4');
    h4.innerText = `${element["manufacturer"]} ${element['name']}`
    
    const table = document.createElement('table');
    const maintainer = document.createElement('tr');
    maintainer.innerHTML = `<th>Maintainer:</th><td> ${element['Maintainer']}</td>`
    const version = document.createElement('tr');
    version.innerHTML = `<th>Rom Version:</th><td> 11</td>`
    const buildDate = document.createElement('tr');
    buildDate.innerHTML = `<th>Build Date:</th><td> ${ToDate(Number(element['datetime']))}</td>`
   
    table.appendChild(maintainer);
    table.appendChild(buildDate);
    table.appendChild(version);

    const buttonContainer = document.createElement('div');
     const downloadLink = document.createElement('a');
     downloadLink.href = element['url'];
     const downloadButton = document.createElement('button');
     downloadButton.innerHTML = 'Download <i class="fa fa-download"></i>';
     downloadButton.className = "main_info_button clickable";
     downloadLink.appendChild(downloadButton);
     buttonContainer.appendChild(downloadLink);

     const chatLink = document.createElement('a');
     chatLink.href = element['MaintainerURL'];
     const chatButton = document.createElement('button');
     chatButton.innerHTML = 'Chat <i class="fa fa-telegram"></i>';
     chatButton.className = "main_info_button clickable";
     chatLink.appendChild(chatButton);
     buttonContainer.appendChild(chatLink);

    device.appendChild(image);
    device.appendChild(h4);
    device.appendChild(table);
    device.appendChild(buttonContainer);
    
    deviceContainer.appendChild(device);
    })
    

}

function ToDate(timestamp){
    const date = new Date(timestamp*1000);
    return date.toLocaleDateString('In'); 
}

