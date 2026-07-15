const map = L.map('map', {
    zoomControl: false
}).setView([-6.1582,106.7512],12);

L.tileLayer(
'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
{
    attribution:''
}
).addTo(map);

L.control.zoom({
    position:'topleft'
}).addTo(map);

const westJakarta = [

[-6.1100,106.6850],
[-6.1050,106.7400],
[-6.1300,106.8150],
[-6.1950,106.8050],
[-6.2250,106.7300],
[-6.1700,106.6900]

];

L.polygon(westJakarta,{

    color:"#00ffff",

    weight:3,

    fillColor:"#00ffff",

    fillOpacity:0.05

}).addTo(map);

const sensors = [

{
    name:"Tegal Alur",
    risk:"high",
    water:182,
    rain:62,
    coord:[-6.1245,106.7022]
},

{
    name:"Kembangan",
    risk:"medium",
    water:118,
    rain:42,
    coord:[-6.1645,106.7412]
},

{
    name:"Semanan",
    risk:"high",
    water:171,
    rain:58,
    coord:[-6.1560,106.7300]
},

{
    name:"Jelambar",
    risk:"low",
    water:58,
    rain:25,
    coord:[-6.1522,106.7845]
},

{
    name:"Kedoya",
    risk:"medium",
    water:96,
    rain:39,
    coord:[-6.1685,106.7623]
}

];

function pin(color){

return L.divIcon({

className:"",

html:`

<div class="pin-wrapper">

<div class="pin-glow"></div>

<svg width="42" height="42" viewBox="0 0 24 24">

<path
fill="${color}"
d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/>

<circle
cx="12"
cy="9"
r="2.6"
fill="black"/>

</svg>

</div>

`,

iconSize:[42,42],

iconAnchor:[21,42]

});

}

sensors.forEach(sensor=>{

    let color="#00ff66";

    if(sensor.risk==="high") color="#ff0000";

    if(sensor.risk==="medium") color="#ff9900";

    const popup = `

    <div class="sensor-popup">

        <h2>${sensor.name}</h2>

        <div class="popup-row">
            <span>💧 Water Level</span>
            <b>${sensor.water} cm</b>
        </div>

        <div class="popup-row">
            <span>🌧 Rainfall</span>
            <b>${sensor.rain} mm/hr</b>
        </div>

        <div class="risk-badge ${sensor.risk}">
            ${sensor.risk.toUpperCase()} RISK
        </div>

    </div>

    `;

    L.marker(sensor.coord,{
        icon:pin(color)
    })

    .bindPopup(popup,{
        closeButton:false,
        offset:[0,-18],
        className:"custom-popup"
    })

    .addTo(map);

});