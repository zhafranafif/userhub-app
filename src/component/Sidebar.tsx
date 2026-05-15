"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import Logo from "../../public/userhub-logo.svg";
import { Home, Users, X, Menu } from "lucide-react";

type SidebarItem = {
	label: string;
	to: string;
	icon: ReactNode;
};

const sidebarItems: SidebarItem[] = [
	{
		label: "Home",
		to: "/",
		icon: <Home />,
	},
	{
		label: "Users",
		to: "/users",
		icon: <Users />,
	},
];

export default function Sidebar({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const isActive = (to: string) => {
		if (to === "/") {
			return pathname === "/";
		}

		return pathname === to || pathname.startsWith(`${to}/`);
	};

	return (
		<div className="min-h-screen bg-background text-foreground md:flex">
			<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-secondary/80 bg-background/95 px-4 backdrop-blur md:hidden">
				<Link href="/" className="flex items-center gap-3">
					<Image src={Logo} alt="UserHub" width={150} height={150} loading="eager" fetchPriority="high" />
				</Link>

				<button
					type="button"
					aria-label={isOpen ? "Close navigation" : "Open navigation"}
					aria-expanded={isOpen}
					onClick={() => setIsOpen((current) => !current)}
					className="inline-flex h-10 w-10 items-center justify-center text-foreground transition hover:cursor-pointer"
				>
					<Menu />
				</button>
			</header>

			<aside
				className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-secondary bg-white shadow-[0_24px_80px_rgba(49,48,47,0.12)] transition-transform duration-300 md:static md:z-auto md:translate-x-0 md:shadow-none ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex h-full flex-col">
					<div className="flex flex-col-reverse items-center justify-center border-b border-secondary">
						<Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
							<Image src={Logo} alt="UserHub" width={200} loading="eager" fetchPriority="high" />
						</Link>

						<button
							type="button"
							aria-label="Close navigation"
							onClick={() => setIsOpen(false)}
							className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:cursor-pointer md:hidden"
						>
							<X />
						</button>
					</div>

					<nav className="flex-1 px-4 py-6">


						<ul className="mt-4 space-y-1">
							{sidebarItems.map((item) => {
								return (
									<li key={item.label}>
										<Link
											href={item.to}
											onClick={() => setIsOpen(false)}
											className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
												isActive(item.to)
													? "bg-light-primary text-primary"
													: "hover:bg-light-primary hover:text-primary"
											}`}
										>
											<span className={"text-primary text-lg font-bold"}>
												{item.icon}
											</span>
											<span className="flex-1 text-primary text-lg font-bold">{item.label}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			</aside>

			{isOpen ? (
				<button
					type="button"
					aria-label="Close navigation overlay"
					onClick={() => setIsOpen(false)}
					className="fixed inset-0 z-40 bg-black/25 md:hidden"
				/>
			) : null}

			<main className="min-w-0 flex-1">{children}</main>
		</div>
	);
}