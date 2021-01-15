import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react"
import {createDir, getFiles} from "../../actions/file"
import FileList from "./FileList/FileList";
import Popup from "./Popup";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    console.log(`здесь лежит ${currentDir}`)
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [])

    function createDirHandler() {
        dispatch(createDir(currentDir, "1111dd777ekjeejkf4eee44"))
    }

    return (
        <div className="disk">
            <div className="disk_btns">
                <button className="click_back">НАЗАД</button>
                <button className="click_create" onClick={() => createDirHandler()}>СОЗДАТЬ ПАПКУ</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};

export default Disk;
