# Dine Roulette

## Overview

Unable to decide on your next meal? or just looking for the next spot in a pub crawl
</br>
<img src="./client/src/assets/gachapon-gashapon.gif">
</br>
Dine Roulette will pick you a spot to go next, and give you directions on how to go there
</br>
Click on Dine Roulette to test it out

Dine Roulette was developed using this [brief](Brief.md) for the technical requirements
With the tech to use up to me to decide on and implement

You can use the following account to find places near
</br>
Flinders Station, Melbourne, VIC or
</br>
Darling Harbour, Sydney, NSW
</br>
or create your own account and find Restaurants at places you're curious of

```
username: test34
password: 123123
```

## Built on and uses the following:

- Python
- JavaScript
- ReactJS
- NodeJS
- Flask
- PostgreSQL
- Heroku

## Why the above?

## Installation Required

## Planning and Approach

Planning and Tech research was what was tackled first, including the user stories for Dine Roulette.
</br>
References will be made to the below sections, to how this app was planned

First was the user stories, how a person might stumble upon Dine Roulette and decide to use it,
And then was the places data, having used google api in a previous project, one of the alternatives I found was Geoapify.
Geoapify uses opensource maps, it had multiple category search and its free tier was generous.

### Users

As someone who has decision paralysis, help me find a place to eat, instead of spending more time looking for a place.

My group of friends are saying okay to everything, and can't decide on a place to go together,
</br>
please decide, instead of making us choose sides

I'm really craving something right now, find me the closest place thats open, so I can satisfy these munchies

Just had a hard days work, and I'm craving a pint, point me towards a pub, so I don't have to plan for this

### Wireframe

Initial concept and and how the app could flow and interactive was done on Figma,
</br>
this did revealed the amount paths this app would and the amount of potential calls would be needed to the backend
</br>
[Share](https://www.figma.com/file/bUONj8siujR7CFDPURElbo/Dine-Roulette?node-id=0%3A1)
</br>

### Wireframe Screenshots

<img src="./screenshots/figma1.png" width="600">
<img src="./screenshots/figma2.png" width="600">

### ERD and Data Structure planning

<img src="./screenshots/DineRouletteERD.png" width="800">

### Unresolved problems

Originally planned to have reviews, however Zomato API is no longer supported or works
Learnt how to use Python Scrappy to get the reviews, but have not hooked up the data yet
