const config = require('config');
const socket = require('socket.io-client')(config.get('socket'));

exports.IRControl = function IRControl(data) {
    socket.emit('show', '#i' + data);
}

var irStatus = false;

exports.IROn = function () {
    if (irStatus == true) return;
    console.log('socketController.IROn');
    exports.IRControl('O');
    irStatus = true;
}

exports.IROff = function () {
    if (irStatus == false) return;
    console.log('socketController.IROff');

    exports.IRControl('F');
    irStatus = false;
}

exports.HappyFace = function () {
    console.log('socketController.HappyFace');
    socket.emit('show_array', [35, 115, 51, 115, 96, 96, 96, 96, 115, 51]);
}

exports.NightMode = function () {
    console.log('socketController.NightMode');
    let hour = new Date().getHours();

    if (hour >= 20 && hour <= 23) {
        exports.IROn();
        exports.HappyFace();
    } else {
        exports.IROff();
        exports.PrintText(' ');
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