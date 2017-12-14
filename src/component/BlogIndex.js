/**
 * Created by liulingli on 2017-12-12
 */
import React from 'react';
import className from 'classnames';
import { message, Icon, Spin, Tooltip, Tag } from 'antd';
import { RichEditor } from '../common/richEditor';
import '../themes/BlogIndex.less';

export class BlogIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            blogLists: [],
            loading: false,
            data: {},
            save: "",
        };

        this.saveBlog = this.saveBlog.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addBlog = this.addBlog.bind(this);
        this.getBlogList = this.getBlogList.bind(this);
        this.publish = this.publish.bind(this);
        this.deleteBlog = this.deleteBlog.bind(this);
    }
    componentWillMount(){
        this.getBlogList(0);
    }

    /**
     * @method 获文章列表
     * @param type 类型 1 修改, 0 新增
     */
    getBlogList(type){
        type === 0 && this.setState({ loading: true });
        fetch("/api/blog", {
            method: "get",
            body: {
                curPage: 1,
                pageSize: 1000
            }
        }).then((response) => {
            if (response.success) {
                const list = response.result.list;
                const activeIndex = type==0?0:this.state.activeIndex;
                this.setState({
                    blogLists: list ,
                    activeIndex: activeIndex,
                    data: list.length > 0 ? list[activeIndex] : {},
                    loading: false,
                    save: false
                })
            }
        })
    }

    /**
     * @method 保存文章
     * @param data 文章信息
     * @param type 类型 1 修改, 0 新增
     */
    saveBlog(data,type){
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({save : true})
        fetch("/api/blog"+(data.id?("/"+data.id):""), {
            method: data.id?"put":"post",
            body: {
                id: data.id,
                title: data.title || "",
                content: data.content || "",
                userId: parseInt(user.id),
                author: user.trueName
            }
        }).then((response) => {
            if (response.success) {
                this.getBlogList(type);
            }
        })
    }

    /**
     * @method 新增文章
     */
    addBlog(){
        let data = {
            title: "未命名文章",
            content: ""
        };
        this.saveBlog(data,0)
    }

    /**
     * @method 内容改变时自动保存文章
     * @param title 文章标题
     * @param content 文章内容
     */
    onChange(title, content){
        const { data } = this.state;
        const blog = {
            id: data.id,
            title: title,
            content: content
        };
        this.saveBlog(blog,1)
    }

    /**
     * @method 改变当前博客
     * @param index
     */
    onChangeList(index){
        const { activeIndex, blogLists } = this.state;
        if(index !== activeIndex){
            this.setState({
                data: blogLists[index],
                activeIndex: index
            })
        }
    }

    /**
     * @method 修改文章状态
     * @param data 文章信息
     * @param type 2发布文章，1撤销文章
     */
    publish(data, type){
        if(!data.content){
            message.info("文章内容不能为空！");
            return;
        }
        if(!data.title){
            message.info("文章标题不能为空！");
            return;
        }
        fetch("/api/blog/"+data.id+"/"+(type == 2?"publish":"unPublish"), {
            method: "put"
        }).then((response) => {
            if (response.success) {
                this.getBlogList(0);
            }
        })
    }

    /**
     * @method 删除文章
     * @param data
     */
    deleteBlog(data){
        fetch("/api/blog/"+data.id, {
            method: "delete"
        }).then((response) => {
            if (response.success) {
                this.getBlogList(0);
            }
        })
    }

    render() {
        let { blogLists, loading, activeIndex, data, save } = this.state;
        return (
            <Spin spinning={loading}>
                <div className="blog-index">
                    <div className="show-save">
                        <Tag color="#108ee9">{save ? "保存中..." : "已保存"}</Tag>
                    </div>
                    <div className="blog-list">
                       <div className="new-note">
                           <button className="add-blog" onClick={this.addBlog}><Icon type="plus-circle" />新建文章</button>
                           <ul className="note-list">
                               {
                                   blogLists.map((item,i)=>{
                                       return (
                                           <li
                                               className={className("list",i == activeIndex ? "active" : "")}
                                               key={item.id}
                                               onClick={()=>this.onChangeList(i)}
                                           >
                                               <p className="title"> <Icon type={ item.status == 1? "file-text":"file-unknown"} /> <span>{ item.title }</span></p>
                                               <p className="win-text">字数：{ (item.content||"").replace(/<[^>]+>/g,"").length }</p>
                                               <div className="option">
                                                   {
                                                       item.status == 2 ?
                                                           <Tooltip placement="bottom" title="撤销发布">
                                                               <Icon type="rollback" onClick={()=>this.publish(item,1)}/>
                                                           </Tooltip>
                                                           :
                                                           <Tooltip placement="bottom" title="发布文章">
                                                               <Icon type="share-alt" onClick={()=>this.publish(item,2)}/>
                                                           </Tooltip>
                                                   }
                                                   <Tooltip placement="bottom" title="删除文章">
                                                       <Icon type="delete" onClick={()=>this.deleteBlog(item)}/>
                                                   </Tooltip>
                                               </div>
                                           </li>
                                       )
                                   })
                               }
                           </ul>
                       </div>
                    </div>
                    <div className="blog-edit">
                        {
                            blogLists.length > 0?
                                <RichEditor data={ data } publish={this.publish} save={this.saveBlog.bind(data,1)} onChange={this.onChange}/>
                                :
                                <div>先新增文章</div>
                        }

                    </div>
                </div>
            </Spin>
        )
    }
}