import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react"
import {createDir, getFiles} from "../../actions/file"
import {setCurrentDir} from "../../reducers/fileReducer";
import FileList from "./FileList/FileList";
import Popup from "./Popup";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    console.log(`здесь лежит ${currentDir}`)
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function createDirHandler() {
        dispatch(createDir(currentDir, "1111dd777ekjeejkf4eee44"))
    }

    function backClickHandler() {
       const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    return (
        <div className="disk">
            <div className="disk_btns">
                <button className="click_back" onClick={() => backClickHandler()}>НАЗАД</button>
                <button className="click_create" onClick={() => createDirHandler()}>СОЗДАТЬ ПАПКУ</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};

export default Disk;
