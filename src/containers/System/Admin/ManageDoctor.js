import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageDoctor.scss';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './TableManageUser.scss';
import { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctor(props) {
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [description, setDescription] = useState('');

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSaveContentMarkdown = () => {

    };

    return (
        <div className='manage-doctor-container'>
            <div className='title'>Tạo thêm thông tin doctor</div>
            <div className='more-infor row pb-3'>
                <div className='content-left col-6'>
                    <label>Chọn bác sĩ</label>
                    <Select
                        defaultValue={selectedDoctor}
                        onChange={setSelectedDoctor}
                        options={options}
                    />
                </div>
                <div className='content-right form-group col-6'>
                    <label>Thông tin giới thiệu</label>
                    <textarea rows={4} className='form-control' onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
            </div>
            <div className='manage-doctor-editor'>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </div>
            <button className='btn btn-primary my-3' onClick={() => handleSaveContentMarkdown()}>Lưu thông tin</button>
        </div>
    );
}

export default ManageDoctor;