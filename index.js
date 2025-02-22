/* Config */
const twitchTvHandle = "SpencerKPTV";
const PAUSE_DURATION = 30 * 1000; // 30 seconds
const DISPLAY_DURATION = 10 * 1000; // 10 seconds

/* DOM */
const container = document.querySelector(".alerts");
const img = new Image();
const queue = new Queue();

/* Sound Effects */
const pewAudio = new Audio("horn.wav");
const magicChime = new Audio("Magic_Chime.mp3");

/* GIFs */
const beyGif = "https://media.giphy.com/media/VxkNDa92gcsRq/giphy.gif";
const welcomeGif = "https://media.giphy.com/media/l3V0doGbp2EDaLHJC/giphy.gif";
const pizzaGif = "https://media.giphy.com/media/3o6nUXaNE4wdhq8Foc/giphy.gif";


// Resolve promise after duration
const wait = async duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

const pauseSpotify = () => {
  fetch("https://serve.onegraph.com/graphql?app_id=cdf2ebe1-3ad3-408a-81c0-1ed675d76411", {body: '{"doc_id": "10fccd15-1a55-4a27-877a-a63106b4bd11"}', method: "POST"})
}

ComfyJS.Init(twitchTvHandle);
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(`!${command} was typed in chat`);

  if (command == "yo") {
    new gifAlert(user, beyGif, pewAudio, command);
  }

  if (command == "welcome") {
    new gifAlert(message, welcomeGif, magicChime, command);
  }
  // Ok, ready!
  if(command == "music") {
    new gifAlert(user, beyGif, pewAudio, command);
    // Please don't stop the music
    fetch("https://serve.onegraph.com/graphql?app_id=cdf2ebe1-3ad3-408a-81c0-1ed675d76411", {body: '{"doc_id": "e5e25f29-7862-4f23-8f53-8fb4373a0672"}', method: "POST"})

    const EVADE_THE_DMCA_BAN_LENGTH = 2500;
    setTimeout(() => {
      // Well, stop it after 2.5 seconds...
      // Pause the player
      pauseSpotify();
    }, EVADE_THE_DMCA_BAN_LENGTH)
  }

  if (flags.broadcaster && command == "pizza") {
    new gifAlert(message, pizzaGif, magicChime, command);
  }

  if (flags.broadcaster && command == "pause") {
    // Clear GIF queue and pause for PAUSE_DURATION
    queue.clear();
    queue.pause(PAUSE_DURATION);
  }
};

ComfyJS.onChat = (user, message, flags, self, extra) => {
  console.log(user + ":", message);
};

const generateTitle = {
  yo: " is hype!",
  welcome: " needs a welcome!",
  pizza: " needed a pizza party!",
  music: " stopped the music!"
};

function gifAlert(user, gif, audio, type) {
  queue.add(async () => {
    audio.play();
    container.innerHTML = `
      <h1 class="text-shadows">${user + generateTitle[type]}</h1>
      <img src="${gif}" />
    `;
    container.style.opacity = 1;

    await wait(DISPLAY_DURATION);

    if (!queue.isLooping) {
      container.style.opacity = 0;
    }

  });
}
