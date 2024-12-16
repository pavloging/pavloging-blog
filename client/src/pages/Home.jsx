import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  fetchPopularPosts,
  fetchPosts,
  fetchTags,
} from "../redux/slices/posts";
import { API } from "../API";

export const Home = () => {
  const dispatch = useDispatch();
  const creatorData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const [tabs, setTabs] = React.useState(0);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  const onCliclNoPop = (tab) => {
    setTabs(tab);
    dispatch(fetchPosts());
  };

  const onCliclPop = (tab) => {
    setTabs(tab);
    dispatch(fetchPopularPosts());
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabs}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => onCliclNoPop(0)} />
        <Tab label="Популярные" onClick={() => onCliclPop(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isPostsLoading
            ? [...Array(5)]
            : posts.items.map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={index}
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl
                        ? `${API}${obj.imageUrl}`
                        : null
                    }
                    creator={obj.creator}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
                    tags={obj.tags}
                    isEditable={creatorData?._id === obj.creator._id}
                  />
                )
              )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                creator: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                creator: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
