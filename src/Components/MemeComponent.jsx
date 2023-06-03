import { useState, useEffect } from "react";

export default function MemeComponent() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1ur9b0.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);

    const url = allMemes[randomNumber].url;
    // console.log(url);
    setMeme((prevState) => {
      return {
        ...prevState,
        randomImage: url,
      };
    });
  }

  return (
    <main className="meme-el">
      <div className="form-el">
        <div className="input-el">
          <input
            type="text"
            name="topText"
            value={meme.topText}
            id="upper-text"
            className="text-input"
            placeholder="Upper Text"
            onChange={handleChange}
          />
          <input
            type="text"
            name="bottomText"
            value={meme.bottomText}
            id="lower-text"
            className="text-input"
            placeholder="Lower Text"
            onChange={handleChange}
          />
        </div>
        <button className="submit-btn" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme-image" />
        <h2 className="meme-text top-text">{meme.topText}</h2>
        <h2 className="meme-text bottom-text">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
