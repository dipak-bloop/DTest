gsap.registerPlugin(ScrollTrigger);

const items = gsap.utils.toArray(".timeLineWrapper li");

function updateTimeline(progress) {

    const wrapper = document.querySelector(".timeLineWrapper");
    const wrapperTop = wrapper.offsetTop;

    const lineBottom = wrapperTop + (progress * wrapper.offsetHeight);

    items.forEach((item, index) => {

        item.classList.remove("in-view", "gone-view");

        const itemTop = wrapperTop + item.offsetTop;
        const itemHeight = item.offsetHeight;
        const itemCenter = itemTop + (itemHeight / 2);

        // Existing active state logic
        if (lineBottom >= itemCenter) {

            item.classList.add("gone-view");

            const nextItem = items[index + 1];

            if (
                !nextItem ||
                lineBottom <
                wrapperTop +
                nextItem.offsetTop +
                (nextItem.offsetHeight / 2)
            ) {
                item.classList.remove("gone-view");
                item.classList.add("in-view");
            }
        }

        // Timeline fill animation for each item
        const fill = item.querySelector(".timeline-fill");

        const fillProgress = gsap.utils.clamp(
            0,
            1,
            (lineBottom - itemTop) / itemHeight
        );

        gsap.set(fill, {
            height: (fillProgress * 100) + "%"
        });

    });
}

ScrollTrigger.create({
    trigger: ".timeLineWrapper",
    start: "top center",
    end: "bottom 80%",
    scrub: true,

    onUpdate: self => {
        updateTimeline(self.progress);
    },

    onRefresh: self => {
        updateTimeline(self.progress);
    }
});

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});