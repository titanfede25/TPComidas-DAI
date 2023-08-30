import axios from 'axios'

export const AxiosClient = axios.create({
    baseURL: 'https://api.spoonacular.com'
})

/*

https://api.spoonacular.com/recipes/716423/information?apiKey=1a1fde2048f044529a1e7e749306db44

https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey=1a1fde2048f044529a1e7e749306db44

*/