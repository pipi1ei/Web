import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './style/CSSTransitionApp.css';

const { Meta } = Card;

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShowCard: true
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={e => this.setState({isShowCard: !this.state.isShowCard})}>显示/隐藏</Button>
        <CSSTransition
          in={this.state.isShowCard}
          classNames="card"
          timeout={1000}
          unmountOnExit={true}
          onEnter={el => console.log("进入动画前")}
          onEntering={el => console.log("进入动画")}
          onEntered={el => console.log("进入动画后")}
          onExit={el => console.log("退出动画前")}
          onExiting={el => console.log("退出动画")}
          onExited={el => console.log("退出动画后")}
        >
          <Card
            style={{width: 300}}
            cover={
              <img alt="example" scr="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            ></Meta>
          </Card>
        </CSSTransition>
      </div>
    )
  }
}