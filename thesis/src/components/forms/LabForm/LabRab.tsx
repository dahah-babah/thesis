import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './LabRab.module.less';
import { inject, observer } from 'mobx-react';

const { Dragger } = Upload;

@inject('fileStore')
@observer
export class LabForm extends React.Component<any> {

    private handleChange = ({ file, fileList }): void => {
        if (file !== 'uploading') {
            console.log(file, fileList);            
        }

        if (file === 'done') {
            message.success(`${file.name} file uploaded successfully.`);
        } else if (file === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
    };

    private renderFiles = (): React.ReactNode => {
        // does not work 
        const props = {
            action: 'http://localhost:3333/files/',
            data: {
                fileName: 'name',
                path: 'filePath'
            },
            multiple: true,
            name: 'defaultFileName',
            showUploadList: {
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: false,
                removeIcon: <DeleteOutlined />,
                downloadIcon: <DownloadOutlined />
            },         
            onChange: this.handleChange            
        };

        return (
            <>
                <Dragger {...props}>
                    <p className={styles.icon}>
                        <InboxOutlined />
                    </p>
                    <p>Click or drag file to this area to upload</p>
                    <p>
                        Support for a single or bulk upload. 
                        Strictly prohibit from uploading company data or other band files
                    </p>
                </Dragger>
            </>
        );
    };
    
    render(): React.ReactChild {            
        return (
            <>
                {this.renderFiles()}
            </>
        )
    }
}