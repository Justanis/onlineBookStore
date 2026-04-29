import { useEffect, useMemo, useState } from "react";
import Navigation from "./navigation";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

const mockRecentBooksResponse = {
	success: true,
	books: [
		{
			id: "b1",
			title: "Book 1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac nulla et lorem tempor mattis.",
			cover_image_url:
				"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
		},
		{
			id: "b2",
			title: "Book 2",
			description:
				"Maecenas eu lacus et sapien gravida auctor. Sed ut orci in nunc tincidunt aliquet.",
			cover_image_url:
				"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
		},
		{
			id: "b3",
			title: "Book 3",
			description:
				"Integer posuere nisi at elit cursus, id vehicula justo pretium. Cras ut massa velit.",
			cover_image_url:
				"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
		},
		{
			id: "b4",
			title: "Book 4",
			description:
				"Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
			cover_image_url:
				"https://images.unsplash.com/photo-1455885666463-2c01dc35fbf7?auto=format&fit=crop&w=1200&q=80",
		},
		{
			id: "b5",
			title: "Book 5",
			description:
				"Quisque at nibh in lorem faucibus fermentum. Suspendisse potenti in semper.",
			cover_image_url:
				"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
		},
		{
			id: "b6",
			title: "Book 6",
			description:
				"Praesent tincidunt mi vel lectus pretium, nec fringilla neque gravida.",
			cover_image_url:
				"https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
		},
	],
};

export default function Home() {
	const { books } = mockRecentBooksResponse;
	const [carouselApi, setCarouselApi] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		if (!carouselApi) {
			return;
		}

		const handleSelect = () => {
			setSelectedIndex(carouselApi.selectedScrollSnap());
		};

		handleSelect();
		carouselApi.on("select", handleSelect);

		return () => {
			carouselApi.off("select", handleSelect);
		};
	}, [carouselApi]);

	const featuredBooks = useMemo(() => books.slice(0, 6), [books]);
	const selectedBook = books[selectedIndex] ?? books[0];

	return (
		<div className="min-h-screen bg-neutral-950 text-white">
			<Navigation />

			<main className="px-4 pb-10 pt-6">
				<div className="mx-auto max-w-6xl rounded-[32px] border border-white/30 bg-neutral-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
					<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
						<div className="rounded-[28px] border border-white/20 bg-neutral-900/70 p-5">
							<div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-neutral-800">
								<Carousel setApi={setCarouselApi} className="relative">
									<CarouselContent>
										{books.map((book) => (
											<CarouselItem key={book.id}>
												<div className="relative h-[280px] w-full overflow-hidden">
													<img
														src={book.cover_image_url}
														alt={book.title}
														className="absolute inset-0 h-full w-full object-cover"
													/>
													<div className="absolute inset-0 bg-neutral-900/50" />
												</div>
											</CarouselItem>
										))}
									</CarouselContent>
									<CarouselPrevious className="left-4" />
									<CarouselNext className="right-4" />
								</Carousel>
							</div>

							<div className="mt-4">
								<h2 className="text-2xl font-semibold">{selectedBook.title}</h2>
								<p className="mt-2 text-sm text-white/70">
									{selectedBook.description}
								</p>
							</div>
						</div>

						<aside className="rounded-[28px] border border-violet-400/60 bg-neutral-950 p-5">
							<h3 className="text-lg font-semibold text-white/90">Featured</h3>
							<div className="mt-4 space-y-3">
								{featuredBooks.map((book, index) => {
									const isActive = index === selectedIndex;

									return (
										<button
											key={book.id}
											type="button"
											onClick={() => {
												setSelectedIndex(index);
												carouselApi?.scrollTo(index);
											}}
											className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition ${
												isActive
													? "border-rose-400/80 text-white"
													: "border-white/20 text-white/70 hover:border-white/40"
											}`}
										>
											<span className="h-7 w-7 rounded-md border border-white/20 bg-white/10" />
											<span>{book.title}</span>
										</button>
									);
								})}
							</div>
						</aside>
					</div>
				</div>
			</main>
		</div>
	);
}
