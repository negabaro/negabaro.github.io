

# timeupdate

similar to timeupdate in HTML5 video



# 이런 어프로치도..!



I have built a player using the YouTube API and I used the requestAnimationFrame() function to create a loop which constantly checks getElapsedTime() to update the player's track position. Although you said you don't want to use setInterval, it is this 'polling' method which I believe is how you would be able to check if the track has reached a specific frame.

https://stackoverflow.com/questions/42754097/youtube-api-event-on-timeupdate
