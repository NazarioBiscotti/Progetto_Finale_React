export default function Card({ game }) {
  return (
    <div className="rounded-2xl group w-full flex flex-col bg-black border border-white/10 overflow-hidden">

      {/* IMAGE */}
      <div className="h-50 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={game.background_image}
          alt={game.name}
        />
      </div>

      {/* NAME */}
      <div className=" w-full bg-black/80 text-white tracking-widest px-3 py-2 border-b border-white/10 ">
        {game.name}
      </div>

      {/* GENRE */}
      <div className="flex flex-wrap gap-2 p-3 bg-black">
        {game.genres.map((el) => (
          <div key={el.id} className="text-xs uppercase px-2 py-1 border border-cyan-400/40 text-cyan-300 bg-cyan-400/10 tracking-wide" >
            {el.name}
          </div>
        ))}
      </div>

    </div>
  );
}