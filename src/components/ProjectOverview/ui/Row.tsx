import { useEffect, useRef, useState } from 'react';
import { TreeRow } from '../types';
import useDeleteRow from '../hoks/useDeleteRow';
import useCreateEntity from '../hoks/useCreateEntity';
import styles from '../styles/Row.module.scss';
import useUpdateRow from '../hoks/useUpdateRow';

const Row: React.FC<{
    row: TreeRow;
    level: number;
    entityId: number;
    onDataChanged: () => void;
}> = ({ row, level, entityId, onDataChanged }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<HTMLDivElement>(null!);
    const [formData, setFormData] = useState<{
        equipmentCosts: number;
        estimatedProfit: number;
        machineOperatorSalary: number;
        mainCosts: number;
        materials: number;
        mimExploitation: number;
        overheads: number;
        parentId: number | null;
        rowName: string;
        salary: number;
        supportCosts: number;
    }>({
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: row.id,
        rowName: '',
        salary: 0,
        supportCosts: 0,
    });

    const { deleteRow, loading: deleteLoading } = useDeleteRow({
        eId: entityId,
        rId: row.id,
    });

    const { createEntity } = useCreateEntity({
        id: entityId,
        requestData: formData,
    });

    const handleDelete = async () => {
        await deleteRow();
        onDataChanged();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateEntity(formData);
            } else {
                await createEntity();
            }
            onDataChanged();
            setIsFormVisible(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    const { updateRow: updateEntity, loading: updateLoading } = useUpdateRow({
        eId: entityId,
        rId: row.id,
    });
    const useClickOutside = (
        ref: React.RefObject<HTMLDivElement>,
        callback: () => void,
    ) => {
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    ref.current &&
                    !ref.current.contains(event.target as Node)
                ) {
                    callback();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, callback]);
    };
    useClickOutside(formRef, () => {
        if (isFormVisible) {
            setIsFormVisible(false);
        }
    });

    const handleRowClick = () => {
        setFormData({
            equipmentCosts: row.equipmentCosts || 0,
            estimatedProfit: row.estimatedProfit || 0,
            machineOperatorSalary: row.machineOperatorSalary || 0,
            mainCosts: row.mainCosts || 0,
            materials: row.materials || 0,
            mimExploitation: row.mimExploitation || 0,
            overheads: row.overheads || 0,
            parentId: row.id as number | null,
            rowName: row.rowName,
            salary: row.salary || 0,
            supportCosts: row.supportCosts || 0,
        });
        setIsEditing(true);
        setIsFormVisible(true);
    };

    return (
        <>
            {!isFormVisible && (
                <tr onClick={handleRowClick}>
                    <td style={{ paddingLeft: `${level * 30}px` }}>
                        <div
                            className={styles.actions}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.icon_button_add}
                                onClick={() => setIsFormVisible(!isFormVisible)}
                            ></button>
                            <button
                                className={styles.icon_button_delete}
                                onClick={handleDelete}
                                disabled={deleteLoading}
                            >
                                {deleteLoading}
                            </button>
                        </div>
                    </td>
                    <td>{row.rowName}</td>
                    <td>{row.salary ?? ''}</td>
                    <td>{row.equipmentCosts ?? ''}</td>
                    <td>{row.overheads ?? ''}</td>
                    <td>{row.estimatedProfit ?? ''}</td>
                </tr>
            )}

            {isFormVisible && (
                <tr>
                    <td
                        colSpan={6}
                        style={{ paddingLeft: `${(level + 1) * 30}px` }}
                    >
                        <div ref={formRef}>
                            <form
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                                onSubmit={handleSubmit}
                                className={styles.form}
                            >
                                <input
                                    style={{
                                        widows: '110px',
                                        visibility: 'hidden',
                                    }}
                                />
                                <input
                                    style={{ width: '500px' }}
                                    className={styles.form_color}
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
                                            salary: Number(e.target.value),
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
                                            overheads: Number(e.target.value),
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
                                            estimatedProfit: Number(
                                                e.target.value,
                                            ),
                                        })
                                    }
                                />
                                <button type="submit" disabled={updateLoading}>
                                    {updateLoading}
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
            )}

            {row.child?.map((child: TreeRow) => (
                <Row
                    key={child.id}
                    row={child}
                    level={level + 1}
                    entityId={entityId}
                    onDataChanged={onDataChanged}
                />
            ))}
        </>
    );
};
export default Row;
