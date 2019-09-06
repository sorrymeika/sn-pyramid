
import React, { useState, useRef } from "react";
import { Button, Table, Modal, Input, Select, Checkbox, InputNumber, message, Divider } from "antd";
import { NCForm, NCFormItem, NCMain, NCToolbar, NCCard, NCBreadcrumb } from "nuclear";
import { SFSImageUpload } from "sn-cornerstone";
import { TEMPLATE_GROUPS } from "../constants/TEMPLATE_GROUPS";
import { TEMPLATE_TYPES } from "../constants/TEMPLATE_TYPES";

const templateTypes = [{
    type: TEMPLATE_TYPES.IMAGE,
    name: '图片'
}, {
    type: TEMPLATE_TYPES.SLIDER,
    name: '图片轮播'
}];

const pageTypes = [{
    type: 1,
    name: '首页'
}, {
    type: 2,
    name: '营销页'
}, {
    type: 3,
    name: '店铺首页'
}, {
    type: 4,
    name: '店铺营销页'
}];

function Templates({ dataSource, search, addTemplate, updateTemplate }) {
    const [searchData, setSearchData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [formData, setFormData] = useState({});

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
            const type = templateTypes.find(item => item.type == record.type);
            return (
                <span>{type && type.name}</span>
            );
        }
    }, {
        title: '支持页面类型',
        dataIndex: 'supportPageTypes',
        key: 'supportPageTypes',
        render: (text, record) => {
            const supportPageTypes = (record.supportPageTypes || '').split(',');
            const types = pageTypes.filter(item => supportPageTypes.findIndex((spt) => Number(spt) == item.type) !== -1);
            return (
                <span>{types.map((type) => type.name).join(', ')}</span>
            );
        }
    }, {
        title: '分组',
        dataIndex: 'groupId',
        key: 'groupId',
        render: (text, record) => {
            const group = TEMPLATE_GROUPS.find(item => item.id == record.groupId);
            return (
                <span>{group && group.name}</span>
            );
        }
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a
                    href="javascript:;"
                    onClick={() => {
                        const supportPageTypes = (record.supportPageTypes || '').split(',').map(Number);

                        setEditModalVisible(true);
                        setFormData({
                            ...record,
                            supportPageTypes
                        });
                    }}
                >编辑</a>
                <Divider type="vertical" />
                <a href="javascript:;">禁用</a>
            </span>
        ),
    }];

    return (
        <NCMain>
            <NCBreadcrumb items={['模板管理']} />
            <NCCard>
                <NCToolbar>
                    <Button onClick={() => setModalVisible(true)}>新增模版</Button>
                    <NCToolbar.Right>
                        <SearchForm
                            data={searchData}
                            onChange={setSearchData}
                            onSearch={() => search(searchData)}
                        ></SearchForm>
                    </NCToolbar.Right>
                </NCToolbar>
                <AdditionModal
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    onOk={
                        (data) => addTemplate(data)
                            .then((res) => {
                                message.success('添加成功');
                                setModalVisible(false);
                            })
                            .catch(e => {
                                message.error(e.message || '添加失败');
                            })
                    }
                />
                <EditModal
                    visible={editModalVisible}
                    formData={formData}
                    setFormData={setFormData}
                    onCancel={() => setEditModalVisible(false)}
                    onOk={
                        (data) => updateTemplate(data)
                            .then((res) => {
                                message.success('修改成功');
                                setEditModalVisible(false);
                            })
                            .catch(e => {
                                message.error(e.message || '修改失败');
                            })
                    }
                />
                <Table
                    rowKey={'id'}
                    dataSource={dataSource}
                    columns={columns}
                />
            </NCCard>
        </NCMain>
    );
}

const SearchForm = function (props) {
    return (
        <NCForm layout="inline"
            onSubmit={
                (data) => {
                    props.onSearch(data);
                }
            }
        >
            <NCFormItem field="name" label="名称">
                <Input
                    placeholder="输入模板名称"
                />
            </NCFormItem>
            <NCFormItem>
                <Button type="primary" htmlType="submit">查询</Button>
            </NCFormItem>
        </NCForm>
    );
};

