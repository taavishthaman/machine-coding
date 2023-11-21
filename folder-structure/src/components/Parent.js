import { useState } from "react";
import styles from "./Parent.module.css";
import Structure from "./Structure";

const folder = [
  {
    name: "Parent",
    type: "folder",
    open: true,
    subdirs: [],
  },
];

function Parent() {
  const [folders, setFolders] = useState(folder);
  const [name, setName] = useState("");

  function openRec(folders, dirname) {
    if (!folders) return;
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].name === dirname) {
        folders[i].open = !folders[i].open;
        return;
      }
      openRec(folders[i].subdirs, dirname);
    }
  }

  function addFolderRec(folders, dirname) {
    if (!folders) return;
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].name === dirname) {
        const newFolder = {
          name: name,
          type: "folder",
          open: false,
          subdirs: [],
        };
        folders[i].subdirs.push(newFolder);
        return;
      }
      addFolderRec(folders[i].subdirs, dirname);
    }
  }

  function addFileRec(folders, dirname) {
    if (!folders) return;
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].name === dirname) {
        const newFolder = {
          name: name,
          type: "file",
        };
        folders[i].subdirs.push(newFolder);
        return;
      }
      addFileRec(folders[i].subdirs, dirname);
    }
  }

  function setOpen(dirname) {
    const copy = [...folders];
    openRec(copy, dirname);
    setFolders(copy);
  }

  function addFolder(dirname) {
    const copy = [...folders];
    addFolderRec(copy, dirname);
    setFolders(copy);
  }

  function addFile(dirname) {
    const copy = [...folders];
    addFileRec(copy, dirname);
    setFolders(copy);
  }

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </div>
      <div className={styles.parent}>
        <Structure
          directories={folders}
          depth={0}
          setOpen={setOpen}
          addFile={addFile}
          addFolder={addFolder}
        />
      </div>
    </>
  );
}

export default Parent;
