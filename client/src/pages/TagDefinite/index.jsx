import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import styles from "./TagDefinite.module.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/posts";
import { Box } from "@mui/system";
import { CreatorInfo } from "../../components/CreatorInfo";

export const TagDefinite = () => {
  const navigate = useNavigate();
  const params = useParams();
  const tagUrl = params["*"];

  const posts = useSelector((state) => state.posts.posts.items);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const postTag = [];

  posts.map((post) => {
    return post.tags.map((tag) => (tag === tagUrl ? postTag.push(post) : null));
  });

  const back = () => {
    navigate("/tags");
  };
  return (
    <div className={styles.TagDefinite}>
      <Button variant="outlined" onClick={back}>
        <KeyboardReturnIcon />
      </Button>
      <h1 className={styles.title}>{tagUrl}</h1>
      <Box className={styles.posts}>
        {postTag.map((el, index) => (
          <Card
            key={index}
            variant="outlined"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.0509803922)",
              maxWidth: 235,
            }}
          >
            <React.Fragment>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  <CreatorInfo
                    avatarUrl={el.creator.avatarUrl}
                    fullName={el.creator.fullName}
                    additionalText={el.createdAt}
                  />
                </Typography>
                <Typography
                  variant="h5"
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  {el.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} className={styles.p}>
                  {el.tags}
                </Typography>
                <Typography className={styles.p} variant="body2">
                  {el.text}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="text">
                  <Link className="link" to={`/posts/${el._id}`}>
                    Learn More
                  </Link>
                </Button>
              </CardActions>
            </React.Fragment>
          </Card>
        ))}
      </Box>
    </div>
  );
};
