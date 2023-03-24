import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageClinic.scss';
import { useState } from 'react';
import { CommonUtils } from '../../../utils';
import { createClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageClinic(props) {
    const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [imgBase64, setImgBase64] = useState('');

    const handleEditorChange = ({ html, text }) => {
        setDescriptionMarkdown(text);
        setDescriptionHTML(html);
    };

    const handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);
            setImgBase64(base64);
        }
    };

    const handleSaveClinic = async () => {
        let res = await createClinic({
            name,
            imgBase64,
            descriptionHTML,
            descriptionMarkdown,
            address
        });
        if (res && res.errCode === 0) {
            toast.success("Added new clinic successfully!");
            setName('');
            setAddress('');
            setImgBase64('');
            setDescriptionMarkdown('');
            setDescriptionHTML('');
        } else {
            toast.error("Something wrong... Please try again!");
        }
    };

    return (
        <>
            <div className='manage-clinic-container'>
                <div className='title'>
                    Quản lý phòng khám
                    {/* <FormattedMessage id='manage-schedule.title' /> */}
                </div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input type='text' className='form-control' value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input type='file' className='form-control' onChange={(event) => handleOnChangeImg(event)} />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input type='text' className='form-control' value={address} onChange={(event) => setAddress(event.target.value)} />
                    </div>
                    <div className='col-12 my-3'>
                        <MdEditor style={{ height: '300px' }} value={descriptionMarkdown} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary' onClick={() => handleSaveClinic()}>Save infor</button>
                        {/* <button className='btn btn-warning' onClick={() => handleSaveClinic()}>Save changes</button> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageClinic;