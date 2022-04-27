import React from 'react';
import { message, Tooltip, Input, Button, Card, BackTop, Drawer, Skeleton } from 'antd';
import { useState } from 'react';

import './App.css';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import locale from 'antd/lib/date-picker/locale/en_US';

import { RadarChartOutlined, RightCircleOutlined, DeploymentUnitOutlined } from '@ant-design/icons';


import { CompassOutlined,FilterOutlined, LeftOutlined } from '@ant-design/icons';

console.log('04271735');

// 你的 IP 地址，将通过此地址获取 flomo 数据
const my_ip = 'https://my-first-api-drajiang.vercel.app/'

class Memos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memos: this.props.data
    }
  }

  componentWillReceiveProps = () => {

    console.log('componentWillReceiveProps');
    // console.log(this.props);
    // console.log(this.props.data)

    if (this.props.data.hasOwnProperty("succes")) {
      console.log('if (this.props.data!=[]');

    }

    if (this.props.data.hasOwnProperty("succes") == true && this.props.data != this.state.memos) {
      let data = this.props.data.data

      // let newObj = data.map(item => ({
      //   slug: item['slug'],
      //   item: [item]

      // }))

      // this.setState({
      //   memos: newObj
      // })
    }

  }

  // 卡片中的 MEMO 超链接点击时
  handleMemoClick = (e) => {
    console.log('handleMemoClick');
    // console.log(e.nativeEvent.path);


    // 只在点击 MEMO 时处理事件，否则忽略
    if (e.nativeEvent.target.localName == 'a' && e.nativeEvent.target.innerText == 'MEMO') {
      console.log('click MEMO');

      // 记录是否在主界面或 drawer 中打开
      let drawer = ''

      // 点击事件所在卡片的 ID
      let thisMemoId
      // 当前卡片容器的 ID
      let thisMemoBoxId

      // 遍历事件涉及到的 DOM 元素

      // 在主界面或 drawer 中打开
      if (e.nativeEvent.target.closest('.ant-drawer-body') != null) {
        drawer = '.ant-drawer-body'
      }

      thisMemoBoxId = e.nativeEvent.target.closest('.memo_box').dataset.id
      thisMemoBoxId = thisMemoBoxId.replace(' ', '')
      thisMemoBoxId = thisMemoBoxId.replace(/\s*/g, "");
      thisMemoBoxId = thisMemoBoxId.replace(/&nbsp;/ig, "");



      thisMemoId = e.nativeEvent.target.closest('.memo').dataset.id
      thisMemoId = thisMemoId.replace(' ', '')
      thisMemoId = thisMemoId.replace(/\s*/g, "");
      thisMemoId = thisMemoId.replace(/&nbsp;/ig, "");



      // 所有的 MEMO 数据
      let all_memos = this.props.allData
      // 父级组件传进来的数据，在主界面 memos = all_memos，在 Drawer 抽屉中，memos = 部分 all_memos
      let memos = this.props.data
      // console.log('memos:');
      // console.log(memos);
      // console.log('all_memos:');
      // console.log(all_memos);

      // 要插入的新卡片的 ID
      let targetMemoId = e.nativeEvent.target.dataset.id
      targetMemoId = targetMemoId.substring(targetMemoId.indexOf('memo_id') + 'memo_id'.length + 1)
      targetMemoId = targetMemoId.replace(/\s*/g, "");
      targetMemoId = targetMemoId.replace(/&nbsp;/ig, "");

      // this.props.handleMemoClick(thisSlug)

      console.log('targetMemoId:' + targetMemoId);
      console.log('thisMemoBoxId:' + thisMemoBoxId);
      console.log('thisMemoId:' + thisMemoId);


      // 在卡片后面增加新卡片 ==========

      let isFinded = false
      for (let i = 0; i < all_memos.length; i++) {
        // 找到点击对象的内容

        if (all_memos[i]['slug'] == targetMemoId) {
          isFinded = true
          console.log('找到点击对象的内容:');
          console.log(all_memos[i]);
          for (let j = 0; j < memos.length; j++) {
            // 将内容插入到当前容器中
            // console.log('j:'+j.toString());

            if (memos[j]['slug'] == thisMemoBoxId) {

              let bingo = false
              memos[j]['item'].forEach((item) => {
                if (item['slug'] == targetMemoId) {
                  // 当前容器中有此卡片
                  bingo = true
                }
              })

              if (bingo) {
                // 当前容器中有此卡片
                console.log('当前容器中有此卡片');

                // 定位到此卡片
                document.querySelector(drawer + '.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').scrollIntoView({ behavior: "smooth" })
                console.log(document.querySelector('.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']' + ' [data-id=' + '"https://flomoapp.com/mine/?memo_id=' + thisMemoId + '"]'));

                // 关联的链接高亮

                let correlationMemo = document.querySelector(drawer + '.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']' + ' [data-id=' + '"https://flomoapp.com/mine/?memo_id=' + thisMemoId + '"]')
                console.log('correlationMemo:');
                console.log(correlationMemo);

                if (correlationMemo != null) {
                  correlationMemo.classList.add('text-heightlight')
                }

                // setTimeout(() => {
                //   correlationMemo.classList.remove('text-heightlight')
                // }, 1000)



                // 卡片高亮
                document.querySelector(drawer + '.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').classList.add('heightlight')
                document.querySelector(drawer + '.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').classList.remove("ant-card-bordered");
                // 清除高亮
                setTimeout(() => {
                  document.querySelector(drawer + '.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').classList.remove('heightlight')
                  document.querySelector(drawer + '.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').classList.add("ant-card-bordered");
                }, 1000)


                // document.querySelector('.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').setAttribute('color', 'red');
                // console.log(document.querySelector('.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').classList);



              } else {
                // 当前容器中无此卡片
                console.log('当前容器中无此卡片');
                // # 删除点击位置右侧的所有卡片
                // ## 获取点击事件所在卡片的索引
                let thisMemoIndex = -1
                memos[j]['item'].forEach((item, index) => {
                  if (item.slug == thisMemoId) {
                    thisMemoIndex = index
                  }

                  // 删除右侧卡片
                  if (thisMemoIndex != -1 && index > thisMemoIndex) {
                    memos[j]['item'].splice(index, memos[j]['item'].length - 1)
                  }

                })



                // 插入新卡片
                memos[j]['item'].push(all_memos[i]['item'][0])
                this.setState({
                  memos: memos
                }, () => {

                  document.querySelector('.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']').scrollIntoView({ behavior: "smooth" })

                  // 关联的链接高亮
                  let correlationMemo = document.querySelector('.memo_box[data-id=' + thisMemoBoxId + ']' + ' [data-id=' + targetMemoId + ']' + ' [data-id=' + '"https://flomoapp.com/mine/?memo_id=' + thisMemoId + '"]')
                  correlationMemo.classList.add('text-heightlight')
                  // setTimeout(() => {
                  //   correlationMemo.classList.remove('text-heightlight')
                  // }, 1000)

                })

              }

              break

            }
          }

          break
        }
      }

      if (isFinded != true) {
        console.log('没有找到此卡片');
        message.warning('抱歉，此卡片不适合公开');

      }

    }

  }

  // 格式化卡片中的 Tag 信息
  tagsProcessor = (str, tags) => {

    tags.forEach((item) => {
      str = str.replace('#' + item, "<span class = 'tag'>" + item + "</span>")
    })

    return str

  }

  // 将卡片中的 URL 转为文字链
  urlToLink = (str) => {
    let re =
      /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;


    str = str.replace(re, function (website) {
      website = website.replace(/\s*/g, "");
      website = website.replace(/^\s*|\s*$/g, "");
      website = website.replace(/&nbsp;/ig, "");

      let short = website.length > 24 ? website.substring(0, 24) + '...' : website

      if (website.indexOf('https://flomoapp.com') >= 0) {
        return "<a data-id=" + website + " >" + 'MEMO' + "</a>";
      } else {
        return "<a target='_blank' href=" + website + ">" + short + "</a>";
      }

    });
    return str;
  };

  // 寻找相关的其他卡片
  findClue = (e) => {
    console.log('findClue');
    console.log(e);
    let keyword = ''
    let len = e.nativeEvent.path.length

    // 获取卡片的文字信息
    for (let i = 0; i < len; i++) {

      if (e.nativeEvent.path[i].className == 'ant-card-body') {

        // 去除无用字符
        keyword = e.nativeEvent.path[i]['innerText']
        keyword.replace('\n', '')
        keyword.replace('MEMO', '')
        console.log(keyword);
        break
      }
    }

    console.log(this.props);
    this.props.handleLinkButtonClick(keyword)

  }

  render() {
    console.log('Memos Render:');
    const data = this.props.data
    console.log(this.props);
    // console.log(data);

    // 加载状态
    if (this.props.isLoadinge) {
      return (
        <div className='memos'>

          <div><Skeleton active /></div>

        </div>
      )
    }

    let source = this.props.source
    if (data !== undefined) {
      // console.log(data);
      // console.log(data.length);

      var master_box = []
      data.forEach((item, index) => {
        // 遍历每一列的 Memo
        let listItems = []

        // 如果是在渲染关联笔记
        // 忽略首个数据，只渲染 3 条数据
        if (source == 'drawer') {
          if (index == 0 || index > 3) {
            return false
          }
        }


        for (let i = 0; i < item.item.length; i++) {
          // 遍历每一行的 Memo
          let content = this.urlToLink(item.item[i].content)

          content = this.tagsProcessor(content, item.item[i]['tags'])

          // 渲染反向链接
          let backlinkeds = []

          if (item.item[i]['backlinkeds'].length > 0) {

            item.item[i]['backlinkeds'].forEach((link) => {
              let id = 'https://flomoapp.com/mine/?memo_id=' + link.slug.replace(/\s*/g, "");
              id = id.replace(/\s*/g, "");
              let link_temp = <a data-id={id}>MEMO</a>

              backlinkeds.push(link_temp)

            })
          }

          let div_backlinkeds
          if (backlinkeds.length > 0) {
            div_backlinkeds = <div className='backlinkeds'>🔙  {backlinkeds}</div>
          }

          // flomo 原地址
          let flomo_link = 'https://flomoapp.com/mine/?memo_id=' + item.item[i].slug.replace(/\s*/g, "")

          let findClud = ''
          if (source != 'drawer') {
            // 如果 MEMO 所在位置不是在 Drawer 抽屉中，则显示「查找线索」按钮，否则隐藏
            findClud = <Button type="text" size='small' onClick={this.findClue.bind()} shape="default" icon={<DeploymentUnitOutlined />}></Button>
          }

          let card = <Card className='memo' key={item.item[i].slug} data-id={item.item[i].slug} title='' size="small" onClick={this.handleMemoClick} style={{ width: 400 }}>
            <div className='card_title'>

              <div className='time'>{item.item[i]['created_at']}</div>

              <div className='right_area'>
                {findClud}
                <a href={flomo_link} target='_blank' ><Button type="text" size='small' shape="default" icon={<RightCircleOutlined />}></Button></a>
              </div>

            </div>

            <div dangerouslySetInnerHTML={{ __html: content }}>

            </div>
            {div_backlinkeds}

          </Card>

          listItems.push(card)
        }

        let box = <div key={index + item.item[0].slug} data-id={item.slug} className='memo_box'>{listItems}</div>
        master_box.push(box)

      });

    }

    return (
      <div className='memos'>

        {master_box}

      </div>
    )
  }
}



