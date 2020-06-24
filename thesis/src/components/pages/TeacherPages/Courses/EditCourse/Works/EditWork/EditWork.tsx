import React from 'react';
import { Course, Work, Question, TestPoint } from '../../../../../../../types/types';
import styles from './EditWork.module.less';
import { 
    Typography, 
    Collapse, 
    Upload, 
    Card, 
    message, 
    Divider, 
    Input, 
    Select, 
    Button,
    Form,
    Checkbox,    
    Radio} from 'antd';
import { BorderlessTableOutlined, DoubleRightOutlined, InboxOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import TextArea from 'antd/lib/input/TextArea';
import { RecordWithTtl } from 'dns';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { Dragger } = Upload;
const { Option } = Select;

interface Props {
    course?: Course;
}

@inject('workStore')
@observer
export class EditWork extends React.Component<Props | any> {

    @observable work!: Work;
    private courseId = this.props.courseStore.courses[0].id;

    private questions: any = [
        {
            id: 1,
            title: "Для чего  в первую очередь предназначен модуль входного захвата микроконтроллера?",
            type: "radio",
            isCorrectId: 3,
            points: [
              {
                id: 1,
                text: "для отслеживания изменений сигнала на входе МК"
              },
              {
                id: 2,
                text: "для подсчета количества событий на входе МК"
              },
              {
                id: 3,
                text: "для измерения временных интервалов между событиями на входах МК"
              },
              {
                id: 4,
                text: "для выдачи импульсов фиксированной продолжительности"
              }
            ]
        },
        {
            id: 2,
            title: "Какой параметр выходного сигнала изменяется при широтно-импульсной модуляции?",
            type: "text",
            isCorrectId: "скважность",
            points: [
              {
                id: 1,
                text: "Введите ответ"
              }
            ]
        },
    ];

    UNSAFE_componentWillMount() {
        const workId = this.props.match.params.workId;
        this.props.workStore.fetchWorks(this.courseId);
        this.work = this.props.workStore.getWork(workId);
        
    }

    componentDidUpdate() {
        const workId = this.props.match.params.workId;
        this.work = this.props.workStore.getWork(workId);
    }

    private renderTitle = (): React.ReactNode => {
        const course = this.props.courseStore.courses[0];          
        return (
            <span>
                <BorderlessTableOutlined />
                <Text mark strong className={styles.title}>{course?.name}</Text>
                <DoubleRightOutlined />
                {/* editable */}
                <Text editable strong className={styles.title}>
                    {this.work
                    ?   this.work.title
                    :   null}
                </Text> 
            </span>
        );
    };

    private renderDescription = (): React.ReactNode => {
        const course = this.props.courseStore.courses[0];
        return (
            <Collapse
                bordered={true}
                defaultActiveKey={course ? course.id : 'def'}
            >
                <Panel 
                    key={course ? course.id : 'def'} 
                    header='Описание'
                >
                    {/* !not work yet: request to server + state (store) */}
                    <Paragraph editable>
                        {this.work
                        ?   this.work.description
                        :   null}
                    </Paragraph>
                </Panel>
            </Collapse>
        );
    };

    private renderDeadline = (): React.ReactNode => {        
        return (
            <div className={styles.deadline}>
                <Text className={styles.marginRight10}>Deadline:</Text>
                {/* editable  */}
                <Paragraph type='danger' editable>
                    {this.work
                    ?   this.work.deadline 
                        ?   this.work.deadline 
                        :   'no deadline'
                    :   ''}
                </Paragraph>
            </div>
        );
    };

    private renderFiles = (): React.ReactNode => {
        // does not work 
        const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
                const { status } = info.file;

                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`Файл ${info.file.name} успешно загружен.`);
                } else if (status === 'error') {
                    message.error(`Ошибка при загрузке файла ${info.file.name}.`);
                }
            },
        };

        return (
            <>
                <Dragger {...props}>
                    <p className={styles.icon}>
                        <InboxOutlined />
                    </p>
                    <p>
                        Нажмите или перетащите файл в эту область, чтобы загрузить
                    </p>
                    <p>
                        Поле поддерживает разовую или массовую загрузку
                    </p>
                </Dragger>
            </>
        );
    };

    private onFinish = (data: any): void => {
        console.log(data);
        
    };

    private renderFormItems = (): React.ReactNode => {
        return (
            <>
                <Form.List name="names">
                    {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? 'Вариант ответа' : ''}
                                    required
                                    key={field.key}
                                >

                                <div className={styles.wrapper}>
                                    <Form.Item>
                                        <Checkbox />
                                    </Form.Item>

                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Введите вариант ответа или удалите поле.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input 
                                            className={styles.input}
                                            placeholder="Вариант ответа" 
                                            size={'middle'}
                                        />
                                    </Form.Item>

                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className={styles.icon1}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </div>

                                </Form.Item>
                                
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                >
                                <PlusOutlined /> Добавить вариант ответа
                                </Button>
                            </Form.Item>

                        </div>
                    );
                    }}
                </Form.List>
            </>
        );
    };

    private renderDynamicFields = (): React.ReactNode => {

        return (
            <Form 
                name={'dynamic_items'}  
                onFinish={this.onFinish}
            >
                {this.renderFormItems()}
            </Form>
        );
    };

    private renderCard = (): React.ReactNode => {
        return (
            <Card className={styles.card}>
                <Divider>Добавить вопрос</Divider>
                <TextArea
                    className={styles.marginBottom20}
                    placeholder={'Введите текст вопроса'} 
                />
                <Select
                    className={styles.marginBottom20}
                    placeholder={'Выберите тип ответа'}
                >
                    <Option 
                        key={'radio'}
                        value={'radio'}
                    >
                        Radio
                    </Option>
                    <Option 
                        key={'checkbox'}
                        value={'checkbox'}
                    >
                        Checkbox
                    </Option>
                    <Option 
                        key={'text'}
                        value={'text'}
                    >
                        Text
                    </Option>
                </Select>
                {this.renderDynamicFields()}
                <Button type={'primary'}>Добавить вопрос</Button>
            </Card>
        );
    };

    private renderLeftSide = (): React.ReactNode => {
        return (
            <div className={styles.leftSide}>
                {this.renderTitle()}
                <div className={styles.margin}>
                    {this.renderDescription()}
                </div>
                {this.renderDeadline()}
                {this.renderFiles()}
            </div>
        );
    };

    private renderRightSide = (): React.ReactNode => {
        return (
            <div className={styles.rightSide}>
                {this.renderCard()}
            </div>
        );
    };

    private renderQuestions = (): React.ReactNode => {
        return (
            <Card>
                <Divider>Вопросы</Divider>
                {
                    this.questions.map(question => 
                        <Form.Item 
                            key={question.id}
                            label={question.title} 
                            name={question.id}
                        >
                            <Text>Вопрос <Text strong>№{question.id}</Text></Text>
                            {
                                question.type === 'radio'
                                ?   this.renderRadioGroup(question)
                                :   question.type === 'checkbox'
                                    ?   this.renderCheckboxGroup(question)
                                    :   question.type === 'select'
                                        ?   this.renderSelect(question)
                                        :   <div />
                            }
                            <Text>Правильный ответ: <Text code>{
                                question.type === 'radio'
                                ?   this.getCorrect(question)
                                :   question.type === "text"
                                    ?   question.isCorrectId
                                    :   null
                            }</Text></Text>
                        </Form.Item>
                    )
                }
            </Card>
        );
    };

    private getCorrect = (question: any): string | string[] => {
        return question.points.find(point => point.id === question.isCorrectId).text;
    };

    private renderRadioGroup = (question: Question): React.ReactNode => {
        return (
            <Radio.Group className={styles.questionWpapper}>
                {question.points.map((point) => 
                    <Radio key={point.id} value={point.id}>
                        <Text>{point.text}</Text>
                    </Radio>
                )}
            </Radio.Group>
        );
    };

    private renderCheckboxGroup = (question: Question): React.ReactNode => {
        return (
            <Checkbox.Group className={styles.questionWpapper}>
                {question.points.map((point) =>
                    <Checkbox key={point.id} value={point.id}>
                        <Text>{point.text}</Text>
                    </Checkbox> 
                )}
            </Checkbox.Group>
        );
    };

    private renderSelect = (question: Question): React.ReactNode => {
        return (
            <Select/>
        );
    };

    render (): React.ReactChild {                        
        return (
            <section className={styles.mainMani}>
                <section className={styles.main}>
                    {this.renderLeftSide()}
                    {this.renderRightSide()}
                </section>
                {this.renderQuestions()}
            </section>
        );
    }
}