function toggleNode(id) {
    const content = document.getElementById(id);
    const button = content.previousElementSibling;

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        button.classList.remove("active");
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        button.classList.add("active");

        setTimeout(() => {
            const buttonPosition = button.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: buttonPosition - 20,
                behavior: 'smooth'
            });
        }, 100);
    }

    let parent = content.parentElement.closest('.node-content');
    while (parent) {
        let totalHeight = 0;
        const children = parent.children;
        for (let i = 0; i < children.length; i++) {
            const subContent = children[i].querySelector('.sub-content');
            if (subContent && subContent.style.maxHeight && subContent.style.maxHeight !== "0px") {
                totalHeight += subContent.scrollHeight;
            }

            totalHeight += children[i].offsetHeight; 
        }
        parent.style.maxHeight = (parent.scrollHeight + totalHeight) + "px";
        parent = parent.parentElement.closest('.node-content');
    }
}