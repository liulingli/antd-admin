/**
 * Created by liulingli on 2017-09-17
 */
import React from 'react';
import {browserHistory, Router} from "react-router";
import classNames from 'classnames';
import moment from 'moment';
import {Table, Button, Tag, DatePicker, Select, Radio,message} from 'antd';
import {PaginationTable} from '../common/paginationTable';
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
            total:0,
            pageSize:20,
            curPage:1
        };
        this.columns = [
            {
                title: "#",
                width: 30,
                render: (text, record, index) => {
                    return <span>{index + 1}</span>
                }
            }, {
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

    componentWillReceiveProps(nextProps, nextState) {

    }

    /**
     * @method 获取用户列表
     */
    getUserList(){
        this.setState({loading: false})
        fetch("/api/users", {method: "get", body: {
            pageSize : this.state.pageSize,
            curPage :  this.state.curPage
        }}).then((response) => {
            if (response.success) {
                let total =  response.result.total;
                let list = response.result.list;
                let dataSource = list.map((v,i)=>{
                    v.key = "row"+i;
                    return v;
                })
                this.setState({
                    loading: false,
                    dataSource:dataSource,
                    total : total
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
            //activeIndex : index
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
            if (record.isReceipt === 2) {
                return "ant-table-row-active ant-table-row-danger";
            } else {
                return "ant-table-row-active";
            }
        }
        if (record.isReceipt === 2) {
            return "ant-table-row-danger";
        } else {
            return "";
        }
    };

   /**
    * @method 分页切换
    * @param page
    * @param pageSize
    */
    onChange(page, pageSize){
       this.setState({
         curPage : page
       },()=>{
          this.getUserList();
       })
    }

    render() {
        let {loading, dataSource, activeIndex,total,curPage,pageSize} = this.state;
        const {className, ...other} = this.props;

        return (
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
                                         <Tag color="blue">总计：6</Tag>
                                    </span>
                                </div>
                                <div className="result-table">
                                    <PaginationTable
                                        bordered
                                        className="oak-table-init"
                                        size="small"
                                        pagination={false}
                                        loading={loading}
                                        columns={this.columns}
                                        dataSource={dataSource}
                                        rowSelection={this.rowSelection}
                                        scroll={{x: 1000, y: "100%"}}
                                        onRowClick={this.onRowClick}
                                        rowClassName={this.rowClassName}
                                        current={curPage}
                                        total={total}
                                        pageSize={pageSize}
                                    />
                                </div>
                            </div>
                        </CardText>
                    </CardContainer>
                </div>
            </div>
        )
    }
}
