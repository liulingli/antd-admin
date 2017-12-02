/**
 * Created by liulingli on 2017/8/8.
 * desc 封装table组件 ，动态分页
 */

import React, {Component} from 'react';
import {Table, Pagination} from 'antd';

export class PaginationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: this.props.total,
            current: this.props.current,
            dataSource: this.props.dataSource
        };
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.total !== nextState.total) {
            this.setState({
                total: nextProps.total
            })
        }
        if (nextProps.current !== nextState.current) {
            this.setState({
                current: nextProps.current
            })
        }
        if (nextProps.dataSource !== nextState.dataSource) {
            this.setState({
                dataSource: nextProps.dataSource
            })
        }
    }

    render() {
        const {dataSource, total, current} = this.state;
        const {columns, defaultPageSize,rowKey, ...other} = this.props;
        console.log(dataSource)
        return (
            <div className="pagination-table">
                <Table
                    className="table-init"
                    bordered
                    size="small"
                    pagination={false}
                    columns={columns}
                    dataSource={dataSource}
                    {...other}
                />
                <Pagination
                    showTotal={total => `总共 ${total} 条数据 `}
                    className="oak-pagination-init"
                    defaultPageSize={defaultPageSize ? defaultPageSize : 50}
                    current={current}
                    onChange={this.props.onChange}
                    total={total}
                />
            </div>
        )
    }
}