import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {createDir, getFiles} from "../../actions/file";
import Input from "../../utills/Input/Input";

const Popup = () => {
    const [dirName, setDirName] = useState('')

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    console.log(`здесь лежит ${currentDir}`)
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [])

    function createDirHandler() {
        dispatch(createDir(currentDir, "1111ddiiii777ejkjkjkjkjeejkf4eee44"))
    }
    return (
        <div className="popup">
            <div className="popup_content">
                <div className="popup_header">
                    <div className="popup_title">
                        Создать новую папку
                    </div>
                    <button className="popup_close">Х</button>
                </div>
                <Input type="text" placeholder="Название папки" value={dirName} setValue={setDirName}/>
                <button className="click_create" onClick={() => createDirHandler()}>СОЗДАТЬ ПАПКУ</button>
            </div>
        </div>
    );
};

export default Popup;