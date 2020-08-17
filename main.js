document.getElementById("inputSearch").addEventListener("click",function(){
    const song = document.getElementById("songNameInput").value;
    const loadSong = loadData(song);
    loadSong.then(data => {
        for(i=0;i <10 ;i++){
             songTitle = data.data[i].title;
             songAlbum = data.data[i].album.title;
             Artist = data.data[i].artist.name;
             songarea = songArea( songTitle,songAlbum,Artist ) ;   
                    }})         
        document.getElementById("songNameInput").value='';
        document.getElementById("contextArea").innerHTML='';
        document.getElementById("songTitleBar").innerHTML = '';
        document.getElementById("artist").innerHTML = '';
        document.getElementById("lyric").innerHTML = '';
    })
function songArea(songTitle,songAlbum,Artist){
    document.getElementById("contextArea").innerHTML += ` 
     <div class = "search-result col-md-8 mx-auto py-4">
         <!-- single result -->
        <div class = "single-result row align-items-center my-3 p-3">
             <div class = "col-md-9">
                 <h3 class = "lyrics-name">${songTitle}</h3>
                 <p  class = "author lead">Album by <span>${songAlbum}</span> <span>,Artist-${Artist}</span></p>
                </div>
            <div class = "col-md-3 text-md-right text-center">
                   <button onclick = "findLyric('${Artist}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
               </div>
        </div>`
}
//song Api
async function loadData(song){
   const response = await fetch(`https://api.lyrics.ovh/suggest/${song}`)
   const data = await response.json();
   return data;
}

//lyric Api
async function findLyric(Artist,songTitle){
   const response = await fetch(`https://api.lyrics.ovh/v1/${Artist}/${songTitle}`)
   const data = await response.json();
   if(data.lyrics == undefined){
    document.getElementById("songTitleBar").innerHTML =``
    document.getElementById("artist").innerHTML =``
    document.getElementById("lyric").innerHTML = "404 error.lyric not found"
   }else{
    document.getElementById("songTitleBar").innerHTML = `${songTitle}`
    document.getElementById("artist").innerHTML = `-${Artist}`
    document.getElementById("lyric").innerHTML = data.lyrics; 
   }
}