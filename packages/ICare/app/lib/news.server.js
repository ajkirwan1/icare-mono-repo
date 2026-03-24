import { sanity } from "./sanity.server";

const LOCAL_NEWS_POSTS = [
  {
    _id: "local-when-does-an-elderly-parent-need-extra-help-at-home",
    _type: "newsPost",
    title: "When Does an Elderly Parent Need Extra Help at Home?",
    subtitle: "Recognising the early signs and understanding what support can look like",
    slug: "when-does-an-elderly-parent-need-extra-help-at-home",
    publishedAt: "2026-03-24T12:00:00.000Z",
    _updatedAt: "2026-03-24T12:00:00.000Z",
    excerpt:
      "Many families reach a point where they start wondering whether an elderly parent needs extra support at home. Here are some of the most common signs to look out for, and what kind of help families often start with.",
    metaDescription:
      "Not sure when an elderly parent may need extra help at home? Here are 7 common signs families notice, plus simple ways to start getting support.",
    heroImage: null,
    tags: ["Families", "Elderly Care", "Support at Home", "Companionship", "Care Decisions"],
    featuredQuote: null,
    isFeatured: false,
    body: [
      portableBlock("h2", "Introduction"),
      portableBlock(
        "normal",
        "Caring for a parent often happens gradually. At first, it is small things: helping with shopping, checking in more often, organising appointments."
      ),
      portableBlock("normal", "But over time, many families start asking the same question:"),
      portableBlock("normal", "\"At what point do we actually need extra help?\""),
      portableBlock(
        "normal",
        "There is rarely one single moment. More often, there are signs that begin to build over time. Recognising them early can make things easier for everyone involved and can help families make calmer, more confident decisions."
      ),
      {
        _type: "youtubeEmbed",
        _key: "local-youtube-embed-1",
        url: "https://www.youtube.com/watch?v=meSJgY5R20M",
        title: "When does an elderly parent need extra help at home?",
        caption: "A short video on recognising when extra support at home may be needed.",
      },
      portableBlock("h2", "1. Daily tasks are becoming difficult"),
      portableBlock(
        "normal",
        "If simple day-to-day tasks start taking much longer, or begin to get avoided altogether, this is often one of the first indicators that some extra support could help."
      ),
      portableBlock("normal", "This may include:"),
      portableBullet("cooking"),
      portableBullet("cleaning"),
      portableBullet("getting dressed"),
      portableBullet("managing laundry"),
      portableBlock(
        "normal",
        "Even small difficulties with everyday routines can gradually affect confidence, wellbeing, and independence."
      ),
      portableBlock("h2", "2. Changes in memory or routine"),
      portableBlock("normal", "Many families first notice subtle but repeated changes, such as:"),
      portableBullet("forgetting appointments"),
      portableBullet("repeating the same questions"),
      portableBullet("confusion about the day, date, or time"),
      portableBlock(
        "normal",
        "This does not always mean something serious is happening, but it can be a sign that more structure, reassurance, or regular support may be needed."
      ),
      portableBlock("h2", "3. Increased risk at home"),
      portableBlock(
        "normal",
        "Safety concerns are often the point at which families begin seriously thinking about extra help."
      ),
      portableBlock("normal", "Look out for things like:"),
      portableBullet("small falls or near misses"),
      portableBullet("leaving appliances on"),
      portableBullet("difficulty moving safely around the home"),
      portableBlock(
        "normal",
        "When the home starts to feel less safe, practical support can reduce risk and ease anxiety for everyone."
      ),
      portableBlock("h2", "4. You are feeling overwhelmed"),
      portableBlock(
        "normal",
        "This is one of the most important signs, and one of the easiest to ignore."
      ),
      portableBlock("normal", "If you feel:"),
      portableBullet("constantly tired"),
      portableBullet("stressed"),
      portableBullet("like you are always on call"),
      portableBlock(
        "normal",
        "It may be a sign that the current situation is not sustainable in the long term."
      ),
      portableBlock(
        "normal",
        "Support is not only about your parent's needs. It is also about making sure you are not carrying more than is realistic on your own."
      ),
      portableBlock("h2", "5. Social isolation"),
      portableBlock("normal", "If your parent:"),
      portableBullet("rarely leaves the house"),
      portableBullet("no longer sees friends"),
      portableBullet("spends most of the day alone"),
      portableBlock("normal", "Companionship can make a significant difference."),
      portableBlock(
        "normal",
        "Sometimes what a person needs most is not intensive care, but regular human contact, conversation, and encouragement to stay connected with everyday life."
      ),
      portableBlock("h2", "6. Personal care is being neglected"),
      portableBlock("normal", "Changes in personal care can be another important sign."),
      portableBlock("normal", "This may look like:"),
      portableBullet("wearing the same clothes repeatedly"),
      portableBullet("noticeable changes in hygiene"),
      portableBullet("weight loss or poor eating habits"),
      portableBlock(
        "normal",
        "These signs often suggest that some regular support would help maintain comfort, dignity, and routine."
      ),
      portableBlock("h2", "7. You are starting to worry more than usual"),
      portableBlock(
        "normal",
        "Sometimes there is no single major issue. Instead, there is a growing feeling that something is not quite right."
      ),
      portableBlock("normal", "That intuition is often worth paying attention to."),
      portableBlock(
        "normal",
        "Families often notice patterns before they can clearly explain them. If you are starting to feel more concerned than usual, it may be time to explore what support could look like."
      ),
      portableBlock("h2", "What kind of help do families usually start with?"),
      portableBlock("normal", "Extra help does not have to mean full-time care."),
      portableBlock("normal", "Many families begin with:"),
      portableBullet("a few hours of support each week"),
      portableBullet("companionship visits"),
      portableBullet("help with routine and day-to-day tasks"),
      portableBlock(
        "normal",
        "Simple, flexible support can take a significant amount of pressure off and help everyone adjust gradually."
      ),
      portableBlock("h2", "A more flexible way to find support"),
      portableBlock(
        "normal",
        "Some families prefer to speak directly with independent caregivers, so they can agree together on the kind of support needed, the schedule, and expectations."
      ),
      portableBlock(
        "normal",
        "For many people, this can make the process feel more natural, more personal, and less overwhelming."
      ),
      portableBlock("h2", "Final thought"),
      portableBlock("normal", "Getting help is not about giving up responsibility."),
      portableBlock(
        "normal",
        "It is about making sure both you and your parent are supported before things become too difficult."
      ),
      portableBlock(
        "normal",
        "Recognising the signs early can give you more time, more choice, and a better chance of putting the right support in place."
      ),
    ],
  },
];

