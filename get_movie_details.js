/* Each time the function is called 
I have to collected the topic Information and Make Json files for each Topic */


/*  Also Remember to return a promise */

const { makeFiles } = require("./makeFiles");


async function get_movie_details(selector, topicName, newPage) {
    await newPage.waitForSelector(selector, topicName, { delay: 50 });
    await newPage.waitForSelector(".ipc-poster-card.ipc-poster-card--baseAlt.ipc-poster-card--dynamic-width.TitleCard-sc-1e5jqmp-0.egRGeD.streaming-picks-title.has-action-icons.ipc-sub-grid-item.ipc-sub-grid-item--span-2",{visible:true});
    await newPage.waitForSelector(".ipc-rating-star.ipc-rating-star--baseAlt.ipc-rating-star--imdb", { visible: true });
    await newPage.waitForSelector(".ipc-poster-card__title.ipc-poster-card__title--clamp-2.ipc-poster-card__title--clickable", { visible: true });
    await newPage.waitForSelector(".ipc-button.ipc-button--full-width.ipc-button--center-align-content.ipc-button--default-height.ipc-button--core-baseAlt.ipc-button--theme-baseAlt.ipc-button--on-accent2.ipc-secondary-button.title-watchnow-button", { visible: true });
    await newPage.waitForSelector(".ipc-button.ipc-button--single-padding.ipc-button--center-align-content.ipc-button--default-height.ipc-button--core-baseAlt.ipc-button--theme-baseAlt.ipc-button--on-textPrimary.ipc-text-button.card-action-button", { visible: true });

    /* Extract the Code Information and Make Folders */

    function consoleFn(Movie_rating, Movie_name, watch_Link, trailer_link){
        let movie_rates = document.querySelectorAll(Movie_rating);
        let Movie_names = document.querySelectorAll(Movie_name);
        let Watch_link = document.querySelectorAll(watch_Link);
        let Trailer_link = document.querySelectorAll(trailer_link);

        let result = [];

        for( let i = 30, j = 0 ; i < movie_rates.length && j<Watch_link.length ; i++, j++ ){
            let rating = movie_rates[i].innerText.trim();
            let Movie_name = Movie_names[i].innerText.trim();
            let watch_link = Watch_link[j].href;
            let trailerlink = Trailer_link[i].href;

            
            result.push({
                rating : rating,
                Movie_name : Movie_name,
                watch_link : watch_link,
                trailerlink : trailerlink
            });
        }

        return result;
    }

    let MovieResult = await newPage.evaluate(consoleFn,".ipc-rating-star.ipc-rating-star--baseAlt.ipc-rating-star--imdb", ".ipc-poster-card__title.ipc-poster-card__title--clamp-2.ipc-poster-card__title--clickable", ".ipc-button.ipc-button--full-width.ipc-button--center-align-content.ipc-button--default-height.ipc-button--core-baseAlt.ipc-button--theme-baseAlt.ipc-button--on-accent2.ipc-secondary-button.title-watchnow-button", ".ipc-button.ipc-button--single-padding.ipc-button--center-align-content.ipc-button--default-height.ipc-button--core-baseAlt.ipc-button--theme-baseAlt.ipc-button--on-textPrimary.ipc-text-button.card-action-button");
    
    makeFiles(topicName, MovieResult);

    
}
module.exports = {
    get_movie_details: get_movie_details
};