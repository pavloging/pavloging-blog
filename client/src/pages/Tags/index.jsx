import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTags } from "../../redux/slices/posts";
import TagIcon from "@mui/icons-material/Tag";
import styles from "./Tags.module.scss";

export const Tags = () => {
  const tags = useSelector((state) => state.posts.tags.items);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);
  return (
    <div>
      <h1 className={styles.title}>Tags</h1>
      <div className={styles.tags}>
        {tags.map((el, index) => (
          <Link key={index} to={`/tags/${el}`} className="link">
            <Button size="large" variant="contained">
              <TagIcon />
              {el}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