function AdditionModal({ visible, onCancel, onOk }) {
    const formRef = useRef();

    return (
        <Modal
            title="添加模板"
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                formRef.current.validateFields((err, data) => {
                    if (err) {
                        return message.error('请完整填写模板信息');
                    }
                    onOk && onOk(data);
                });
            }}
            width={'96%'}
            style={{ marginTop: '-100px' }}
        >
            <TemplateForm
                ref={formRef}
                defaultData={{
                    sorting: 0
                }}
            ></TemplateForm>
        </Modal>
    );
}

function EditModal({ formData, visible, onCancel, onOk }) {
    const formRef = useRef();

    return (
        <Modal
            title="修改模板"
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                formRef.current.validateFields((err, data) => {
                    if (err) {
                        return message.error('请完整填写模板信息');
                    }
                    onOk && onOk({ ...formData, ...data });
                });
            }}
            width={'96%'}
            style={{ marginTop: '-100px' }}
        >
            <TemplateForm
                ref={formRef}
                defaultData={formData}
            ></TemplateForm>
        </Modal>
    );
}


const TemplateForm = React.forwardRef(({ defaultData }, ref) => {
    return (
        <NCForm
            ref={ref}
            defaultData={defaultData}
        >
            <NCFormItem
                label="模板名称"
                field="name"
                rules={[{ required: true, message: '请输入模板名称!' }]}
            >
                <Input
                    placeholder="输入模板名称"
                />
            </NCFormItem>
            <NCFormItem
                label="模板类型"
                field="type"
                rules={[{ required: true, message: '请选择模板类型!' }]}
            >
                <Select
                    showSearch
                    placeholder="选择模板类型"
                    defaultActiveFirstOption={false}
                    dropdownMatchSelectWidth={false}
                    optionFilterProp="children"
                >
                    {
                        templateTypes.map((item) => (
                            <Select.Option key={item.type} value={item.type}>{item.name}</Select.Option>
                        ))
                    }
                </Select>
            </NCFormItem>
            <NCFormItem
                label="支持页面类型"
                field="supportPageTypes"
            >
                <Checkbox.Group
                    options={pageTypes.map((item) => ({ label: item.name, value: item.type }))}
                />
            </NCFormItem>
            <NCFormItem
                label="图片"
                field="image"
            >
                <SFSImageUpload
                    restrict={{
                        minWidth: 90,
                        maxWidth: 180,
                        minHeight: 90,
                        maxHeight: 180
                    }}
                />
            </NCFormItem>
            <NCFormItem
                label="排序"
                field="sorting"
                rules={[{ required: true, message: '请输入排序!' }]}
            >
                <InputNumber
                    placeholder="输入排序"
                />
            </NCFormItem>
            <NCFormItem
                label="模板分组"
                field="groupId"
                rules={[{ required: true, message: '请选择模板分组!' }]}
            >
                <Select
                    showSearch
                    placeholder="选择模板分组"
                    defaultActiveFirstOption={false}
                    dropdownMatchSelectWidth={false}
                    optionFilterProp="children"
                >
                    {
                        TEMPLATE_GROUPS.map((item) => (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        ))
                    }
                </Select>
            </NCFormItem>
            <NCFormItem
                label="预览"
                field="preview"
            >
                <Input.TextArea
                    autosize={{ minRows: 2, maxRows: 100 }}
                    placeholder="输入预览模板"
                />
            </NCFormItem>
            <NCFormItem
                label="模板css"
                field="css"
                rules={[{ required: true, message: '请输入模板样式!' }]}
            >

                <Input.TextArea
                    autosize={{ minRows: 5, maxRows: 100 }}
                    placeholder="输入模板样式"
                />
            </NCFormItem>
            <NCFormItem
                label="模板内容"
                field='html'
                rules={[{ required: true, message: '请输入模板内容!' }]}
            >
                <Input.TextArea
                    autosize={{ minRows: 5, maxRows: 100 }}
                    placeholder="输入模板内容"
                />
            </NCFormItem>
            <NCFormItem
                label="其他属性"
                field='props'
            >
                <Input.TextArea
                    autosize={{ minRows: 2, maxRows: 100 }}
                    placeholder="其他属性"
                />
            </NCFormItem>
        </NCForm >
    );
});

export { Templates };