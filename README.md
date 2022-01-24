# HCAIDApp

This app was created for people who are into league of legends. 
It predicts whether or not a team from the worlds championship (so basically the biggest tournament of the year) wins the worlds cup

This app does not use personal data. Only data that has been shared with the public. The games that were used in the training can all be found on youtube, twitch or the official Lolesports site.

The accuracy of the app is good enough (70%). This is because it is trying to predict the outcome of match that is entirely based on human behaviour which is very unpredictable. 
Also the games used in its training are from 2020-2021 so during that time the game has been patched and updated quite a few times... so it's trying to find an prediction to an ever evolving equation. 

That's why 70% is a pretty high accuracy.

Also a little side note..

If ya wanna run this app yourself... after the installation of the node-modules
go to tensorflow-core module... and search for the file hash_util.d.ts and import the Long library.
Otherwise the app won't run.
