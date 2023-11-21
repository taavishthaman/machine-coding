import styles from "./Structure.module.css";

function Structure({ directories, depth, setOpen, addFile, addFolder }) {
  return (
    <>
      {directories.map((dir, idx) => (
        <div>
          {dir.type === "folder" && (
            <div
              className={styles.folder}
              style={{ marginLeft: 5 * depth + "px" }}
            >
              <div className={styles.left} onClick={() => setOpen(dir.name)}>
                {dir.open && <div>.</div>}
                {!dir.open && <div>O</div>}
                <p>{dir.name}</p>
              </div>
              <div className={styles.icons}>
                <div onClick={() => addFile(dir.name)}>Fi</div>
                <div onClick={() => addFolder(dir.name)}>Fo</div>
              </div>
            </div>
          )}

          {dir.type === "file" && (
            <div
              className={styles.folder}
              style={{ marginLeft: 5 * depth + "px" }}
            >
              <p>{dir.name}</p>
            </div>
          )}

          {dir.open && dir.subdirs && dir.subdirs.length ? (
            <Structure
              directories={dir.subdirs}
              depth={depth + 1}
              setOpen={setOpen}
              addFile={addFile}
              addFolder={addFolder}
            />
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
}

export default Structure;
