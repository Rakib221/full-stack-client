import React, { useState, useRef } from 'react';
import useAuth from '../Hook/useAuth';
import OpenPopUP from './OpenPopUP';

const LeaveComment = () => {
    const {loggedAndSignedInUser} = useAuth();
    const [handleOpen, setHandleOpen] = useState({
        open: false,
        isUser:false
    });
    const handleClose = () => {
        const closePopUp = {...handleOpen};
        closePopUp.open = false;
        closePopUp.isUser = false;
        setHandleOpen(closePopUp);
    }
    const [commentUserDetails, setCommentUserDetails] = useState({
        comment:'',
        userUid:''
    });
    const commentBlur = (e) => {
        const afterBlurDetails = {...commentUserDetails};
        afterBlurDetails.comment = e.target.value;
        setCommentUserDetails(afterBlurDetails);
    }
    const commentRef = useRef('');

    const handleSubmit = (event) =>{
        if(loggedAndSignedInUser.email || loggedAndSignedInUser.uid){
            const ifUserExists = {...commentUserDetails};
            ifUserExists.userUid = loggedAndSignedInUser.uid;
            setCommentUserDetails(ifUserExists);
            fetch('https://full-stack-server-hasan.up.railway.app/comments', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentUserDetails)
            })
            .then(response => response.json())
            .then(confirmComments => {
                if (confirmComments.matchedCount === 1) {
                    commentRef.current.value = '';
                    const successfullyUpdate = {...handleOpen};
                    successfullyUpdate.open = true;
                    successfullyUpdate.isUser = true;
                    setHandleOpen(successfullyUpdate);
                    const thenCommentDetails = {...commentUserDetails};
                    thenCommentDetails.comment = '';
                    thenCommentDetails.userUid = '';
                    setCommentUserDetails(thenCommentDetails);
                }
            })
            
        }
        else{
            const isNotUser = {...handleOpen};
            isNotUser.open = true;
            isNotUser.isUser = false;
            setHandleOpen(isNotUser);
        }
        event.preventDefault();
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div>
                <h5 className="about-company-text-color">LEAVE A COMMENT</h5>
                <p className="about-company-text-color">5000-5000 comments every day</p>
                <form class="row g-3" onSubmit={handleSubmit}>
                    <textarea ref = {commentRef} onBlur={commentBlur} class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                    <button type="submit" class="btn btn-danger mb-3">Submit</button>
                </form>
                <OpenPopUP handleOpen = {handleOpen} handleClose = {handleClose}></OpenPopUP>
            </div>
        </div>
    );
};

export default LeaveComment;