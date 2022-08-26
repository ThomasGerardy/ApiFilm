// recupération des éléments html
let search_input_html = document.getElementById('search_input')
let confirm_search_input_html = document.getElementById('searchConfirm')
let container_html = document.getElementById('container')
let menu_html = document.getElementsByClassName('menu')
let actor_html = document.getElementById('actor')

let hidden_html = document.getElementById('hidden')
let h_hidden_html = document.getElementById('h_hidden')
let img_hidden_html = document.getElementById('img_hidden')
let a_hidden_html = document.getElementById('a_hidden')
let p_hidden_html = document.getElementById('p_hidden')
// autres variables


// récupération de la barre de recherche 
let search = (e) => 
{
    let url_search =''
    if(actor_html.checked)
    {
        console.log(actor_html.checked)
        url_search = 'http://api.tmdb.org/3/search/person?api_key=f839e11b29ecba44216870b35571fbee&query='
    }
    else
        url_search = 'https://api.themoviedb.org/3/search/movie?api_key=f839e11b29ecba44216870b35571fbee&&query='
    e.preventDefault()
    url_search += `${search_input_html.value.trim().replaceAll(' ', '+')}`
   
    search_input_html.value = ''
    fetch(url_search)
    .then(add_film_one_page)
} 

let add_film_one_page = (response) => 
{
    if(!actor_html.checked)
    {
        container_html.innerHTML = ''
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
                        // card.style.width = '300px'

                        

                        let poster = document.createElement('div')
                        card.appendChild(poster)
                        poster.setAttribute('class', 'poster')
                        let img_html = document.createElement('img')
                        poster.appendChild(img_html)
                        if(rep.results[i].poster_path)
                        {
                            img_html.setAttribute('src', 'https://image.tmdb.org/t/p/w200/'+rep.results[i].poster_path)
                            img_html.setAttribute('alt', rep.results[i].id)
                        }
                        else{
                            let title = document.createElement('div')
                            card.appendChild(title)
                            title.setAttribute('class', 'title')
                            title.innerHTML = rep.results[i].original_title
                            title.style.maxWidth = '200px' 
                            img_html.setAttribute('src', '../divers/image_default.png')
                            img_html.setAttribute('alt', rep.results[i].id)
                            img_html.style.height = '250px'
                            img_html.style.width = '200px'
                        }
                        hidden_card(card)
                    }
            })
            
        }
        else
        {   
        
            container_html.innerHTML = '<h1>ERROR<h1>'
        }
    }
    else
    {
        container_html.innerHTML = ''
        if(response.ok)
        {
            
            response.json()
            .then(
            (rep) =>
            {
                let id = rep.results[0].id
                console.log(id)
                let url_person = `http://api.tmdb.org/3/discover/movie?with_people=${id}&sort_by=popularity&api_key=f839e11b29ecba44216870b35571fbee`
                fetch(url_person)
                .then((resp) => 
                {
                    if(resp.ok)
                    {
                        console.log(resp)
                        resp.json()
                        .then((res) =>
                        {
                            console.log(res)
                            for (let i = 0; i < res.results.length; i++)
                            {
                                let card = document.createElement('div')
                                container_html.appendChild(card)
                                card.setAttribute('class', 'card')
                                // card.style.width = '300px'
                                
                    
                                let poster = document.createElement('div')
                                card.appendChild(poster)
                                poster.setAttribute('class', 'poster')
                                let img_html = document.createElement('img')
                                poster.appendChild(img_html)
                                if (res.results[i].poster_path)
                                {
                                    img_html.setAttribute('src', 'https://image.tmdb.org/t/p/w200' + res.results[i].poster_path)
                                    img_html.setAttribute('alt', res.results[i].id)
                                }
                                else 
                                {
                                    let title = document.createElement('div')
                                    card.appendChild(title)
                                    title.setAttribute('class', 'title')
                                    title.innerHTML = res.results[i].original_title
                                    title.style.maxWidth = '200px'
                                    img_html.setAttribute('src', '../divers/image_default.png')
                                    img_html.setAttribute('alt', res.results[i].id)
                                    img_html.style.height = '250px'
                                    img_html.style.width = '200px'
                                }
                                hidden_card(card)
                            }
                        })
                    }
                })
                
            })
        
        }
    }
}
function hidden_card(card)
{
    card.addEventListener('click', () => 
    {
        hidden_html.style.visibility = 'visible'
        let url = `https://api.themoviedb.org/3/movie/${card.children[0].children[0].alt}?api_key=f839e11b29ecba44216870b35571fbee`
        fetch(url)
        .then((response) =>
        {
            if(response.ok)
            {
                
                response.json()
                .then((rep)=>
                {
                    h_hidden_html.innerHTML = rep.original_title
                    img_hidden_html.src = card.children[0].children[0].src
                    p_hidden_html.innerHTML = rep.overview
                    
                })
            }
            else h_hidden_html.innerHTML = 'ERROR'
        })
        let url_video = `https://api.themoviedb.org/3/movie/${card.children[0].children[0].alt}/videos?api_key=f839e11b29ecba44216870b35571fbee&language=en-US`
        fetch(url_video)
        .then((response) =>
        {
            if(response.ok)
            {
                response.json()
                .then((rep) =>
                {
                    let vid_key 
                    for(let i = 0; i < rep.results.length ; i++)
                    {
                        console.log('test sisi')
                        if(rep.results[i].type == 'Trailer')
                            vid_key = rep.results[i].key
                    }
                    a_hidden_html.src = `https://www.youtube.com/embed/${vid_key}`
                })
            }
        })
    })
}
window.addEventListener("click", (event) => 
{
    if(event.target == hidden_html && event.target)
        hidden_html.style.visibility ="hidden"
})
confirm_search_input_html.addEventListener('click', search)