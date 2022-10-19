import React from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import styles from "./Post.module.scss";
import { CreatorInfo } from "../CreatorInfo";
import { PostSkeleton } from "./Skeleton";
import { Link } from "react-router-dom";
import { fetchLikePost, fetchRemovePost } from "../../redux/slices/posts";

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  creator,
  likesCount,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const [like, setLike] = React.useState(false);
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickLike = () => {
    dispatch(fetchLikePost(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon className={styles.editIcons} />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon className={styles.editIcons} />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <CreatorInfo {...creator} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name, index) => (
              <li key={index}>
                <Link to={`/tags/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <div>
              <div
                className={styles.postDetailsLike}
                onClick={() => setLike(!like)}
              >
                <li onClick={onClickLike}>
                  {like ? (
                    <FavoriteIcon style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}

                  <span>{likesCount}</span>
                </li>
              </div>

              <ul className={styles.postDetailsLike}>
                <li>
                  <CommentIcon />
                  <span>{commentsCount}</span>
                </li>
              </ul>
            </div>

            <ul className={styles.postDetailsView}>
              <li>
                <EyeIcon />
                <span>{viewsCount}</span>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};
