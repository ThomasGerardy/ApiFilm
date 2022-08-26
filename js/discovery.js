let container_html = document.getElementById('container')
let img_treding_html = document.getElementById('img_trending')
let trending_container_html = document.getElementsByClassName('trending_container')
let hidden_html = document.getElementById('hidden')
let h_hidden_html = document.getElementById('h_hidden')
let img_hidden_html = document.getElementById('img_hidden')
let a_hidden_html = document.getElementById('a_hidden')
let p_hidden_html = document.getElementById('p_hidden')
let card_html = document.getElementsByClassName('card')
let button_pag_html = document.querySelectorAll('button.pag')
let cpt_page = 1
let url_default = 'https://api.themoviedb.org/3/discover/movie?api_key=f839e11b29ecba44216870b35571fbee&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_watch_monetization_types=flatrate&page'+ cpt_page
function movie_main_page_discovery()
{
    
    container_html.innerHTML = ''
    url_default = 'https://api.themoviedb.org/3/discover/movie?api_key=f839e11b29ecba44216870b35571fbee&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_watch_monetization_types=flatrate&page'+ cpt_page
    fetch(url_default)
    .then(
        function(response)
        {
            if(response.ok)
            {
                response.json()
                .then(
                    function(rep)
                    {
                        console.log(rep)
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
                        
                    }
                )
            }
            else console.log('error')
        }
    )
}
function pag()
{
    for(let i = 0; i < button_pag_html.length; i++)
    {
        button_pag_html[i].addEventListener('click', () =>
        {
            cpt_page = 1 + i
            movie_main_page(cpt_page)
        })
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
    if(event.target == hidden_html)
        hidden_html.style.visibility ="hidden"
})

movie_main_page_discovery()
pag()
