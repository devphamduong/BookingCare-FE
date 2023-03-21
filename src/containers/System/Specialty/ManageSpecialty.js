import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageSpecialty.scss';
import { useState } from 'react';
import { CommonUtils } from '../../../utils';
import { createSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageSpecialty(props) {
    const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [name, setName] = useState('');
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

    const handleSaveSpecialty = async () => {
        let res = await createSpecialty({
            name,
            imgBase64,
            descriptionHTML,
            descriptionMarkdown
        });
        if (res && res.errCode === 0) {
            toast.success("Added new specialty successfully!");
        } else {
            toast.error("Something wrong... Please try again!");
        }
    };

    return (
        <>
            <div className='manage-specialty-container'>
                <div className='title'>
                    Quản lý chuyên khoa
                    {/* <FormattedMessage id='manage-schedule.title' /> */}
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input type='text' className='form-control' value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input type='file' className='form-control' onChange={(event) => handleOnChangeImg(event)} />
                    </div>
                    <div className='col-12 my-3'>
                        <MdEditor style={{ height: '300px' }} value={descriptionMarkdown} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary' onClick={() => handleSaveSpecialty()}>Save infor</button>
                        <button className='btn btn-warning' onClick={() => handleSaveSpecialty()}>Save changes</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageSpecialty;