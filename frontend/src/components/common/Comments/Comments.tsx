import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import CommentItem from "./CommentItem";
import ReplyItem from "./ReplyItem";

interface commentsProps {
  comments: Array<object> | [];
}
function Comments({ comments }: commentsProps) {
  const [commentList, setCommentList] = useState([
    { re: true },
    { re: true },
    { re: true },
    { re: false },
    { re: false },
    { re: false },
    { re: false },
    { re: false },
    { re: true },
    { re: true },
    { re: true },
    { re: false },
    { re: false },
    { re: true },
    { re: false },
    { re: true },
    { re: true },
    { re: true },
    { re: false },
    { re: false },
    { re: false },
    { re: false }
  ]);
  // useEffect(() => {
  //   setCommentList(comments);
  //   console.log(comments);
  // }, [comments]);
  console.log(commentList);

  return (
    <div>
      <div>
        {commentList.map(item => {
          if (item.re) {
            return <ReplyItem key={v4()} />;
          }
          return <CommentItem key={v4()} />;
        })}
      </div>
    </div>
  );
}

export default Comments;
