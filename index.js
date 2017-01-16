
getUsers();




function listUsers(data){
    var userList = document.createElement('ul');

    data.forEach(function(item, i, array){
        var docItem = document.createElement('li');

        docItem.appendChild(document.createTextNode(item.name));

        userList.appendChild(docItem);

    });
    document.body.appendChild(userList);
    console.log('worked');
}

function getUsers() {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

    xhr.onload = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            //console.log(xhr.response);
            var users = JSON.parse(xhr.response);
            listUsers(users);
        }
    }

    xhr.onerror = function() {
        console.log( 'Ошибка ' + this.status );
    }

    xhr.send();

}

function getAlbums(userId) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/albums/?userId=' + userId, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            //obrabotka)
        }

    };

}

function getPhotos(AlbumId) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            //obrabotka)
        }

    };

}