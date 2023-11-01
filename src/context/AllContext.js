//TREAT AS IMPORTANT!!! MAKE SURE THIS FILE IS ASSESIBLE GLOBALLY AND IMPORTED INTO THE APP JS OR THE PARENT COMPONENT. BECAUSE ALL THE CONTEXT GOES HERE
import React, { createContext, useState } from "react";


const AllContext = createContext();

const AllProvider = ({ children }) => {
  const [red, setRed] = React.useState("red");
  const [blue, setBlue] = React.useState("blue");
  const [orange, setOrange] = React.useState("orange");
  const [brown, setBrown] = React.useState("brown");
  const [purple, setPurple] = React.useState("purple");
  const [green, setGreen] = React.useState("green");
  const [black, setBlack] = React.useState("black");
  const [grey, setGrey] = React.useState("grey");
  const [magenta, setMagenta] = React.useState("magenta");
  const [gold, setGold] = React.useState("gold");
  const [indigo, setIndigo] = React.useState("indigo");
  const [sienna, setSienna] = React.useState("sienna");
  const [level, setLevel] = React.useState(1);
  const [lives, setLives] = useState(3);  
  const [totalscore, setTotalscore] = useState(0);
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);

  
  
  return (
    <AllContext.Provider value={{
      red, setRed, blue, setBlue, orange, setOrange, brown, setBrown, purple, setPurple, green, setGreen, black, setBlack, grey, setGrey, magenta, setMagenta, gold, setGold, indigo, setIndigo, sienna, setSienna, level, setLevel, lives, setLives, totalscore, setTotalscore, sound, setSound, music, setMusic,
    }}>
        {children}
        </AllContext.Provider>
        );
  };

export { AllContext, AllProvider };
