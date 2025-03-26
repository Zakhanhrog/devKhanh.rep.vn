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
function send_Nokia() {
    let message = document.getElementById("input_Nokia").value;
    nokia.writeMessage(message);
    nokia.sendMessage(iphone);

    // Cập nhật hiển thị tin nhắn đến của iPhone
    const tableMain_Iphone = document.querySelector("#screen_mess_Iphone");
    // Xóa nội dung bảng hiện tại trước khi thêm mới
    tableMain_Iphone.innerHTML = "";

    for (let i = 0; i < iphone.inbox.length; i++) {
        const messageText = iphone.inbox[i]; // Lấy tin nhắn thứ i

        // Tạo các phần tử DOM một cách an toàn
        const tr = document.createElement("tr");
        const tdMessage = document.createElement("td");
        const tdEmpty = document.createElement("td"); // Ô trống cho cột thứ hai

        tdMessage.textContent = messageText; // Đặt nội dung tin nhắn
        tdEmpty.textContent = ""; // Đảm bảo ô trống là trống

        tr.appendChild(tdMessage);
        tr.appendChild(tdEmpty);
        tableMain_Iphone.appendChild(tr);
    }


    // Cập nhật hiển thị tin nhắn đã gửi của Nokia
    const tableMain_Nokia = document.querySelector("#screen_mess_Nokia");
    // Xóa nội dung bảng hiện tại trước khi thêm mới
    tableMain_Nokia.innerHTML = "";

    for (let i = 0; i < nokia.sent.length; i++) {
        const sentMessage = nokia.sent[i];

        // Tạo các phần tử DOM một cách an toàn
        const tr = document.createElement("tr");
        const tdEmpty = document.createElement("td"); // Ô trống cho cột thứ nhất
        const tdSent = document.createElement("td");

        tdEmpty.textContent = ""; // Đảm bảo ô trống là trống
        tdSent.textContent = sentMessage; // Đặt nội dung tin nhắn đã gửi

        tr.appendChild(tdEmpty);
        tr.appendChild(tdSent);
        tableMain_Nokia.appendChild(tr);
    }

    // Cập nhật hiển thị inbox và sent messages (có thể cần xem lại logic)
    document.getElementById('inboxNokia').innerHTML = nokia.sent.join(", "); // Hiển thị tin nhắn đã gửi của Nokia
    document.getElementById('viewsentIphone').innerHTML = iphone.inbox.join(", "); // Hiển thị tin nhắn đến của Iphone
    updateBattery();
}
function send_Iphone() {
    let message = document.getElementById("input_Iphone").value;
    nokia.writeMessage(message);
    nokia.sendMessage(iphone);

// Cập nhật hiển thị tin nhắn đến của iPhone
    const tableMain_Nokia = document.querySelector("#screen_mess_Nokia");
// Xóa nội dung bảng hiện tại trước khi thêm mới
    tableMain_Nokia.innerHTML = "";

    for (let i = 0; i < nokia.inbox.length; i++) {
        const messageText = nokia.inbox[i]; // Lấy tin nhắn thứ i

// Tạo các phần tử DOM một cách an toàn
        const tr = document.createElement("tr");
        const tdMessage = document.createElement("td");
        const tdEmpty = document.createElement("td"); // Ô trống cho cột thứ hai

        tdMessage.textContent = messageText; // Đặt nội dung tin nhắn
        tdEmpty.textContent = ""; // Đảm bảo ô trống là trống

        tr.appendChild(tdMessage);
        tr.appendChild(tdEmpty);
        tableMain_Nokia.appendChild(tr);
    }


// Cập nhật hiển thị tin nhắn đã gửi của Nokia
    const tableMain_Iphone = document.querySelector("#screen_mess_Iphone");
// Xóa nội dung bảng hiện tại trước khi thêm mới
    tableMain_Iphone.innerHTML = "";

    for (let i = 0; i < iphone.sent.length; i++) {
        const sentMessage = iphone.sent[i];

// Tạo các phần tử DOM một cách an toàn
        const tr = document.createElement("tr");
        const tdEmpty = document.createElement("td"); // Ô trống cho cột thứ nhất
        const tdSent = document.createElement("td");

        tdEmpty.textContent = ""; // Đảm bảo ô trống là trống
        tdSent.textContent = sentMessage; // Đặt nội dung tin nhắn đã gửi

        tr.appendChild(tdEmpty);
        tr.appendChild(tdSent);
        tableMain_Iphone.appendChild(tr);
    }

// Cập nhật hiển thị inbox và sent messages (có thể cần xem lại logic)
    document.getElementById('inboxNokia').innerHTML = iphone.sent.join(", "); // Hiển thị tin nhắn đã gửi của Nokia
    document.getElementById('viewsentIphone').innerHTML = nokia.inbox.join(", "); // Hiển thị tin nhắn đến của Iphone
    updateBattery();
}

// function send_Nokia(){
//     let message = document.getElementById("input_Nokia").value;
//     nokia.writeMessage(message);
//     nokia.sendMessage(iphone);
//     for (let i = 0; i <iphone.inbox.length; i++) {
//         const tableMain_Iphone = document.querySelector("#screen_mess_Iphone");
//         const inbox_iphone =
//             <tr>
//                 <td> ${iphone.inbox.join()} </td>
//                 <td> ${""} </td>
//             </tr>;
//         tableMain_Iphone.innerHTML += inbox_iphone;
//     }
//     for (let i = 0; i <nokia.sent.length; i++) {
//         const tableMain_Nokia = document.querySelector("#screen_mess_Nokia");
//         const sent_nokia =
//             <tr>
//                 <td> ${""} </td>
//                 <td> ${iphone.inbox.join()} </td>
//             </tr>;
//         tableMain_Nokia.innerHTML += sent_nokia;
//     }
//
//
//     document.getElementById('inboxNokia').innerHTML = iphone.inbox.join();
//     document.getElementById('viewsentIphone').innerHTML = iphone.inbox.join();
//     updateBattery();
// }
// function sendIphone(){{
//     let massage = document.getElementById('nokia').value;
//     nokia.writeMessage(massage);
//     nokia.sendMessage(iphone);
//     document.getElementById('inboxIphone').innerHTML = iphone.inbox.join("<br>");
//     document.getElementById('viewsentNokia').innerHTML = iphone.inbox.join("<br>");
//     updateBattery();
// }}
// function updateBattery() {
//     document.getElementById('batteryIphone').innerHTML = " " + iphone.battery + "%";
//     document.getElementById('batteryNokia').innerHTML = " " + nokia.battery + "%";
// }