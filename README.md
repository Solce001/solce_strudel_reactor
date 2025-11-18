# DJ Solce's Strudel Player
Welcome weary marker! Here be another strudel demo.

## Wait a minute, where am I?
Do not fear my friend, you are on GitHub.com. This here repository that you're checking out contains a web-based preprocessor for a live-coding music platform that allows users to compose and manipulate patterns using Strudel.cc bakery code!

## What do the various controls do?
- **Play/Pause Buttons** - Starts or stops the music. Yeah!
- **CPM Range** - Adjusts the cycles per minute between 20 and 300, affecting the tempo of the track.
- **Volume Slider** - Adjusts the overall volume of the track up and down.
- **Pattern Selector** - Choose from 1 of 3 pre-mixed gain patterns to spice up your life.
- **Bass Line Radios** - Choose from 1 of 2 bass lines! The choices!
- **Mute List** - Toggle mute on individual instruments for full control. This is for the Players.
- **Load Preset** - Loads a set of previously mixed DJ Control presets from a handy dandy little file in the data folder. Groovy!
- **Save Preset** - Saves all the DJ Control settings into a neat little JSON file that can then be dropped into the data folder (and renamed) and loaded from so you're back in the action


## What's quirky that you'd like to highlight about this project?
- My volume slider dynamically adjusts the total track volume whilst preserving each instruments' balance
- The CPM input has validation to prevent you from doing crazy things, like entering letters or nothing.
- While we're on it, the CPM input also very neatly only updates when you click off the input (rather than updating with every. single. keystroke.)
- The whole thing is in dark mode, pretty nice right? Right??
- Admittedly, some controls and inputs seem like a bit of a funky pairing. I hear ya. I agree! But you can't lie that it demonstrates a great range of my boostrap and react mastery (and this is an assessable piece, so the rubric reigns supreme)

## Can I see a live demo video?
I thought you'd never ask:

## Wow, that was fantastic! I would love to give you so many bonus points!
Thank you, thank you kindly. For my humble work I'd appreciate a few bonus points for bringing some enthusiasm to the table.

## DJ Solce, those are some gnarly beats. Where can I hear more?
Right where the rightful owners share their work. Song code is Overlord Mark's remix of a track by Algorave Dave found here: https://www.youtube.com/watch?v=ZCcpWzhekEY

## I've forgotten where I am again. What scripts do I need to run this thing?

### `npm install`

Intalls the required packages.

### `d3 install`

Intalls d3 (if not already installed in required pacakges).

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
