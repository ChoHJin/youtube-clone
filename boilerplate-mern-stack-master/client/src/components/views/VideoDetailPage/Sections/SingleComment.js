import React from 'react'
import { Comment, Avatar, Button, Input } from 'antd';

const { TextArea } = Input;

function SingleComment() {
    return (
        <div>
           <Comment
                actions
                author
                avatar={<Avatar src alt />}
                content
        />
        </div>
    )
}

export default SingleComment
