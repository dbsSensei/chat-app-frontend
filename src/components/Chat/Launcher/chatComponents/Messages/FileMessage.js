import React from "react";
import FileIcon from "./../icons/FileIcon";

const FileMessage = (props) => {
  const regexImg = /(.jpg|.png)$/i;

  const splitFileName = props.data.fileName.match(regexImg);
  return (
    <a
      className="sc-message--file"
      target={"_blank"}
      href={props.data.url}
      download={props.data.fileName}
    >
      {splitFileName ? (
        <img src={props.data.url} alt={props.data.fileName} />
      ) : (
        <>
          <FileIcon />
          <p>{props.data.fileName}</p>
        </>
      )}
    </a>
  );
};

export default FileMessage;
