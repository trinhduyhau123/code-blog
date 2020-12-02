import client, { previewClient } from "lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
const blogFields = `
    title, 
    subtitle, 
    'slug': slug.current,
    date,
    'author': author->{'name':author, 'avatar': avatar.asset->url},
    'coverImage': coverImage.asset->url,
`;

const getClient = (preview) => (preview ? previewClient : client);

export const urlFor = (source) => {
  return imageUrlBuilder(client).image(source);
};

export const getAllBlogs = async () => {
  const blogs = await client.fetch(
    `*[_type == "blog"] | order(date desc){${blogFields}}`
  );
  return blogs;
};

export const getPaginatedBlogs = async (
  { offset, date } = { offset: 0, date: "desc" }
) => {
  const blogs = await client.fetch(
    `*[_type == "blog"] | order(date ${date}){${blogFields}}[${offset}...${
      offset + 6
    }]`
  );
  return blogs;
};

export const getBlogBySlug = async (slug, preview) => {
  const currentClient = getClient();
  console.log(currentClient);
  const blog = await currentClient
    .fetch(
      `*[_type == "blog" && slug.current==$slug]{${blogFields}content[]{..., "asset": asset->}}`,
      { slug }
    )
    .then((res) => preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]);
  return blog;
};