class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allMemos: [],                       // 本地处理后的完整 memos 数据
      memos: [],                          // 本地处理后的 memos 数据（如果用户筛选数据，则此数据不等于完整数据）
      data: [],                           // 服务端提供的原始 memos 数据
      isLoading: true,                    // 抽屉的加载状态
      drawerVisible: false,               // 控制 Drawer 抽屉的显隐
      link_memo: [],                      // 关联的笔记数据
      mainMemosIsLoading: true,           // 主界面 Memos 数据的加载状态
      isFilter:false                      // 记录当前是否为筛选后的数据
    }


  }

  componentDidMount = () => {
    console.log('componentDidMount');

    this.setState({
      mainMemosIsLoading: true
    })

    fetch(my_ip + 'get_memos')
      .then((response) => response.json())
      .then((json) => {

        console.log(json);


        let data = json.data

        let newObj = data.map(item => ({
          slug: item['slug'],
          item: [item]

        }))

        this.setState({
          allMemos: newObj,
          memos: newObj,
          mainMemosIsLoading: false
        }, () => {


        })

        console.log('this.state.memos:');

      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });

  }

  // 点击返回左侧按钮
  handBackButtonClick = () => {
    let options = {
      left: 0,
      behavior: "smooth"
    }
    window.scrollTo(options)
  }

  // 点击随机漫游笔记按钮
  handleStrayButtonClick = () => {
    // 随机漫游到某一个卡片中
    let memos = this.state.memos
    let max = memos.length
    let min = 0

    let index = parseInt(Math.random() * (max - min + 1) + min, 10)
    console.log(index);

    document.querySelector('.memo_box[data-id=' + memos[index]['slug'] + ']').scrollIntoView({ behavior: "smooth" })
    // setTimeout(()=>{this.handBackButtonClick()},15)

  }

  // 点击查找线索按钮
  handleLinkButtonClick = (keyword) => {
    console.log('handleLinkButtonClick');

    this.setState({
      isLoading: true
    }, () => {
      // 完成后回调
    })

    console.log(keyword);

    this.setState({
      drawerVisible: true
    })

    // 向服务器获取相关笔记
    fetch(my_ip + '?keyword=' + keyword)
      .then((response) => response.json())
      .then((json) => {

        console.log(json);

        let data = json.data

        let newObj = data.map(item => ({
          slug: item['slug'],
          item: [item]

        }))

        this.setState({
          link_memo: newObj,
          isLoading: false
        }, () => {
          // 完成后回调
        })

      })
  }

  // Drawer 关闭事件
  onDrawerClose = () => {
    console.log('onDrawerClose');
    this.setState({
      drawerVisible: false
    })
  }

  // 筛选没有链接的笔记
  filterLinkIsNone = () => {

    console.log('filterLinkIsNone');
    let filterMemos = []
    let allMemos = this.state.allMemos
    let memos = this.state.memos


    // 再次点击可以取消筛选
    if (allMemos.length != memos.length) {
      // 当前处于筛选状态：恢复显示全部数据
      this.setState({
        memos: allMemos,
        isFilter:false
      })
    } else {
      // 当前不处于筛选状态：筛选数据
      // 遍历所有数据
      allMemos.forEach((item) => {

        // 若笔记中不存在链接，则表示为目标数据
        if (item['item'][0]['content'].indexOf('https://flomoapp.com/') < 0) {
          filterMemos.push(item)
        }


      })

      this.setState({
        memos: filterMemos,
        isFilter:true
      })
    }






  }

  render() {

    let memos = <div><Skeleton active /></div>
    let mainMemos = <div><Skeleton active /></div>
    console.log('this.state:');
    console.log(this.state);

    if (this.state.isLoading) {
      memos = <div className='loadingBox'><Skeleton active /><Skeleton active /></div>
    } else {
      memos = <Memos source='drawer' allData={this.state.memos} data={this.state.link_memo} />
    }

    if (this.state.mainMemosIsLoading) {
      mainMemos = <div className='loadingBox'><Skeleton active /><Skeleton active /></div>
    } else {
      mainMemos = <Memos source='main' handleLinkButtonClick={this.handleLinkButtonClick} allData={this.state.allMemos} data={this.state.memos} />
    }

    let filterButtonType = 'default'
    if(this.state.isFilter){
      filterButtonType = 'primary' 
    }

    // mainMemos = <div className='loadingBox'><Skeleton active /><Skeleton active /></div>
    return (
      <div className="App">
        <h4>📗 江子龙的公开笔记</h4>
        <div className='tool'>
          <Button className='stray—button' icon={<CompassOutlined />} onClick={this.handleStrayButtonClick} />
          <Button className='stray—button' icon={<LeftOutlined />} onClick={this.handBackButtonClick} />
          <Tooltip placement="left" title="筛选无链接的笔记">
            <Button type={filterButtonType} icon={<FilterOutlined />} onClick={this.filterLinkIsNone} />
          </Tooltip>
        </div>
        <div className='drawer'>
          <Drawer width={900} title="线索" placement="right" onClose={this.onDrawerClose} visible={this.state.drawerVisible}>
            {memos}
          </Drawer>
        </div>
        {mainMemos}
        <BackTop />
      </div>

    );
  }
}

export default App;