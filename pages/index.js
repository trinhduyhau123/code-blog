import { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import CardListItem from "components/CardListItem";
import CardItem from "components/CardItem";
import FilteringMenu from "components/FilteringMenu";
import PreviewAlert from "components/PreviewAlert";
import { useGetBlogsPages } from "actions/pagination";
import { getPaginatedBlogs } from "lib/api";

export default function Home({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });
  return (
    <PageLayout>
      {preview && <PreviewAlert />}

      <div className="blog-detail-page">
        <AuthorIntro />
        <FilteringMenu
          filter={filter}
          onChange={(option, value) =>
            setFilter({ ...filter, [option]: value })
          }
        />
        <hr />
        <div className={`page-wrapper`}>
          <Row className="mb-5">{pages}</Row>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={loadMore}
              disabled={isLoadingMore || isReachingEnd}
              size="lg"
              variant="outline-secondary"
            >
              {isLoadingMore
                ? "..."
                : isReachingEnd
                ? "No More Blogs"
                : "More Blogs"}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export const getStaticProps = async ({ preview = false }) => {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    props: {
      blogs,
      preview,
    },
  };
};
