import clsx from 'clsx';
import type {GetStaticProps} from 'next';
import Link from 'next/link';
import {HiOutlineExternalLink} from 'react-icons/hi';
import {
	SiAdobe,
	SiArduino,
	SiDiscord,
	SiGit,
	SiGithub,
	SiJavascript,
	SiLinkedin,
	SiPython,
	SiReact,
	SiShopify,
	SiSpotify,
	SiTailwindcss,
	SiVisualstudiocode,
	SiWordpress,
} from 'react-icons/si';
import type {Data} from 'use-lanyard';
import {ContactForm} from '../components/contact-form';
import {CardHoverEffect, hoverClassName} from '../components/hover-card';
import {Time} from '../components/time';
import {useUpdatingLanyard} from '../hooks/lanyard';
import matrix from '../images/matrix.gif';
import me from '../images/me.jpg';
import {env} from '../server/env';
import {getLanyard} from '../server/lanyard';
import {age, discordId} from '../utils/constants';
import {formatList} from '../utils/lists';

export interface Props {
	lanyard: Data;
	location: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const lanyard = await getLanyard(discordId);
	const location = lanyard.kv.location ?? env.DEFAULT_LOCATION;

	return {
		revalidate: 10,
		props: {
			location,
			lanyard,
		},
	};
};

