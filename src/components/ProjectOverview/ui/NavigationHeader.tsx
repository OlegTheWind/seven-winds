import React from 'react';
import styles from '../styles/NavigationHeader.module.scss';
import useCreateEntity from '../hoks/useCreateEntity';
import useGetTreeRows from '../hoks/useGetTreeRows';
import useFetchId from '../hoks/useFetchId';

const NavigationHeader: React.FC<{ id?: number }> = () => {
    const { fetchData } = useGetTreeRows();
    const { entity } = useFetchId();

    const { createEntity } = useCreateEntity({
        id: entity?.id!,
        requestData: {
            equipmentCosts: 1000,
            estimatedProfit: 500,
            machineOperatorSalary: 200,
            mainCosts: 300,
            materials: 150,
            mimExploitation: 50,
            overheads: 100,
            parentId: null,
            rowName: 'Новая строка',
            salary: 400,
            supportCosts: 75,
        },
    });
    const handleSubmit = async () => {
        await createEntity();
        await fetchData(entity?.id!);
    };
    return (
        <>
            <header className={styles.header}>
                <div
                    className={styles.top_header_line}
                    style={{
                        display: 'flex',
                        gap: '10px',
                        height: '50%',
                        alignItems: 'center',
                    }}
                >
                    <div className={styles.botton_cobe}></div>
                    <div className={styles.botton_arrow}></div>
                    <div className={styles.text_line}>
                        <span>Просмотр</span>
                    </div>
                    <span style={{ color: '#A1A1AA' }}>Управление</span>
                </div>

                <div
                    className={styles.bottom_header_line}
                    style={{ display: 'flex', height: '50%' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flex: '0 0 15%',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <span>
                            <p style={{ margin: '0', color: '#A1A1AA' }}>
                                Название проекта{' '}
                            </p>
                            <p style={{ margin: '0', color: '#A1A1AA' }}>
                                Аббревиатура
                            </p>
                        </span>
                        <button
                            className={styles.button_to_bottom}
                            onClick={handleSubmit}
                        ></button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                    >
                        <div
                            style={{
                                width: '282px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            Строительно-монтажные работы
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default NavigationHeader;
