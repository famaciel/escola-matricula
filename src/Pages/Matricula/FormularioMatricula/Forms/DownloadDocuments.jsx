import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

const DownloadDocuments = ({ filesToDownload }) => {
  const downloadFile = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="matricula-form-fields">
      <h2>Baixe alguns documentos previamente</h2>

      <div className="docs-grid">
        {filesToDownload.map((file) => (
          <Tooltip enterDelay={100} leaveDelay={0} title="Baixar arquivo">
            <div onClick={() => downloadFile(file.url)} className="document">
              <h3>{file.nome}</h3>

              <p>{file.descricao}</p>

              <FontAwesomeIcon
                size="xl"
                className="download-icon"
                icon={faDownload}
              />
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default DownloadDocuments;
