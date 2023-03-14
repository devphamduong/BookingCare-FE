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
import { fetchAllDoctors, fetchRequiredDoctorInfor, saveInfoDoctor } from '../../../store/actions/adminActions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { getDetailDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctor(props) {
    const dispatch = useDispatch();
    const allDoctors = useSelector(state => state.admin.allDoctors);
    const allRequiredDoctorInfor = useSelector(state => state.admin.allRequiredDoctorInfor);
    const language = useSelector(state => state.app.language);
    //save to Markdown table
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [listDoctors, setListDoctors] = useState([]);
    const [hasData, setHasData] = useState(false);
    //save to Doctor_infor table
    const [listPrices, setListPrices] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [listPayments, setListPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [listProvinces, setListProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [addressClinic, setAddressClinic] = useState([]);
    const [nameClinic, setNameClinic] = useState([]);
    const [note, setNote] = useState([]);

    useEffect(() => {
        dispatch(fetchAllDoctors());
        dispatch(fetchRequiredDoctorInfor());
    }, []);

    useEffect(() => {
        let dataSelect = buildDataSelect(allDoctors, 'USER');
        setListDoctors(dataSelect);
    }, [allDoctors]);


    useEffect(() => {
        let dataSelect = buildDataSelect(allDoctors, 'USER');
        setListDoctors(dataSelect);
    }, [allDoctors]);

    useEffect(() => {
        let { resPrice, resPayment, resProvince } = allRequiredDoctorInfor;
        let dataSelectPrice = buildDataSelect(resPrice, 'PRICE');
        let dataSelectPayment = buildDataSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = buildDataSelect(resProvince, 'PROVINCE');
        setListPrices(dataSelectPrice);
        setListPayments(dataSelectPayment);
        setListProvinces(dataSelectProvince);
    }, [allRequiredDoctorInfor]);

    useEffect(() => {
        let dataSelect = buildDataSelect(allDoctors, 'USER');
        setListDoctors(dataSelect);
        let { resPrice, resPayment, resProvince } = allRequiredDoctorInfor;
        let dataSelectPrice = buildDataSelect(resPrice, 'PRICE');
        let dataSelectPayment = buildDataSelect(resPayment, 'PAYMENT');
        let dataSelectProvince = buildDataSelect(resProvince, 'PROVINCE');
        setListPrices(dataSelectPrice);
        setListPayments(dataSelectPayment);
        setListProvinces(dataSelectProvince);
    }, [language]);

    const buildDataSelect = (data, type) => {
        let result = [];
        if (data && data.length > 0) {
            if (type === 'USER') {
                data.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.id;
                    result.push(obj);
                });
            } if (type === 'PRICE') {
                data.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                });
            }
        }
        return result;
    };

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSaveDoctorInfor = () => {
        dispatch(saveInfoDoctor({
            contentHTML,
            contentMarkdown,
            description,
            doctorId: selectedDoctor.value,
            selectedPrice: selectedPrice.value,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            nameClinic,
            addressClinic,
            note,
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

    const handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        switch (stateName) {
            case 'selectedPrice':
                setSelectedPrice(selectedOption);
                break;
            case 'selectedPayment':
                setSelectedPayment(selectedOption);
                break;
            case 'selectedProvince':
                setSelectedProvince(selectedOption);
                break;
            default:
                break;
        }
    };

    return (
        <div className='manage-doctor-container'>
            <div className='title'><FormattedMessage id='admin.manage-doctor.title' /></div>
            <div className='more-infor row pb-3'>
                <div className='content-left col-6'>
                    <label><FormattedMessage id='admin.manage-doctor.title-doctor' /></label>
                    <Select
                        defaultValue={selectedDoctor}
                        onChange={handleChangeSelect}
                        options={listDoctors}
                        name='selectedDoctor'
                        placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                    />
                </div>
                <div className='content-right form-group col-6'>
                    <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                    <textarea className='form-control' value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
            </div>
            <div className='extra-info row pb-3'>
                <div className='col-4'>
                    <label><FormattedMessage id='admin.manage-doctor.title-price' /></label>
                    <Select
                        defaultValue={selectedPrice}
                        onChange={handleChangeSelectDoctorInfor}
                        options={listPrices}
                        name='selectedPrice'
                        placeholder={<FormattedMessage id='admin.manage-doctor.choose-price' />}
                    />
                </div>
                <div className='col-4'>
                    <label><FormattedMessage id='admin.manage-doctor.title-payment' /></label>
                    <Select
                        defaultValue={selectedPayment}
                        onChange={handleChangeSelectDoctorInfor}
                        options={listPayments}
                        name='selectedPayment'
                        placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment' />}
                    />
                </div>
                <div className='col-4'>
                    <label><FormattedMessage id='admin.manage-doctor.title-province' /></label>
                    <Select
                        defaultValue={selectedProvince}
                        onChange={handleChangeSelectDoctorInfor}
                        options={listProvinces}
                        name='selectedProvince'
                        placeholder={<FormattedMessage id='admin.manage-doctor.choose-province' />}
                    />
                </div>
                <div className='col-4'>
                    <label><FormattedMessage id='admin.manage-doctor.name-clinic' /></label>
                    <input type='text' className='form-control' value={nameClinic} onChange={(event) => setNameClinic(event.target.value)} />
                </div>
                <div className='col-4'>
                    <label><FormattedMessage id='admin.manage-doctor.address-clinic' /></label>
                    <input type='text' className='form-control' value={addressClinic} onChange={(event) => setAddressClinic(event.target.value)} />
                </div>
                <div className='col-4'>
                    <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                    <input type='text' className='form-control' value={note} onChange={(event) => setNote(event.target.value)} />
                </div>
            </div>
            <div className='manage-doctor-editor'>
                <MdEditor style={{ height: '500px' }} value={contentMarkdown} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </div>
            <button className={hasData ? 'btn btn-warning my-3' : 'btn btn-primary my-3'} onClick={() => handleSaveDoctorInfor()}>{hasData ? <FormattedMessage id='admin.manage-doctor.btn-update' /> : <FormattedMessage id='admin.manage-doctor.btn-save' />}</button>
        </div>
    );
}

export default ManageDoctor;