import React from "react";

function EpisodeAudio() {
  return (
    <div className="flex flex-col w-2/3 shadow-lg border border-grayLight p-4">
      <h2 className="text-4xl font-bold">Title</h2>
      <p className="italic text-base mt-4">bla bla</p>
      <div className="w-full border-t border-grayLight my-4 pt-4">
        <audio className="w-full" controls>
          <source src="ruta/a/tu/archivo.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
  );
}

export default EpisodeAudio;
