import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = ['/'].map(
        (route) => ({
            url: process.env.NEXT_PUBLIC_BASE_URL + route,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'weekly',
            priority: 1,
        })
    );

    return [...routes];
}
