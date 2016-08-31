var nametobin = {
    username: '',
    init: function() {
        $("#userNameForm").show();
        $("#userData").hide();
        $('#username').val('');
        $("#userGivenName, #asciiname").text('');
        nametobin.recentlyConverted();
    },
    fnGetBin: function() {
        var n2a = nametobin._fnGetUserName() || '';
        if (n2a) {
            if (n2a['name'] && n2a['msg'].length == 0) {
                $("#userGivenName").text(nametobin.username);
                var asciiname = nametobin._fnConvertoAscii(nametobin.username) || '';
                $("#asciiname").text(asciiname);
                $("#userNameForm").hide();
                $("#userData").show();
                var objData = {
                    name: nametobin.username,
                    aname: asciiname
                };
                nametobin._storetoLocal(objData);
                nametobin.recentlyConverted();
            } else {
                Materialize.toast(n2a['msg']);
            }
        }

    },
    _fnGetUserName: function() {
        var username = nametobin.username = $("#username").val() || '';
        if (username) {
            return {
                name: username,
                msg: ""
            }
        } else {
            return {
                name: "",
                msg: "Please provide a valid name"
            };
        }
    },
    _fnConvertoAscii: function(name) {
        var arrName = name.split(''),
            arrAsciiName = [],
            charCode = '',
            asciiCode = '',
            charData = '';
        for (var i = 0; i < arrName.length; i++) {
            charData = arrName[i]
            console.log()
            charCode = charData.charCodeAt(0);
            arrAsciiName.push(charCode.toString(2));
        }
        return arrAsciiName.join(" ");
    },
    _storetoLocal: function(userData) {
        var data = localStorage.getItem('convHis') || JSON.stringify([]),
            jsonData = JSON.parse(data) || [];
        if (Object.keys(jsonData).length !== 0) {
            jsonData.push(userData);
            localStorage.setItem('convHis', JSON.stringify(jsonData))
        } else {
            arrJsonData = [];
            arrJsonData.push(userData);
            localStorage.setItem('convHis', JSON.stringify(arrJsonData))
        }
    },
    recentlyConverted: function() {
        var html = '',
            data = localStorage.getItem('convHis') || JSON.stringify([]),
            jsonData = JSON.parse(data) || [];
        if (Object.keys(jsonData).length !== 0) {
            for (var i = 0; i < Object.keys(jsonData).length; i++) {
                html += '<div class="col s12 m6"><div class="card blue-grey darken-1 card-panel hoverable"><div class="card-content white-text">'
                html += '<span class="card-title">' + jsonData[i]['name'] + '</span><p id="asciiname">' + jsonData[i]['aname'] + '</p>';
                html += '</div>'
                html += '</div></div>';
            }
            $("#recentlyConverted").html(html);
            $("#clearData, #recentlyConverted").show();
        } else {
            $("#recentlyConverted").html('');
            $("#clearData, #recentlyConverted").hide();
        }
    },
    sessionClear: function() {
        localStorage.clear();
        Materialize.toast('All Data Cleared', 3000);
        $("#recentlyConverted").html('');
        $("#clearData, #recentlyConverted").hide();
    }
};
nametobin.recentlyConverted();