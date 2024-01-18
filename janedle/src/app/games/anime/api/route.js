const myAnimeListBaseUrl = 'https://api.myanimelist.net/v2/';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  //If id is provided, return the anime with that id
  if(id) {
    const res = await fetch(myAnimeListBaseUrl + `anime/${id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics'`, {
        headers: {
            'Content-Type': 'application/json',
            'X-MAL-Client-ID': process.env.MY_ANIME_LIST_CLIENT_ID,
        },
    })
    const data = await res.json()
    return Response.json({ data })
  }
  //If no id is provided, return the user's anime list instead
  else {
    const res = await fetch(myAnimeListBaseUrl + "users/dondongo/animelist?fields=list_status&limit=250", {
      headers: {
        'Content-Type': 'application/json',
        'X-MAL-Client-ID': process.env.MY_ANIME_LIST_CLIENT_ID,
      },
    })
    const data = await res.json()
    return Response.json({ data })
  }
}
