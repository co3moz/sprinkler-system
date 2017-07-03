const config = require('config');
const socket = require('socket.io-client')(config.get('socket'));

exports.IRControl = function IRControl(data) {
    socket.emit('show', '#i' + data);
}

var irStatus = null;

exports.IROn = function () {
    if (irStatus == true) return false;
    exports.IRControl('O');
    irStatus = true;
    return true;
}

exports.IROff = function () {
    if (irStatus == false) return false;

    exports.IRControl('F');
    irStatus = false;

    return true;
}

exports.HappyFace = function () {
    socket.emit('show_array', [35, 115, 51, 115, 96, 96, 96, 96, 115, 51]);
}

exports.NightMode = function () {
    let hour = new Date().getHours();

    if ((hour >= 20 && hour <= 23)  || (hour == 0)) { // 20-01 arası
        if (exports.IROn()) {
            exports.HappyFace();
            exports.IRControl('R');
        }
    } else {
        if (exports.IROff()) {
            exports.PrintText(' ');
        }
    }
}

exports.PrintText = function (data) {
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