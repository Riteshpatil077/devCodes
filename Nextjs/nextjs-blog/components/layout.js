import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';  // dynamic import component 

const ThemeToggle = dynamic(() => import('./theme-toggle'), {
    ssr: false,
}); // ssr: false means component will not be rendered on server

const name = 'Dangerous Dan';
export const siteTitle = 'Dangerous Dan | Web Developer Blog';

export default function Layout({ children, home, pageTitle, description }) {
    const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
    const defaultDescription = description || "Explore the world of web development and chaos organization with Dangerous Dan.";

    return (
        <div className={styles.container}>
            <ThemeToggle />
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
                <meta name="description" content={defaultDescription} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={defaultDescription} />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={defaultDescription} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/image.jpg"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/image.jpg"
                                className={utilStyles.borderCircle}
                                height={108}
                                width={108}
                                alt={name}
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colorInherit}>
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    );
}