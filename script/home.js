
const clickButton = (id) => {

    const allButtonTabs = ["all-button", "open-button", "closed-button"];

    for (const tab of allButtonTabs) {

        const button = document.getElementById(tab);

        if (tab === id) {
            button.classList.add("bg-[#4A00FF]", "text-white");
        } 
        else {
            button.classList.remove("bg-[#4A00FF]", "text-white");
        }

    }
}