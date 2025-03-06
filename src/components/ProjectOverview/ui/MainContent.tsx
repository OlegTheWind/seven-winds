import React, { useEffect, useState } from 'react';
import styles from '../styles/MainContent.module.scss';
import { TreeRow } from '../types';
import useCreateEntity from '../hoks/useCreateEntity';
import Row from './Row';

interface MainContentProps {
    data: TreeRow[];
    id: number;
    onDataChanged: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
    data,
    id,
    onDataChanged,
}) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: null,
        rowName: '',
        salary: 0,
        supportCosts: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!formData.rowName) {
                alert('Заполните название работы');
                return;
            }

            await createEntity();
            onDataChanged();
            setIsFormVisible(false);
            setFormData((prev) => ({ ...prev, rowName: '' }));
        } catch (error) {
            console.error('Ошибка при создании:', error);
        }
    };
    useEffect(() => {
        if (data.length === 0) {
            setIsFormVisible(true);
        }
    }, [data]);
    const { createEntity, loading: createLoading } = useCreateEntity({
        id: id,
        requestData: formData,
    });

    return (
        <div className={styles.MainContent}>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '110px' }}>Уровень</th>
                        <th style={{ width: '757px' }}>Наименование работ</th>
                        <th style={{ width: '200px' }}>Основная з/п</th>
                        <th style={{ width: '200px' }}>Оборудование</th>
                        <th style={{ width: '200px' }}>Накладные расходы</th>
                        <th style={{ width: '200px' }}>Сметная прибыль</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <>
                            {isFormVisible && (
                                <tr>
                                    <td colSpan={6}>
                                        <form
                                            style={{display:'flex', justifyContent:'flex-end'}}
                                            onSubmit={handleSubmit}
                                            className={styles.form}
                                        >   <input 
                                                style={{widows: '110px', visibility:'hidden'}} />
                                            <input
                                            className={styles.form_color}
                                                style={{ width: '500px' }}
                                                type="text"
                                                placeholder="Наименование работ"
                                                value={formData.rowName}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        rowName: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                            <input
                                            className={styles.form_color}
                                                type="number"
                                                placeholder="Основная з/п"
                                                value={formData.salary}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        salary: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                            />
                                            <input
                                                className={styles.form_color}
                                                type="number"
                                                placeholder="Оборудование"
                                                value={formData.equipmentCosts}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        equipmentCosts: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                            />
                                            <input
                                            className={styles.form_color}
                                                type="number"
                                                placeholder="Накладные расходы"
                                                value={formData.overheads}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        overheads: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                            />
                                            <input

                                            className={styles.form_color}
                                                type="number"
                                                placeholder="Сметная прибыль"
                                                value={formData.estimatedProfit}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        estimatedProfit: Number(e.target.value),
                                                    })
                                                }
                                            />
                                            <button
                                                type="submit"
                                                disabled={createLoading}
                                            >
                                                {createLoading}
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            )}
                        </>
                    ) : (
                        data.map((row) => (
                            <Row
                                key={row.id}
                                row={row}
                                level={0}
                                entityId={id}
                                onDataChanged={onDataChanged}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MainContent;
