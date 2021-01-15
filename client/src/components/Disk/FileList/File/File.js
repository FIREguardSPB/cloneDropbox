import React from 'react';

const File = ({file}) => {
    return (
        <div className="file">
            <div className="file_name">{file.name}</div>
            <div className="file_date">{file.date.slice(0,10)}</div>
            <div className="file_size">{file.size}</div>
        </div>
    );
};

export default File;