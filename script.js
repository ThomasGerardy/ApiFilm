let url ="https://api.themoviedb.org/3/search/movie?api_key=1a85f5aeaf961ae4ee8a30df575d2baa&query=back-to-the-future"
fetch(url)
.then(
    function(response)
    {
        if(response.ok)
        {
            response.json()
            .then(
                function(rep){
                    console.log(rep);
                    document.getElementsByTagName('div')[0].innerHTML = rep.results[0].original_title
                    document.getElementById('poster').src = 'https://image.tmdb.org/t/p/w500'+rep.results[0].poster_path
                }
            )
        }
    }
)