/**
 * Created by liulingli on 2017/12/12.
 * desc 封装富文本编辑器组件
 */

import React, {Component} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export class RichEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            content : ""
        };
        this.editor=null;
    }

    componentDidMount(){
        const textbox = this.refs.textarea;
        const options = {
            debug: 'warn',
            modules: {
                toolbar: true
            },
            placeholder: '请输入文本...',
            readOnly: false,
            theme: 'snow'
        };
        const editor = this.editor = new Quill(textbox,options);
        const { value }= this.state;
        if (value) {
            editor.clipboard.dangerouslyPasteHTML(value);
        }
        editor.on('text-change', this.handleChange.bind(this));
    }

    handleChange () {
        let { content } = this.state;
        value = this.editor.root.innerHTML;
        this.setState({ content });
    }

    render(){
        return (
            <div className="rich-editor">
                <div ref="textarea"/>
            </div>
        )
    }
}