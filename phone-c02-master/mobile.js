class Mobile {
    constructor() {
        this.battery = 100;  // Trạng thái pin, tối đa 100
        this.isOn = false;   // Biến kiểm tra điện thoại bật/tắt
        this.draft = "";     // Tin nhắn đang soạn thảo
        this.inbox = [];     // Danh sách tin nhắn nhận được
        this.sent = []; // Danh sách tin nhắn đã gửi
    }
    turnOn () {
        if (this.battery > 0) {
            this.isOn = true;

        } else {
            this.isOn = false;
        }
    }
    turnOff () {
        this.isOn = false;
    }
    chargeBattery() {
        this.battery = 100;
        alert("Pin đã được sạc đầy.");
    }
    writeMessage(message) {
        if (!this.isOn) {
            return;
        }
        this.draft = message;
        this.battery--;
    }

    sendMessage(typePhone) {
        if (!this.isOn) {
            alert("Please turn on power phone");
            return;
        }
        if (this.draft === "") {
            alert("Please write message");
            return;
        }
        this.sent.push(this.draft);  // Lưu tin nhắn vào danh sách da gui
        typePhone.receiveMessage(this.draft); // Gửi tin nhắn cho đối tượng Mobile khác
        this.draft = "";  // Xóa tin nhắn đang soạn sau khi gửi
        this.battery--;   // Giảm pin đi 1 đơn vị
    }

    receiveMessage(message) {
        if (!this.isOn) {
            alert("Điện thoại đang tắt! Không thể nhận tin nhắn.");
            return;
        }
        this.inbox.push(message);
        this.battery--;
    }


    // viewInbox() {
    //     if (!this.isOn) {
    //         console.log("Điện thoại đang tắt!");
    //         return;
    //     }
    //     console.log("Hộp thư đến: ", this.inbox);
    //     this.battery--;
    // }
    // viewSentMessages() {
    //     if (!this.isOn) {
    //         console.log("Điện thoại đang tắt!");
    //         return;
    //     }
    //     this.sentMessages.push(this.sentMessages);
    //     this.battery--;
    // }

}