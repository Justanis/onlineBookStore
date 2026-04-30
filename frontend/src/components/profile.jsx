import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./navigation";
import { Spinner } from "./ui/spinner";

const mockProfileResponse = {
	success: true,
	profile: {
		id: "u1",
		username: "Amine",
		email: "amine@mail.com",
	},
	orders: [
		{
			id: "o1",
			book: {
				id: "b1",
				title: "Atomic Habits",
				cover_image_url:
					"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
			},
			purchased_at: "2026-04-28T12:10:00.000Z",
			amount: 2200,
			status: "finished",
		},
		{
			id: "o2",
			book: {
				id: "b2",
				title: "Deep Work",
				cover_image_url:
					"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
			},
			purchased_at: "2026-04-26T08:30:00.000Z",
			amount: 0,
			status: "pending",
		},
		{
			id: "o3",
			book: {
				id: "b3",
				title: "Clean Code",
				cover_image_url:
					"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
			},
			purchased_at: "2026-04-20T15:50:00.000Z",
			amount: 2800,
			status: "finished",
		},
	],
};

const statusStyles = {
	finished: "border-emerald-400/70 text-emerald-300",
	pending: "border-amber-400/70 text-amber-300",
	cancelled: "border-rose-400/70 text-rose-300",
};

export default function Profile() {
	const { profile, orders } = mockProfileResponse;
	const wishlistOrders = orders.filter((order) => order.status === "pending");
	const purchasedOrders = orders.filter((order) => order.status === "finished");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 500);
		return () => clearTimeout(timer);
	}, []);

	const totals = useMemo(() => {
		return {
			orders: orders.length,
			wishlist: wishlistOrders.length,
			spent: purchasedOrders.reduce((sum, order) => sum + order.amount, 0),
		};
	}, [orders, purchasedOrders, wishlistOrders]);

	return (
		<div className="min-h-screen bg-neutral-950 text-white">
			<Navigation />

			<main className="mx-auto max-w-6xl px-4 py-8">
				<div className="rounded-[32px] border border-white/20 bg-neutral-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
					{loading ? (
						<div className="flex min-h-[320px] items-center justify-center">
							<Spinner className="size-8" />
						</div>
					) : (
						<div>
							<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex items-center gap-4">
							<div className="h-16 w-16 rounded-full border border-white/40 bg-white/10" />
							<div>
								<h1 className="text-2xl font-semibold">{profile.username}</h1>
								<p className="text-sm text-white/60">{profile.email}</p>
							</div>
						</div>
						<div className="flex flex-wrap gap-3 text-sm">
							<div className="rounded-2xl border border-white/20 bg-white/[0.03] px-4 py-2">
								<p className="text-white/60">Orders</p>
								<p className="text-lg font-semibold text-white">
									{totals.orders}
								</p>
							</div>
							<div className="rounded-2xl border border-white/20 bg-white/[0.03] px-4 py-2">
								<p className="text-white/60">Wishlist</p>
								<p className="text-lg font-semibold text-white">
									{totals.wishlist}
								</p>
							</div>
							<div className="rounded-2xl border border-white/20 bg-white/[0.03] px-4 py-2">
								<p className="text-white/60">Total spent</p>
								<p className="text-lg font-semibold text-white">
									{totals.spent} DA
								</p>
							</div>
						</div>
					</div>

						<div className="mt-8 grid gap-6 lg:grid-cols-2">
						<div>
							<h2 className="text-lg font-semibold">Purchased Books</h2>
							<div className="mt-4 space-y-3">
								{purchasedOrders.map((order) => {
									const statusClass =
										statusStyles[order.status] ??
										"border-white/30 text-white/60";

									return (
										<div
											key={order.id}
											className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
										>
											<div className="flex items-center gap-4">
												<Link
													to={`/books/${order.book.id}`}
													className="h-16 w-12 overflow-hidden rounded-lg border border-white/30 bg-neutral-900"
												>
													<img
														src={order.book.cover_image_url}
														alt={order.book.title}
														className="h-full w-full object-cover"
													/>
												</Link>
												<div>
													<Link
														to={`/books/${order.book.id}`}
														className="text-sm font-semibold text-white hover:underline"
													>
														{order.book.title}
													</Link>
													<p className="text-xs text-white/60">
														{new Date(order.purchased_at).toLocaleDateString()}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-4 text-sm">
												<span className="text-white/70">
													{order.amount} DA
												</span>
												<span
													className={`inline-flex items-center rounded-full border px-2 py-1 text-xs capitalize ${statusClass}`}
												>
													{order.status}
												</span>
											</div>
										</div>
									);
								})}
								{purchasedOrders.length === 0 && (
									<p className="text-sm text-white/60">
										No purchased books yet.
									</p>
								)}
							</div>
						</div>

						<div>
							<h2 className="text-lg font-semibold">Wishlist</h2>
							<div className="mt-4 space-y-3">
								{wishlistOrders.map((order) => {
									const statusClass =
										statusStyles[order.status] ??
										"border-white/30 text-white/60";

									return (
										<div
											key={order.id}
											className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
										>
											<div className="flex items-center gap-4">
												<Link
													to={`/books/${order.book.id}`}
													className="h-16 w-12 overflow-hidden rounded-lg border border-white/30 bg-neutral-900"
												>
													<img
														src={order.book.cover_image_url}
														alt={order.book.title}
														className="h-full w-full object-cover"
													/>
												</Link>
												<div>
													<Link
														to={`/books/${order.book.id}`}
														className="text-sm font-semibold text-white hover:underline"
													>
														{order.book.title}
													</Link>
													<p className="text-xs text-white/60">
														{new Date(order.purchased_at).toLocaleDateString()}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-4 text-sm">
												<span className="text-white/70">
													{order.amount} DA
												</span>
												<span
													className={`inline-flex items-center rounded-full border px-2 py-1 text-xs capitalize ${statusClass}`}
												>
													{order.status}
												</span>
											</div>
										</div>
									);
								})}
								{wishlistOrders.length === 0 && (
									<p className="text-sm text-white/60">
										No books saved in wishlist.
									</p>
								)}
							</div>
						</div>
						</div>
					</div>
					)}
				</div>
			</main>
		</div>
	);
}
