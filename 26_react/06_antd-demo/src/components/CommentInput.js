import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  Form,
  Button,
  Input
} from 'antd';

export default class CommentInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div>
        <Input.TextArea rows={4} onChange={this.onChange.bind(this)} value={this.state.value} />
        <Button onClick={this.onSubmit.bind(this)} type="primary" style={{marginTop: "20px"}}>
          添加评论
        </Button>
      </div>
    )
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit() {
    console.log(this.state.value, moment().fromNow());

    const commentInfo = {
      id: Date.now(),
      name: 'pipilei',
      avatar: 'https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
      content: <p>{this.state.value}</p>,
      datetime: moment()
    }

    this.props.submitComment(commentInfo);
    this.setState({
      value: ''
    })
  }
}