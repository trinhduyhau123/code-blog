import { Row, Col } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import BlogHeader from "components/BlogHeader";
import ErrorPage from "next/error";
import { getBlogBySlug, getAllBlogs } from "lib/api";
import BlogContent from "components/BlogContent";
import { useRouter } from "next/router";
import PreviewAlert from 'components/PreviewAlert';

const BlogDetail = ({ blog, preview }) => {
  const router = useRouter();
  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }
  if (router.isFallback) {
    return (
      <PageLayout className="blog-detail-page">Loading</PageLayout>
    );
  }
  return (
    <PageLayout className="blog-detail-page">x
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview  && <PreviewAlert />}
          <BlogHeader blog={blog} />
          <hr />
          {/* Blog Content Here */}
          {blog.content && <BlogContent blog={blog} />}
        </Col>
      </Row>
    </PageLayout>
  );
};

export default BlogDetail;

export const getStaticPaths = async () => {
  const blogs = await getAllBlogs();
  const paths = blogs.map((blog) => {
    return {
      params: { slug: blog.slug },
    };
  });
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params, preview =false, previewData }) => {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: {
      blog,
      preview,
      revalidate: 1,
    },
  };
};
