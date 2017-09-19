/**
 * Created by liulingli on 2017-09-17
 */
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { Table, Button,Tag,DatePicker, Select, Radio} from 'antd';
import { PaginationTable } from '../common/paginationTable';
import { CardContainer, CardText } from '../common/card';
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;

export class TableDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      selectedRows: [],
      dataSource: [
        {
          key: 0,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }, {
          key: 1,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }, {
          key: 2,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }, {
          key: 3,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }, {
          key: 4,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }, {
          key: 5,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }, {
          key: 6,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }, {
          key: 7,
          mrClassName: "入院记录",
          patientId: 1289343,
          hospitalization: 12,
          patientName: "陈倩",
          dischargeDept: "内二科",
          dischargeWard: "内二科",
          dischargeDate: "2017-08-09 12:00:00",
          admissionDate: "2017-08-05 12:00:00",
          applicant: "陈倩",
          applicantDept: "内二科",
          applicantReason: "语言不规范",
          MaintApplicantTime: "2017-08-10 12:11:12",
          manage: "陈倩",
          manageDept: "内二科"
        }
      ],
      filteredInfo: null
    };
    this.columns = [
      {
        title: "#",
        width: 30,
        render: (text, record, index) => {
          return <span>{index + 1}</span>
        }
      }, {
        title: "病历名称",
        width: 100,
        dataIndex: "mrClassName",
        render: (text, record, index) => {
          return <span title={text}>{text}</span>
        }
      }, {
        title: "患者Id",
        width: 70,
        dataIndex: "patientId",
        render: (text, record, index) => {
          return <span>{text}</span>
        }
      }, {
        title: "患者姓名",
        width: 70,
        dataIndex: "patientName",
        render: (text, record, index) => {
          return <span>{text}</span>
        }
      }, {
        title: "出院时间",
        width: 110,
        dataIndex: "dischargeDate",
        render: (text, record, index) => {
          return <span title={text}>{text}</span>
        }
      }, {
        title: "住院次数",
        width: 60,
        dataIndex: "hospitalization",
        render: (text, record, index) => {
          return <span>{text}</span>
        }
      }, {
        title: "申请人",
        width: 60,
        dataIndex: "applicant",
        render: (text, record, index) => {
          return <span>{text}</span>
        }
      }, {
        title: "申请科室",
        width: 60,
        dataIndex: "applicantDept",
        render: (text, record, index) => {
          return <span title={text}>{text}</span>
        }
      }, {
        title: "出院科室",
        width: 60,
        dataIndex: "dischargeDept",
        render: (text, record, index) => {
          return <span title={text}>{text}</span>
        }
      }, {
        title: "申请原因",
        width: 120,
        dataIndex: "applicantReason",
        render: (text, record, index) => {
          return <span title={text}>{text}</span>
        }
      }, {
        title: "维护申请时间",
        width: 110,
        dataIndex: "MaintApplicantTime",
        render: (text, record, index) => {
          return <span title={text}>{text}</span>
        }
      }, {
        title: "处理人",
        width: 60,
        dataIndex: "manage",
        render: (text, record, index) => {
          return <span>{text}</span>
        }
      }, {
        title: "处理科室",
        width: 60,
        dataIndex: "manageDept",
        render: (text, record, index) => {
          return <span>{text}</span>
        }
      }
    ];
  }

  componentWillReceiveProps(nextProps, nextState) {

  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.setState({
        selectedRows: selectedRows
      })
    }
  };
  onRowClick = (record, index) => {
    this.setState({
      //activeIndex : index
    })
  };
  rowClassName = (record, index) => {
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
  onClick = () => {

  };
  onChange = () =>{

  };
  onContextMenu = (index, target) => {
    this.setState({
      activeIndex: index
    })
  };

  render() {
    const {loading, dataSource, activeIndex} = this.state;
    const {className, ...other} = this.props;
    return (
      <div className="table-name">
        <div className={classNames("query-content-main",className) }>
          <CardContainer>
            <CardText>
              <span className="item">
                <label>审核时间：</label>
                <RangePicker
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </span>
              <span className="br"/>
              <span className="item border">
                <RadioGroup onChange={this.onChange.bind(this)}>
                  <Radio value={0}>未过期</Radio>
                  <Radio value={1}>已过期</Radio>
                </RadioGroup>
              </span>
              <span className="item border">
               <RadioGroup onChange={this.onChange.bind(this)}>
                  <Radio value={0}>全部</Radio>
                  <Radio value={1}>本人</Radio>
                </RadioGroup>
              </span>
              <span className="item">
                <Button type="primary">查询</Button>
              </span>
            </CardText>
          </CardContainer>
        </div>
        <div className={classNames(className, "result-content")}>
          <CardContainer>
            <CardText className="no-padding">
              <div className="result">
                <div className="result-option">
                  <Button type="primary">选择病历</Button>
                  <Button type="primary">主动收回</Button>
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
                    scroll={{x: 1240, y: "100%"}}
                    onRowClick={this.onRowClick}
                    rowClassName={this.rowClassName}
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
