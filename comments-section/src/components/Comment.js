function Comment({ data, depth, handleReply }) {
  return (
    <div style={{ marginLeft: depth * 20 }}>
      <p>{data.title}</p>
      <button onClick={() => handleReply(data)}>Add a reply</button>
      {data.replies.length ? (
        data.replies.map((comment) => (
          <Comment data={comment} depth={depth + 1} handleReply={handleReply} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Comment;
