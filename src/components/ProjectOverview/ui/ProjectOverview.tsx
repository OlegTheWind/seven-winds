import React, { useEffect, useCallback } from 'react';
import MainContent from './MainContent';
import NavigationBar from './NavigationBar';
import NavigationHeader from './NavigationHeader';
import styles from '../styles/ProjectOverview.module.scss';
import useGetTreeRows from '../hoks/useGetTreeRows';
import useFetchId from '../hoks/useFetchId';

const ProjectOverview: React.FC = () => {
    const { entity } = useFetchId();
    const { list, fetchData } = useGetTreeRows();

    const refreshData = useCallback(async () => {
        if (entity?.id) {
            await fetchData(entity.id);
        }
    }, [entity?.id]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    return (
        <>
            <div className={styles.container}>
                <NavigationHeader />
                <div className={styles.content}>
                    <NavigationBar />
                    <MainContent
                        data={list}
                        id={entity?.id!}
                        onDataChanged={refreshData}
                    />
                </div>
            </div>
        </>
    );
};

export default ProjectOverview;