function portableBlock(style, text) {
  return {
    _type: "block",
    _key: `${style}-${text.slice(0, 24).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${text.slice(0, 24).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        text,
        marks: [],
      },
    ],
  };
}

function portableBullet(text) {
  return {
    ...portableBlock("normal", text),
    listItem: "bullet",
    level: 1,
  };
}

function sortNewsPosts(posts) {
  return [...posts].sort((a, b) => {
    const featuredDelta = Number(Boolean(b?.isFeatured)) - Number(Boolean(a?.isFeatured));
    if (featuredDelta !== 0) {
      return featuredDelta;
    }

    return new Date(b?.publishedAt || 0).getTime() - new Date(a?.publishedAt || 0).getTime();
  });
}

function mergeNewsPosts(remotePosts = []) {
  const bySlug = new Map();

  for (const post of [...remotePosts, ...LOCAL_NEWS_POSTS]) {
    const slug = String(post?.slug || "").trim();
    if (!slug) {
      continue;
    }
    bySlug.set(slug, post);
  }

  return sortNewsPosts(Array.from(bySlug.values()));
}

const NEWS_LIST_PAGED_QUERY = `
  *[_type == "newsPost" && defined(slug.current)]
  | order(isFeatured desc, publishedAt desc)[$offset...$end]{
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage,
    tags,
    featuredQuote
  }
`;


const NEWS_BY_SLUG_QUERY = /* groq */ `
  *[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    excerpt,
    metaDescription,
    heroImage,
    tags,
    body
  }
`;

const RELATED_NEWS_QUERY = `
*[
  _type == "newsPost" &&
  _id != $id &&
  count(tags[@ in $tags]) > 0 &&
  defined(slug.current)
]
| order(publishedAt desc)[0...5]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  heroImage
}
`;

const NEWS_BY_TAG_QUERY = `
  *[
    _type == "newsPost" &&
    defined(slug.current) &&
    $tag in tags
  ]
  | order(isFeatured desc, publishedAt desc)[0...50]{
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage,
    tags
  }
`;

const TAGS_WITH_COUNTS_QUERY = `
{
  "tags": *[_type == "newsPost" && defined(tags)]{
    tags
  }
}
`;

const NEWS_COUNT_QUERY = `
  count(*[_type == "newsPost" && defined(slug.current)])
`;

const PINNED_INDEPENDENT_NEWS_QUERY = `
  *[
    _type == "newsPost" &&
    defined(slug.current) &&
    (
      title match "*Working as an independent*" ||
      title match "*working as an independent*"
    )
  ]
  | order(isFeatured desc, publishedAt desc)[0]{
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage,
    tags,
    featuredQuote
  }
`;

export async function getNewsByTag(tag) {
  const remotePosts = await sanity.fetch(NEWS_BY_TAG_QUERY, { tag });
  return mergeNewsPosts(remotePosts).filter((post) => Array.isArray(post.tags) && post.tags.includes(tag));
}


export async function getNewsListPaged({ offset = 0, limit = 2 }) {
  const remotePosts = await sanity.fetch(NEWS_LIST_PAGED_QUERY, { offset: 0, end: 100 });
  const mergedPosts = mergeNewsPosts(remotePosts);
  return mergedPosts.slice(offset, offset + limit);
}

export async function getNewsBySlug(slug) {
  const localPost = LOCAL_NEWS_POSTS.find((post) => post.slug === slug);
  if (localPost) {
    return localPost;
  }

  return sanity.fetch(NEWS_BY_SLUG_QUERY, { slug });
}

export async function getRelatedNews({ id, tags }) {
  if (!tags?.length) { return []; }
  const remotePosts = await sanity.fetch(RELATED_NEWS_QUERY, { id, tags });
  return mergeNewsPosts(remotePosts)
    .filter((post) => post._id !== id && post.tags?.some((tag) => tags.includes(tag)))
    .slice(0, 5);
}

export async function getTagCounts() {
  const res = await sanity.fetch(TAGS_WITH_COUNTS_QUERY);
  const counts = new Map();

  for (const doc of res.tags) {
    for (const t of doc.tags || []) {
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }

  for (const post of LOCAL_NEWS_POSTS) {
    for (const tag of post.tags || []) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getNewsCount() {
  const remoteCount = await sanity.fetch(NEWS_COUNT_QUERY);
  const remotePosts = await sanity.fetch(NEWS_LIST_PAGED_QUERY, { offset: 0, end: 100 });
  const mergedCount = mergeNewsPosts(remotePosts).length;

  return Math.max(remoteCount, mergedCount);
}

export async function getPinnedIndependentNews() {
  return sanity.fetch(PINNED_INDEPENDENT_NEWS_QUERY);
}
