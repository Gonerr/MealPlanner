import { useEffect, useRef } from "react";

const useDragToScroll = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const getX = (e: MouseEvent | TouchEvent) => {
            return "touches" in e ? e.touches[0].pageX : e.pageX;
        };

        const onDragStart = (e: MouseEvent | TouchEvent) => {
            isDragging.current = true;
            const x = getX(e);
            startX.current = x - element.offsetLeft;
            scrollLeft.current = element.scrollLeft;
            element.style.cursor = "grabbing";
            element.style.userSelect = "none";
        };

        const onDragMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = getX(e);
            const walk = (x - startX.current) * 1.5;
            element.scrollLeft = scrollLeft.current - walk;
        };

        const onDragEnd = () => {
            isDragging.current = false;
            element.style.cursor = "grab";
            element.style.userSelect = "";
        };

        element.addEventListener("mousedown", onDragStart);
        window.addEventListener("mousemove", onDragMove);
        window.addEventListener("mouseup", onDragEnd);

        element.addEventListener("touchstart", onDragStart);
        window.addEventListener("touchmove", onDragMove);
        window.addEventListener("touchend", onDragEnd);

        return () => {
            element.addEventListener("mousedown", onDragStart);
            window.addEventListener("mousemove", onDragMove);
            window.addEventListener("mouseup", onDragEnd);

            element.addEventListener("touchstart", onDragStart);
            window.addEventListener("touchmove", onDragMove);
            window.addEventListener("touchend", onDragEnd);
        };
    }, []);

    return ref;
};

export default useDragToScroll;
