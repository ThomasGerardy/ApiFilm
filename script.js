let search_html = document.getElementById('search')
let confirm_search_html = document.getElementById('searchConfirm')
let container_html = document.getElementById('container')

let url_search = ''


let search = (e) => {
    e.preventDefault()
    url_search = `https://api.themoviedb.org/3/search/movie?api_key=f839e11b29ecba44216870b35571fbee&&query=${search_html.value.trim().replaceAll(' ', '-')}`
    fetch(url_search)
    .then(
        (response) =>
        {
            if(response.ok)
            {
                (rep) => 
                {
                    let film_card = document.createElement('div')
                    film_card.setAttribute('id', 'reponse')
                    document.getElementById("reponse").innerHTML=rep.results[0].original_title;

                    
                }
            }
            else
            {
                let film_card = document.createElement('div')
                film_card.setAttribute('id', 'reponse')
                document.getElementById("reponse").innerHTML=rep.results[0].original_title;
            }
        }
    )
}
confirm_search_html.addEventListener('click', search)