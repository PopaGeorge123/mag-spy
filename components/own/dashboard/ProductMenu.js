"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ProductMenu() {

	const currentLinks = [
		{
			name: 'Stats',
			href: 'stats',
		},
		{
			name: 'Alerts',
			href: 'alerts',
		},
		// {
		// 	name: 'Webhooks',
		// 	href: 'webhooks',
		// },
		{
			name: 'Edit Product',
			href: 'edit',
		},
	];


	const pathname = usePathname();
	let active = pathname.split('/');
	let lastRoute = active[active.length - 1];

	let isAlertPage = active[active.length-2] === 'alerts';

	return (
		<div className='flex w-full flex-row items-center justify-center'>
			{isAlertPage && (
			<a href='javascript:history.back()' className='justify-self-start flex mb-5 flex-row items-center justify-center'>
				<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
				</svg>
				<h1> Back </h1>
			</a>
			)}
			<div className="mb-5 rounded-md shadow-sm">
				{!isAlertPage && currentLinks.map((link, key) => (
					<a
						key={key}
						href={link.href}
						aria-current="page"
						className={`${lastRoute === link.href ? 'text-white bg-gray-600' : ''} 
											${key === 0 ? 'rounded-l-md' : ''}
											${key === currentLinks.length - 1 ? 'rounded-r-md' : ''}
											px-4 py-2 text-sm font-medium border border-gray-500 hover:bg-gray-700`}
					>
						{link.name}
					</a>
				))}
			</div>
		</div>
	);
}
