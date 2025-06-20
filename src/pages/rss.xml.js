import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  return rss({
    title: "Astro Learner | Blog",
    description: "My journey learning Astro",
    site: context.site,
    items: await Promise.all(
      posts.map(async (post) => {
        const { Content } = await post.render();
        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          content: await Content(),
          link: `/posts/${post.id}/`,
        };
      })
    ),
    customData: `<language>en-us</language>`,
  });
}
