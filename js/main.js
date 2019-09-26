document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    // console.log('Worked');

    var bookmarkName = document.getElementById('bookmarkName').value;
    var bookmarkAddress = document.getElementById('bookmarkAddress').value;

    if(!bookmarkName || !bookmarkAddress){
        alert('You havent insert data into the form');
        return false;
    }
    
    // var expresion = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b{\/[-a-zA-Z0-%_\+.~#?&//=]*}?/gi;
    // var regex = RegExp(expresion);

    // if(!bookmarkAddress.match(regex)){
    //     alert("please insert valid Url");
    //     return false;
    // }
    // getting whatever we input inside the bookmark name and url
    var bookmarkDetail = {
        name: bookmarkName,
        address: bookmarkAddress,
    }

    // console.log(bookmarkDetail);
    // console.log(JSON.stringify(bookmarkDetail));


    // We are saving whatever user input into localstorage of google chrome, 
    // so that whenever user comes around we will retrived the values from the local storage

    /*
        localStorage.setItem(bookmarkDetail.name, bookmarkDetail.address);
        console.log(localStorage.getItem(bookmarkDetail.name));
        localStorage.removeItem(bookmarkDetail.name)

    */

    // first, checking the localStorage for values
    if (localStorage.getItem('bookmarks')=== null) {
        // initialize array to store bookmarks entered by users
        var bookmarks = [];
        bookmarks.push(bookmarkDetail);

        // then set values into local storage and string it with JSON.stringify
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    }else{
        // we have to get the value if there is values
        // get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // then add bookmarks to array we created
        bookmarks.push(bookmarkDetail);

        // then set it back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    // when the button is clicked, the console log the string by flashing it, to show the result ('Worked'),
    // we need to prevent default, bcos the button is actually submitting.    
    e.preventDefault();
    document.getElementById('bookmarkForm').reset();
    getStoredData();
    
}


function getStoredData() {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarkResults = document.getElementById('bookmarkResults');

    bookmarkResults.innerHTML = '';

    for (let i = 0; i < bookmarks.length; i++) {
        var siteName = bookmarks[i].name;
        var siteUrl = bookmarks[i].address
        
        // bookmarkResults.innerHTML += '<div>'+
        //                              '<table class="table table-responsive>'+
        //                              '<thead>'+
        //                              '<tr>'+
        //                              '<th>Action</th>'+
        //                              '<th>Site Name</th>'+
        //                              '<th>Site Address</th>'+
        //                              +'</tr>'
        //                              +'</thead>'+
        //                              '<tbody>'+
        //                              '<tr>'+
        //                              '<th><a class="btn btn-success" target="_blank" href="'+siteUrl+'">Visit</a></th>'+
        //                              '<th>Site Name</th>'
        //                              '<th>Site Address</th>'
        //                              +'</tr>'
        //                              +'</tbody>'
        //                               +'</table>'
                                    
        //                             '
        //                             '<a class="btn btn-danger" onclick="deleteBookmark(\''+siteUrl+'\')" target="_blank" href="#">Delete</a> '+
        //                             '</h3>'+'</div>'
        
        
        
        bookmarkResults.innerHTML += '<div class="well">'+
                                    '<h3 class="text-warning">'+siteName+
                                    '<a class="btn btn-secondary"  target="_blank" href="'+siteUrl+'">Visit</a> '+
                                    '<a class="btn btn-danger" onclick="deleteBookmark(\''+siteUrl+'\')" href="#">Delete</a> '+
                                    '</h3>'+'</div>'
        
    }
}

function deleteBookmark(url) {
    // var deleteItems = localStorage.removeItem(url);

    // console.log(url);

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i<bookmarks.length; i++){
        if(bookmarks[i].address == url){
            bookmarks.splice(i, 1);
        }
    }

    // then set it back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    getStoredData();
}



