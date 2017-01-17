
window.onload = function(){
    var userList = document.createElement('ul');
    var albumList = document.createElement('table');
    var currentAlbumId = null;
    var form = document.getElementById('modal_form');
    var closeModal = document.getElementById('modal_close');

    closeModal.onclick = function () {
        form.style.display = 'none';
    };

    var filterField = document.getElementById('filter_field');
    filterField.onkeyup = filterAlbums;

    var curAlbumsData;

    getUsers();



    function filterAlbums() {
        listAlbums();
    }

    function listUsers(data){
        data.forEach(function(item, i, array){
            var docItem = document.createElement('li');

            docItem.className = 'userEntry';

            docItem.appendChild(document.createTextNode(item.name));

            docItem.addEventListener('click',function () {
                getAlbums(item.id);
            })

            userList.appendChild(docItem);

        });

        userList.className = 'userEntryTable';

        document.body.appendChild(userList);
    }

    function listAlbums() {
        var data = curAlbumsData.filter(checkAlbumValue);
        clearTable(albumList);

        var docRow = document.createElement('tr');
        albumList.appendChild(docRow);

        data.forEach(function (item, i, array) {

            var docItem;
            docItem = document.createElement('td');

            docItem.appendChild(document.createTextNode(item.title));

            docItem.onclick = function () {
                if (currentAlbumId !== item.id) {

                    var imageSpace = document.getElementById('image_space');
                    clearTable(imageSpace);

                    getPhotos(item.id);
                }

                showModalWindow();
            };

            docRow.appendChild(docItem);

            if (i % 2 === 1) {
                docRow = document.createElement('tr');
                albumList.appendChild(docRow);
            }

        });
        //userList.classList.add('userEntry');

        document.body.appendChild(albumList);

        albumList.className = 'albumEntry';
    }

    function checkAlbumValue(elem) {
        return elem.title.indexOf(filterField.value) != -1;
    }

    function clearTable(doc){
        while (doc.hasChildNodes()) {
            doc.removeChild(doc.firstChild);
        }
    }

    function listPhotos(data) {
        data = data.sort(sortPhotos);

        data.forEach(function (item, i, array) {
            var docImg;
            docImg = document.createElement('img');

            docImg.src = item.thumbnailUrl;

            docImg.onclick = function () {
                console.log(item.title);
            };

            document.getElementById('image_space').appendChild(docImg);

            //console.log(item.title);

        });

    }

    function sortPhotos(elem1, elem2) {
        if (elem2.title < elem1.title)
            return 1;
        return -1;
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

    function showModalWindow(){

        form.style.opacity = 100;
        form.style.display = 'block';

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

                curAlbumsData = JSON.parse(xhr.response);

                listAlbums();
            }

        };
    }

    function getPhotos(albumId) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                //obrabotka)
                currentAlbumId = albumId;
                var photos = JSON.parse(xhr.response);
                listPhotos(photos);
            }

        };

    }
};