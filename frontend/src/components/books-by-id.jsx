import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./navigation";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const mockBookDetails = [
  {
    id: "b1",
    title: "Book 3",
    genres: [{ id: "g5", name: "Novel" }],
    author: "Unknown",
    rating: 4.3,
    price: 1900,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac nulla et lorem tempor mattis. Maecenas eu lacus et sapien.",
    cover_image_url:
      "https://images.unsplash.com/photo-1455885666463-2c01dc35fbf7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "b2",
    title: "The Stranger",
    genres: [{ id: "g2", name: "Culture" }],
    author: "Albert Camus",
    rating: 4.6,
    price: 2200,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    cover_image_url:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function BooksById() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const book = useMemo(() => {
    return mockBookDetails.find((item) => item.id === id) ?? mockBookDetails[0];
  }, [id]);

  const genreLabel = book.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navigation />

      <div className="relative overflow-hidden h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl"
          style={{ backgroundImage: `url(${book.cover_image_url})` }}
        />
        <div className="absolute inset-0 bg-neutral-950/80" />

        <main className="relative mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-[32px] border border-white/30 bg-neutral-950/90 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center">
                <Spinner className="size-8" />
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div className="flex flex-col items-start gap-4">
                  <div className="h-72 w-52 overflow-hidden rounded-2xl border border-white/30 bg-neutral-900">
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button className="bg-sky-500 text-white hover:bg-sky-400">
                    + Add to Readlist
                  </Button>
                </div>

                <div className="space-y-3">
                  <h1 className="text-2xl font-semibold">{book.title}</h1>
                  <p className="text-sm text-white/70">Genre</p>
                  <p className="text-sm text-white/90">{genreLabel}</p>
                  <p className="text-sm text-white/70">Author, Year</p>
                  <p className="text-sm text-white/90">
                    {book.author}, 2024
                  </p>
                  <p className="text-sm text-white/70">Price</p>
                  <p className="text-sm text-white/90">{book.price} DA</p>
                  <p className="pt-2 text-sm text-white/70">Description</p>
                  <p className="text-sm text-white/80">{book.description}</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
