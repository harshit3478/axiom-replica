import { useState, useEffect } from 'react';

export function useAnimatedNumber(targetValue: number, duration: number = 300): number {
    const [displayValue, setDisplayValue] = useState(targetValue);

    useEffect(() => {
        const startValue = displayValue;
        const diff = targetValue - startValue;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = startValue + diff * eased;

            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(targetValue);
            }
        };

        requestAnimationFrame(animate);
    }, [targetValue, duration]);

    return displayValue;
}
