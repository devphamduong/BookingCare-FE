import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageDoctor.scss';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './TableManageUser.scss';
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors, saveInfoDoctor } from '../../../store/actions/adminActions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { getDetailDoctorById } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctor(props) {
    const dispatch = useDispatch();
    const allDoctors = useSelector(state => state.admin.allDoctors);
    const language = useSelector(state => state.app.language);
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [description, setDescription] = useState('');
    const [listDoctors, setListDoctors] = useState([]);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        dispatch(fetchAllDoctors());
    }, []);

    useEffect(() => {
        let dataSelect = buildDataSelect(allDoctors);
        setListDoctors(dataSelect);
    }, [allDoctors]);

    useEffect(() => {
        let dataSelect = buildDataSelect(allDoctors);
        setListDoctors(dataSelect);
    }, [language]);

    const buildDataSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            });
        }
        return result;
    };

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSaveContentMarkdown = () => {
        dispatch(saveInfoDoctor({
            contentHTML,
            contentMarkdown,
            description,
            doctorId: selectedDoctor.value,
            action: hasData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        }));
    };

    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption);
        let res = await getDetailDoctorById(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            setContentMarkdown(markdown.contentMarkdown ? markdown.contentMarkdown : '');
            setContentHTML(markdown.contentHTML ? markdown.contentHTML : '');
            setDescription(markdown.description ? markdown.description : '');
            setHasData(markdown.contentMarkdown && markdown.contentHTML && markdown.description ? true : false);
        }
    };

    return (
        <div className='manage-doctor-container'>
            <div className='title'>Tạo thêm thông tin doctor</div>
            <div className='more-infor row pb-3'>
                <div className='content-left col-6'>
                    <label>Chọn bác sĩ</label>
                    <Select
                        defaultValue={selectedDoctor}
                        onChange={handleChangeSelect}
                        options={listDoctors}
                    />
                </div>
                <div className='content-right form-group col-6'>
                    <label>Thông tin giới thiệu</label>
                    <textarea rows={4} className='form-control' value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
            </div>
            <div className='manage-doctor-editor'>
                <MdEditor style={{ height: '500px' }} value={contentMarkdown} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </div>
            <button className={hasData ? 'btn btn-warning my-3' : 'btn btn-primary my-3'} onClick={() => handleSaveContentMarkdown()}>{hasData ? 'Lưu thay đổi' : 'Tạo thông tin'}</button>
        </div>
    );
}

export default ManageDoctor;