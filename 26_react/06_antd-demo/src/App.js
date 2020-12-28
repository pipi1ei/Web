import React, { PureComponent } from 'react';
// import { Button } from 'antd';

import CommentInput from './components/CommentInput';
import CommentItem from './components/CommentItem';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      commentList: []
    }
  }

  render() {
    return (
      <div style={{width: "500px", padding: "20px"}}>
        {/* <Button type="primary">Primary Button</Button> */}
        {
          this.state.commentList.map((item, index) => {
            return <CommentItem key={item.id} comment={item} index={index} removeItem={e => this.removeItem(index)} />
          })
        }
        <CommentInput submitComment={this.submitComment.bind(this)} />
      </div>
    );
  }

  submitComment(comment) {
    this.setState({
      commentList: [...this.state.commentList, comment]
    })
  }

  removeItem(index) {
    const newCommentList = [...this.state.commentList]
    newCommentList.splice(index, 1)
    this.setState({
      commentList: newCommentList
    })
  }
}

export default App;