export default function Home(props: Props) {
	const {data: lanyard} = useUpdatingLanyard(discordId, props.lanyard);

	const status = lanyard.discord_status ?? 'offline';

	return (
		<main className="mx-auto grid max-w-3xl grid-cols-6 gap-6 px-6 pb-40 pt-16">
			<div className="col-span-6 flex items-center justify-center overflow-hidden rounded-2xl bg-blue-200 dark:border-blue-500 dark:bg-blue-500/20 dark:shadow-none dark:backdrop-blur-2xl md:col-span-4 md:h-52">
				<div className="flex flex-col items-center space-y-4 px-6 py-8 md:flex-row md:space-x-4 md:space-y-0">
					<img
						src={me.src}
						placeholder="blur"
						height={96}
						width={96}
						className="h-24 w-24 rounded-full border border-blue-500 object-cover"
						alt="Photo of me"
					/>

					<div className="space-y-1">
						<h1 className="text-center font-title text-xl font-bold text-blue-900 dark:text-blue-300 dark:text-glow-pink-500/50 md:text-left">
							Charlie Joiner
						</h1>

						<p className="text-center text-blue-800 dark:text-blue-300/95 dark:text-glow-blue-500/50 md:text-left">
							{age} y/o web developer & comp sys eng 🪄
						</p>
						<p className="text-center text-sm text-blue-800 dark:text-blue-300/95 dark:text-glow-blue-500/50 md:text-left">
							I am currently learning typescript & threejs.
							<br />
							<br />
							I'm actively looking for work, so send me a message below
						</p>
					</div>
				</div>
			</div>

			<CardHoverEffect className="col-span-3 h-full md:col-span-2">
				<Link
					href="https://www.linkedin.com/in/charliejj/"
					target="_blank"
					rel="noopener noreferrer"
					className={clsx(
						'flex h-full items-center justify-center rounded-2xl bg-sky-700 text-4xl text-white',
						hoverClassName,
					)}
				>
					<span className="sr-only">Linkedin</span>
					<span className="transform-gpu transition duration-500 group-hover:scale-[1.3]">
						<SiLinkedin />
					</span>
				</Link>
			</CardHoverEffect>

			<div
				className={clsx(
					'col-span-3 flex h-52 items-center justify-center rounded-2xl text-4xl md:col-span-2',
					{
						online: 'bg-green-400 text-green-900 dark:bg-green-600 dark:text-green-50',
						idle: 'bg-orange-400 text-orange-50 ',
						dnd: 'bg-red-500 text-red-100 dark:bg-red-600',
						offline: 'bg-blurple text-white/90',
					}[status],
				)}
			>
				<div className="-rotate-[4deg] scale-[1] space-y-1 text-center md:scale-[1.2]">
					<h2>
						<SiDiscord className="inline" /> <span>{status}</span>
					</h2>

					<p className="text-base">
						<span>@{lanyard.discord_user.username}</span>
					</p>
				</div>
			</div>

			<Time />

			<CardHoverEffect className="col-span-3 h-full md:col-span-3">
				<Link
					href="https://github.com/charliejjoiner"
					target="_blank"
					rel="noopener noreferrer"
					className={clsx(
						'group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl text-white',
						hoverClassName,
					)}
				>
					<span aria-hidden className="pointer-events-none absolute inset-0 -z-20">
						<img
							src={matrix.src}
							alt="The Matrix scrolling characters effect"
							className="absolute inset-0 h-full w-full object-cover object-center"
						/>

						<span
							aria-hidden
							className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-neutral-900/20 dark:bg-neutral-900/50"
						/>
					</span>

					<span aria-hidden className="px-6 pt-6">
						<span className="flex justify-between">
							<SiGithub className="text-3xl" />
							<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
						</span>
					</span>

					<span className="space-y-0.5 px-6 pb-6">
						<span className="block font-title font-bold">GitHub</span>

						<span className="block text-sm">My open source work &amp; contributions.</span>
					</span>
				</Link>
			</CardHoverEffect>

			<CardHoverEffect className="col-span-4 h-52">
				{!lanyard?.spotify || !lanyard.spotify.album_art_url ? (
					<Link
						href="https://open.spotify.com/playlist/2Ith94Euza0LXuwEMpFbNS?si=0cbe4a822d7c4170"
						target="_blank"
						rel="noopener noreferrer"
						className={clsx('group relative flex h-full overflow-hidden rounded-2xl', hoverClassName)}
					>
						<span className="absolute inset-0 -z-10">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://i.scdn.co/image/ab67706c0000da847b219f6303deafc7138840dd"
								className="absolute inset-0 h-full w-full bg-black object-cover object-center brightness-50"
								alt="Album cover art"
							/>
						</span>

						<span className="flex flex-1 flex-col justify-between p-6 text-white">
							<span className="flex justify-between">
								<SiSpotify className="text-2xl" />
								<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
							</span>

							<div className="space-y-0.5">
								<h2 className="font-title font-bold">
									<span className="font-medium">playlist:</span> Choons
								</h2>

								<p className="text-sm">The playlist with my currently favourite songs.</p>
							</div>
						</span>
					</Link>
				) : (
					<Link
						href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
						target="_blank"
						rel="noopener noreferrer"
						className={clsx('group relative flex h-full overflow-hidden rounded-2xl', hoverClassName)}
					>
						<span className="absolute inset-0 -z-10">
							<img
								src={lanyard.spotify.album_art_url}
								className="absolute inset-0 h-full w-full bg-black object-cover object-center brightness-50 transition-all duration-500 will-change-[transform,_filter] group-hover:scale-[1.15] group-hover:brightness-[0.4]"
								alt="Album cover art"
							/>
						</span>

						<span className="flex flex-1 flex-col justify-between p-6 text-white">
							<span className="flex justify-between">
								<SiSpotify className="text-2xl" />
								<HiOutlineExternalLink className="text-xl opacity-50 transition duration-500 group-hover:opacity-100" />
							</span>

							<span>
								<h2>
									<span
										className="mb-0.5 mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"
										aria-hidden
									/>{' '}
									Listening to{' '}
									<span className="font-bold" suppressHydrationWarning>
										{lanyard.spotify.song}
									</span>{' '}
									by{' '}
									<span className="font-bold" suppressHydrationWarning>
										{formatList(lanyard.spotify.artist.split('; '), 'conjunction')}
									</span>
									.
								</h2>
							</span>
						</span>
					</Link>
				)}
			</CardHoverEffect>

			<div className="col-span-2 flex items-center justify-center rounded-2xl bg-fuchsia-700 p-6 text-fuchsia-100 md:col-span-2">
				<div className="grid w-full grid-cols-4 grid-rows-4 gap-4 [&>svg]:w-full [&>svg]:text-center">
					<SiAdobe size={24} />
					<SiArduino size={24} />
					<SiDiscord size={24} />
					<SiGithub size={24} />
					<SiJavascript size={24} />
					<SiPython size={24} />
					<SiReact size={24} />
					<SiShopify size={24} />
					<SiSpotify size={24} />
					<SiTailwindcss size={24} />
					<SiVisualstudiocode size={24} />
					<SiWordpress size={24} />
					<SiGit size={24} />
				</div>
			</div>

			<div className="col-span-6 space-y-2 rounded-2xl bg-indigo-800 p-6 md:col-span-6">
				<h2 className="font-title text-xl font-bold">
					Hello world <span className="inline dark:hidden">⭐</span>
					<span className="hidden dark:inline">⭐</span>
				</h2>

				<p className="text-white">
					My name is Charlie, a recent graduate of The University of Kent in Computer Systems Engineering. I've been
					programming for as long as I can remember, Ive programmed from Arduino to RTOS RFID race timing systems but I
					enjoy web development the most.
				</p>

				<p>
					Beyond programming, I'm really interested in photography you can often catch me spending time out with my
					camera. Either that or I'll be playing games like apex legends & call of duty.
				</p>
			</div>

			<div className="col-span-6 space-y-4 rounded-2xl bg-lime-400 p-6 text-black dark:bg-lime-500 md:col-span-6">
				<ContactForm />
			</div>
		</main>
	);
}
