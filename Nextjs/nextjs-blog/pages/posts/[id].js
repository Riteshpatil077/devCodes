import Head from 'next/head';
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ postData }) {
    // Structured Data for Google (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": postData.title,
        "datePublished": postData.date,
        "author": [{
            "@type": "Person",
            "name": "Dangerous Dan",
            "url": "https://yourdomain.com"
        }]
    };

    return (
        <Layout
            pageTitle={postData.title}
            description={postData.contentHtml.replace(/<[^>]*>?/gm, '').substring(0, 160)}
        >
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}