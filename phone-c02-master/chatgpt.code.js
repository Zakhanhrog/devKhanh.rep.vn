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