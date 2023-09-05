import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberIncluded, setNumberIncluded] = useState(false);
  const [characterIncluded, setCharacterIncluded] = useState(false);
  const [passward, setPassward] = useState("");
  const passwardRef = useRef(null);
  const passwardGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberIncluded) str += "0123456789";
    if (characterIncluded) str += "@#$%^&*?";
    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      let char = str.charAt(idx);
      pass += char;
    }
    setPassward(pass);
  }, [length, numberIncluded, characterIncluded, setPassward]);
  const copyPasswardClipboard = useCallback(() => {
    passwardRef.current?.select();
    window.navigator.clipboard.writeText(passward);
  }, [passward]);
  useEffect(passwardGenerator, [
    length,
    numberIncluded,
    characterIncluded,
    passwardGenerator,
  ]);
  return (
    <div className="w-full max-w-lg p-7 mx-auto shadow-md rounded-lg my-8 text-orange-500 bg-gray-800">
      <div className="flex flex-col gap-5 text-center  overflow-hidden">
        <h1 className="text-2xl font-semibold text-white">
          Passward Generator
        </h1>
        <div className="w-full flex h-fit">
          <input
            type="text"
            value={passward}
            className=" py-1 text-lg basis-3/4 mb-4 px-3 rounded-l-xl"
            placeholder="Passward"
            ref={passwardRef}
            readOnly
          />
          <button
            className=" rounded-r-xl bg-blue-600 basis-1/4 text-white py-1 mb-4 px-2"
            onClick={copyPasswardClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-lg gap-x-3">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberIncluded}
              id="numberInput"
              onChange={() => {
                setNumberIncluded((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterIncluded}
              id="characterInput"
              onChange={() => {
                setCharacterIncluded((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
