let iphone = new Mobile();
let nokia = new Mobile();
let viewScreen = [];

function statusOn_Nokia(){
    nokia.turnOn()
    alert("Điện thoại đang Bật");
    document.getElementById("status_Nokia").innerHTML="On";

}
function statusOff_Nokia(){
    nokia.turnOff()
    alert("Điện thoại đang Tắt");
    document.getElementById("status_Nokia").innerHTML="Off";
}
function statusOn_Iphone(){
    iphone.turnOn()
    alert("Điện thoại đang Bật");
    document.getElementById("status_Iphone").innerHTML="On";

}
function statusOff_Iphone(){
    iphone.turnOff()
    alert("Điện thoại đang Tắt");
    document.getElementById("status_Iphone").innerHTML="Off";
}


function send_Nokia(){
    let message = document.getElementById("input_Nokia").value;
    nokia.writeMessage(message);
    nokia.sendMessage(iphone);
    for (let i = 0; i <iphone.inbox.length; i++) {
        const tableMain_Iphone = document.querySelector("#screen_mess_Iphone");
        const inbox_iphone =
            <tr>
                <td> ${iphone.inbox.join()} </td>
                <td> ${""} </td>
            </tr>;
        tableMain_Iphone.innerHTML += inbox_iphone;
    }
    for (let i = 0; i <nokia.sent.length; i++) {
        const tableMain_Nokia = document.querySelector("#screen_mess_Nokia");
        const sent_nokia =
            <tr>
                <td> ${""} </td>
                <td> ${iphone.inbox.join()} </td>
            </tr>;
        tableMain_Nokia.innerHTML += sent_nokia;
    }


    document.getElementById('inboxNokia').innerHTML = iphone.inbox.join();
    document.getElementById('viewsentIphone').innerHTML = iphone.inbox.join();
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