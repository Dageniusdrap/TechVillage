export const metadata = { title: "Property Videos — TechVillage" };

const VIDEOS = [
  { title: "Entebbe Lakeside Walkthrough", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Arua West Nile 3BR Tour", url: "https://www.youtube.com/embed/oHg5SJYRHA0" },
  { title: "Central Uganda Family Home", url: "https://www.youtube.com/embed/FTQbiNvZqaY" },
];

export default function VideosPage() {
  return (
    <main className="section section-pt section-pb">
      <h1 className="text-2xl font-semibold">Property Videos</h1>
      <p className="mt-2 text-slate-600">Explore homes in Entebbe, Arua (West Nile), and Central Uganda.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {VIDEOS.map((v) => (
          <div key={v.title} className="card overflow-hidden">
            <div className="aspect-video">
              <iframe className="h-full w-full" src={v.url} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            <div className="p-3 text-sm font-medium">{v.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
