import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import useAuth from '../../Hook/useAuth';

const Loading = () => {
    const { isLoading } = useAuth();
    return (
        <div className="pre-loader"><PuffLoader color={'red'} isLoading={isLoading} size={150} /></div>
    );
};

export default Loading;