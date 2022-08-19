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
                response.json()
                .then(
                (rep) => 
                {
                    for(let i = 0; i < rep.results.length; i++)
                    {
                        let card = document.createElement('div')
                        container_html.appendChild(card)
                        card.setAttribute('class', 'card')

                        let title = document.createElement('div')
                        card.appendChild(title)
                        title.setAttribute('class', 'title')
                        title.innerHTML = rep.results[i].original_title

                        let poster = document.createElement('div')
                        card.appendChild(poster)
                        poster.setAttribute('class', 'poster')
                        let img_html = document.createElement('img')
                        poster.appendChild(img_html)
                        img_html.setAttribute('src', 'https://image.tmdb.org/t/p/w500'+rep.results[i].poster_path)


                        let info_supp = document.createElement('div')
                        card.appendChild(info_supp)
                        info_supp.setAttribute('class', 'info_supp')
                        info_supp.innerHTML = rep.results[i].overview
                    }
                })
            }
            else
            {   
            
                container_html.innerHTML = '<h1>ERROR<h1>'
            }
        }
    )
}   
confirm_search_html.addEventListener('click', search)