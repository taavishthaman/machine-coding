import { useState } from "react";
import Comment from "./Comment";

const initialComments = [
  {
    id: "1",
    title: "Happy New Year Folks! What are your resolutions this year?",
    replies: [
      {
        id: "2",
        title: "Same to you. I am planning to join a gym.",
        replies: [
          {
            id: "4",
            title: "I tried last year and gave up.",
            replies: [],
          },
          {
            id: "5",
            title: "Good on you, nothing is more important than good health.",
            replies: [],
          },
        ],
      },
      {
        if: "3",
        title: "Happy new year. I am learning to cook.",
        replies: [
          {
            id: "6",
            title: "So when are you inviting us to dinner",
            replies: [
              {
                id: "8",
                title: "That is a risk I am not willing to take.",
                replies: [],
              },
            ],
          },
          {
            id: "7",
            title: "I bet you are gonna cook tasty stuff.",
            replies: [],
          },
        ],
      },
    ],
  },
];

function CommentsSection() {
  const [comments, setComments] = useState(initialComments);

  function addReply(data) {
    const obj = { title: "Hello World", id: "10", replies: [] };
    setComments((comments) => {
      function findComments(comments) {
        console.log(comments);
        if (!comments) {
          return;
        }
        if (comments?.replies?.length === 0) {
          return;
        }

        // comments.forEach((comment) => findComments(comment));
        for (let i = 0; i < comments.length; i++) {
          if (comments.id === data.id) {
            console.log("Reached Here...");
            //comments.replies.push(obj);
            return;
          }
          findComments(comments[i].replies);
        }
      }

      findComments(comments);
    });
  }
  return (
    <div>
      {comments.map((comment) => (
        <Comment data={comment} depth={0} handleReply={addReply} />
      ))}
    </div>
  );
}

export default CommentsSection;
