import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)

    function openDirHandler() {
        dispatch(pushToStack(currentDir))
       dispatch(setCurrentDir(file._id))
    }

    return (
        <div className="file" onClick={file.type === 'dir' ? () => openDirHandler() : ''}>
            <div className="file_name">{file.name}</div>
            <div className="file_date">{file.date.slice(0,10)}</div>
            <div className="file_size">{file.size}</div>
        </div>
    );
};

export default File;