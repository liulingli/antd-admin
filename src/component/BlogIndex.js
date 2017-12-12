/**
 * Created by liulingli on 2017-12-12
 */
import React from 'react';
import { RichEditor } from '../common/richEditor';
import '../themes/BlogIndex.less';

export class BlogIndex extends React.Component {

    render() {
        return (
            <div className="blog-index">
               <RichEditor />
            </div>
        )
    }
}