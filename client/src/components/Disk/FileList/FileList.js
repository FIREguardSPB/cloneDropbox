import React from 'react';
import {useSelector} from "react-redux";
import File from "./File/File";

const FileList = () => {
    const files = useSelector(state => state.file.files).map(file => <File key={file._id} file={file} />);
    return (
        <div className="filelist">
            <div className="filelist_header">
                <div className="filelist_name">Название</div>
                <div className="filelist_date">Дата</div>
                <div className="filelist_size">Размер</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;