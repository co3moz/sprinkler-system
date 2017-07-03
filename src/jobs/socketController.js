const config = require('config');
const socket = require('socket.io-client')(config.get('socket'));

exports.IRControl = function IRControl(data) {
    socket.emit('show', '#i' + data);
}

var irStatus = -1;

exports.IROn = function () {
    if (irStatus == 1) return false;
    console.log('socketController.IROn');
    exports.IRControl('O');
    irStatus = 1;
    return true;
}

exports.IROff = function () {
    if (irStatus == 0) return false;
    console.log('socketController.IROff');

    exports.IRControl('F');
    irStatus = 1;

    return true;
}

exports.HappyFace = function () {
    console.log('socketController.HappyFace');
    socket.emit('show_array', [35, 115, 51, 115, 96, 96, 96, 96, 115, 51]);
}

exports.NightMode = function () {
    console.log('socketController.NightMode');
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();

    if ((hour >= 20 && hour <= 23) || (hour == 1 && minutes < 5)) { // 20-00
        if (exports.IROn()) {
            exports.HappyFace();
            setTimeout(function () {
                exports.IRControl('W');
            }, 1000);
        }
    } else {
        if (exports.IROff()) {
            exports.PrintText(' ');
        }
    }
}

exports.PrintText = function (data) {
    console.log('socketController.PrintText(%s)', data);
    socket.emit('show', data.replace(/[ıİğĞüÜöÖçÇ]/g, function (c) {
        switch (c) {
            case "ı": return 'i';
            case "İ": return 'I';
            case "ğ": return 'g';
            case "Ğ": return 'G';
            case "ü": return 'u';
            case "Ü": return 'U';
            case "ö": return 'o';
            case "Ö": return 'O';
            case "ç": return 'c';
            case "Ç": return 'C';
        }
    }));
}

exports.PrintChar = function (data) {
    console.log('socketController.PrintChar(%s)', data);
    socket.emit('show', '&' + data.charAt(0).replace(/[ıİğĞüÜöÖçÇ]/g, function (c) {
        switch (c) {
            case "ı": return 'i';
            case "İ": return 'I';
            case "ğ": return 'g';
            case "Ğ": return 'G';
            case "ü": return 'u';
            case "Ü": return 'U';
            case "ö": return 'o';
            case "Ö": return 'O';
            case "ç": return 'c';
            case "Ç": return 'C';
        }
    }));
}