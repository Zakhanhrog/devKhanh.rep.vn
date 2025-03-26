let iphone = new Mobile();
let nokia = new Mobile();

function On(){
    iphone.turnOn()
    document.getElementById('checkOnOff1').innerHTML= "Điện thoại đang <b>Bật";
    console.log("Trạng thái iPhone sau khi bật:", iphone.isOn);
}
function Off(){
    iphone.turnOff()
    document.getElementById('checkOnOff1').innerHTML= "Điện thoại đang <b>Tắt";
    console.log("Trạng thái iPhone sau khi tắt:", iphone.isOn);
}
function On1(){
    nokia.turnOn()
    document.getElementById('checkOnOff2').innerHTML= "Điện thoại đang <b>Bật";
    console.log("Trạng thái Nokia sau khi bật:", nokia.isOn);
}
function Off1(){
    nokia.turnOff()
    document.getElementById('checkOnOff2').innerHTML= "Điện thoại đang <b>Tắt";
    console.log("Trạng thái Nokia sau khi tắt:", nokia.isOn);
}
function sendNokia(){
    let massage = document.getElementById('iphone').value;
    iphone.writeMessage(massage);
    iphone.sendMessage(nokia);
    document.getElementById('inboxNokia').innerHTML = nokia.inbox.join("<br>");
    document.getElementById('viewsentIphone').innerHTML = nokia.inbox.join("<br>");
    updateBattery();
}
function sendIphone(){{
    let massage = document.getElementById('nokia').value;
    nokia.writeMessage(massage);
    nokia.sendMessage(iphone);
    document.getElementById('inboxIphone').innerHTML = iphone.inbox.join("<br>");
    document.getElementById('viewsentNokia').innerHTML = iphone.inbox.join("<br>");
    updateBattery();
}}
function updateBattery() {
    document.getElementById('batteryIphone').innerHTML = " " + iphone.battery + "%";
    document.getElementById('batteryNokia').innerHTML = " " + nokia.battery + "%";
}