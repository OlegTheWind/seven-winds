import { useState } from 'react';
import { API_URL, getTreeRows } from '../../../constants/constants';
import { TreeRowsHookResult, TreeRow } from '../types';

const useGetTreeRows = (): TreeRowsHookResult => {
    const [list, setList] = useState<TreeRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}${id}${getTreeRows}`, {
                method: 'GET',
            });

            if (!response.ok)
                throw new Error(`HTTP ошибка! статус: ${response.status}`);

            const data: TreeRow[] = await response.json();
            setList(data);
            setError(null);
        } catch (error) {
            console.error('Ошибка запроса:', error);
            setError(
                error instanceof Error ? error.message : 'Неизвестная ошибка',
            );
        }
    };

    return { list, error, fetchData };
};

export default useGetTreeRows;
