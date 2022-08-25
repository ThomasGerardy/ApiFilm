
let container_html = document.getElementById('container')
let img_treding_html = document.getElementById('img_trending')
let trending_container_html = document.getElementsByClassName('trending_container')
let hidden_html = document.getElementById('hidden')
let card_html = document.getElementsByClassName('card')
let button_pag_html = document.querySelectorAll('button.pag')
let cpt_page = 1
let url_default = 'https://api.themoviedb.org/3/discover/movie?api_key=f839e11b29ecba44216870b35571fbee&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+ cpt_page
function movie_main_page()
{
    
    container_html.innerHTML = ''
    url_default = 'https://api.themoviedb.org/3/discover/movie?api_key=f839e11b29ecba44216870b35571fbee&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+ cpt_page
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
                                img_html.setAttribute('src', 'https://image.tmdb.org/t/p/w200/'+rep.results[i].poster_path)
                            else{
                                let title = document.createElement('div')
                                card.appendChild(title)
                                title.setAttribute('class', 'title')
                                title.innerHTML = rep.results[i].original_title
                                title.style.maxWidth = '200px' 
                                img_html.setAttribute('src', '../divers/image_default.png')
                                img_html.style.height = '250px'
                                img_html.style.width = '200px'
                            }
                            
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
        console.log('pomme')
        button_pag_html[i].addEventListener('click', () =>
        {
            cpt_page = 1 + i
            movie_main_page(cpt_page)
        })
    }
}



//      A REVOIR => fonction pour faire un popup au click avec la descr du film
// function read_more()
// {
    
//     console.log(card_html)
//         for(let i = 0; i < card_html.length; i++)
//         {
//             console.log('sisi')
//             card_html[i].addEventListener('click', () => 
//             {
//                 hidden_html.style.visibility = 'visible'
//                 console.log('test')
//             })
//         }
    
// }
// utiliser ça pour aller chercher les description : 
// let info_supp = document.createElement('div')
                            // card.appendChild(info_supp)
                            // info_supp.setAttribute('class', 'info_supp')
                            // info_supp.innerHTML = rep.results[i].overview
movie_main_page()
pag()

