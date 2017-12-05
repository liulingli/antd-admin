/**
 * Created by liulingli on 2017-09-17
 */
import React from 'react';
import {browserHistory, Router} from "react-router";
import classNames from 'classnames';
import moment from 'moment';
import {Spin,Table, Button, Tag, DatePicker, Select, Radio,message} from 'antd';
import {CardContainer, CardText} from '../common/card';

const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            selectedRows: [],
            dataSource: [],
            filteredInfo: null,
            pagination:{
                current: 1,
                pageSize: 10,
                total: 0
            }
        };
        this.columns = [{
                title: "用户id",
                width: 100,
                dataIndex: "user_id",
                render: (text, record, index) => {
                    return <span title={text}>{text}</span>
                }
            }, {
                title: "用户姓名",
                width: 100,
                dataIndex: "username",
                render: (text, record, index) => {
                    return <span>{text}</span>
                }
            }, {
                title: "用户密码",
                width: 70,
                dataIndex: "password",
                render: (text, record, index) => {
                    return <span>{text}</span>
                }
            }, {
                title: "操作",
                width: 170,
                dataIndex: "",
                render: (text, record, index) => {
                    return (<span>
                                 <Button type="primary" style={{marginRight:10}}> 编辑</Button>
                                 <Button type="danger">删除</Button>
                            </span>
                    )

                }
            }
        ];

        this.onRowClick = this.onRowClick.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.rowClassName = this.rowClassName.bind(this);
    }

    componentWillMount(){
        this.getUserList();
    }

    /**
     * @method 获取用户列表
     */
    getUserList(){
        const { pagination } = this.state;
        this.setState({loading: true});
        fetch("/api/users", {method: "get", body: {
            pageSize : pagination.pageSize,
            curPage :  pagination.current
        }}).then((response) => {
            if (response.success) {
                let total =  response.result.total;
                let list = response.result.list;
                let dataSource = [];
                pagination.total = total;
                for(let i=0;i<list.length;i++){
                    let copyList = Object.assign({},list[i]);
                    copyList.key = "row"+i;
                    dataSource.push(copyList);
                }
                this.setState({
                    loading: false,
                    dataSource:dataSource,
                    pagination
                })
            }
        })
    }

    /**
     * @method table行点击事件
     * @param record
     * @param index
     */
    onRowClick(record, index) {
        this.setState({
            activeIndex : index
        })
    };

    /**
     * @method table行添加class
     * @param record
     * @param index
     * @returns {*}
     */
    rowClassName(record, index){
        let {activeIndex} = this.state;
        if (index === activeIndex) {
            return "ant-table-row-active"
        }
        return "";
    };

    render() {
        let {loading, dataSource, activeIndex,total,curPage,pageSize} = this.state;
        const {className, ...other} = this.props;
        return (
            <Spin spinning={loading}>
                <div className="table-name">
                    <div className={classNames("query-content-main", className)}>
                        <CardContainer>
                            <CardText>

                            </CardText>
                        </CardContainer>
                    </div>
                    <div className={classNames(className, "result-content")}>
                        <CardContainer>
                            <CardText className="no-padding">
                                <div className="result">
                                    <div className="result-option">
                                        <Button type="primary">导出Excel</Button>
                                        <span className="show-data">
                                             <Tag color="blue">总计：{total}</Tag>
                                        </span>
                                    </div>
                                    <div className="result-table">
                                        <Table
                                            className="oak-table-init"
                                            columns={this.columns}
                                            dataSource={dataSource}
                                            rowKey={record => { return record['user_id'].toString()} }
                                            onRowClick={this.onRowClick}
                                            rowClassName={this.rowClassName}
                                            rowSelection={this.rowSelection}
                                            pagination={{
                                                ...this.state.pagination,
                                                showSizeChanger: true,
                                                onChange: (current, pageSize) => {
                                                    Object.assign(this.state.pagination, { current, pageSize });
                                                    this.getUserList();
                                                },
                                                onShowSizeChange: (current, pageSize) => {
                                                    Object.assign(this.state.pagination, { current, pageSize });
                                                    this.getUserList();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardText>
                        </CardContainer>
                    </div>
                </div>
            </Spin>
        )
    }
}
