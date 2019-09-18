import React, { useState, useRef } from 'react';
import { Atom } from 'nuclear';
import { Button, Modal } from 'antd';
import ProductTransfer from '../app/product/components/ProductTransfer';

function Products({ value, onChange, maxNum = 30, }) {
    const [modalVisible, setModalVisible] = useState(false);
    const ref = useRef();

    console.log(value);

    return (
        <>
            <Button
                className="pb_m mb_m fs_s ta_c w_full bg_fff"
                style={{ cursor: 'pointer', border: '1px dashed #333', color: '#333', height: 30, lineHeight: '29px' }}
                onClick={() => setModalVisible(true)}
            >选择商品 {value ? value.length : 0}/{maxNum}</Button>
            <Modal
                visible={modalVisible}
                cancelText="取消"
                onCancel={() => setModalVisible(false)}
                onOk={() => {
                    console.log(ref.current.getResults());
                    onChange(ref.current.getResults());
                    setModalVisible(false);
                }}
                okText="确定"
                width={900}
                style={{ top: 0 }}
            >
                <ProductTransfer ref={ref} products={value}></ProductTransfer>
            </Modal>
        </>
    );
}

Atom.registerAtom('products-transfer', Atom.wrapFormItem(Products));
