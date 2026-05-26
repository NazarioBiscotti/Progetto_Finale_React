export async function GetAllLoaders() {

    const promise = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2019-09-01,2019-09-30&genres=4,51&page_size=30`);
    const json = await promise.json()


    return json.results
}