import { useState, useEffect } from 'react';
import { API_URL, createEntity } from '../../../constants/constants';
import { FetchIdHookResult, FetchIdResult } from '../types';

const STORAGE_KEY = 'app_entity_id';

const useFetchId = (): FetchIdHookResult => {
    const [entity, setEntity] = useState<FetchIdResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedId = localStorage.getItem(STORAGE_KEY);
        if (savedId) {
            setEntity({
                id: Number(savedId),
                rowName: '',
            });
            setLoading(false);
        } else {
            fetchId();
        }
    }, []);

    const fetchId = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}${createEntity}`, {
                method: 'POST',
            });

            if (!response.ok)
                throw new Error(`HTTP ошибка! статус: ${response.status}`);

            const data: FetchIdResult = await response.json();

            localStorage.setItem(STORAGE_KEY, data.id.toString());
            setEntity(data);
        } catch (error) {
            console.error('Ошибка запроса:', error);
            setError(
                error instanceof Error ? error.message : 'Неизвестная ошибка',
            );

            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setLoading(false);
        }
    };

    return { entity, loading, error, fetchId };
};

export default useFetchId;
