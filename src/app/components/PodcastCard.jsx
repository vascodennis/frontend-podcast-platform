export const PodcastCard = () => {
  return (
    <div className="w-56 h-32 flex flex-col rounded shadow-lg border border-grayLight items-center justify-center relative">
      <div
        className="w-24 h-24 rounded-full absolute -top-12"
        style={{
          backgroundImage: `url('../vercel.svg')`,
          zIndex: 10,
        }}
      ></div>
      <h3 className="mt-10">Podcast Ts</h3>
      <p>Author: teste</p>
    </div>
  );
};
