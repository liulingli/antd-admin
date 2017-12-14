/**
 * Created by liulingli on 2017/12/12.
 * desc 封装富文本编辑器组件
 */

import React, {Component} from 'react';
import { Icon } from 'antd';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export class RichEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };
        this.titleTimer = null;
        this.contentTimer = null;
        this.editor=null;
        this.handleChange = this.handleChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.publish = this.publish.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        const { data } = this.state;
        const textbox = this.refs.textarea;
        const toolbarOptions = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] },{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block', 'image'],
            [{ 'align': [] },{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }]         // dropdown with defaults from theme
        ];
        const options = {
            debug: 'warn',
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: '请输入文本...',
            readOnly: false,
            theme: 'snow'
        };
        const editor = this.editor = new Quill(textbox,options);
        this.refs.blogTitle.value = data.title||"";
        this.editor.clipboard.dangerouslyPasteHTML(data.content||"");
        this.editor.focus();
        editor.on('text-change', this.handleChange.bind(this));
    }

    componentWillReceiveProps(nextProps){
        if(this.state.data !== nextProps.data){
             this.setState({
                 data: nextProps.data
             });
            if(this.state.data.title !== nextProps.data.title){
                this.refs.blogTitle.value = nextProps.data.title||"";
            }
             if(this.state.data.content !== nextProps.data.content){
                 this.editor.clipboard.dangerouslyPasteHTML(nextProps.data.content||"");
                 this.editor.focus();
             }
        }
    }
    /**
     * @method 编辑器内容变化
     */
    handleChange() {
        const { data } = this.state;
        clearTimeout(this.contentTimer);
        this.contentTimer = setTimeout(()=>{
            let content = this.editor.root.innerHTML;
            let title = this.refs.blogTitle.value;
            if(data.content !== content && data.id){
                console.log("handleChange")
                this.props.onChange(title,content)
            }
        },1000)
    }

    /**
     * @method 标题改变
     */
    titleChange(e){
        const { data } = this.state;
        const target = e.target;
        clearTimeout(this.titleTimer);
        this.titleTimer = setTimeout(()=>{
            let content = this.editor.root.innerHTML;
            let title = target.value;
            if(data.title !== title && data.id){
                console.log("titleChange")
                this.props.onChange(title,content)
            }
        },1000)
    }
    /**
     * @method 保存文章
     */
    save(){
        let content = this.editor.root.innerHTML;
        let title = this.refs.blogTitle.value;
        this.props.onChange(title,content);
    }

    /**
     * @method 发布文章
     */
    publish(){
        let { data } = this.state;
        let content = this.editor.root.innerHTML;
        let title = this.refs.blogTitle.value;
        data.title = content;
        data.title = title;
        this.props.publish(data, 2);
    }

    render(){
        const { data } = this.state;
        return (
            <div className="rich-editor">
                <input
                    ref="blogTitle"
                    type="text"
                    id="blog-title"
                    onChange={this.titleChange}
                />
                <div className="option-button">
                    <button onClick={this.save}><Icon type="save" />保存</button>
                    {
                        data.status == 2?
                            <button><Icon type="check" />已发布</button>
                            :
                            <button onClick={this.publish}><Icon type="share-alt" />发布文章</button>

                    }
                </div>
                <div ref="textarea"/>
            </div>
        )
    }
}