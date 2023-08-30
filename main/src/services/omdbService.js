import { AxiosClient } from "./axiosClient";

export const getDishes = async () => {
    return AxiosClient.get(`/recipes/complexSearch?number=20&apiKey=1a1fde2048f044529a1e7e749306db44`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
}

export const getMoviesById = async (id) => {
    return AxiosClient.get(`/?apikey=3786591b&i=${id}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            throw error;
        });
}