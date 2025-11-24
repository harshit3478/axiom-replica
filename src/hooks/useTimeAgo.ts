import { useState, useEffect } from 'react';

export function useTimeAgo(createdAt: string): string {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = Date.now();
            const created = new Date(createdAt).getTime();
            const diff = Math.floor((now - created) / 1000); // seconds

            if (diff < 60) {
                setTimeAgo(`${diff}s`);
            } else if (diff < 3600) {
                setTimeAgo(`${Math.floor(diff / 60)}m`);
            } else if (diff < 86400) {
                setTimeAgo(`${Math.floor(diff / 3600)}h`);
            } else {
                setTimeAgo(`${Math.floor(diff / 86400)}d`);
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [createdAt]);

    return timeAgo;
}
